---
name: nuova-regione
description: Aggiunge una nuova regione italiana al sito Geografia interattiva (cartine, testi dal libro di testo, quiz, flashcard, interrogazione, visita guidata con voce). Usala quando l'utente chiede di fare una nuova regione, es. "/nuova-regione Piemonte".
---

# Nuova regione: $ARGUMENTS

Segui i passi in ordine. Leggi prima `CLAUDE.md` (regole e decisioni) e usa la **Valle d'Aosta**
(`regioni/valle-aosta/`) come modello per struttura, tono e quantità dei contenuti.
Tieni l'utente aggiornato con frasi brevi in italiano; mostragli gli screenshot alla fine.

## 0. Prima di iniziare

- [ ] Chiedi all'utente le **foto delle pagine dei due libri di testo** sulla regione («Geografia» vol. 5 e
      «Che meraviglia!» Geografia 5: testo, cartina, dati, esercizi). Senza i libri non scrivere i testi:
      puoi fare solo i passi 1–3 (cartine).
- [ ] Trova l'`id` (cartella) e il codice ISTAT in `regioni/regioni.js`.
- [ ] Controlla l'ambiente: per l'audio serve l'ambiente cloud "geografia-interattiva" (Hugging Face raggiungibile).

## 1. Impostazioni (`regioni/<id>/regione.js`)

- [ ] Copia `regioni/valle-aosta/regione.js` e cambia: `id`, `nome`, `con_articolo` ("il Piemonte", "le Marche",
      "l'Emilia-Romagna"), `istat`, `sottotitolo`, `bandiera` (colori della bandiera regionale), `libro` (pagine di tutti e due i libri).
- [ ] Lancia `python3 tools/genera_confine.py --regione <id>`: scrive `confine.js` e **suggerisce `area_regione` e
      `area_larga`**. Copiali in `regione.js`. Per regioni grandi o lunghe (Sicilia, Sardegna, Puglia, Toscana…)
      metti `zoom_min: 7` così la regione intera sta anche sullo schermo del telefono.
      Se la regione è **stretta e lunga** (Liguria) allarga `area_larga` in altezza, se no sul telefono restano bande bianche.
- [ ] `fiume`: il fiume principale del libro. `sorgente` = un punto vicino alla sorgente nel fondovalle,
      `fine` = dove fermarsi (foce o uscita dalla regione), `foce` = scritta finale ("verso il Po", "verso il mare Adriatico"),
      `etichetta`, `ricorda`, `con_articolo` ("il Po", "l'Adige").
- [ ] `zone`: 1–3 zone utili per il quiz "Dov'è?" e la visita. Di solito **montagna / collina / pianura**
      (`altimetria: "montagna"`, `altimetria: "collina"`, pianura con `resto: true`: vedi `regioni/piemonte/regione.js`);
      oppure catene montuose o isole con `poligono` [[lng, lat], …] approssimato (verrà tagliato sul confine).
      Colore, `etichetta` (un punto dentro la zona), `plurale`. Se la regione non ha zone sensate, lascia `zone: []`.
- [ ] `politica.comuni`: `true` solo se la regione ha pochi comuni (< 150), altrimenti `false` (si vedono le province).
- [ ] In `regioni/regioni.js` la regione c'è già con `pronta: false`: lasciala così finché non è finita.

## 2. Cartine (dati generati)

```bash
python3 tools/genera_rilievo.py --regione <id>
# nell'ambiente cloud, se Python dà errori di certificato: SSL_CERT_FILE=/root/.ccr/ca-bundle.crt davanti al comando
python3 tools/genera_fiumi.py   --regione <id>
python3 tools/genera_politica.py --regione <id>
python3 tools/genera_zone.py    --regione <id>
```

- [ ] Guarda il rilievo: unisci alcune tessere di zoom 9–10 in un'immagine e controllala (mare blu, laghi blu,
      niente macchie strane). Dimensione di `tiles/` ragionevole (pochi MB).
- [ ] Guarda i fiumi sopra il rilievo: il fiume principale deve seguire la valle fino a `fine`; niente linee nel mare o nei laghi.
      Se la pianura è piena di falsi ruscelli, alza `fiumi_quota_pianura` in `regione.js`.
- [ ] Carta politica: regioni e Stati vicini con colori diversi, mare azzurro se c'è, nomi giusti dei laghi,
      niente strisce vuote o azzurre lungo i confini, confine di Stato solo sulla terra.
- [ ] Zone: guarda le percentuali stampate da `genera_zone.py` e confrontale con il grafico del libro.
- [ ] Per vedere le cartine nel sito prima dei testi: un `dati.js` provvisorio minimo e `pronta: true` solo in locale
      (poi toglili, non vanno pubblicati).

## 3. Testi (`regioni/<id>/dati.js`)

Copia `regioni/valle-aosta/dati.js` come scheletro e **riscrivi tutto** per la nuova regione, partendo dai due libri
(numeri di «Geografia», con la nota quando «Che meraviglia!» dice altro: vedi CLAUDE.md):

- [ ] `CATEGORIE` adatte alla regione (es. "Mare e coste", "Isole"), in **ordine di importanza**; quelle fuori dal libro `spenta: true`.
- [ ] `LUOGHI` (25–35) con coordinate vere (controlla che siano dentro la regione); ciò che non è nei libri con `extra: true` o `[[ ]]`.
- [ ] `FIUME_INFO`, `ETICHETTE_FISICHE` (catene, pianure, valli, cime, fiumi con `km2`, laghi, mari), `CITTA`, `CONFINANTI`.
- [ ] `SCHEDA` con **i numeri del libro** (superficie, abitanti, densità, capoluogo, occupati per settore) e le note
      dell'altro libro; nella carta d'identità la riga `<li class="libri">📖 Libri: …</li>`.
- [ ] `DOMANDE_RISPOSTE`, `FLASHCARD`, `SEZIONI_DOMANDE` + `DOMANDE` (≥ 50, ≥ 3 per sezione, come gli esercizi del libro).
- [ ] `DISCORSO`, `FLUSSO` (con domande "alla cartina" che usano `mappa`), `TRABOCCHETTI`, `CONSIGLI`.
- [ ] `TOUR`: ~14 tappe con `vista`, `carta`, `luci`, `zone`, `fiume`; solo argomenti del libro, parole semplici.
- [ ] Ogni frase che non è in nessuno dei due libri: `[[ ]]`. Confronta poi con i libri e prepara per l'utente la tabella
      **cosa manca / cosa è in più / numeri diversi**.

## 4. Voce della visita guidata

```bash
pip install piper-tts      # e ffmpeg
# scarica it_IT-paola-medium.onnx e .onnx.json da
# https://huggingface.co/rhasspy/piper-voices/tree/main/it/it_IT/paola/medium  (fuori dal repository!)
python3 tools/genera_audio.py --regione <id> --voce /percorso/it_IT-paola-medium.onnx
```

- [ ] Controlla la pronuncia delle parole difficili con `voce.phonemize(...)` (numeri, nomi stranieri o dialettali).
      Se una parola viene male, aggiungila a `pronuncia` in `regione.js` (es. `{ "Frejus": "Fregiùs" }`).
- [ ] Manda all'utente un mp3 da ascoltare.

## 5. Verifica

- [ ] `node tools/controlla_dati.js <id>` → nessun errore (leggi anche gli avvisi).
- [ ] Metti temporaneamente `pronta: true` e lancia `node tools/prova_sito.js <id> <cartella-scratchpad>` → tutto ✅.
- [ ] **Guarda gli screenshot** (home, regione, scheda, politica, visita, telefono): scritte sovrapposte, pallini troppo vicini,
      cartina tagliata o vuota, testo troppo lungo sul telefono. Correggi e riprova.
- [ ] Guarda anche alcune **tappe della visita** (quelle con le zone e con più luoghi), sul computer e sul telefono.
- [ ] Aumenta `?v=` in `index.html` e `regione.html`.

## 6. Pubblicazione

- [ ] `pronta: true` in `regioni/regioni.js`, aggiorna l'elenco delle regioni pronte nel `README.md`
      e aggiungi il link diretto (`regione.html?r=<id>`) in cima al `README.md`.
- [ ] Commit in italiano e push su `main` (il sito si aggiorna con GitHub Pages).
- [ ] Riassumi all'utente: cosa c'è, il confronto con il libro, cosa non hai potuto verificare (cartine online, audio vero).
