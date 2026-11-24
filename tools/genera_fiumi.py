#!/usr/bin/env python3
"""
Ricava il reticolo dei fiumi dai dati di altitudine (come fanno i GIS):
1. "riempie" le piccole conche del terreno (algoritmo Priority-Flood),
2. per ogni punto calcola dove scorre l'acqua e quanta ne arriva da monte,
3. dove l'area che drena è abbastanza grande c'è un fiume.

Scrive data/fiumi.js (linee dei fiumi + tracciato della Dora Baltea).

Uso:  python3 tools/genera_fiumi.py
Richiede: numpy, pillow, shapely
"""
import heapq
import json
import math
import os
import sys

import numpy as np
from shapely.geometry import LineString, mapping

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from genera_rilievo import AREA_LARGA, RADICE, laghi, scarica, tile_xy  # noqa: E402

Z = 10                      # risoluzione dei dati usati (circa 100 m per pixel)
SOGLIA_KM2 = 25             # area drenata minima perché sia disegnato un fiume
SOGLIA_PIANURA_KM2 = 700    # in pianura (sotto i 450 m) solo i fiumi grandi: il terreno piatto crea falsi ruscelli
SORGENTE_DORA = (45.812, 6.952)   # Entrèves, dove nasce la Dora Baltea


def mosaico(z, area):
    lng0, lat0, lng1, lat1 = area
    xa, ya = tile_xy(lng0, lat1, z)
    xb, yb = tile_xy(lng1, lat0, z)
    xs, ys = range(int(xa), int(xb) + 1), range(int(ya), int(yb) + 1)
    elev = np.vstack([np.hstack([scarica(z, x, y) for x in xs]) for y in ys])
    return elev.astype(np.float64), xs[0], ys[0]


def pixel_a_lnglat(r, c, x0, y0, z):
    n = 2 ** z * 256
    px, py = x0 * 256 + c + 0.5, y0 * 256 + r + 0.5
    lng = px / n * 360 - 180
    lat = math.degrees(math.atan(math.sinh(math.pi * (1 - 2 * py / n))))
    return lng, lat


def drenaggio(elev):
    """Priority-Flood: restituisce per ogni cella la cella a valle e l'ordine di visita."""
    h, w = elev.shape
    N = h * w
    flat = elev.ravel()
    valle = np.full(N, -1, dtype=np.int64)
    visto = np.zeros(N, dtype=bool)
    ordine = np.empty(N, dtype=np.int64)
    heap = []
    for r in range(h):
        for c in (0, w - 1):
            i = r * w + c
            if not visto[i]:
                visto[i] = True
                heap.append((flat[i], i))
    for c in range(w):
        for r in (0, h - 1):
            i = r * w + c
            if not visto[i]:
                visto[i] = True
                heap.append((flat[i], i))
    heapq.heapify(heap)
    vicini = [(-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1)]
    k = 0
    livello = flat.copy()
    while heap:
        e, i = heapq.heappop(heap)
        ordine[k] = i
        k += 1
        r, c = divmod(i, w)
        for dr, dc in vicini:
            rr, cc = r + dr, c + dc
            if 0 <= rr < h and 0 <= cc < w:
                j = rr * w + cc
                if not visto[j]:
                    visto[j] = True
                    valle[j] = i
                    # nelle conche il livello sale appena sopra (l'acqua le riempie)
                    livello[j] = max(livello[j], np.nextafter(e, np.inf))
                    heapq.heappush(heap, (livello[j], j))
    return valle, ordine


def accumulo(valle, ordine):
    acc = np.ones(valle.size, dtype=np.float64)
    for i in ordine[::-1]:
        v = valle[i]
        if v >= 0:
            acc[v] += acc[i]
    return acc


def main():
    elev, x0, y0 = mosaico(Z, AREA_LARGA)
    h, w = elev.shape
    print(f"griglia {w}x{h}", file=sys.stderr)
    valle, ordine = drenaggio(elev)
    acc = accumulo(valle, ordine)
    lat_c = (AREA_LARGA[1] + AREA_LARGA[3]) / 2
    km2_cella = (2 * math.pi * 6378137 * math.cos(math.radians(lat_c)) / (256 * 2 ** Z)) ** 2 / 1e6
    soglia = SOGLIA_KM2 / km2_cella
    fiume = acc >= soglia
    fiume &= ~((elev.ravel() < 450) & (acc < SOGLIA_PIANURA_KM2 / km2_cella))
    fiume &= ~laghi(elev, Z).ravel()          # niente linee dentro i laghi

    # quanti affluenti-fiume entrano in ogni cella
    entrate = np.zeros(valle.size, dtype=np.int32)
    idx = np.nonzero(fiume)[0]
    for i in idx:
        v = valle[i]
        if v >= 0 and fiume[v]:
            entrate[v] += 1

    # traccia le linee: da ogni sorgente (o confluenza) fino alla confluenza successiva
    linee = []
    partenze = [i for i in idx if entrate[i] != 1]
    for s in partenze:
        tratto = [s]
        i = s
        while True:
            v = valle[i]
            if v < 0 or not fiume[v]:
                break
            tratto.append(v)
            if entrate[v] != 1:   # confluenza: qui inizia un altro tratto
                break
            i = v
        if len(tratto) < 2:
            continue
        coords = [pixel_a_lnglat(*divmod(int(j), w), x0, y0, Z) for j in tratto]
        km2 = acc[tratto[-1]] * km2_cella
        linee.append((LineString(coords).simplify(0.0006), km2))

    # tracciato della Dora Baltea, dalla sorgente fino al Po (o al bordo dei dati)
    ax, ay = tile_xy(SORGENTE_DORA[1], SORGENTE_DORA[0], Z)
    r0, c0 = int(ay * 256) - y0 * 256, int(ax * 256) - x0 * 256
    # parte dalla cella con più acqua nei dintorni (il fondovalle)
    finestra = [(r, c) for r in range(r0 - 6, r0 + 7) for c in range(c0 - 6, c0 + 7)]
    r0, c0 = max(finestra, key=lambda rc: acc[rc[0] * w + rc[1]])
    i = r0 * w + c0
    dora = [i]
    while valle[i] >= 0:
        i = valle[i]
        dora.append(i)
        lng, lat = pixel_a_lnglat(*divmod(int(i), w), x0, y0, Z)
        if lat < 45.20:   # arrivata nella pianura, vicino al Po
            break
    dora_line = LineString([pixel_a_lnglat(*divmod(int(j), w), x0, y0, Z) for j in dora]).simplify(0.0005)

    feats = [{"type": "Feature", "properties": {"km2": round(km2)},
              "geometry": {"type": "LineString",
                           "coordinates": [[round(x, 4), round(y, 4)] for x, y in g.coords]}}
             for g, km2 in linee]
    dati = {
        "fiumi": {"type": "FeatureCollection", "features": feats},
        "dora": [[round(y, 4), round(x, 4)] for x, y in dora_line.coords],
    }
    out = os.path.join(RADICE, "data", "fiumi.js")
    with open(out, "w") as f:
        f.write("/* Generato da tools/genera_fiumi.py: non modificare a mano */\n")
        f.write("window.FIUMI = " + json.dumps(dati, separators=(",", ":")) + ";\n")
    print(f"{len(feats)} tratti di fiume, Dora: {len(dati['dora'])} punti -> {out}", file=sys.stderr)


if __name__ == "__main__":
    main()
