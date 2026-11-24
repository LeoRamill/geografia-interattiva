/*
 * Impostazioni della regione: le usano sia il sito (app/app.js) sia gli script in tools/.
 * Coordinate: [lat, lng] per i punti; le aree sono [lng_min, lat_min, lng_max, lat_max].
 */
window.REGIONE = {
  id: "valle-aosta",
  nome: "Valle d'Aosta",
  con_articolo: "la Valle d'Aosta",          // "il Piemonte", "le Marche", "l'Emilia-Romagna"…
  istat: 2,                                   // codice ISTAT della regione (per confine e comuni)
  sottotitolo: "La regione più piccola d'Italia, tra Francia, Svizzera e Piemonte.",
  bandiera: ["#111111", "#c8102e"],           // colori della bandiera, a strisce verticali
  libro: "Geografia vol. 5, pp. 30–33",       // le pagine del libro di testo usate come riferimento

  // area coperta dalla cartina (rilievo zoom 8–11) e area più stretta per il rilievo dettagliato (zoom 12)
  area_larga: [6.00, 45.10, 8.75, 46.35],
  area_regione: [6.63, 45.39, 8.11, 46.07],
  zoom_min: 8,                                // zoom più lontano della cartina (e del rilievo)

  // fiume principale: tracciato calcolato da tools/genera_fiumi.py dalla sorgente fino a "fine"
  fiume: {
    nome: "Dora Baltea",
    con_articolo: "la Dora Baltea",
    sorgente: [45.812, 6.952],                // Entrèves, ai piedi del Monte Bianco
    fine: [45.20, 8.034],                     // ci si ferma qui (vicino al Po)
    foce: "verso il Po",                      // scritta alla fine del fiume nella visita guidata
    etichetta: [45.737, 7.47],                // dove va lo sguardo nel quiz
    ricorda: "nasce ai piedi del Monte Bianco, attraversa la regione da ovest a est e si getta nel Po."
  },

  // zone della regione per il quiz "Dov'è?" e la visita guidata (tools/genera_zone.py).
  // poligono: [[lng, lat], …] intersecato con la regione; resto: true = quello che avanza
  zone: [
    {
      id: "pennine", nome: "Alpi Pennine", con_articolo: "le Alpi Pennine", plurale: true,
      colore: "#7c3aed", etichetta: [45.93, 7.55],
      ricorda: "a nord, al confine con la Svizzera: Grand Combin, Cervino, Monte Rosa.",
      // a nord della Dora Baltea e a est della Val Ferret (confine semplificato tra le due catene)
      poligono: [[7.072,45.894],[7.072,46.3],[8.3,46.3],[8.3,45.5],[7.85,45.5],[7.795,45.589],[7.791,45.592],[7.779,45.592],[7.782,45.595],[7.776,45.599],[7.765,45.598],[7.746,45.604],[7.741,45.609],[7.743,45.611],[7.741,45.616],[7.732,45.622],[7.735,45.624],[7.734,45.629],[7.715,45.639],[7.716,45.641],[7.706,45.649],[7.709,45.652],[7.692,45.655],[7.677,45.664],[7.675,45.67],[7.676,45.676],[7.666,45.698],[7.67,45.709],[7.668,45.713],[7.669,45.719],[7.66,45.735],[7.64,45.746],[7.629,45.747],[7.613,45.74],[7.595,45.745],[7.57,45.745],[7.519,45.739],[7.51,45.744],[7.492,45.745],[7.48,45.738],[7.463,45.735],[7.412,45.74],[7.404,45.735],[7.389,45.733],[7.346,45.736],[7.337,45.728],[7.331,45.727],[7.323,45.73],[7.285,45.728],[7.241,45.705],[7.228,45.706],[7.217,45.703],[7.213,45.706],[7.194,45.701],[7.18,45.707],[7.155,45.703],[7.144,45.709],[7.125,45.708],[7.096,45.725],[7.08,45.73],[7.058,45.747],[7.032,45.758],[6.987,45.764],[6.967,45.781],[6.967,45.803],[6.96,45.81],[7.03,45.85],[7.072,45.894]]
    },
    {
      id: "graie", nome: "Alpi Graie", con_articolo: "le Alpi Graie", plurale: true,
      colore: "#ea580c", etichetta: [45.58, 7.15],
      ricorda: "a ovest e a sud: Monte Bianco e Gran Paradiso.",
      resto: true
    }
  ],

  // carta politica (tools/genera_politica.py): con pochi comuni si disegnano i comuni, altrimenti le province
  politica: { comuni: true }
};
