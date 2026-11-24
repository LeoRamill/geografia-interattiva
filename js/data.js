/*
 * Dati della mappa: categorie, luoghi e scheda generale della regione.
 * Per aggiungere un luogo basta copiare un oggetto dell'elenco LUOGHI
 * e cambiare nome, coordinate (lat, lng) e testi.
 */

window.CATEGORIE = {
  citta:    { nome: "Città e paesi",          icona: "🏘️", colore: "#2563eb" },
  montagne: { nome: "Montagne e ghiacciai",   icona: "⛰️", colore: "#64748b" },
  castelli: { nome: "Castelli e monumenti",   icona: "🏰", colore: "#b91c1c" },
  natura:   { nome: "Parchi, laghi e fiumi",  icona: "🦌", colore: "#15803d" },
  passi:    { nome: "Passi e trafori",        icona: "🚗", colore: "#c2410c" },
  turismo:  { nome: "Sci e terme",            icona: "⛷️", colore: "#0891b2" },
  sapori:   { nome: "Prodotti tipici",        icona: "🧀", colore: "#a16207" }
};

window.LUOGHI = [
  /* ---------------- CITTÀ E PAESI ---------------- */
  {
    id: "aosta", nome: "Aosta", cat: "citta", lat: 45.7372, lng: 7.3206,
    sottotitolo: "Capoluogo di regione · circa 33.000 abitanti",
    testo: "Aosta è l'unica vera città della regione e ne è il capoluogo. Fu fondata dai Romani nel 25 a.C. con il nome di Augusta Praetoria Salassorum, in onore dell'imperatore Augusto, dopo la sconfitta dei Salassi. La città fu costruita come un accampamento militare, con strade dritte che si incrociano ad angolo retto: per i suoi tanti monumenti romani è chiamata la \"Roma delle Alpi\".",
    punti: [
      "Monumenti romani: Arco d'Augusto, Porta Pretoria, Teatro romano, criptoportico",
      "Area megalitica di Saint-Martin-de-Corléans: resti di oltre 5.000 anni fa",
      "Qui nacque sant'Anselmo d'Aosta (1033), filosofo e arcivescovo di Canterbury",
      "Fiera di Sant'Orso (30–31 gennaio): artigianato del legno, si svolge da oltre 1000 anni",
      "Arena della Croix-Noire: finale della Bataille des Reines, la sfida tra mucche \"regine\"",
      "Industria: l'acciaieria Cogne Acciai Speciali"
    ],
    ricorda: "Aosta = Augusta Praetoria, fondata dai Romani nel 25 a.C."
  },
  {
    id: "cogne", nome: "Cogne", cat: "citta", lat: 45.6086, lng: 7.3561,
    sottotitolo: "Porta del Parco Nazionale del Gran Paradiso",
    testo: "Cogne si trova in una valle laterale a sud di Aosta, ai piedi del Gran Paradiso. In passato era famosa per le miniere di ferro, che rifornivano l'acciaieria di Aosta e furono chiuse nel 1979. Oggi vive di turismo ed è uno dei punti di accesso principali al Parco Nazionale del Gran Paradiso.",
    punti: [
      "Antiche miniere di ferro (chiuse nel 1979)",
      "Merletti di Cogne: pizzi lavorati a mano dalle donne del paese",
      "A Valnontey c'è il giardino botanico alpino Paradisia",
      "Grandi prati di Sant'Orso e cascate di Lillaz"
    ],
    ricorda: "Miniere di ferro, merletti e porta del Gran Paradiso."
  },
  {
    id: "lys", nome: "Valle del Lys (Gressoney)", cat: "citta", lat: 45.8317, lng: 7.8239,
    sottotitolo: "La valle dei Walser",
    testo: "Nella valle del Lys, ai piedi del Monte Rosa, vivono i Walser: discendenti di popolazioni di lingua tedesca arrivate nel Medioevo dal Vallese, in Svizzera. Ancora oggi a Gressoney e a Issime si parlano antiche lingue di origine tedesca (il titsch e il töitschu) e si vedono le tipiche case in legno e pietra.",
    punti: [
      "Paesi principali: Gressoney-La-Trinité, Gressoney-Saint-Jean, Issime",
      "Lingua walser, di origine tedesca",
      "Fa parte del comprensorio sciistico Monterosa Ski",
      "Il torrente Lys è un affluente della Dora Baltea"
    ],
    ricorda: "In Valle d'Aosta si parlano italiano, francese, patois e walser."
  },
  {
    id: "pontstmartin", nome: "Pont-Saint-Martin", cat: "citta", lat: 45.5958, lng: 7.7956,
    sottotitolo: "La porta d'ingresso della regione",
    testo: "Pont-Saint-Martin è l'ultimo paese prima del Piemonte: qui la Dora Baltea esce dalla regione. Il paese prende il nome dal suo ponte romano a una sola arcata, costruito nel I secolo a.C. e ancora in piedi dopo più di 2.000 anni.",
    punti: [
      "Ponte romano del I secolo a.C.",
      "Era attraversato dalla strada romana delle Gallie",
      "Famoso Carnevale storico, con la leggenda del ponte e del diavolo"
    ],
    ricorda: "Ponte romano e confine con il Piemonte."
  },

  /* ---------------- MONTAGNE ---------------- */
  {
    id: "montebianco", nome: "Monte Bianco", cat: "montagne", lat: 45.8326, lng: 6.8652,
    sottotitolo: "Circa 4.806 m · la vetta più alta delle Alpi",
    testo: "Il Monte Bianco è la montagna più alta delle Alpi e dell'Europa occidentale. Si trova sul confine tra Italia e Francia, sopra Courmayeur. Il massiccio è coperto da grandi ghiacciai, come quello del Miage e quello della Brenva, che oggi si stanno ritirando a causa del riscaldamento climatico.",
    punti: [
      "Altezza: circa 4.806 metri",
      "Confine tra Italia (Courmayeur) e Francia (Chamonix)",
      "La funivia Skyway Monte Bianco sale fino a Punta Helbronner (3.466 m)",
      "Sotto la montagna passa il Traforo del Monte Bianco"
    ],
    ricorda: "È la montagna più alta d'Europa occidentale."
  },
  {
    id: "cervino", nome: "Cervino", cat: "montagne", lat: 45.9763, lng: 7.6586,
    sottotitolo: "4.478 m · la montagna a forma di piramide",
    testo: "Il Cervino è famoso in tutto il mondo per la sua forma a piramide. Si trova sul confine con la Svizzera, sopra Breuil-Cervinia, in fondo alla Valtournenche. Dall'altra parte, in Svizzera, si trova il paese di Zermatt.",
    punti: [
      "Altezza: 4.478 metri",
      "Confine tra Italia e Svizzera",
      "Fu scalato per la prima volta nel 1865",
      "In francese si chiama Mont Cervin, in tedesco Matterhorn"
    ],
    ricorda: "Forma a piramide, al confine con la Svizzera."
  },
  {
    id: "monterosa", nome: "Monte Rosa", cat: "montagne", lat: 45.9180, lng: 7.8600,
    sottotitolo: "4.634 m (Punta Dufour) · un grande massiccio",
    testo: "Il Monte Rosa non è una sola cima ma un grande massiccio con molte vette sopra i 4.000 metri. La più alta, la Punta Dufour (4.634 m), si trova in territorio svizzero. Ai suoi piedi si aprono le valli di Ayas e del Lys (Gressoney).",
    punti: [
      "Cima più alta: Punta Dufour, 4.634 m (in Svizzera)",
      "Sulla Punta Gnifetti (4.554 m) c'è la Capanna Margherita, il rifugio più alto d'Europa",
      "Ghiacciaio del Lys",
      "Il nome viene dalla parola \"roise\", che nel dialetto locale indica il ghiacciaio"
    ],
    ricorda: "Massiccio con molte cime sopra i 4.000 m."
  },
  {
    id: "granparadiso", nome: "Gran Paradiso", cat: "montagne", lat: 45.5178, lng: 7.2667,
    sottotitolo: "4.061 m · l'unico \"4000\" tutto in Italia",
    testo: "Il Gran Paradiso è l'unica montagna sopra i 4.000 metri che si trova interamente in territorio italiano. Dà il nome al primo parco nazionale d'Italia, che si estende tra la Valle d'Aosta e il Piemonte.",
    punti: [
      "Altezza: 4.061 metri",
      "Unico \"4000\" interamente italiano",
      "Si sale dalla Valsavarenche o dalla Valle di Cogne"
    ],
    ricorda: "L'unico 4000 tutto italiano."
  },
  {
    id: "miage", nome: "Ghiacciaio del Miage", cat: "montagne", lat: 45.7900, lng: 6.8850,
    sottotitolo: "Uno dei grandi ghiacciai del Monte Bianco",
    testo: "Il ghiacciaio del Miage scende dal Monte Bianco nella Val Veny, vicino a Courmayeur. È ricoperto di detriti e sassi, per questo sembra grigio. Come tutti i ghiacciai delle Alpi si sta ritirando a causa del riscaldamento climatico.",
    punti: [
      "Si trova in Val Veny, sopra Courmayeur",
      "È uno dei più grandi ghiacciai \"neri\" (coperti di detriti) delle Alpi",
      "Ai suoi piedi c'è il piccolo lago del Miage"
    ],
    ricorda: "I ghiacciai si stanno ritirando per il riscaldamento globale."
  },

  /* ---------------- CASTELLI E MONUMENTI ---------------- */
  {
    id: "fenis", nome: "Castello di Fénis", cat: "castelli", lat: 45.7364, lng: 7.4925,
    sottotitolo: "Il castello più famoso della Valle",
    testo: "Il castello di Fénis fu costruito dalla nobile famiglia Challant nel Medioevo (XIV secolo). Con le sue mura doppie e le sue torri è il classico \"castello delle fiabe\". All'interno conserva bellissimi affreschi nel cortile.",
    punti: [
      "Costruito dagli Challant nel XIV secolo",
      "Doppia cinta di mura e molte torri",
      "Affreschi nel cortile, tra cui San Giorgio che uccide il drago"
    ],
    ricorda: "Castello medievale degli Challant con torri e affreschi."
  },
  {
    id: "issogne", nome: "Castello di Issogne", cat: "castelli", lat: 45.6544, lng: 7.6875,
    sottotitolo: "Il castello-residenza del Rinascimento",
    testo: "Il castello di Issogne non è una fortezza ma un'elegante residenza signorile, trasformata dalla famiglia Challant alla fine del Quattrocento. Nel cortile si trova la celebre fontana del melograno, in ferro battuto.",
    punti: [
      "Residenza degli Challant, stile rinascimentale",
      "Fontana del melograno nel cortile",
      "Portico affrescato con scene di vita quotidiana (botteghe, mercato)"
    ],
    ricorda: "Fontana del melograno."
  },
  {
    id: "verres", nome: "Castello di Verrès", cat: "castelli", lat: 45.6683, lng: 7.6967,
    sottotitolo: "La fortezza a forma di cubo",
    testo: "Il castello di Verrès si trova su una roccia che domina il paese. È una fortezza massiccia a forma di cubo, costruita nel Trecento per controllare la valle e l'ingresso della Val d'Ayas.",
    punti: [
      "Costruito nel XIV secolo",
      "Forma di grande cubo di pietra",
      "Ogni anno ospita il Carnevale storico di Verrès"
    ],
    ricorda: "La fortezza a forma di cubo."
  },
  {
    id: "bard", nome: "Forte di Bard", cat: "castelli", lat: 45.6086, lng: 7.7442,
    sottotitolo: "La fortezza che fermò Napoleone",
    testo: "Il Forte di Bard sorge su una rocca che chiude la valle. Nel 1800 la fortezza bloccò per circa due settimane l'esercito di Napoleone, che stava scendendo in Italia dopo aver attraversato il Gran San Bernardo. Per vendetta Napoleone la fece distruggere; i Savoia la ricostruirono nell'Ottocento.",
    punti: [
      "1800: resiste all'esercito di Napoleone",
      "Ricostruito dai Savoia tra il 1830 e il 1838",
      "Oggi ospita il Museo delle Alpi e grandi mostre"
    ],
    ricorda: "Fermò Napoleone nel 1800; oggi Museo delle Alpi."
  },
  {
    id: "sarre", nome: "Castello di Sarre", cat: "castelli", lat: 45.7194, lng: 7.2556,
    sottotitolo: "Il castello dei re cacciatori",
    testo: "Il castello di Sarre fu acquistato nel 1869 dal re Vittorio Emanuele II, che lo usava come base per le sue battute di caccia allo stambecco. Proprio la sua riserva di caccia diventerà poi il Parco Nazionale del Gran Paradiso.",
    punti: [
      "Residenza dei Savoia",
      "Salone decorato con centinaia di corna di stambecco e camoscio",
      "Legato alla storia del Parco del Gran Paradiso"
    ],
    ricorda: "Castello di caccia dei Savoia."
  },
  {
    id: "castelsavoia", nome: "Castel Savoia", cat: "castelli", lat: 45.7630, lng: 7.8240,
    sottotitolo: "Il castello della regina Margherita",
    testo: "Castel Savoia, a Gressoney-Saint-Jean, fu costruito tra il 1899 e il 1904 per la regina Margherita di Savoia, che amava passare le estati in questa valle. Sembra un castello delle fiabe, con torrette appuntite.",
    punti: [
      "Costruito per la regina Margherita di Savoia",
      "Stile \"neogotico\", con cinque torrette",
      "Ha un giardino botanico con piante alpine"
    ],
    ricorda: "Castello della regina Margherita."
  },

  /* ---------------- NATURA ---------------- */
  {
    id: "parcogp", nome: "Parco Nazionale del Gran Paradiso", cat: "natura", lat: 45.5750, lng: 7.2050,
    sottotitolo: "1922 · il primo parco nazionale italiano",
    testo: "Il Parco Nazionale del Gran Paradiso è nato nel 1922 ed è il primo parco nazionale d'Italia. Nacque dalla riserva di caccia del re Vittorio Emanuele II, che servì però a salvare lo stambecco dall'estinzione. Il parco si estende tra la Valle d'Aosta (valli di Cogne, Valsavarenche e Rhêmes) e il Piemonte.",
    punti: [
      "Fondato nel 1922: il primo parco nazionale italiano",
      "Simbolo: lo stambecco",
      "Animali: stambecchi, camosci, marmotte, aquile reali, gipeti, lupi",
      "Piante: larici, abeti, pino cembro, stella alpina, genepì"
    ],
    ricorda: "Primo parco nazionale (1922), simbolo lo stambecco."
  },
  {
    id: "montavic", nome: "Parco naturale del Mont Avic", cat: "natura", lat: 45.6450, lng: 7.5850,
    sottotitolo: "Il parco dei laghi e dei boschi",
    testo: "Il Parco naturale del Mont Avic è il primo parco regionale della Valle d'Aosta (1989). È famoso per i boschi di pino uncinato, i più estesi della regione, e per i tantissimi laghetti alpini.",
    punti: [
      "Primo parco regionale della Valle d'Aosta",
      "Boschi di pino uncinato",
      "Decine di laghi e torbiere"
    ],
    ricorda: "Parco regionale: pino uncinato e laghetti."
  },
  {
    id: "placemoulin", nome: "Lago di Place-Moulin", cat: "natura", lat: 45.9000, lng: 7.4900,
    sottotitolo: "Un grande lago artificiale in Valpelline",
    testo: "Il lago di Place-Moulin è un lago artificiale creato con una grande diga in fondo alla Valpelline. Serve a produrre energia idroelettrica: in Valle d'Aosta i laghi naturali sono piccoli laghi alpini di origine glaciale, mentre quelli più grandi sono stati creati dall'uomo.",
    punti: [
      "Lago artificiale, con una delle dighe più grandi della regione",
      "Produce energia idroelettrica",
      "I laghi naturali sono piccoli e di origine glaciale (es. il Lago Blu vicino a Cervinia)"
    ],
    ricorda: "Laghi naturali piccoli e glaciali; i grandi sono artificiali."
  },

  /* ---------------- PASSI E TRAFORI ---------------- */
  {
    id: "traforomb", nome: "Traforo del Monte Bianco", cat: "passi", lat: 45.8166, lng: 6.9533,
    sottotitolo: "1965 · verso la Francia",
    testo: "Il Traforo del Monte Bianco è una galleria lunga circa 11,6 km che passa sotto la montagna e collega Courmayeur, in Italia, a Chamonix, in Francia. Fu inaugurato nel 1965. Nel 1999 un grave incendio al suo interno causò 39 vittime; dopo l'incidente la galleria è stata resa molto più sicura.",
    punti: [
      "Inaugurato nel 1965",
      "Lunghezza circa 11,6 km",
      "Collega l'Italia (Courmayeur) alla Francia (Chamonix)",
      "Qui arriva l'autostrada A5 che parte da Torino"
    ],
    ricorda: "Monte Bianco → Francia."
  },
  {
    id: "gsb", nome: "Gran San Bernardo", cat: "passi", lat: 45.8620, lng: 7.1750,
    sottotitolo: "Passo (2.469 m) e traforo (1964) · verso la Svizzera",
    testo: "Il colle del Gran San Bernardo è un antico passaggio verso la Svizzera, usato già dai Romani. Qui c'è un ospizio fondato nell'XI secolo per aiutare i viaggiatori, famoso per i cani San Bernardo, usati per soccorrere le persone nella neve. Nel 1800 Napoleone attraversò il passo con il suo esercito. Più in basso, dal 1964, una galleria permette di passare anche d'inverno.",
    punti: [
      "Colle a 2.469 m, confine con la Svizzera",
      "Ospizio e cani San Bernardo",
      "1800: lo attraversa Napoleone",
      "Traforo del Gran San Bernardo aperto nel 1964",
      "Nella valle: jambon de Bosses DOP e Carnevale della Coumba Freida"
    ],
    ricorda: "Gran San Bernardo → Svizzera."
  },
  {
    id: "psb", nome: "Piccolo San Bernardo", cat: "passi", lat: 45.6806, lng: 6.8836,
    sottotitolo: "Passo (2.188 m) · verso la Francia",
    testo: "Il colle del Piccolo San Bernardo collega la Valle d'Aosta (La Thuile) alla Francia. Era già percorso dai Romani con la strada delle Gallie. D'inverno è chiuso per la neve.",
    punti: [
      "Altezza: 2.188 metri",
      "Confine con la Francia",
      "Antica strada romana delle Gallie",
      "Resti di un \"cromlech\", un cerchio di pietre preistorico"
    ],
    ricorda: "Piccolo San Bernardo → Francia."
  },

  /* ---------------- SCI E TERME ---------------- */
  {
    id: "courmayeur", nome: "Courmayeur", cat: "turismo", lat: 45.7967, lng: 6.9722,
    sottotitolo: "Ai piedi del Monte Bianco",
    testo: "Courmayeur è una delle località turistiche più famose delle Alpi, ai piedi del Monte Bianco. D'inverno si scia, d'estate si fanno escursioni e scalate: è considerata la capitale dell'alpinismo italiano. Qui vicino nasce la Dora Baltea, dall'unione della Dora di Veny e della Dora di Ferret.",
    punti: [
      "Sci e alpinismo",
      "Funivia Skyway Monte Bianco",
      "Valli laterali: Val Veny e Val Ferret",
      "Durante il fascismo fu rinominata \"Cormaiore\""
    ],
    ricorda: "Capitale dell'alpinismo, ai piedi del Monte Bianco."
  },
  {
    id: "cervinia", nome: "Breuil-Cervinia", cat: "turismo", lat: 45.9336, lng: 7.6297,
    sottotitolo: "Sciare tra Italia e Svizzera",
    testo: "Breuil-Cervinia si trova in fondo alla Valtournenche, ai piedi del Cervino. Le sue piste sono collegate con quelle di Zermatt, in Svizzera, e si può sciare anche d'estate sul ghiacciaio. Poco sotto il paese c'è il Lago Blu, in cui si specchia il Cervino.",
    punti: [
      "Piste collegate con Zermatt (Svizzera)",
      "Sci estivo sul ghiacciaio del Plateau Rosa",
      "Lago Blu, piccolo lago alpino"
    ],
    ricorda: "Ai piedi del Cervino, piste collegate con la Svizzera."
  },
  {
    id: "lathuile", nome: "La Thuile", cat: "turismo", lat: 45.7136, lng: 6.9519,
    sottotitolo: "Sci tra Italia e Francia",
    testo: "La Thuile è una località sciistica le cui piste sono collegate con quelle di La Rosière, in Francia, attraverso il Piccolo San Bernardo. In passato era un paese di miniere di carbone.",
    punti: [
      "Comprensorio sciistico internazionale con la Francia",
      "Antiche miniere di carbone",
      "Vicino al colle del Piccolo San Bernardo"
    ],
    ricorda: "Si scia fino in Francia."
  },
  {
    id: "pila", nome: "Pila", cat: "turismo", lat: 45.6745, lng: 7.3119,
    sottotitolo: "Le piste sopra Aosta",
    testo: "Pila è la località sciistica di Aosta: si raggiunge direttamente dalla città con una cabinovia. Dalle piste si vedono il Monte Bianco, il Cervino, il Monte Rosa e il Gran Paradiso.",
    punti: [
      "Cabinovia diretta da Aosta",
      "Vista su tutti i grandi \"4000\" della regione"
    ],
    ricorda: "La neve a due passi da Aosta."
  },
  {
    id: "monterosaski", nome: "Monterosa Ski (Champoluc)", cat: "turismo", lat: 45.8306, lng: 7.7272,
    sottotitolo: "Tre valli collegate",
    testo: "Il comprensorio Monterosa Ski collega con gli impianti di risalita la Val d'Ayas (Champoluc), la valle di Gressoney e la Valsesia, in Piemonte, ai piedi del Monte Rosa.",
    punti: [
      "Collega Val d'Ayas, valle del Lys e Valsesia",
      "Ai piedi del massiccio del Monte Rosa"
    ],
    ricorda: "Sci ai piedi del Monte Rosa."
  },
  {
    id: "presaintdidier", nome: "Terme di Pré-Saint-Didier", cat: "turismo", lat: 45.7647, lng: 6.9853,
    sottotitolo: "Acque calde vicino al Monte Bianco",
    testo: "A Pré-Saint-Didier sgorgano acque termali calde, conosciute da secoli. Oggi ci sono terme dove ci si può fare il bagno all'aperto, nell'acqua calda, guardando il Monte Bianco innevato.",
    punti: [
      "Acque termali conosciute da secoli",
      "Vasche all'aperto con vista sul Monte Bianco"
    ],
    ricorda: "Turismo anche termale."
  },
  {
    id: "saintvincent", nome: "Saint-Vincent", cat: "turismo", lat: 45.7506, lng: 7.6475,
    sottotitolo: "La \"Riviera delle Alpi\"",
    testo: "Saint-Vincent è chiamata la \"Riviera delle Alpi\" per il suo clima mite. È famosa per le sue acque termali, scoperte nel Settecento, e per il Casinò, uno dei pochi in Italia.",
    punti: [
      "Terme, con la fonte delle acque scoperta nel 1770",
      "Casinò de la Vallée",
      "Clima più mite rispetto al resto della regione"
    ],
    ricorda: "Terme e casinò."
  },

  /* ---------------- PRODOTTI TIPICI ---------------- */
  {
    id: "valpelline", nome: "Valpelline – la Fontina", cat: "sapori", lat: 45.8260, lng: 7.3280,
    sottotitolo: "Fontina DOP e zuppa alla valpellinese",
    testo: "La Fontina DOP è il formaggio simbolo della Valle d'Aosta, prodotto in tutta la regione con il latte crudo delle mucche di razza valdostana. A Valpelline si trova un grande magazzino di stagionatura scavato nella roccia, dove riposano migliaia di forme. Con la Fontina si fanno la fonduta, la polenta concia e la zuppa alla valpellinese (pane, cavolo, Fontina e brodo).",
    punti: [
      "Fontina DOP: latte crudo di mucca valdostana",
      "D'estate le mucche salgono negli alpeggi (e scendono in autunno con la \"désarpa\")",
      "Piatti: fonduta, polenta concia, zuppa alla valpellinese",
      "Altri formaggi: Fromadzo DOP"
    ],
    ricorda: "Fontina = formaggio simbolo della regione."
  },
  {
    id: "arnad", nome: "Arnad – il lardo", cat: "sapori", lat: 45.6447, lng: 7.7203,
    sottotitolo: "Lardo di Arnad DOP",
    testo: "Ad Arnad si produce il lardo di Arnad DOP, stagionato con sale, erbe aromatiche e spezie in contenitori di legno chiamati \"doil\". Ogni anno a fine agosto il paese organizza una grande festa dedicata al lardo.",
    punti: [
      "Lardo di Arnad DOP",
      "Stagionato nei \"doil\", vasche di legno",
      "Altri salumi: jambon de Bosses DOP, mocetta"
    ],
    ricorda: "Lardo di Arnad DOP."
  },
  {
    id: "morgex", nome: "Morgex e La Salle – i vigneti", cat: "sapori", lat: 45.7575, lng: 7.0397,
    sottotitolo: "Tra i vigneti più alti d'Europa",
    testo: "Tra Morgex e La Salle crescono vigneti che arrivano a circa 1.000–1.200 metri di altezza, tra i più alti d'Europa. Qui si produce il vino bianco Blanc de Morgex et de La Salle. Le viti crescono sul versante al sole (adret), mentre quello in ombra (envers) è coperto di boschi.",
    punti: [
      "Vigneti tra i più alti d'Europa",
      "Vino Blanc de Morgex et de La Salle",
      "Altri vini valdostani: Enfer d'Arvier, Torrette"
    ],
    ricorda: "Vigneti di montagna sul versante al sole (adret)."
  }
];

/* Tracciato semplificato della Dora Baltea (da Entrèves al confine con il Piemonte). */
window.DORA_BALTEA = [
  [45.812, 6.950], [45.795, 6.973], [45.765, 6.988], [45.757, 7.040], [45.744, 7.075],
  [45.708, 7.140], [45.700, 7.170], [45.702, 7.205], [45.712, 7.240], [45.722, 7.275],
  [45.730, 7.315], [45.738, 7.380], [45.736, 7.430], [45.742, 7.500], [45.745, 7.550],
  [45.742, 7.610], [45.735, 7.655], [45.700, 7.675], [45.668, 7.690], [45.645, 7.715],
  [45.618, 7.740], [45.600, 7.770], [45.590, 7.800], [45.570, 7.812]
];

window.DORA_INFO = {
  nome: "Dora Baltea", cat: "natura",
  sottotitolo: "Il fiume principale della regione",
  testo: "La Dora Baltea nasce vicino a Courmayeur, ai piedi del Monte Bianco, dall'unione della Dora di Veny e della Dora di Ferret. Attraversa tutta la valle centrale passando per Aosta, raccoglie l'acqua dei torrenti delle valli laterali, entra in Piemonte a Pont-Saint-Martin e si getta nel Po.",
  punti: [
    "Affluenti: Buthier, Grand Eyvia, Savara, Marmore, Évançon, Lys…",
    "È un affluente di sinistra del Po",
    "Le sue acque e quelle dei torrenti producono energia idroelettrica",
    "Sulla mappa il tracciato è semplificato"
  ],
  ricorda: "Dora Baltea → sfocia nel Po."
};

/* Etichette dei territori confinanti. */
window.CONFINANTI = [
  { nome: "FRANCIA",  lat: 45.70, lng: 6.62 },
  { nome: "SVIZZERA", lat: 46.02, lng: 7.30 },
  { nome: "PIEMONTE", lat: 45.42, lng: 7.68 }
];

/* Scheda generale mostrata quando nessun luogo è selezionato. */
window.SCHEDA = [
  {
    titolo: "📍 Carta d'identità",
    html: `<ul>
      <li><b>Capoluogo:</b> Aosta</li>
      <li><b>Superficie:</b> circa 3.260 km² – la regione <b>più piccola</b> d'Italia</li>
      <li><b>Abitanti:</b> circa 123.000 – la regione <b>meno popolata</b></li>
      <li><b>Comuni:</b> 74, nessuna provincia</li>
      <li><b>Regione autonoma a statuto speciale</b> dal 1948</li>
      <li><b>Bandiera:</b> nera e rossa</li>
    </ul>`
  },
  {
    titolo: "🗺️ Confini e territorio",
    html: `<p>Confina a <b>nord</b> con la <b>Svizzera</b>, a <b>ovest</b> con la <b>Francia</b>, a <b>sud</b> e a <b>est</b> con il <b>Piemonte</b>.</p>
      <p>È <b>tutta montuosa</b>: una grande valle centrale, percorsa dalla <b>Dora Baltea</b>, da cui si aprono a "lisca di pesce" circa venti valli laterali (Valpelline, Valtournenche, Val d'Ayas, Valle di Gressoney, Valle di Cogne, Valsavarenche, Val di Rhêmes, Valgrisenche…).</p>`
  },
  {
    titolo: "🗣️ Lingue",
    html: `<p>Lingue ufficiali: <b>italiano e francese</b>. Molti parlano il <b>patois</b> (francoprovenzale); nella valle del Lys i <b>Walser</b> parlano una lingua di origine tedesca.</p>`
  },
  {
    titolo: "❄️ Clima",
    html: `<p>Clima <b>alpino</b>: inverni freddi e nevosi, estati brevi e fresche. Il fondovalle è secco: già nel Medioevo si costruivano i <b>rus</b>, canali per irrigare i campi.</p>
      <p><b>Adret</b> = versante al sole (paesi, vigneti) · <b>Envers</b> = versante in ombra (boschi).</p>`
  },
  {
    titolo: "🏛️ Storia in breve",
    html: `<ol class="timeline">
      <li><b>Preistoria</b> – area megalitica di Saint-Martin-de-Corléans (Aosta)</li>
      <li><b>Salassi</b> – popolo celtico che controllava passi e miniere</li>
      <li><b>25 a.C.</b> – i Romani fondano <i>Augusta Praetoria</i> (Aosta)</li>
      <li><b>Medioevo</b> – Burgundi, Franchi, poi dal 1000 circa i <b>Savoia</b>; gli Challant costruiscono i castelli</li>
      <li><b>1800</b> – Napoleone passa il Gran San Bernardo; il Forte di Bard lo blocca</li>
      <li><b>1861</b> – entra nel Regno d'Italia</li>
      <li><b>Fascismo</b> – vietato il francese, nomi italianizzati</li>
      <li><b>Resistenza</b> – Émile Chanoux, simbolo dell'autonomia</li>
      <li><b>1948</b> – statuto speciale</li>
    </ol>`
  },
  {
    titolo: "💼 Economia",
    html: `<ul>
      <li><b>Primario:</b> allevamento (razza valdostana, alpeggi), vigneti, mele</li>
      <li><b>Secondario:</b> energia idroelettrica (ne produce più di quanta ne consuma), acciaieria di Aosta</li>
      <li><b>Terziario:</b> il più importante, grazie al <b>turismo</b> (sci, alpinismo, terme, castelli)</li>
    </ul>`
  },
  {
    titolo: "🚗 Comunicazioni",
    html: `<ul>
      <li><b>Autostrada A5</b> Torino – Aosta – Monte Bianco</li>
      <li><b>Traforo del Monte Bianco</b> (1965) → Francia</li>
      <li><b>Traforo del Gran San Bernardo</b> (1964) → Svizzera</li>
      <li>Ferrovia Aosta – Torino</li>
    </ul>`
  },
  {
    titolo: "🍲 Cucina e tradizioni",
    html: `<p><b>Fontina DOP</b>, fonduta, polenta concia, carbonade, zuppa alla valpellinese, lardo di Arnad, tegole, <b>caffè alla valdostana</b> nella <b>coppa dell'amicizia</b>.</p>
      <p><b>Fiera di Sant'Orso</b> (30–31 gennaio), <b>Bataille des Reines</b>, sport tradizionali (tsan, rebatta, fiolet, palet), carnevali storici, merletti di Cogne.</p>`
  }
];
