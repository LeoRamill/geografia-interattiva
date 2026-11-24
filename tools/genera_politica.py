#!/usr/bin/env python3
"""
Prepara i dati della carta politica: Stati, regioni, province, cantoni e
dipartimenti, comuni della Valle d'Aosta, strade principali e laghi.

Fonti (dati aperti):
  - openpolis/geojson-italy (dati ISTAT): regioni, province, comuni
  - Natural Earth 1:10m: Stati, cantoni svizzeri, dipartimenti francesi, strade, laghi

Scrive data/politica.js.

Uso:  python3 tools/genera_politica.py
Richiede: shapely
"""
import json
import os
import ssl
import sys
import urllib.request

from shapely.geometry import box, mapping, shape
from shapely.ops import unary_union

QUI = os.path.dirname(os.path.abspath(__file__))
RADICE = os.path.dirname(QUI)
CACHE = os.environ.get("CACHE_GIS", os.path.join(QUI, ".cache", "gis"))
NE = "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/"
OP = "https://raw.githubusercontent.com/openpolis/geojson-italy/master/geojson/"

AREA = box(6.00, 45.10, 8.75, 46.35)
SEMPLIFICA = 0.0015        # gradi (circa 150 m): basta per la scala della cartina

# colori pastello come nelle carte politiche di scuola
COLORI = {
    "VdA": ["#d9ead3", "#c7e0bf", "#e3f0d8", "#cfe5c4", "#bcd9b0"],
    "Piemonte": ["#f6c9d6", "#fbe7a1", "#cfe3f5", "#f9d4b0", "#e3d3f0", "#d6ecc4"],
    "Lombardia": ["#efe3c8", "#f3e9d6", "#e8dcc0"],
    "FR": ["#f3d3cc", "#f7e0d9", "#eec6be", "#f9e6e1", "#f1cfc7"],
    "CH": ["#ddd6f0", "#e8e3f6", "#d2cbe9", "#ece8f8", "#d8d0ee"],
}

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
    g = g.intersection(AREA)
    return g.simplify(tol, preserve_topology=True) if not g.is_empty else g


def arrotonda(geom):
    def r(c):
        if isinstance(c[0], (int, float)):
            return [round(c[0], 4), round(c[1], 4)]
        return [r(x) for x in c]
    m = mapping(geom)
    return {"type": m["type"], "coordinates": r(json.loads(json.dumps(m["coordinates"])))}


def colora(items, gruppo):
    """Colori diversi per aree confinanti (colorazione 'golosa' del grafo)."""
    tavolozza = COLORI[gruppo]
    for i, it in enumerate(items):
        usati = {o["colore"] for o in items[:i] if o["geom"].buffer(0.002).intersects(it["geom"])}
        it["colore"] = next((c for c in tavolozza if c not in usati), tavolozza[i % len(tavolozza)])


def etichetta(g):
    p = g.representative_point()
    return [round(p.y, 4), round(p.x, 4)]


def main():
    # --- Italia: regioni e province (openpolis/ISTAT) ---
    regioni = {f["properties"]["reg_name"]: shape(f["geometry"]) for f in carica(OP + "limits_IT_regions.geojson")}
    italia = unary_union([g for g in regioni.values() if g.intersects(AREA)]).buffer(0)

    aree = []
    for f in carica(OP + "limits_IT_provinces.geojson"):
        p, g = f["properties"], shape(f["geometry"])
        if not g.intersects(AREA) or p["reg_name"].startswith("Valle"):
            continue
        gruppo = "Piemonte" if p["reg_name"] == "Piemonte" else "Lombardia"
        aree.append({"nome": p["prov_name"], "tipo": "provincia", "gruppo": gruppo, "geom": g})

    # --- Francia e Svizzera: dipartimenti e cantoni (Natural Earth), tagliati sul confine italiano ---
    for f in carica(NE + "ne_10m_admin_1_states_provinces.geojson"):
        p = f["properties"]
        if p["iso_a2"] not in ("FR", "CH"):
            continue
        g = shape(f["geometry"])
        if not g.intersects(AREA):
            continue
        g = g.difference(italia)
        nome = (p.get("name_it") or p["name"]).replace("Canton ", "").replace("canton ", "")
        aree.append({"nome": nome, "tipo": "cantone" if p["iso_a2"] == "CH" else "dipartimento",
                     "gruppo": p["iso_a2"], "geom": g})

    # I confini di Natural Earth sono meno precisi di quelli ISTAT: tra Francia/Svizzera e
    # Italia restano piccoli "buchi". Li riempiamo allargando le aree straniere solo dentro i buchi.
    straniere = [a for a in aree if a["gruppo"] in ("FR", "CH")]
    buchi = AREA.difference(italia).difference(unary_union([a["geom"] for a in straniere]))
    for a in straniere:
        a["geom"] = a["geom"].union(a["geom"].buffer(0.05).intersection(buchi))

    # --- comuni della Valle d'Aosta ---
    comuni = [{"nome": f["properties"]["name"], "tipo": "comune", "gruppo": "VdA", "geom": shape(f["geometry"])}
              for f in carica(OP + "limits_R_2_municipalities.geojson")]

    for gruppo in COLORI:
        colora([a for a in aree + comuni if a["gruppo"] == gruppo], gruppo)

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
    vda = regioni[next(k for k in regioni if k.startswith("Valle"))]
    confine_stato = taglia(italia.boundary)
    confine_regioni = taglia(unary_union([g.boundary for k, g in regioni.items()
                                          if g.intersects(AREA)]).difference(italia.boundary.buffer(0.003)))
    paesi = {f["properties"]["NAME_IT"]: shape(f["geometry"]) for f in carica(NE + "ne_10m_admin_0_countries.geojson")
             if f["properties"]["NAME"] in ("France", "Switzerland")}
    confine_fr_ch = taglia(paesi["Francia"].boundary.intersection(paesi["Svizzera"].buffer(0.01)).difference(italia.buffer(0.01)))

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
        nome = {"Lake Geneva": "Lago Lemano", "Lac d' Annecy": "Lago di Annecy"}.get(nome, nome)
        laghi.append({"type": "Feature", "properties": {"nome": nome}, "geometry": arrotonda(taglia(g, 0.001))})

    dati = {
        "aree": fc(aree),
        "comuni": fc(comuni, 0.0008),
        "confini": {
            "stato": arrotonda(confine_stato),
            "fr_ch": arrotonda(confine_fr_ch),
            "regioni": arrotonda(confine_regioni),
        },
        "strade": {"type": "FeatureCollection", "features": strade},
        "laghi": {"type": "FeatureCollection", "features": laghi},
    }
    out = os.path.join(RADICE, "data", "politica.js")
    with open(out, "w") as f:
        f.write("/* Generato da tools/genera_politica.py: non modificare a mano */\n")
        f.write("window.POLITICA = " + json.dumps(dati, separators=(",", ":"), ensure_ascii=False) + ";\n")
    print(f"{len(dati['aree']['features'])} aree, {len(dati['comuni']['features'])} comuni, "
          f"{len(strade)} strade, {len(laghi)} laghi -> {out} ({os.path.getsize(out) // 1024} KB)", file=sys.stderr)


if __name__ == "__main__":
    main()
