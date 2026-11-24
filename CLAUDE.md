# Geografia interattiva – regole del progetto

Sito statico (HTML/JS, Leaflet, niente build) per studiare le regioni italiane.
Pubblicato con GitHub Pages dal branch `main`. Struttura e comandi: vedi `README.md`.
Per aggiungere una regione usa la skill **`/nuova-regione`** (`.claude/skills/nuova-regione/SKILL.md`).

Scrivi sempre in **italiano** (testi del sito, commenti, commit, risposte all'utente).

## Pubblico e contenuti

- Pubblico: **quinta elementare / prima media** (10–11 anni). Frasi brevi, parole semplici; i termini del libro
  (es. "settore terziario", "idroelettrica") vanno bene ma spiegati.
- **Il riferimento è il libro di testo** (Geografia vol. 5; pagine in `REGIONE.libro`). Prima di scrivere i testi
  di una regione chiedi all'utente le **foto delle pagine del libro** e usa **i numeri del libro**
  (es. Monte Bianco 4.807 m) anche se altre fonti dicono altro; se c'è differenza, una nota nella scheda.
- Quello che **non è nel libro** si può tenere ma va segnato come approfondimento:
  `[[frase]]` dentro i testi, `extra: true` su luoghi e domande. Il sito lo mostra in viola con 📚.
- Le categorie fuori dal libro (es. "Sci e terme") partono spente: `spenta: true` in `CATEGORIE`.
  Legenda in **ordine di importanza** per lo studio (montagne/territorio, città, acque, collegamenti, prodotti, monumenti, turismo).
- Dopo aver scritto i testi, **confronta con il libro** e fai all'utente la tabella "cosa manca / cosa è in più / numeri diversi".
- Non copiare immagini o testi del libro (copyright): si riscrive con parole nostre e si ricreano le cartine da dati aperti.

## Cosa contiene ogni regione (`regioni/<id>/dati.js`)

Stessa struttura della Valle d'Aosta, da usare come modello:
- `CATEGORIE` (icona, colore, `spenta`) e `LUOGHI` (25–35: `id, nome, cat, lat, lng, sottotitolo, testo, punti, ricorda`)
- `FIUME_INFO`, `ETICHETTE_FISICHE` (catene, pianure, valli, cime, fiumi, laghi), `CITTA` (carta politica), `CONFINANTI`
- `SCHEDA` (sezioni: carta d'identità con i numeri del libro, confini e territorio, popolazione e lingue,
  clima e ambienti con fasce di vegetazione, storia breve, economia con occupati per settore, comunicazioni, tradizioni)
- `DOMANDE_RISPOSTE` (~25, a tendina), `FLASHCARD` (~40, risposte corte)
- `SEZIONI_DOMANDE` + `DOMANDE` (≥ 50, almeno 3 per sezione, `sez` obbligatorio; il quiz pesca almeno una domanda per sezione)
- `DISCORSO` (3–4 minuti, parole chiave tra `**`), `FLUSSO` (domande dell'insegnante in ordine: generale → cartina → dettagli,
  con `seguito`, `tipo: "trabocchetto" | "ragionamento"`, `mappa`), `TRABOCCHETTI`, `CONSIGLI`
- `TOUR` (visita guidata, ~14 tappe, solo argomenti del libro, ultima con `fine: true`)

## Cartine: decisioni prese (non tornare indietro)

- **Niente servizi che chiedono chiavi o che possono sparire** per le cartine principali. CARTO ha iniziato a mostrare
  "API KEY REQUIRED"; Esri "World Terrain Base" non ha dati a zoom regionale. Fisica e politica sono **generate da noi**
  con gli script in `tools/` e salvate nel repository (funzionano offline). Satellite/Escursionistica/Semplice sono
  solo extra online: i pulsanti compaiono solo se una tessera di prova si carica.
- Rilievo: Terrain Tiles (AWS, formato Terrarium), colori da atlante, ombreggiatura, laghi e mare in blu; zoom `zoom_min`–11
  su `area_larga`, 12 su `area_regione`. Tenere d'occhio la dimensione (Valle d'Aosta ≈ 5 MB).
- Fiumi: Priority-Flood + accumulo del deflusso a zoom 10; in pianura solo i fiumi grandi (il piatto crea falsi ruscelli).
- Politica: province e comuni da openpolis (ISTAT), Stati vicini da Natural Earth. Comuni solo se la regione ne ha pochi
  (`politica.comuni`), altrimenti province. Noto: in Natural Earth il **Lago Maggiore** si chiama per errore "Lago di Como"
  (lo script lo corregge); tra confini NE e ISTAT restano strisce vuote (lo script le riempie).
- Le zone (es. catene montuose) sono poligoni in `regione.js` intersecati con la regione; `resto: true` = quello che avanza.

## Voce della visita guidata

- Una sola voce per tutte le regioni: **"Paola"** di Piper (italiana, femminile, "dolce come una maestra"),
  **registrata in mp3** (`tools/genera_audio.py`): niente sintesi del browser (ogni dispositivo ha voci diverse).
- Impostazioni fisse nello script (più lenta, pause tra le frasi, audio ammorbidito). Il testo viene preparato
  (numeri senza puntino delle migliaia, "a.C." → "avanti Cristo", "m" → "metri", niente emoji).
- Se cambi i testi di `TOUR`, **rigenera l'audio** (`controlla_dati.js` se ne accorge) e aumenta `AUDIO_V` in `app/app.js`.
- Il modello si scarica da Hugging Face: serve l'ambiente cloud **"geografia-interattiva"** (permette huggingface.co,
  us.aws.cdn.hf.co e simili). Non mettere il modello (63 MB) nel repository.

## Codice

- `app/` è comune a tutte le regioni: **niente di specifico di una regione** nel codice (nomi, coordinate, colori):
  va in `regione.js` (impostazioni, lette anche dagli script Python via node) o in `dati.js` (testi).
- Testi in pagina sempre con `esc()`/`ricco()` (niente HTML dai dati, tranne `SCHEDA.html` che è scritto da noi).
- A ogni modifica di file del sito **aumenta `?v=` in `index.html` e `regione.html`** (stesso numero), altrimenti i browser
  usano i file vecchi (è già successo: pallini non cliccabili).
- Mobile first: prova sempre a 390 px di larghezza; nessuno scorrimento orizzontale; testo che si ingrandisce con A+ (`rem`, `--scala`).

## Verifica prima di dire "fatto"

1. `node tools/controlla_dati.js <id>` → nessun errore
2. `node tools/prova_sito.js <id> <cartella>` → tutto ✅ (Playwright e Chromium sono già installati nell'ambiente cloud)
3. **Guarda gli screenshot** (computer e telefono): sovrapposizioni di scritte e pallini, cartina vuota, testo tagliato.
   Le prove non vedono tutto: un bug del bordo della visita guidata l'hanno trovato solo le prove automatiche,
   le sovrapposizioni solo gli screenshot.
4. Le cartine online (Satellite ecc.) e l'audio vero non si possono vedere/ascoltare da qui: dillo all'utente.

## Git

- Lavora su `main` (repository personale, sito pubblicato da `main`), commit piccoli con messaggio in italiano.
- Prima del push: le prove sopra. Il push pubblica il sito.
