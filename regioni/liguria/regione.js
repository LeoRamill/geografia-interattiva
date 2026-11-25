/*
 * Impostazioni della regione: le usano sia il sito (app/app.js) sia gli script in tools/.
 * Coordinate: [lat, lng] per i punti; le aree sono [lng_min, lat_min, lng_max, lat_max].
 */
window.REGIONE = {
  id: "liguria",
  nome: "Liguria",
  con_articolo: "la Liguria",
  istat: 7,
  sottotitolo: "Uno stretto arco di montagne e colline affacciato sul Mar Ligure.",
  bandiera: ["#ffffff", "#c8102e", "#ffffff"],    // colori di riserva, se manca bandiera_svg
  // stemma come nel libro (p. 39): croce rossa di San Giorgio con quattro stelle, sopra la forma di una nave
  bandiera_svg: '<svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"><rect width="30" height="30" fill="#f4f6f8"/><rect x="5" y="3" width="20" height="16" fill="#fff" stroke="#8a95a3" stroke-width=".8"/><rect x="13" y="3" width="4" height="16" fill="#c8102e"/><rect x="5" y="9" width="20" height="4" fill="#c8102e"/><circle cx="9" cy="6" r="1.3" fill="#8a95a3"/><circle cx="21" cy="6" r="1.3" fill="#8a95a3"/><circle cx="9" cy="16" r="1.3" fill="#8a95a3"/><circle cx="21" cy="16" r="1.3" fill="#8a95a3"/><path d="M3 20 H27 Q24 28 15 28 Q6 28 3 20 Z" fill="#7b8794"/></svg>',
  libro: "Geografia vol. 5, pp. 38–41",
  pronuncia: { "Beigua": "Bèigua" },              // parole che la voce legge male (vedi controllo in genera_audio)

  area_larga: [6.70, 42.60, 10.72, 45.85],        // più alta del necessario: la Liguria è stretta e il telefono è alto
  area_regione: [7.47, 43.75, 10.10, 44.71],
  zoom_min: 7,                                    // la Liguria è lunga e stretta: sul telefono serve lo zoom 7

  // la Liguria non ha un "fiume principale": il libro distingue i fiumi brevi che vanno al mare e quelli
  // più lunghi che vanno verso nord, nel Po. Sulla cartina si disegna lo Scrivia, uno di questi.
  fiume: {
    nome: "Scrivia",
    con_articolo: "lo Scrivia",
    sorgente: [44.522, 9.125],                    // vicino a Torriglia, nell'Appennino Ligure
    fine: [44.72, 8.86],                          // Serravalle Scrivia, già in Piemonte
    foce: "verso il Po",
    etichetta: [44.59, 8.95],
    ricorda: "nasce nell'Appennino Ligure e va verso nord: è uno dei fiumi che finiscono nel Po."
  },

  // in Liguria le montagne scendono ripide fino al mare: soglie più basse per avere 65% / 35% come nel libro
  altimetria_soglie: { montagna_quota: 480, montagna_quota_min: 330, montagna_dislivello: 400 },

  zone: [
    // montagna e collina (il libro: 65% e 35%, niente pianura)
    { id: "montagna", nome: "Montagna", con_articolo: "la montagna", altimetria: "montagna", gruppo: "rilievo",
      colore: "#92400e", etichetta: [44.47, 9.12],
      ricorda: "il 65% della Liguria: le Alpi Marittime a ovest e l'Appennino Ligure." },
    { id: "collina", nome: "Collina", con_articolo: "la collina", resto: true, gruppo: "rilievo",
      colore: "#ca8a04", etichetta: [44.20, 8.34],
      ricorda: "il 35% della Liguria: le colline arrivano fino al mare." },
    // le due Riviere, a ovest e a est del Golfo di Genova (Genova è il punto di divisione)
    { id: "ponente", nome: "Riviera di Ponente", con_articolo: "la Riviera di Ponente", gruppo: "riviera", cat: "mare",
      costa: { km: 6, ovest: 7.0, est: 8.93 }, colore: "#0e7490", etichetta: [44.14, 8.23],
      ricorda: "a ovest di Genova: i rilievi scendono dolcemente verso il mare e ci sono spiagge." },
    { id: "levante", nome: "Riviera di Levante", con_articolo: "la Riviera di Levante", gruppo: "riviera", cat: "mare",
      costa: { km: 6, ovest: 8.93, est: 10.2 }, colore: "#7c3aed", etichetta: [44.215, 9.585],
      ricorda: "a est di Genova: le montagne arrivano a picco sul mare, coste alte e rocciose." }
  ],

  politica: {
    comuni: false,                                // 234 comuni: si vedono le 4 province
    etichette: { "Savona": [44.20, 8.26], "Imperia": [44.02, 7.86] }   // nomi spostati: lì sotto c'erano i pallini
  }
};
