"""
Funzioni in comune per gli script di tools/.

Ogni script lavora su una regione: python3 tools/<script>.py --regione valle-aosta
Le impostazioni della regione sono in regioni/<id>/regione.js (le legge anche il sito).
"""
import argparse
import json
import math
import os
import re
import ssl
import subprocess
import urllib.request

import numpy as np

QUI = os.path.dirname(os.path.abspath(__file__))
RADICE = os.path.dirname(QUI)
CACHE = os.environ.get("CACHE_DEM", os.path.join(QUI, ".cache"))
URL_DEM = "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png"
_ctx = ssl.create_default_context(cafile=os.environ.get("SSL_CERT_FILE") or None)


def argomenti(descrizione, extra=None):
    ap = argparse.ArgumentParser(description=descrizione)
    ap.add_argument("--regione", required=True, help="id della regione, es. valle-aosta (cartella in regioni/)")
    if extra:
        extra(ap)
    return ap.parse_args()


def cartella(id_regione, *parti):
    if not re.fullmatch(r"[a-z0-9-]+", id_regione):
        raise SystemExit(f"id di regione non valido: {id_regione!r}")
    return os.path.join(RADICE, "regioni", id_regione, *parti)


def leggi_js(percorso, variabile):
    """Esegue un file .js che imposta window.<variabile> e restituisce il valore (serve node)."""
    js = ("global.window={};require(process.argv[1]);"
          f"console.log(JSON.stringify(window[{json.dumps(variabile)}]))")
    out = subprocess.check_output(["node", "-e", js, os.path.abspath(percorso)])
    return json.loads(out)


def leggi_regione(id_regione):
    r = leggi_js(cartella(id_regione, "regione.js"), "REGIONE")
    if r is None or r.get("id") != id_regione:
        raise SystemExit(f"regioni/{id_regione}/regione.js non definisce window.REGIONE con id {id_regione!r}")
    return r


def scrivi_js(percorso, variabile, dati, generato_da):
    os.makedirs(os.path.dirname(percorso), exist_ok=True)
    with open(percorso, "w") as f:
        f.write(f"/* Generato da tools/{generato_da}: non modificare a mano */\n")
        f.write(f"window.{variabile} = " + json.dumps(dati, separators=(",", ":"), ensure_ascii=False) + ";\n")
    return os.path.getsize(percorso)


def tile_xy(lng, lat, z):
    n = 2 ** z
    return (lng + 180) / 360 * n, (1 - math.asinh(math.tan(math.radians(lat))) / math.pi) / 2 * n


def scarica_dem(z, x, y):
    """Una tessera di altitudine (Terrain Tiles, formato Terrarium) in metri, con cache su disco."""
    from PIL import Image
    path = os.path.join(CACHE, str(z), str(x), f"{y}.png")
    if not os.path.exists(path):
        os.makedirs(os.path.dirname(path), exist_ok=True)
        req = urllib.request.Request(URL_DEM.format(z=z, x=x, y=y), headers={"User-Agent": "geografia-interattiva"})
        with urllib.request.urlopen(req, context=_ctx, timeout=60) as r:
            data = r.read()
        with open(path + ".tmp", "wb") as f:
            f.write(data)
        os.replace(path + ".tmp", path)
    rgb = np.asarray(Image.open(path).convert("RGB"), dtype=np.float32)
    return rgb[..., 0] * 256 + rgb[..., 1] + rgb[..., 2] / 256 - 32768


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
