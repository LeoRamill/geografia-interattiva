#!/usr/bin/env python3
"""
Divide la Valle d'Aosta tra Alpi Pennine e Alpi Graie, per il quiz "Dov'è?".

Il confine tra le due catene segue (semplificando) la Dora Baltea e la Val Ferret
fino al Col Ferret:
  - Alpi Pennine: a nord della Dora Baltea e a est del Col Ferret
    (Grand Combin, Cervino, Monte Rosa, valli del Lys e di Ayas)
  - Alpi Graie: a ovest e a sud (massiccio del Monte Bianco, Gran Paradiso)

Usa data/confine.js e data/fiumi.js; scrive data/zone.js.
Uso:  python3 tools/genera_zone.py      (richiede shapely)
"""
import json
import os

from shapely.geometry import Polygon, mapping

RADICE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def leggi_js(nome, var):
    s = open(os.path.join(RADICE, "data", nome)).read()
    return json.loads(s[s.index("=", s.index(var)) + 1:].strip().rstrip(";"))


def arrotonda(m):
    def r(c):
        return [round(c[0], 4), round(c[1], 4)] if isinstance(c[0], (int, float)) else [r(x) for x in c]
    return {"type": m["type"], "coordinates": r(json.loads(json.dumps(m["coordinates"])))}


def main():
    regione = Polygon(leggi_js("confine.js", "CONFINE_VDA")["geometry"]["coordinates"][0])
    dora = leggi_js("fiumi.js", "FIUMI")["dora"]          # [[lat, lng], ...]
    lungo_dora = [(lng, lat) for lat, lng in dora if lat >= 45.585]   # fino a Pont-Saint-Martin

    col_ferret = (7.072, 45.894)
    pennine = Polygon([col_ferret, (7.03, 45.85), *lungo_dora,
                       (7.85, 45.50), (8.30, 45.50), (8.30, 46.30), (7.072, 46.30)]).buffer(0)
    zone = {
        "pennine": pennine.intersection(regione),
        "graie": regione.difference(pennine),
    }
    out = os.path.join(RADICE, "data", "zone.js")
    with open(out, "w") as f:
        f.write("/* Generato da tools/genera_zone.py: zone di Alpi Pennine e Alpi Graie (per il quiz) */\n")
        f.write("window.ZONE = " + json.dumps({k: arrotonda(mapping(g.simplify(0.001))) for k, g in zone.items()},
                                              separators=(",", ":")) + ";\n")
    for k, g in zone.items():
        print(k, g.geom_type, round(g.area / regione.area * 100), "% della regione")


if __name__ == "__main__":
    main()
