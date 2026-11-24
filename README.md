# Geografia interattiva – Valle d'Aosta

Sito statico per studiare la Valle d'Aosta (livello quinta elementare / medie).
Si clicca un punto sulla cartina e si legge la sua scheda con le informazioni principali.

## Cosa contiene

- **Cartine diverse**, come negli atlanti di scuola (si scelgono in alto a destra):
  - **Fisica**: rilievo a colori creato con i dati di altitudine reali (verde = valli, marrone = montagne, bianco = nevi e ghiacciai, blu = laghi), fiumi, catene montuose, valli, cime con l'altezza, laghi e pianure
  - **Politica**: Stati, regioni, province, cantoni svizzeri e dipartimenti francesi colorati, i 74 comuni della Valle d'Aosta, città, strade principali e confini
  - **Satellite**: foto dal satellite
  - nel menu **Altre**: **Escursionistica** (OpenTopoMap, con sentieri e curve di livello) e **Semplice** (solo il rilievo in grigio)
  - Satellite, Escursionistica e Semplice hanno bisogno di internet: i loro pulsanti compaiono solo quando il sito riesce a caricarle
- I **fiumi** e il tracciato della **Dora Baltea** sono calcolati dai dati di altitudine (dove scorre l'acqua), quindi seguono le valli vere
- **Nomi dei luoghi** che compaiono quando ti avvicini con lo zoom (o passando sopra col mouse)
- **Legenda** sulla cartina: tocca una categoria per mostrarla o nasconderla; c'è anche la scala dell'altitudine (carta fisica) o dei confini (carta politica)
- **31 luoghi** divisi in 7 categorie:
  - 🏘️ Città e paesi: Aosta, Cogne, Valle del Lys (Walser), Pont-Saint-Martin
  - ⛰️ Montagne e ghiacciai: Monte Bianco, Cervino, Monte Rosa, Gran Paradiso, Miage, Mont Dolent (dove si incontrano Italia, Francia e Svizzera)
  - 🏰 Castelli e monumenti: Fénis, Verrès e Issogne, Forte di Bard, Sarre, Castel Savoia
  - 🦌 Parchi, laghi e fiumi: Parco del Gran Paradiso, Mont Avic, Place-Moulin, Dora Baltea
  - 🚗 Passi e trafori: Traforo del Monte Bianco, Gran San Bernardo, Piccolo San Bernardo
  - ⛷️ Sci e terme: Courmayeur, Cervinia, La Thuile, Pila, Monterosa Ski, Pré-Saint-Didier, Saint-Vincent
  - 🧀 Prodotti tipici: Fontina (Valpelline), lardo di Arnad, vigneti di Morgex e La Salle
- **Scheda di ogni luogo**: testo, informazioni principali e una frase "Da ricordare"
- **Scheda della regione**: carta d'identità (superficie, abitanti, densità, capoluogo, stemma), confini e territorio, popolazione, lingue, clima e fasce di vegetazione, storia, economia con gli occupati per settore, comunicazioni, cucina e tradizioni. I numeri sono quelli del libro di testo (Geografia vol. 5)
- **Esercitati** (pulsante Quiz), due modalità:
  - **Dov'è?**: compare il nome di un luogo e bisogna trovarlo sulla cartina (pallini tutti grigi)
  - **Domande e vero/falso**: 12 domande a caso su 32, come gli esercizi del libro, con la spiegazione dopo ogni risposta
- **Paralleli e meridiani** sulla cartina (si possono nascondere dalla legenda)
- Funziona su computer e telefono, in tema chiaro e scuro

## Come aprirlo

Non serve installare niente: basta aprire `index.html` con il browser.
Funziona anche senza internet: la carta fisica e la carta politica sono salvate nel sito (cartelle `tiles/` e `data/`). Solo Satellite, Escursionistica e Semplice hanno bisogno della connessione: senza internet i loro pulsanti non compaiono.

### Pubblicarlo online con GitHub Pages

1. Carica questa cartella in un repository su GitHub
2. Vai su **Settings → Pages**
3. In "Branch" scegli `main` e la cartella `/ (root)`, poi **Save**
4. Dopo un minuto il sito sarà online su `https://<tuo-utente>.github.io/<nome-repo>/`

## Struttura

```
index.html          pagina principale
css/style.css       grafica
js/data.js          TUTTI i testi: luoghi, categorie, scheda della regione, domande del quiz
js/app.js           logica della mappa, del pannello e del quiz
data/confine.js     confine della regione (GeoJSON)
data/fiumi.js       fiumi e Dora Baltea (generato con tools/genera_fiumi.py)
data/politica.js    aree, comuni, confini, strade, laghi (generato con tools/genera_politica.py)
tiles/rilievo/      rilievo della carta fisica (generato con tools/genera_rilievo.py)
tools/              script per rigenerare i dati
vendor/leaflet/     libreria Leaflet 1.9.4 per la cartina
```

### Dopo ogni modifica

In `index.html` i file hanno un numero di versione (`app.js?v=8`). Quando modifichi CSS o JavaScript, aumenta il numero (`?v=9`, `?v=10`…): così i browser scaricano i file nuovi invece di usare quelli vecchi salvati in memoria.

### Aggiungere una domanda

In `js/data.js`, nell'elenco `DOMANDE`:

```js
{ tipo: "scelta", d: "La domanda?", opzioni: ["A", "B", "C"], giusta: 1, spiega: "Perché è B." },
{ tipo: "vf", d: "Un'affermazione.", vero: false, spiega: "Perché è falsa." }
```

### Aggiungere o modificare un luogo

Apri `js/data.js`, copia uno degli oggetti nell'elenco `LUOGHI` e cambia i campi:

```js
{
  id: "esempio", nome: "Nome del luogo", cat: "castelli",   // categoria: citta, montagne, castelli, natura, passi, turismo, sapori
  lat: 45.70, lng: 7.40,                                    // coordinate (da Google Maps: tasto destro sul punto)
  sottotitolo: "Una riga di descrizione",
  testo: "Il paragrafo principale...",
  punti: ["Informazione 1", "Informazione 2"],
  ricorda: "La frase da ricordare per l'interrogazione"
}
```

### Rigenerare le cartine

```bash
pip install numpy pillow shapely
python3 tools/genera_rilievo.py     # rilievo a colori (tessere in tiles/rilievo)
python3 tools/genera_fiumi.py       # fiumi e Dora Baltea dai dati di altitudine
python3 tools/genera_politica.py    # dati della carta politica
```

Colori, area coperta e soglie si cambiano all'inizio di ogni script. Le scritte della carta fisica (catene, valli, cime, fiumi) e le città della carta politica sono in `js/data.js` (`ETICHETTE_FISICHE` e `CITTA`).

## Fonti e licenze

- Confine regionale: [openpolis/geojson-italy](https://github.com/openpolis/geojson-italy) (dati ISTAT, CC-BY)
- Rilievo e fiumi: dati di altitudine [Terrain Tiles](https://registry.opendata.aws/terrain-tiles/) su AWS Open Data (SRTM, EU-DEM © Copernicus e altre fonti), elaborati con gli script in `tools/`
- Escursionistica: © contributori [OpenStreetMap](https://www.openstreetmap.org/copyright), stile [OpenTopoMap](https://opentopomap.org) (CC-BY-SA)
- Semplice: rilievo © [Esri](https://www.esri.com)
- Carta politica: province e comuni italiani da [openpolis/geojson-italy](https://github.com/openpolis/geojson-italy) (dati ISTAT, CC-BY); Stati, cantoni, dipartimenti, strade e laghi da [Natural Earth](https://www.naturalearthdata.com) (pubblico dominio)
- Sfondo Satellite: © [Esri](https://www.esri.com)
- Libreria [Leaflet](https://leafletjs.com) (licenza BSD-2, vedi `vendor/leaflet/LICENSE`)
