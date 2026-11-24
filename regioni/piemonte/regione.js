/*
 * Impostazioni della regione: le usano sia il sito (app/app.js) sia gli script in tools/.
 * Coordinate: [lat, lng] per i punti; le aree sono [lng_min, lat_min, lng_max, lat_max].
 */
window.REGIONE = {
  id: "piemonte",
  nome: "Piemonte",
  con_articolo: "il Piemonte",
  istat: 1,
  sottotitolo: "Una grande regione ai piedi delle Alpi, dove nasce il Po.",   // DA CONTROLLARE con il libro
  bandiera: ["#c8102e", "#ffffff", "#c8102e"],    // croce bianca in campo rosso (semplificata)
  libro: "Geografia vol. 5 (pagine da indicare)",

  area_larga: [5.83, 43.76, 9.86, 46.74],
  area_regione: [6.60, 44.03, 9.24, 46.49],
  zoom_min: 7,                                    // il Piemonte è grande: a zoom 8 non sta intero sul telefono
  fiumi_quota_pianura: 600,                       // la pianura di Cuneo è alta: sotto i 600 m solo i fiumi grandi

  fiume: {
    nome: "Po",
    con_articolo: "il Po",
    sorgente: [44.701, 7.093],                    // Pian del Re, ai piedi del Monviso
    fine: [45.13, 9.10],                          // vicino a Pavia, dopo l'uscita dal Piemonte
    foce: "verso il mare Adriatico",
    etichetta: [45.07, 7.70],
    ricorda: "nasce dal Monviso, attraversa Torino e la pianura e sfocia nel mare Adriatico: è il fiume più lungo d'Italia."
  },

  // montagna e collina calcolate dai dati di altitudine (tools/genera_zone.py), la pianura è il resto
  zone: [
    { id: "montagna", nome: "Montagna", con_articolo: "la montagna", altimetria: "montagna",
      colore: "#92400e", etichetta: [45.28, 7.18],
      ricorda: "le Alpi circondano il Piemonte a nord, a ovest e a sud." },
    { id: "collina", nome: "Collina", con_articolo: "la collina", altimetria: "collina",
      colore: "#ca8a04", etichetta: [44.75, 8.15],
      ricorda: "al centro e a sud-est: Langhe, Roero e Monferrato." },
    { id: "pianura", nome: "Pianura", con_articolo: "la pianura", resto: true,
      colore: "#16a34a", etichetta: [45.30, 8.30],
      ricorda: "la Pianura Padana, lungo il Po: intorno a Torino, Vercelli e Novara." }
  ],

  politica: { comuni: false }                     // 1.180 comuni: troppi, si vedono le province
};
