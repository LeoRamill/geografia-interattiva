#!/usr/bin/env python3
"""
Confine della regione (dati ISTAT di openpolis/geojson-italy), dal codice REGIONE.istat.

Scrive regioni/<id>/confine.js (window.CONFINE, un Feature GeoJSON: Polygon o MultiPolygon).
Uso:  python3 tools/genera_confine.py --regione valle-aosta      (richiede shapely, node)
"""
import json
import os
import ssl
import sys
import urllib.request

from shapely.geometry import mapping, shape

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from regione import QUI, argomenti, cartella, leggi_regione, scrivi_js  # noqa: E402

URL = "https://raw.githubusercontent.com/openpolis/geojson-italy/master/geojson/limits_IT_regions.geojson"
CACHE = os.environ.get("CACHE_GIS", os.path.join(QUI, ".cache", "gis"))
ISOLA_MIN = 0.0005     # gradi²: isolotti più piccoli (circa 4 km²) non si disegnano


def carica():
    path = os.path.join(CACHE, "limits_IT_regions.geojson")
    if not os.path.exists(path):
        os.makedirs(CACHE, exist_ok=True)
        ctx = ssl.create_default_context(cafile=os.environ.get("SSL_CERT_FILE") or None)
        req = urllib.request.Request(URL, headers={"User-Agent": "geografia-interattiva"})
        with urllib.request.urlopen(req, context=ctx, timeout=300) as r, open(path + ".tmp", "wb") as f:
            f.write(r.read())
        os.replace(path + ".tmp", path)
    return json.load(open(path))["features"]


def main():
    args = argomenti("Estrae il confine della regione")
    R = leggi_regione(args.regione)
    f = next((f for f in carica() if f["properties"]["reg_istat_code_num"] == R["istat"]), None)
    if f is None:
        raise SystemExit(f"regione con codice ISTAT {R['istat']} non trovata")
    g = shape(f["geometry"])
    if g.geom_type == "MultiPolygon":
        parti = [p for p in g.geoms if p.area >= ISOLA_MIN]
        g = parti[0] if len(parti) == 1 else type(g)(parti)

    def r(c):
        return [round(c[0], 4), round(c[1], 4)] if isinstance(c[0], (int, float)) else [r(x) for x in c]
    m = mapping(g)
    geom = {"type": m["type"], "coordinates": r(json.loads(json.dumps(m["coordinates"])))}
    out = cartella(args.regione, "confine.js")
    kb = scrivi_js(out, "CONFINE", {"type": "Feature", "properties": {"name": R["nome"]}, "geometry": geom}, "genera_confine.py") // 1024
    minx, miny, maxx, maxy = g.bounds
    print(f"{R['nome']}: {m['type']}, {kb} KB -> {out}")
    print(f"limiti: lng {minx:.2f}–{maxx:.2f}, lat {miny:.2f}–{maxy:.2f}")
    print(f"suggerimento area_regione: [{minx - 0.03:.2f}, {miny - 0.03:.2f}, {maxx + 0.03:.2f}, {maxy + 0.03:.2f}]")
    print(f"suggerimento area_larga:   [{minx - 0.8:.2f}, {miny - 0.3:.2f}, {maxx + 0.65:.2f}, {maxy + 0.28:.2f}]")


if __name__ == "__main__":
    main()
