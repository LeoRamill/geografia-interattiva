/*
 * Impostazioni della regione: le usano sia il sito (app/app.js) sia gli script in tools/.
 * Coordinate: [lat, lng] per i punti; le aree sono [lng_min, lat_min, lng_max, lat_max].
 */
window.REGIONE = {
  id: "piemonte",
  nome: "Piemonte",
  con_articolo: "il Piemonte",
  istat: 1,
  sottotitolo: "Ai piedi delle Alpi occidentali, con montagne, colline e pianura: qui nasce il Po.",
  bandiera: ["#d52b1e", "#ffffff", "#d52b1e"],    // colori di riserva, se manca bandiera_svg
  // croce bianca su fondo rosso con il "lambello" azzurro in alto (come nel libro, p. 35)
  bandiera_svg: '<svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"><rect width="30" height="30" fill="#d52b1e"/><rect x="12" width="6" height="30" fill="#fff"/><rect y="12" width="30" height="6" fill="#fff"/><rect x="3" y="2" width="24" height="3" fill="#2b63b0"/><rect x="6" y="5" width="3" height="4" fill="#2b63b0"/><rect x="13.5" y="5" width="3" height="4" fill="#2b63b0"/><rect x="21" y="5" width="3" height="4" fill="#2b63b0"/></svg>',
  libro: "Geografia vol. 5, pp. 34–37",
  pronuncia: { "Frejus": "Fregiùs" },             // come deve leggere la voce della visita guidata

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
    ricorda: "nasce dal Monviso, passa per Torino e attraversa la Pianura Padana."
  },

  // montagna e collina calcolate dai dati di altitudine (tools/genera_zone.py), la pianura è il resto
  zone: [
    { id: "montagna", nome: "Montagna", con_articolo: "la montagna", altimetria: "montagna",
      colore: "#92400e", etichetta: [45.28, 7.18],
      ricorda: "il 43% del Piemonte: le Alpi a nord, a ovest e a sud-ovest, l'Appennino Ligure a sud." },
    { id: "collina", nome: "Collina", con_articolo: "la collina", altimetria: "collina",
      colore: "#ca8a04", etichetta: [44.75, 8.15],
      ricorda: "il 30% del Piemonte: al centro, con le Langhe e il Monferrato." },
    { id: "pianura", nome: "Pianura", con_articolo: "la pianura", resto: true,
      colore: "#16a34a", etichetta: [45.30, 8.30],
      ricorda: "il 27% del Piemonte: a est c'è la Pianura Padana, con le sue risaie." }
  ],

  politica: { comuni: false }                     // 1.180 comuni: troppi, si vedono le province
};
