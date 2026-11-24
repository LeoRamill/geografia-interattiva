#!/usr/bin/env python3
"""
Registra la voce della visita guidata: un file audio per ogni tappa (regioni/<id>/audio/tour/NN.mp3).

Voce: "Paola" di Piper (sintesi vocale neurale libera), italiana, femminile.
Così la voce è sempre la stessa su tutti i dispositivi e funziona anche offline.

Uso:
    pip install piper-tts
    # scarica la voce (2 file) da
    # https://huggingface.co/rhasspy/piper-voices/tree/main/it/it_IT/paola/medium
    python3 tools/genera_audio.py --regione valle-aosta --voce percorso/it_IT-paola-medium.onnx

Richiede anche node (per leggere le tappe da regioni/<id>/dati.js) e ffmpeg (per creare gli mp3).
Dopo aver cambiato i testi della visita (TOUR in regioni/<id>/dati.js) bisogna rigenerare l'audio
e aumentare AUDIO_V in app/app.js.
"""
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
import wave

from piper import PiperVoice, SynthesisConfig

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from regione import argomenti, cartella, leggi_js  # noqa: E402

# Tono "da maestra": un po' più lento del normale e con pause tra le frasi
CONFIG = SynthesisConfig(length_scale=1.12, noise_scale=0.6, noise_w_scale=0.8)
PAUSA_TITOLO = 0.55   # secondi dopo il titolo
PAUSA_FRASE = 0.40    # secondi tra una frase e l'altra
# audio più morbido: toglie i bassi rumorosi e le frequenze più taglienti, volume uniforme
FILTRI = "highpass=f=70,lowpass=f=9500,acompressor=threshold=-20dB:ratio=2:attack=20:release=200,loudnorm=I=-18:TP=-2"


def da_leggere(t):
    """Stesse regole del sito: niente emoji, sigle e unità scritte per intero."""
    t = re.sub(r"[\U0001F000-\U0001FAFF☀-➿️]", "", t)
    t = re.sub(r"\ba\.C\.", "avanti Cristo", t)
    t = re.sub(r"\bd\.C\.", "dopo Cristo", t)
    t = re.sub(r"(\d)\s?km²", r"\1 chilometri quadrati", t)
    t = re.sub(r"(\d)\s?m\b", r"\1 metri", t)
    t = re.sub(r"(\d)\s?%", r"\1 per cento", t)
    t = re.sub(r"\bA5\b", "A cinque", t)
    t = re.sub(r"(\d)\.(?=\d{3}\b)", r"\1", t)          # 4.807 -> 4807
    t = re.sub(r"\s+", " ", t).strip()
    return [f for f in re.split(r"(?<=[.!?:])\s+", t) if re.search(r"\w", f)]


def main():
    args = argomenti("Registra la voce della visita guidata", lambda ap: ap.add_argument(
        "--voce", required=True, help="file .onnx della voce (con accanto il .onnx.json)"))
    tappe = leggi_js(cartella(args.regione, "dati.js"), "TOUR")
    voce = PiperVoice.load(args.voce)
    sr = voce.config.sample_rate
    out_dir = cartella(args.regione, "audio", "tour")
    if os.path.isdir(out_dir):
        shutil.rmtree(out_dir)                          # niente file di tappe vecchie
    os.makedirs(out_dir)
    for n, t in enumerate(tappe, start=1):
        pezzi = [(da_leggere(t["titolo"]), PAUSA_TITOLO), (da_leggere(t["testo"]), PAUSA_FRASE)]
        with tempfile.TemporaryDirectory() as tmp:
            wav = os.path.join(tmp, "tappa.wav")
            with wave.open(wav, "wb") as out:
                out.setnchannels(1)
                out.setsampwidth(2)
                out.setframerate(sr)
                out.writeframes(b"\0\0" * int(sr * 0.25))                   # breve silenzio iniziale
                for frasi, pausa in pezzi:
                    for f in frasi:
                        for chunk in voce.synthesize(f, syn_config=CONFIG):
                            out.writeframes(chunk.audio_int16_bytes)
                        out.writeframes(b"\0\0" * int(sr * pausa))
            mp3 = os.path.join(out_dir, f"{n:02d}.mp3")
            subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", wav, "-af", FILTRI,
                            "-ac", "1", "-ar", "22050", "-codec:a", "libmp3lame", "-b:a", "48k", mp3], check=True)
            with wave.open(wav) as w:
                secondi = w.getnframes() / sr
        print(f"{n:02d}.mp3  {secondi:5.1f} s  {t['titolo']}")
    # i testi registrati: tools/controlla_dati.js li confronta con quelli attuali
    with open(os.path.join(out_dir, "testi.json"), "w") as f:
        json.dump([{"titolo": t["titolo"], "testo": t["testo"]} for t in tappe], f, ensure_ascii=False, indent=1)


if __name__ == "__main__":
    main()
