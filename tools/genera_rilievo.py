#!/usr/bin/env python3
"""
Genera lo sfondo "Rilievo" del sito: tessere (tile) 256x256 in stile atlante
scolastico (colori per altitudine + ombreggiatura delle montagne).

Dati di altitudine: Terrain Tiles su AWS Open Data (formato Terrarium),
fonti SRTM, EU-DEM (Copernicus), ETOPO1 e altre. Gratuiti, nessuna chiave.
https://registry.opendata.aws/terrain-tiles/

Uso:
    pip install numpy pillow
    python3 tools/genera_rilievo.py            # scrive in tiles/rilievo/{z}/{x}/{y}.jpg

Le tessere scaricate vengono messe in cache in tools/.cache (ignorata da git).
"""
import io
import math
import os
import ssl
import sys
import urllib.request
from concurrent.futures import ThreadPoolExecutor

import numpy as np
from PIL import Image

QUI = os.path.dirname(os.path.abspath(__file__))
RADICE = os.path.dirname(QUI)
OUT = os.path.join(RADICE, "tiles", "rilievo")
CACHE = os.environ.get("CACHE_DEM", os.path.join(QUI, ".cache"))
URL = "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png"

# Area coperta (lng_min, lat_min, lng_max, lat_max)
AREA_LARGA = (6.00, 45.10, 8.75, 46.35)       # zoom 8–11
AREA_REGIONE = (6.63, 45.39, 8.11, 46.07)     # zoom 12 (solo intorno alla regione)
LIVELLI = {8: AREA_LARGA, 9: AREA_LARGA, 10: AREA_LARGA, 11: AREA_LARGA, 12: AREA_REGIONE}
# Esagerazione verticale: un po' di più a zoom bassi, dove il rilievo si vede meno
ESAGERAZIONE = {8: 2.2, 9: 1.8, 10: 1.5, 11: 1.25, 12: 1.0}

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

_ctx = ssl.create_default_context(cafile=os.environ.get("SSL_CERT_FILE") or None)


def tile_xy(lng, lat, z):
    n = 2 ** z
    x = (lng + 180) / 360 * n
    y = (1 - math.asinh(math.tan(math.radians(lat))) / math.pi) / 2 * n
    return x, y


def scarica(z, x, y):
    path = os.path.join(CACHE, str(z), str(x), f"{y}.png")
    if not os.path.exists(path):
        os.makedirs(os.path.dirname(path), exist_ok=True)
        req = urllib.request.Request(URL.format(z=z, x=x, y=y), headers={"User-Agent": "geografia-interattiva"})
        with urllib.request.urlopen(req, context=_ctx, timeout=60) as r:
            data = r.read()
        with open(path + ".tmp", "wb") as f:
            f.write(data)
        os.replace(path + ".tmp", path)
    rgb = np.asarray(Image.open(path).convert("RGB"), dtype=np.float32)
    return rgb[..., 0] * 256 + rgb[..., 1] + rgb[..., 2] / 256 - 32768


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


def _sposta(m, dy, dx):
    return np.roll(np.roll(m, dy, axis=0), dx, axis=1)


def _min_max(m, r, fn):
    out = m.copy()
    for dy in range(-r, r + 1):
        for dx in range(-r, r + 1):
            out = fn(out, _sposta(m, dy, dx))
    return out


def laghi(elev, z):
    """Le superfici dei laghi nei dati sono perfettamente piatte: le trova così."""
    # a zoom alti i laghi di montagna nei dati sono un po' "mossi": tolleranza di 0,4 m,
    # ma solo sopra i 500 m, perché in pianura creerebbe falsi laghi
    tolleranza = np.where((z >= 11) & (elev > 500), 0.4, 0.0)
    piatto = np.ones(elev.shape, dtype=bool)
    for dy in (-1, 0, 1):
        for dx in (-1, 0, 1):
            piatto &= np.abs(_sposta(elev, dy, dx) - elev) <= tolleranza
    r = 2 if z >= 11 else 1
    piatto = _min_max(piatto, r, np.logical_and)       # toglie le piccole zone piatte
    piatto = _min_max(piatto, r + 1, np.logical_or)    # e riallarga i laghi veri
    return piatto & (elev > 0)


def genera_livello(z, area):
    lng0, lat0, lng1, lat1 = area
    xa, ya = tile_xy(lng0, lat1, z)
    xb, yb = tile_xy(lng1, lat0, z)
    tx0, tx1, ty0, ty1 = int(xa), int(xb), int(ya), int(yb)
    # una tessera di margine per calcolare bene le pendenze ai bordi
    fx = list(range(tx0 - 1, tx1 + 2))
    fy = list(range(ty0 - 1, ty1 + 2))
    with ThreadPoolExecutor(16) as ex:
        blocchi = dict(zip([(x, y) for y in fy for x in fx],
                           ex.map(lambda p: scarica(z, *p), [(x, y) for y in fy for x in fx])))
    elev = np.vstack([np.hstack([blocchi[(x, y)] for x in fx]) for y in fy])
    elev = np.maximum(elev, 0)
    lat_c = (lat0 + lat1) / 2
    hs = ombreggiatura(elev, z, lat_c)
    rgb = colori(elev) * (0.42 + 0.68 * hs)[..., None]
    rgb[laghi(elev, z)] = ACQUA
    img = np.clip(rgb, 0, 255).astype(np.uint8)
    n = 0
    for j, y in enumerate(range(ty0, ty1 + 1), start=1):
        for i, x in enumerate(range(tx0, tx1 + 1), start=1):
            pezzo = img[j * 256:(j + 1) * 256, i * 256:(i + 1) * 256]
            dest = os.path.join(OUT, str(z), str(x))
            os.makedirs(dest, exist_ok=True)
            Image.fromarray(pezzo).save(os.path.join(dest, f"{y}.jpg"), quality=80, optimize=True, progressive=True)
            n += 1
    print(f"zoom {z}: {n} tessere", file=sys.stderr)


if __name__ == "__main__":
    for z, area in LIVELLI.items():
        genera_livello(z, area)
