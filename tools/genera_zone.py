#!/usr/bin/env python3
"""
Zone della regione per il quiz "Dov'è?" e la visita guidata (per esempio le catene montuose).

Le zone sono descritte in regioni/<id>/regione.js (REGIONE.zone):
  - poligono: [[lng, lat], …] -> la zona è la parte di regione dentro il poligono
  - altimetria: "montagna" | "collina" | "pianura"
                             -> la zona è calcolata dai dati di altitudine: quanto è alto il terreno e
                                quanto è "mosso" (dislivello nei dintorni). Le soglie sono in SOGLIE.
  - costa: { km, ovest, est } -> la striscia di costa larga `km` chilometri tra le longitudini ovest ed est
                                (es. le Riviere liguri); il mare viene da Natural Earth
  - resto: true              -> la zona è la parte di regione che avanza dalle altre (dello stesso gruppo)
  - gruppo: "…"              -> le zone dello stesso gruppo non si sovrappongono; gruppi diversi sì
                                (es. montagna/collina e Riviera di Ponente/Levante). Senza gruppo: tutte insieme.

Scrive regioni/<id>/zone.js.
Uso:  python3 tools/genera_zone.py --regione valle-aosta      (richiede shapely, node)
"""
import math
import os
import sys

import numpy as np
from shapely.geometry import Polygon, box, mapping, shape
from shapely.ops import unary_union

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from genera_fiumi import mosaico  # noqa: E402
from regione import _sposta, argomenti, cartella, leggi_js, leggi_regione, scrivi_js  # noqa: E402

Z_ALTIMETRIA = 9       # circa 200 m per pixel: basta per zone grandi come montagna/collina/pianura
# montagna: terreno alto, oppure abbastanza alto e molto mosso; pianura: piatto e non troppo alto; collina: il resto
# (tarate sul Piemonte: 42% montagna, 30% collina, 27% pianura; dati ISTAT 43/30/27)
SOGLIE = {"montagna_quota": 700, "montagna_dislivello": 450, "montagna_quota_min": 500,
          "pianura_dislivello": 90, "pianura_quota_max": 650, "raggio_px": 10}


def classi_altimetria(area):
    """0 = pianura, 1 = collina, 2 = montagna, su una griglia che copre l'area."""
    elev, x0, y0 = mosaico(Z_ALTIMETRIA, area)
    elev = np.maximum(elev, 0)
    r = SOGLIE["raggio_px"]
    alto, basso = elev.copy(), elev.copy()
    for dy in range(-r, r + 1):
        for dx in range(-r, r + 1):
            if dx * dx + dy * dy <= r * r:
                s = _sposta(elev, dy, dx)
                np.maximum(alto, s, out=alto)
                np.minimum(basso, s, out=basso)
    disl = alto - basso
    montagna = (elev >= SOGLIE["montagna_quota"]) | ((disl >= SOGLIE["montagna_dislivello"]) & (elev >= SOGLIE["montagna_quota_min"]))
    pianura = ~montagna & (disl < SOGLIE["pianura_dislivello"]) & (elev < SOGLIE["pianura_quota_max"])
    classi = np.where(montagna, 2, np.where(pianura, 0, 1))
    # filtro "di maggioranza": ogni punto prende la classe più frequente nei dintorni (toglie le macchioline)
    conta = np.zeros((3,) + classi.shape)
    for dy in range(-3, 4):
        for dx in range(-3, 4):
            s = _sposta(classi, dy, dx)
            for c in range(3):
                conta[c] += s == c
    return conta.argmax(0), x0, y0


def bordo_lng(c, x0):
    return (x0 * 256 + c) / (2 ** Z_ALTIMETRIA * 256) * 360 - 180


def bordo_lat(r, y0):
    return math.degrees(math.atan(math.sinh(math.pi * (1 - 2 * (y0 * 256 + r) / (2 ** Z_ALTIMETRIA * 256)))))


def poligono_classe(classi, c, x0, y0):
    """Da raster a poligono: un rettangolo per ogni tratto di riga della classe, poi tutti uniti."""
    pezzi = []
    for r in range(classi.shape[0]):
        riga = np.concatenate([[False], classi[r] == c, [False]])
        bordi = np.flatnonzero(riga[1:] != riga[:-1])          # inizio e fine di ogni tratto
        nord, sud = bordo_lat(r, y0), bordo_lat(r + 1, y0)
        for a, b in zip(bordi[::2], bordi[1::2]):
            pezzi.append(box(bordo_lng(a, x0), sud, bordo_lng(b, x0), nord))
    return unary_union(pezzi).buffer(0) if pezzi else Polygon()


def arrotonda(m):
    def r(c):
        return [round(c[0], 4), round(c[1], 4)] if isinstance(c[0], (int, float)) else [r(x) for x in c]
    return {"type": m["type"], "coordinates": r(m["coordinates"])}


PEZZO_MIN = 0.003      # gradi² (circa 25 km²): i pezzetti più piccoli finiscono nella zona "resto"


def semplifica_zona(g, regione):
    """Bordi più morbidi e niente macchioline: così sulla cartina la zona si legge bene."""
    g = superfici(g).buffer(0.01).buffer(-0.02).buffer(0.01)          # chiude i buchini e toglie i filamenti
    parti = [p for p in getattr(g, "geoms", [g]) if p.area >= PEZZO_MIN]
    g = unary_union([type(p)(p.exterior, [h for h in p.interiors if type(p)(h).area >= PEZZO_MIN]) for p in parti])
    return superfici(g.intersection(regione))


def superfici(g):
    """Solo le parti con superficie (un taglio può lasciare linee o punti)."""
    if g.geom_type == "GeometryCollection":
        return unary_union([p for p in g.geoms if "Polygon" in p.geom_type])
    return g


def main():
    args = argomenti("Prepara le zone della regione (quiz e visita guidata)")
    R = leggi_regione(args.regione)
    SOGLIE.update(R.get("altimetria_soglie", {}))   # regioni con montagne "diverse" (es. Liguria, a picco sul mare)
    regione = shape(leggi_js(cartella(args.regione, "confine.js"), "CONFINE")["geometry"]).buffer(0)
    zone, fatte = {}, {}             # fatte: per gruppo, le zone già calcolate
    classi = None
    oceano = None
    for z in R.get("zone", []):
        gia = fatte.setdefault(z.get("gruppo", ""), [])
        if z.get("poligono"):
            g = Polygon(z["poligono"]).buffer(0).intersection(regione)
        elif z.get("altimetria"):
            if classi is None:
                minx, miny, maxx, maxy = regione.bounds
                classi = classi_altimetria((minx - 0.05, miny - 0.05, maxx + 0.05, maxy + 0.05))
            c = {"pianura": 0, "collina": 1, "montagna": 2}[z["altimetria"]]
            g = semplifica_zona(poligono_classe(*classi[:1], c, *classi[1:]).intersection(regione), regione)
        elif z.get("costa"):
            if oceano is None:
                from genera_politica import NE, carica
                minx, miny, maxx, maxy = regione.bounds
                zona = box(minx - 0.5, miny - 0.5, maxx + 0.5, maxy + 0.5)
                oceano = unary_union([shape(f["geometry"]).intersection(zona) for f in carica(NE + "ne_10m_ocean.geojson")
                                      if shape(f["geometry"]).intersects(zona)])
            c = z["costa"]
            striscia = oceano.buffer(c["km"] / 111).intersection(box(c["ovest"], -90, c["est"], 90))
            g = superfici(striscia.intersection(regione))
        else:
            continue
        if gia:
            g = g.difference(unary_union(gia))                       # nello stesso gruppo non si sovrappongono
        zone[z["id"]] = g
        gia.append(g)
    for z in R.get("zone", []):
        if z.get("resto"):
            gia = fatte.get(z.get("gruppo", ""), [])
            zone[z["id"]] = regione.difference(unary_union(gia)) if gia else regione
    out = cartella(args.regione, "zone.js")
    scrivi_js(out, "ZONE", {k: arrotonda(mapping(superfici(g).simplify(0.001))) for k, g in zone.items()}, "genera_zone.py")
    for k, g in zone.items():
        print(f"{k}: {g.geom_type}, {round(g.area / regione.area * 100)}% della regione")


if __name__ == "__main__":
    main()
