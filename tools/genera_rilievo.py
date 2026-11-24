#!/usr/bin/env python3
"""
Genera lo sfondo della carta fisica: tessere (tile) 256x256 in stile atlante
scolastico (colori per altitudine + ombreggiatura delle montagne, laghi e mare in blu).

Dati di altitudine: Terrain Tiles su AWS Open Data (formato Terrarium),
fonti SRTM, EU-DEM (Copernicus), ETOPO1 e altre. Gratuiti, nessuna chiave.
https://registry.opendata.aws/terrain-tiles/

Uso:
    pip install numpy pillow
    python3 tools/genera_rilievo.py --regione valle-aosta
    # scrive regioni/<id>/tiles/rilievo/{z}/{x}/{y}.jpg

Aree e zoom vengono da regioni/<id>/regione.js (area_larga, area_regione, zoom_min).
Le tessere scaricate restano in cache in tools/.cache (ignorata da git).
"""
import math
import os
import shutil
import sys
from concurrent.futures import ThreadPoolExecutor

import numpy as np
from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from regione import argomenti, cartella, laghi, leggi_regione, scarica_dem, tile_xy  # noqa: E402

ZOOM_DETTAGLIO = 12          # l'ultimo livello solo su area_regione (più dettagliato)
# Esagerazione verticale: un po' di più a zoom bassi, dove il rilievo si vede meno
ESAGERAZIONE = {6: 2.8, 7: 2.5, 8: 2.2, 9: 1.8, 10: 1.5, 11: 1.25, 12: 1.0}

# Scala dei colori per altitudine (metri -> RGB), stile atlante
SCALA = [
    (0,    (118, 168, 96)),
    (400,  (140, 184, 106)),
    (800,  (178, 204, 128)),
    (1200, (214, 216, 152)),
    (1600, (228, 208, 160)),
    (2000, (212, 182, 138)),
    (2500, (190, 154, 118)),
    (2900, (172, 150, 138)),
    (3200, (205, 205, 208)),
    (3500, (240, 243, 247)),
    (5000, (255, 255, 255)),
]

ACQUA = (150, 196, 228)

def colori(elev):
    soglie = np.array([s[0] for s in SCALA], dtype=np.float32)
    out = np.empty(elev.shape + (3,), dtype=np.float32)
    for c in range(3):
        out[..., c] = np.interp(elev, soglie, np.array([s[1][c] for s in SCALA], dtype=np.float32))
    return out


def ombreggiatura(elev, z, lat):
    pixel_m = 2 * math.pi * 6378137 * math.cos(math.radians(lat)) / (256 * 2 ** z)
    # dy: variazione verso sud (le righe crescono verso sud), dx: verso est
    dy, dx = np.gradient(elev * ESAGERAZIONE[z], pixel_m)
    norma = np.sqrt(dx * dx + dy * dy + 1)
    alt = math.radians(45)
    tot = np.zeros_like(elev)
    # più direzioni di luce (azimut da nord, in senso orario): ombre morbide e leggibili
    for azimut, peso in ((315, 0.5), (270, 0.2), (360, 0.2), (225, 0.1)):
        a = math.radians(azimut)
        luce_est, luce_nord = math.sin(a) * math.cos(alt), math.cos(a) * math.cos(alt)
        tot += peso * (-dx * luce_est + dy * luce_nord + math.sin(alt)) / norma
    return np.clip(tot, 0, 1)


def genera_livello(z, area, out):
    lng0, lat0, lng1, lat1 = area
    xa, ya = tile_xy(lng0, lat1, z)
    xb, yb = tile_xy(lng1, lat0, z)
    tx0, tx1, ty0, ty1 = int(xa), int(xb), int(ya), int(yb)
    # una tessera di margine per calcolare bene le pendenze ai bordi
    fx = list(range(tx0 - 1, tx1 + 2))
    fy = list(range(ty0 - 1, ty1 + 2))
    with ThreadPoolExecutor(16) as ex:
        blocchi = dict(zip([(x, y) for y in fy for x in fx],
                           ex.map(lambda p: scarica_dem(z, *p), [(x, y) for y in fy for x in fx])))
    grezzo = np.vstack([np.hstack([blocchi[(x, y)] for x in fx]) for y in fy])
    mare = grezzo <= 0                                  # nei dati il mare è sotto lo zero
    elev = np.maximum(grezzo, 0)
    lat_c = (lat0 + lat1) / 2
    hs = ombreggiatura(elev, z, lat_c)
    rgb = colori(elev) * (0.42 + 0.68 * hs)[..., None]
    rgb[laghi(elev, z) | mare] = ACQUA
    img = np.clip(rgb, 0, 255).astype(np.uint8)
    n = 0
    for j, y in enumerate(range(ty0, ty1 + 1), start=1):
        for i, x in enumerate(range(tx0, tx1 + 1), start=1):
            pezzo = img[j * 256:(j + 1) * 256, i * 256:(i + 1) * 256]
            dest = os.path.join(out, str(z), str(x))
            os.makedirs(dest, exist_ok=True)
            Image.fromarray(pezzo).save(os.path.join(dest, f"{y}.jpg"), quality=80, optimize=True, progressive=True)
            n += 1
    print(f"zoom {z}: {n} tessere", file=sys.stderr)


def main():
    args = argomenti("Genera il rilievo a colori della carta fisica")
    r = leggi_regione(args.regione)
    out = cartella(args.regione, "tiles", "rilievo")
    if os.path.isdir(out):
        shutil.rmtree(out)                              # niente tessere vecchie
    for z in range(r.get("zoom_min", 8), ZOOM_DETTAGLIO):
        genera_livello(z, r["area_larga"], out)
    genera_livello(ZOOM_DETTAGLIO, r["area_regione"], out)


if __name__ == "__main__":
    main()
