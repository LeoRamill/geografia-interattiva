# Geografia interattiva – Valle d'Aosta

Sito statico per studiare la Valle d'Aosta (livello quinta elementare / medie).
Si clicca un punto sulla cartina e si legge la sua scheda con le informazioni principali.

## Cosa contiene

- **Cartina in stile atlante**, creata con i dati di altitudine reali: verde = valli, marrone = montagne, bianco = nevi e ghiacciai, blu = laghi. La regione è in evidenza (il resto è sbiadito), con la **Dora Baltea**
- **Tre sfondi** a scelta: Atlante (iniziale, funziona anche senza internet), Satellite, Escursionistica (dettagliata)
- **Nomi dei luoghi** che compaiono quando ti avvicini con lo zoom (o passando sopra col mouse)
- **Legenda** sulla cartina: tocca una categoria per mostrarla o nasconderla; c'è anche la scala dei colori dell'altitudine
- **30 luoghi** divisi in 7 categorie:
  - 🏘️ Città e paesi: Aosta, Cogne, Valle del Lys (Walser), Pont-Saint-Martin
  - ⛰️ Montagne e ghiacciai: Monte Bianco, Cervino, Monte Rosa, Gran Paradiso, Miage
  - 🏰 Castelli e monumenti: Fénis, Verrès e Issogne, Forte di Bard, Sarre, Castel Savoia
  - 🦌 Parchi, laghi e fiumi: Parco del Gran Paradiso, Mont Avic, Place-Moulin, Dora Baltea
  - 🚗 Passi e trafori: Traforo del Monte Bianco, Gran San Bernardo, Piccolo San Bernardo
  - ⛷️ Sci e terme: Courmayeur, Cervinia, La Thuile, Pila, Monterosa Ski, Pré-Saint-Didier, Saint-Vincent
  - 🧀 Prodotti tipici: Fontina (Valpelline), lardo di Arnad, vigneti di Morgex e La Salle
- **Scheda di ogni luogo**: testo, informazioni principali e una frase "Da ricordare"
- **Scheda della regione**: dati, confini, lingue, clima, storia, economia, comunicazioni, cucina e tradizioni
- **Quiz "Dov'è?"**: compare il nome di un luogo e bisogna trovarlo sulla cartina (pallini tutti grigi)
- Funziona su computer e telefono, in tema chiaro e scuro

## Come aprirlo

Non serve installare niente: basta aprire `index.html` con il browser.
Funziona anche senza internet: lo sfondo Atlante è salvato nella cartella `tiles/`. Solo gli sfondi Satellite ed Escursionistica hanno bisogno della connessione.

### Pubblicarlo online con GitHub Pages

1. Carica questa cartella in un repository su GitHub
2. Vai su **Settings → Pages**
3. In "Branch" scegli `main` e la cartella `/ (root)`, poi **Save**
4. Dopo un minuto il sito sarà online su `https://<tuo-utente>.github.io/<nome-repo>/`

## Struttura

```
index.html          pagina principale
css/style.css       grafica
js/data.js          TUTTI i testi: luoghi, categorie, scheda della regione
js/app.js           logica della mappa, del pannello e del quiz
data/confine.js     confine della regione (GeoJSON)
tiles/rilievo/      sfondo Atlante (tessere generate con tools/genera_rilievo.py)
tools/              script per rigenerare lo sfondo dai dati di altitudine
vendor/leaflet/     libreria Leaflet 1.9.4 per la cartina
```

### Dopo ogni modifica

In `index.html` i file hanno un numero di versione (`app.js?v=5`). Quando modifichi CSS o JavaScript, aumenta il numero (`?v=6`, `?v=7`…): così i browser scaricano i file nuovi invece di usare quelli vecchi salvati in memoria.

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

### Rigenerare lo sfondo Atlante

```bash
pip install numpy pillow
python3 tools/genera_rilievo.py
```

Colori, area coperta e livelli di zoom si cambiano all'inizio dello script.

## Fonti e licenze

- Confine regionale: [openpolis/geojson-italy](https://github.com/openpolis/geojson-italy) (dati ISTAT, CC-BY)
- Sfondo Atlante: dati di altitudine [Terrain Tiles](https://registry.opendata.aws/terrain-tiles/) su AWS Open Data (SRTM, EU-DEM © Copernicus e altre fonti), colorati e ombreggiati con `tools/genera_rilievo.py`
- Sfondo Satellite: © [Esri](https://www.esri.com)
- Sfondo escursionistico: © contributori [OpenStreetMap](https://www.openstreetmap.org/copyright), stile [OpenTopoMap](https://opentopomap.org) (CC-BY-SA)
- Libreria [Leaflet](https://leafletjs.com) (licenza BSD-2, vedi `vendor/leaflet/LICENSE`)
- Il tracciato della Dora Baltea è semplificato
