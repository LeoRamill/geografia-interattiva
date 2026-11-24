# Geografia interattiva

Sito statico per studiare le **regioni italiane** (livello quinta elementare / prima media).
Si sceglie una regione sulla cartina d'Italia, si esplora la cartina della regione e si ripassa
con schede, visita guidata, quiz, flashcard e prova di interrogazione.

**Regioni pronte:** Valle d'Aosta. Le altre sono "in arrivo": per aggiungerne una, vedi
[Aggiungere una regione](#aggiungere-una-regione).

## Cosa c'è per ogni regione

- **Cartine**, come negli atlanti di scuola (in alto a destra):
  - **Fisica**: rilievo a colori creato con i dati di altitudine reali (verde = pianure e valli, marrone = montagne, bianco = nevi e ghiacciai, blu = laghi e mare), fiumi, catene montuose, valli, cime, laghi e pianure
  - **Politica**: Stati, regioni, province, cantoni e dipartimenti colorati, i comuni (se la regione ne ha pochi), città, strade principali e confini
  - **Satellite**, e nel menu **Altre**: **Escursionistica** e **Semplice**. Hanno bisogno di internet: i loro pulsanti compaiono solo quando il sito riesce a caricarle
- I **fiumi** e il tracciato del **fiume principale** sono calcolati dai dati di altitudine, quindi seguono le valli vere
- **Paralleli e meridiani**, **nomi dei luoghi** che compaiono avvicinandosi, **legenda** con le categorie in ordine di importanza (si accendono e spengono, anche tutte insieme)
- **Luoghi** divisi in categorie, ognuno con la sua **scheda**: testo, informazioni principali, frase "Da ricordare"
- **Scheda della regione**: carta d'identità, confini e territorio, popolazione, clima e ambienti, storia, economia (con gli occupati per settore), comunicazioni, tradizioni; **Domande e risposte** a tendina
- **📚 Approfondimento – non è nel libro**: quello che va oltre il libro di testo è segnato in viola con 📚
- **▶ Visita guidata**: tappe animate sulla cartina con la spiegazione passo passo e la **voce della maestra** (registrata, sempre la stessa su ogni dispositivo, anche offline)
- **Esercitati** (pulsante Quiz): **Dov'è?** (trovare luoghi, fiume e zone sulla cartina), **Domande e vero/falso** (almeno una per ogni sezione a ogni partita), **Flashcard**, **Interrogazione** (discorso con parole chiave da nascondere, cronometro, trabocchetti, simulazione delle domande dell'insegnante)
- Pulsante **A+** per ingrandire il testo; funziona su computer e telefono, in tema chiaro e scuro

## Come aprirlo

Non serve installare niente: basta aprire `index.html` con il browser.
Funziona anche senza internet (cartine fisica e politica, schede, esercizi, voce). Solo le cartine Satellite, Escursionistica e Semplice hanno bisogno della connessione.

Il sito è pubblicato con **GitHub Pages** (Settings → Pages → branch `main`, cartella `/ (root)`).

## Struttura

```
index.html                 pagina iniziale: cartina d'Italia, si sceglie la regione
regione.html               pagina di una regione: regione.html?r=valle-aosta
app/
  carica.js                legge ?r=, controlla la regione e carica i suoi file, poi app.js
  app.js                   codice comune: cartine, schede, quiz, domande, flashcard, interrogazione, visita guidata
  style.css                grafica comune
  home.js, home.css        pagina iniziale
  italia.js                regioni italiane semplificate per la pagina iniziale (tools/genera_italia.py)
regioni/
  regioni.js               elenco delle 20 regioni (pronta: true / false)
  valle-aosta/
    regione.js             IMPOSTAZIONI: nome, codice ISTAT, aree della cartina, fiume principale, zone…
    dati.js                TESTI: categorie, luoghi, scheda, domande, flashcard, interrogazione, visita guidata
    confine.js             confine (tools/genera_confine.py)
    fiumi.js               fiumi e fiume principale (tools/genera_fiumi.py)
    politica.js            carta politica (tools/genera_politica.py)
    zone.js                zone per quiz e visita, es. catene montuose (tools/genera_zone.py)
    tiles/rilievo/         rilievo della carta fisica (tools/genera_rilievo.py)
    audio/tour/            voce della visita guidata, un mp3 per tappa (tools/genera_audio.py)
tools/                     script per generare i dati, controllare e provare il sito
vendor/leaflet/            libreria Leaflet 1.9.4
CLAUDE.md                  regole e decisioni del progetto (per chi ci lavora, anche Claude)
.claude/skills/nuova-regione/   procedura passo passo per aggiungere una regione
```

### Dopo ogni modifica

In `index.html` e `regione.html` i file hanno un numero di versione (`?v=26`). Quando modifichi codice o dati,
**aumenta il numero in tutti e due i file** (`?v=27`…): così i browser scaricano i file nuovi.
`app/carica.js` usa lo stesso numero per i file della regione.

### Controllare e provare

```bash
node tools/controlla_dati.js valle-aosta     # controlla i dati (riferimenti, coordinate, domande, audio…)
node tools/prova_sito.js valle-aosta         # prova tutto nel browser (serve Playwright) e salva screenshot
```

## Aggiungere una regione

La procedura completa è in [`.claude/skills/nuova-regione/SKILL.md`](.claude/skills/nuova-regione/SKILL.md)
(con Claude Code: `/nuova-regione Piemonte`). In breve:

1. Foto delle pagine del libro di testo sulla regione
2. `regioni/<id>/regione.js` (copiando quello della Valle d'Aosta) e `pronta: false` in `regioni/regioni.js`
3. Dati delle cartine:
   ```bash
   pip install numpy pillow shapely
   python3 tools/genera_confine.py --regione <id>     # suggerisce anche area_larga e area_regione
   python3 tools/genera_rilievo.py --regione <id>
   python3 tools/genera_fiumi.py   --regione <id>
   python3 tools/genera_politica.py --regione <id>
   python3 tools/genera_zone.py    --regione <id>
   ```
4. `regioni/<id>/dati.js` con tutti i testi, confrontati con il libro
5. Voce della visita guidata:
   ```bash
   pip install piper-tts                # serve anche ffmpeg
   # it_IT-paola-medium.onnx e .onnx.json da huggingface.co/rhasspy/piper-voices (it/it_IT/paola/medium)
   python3 tools/genera_audio.py --regione <id> --voce it_IT-paola-medium.onnx
   ```
6. `node tools/controlla_dati.js <id>` e `node tools/prova_sito.js <id>`, poi `pronta: true`

## Fonti e licenze

- Confini, province e comuni: [openpolis/geojson-italy](https://github.com/openpolis/geojson-italy) (dati ISTAT, CC-BY)
- Rilievo e fiumi: dati di altitudine [Terrain Tiles](https://registry.opendata.aws/terrain-tiles/) su AWS Open Data (SRTM, EU-DEM © Copernicus e altre fonti), elaborati con gli script in `tools/`
- Stati vicini, strade e laghi: [Natural Earth](https://www.naturalearthdata.com) (pubblico dominio)
- Voce della visita guidata: "Paola" di [Piper](https://github.com/rhasspy/piper) ([piper-voices](https://huggingface.co/rhasspy/piper-voices); registrazioni di addestramento in pubblico dominio, CC0)
- Escursionistica: © contributori [OpenStreetMap](https://www.openstreetmap.org/copyright), stile [OpenTopoMap](https://opentopomap.org) (CC-BY-SA)
- Satellite e Semplice: © [Esri](https://www.esri.com)
- Libreria [Leaflet](https://leafletjs.com) (licenza BSD-2, vedi `vendor/leaflet/LICENSE`)
