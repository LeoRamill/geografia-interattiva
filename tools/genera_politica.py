#!/usr/bin/env python3
"""
Prepara i dati della carta politica di una regione: Stati, regioni e province italiane,
cantoni svizzeri, dipartimenti francesi, Länder austriaci, comuni (se la regione ne ha pochi),
strade principali, laghi e mare.

Fonti (dati aperti):
  - openpolis/geojson-italy (dati ISTAT): regioni, province, comuni
  - Natural Earth 1:10m: Stati e loro suddivisioni, strade, laghi

Scrive regioni/<id>/politica.js.

Uso:  python3 tools/genera_politica.py --regione valle-aosta
Richiede: shapely, node
"""
import json
import os
import ssl
import sys
import urllib.request
from itertools import combinations

from shapely.geometry import box, mapping, shape
from shapely.ops import unary_union

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from regione import QUI, argomenti, cartella, leggi_regione, scrivi_js  # noqa: E402

CACHE = os.environ.get("CACHE_GIS", os.path.join(QUI, ".cache", "gis"))
NE = "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/"
OP = "https://raw.githubusercontent.com/openpolis/geojson-italy/master/geojson/"

AREA = None                # impostata in main() da REGIONE.area_larga
SEMPLIFICA = 0.0015        # gradi (circa 150 m): basta per la scala della cartina

# colori pastello come nelle carte politiche di scuola
REGIONE_COLORI = ["#d9ead3", "#c7e0bf", "#e3f0d8", "#cfe5c4", "#bcd9b0"]          # la regione studiata: verdi
ITALIA_COLORI = [                                                                 # una tavolozza per regione vicina
    ["#f6c9d6", "#fbe7a1", "#cfe3f5", "#f9d4b0", "#e3d3f0", "#d6ecc4"],
    ["#efe3c8", "#f3e9d6", "#e8dcc0"],
    ["#d4e6f1", "#c5ddee", "#e1eef6", "#bfd8ea"],
    ["#fde2c4", "#fbd5ab", "#fee9d3", "#f9cb98"],
    ["#e8d5ef", "#dec6e8", "#f0e2f4", "#d4b8e0"],
    ["#f4f1bb", "#ece7a0", "#f8f6d0", "#e4de8a"],
]
ESTERO_COLORI = {
    "FR": ["#f3d3cc", "#f7e0d9", "#eec6be", "#f9e6e1", "#f1cfc7"],
    "CH": ["#ddd6f0", "#e8e3f6", "#d2cbe9", "#ece8f8", "#d8d0ee"],
    "AT": ["#f8dcc4", "#fbe7d6", "#f4d0b1", "#fdeee2"],
    "SI": ["#cfe9e4"], "SM": ["#e5e7eb"], "VA": ["#e5e7eb"], "MC": ["#e5e7eb"],
}
ALTRO_ESTERO = ["#e5e7eb", "#eceef1", "#dfe2e6"]
# Stati divisi nelle loro suddivisioni (gli altri si disegnano interi)
SUDDIVISIONI = {"FR": "dipartimento", "CH": "cantone", "AT": "Land"}
NOMI_LAGHI = {"Lake Geneva": "Lago Lemano", "Lac d' Annecy": "Lago di Annecy", "Lake Constance": "Lago di Costanza"}

_ctx = ssl.create_default_context(cafile=os.environ.get("SSL_CERT_FILE") or None)


def carica(url):
    path = os.path.join(CACHE, url.rsplit("/", 1)[1])
    if not os.path.exists(path):
        os.makedirs(CACHE, exist_ok=True)
        req = urllib.request.Request(url, headers={"User-Agent": "geografia-interattiva"})
        with urllib.request.urlopen(req, context=_ctx, timeout=300) as r, open(path + ".tmp", "wb") as f:
            f.write(r.read())
        os.replace(path + ".tmp", path)
    with open(path) as f:
        return json.load(f)["features"]


def taglia(g, tol=SEMPLIFICA):
    g = solo(g.intersection(AREA), g)
    return g.simplify(tol, preserve_topology=True) if not g.is_empty else g


def solo(g, modello):
    """Dopo un taglio può restare un misto di superfici, linee e punti: tiene solo il tipo del modello."""
    if g.geom_type != "GeometryCollection":
        return g
    poligoni = "Polygon" in modello.geom_type or modello.geom_type == "GeometryCollection"
    parti = [p for p in g.geoms if ("Polygon" in p.geom_type) == poligoni and "Point" not in p.geom_type]
    return unary_union(parti) if parti else type(g)()


def arrotonda(geom):
    def r(c):
        if isinstance(c[0], (int, float)):
            return [round(c[0], 4), round(c[1], 4)]
        return [r(x) for x in c]
    m = mapping(geom)
    return {"type": m["type"], "coordinates": r(json.loads(json.dumps(m["coordinates"])))}


def colora(items, tavolozza):
    """Colori diversi per aree confinanti (colorazione 'golosa' del grafo)."""
    for i, it in enumerate(items):
        usati = {o["colore"] for o in items[:i] if o["geom"].buffer(0.002).intersects(it["geom"])}
        it["colore"] = next((c for c in tavolozza if c not in usati), tavolozza[i % len(tavolozza)])


def etichetta(g):
    p = g.representative_point()
    return [round(p.y, 4), round(p.x, 4)]


def main():
    global AREA
    args = argomenti("Prepara i dati della carta politica")
    R = leggi_regione(args.regione)
    AREA = box(*R["area_larga"])
    target = R["istat"]
    con_comuni = R.get("politica", {}).get("comuni", False)

    # --- Italia: regioni e province (openpolis/ISTAT) ---
    regioni = {f["properties"]["reg_istat_code_num"]: (f["properties"]["reg_name"], shape(f["geometry"]))
               for f in carica(OP + "limits_IT_regions.geojson")}
    if target not in regioni:
        raise SystemExit(f"codice ISTAT {target} non trovato")
    italia = unary_union([g for _, g in regioni.values() if g.intersects(AREA)]).buffer(0)

    aree, tavolozze = [], {"REGIONE": REGIONE_COLORI}
    for f in carica(OP + "limits_IT_provinces.geojson"):
        p, g = f["properties"], shape(f["geometry"])
        if not g.intersects(AREA):
            continue
        if p["reg_istat_code_num"] == target:
            if con_comuni:
                continue                     # al posto delle province si disegnano i comuni
            gruppo = "REGIONE"
        else:
            gruppo = p["reg_name"]
            if gruppo not in tavolozze:
                tavolozze[gruppo] = ITALIA_COLORI[(len(tavolozze) - 1) % len(ITALIA_COLORI)]
        nome = p["prov_name"].split("/")[0]
        aree.append({"nome": nome, "tipo": "provincia", "gruppo": gruppo, "geom": g})

    # --- Stati vicini (Natural Earth), con le loro suddivisioni, tagliati sul confine italiano ---
    stati = {}
    for f in carica(NE + "ne_10m_admin_0_countries.geojson"):
        p, g = f["properties"], shape(f["geometry"])
        iso = p.get("ISO_A2_EH") or p.get("ISO_A2")
        if iso != "IT" and g.intersects(AREA):
            stati[iso] = (p.get("NAME_IT") or p["NAME"], g)
    terra = unary_union([g for _, g in stati.values()] + [italia]).buffer(0)
    # mare: il contorno del mare di Natural Earth, un po' allargato verso terra (le aree colorate,
    # disegnate sopra, lo coprono): così tra costa e mare non restano strisce vuote
    oceano = [shape(f["geometry"]) for f in carica(NE + "ne_10m_ocean.geojson")]
    oceano = unary_union([g.intersection(AREA) for g in oceano if g.intersects(AREA)])
    mare = oceano.buffer(0.01).intersection(AREA) if not oceano.is_empty else None
    for iso, (nome, g) in stati.items():
        tavolozze[iso] = ESTERO_COLORI.get(iso, ALTRO_ESTERO)
        if iso not in SUDDIVISIONI:
            aree.append({"nome": nome, "tipo": "Stato", "gruppo": iso, "geom": g.difference(italia)})
    for f in carica(NE + "ne_10m_admin_1_states_provinces.geojson"):
        p = f["properties"]
        iso = p["iso_a2"]
        if iso not in SUDDIVISIONI or iso not in stati:
            continue
        g = shape(f["geometry"])
        if not g.intersects(AREA):
            continue
        nome = (p.get("name_it") or p["name"]).replace("Canton ", "").replace("canton ", "")
        aree.append({"nome": nome, "tipo": SUDDIVISIONI[iso], "gruppo": iso, "geom": g.difference(italia)})

    # I confini di Natural Earth sono meno precisi di quelli ISTAT: tra gli Stati vicini e l'Italia
    # restano piccoli "buchi" sulla terraferma. Li riempiamo allargando le aree straniere solo lì.
    straniere = [a for a in aree if a["gruppo"] in stati]
    if straniere:
        buchi = AREA.difference(italia).difference(unary_union([a["geom"] for a in straniere]))
        if mare is not None:
            buchi = buchi.difference(oceano)
        for a in straniere:
            a["geom"] = a["geom"].union(a["geom"].buffer(0.05).intersection(buchi))

    # --- comuni della regione (solo se sono pochi: con tanti comuni la cartina diventa illeggibile) ---
    comuni = []
    if con_comuni:
        comuni = [{"nome": f["properties"]["name"], "tipo": "comune", "gruppo": "REGIONE", "geom": shape(f["geometry"])}
                  for f in carica(OP + f"limits_R_{target}_municipalities.geojson")]

    for gruppo, tavolozza in tavolozze.items():
        colora([a for a in aree + comuni if a["gruppo"] == gruppo], tavolozza)

    def fc(items, tol=SEMPLIFICA):
        out = []
        for it in items:
            g = taglia(it["geom"], tol)
            if g.is_empty or g.area < 1e-6:
                continue
            out.append({"type": "Feature",
                        "properties": {"nome": it["nome"], "tipo": it["tipo"], "colore": it["colore"],
                                       "etichetta": etichetta(it["geom"].intersection(AREA))},
                        "geometry": arrotonda(g)})
        return {"type": "FeatureCollection", "features": out}

    # --- confini (linee) ---
    vuoto = {"type": "MultiLineString", "coordinates": []}
    linea = lambda g: arrotonda(g) if not g.is_empty else vuoto
    # confine di Stato: il bordo dell'Italia, tranne la costa
    confine_stato = italia.boundary if mare is None else italia.boundary.difference(oceano.buffer(0.03))
    confine_stato = taglia(confine_stato) if stati else box(0, 0, 0, 0).boundary
    confine_regioni = taglia(unary_union([g.boundary for _, g in regioni.values() if g.intersects(AREA)])
                             .difference(italia.boundary.buffer(0.003)))
    tra_stati = [a.boundary.intersection(b.buffer(0.01)) for (_, a), (_, b) in combinations(stati.values(), 2)]
    confine_estero = taglia(unary_union(tra_stati).difference(italia.buffer(0.01))) if tra_stati else box(0, 0, 0, 0).boundary

    mare = taglia(mare, 0.002) if mare is not None else None

    # --- strade principali ---
    strade = []
    for f in carica(NE + "ne_10m_roads.geojson"):
        p, g = f["properties"], shape(f["geometry"])
        if p.get("type") not in ("Major Highway", "Secondary Highway", "Road") or not g.intersects(AREA):
            continue
        g = taglia(g, 0.001)
        if g.is_empty:
            continue
        strade.append({"type": "Feature", "properties": {"tipo": p["type"], "sigla": p.get("label")},
                       "geometry": arrotonda(g)})

    # --- laghi ---
    laghi = []
    for f in carica(NE + "ne_10m_lakes.geojson") + carica(NE + "ne_10m_lakes_europe.geojson"):
        g = shape(f["geometry"])
        if not g.intersects(AREA):
            continue
        nome = f["properties"]["name"]
        # in Natural Earth il Lago Maggiore è chiamato per errore "Lago di Como"
        if nome == "Lago di Como" and g.bounds[0] < 8.9:
            nome = "Lago Maggiore"
        nome = NOMI_LAGHI.get(nome, nome)
        laghi.append({"type": "Feature", "properties": {"nome": nome}, "geometry": arrotonda(taglia(g, 0.001))})

    dati = {
        "aree": fc(aree),
        "comuni": fc(comuni, 0.0008),
        "confini": {"stato": linea(confine_stato), "estero": linea(confine_estero), "regioni": linea(confine_regioni)},
        "mare": arrotonda(mare) if mare is not None and not mare.is_empty else None,
        "strade": {"type": "FeatureCollection", "features": strade},
        "laghi": {"type": "FeatureCollection", "features": laghi},
    }
    out = cartella(args.regione, "politica.js")
    kb = scrivi_js(out, "POLITICA", dati, "genera_politica.py") // 1024
    print(f"{len(dati['aree']['features'])} aree, {len(dati['comuni']['features'])} comuni, "
          f"{len(strade)} strade, {len(laghi)} laghi, mare: {'sì' if dati['mare'] else 'no'} -> {out} ({kb} KB)", file=sys.stderr)


if __name__ == "__main__":
    main()
