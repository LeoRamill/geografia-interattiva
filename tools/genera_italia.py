#!/usr/bin/env python3
"""
Cartina semplificata delle regioni italiane per la pagina iniziale (si sceglie la regione).

Scrive app/italia.js (window.ITALIA: un FeatureCollection con istat e nome di ogni regione).
Uso:  python3 tools/genera_italia.py      (richiede shapely)
"""
import json
import os
import sys

from shapely.geometry import mapping, shape

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from genera_confine import carica  # noqa: E402
from regione import RADICE  # noqa: E402

SEMPLIFICA = 0.01     # gradi (circa 1 km): basta per una cartina d'Italia
ISOLA_MIN = 0.003     # gradi²: le isole più piccole non si disegnano


def main():
    feats = []
    for f in carica():
        p, g = f["properties"], shape(f["geometry"]).simplify(SEMPLIFICA, preserve_topology=True)
        if g.geom_type == "MultiPolygon":
            parti = [x for x in g.geoms if x.area >= ISOLA_MIN]
            g = parti[0] if len(parti) == 1 else type(g)(parti)

        def r(c):
            return [round(c[0], 3), round(c[1], 3)] if isinstance(c[0], (int, float)) else [r(x) for x in c]
        m = mapping(g)
        feats.append({"type": "Feature",
                      "properties": {"istat": p["reg_istat_code_num"], "nome": p["reg_name"].split("/")[0]},
                      "geometry": {"type": m["type"], "coordinates": r(json.loads(json.dumps(m["coordinates"])))}})
    out = os.path.join(RADICE, "app", "italia.js")
    with open(out, "w") as f:
        f.write("/* Generato da tools/genera_italia.py: non modificare a mano */\n")
        f.write("window.ITALIA = " + json.dumps({"type": "FeatureCollection", "features": feats},
                                                separators=(",", ":"), ensure_ascii=False) + ";\n")
    print(f"{len(feats)} regioni -> {out} ({os.path.getsize(out) // 1024} KB)")


if __name__ == "__main__":
    main()
