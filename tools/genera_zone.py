#!/usr/bin/env python3
"""
Zone della regione per il quiz "Dov'è?" e la visita guidata (per esempio le catene montuose).

Le zone sono descritte in regioni/<id>/regione.js (REGIONE.zone):
  - poligono: [[lng, lat], …] -> la zona è la parte di regione dentro il poligono
  - resto: true              -> la zona è la parte di regione che avanza dalle altre

Scrive regioni/<id>/zone.js.
Uso:  python3 tools/genera_zone.py --regione valle-aosta      (richiede shapely, node)
"""
import os
import sys

from shapely.geometry import Polygon, mapping, shape
from shapely.ops import unary_union

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from regione import argomenti, cartella, leggi_js, leggi_regione, scrivi_js  # noqa: E402


def arrotonda(m):
    def r(c):
        return [round(c[0], 4), round(c[1], 4)] if isinstance(c[0], (int, float)) else [r(x) for x in c]
    return {"type": m["type"], "coordinates": r(m["coordinates"])}


def main():
    args = argomenti("Prepara le zone della regione (quiz e visita guidata)")
    R = leggi_regione(args.regione)
    regione = shape(leggi_js(cartella(args.regione, "confine.js"), "CONFINE")["geometry"]).buffer(0)
    zone, fatte = {}, []
    for z in R.get("zone", []):
        if z.get("poligono"):
            g = Polygon(z["poligono"]).buffer(0).intersection(regione)
            zone[z["id"]] = g
            fatte.append(g)
    for z in R.get("zone", []):
        if z.get("resto"):
            zone[z["id"]] = regione.difference(unary_union(fatte)) if fatte else regione
    out = cartella(args.regione, "zone.js")
    scrivi_js(out, "ZONE", {k: arrotonda(mapping(g.simplify(0.001))) for k, g in zone.items()}, "genera_zone.py")
    for k, g in zone.items():
        print(f"{k}: {g.geom_type}, {round(g.area / regione.area * 100)}% della regione")


if __name__ == "__main__":
    main()
