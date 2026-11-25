/*
 * Testi e dati della regione Piemonte: categorie, luoghi, scheda, domande, flashcard,
 * interrogazione e visita guidata. Le impostazioni (confini, fiume, zone…) sono in regione.js.
 *
 * Riferimento: due libri di testo. «Geografia» vol. 5, pp. 34–37 (A colpo d'occhio, Territorio, Clima e ambienti,
 * Popolazione e attività economiche, Approfondisco: Parco della Val Grande e Museo Egizio, Life Skills) e
 * «Che meraviglia!» Geografia 5, pp. 35–37 (Torino, Isole Borromee, DOP, Reggia di Venaria).
 * I numeri sono quelli di «Geografia»; se «Che meraviglia!» dice un numero diverso, c'è una nota.
 * Quello che non è in nessuno dei due libri va tra [[ ]] (frasi) o con extra: true (luoghi e domande). Vedi CLAUDE.md.
 */

/* Categorie in ordine di importanza per lo studio (così appaiono nella legenda).
   spenta: true = all'apertura i pallini non si vedono (si accendono dalla legenda). */
window.CATEGORIE = {
  montagne: { nome: "Montagne e colline",     icona: "⛰️", colore: "#64748b" },
  citta:    { nome: "Città",                  icona: "🏘️", colore: "#2563eb" },
  natura:   { nome: "Fiumi, laghi e parchi",  icona: "🦌", colore: "#15803d" },
  passi:    { nome: "Gallerie e valichi",     icona: "🚗", colore: "#c2410c" },
  sapori:   { nome: "Agricoltura e prodotti", icona: "🌾", colore: "#a16207" },
  castelli: { nome: "Monumenti",              icona: "🏛️", colore: "#b91c1c" },
  turismo:  { nome: "Sci e terme",            icona: "⛷️", colore: "#0891b2", spenta: true }
};

window.LUOGHI = [
  /* ---------------- MONTAGNE E COLLINE ---------------- */
  {
    id: "monterosa", nome: "Monte Rosa", cat: "montagne", lat: 45.915, lng: 7.885,
    sottotitolo: "4.637 m (Punta Dufour) · una delle cime più alte d'Italia",
    testo: "Il Monte Rosa è un grande massiccio delle Alpi Pennine, a nord del Piemonte, al confine con la Svizzera. È una delle montagne più alte d'Italia e il Piemonte la condivide con la Valle d'Aosta. Sulle sue cime ci sono ghiacciai perenni. [[Dal lato piemontese ci si arriva da Alagna, in Valsesia.]]",
    punti: [
      "Cima più alta: Punta Dufour, 4.637 m [[(si trova in Svizzera)]]",
      "Fa parte delle Alpi Pennine, a nord",
      "Il Piemonte lo condivide con la Valle d'Aosta",
      "[[Sulla Punta Gnifetti (4.554 m) c'è la Capanna Margherita, il rifugio più alto d'Europa]]"
    ],
    ricorda: "Monte Rosa: una delle cime più alte d'Italia, condivisa con la Valle d'Aosta."
  },
  {
    id: "granparadiso", nome: "Gran Paradiso", cat: "montagne", lat: 45.45, lng: 7.27,
    sottotitolo: "4.061 m · condiviso con la Valle d'Aosta",
    testo: "Il Gran Paradiso è una delle cime più alte d'Italia e si trova nelle Alpi Graie, a nord-ovest, sul confine con la Valle d'Aosta. Intorno c'è il Parco Nazionale del Gran Paradiso. [[Dal lato piemontese il parco comprende la Valle dell'Orco e la Val Soana.]]",
    punti: [
      "Altezza: 4.061 m",
      "Alpi Graie, a nord-ovest",
      "Il Piemonte lo condivide con la Valle d'Aosta",
      "Parco Nazionale del Gran Paradiso [[(1922, il più antico d'Italia; simbolo: lo stambecco)]]"
    ],
    ricorda: "Gran Paradiso: condiviso con la Valle d'Aosta, nelle Alpi Graie."
  },
  {
    id: "monviso", nome: "Monviso", cat: "montagne", lat: 44.6673, lng: 7.0903,
    sottotitolo: "3.841 m · qui nasce il Po",
    testo: "Il Monviso si trova nelle Alpi Cozie, a ovest, vicino al confine con la Francia. È una delle cime più alte del Piemonte. Dal Monviso nasce il Po, il fiume più importante della regione. [[Ha la forma di una piramide e nelle giornate limpide si vede anche da Torino.]]",
    punti: [
      "Altezza: 3.841 m",
      "Alpi Cozie, a ovest",
      "Qui nasce il Po [[(a Pian del Re, a 2.020 m)]]",
      "[[È chiamato «il Re di Pietra»]]"
    ],
    ricorda: "Dal Monviso nasce il Po."
  },
  {
    id: "argentera", nome: "Cima dell'Argentera", cat: "montagne", lat: 44.1781, lng: 7.2989,
    sottotitolo: "3.297 m · Alpi Marittime",
    testo: "La Cima dell'Argentera si trova nelle Alpi Marittime, a sud-ovest del Piemonte, vicino al confine con la Francia. [[È la vetta più alta delle Alpi Marittime e intorno c'è il Parco naturale delle Alpi Marittime.]]",
    punti: [
      "Altezza: 3.297 m",
      "Alpi Marittime, a sud-ovest",
      "Vicino al confine con la Francia"
    ],
    ricorda: "Argentera: nelle Alpi Marittime, a sud-ovest."
  },
  {
    id: "langhe", nome: "Le Langhe", cat: "montagne", lat: 44.55, lng: 8.02,
    sottotitolo: "Le colline del centro-sud",
    testo: "Le Langhe sono uno dei due grandi gruppi di colline che occupano il centro del Piemonte. La collina è ricca di vigneti ben coltivati che producono vini pregiati, di noccioli e di alberi da frutto. Le Langhe sono famose anche per i formaggi e per i tartufi, in particolare il tartufo bianco d'Alba.",
    punti: [
      "Zona di collina (la collina è il 30% del Piemonte)",
      "Vigneti che producono vini pregiati",
      "Noccioli e alberi da frutto",
      "Formaggi e tartufi: il più famoso è il tartufo bianco d'Alba",
      "Cresce il turismo enogastronomico: si viene per assaggiare vini e prodotti tipici",
      "Clima temperato sulle colline appenniniche",
      "[[Dal 2014 i paesaggi dei vigneti di Langhe, Roero e Monferrato sono Patrimonio dell'Umanità UNESCO]]"
    ],
    ricorda: "Langhe e Monferrato: le colline al centro del Piemonte."
  },
  {
    id: "monferrato", nome: "Il Monferrato", cat: "montagne", lat: 45.02, lng: 8.32,
    sottotitolo: "Le colline del centro-est",
    testo: "Il Monferrato è l'altro grande gruppo di colline del Piemonte, intorno ad Asti e Casale Monferrato. Anche qui la collina è ricca di vigneti e di alberi da frutto.",
    punti: [
      "Colline al centro-est della regione",
      "Vigneti e vini famosi",
      "Città: Asti, Casale Monferrato, Nizza Monferrato"
    ],
    ricorda: "Langhe e Monferrato: le colline al centro del Piemonte."
  },

  /* ---------------- CITTÀ ---------------- */
  {
    id: "torino", nome: "Torino", cat: "citta", lat: 45.0703, lng: 7.6869,
    sottotitolo: "Il capoluogo · 848.885 abitanti",
    testo: "Torino è il capoluogo del Piemonte. Si trova in pianura, sul Po, ai piedi delle Alpi. Oltre metà dei piemontesi vive nelle zone intorno a Torino. Fu la prima capitale d'Italia, quando il nostro Paese diventò uno Stato unito, nel 1861 [[(fino al 1865)]]: il primo Parlamento italiano si riuniva a Palazzo Carignano. Il suo monumento simbolo è la Mole Antonelliana, progettata in quegli anni, che oggi ospita il Museo Nazionale del Cinema. È sempre stata un importante centro industriale; oggi lavora soprattutto nei servizi e nel turismo.",
    punti: [
      "Prima capitale d'Italia (1861); Palazzo Carignano, prima sede del Parlamento",
      "Mole Antonelliana: il monumento simbolo della città, oggi Museo Nazionale del Cinema",
      "Museo Egizio: il più antico museo dedicato all'arte egizia (fondato nel 1824), con migliaia di reperti della civiltà dei faraoni; il più importante al mondo dopo quello del Cairo",
      "Reggia di Venaria Reale, nella Città metropolitana: una residenza dei Savoia con le scuderie e un magnifico giardino; fa parte delle Residenze Sabaude, Patrimonio UNESCO",
      "Salone internazionale del libro: ogni anno migliaia di visitatori; qui hanno sede importanti editori",
      "Ricerca scientifica e tecnologica, banche, servizi",
      "[[Molti cibi inventati in Piemonte sono nati proprio a Torino: il tramezzino, i gianduiotti e il gelato stecco]]",
      "[[Qui è nata la FIAT (1899): l'industria dell'automobile]]"
    ],
    ricorda: "Torino: capoluogo, prima capitale d'Italia, Mole Antonelliana, Museo Egizio."
  },
  {
    id: "novara", nome: "Novara", cat: "citta", lat: 45.4469, lng: 8.6219,
    sottotitolo: "Capoluogo di provincia · tra le risaie",
    testo: "Novara si trova nella Pianura Padana, a est, vicino al confine con la Lombardia. Intorno ci sono tante risaie.",
    punti: [
      "Pianura Padana, a est",
      "Zona delle risaie",
      "[[La Basilica di San Gaudenzio ha una cupola alta 121 metri]]"
    ],
    ricorda: "Novara: in pianura, a est, tra le risaie."
  },
  {
    id: "vercelli", nome: "Vercelli", cat: "citta", lat: 45.3202, lng: 8.4185,
    sottotitolo: "Capoluogo di provincia · la città del riso",
    testo: "Vercelli si trova in pianura, al centro della zona delle risaie: qui i campi di riso formano scacchiere perfette. [[È chiamata «la capitale europea del riso».]]",
    punti: [
      "Pianura Padana",
      "Al centro della zona delle risaie",
      "[[Nella Basilica di Sant'Andrea c'è uno dei più antichi monumenti gotici d'Italia]]"
    ],
    ricorda: "Vercelli: la città del riso."
  },
  {
    id: "biella", nome: "Biella", cat: "citta", lat: 45.5665, lng: 8.0531,
    sottotitolo: "Capoluogo di provincia · ai piedi delle Alpi",
    testo: "Biella si trova nella fascia pedemontana, cioè ai piedi delle montagne: qui vive gran parte della popolazione del Piemonte. [[È famosa da secoli per l'industria tessile della lana.]]",
    punti: [
      "Fascia pedemontana (ai piedi delle Alpi)",
      "[[Industria tessile: tessuti di lana famosi in tutto il mondo]]"
    ],
    ricorda: "Biella: ai piedi delle Alpi, nella fascia pedemontana."
  },
  {
    id: "verbania", nome: "Verbania", cat: "citta", lat: 45.9214, lng: 8.5519,
    sottotitolo: "Capoluogo di provincia · sul Lago Maggiore",
    testo: "Verbania si trova sulla sponda del Lago Maggiore, nel nord del Piemonte. È il capoluogo della provincia del Verbano-Cusio-Ossola. [[Ha dei grandi giardini botanici, come Villa Taranto.]]",
    punti: [
      "Sul Lago Maggiore",
      "Provincia del Verbano-Cusio-Ossola, a nord",
      "Vicino ci sono le Isole Borromee e il Parco Nazionale della Val Grande"
    ],
    ricorda: "Verbania: sul Lago Maggiore."
  },
  {
    id: "asti", nome: "Asti", cat: "citta", lat: 44.9008, lng: 8.2064,
    sottotitolo: "Capoluogo di provincia · nel Monferrato",
    testo: "Asti si trova tra le colline del Monferrato, [[sul fiume Tanaro]]. Intorno ci sono tanti vigneti. [[È famosa per i suoi vini e per il Palio, una corsa di cavalli antichissima.]]",
    punti: [
      "Colline del Monferrato",
      "Vigneti e vini",
      "[[Palio di Asti, a settembre]]"
    ],
    ricorda: "Asti: nel Monferrato, tra i vigneti."
  },
  {
    id: "alessandria", nome: "Alessandria", cat: "citta", lat: 44.9124, lng: 8.6150,
    sottotitolo: "Capoluogo di provincia · nel sud-est",
    testo: "Alessandria si trova in pianura, nel sud-est del Piemonte, [[vicino al fiume Tanaro]]. Nella sua provincia ci sono anche Casale Monferrato, Novi Ligure e Acqui Terme.",
    punti: [
      "In pianura, nel sud-est",
      "Verso l'Appennino Ligure e l'Emilia-Romagna",
      "[[Famosa per i cappelli Borsalino, fabbricati qui dal 1857]]"
    ],
    ricorda: "Alessandria: in pianura, nel sud-est."
  },
  {
    id: "cuneo", nome: "Cuneo", cat: "citta", lat: 44.3845, lng: 7.5427,
    sottotitolo: "Capoluogo di provincia · a sud",
    testo: "Cuneo si trova nel sud del Piemonte, tra le Alpi Marittime e la pianura. [[Il nome viene dalla forma a «cuneo» del terreno su cui sorge, tra due fiumi: la Stura e il Gesso.]]",
    punti: [
      "A sud, vicino alle Alpi Marittime",
      "Vicino c'è il Colle di Tenda, che porta in Francia",
      "[[È il capoluogo della provincia più grande del Piemonte]]"
    ],
    ricorda: "Cuneo: a sud, vicino alle Alpi Marittime."
  },

  /* ---------------- FIUMI, LAGHI E PARCHI ---------------- */
  {
    id: "lagomaggiore", nome: "Lago Maggiore e Isole Borromee", cat: "natura", lat: 45.8297, lng: 8.5600,
    sottotitolo: "Lago di origine glaciale",
    testo: "Il Lago Maggiore è uno dei laghi più importanti del Piemonte ed è di origine glaciale: si è formato dove un tempo c'era un grande ghiacciaio. Nella parte a sud-ovest del lago c'è l'arcipelago delle Isole Borromee. Lungo i laghi il turismo è molto sviluppato. [[Il lago è diviso con la Lombardia e la Svizzera.]]",
    punti: [
      "Origine glaciale",
      "Isola Bella: il palazzo della famiglia Borromeo, con un giardino a terrazze pieno di fiori",
      "Isola Madre: la più grande, con il Palazzo Borromeo e un giardino botanico dove vivono liberi pavoni bianchi, fagiani dorati e pappagalli",
      "Isola dei Pescatori: l'unica abitata tutto l'anno, da una piccola comunità che vive di pesca e turismo",
      "Sulla sponda piemontese: Verbania, Stresa, Arona",
      "[[È il secondo lago d'Italia per grandezza, dopo il Lago di Garda]]"
    ],
    ricorda: "Lago Maggiore: origine glaciale, Isole Borromee (Bella, Madre, dei Pescatori)."
  },
  {
    id: "lagoorta", nome: "Lago d'Orta", cat: "natura", lat: 45.7975, lng: 8.4035,
    sottotitolo: "Lago di origine glaciale",
    testo: "Il Lago d'Orta si trova poco a ovest del Lago Maggiore ed è più piccolo. Anche lui è di origine glaciale. Sulla sponda nord c'è Omegna. In mezzo al lago c'è l'Isola di San Giulio [[, con un'antica basilica]].",
    punti: [
      "Origine glaciale",
      "A ovest del Lago Maggiore",
      "Al centro del lago: l'Isola di San Giulio"
    ],
    ricorda: "Lago d'Orta: l'altro grande lago del Piemonte."
  },
  {
    id: "viverone", nome: "Lago di Viverone", cat: "natura", lat: 45.418, lng: 8.040,
    sottotitolo: "Un lago tra Biella e Ivrea",
    testo: "Il Lago di Viverone si trova tra Biella e Ivrea, ai piedi delle Alpi. È più piccolo del Lago Maggiore e del Lago d'Orta. [[Anche lui è nato dal lavoro di un antico ghiacciaio, che ha lasciato intorno al lago una lunga collina di detriti: la Serra di Ivrea.]]",
    punti: [
      "Tra Biella e Ivrea",
      "Si vede sulla carta di «Che meraviglia!»",
      "[[Origine glaciale; vicino c'è la Serra di Ivrea, la collina lasciata dal ghiacciaio]]"
    ],
    ricorda: "Lago di Viverone: tra Biella e Ivrea."
  },
  {
    id: "valgrande", nome: "Parco Nazionale della Val Grande", cat: "natura", lat: 46.03, lng: 8.45,
    sottotitolo: "L'area selvaggia più vasta d'Italia",
    testo: "Il Parco Nazionale della Val Grande si estende tra il Lago Maggiore e la Val d'Ossola, vicino a Domodossola. È l'area selvaggia più vasta d'Italia. Il territorio è soprattutto montuoso e comprende la cima Pedum, che supera i 2.000 metri.",
    punti: [
      "Tra il Lago Maggiore e la Val d'Ossola",
      "L'area selvaggia più vasta d'Italia",
      "Cima Pedum: supera i 2.000 m",
      "Ricco di piante; animali: lupi, cervi, camosci, falchi pellegrini, aquile reali",
      "La valle del Pogallo è nel parco"
    ],
    ricorda: "Val Grande: l'area selvaggia più vasta d'Italia."
  },

  /* ---------------- GALLERIE E VALICHI ---------------- */
  {
    id: "frejus", nome: "Galleria del Frejus", cat: "passi", lat: 45.09, lng: 6.70,
    sottotitolo: "Verso la Francia",
    testo: "La galleria del Frejus passa sotto le Alpi e collega il Piemonte con la Francia. Si trova vicino a Bardonecchia, in fondo alla Valle di Susa. Sulla carta ci sono anche il Passo del Moncenisio e il Colle del Monginevro, altri valichi verso la Francia.",
    punti: [
      "Collega il Piemonte alla Francia",
      "In fondo alla Valle di Susa, vicino a Bardonecchia",
      "[[Ci sono due gallerie: una per i treni (aperta nel 1871) e una per le auto (1980)]]"
    ],
    ricorda: "Frejus → Francia."
  },
  {
    id: "sempione", nome: "Galleria del Sempione", cat: "passi", lat: 46.2058, lng: 8.1978,
    sottotitolo: "Verso la Svizzera",
    testo: "La galleria del Sempione collega il Piemonte con la Svizzera passando sotto le Alpi, a nord della Val d'Ossola. Sopra c'è il Passo del Sempione, che si trova in Svizzera. [[È una galleria per i treni lunga quasi 20 km: quando fu aperta, nel 1906, era la più lunga del mondo.]]",
    punti: [
      "Collega il Piemonte alla Svizzera",
      "A nord, sopra Domodossola",
      "[[Galleria ferroviaria di quasi 20 km (1906)]]"
    ],
    ricorda: "Sempione → Svizzera."
  },
  {
    id: "tenda", nome: "Colle di Tenda", cat: "passi", lat: 44.165, lng: 7.57,
    sottotitolo: "Verso la Francia, a sud",
    testo: "Il Colle di Tenda è un valico delle Alpi Marittime, a sud di Cuneo, che porta in Francia. [[Sotto il colle passa una galleria stradale; di là si scende verso Nizza e il mare.]]",
    punti: [
      "Alpi Marittime, a sud",
      "Porta in Francia",
      "Vicino a Limone Piemonte"
    ],
    ricorda: "Colle di Tenda: a sud, verso la Francia."
  },

  /* ---------------- AGRICOLTURA E PRODOTTI ---------------- */
  {
    id: "risaie", nome: "Le risaie", cat: "sapori", lat: 45.40, lng: 8.30,
    sottotitolo: "Oltre metà del riso italiano viene dal Piemonte",
    testo: "In pianura, intorno a Vercelli e Novara, ci sono tantissime risaie: campi pieni d'acqua dove cresce il riso. Viste dall'alto formano scacchiere perfette. Il Piemonte è il maggiore produttore di riso d'Italia: oltre la metà del riso prodotto in Italia viene da qui.",
    punti: [
      "Il Piemonte è il maggiore produttore di riso in Italia: oltre metà del riso italiano",
      "In pianura si coltivano anche cereali come mais e grano, e il foraggio",
      "L'agricoltura è moderna e molto produttiva",
      "[[In primavera i campi allagati sembrano tanti specchi d'acqua]]"
    ],
    ricorda: "Risaie: il Piemonte è il maggiore produttore di riso."
  },
  {
    id: "alba", nome: "Alba e il tartufo", cat: "sapori", lat: 44.7004, lng: 8.0357,
    sottotitolo: "Sulle colline delle Langhe",
    testo: "La zona di Alba, sulle colline delle Langhe, è famosa per il tartufo, un fungo prezioso che cresce sotto terra: il più famoso è il tartufo bianco d'Alba. Sulle colline intorno si coltivano viti e noccioli, e le nocciole servono all'industria dolciaria. [[Ogni autunno c'è la Fiera internazionale del tartufo bianco. Ad Alba è nata anche la Nutella!]]",
    punti: [
      "Famosa per il tartufo bianco d'Alba",
      "Colline con viti, noccioli e alberi da frutto",
      "Industria alimentare e dolciaria",
      "[[Fiera del tartufo bianco, in autunno]]"
    ],
    ricorda: "Alba: il tartufo."
  },

  /* ---------------- MONUMENTI ---------------- */
  {
    id: "sacra", nome: "Sacra di San Michele", cat: "castelli", lat: 45.0978, lng: 7.3433,
    sottotitolo: "All'imbocco della Valle di Susa",
    testo: "La Sacra di San Michele è un'antica abbazia costruita in cima a un monte, all'imbocco della Valle di Susa. [[Fu costruita intorno all'anno 1000 ed è il monumento simbolo del Piemonte.]]",
    punti: [
      "All'imbocco della Valle di Susa",
      "Costruita in cima a un monte",
      "[[Si dice che abbia ispirato il romanzo «Il nome della rosa»]]"
    ],
    ricorda: "Sacra di San Michele: all'imbocco della Valle di Susa."
  },
  {
    id: "fenestrelle", nome: "Forte di Fenestrelle", cat: "castelli", lat: 45.0313, lng: 7.0517, extra: true,
    sottotitolo: "Una fortezza lunga 3 km",
    testo: "Il Forte di Fenestrelle, in Val Chisone, è una delle fortezze più grandi d'Europa: le sue mura salgono lungo la montagna per circa 3 km. Fu costruito dai Savoia nel Settecento.",
    punti: [
      "Val Chisone, nelle Alpi Cozie",
      "Una scala coperta di circa 4.000 gradini collega le sue parti",
      "È chiamato «la Grande Muraglia piemontese»"
    ],
    ricorda: "Fenestrelle: la Grande Muraglia piemontese."
  },

  /* ---------------- SCI E TERME (non sono nel testo del libro) ---------------- */
  {
    id: "sestriere", nome: "Sestriere", cat: "turismo", lat: 44.9579, lng: 6.8790, extra: true,
    sottotitolo: "Sci nelle Alpi Cozie",
    testo: "Sestriere è una località sciistica delle Alpi Cozie, a più di 2.000 metri. Nel 2006 vi si sono svolte le gare di sci dei Giochi Olimpici Invernali di Torino.",
    punti: [
      "A 2.035 m di altezza",
      "Giochi Olimpici Invernali di Torino 2006",
      "Fa parte del comprensorio della Via Lattea"
    ],
    ricorda: "Sestriere: sci e Olimpiadi del 2006."
  },
  {
    id: "acqui", nome: "Acqui Terme", cat: "turismo", lat: 44.6760, lng: 8.4686, extra: true,
    sottotitolo: "Acque calde da 2.000 anni",
    testo: "Ad Acqui Terme sgorgano acque calde conosciute già dai Romani. In piazza c'è la fontana della «Bollente», da cui esce acqua a quasi 75 °C.",
    punti: [
      "Terme conosciute dai tempi dei Romani",
      "La Bollente: acqua a quasi 75 °C",
      "Tra le colline del Monferrato"
    ],
    ricorda: "Acqui Terme: le acque calde della Bollente."
  }
];

/* Scheda del fiume principale (si apre cliccando il fiume sulla cartina). */
window.FIUME_INFO = {
  nome: "Po", cat: "natura",
  sottotitolo: "Il fiume più importante della regione",
  testo: "La regione è ricca d'acqua e il suo fiume più importante è il Po, che nasce dal Monviso, a ovest. Scende verso la pianura, passa per Torino e attraversa il Piemonte da ovest a est. Poi entra in Lombardia [[e, dopo aver attraversato tutta la Pianura Padana, sfocia nel mare Adriatico]].",
  punti: [
    "Nasce dal Monviso",
    "Passa per Torino",
    "[[È il fiume più lungo d'Italia: 652 km]]",
    "[[In Piemonte riceve la Dora Riparia, la Dora Baltea, la Sesia e il Tanaro]]",
    "[[Il tracciato sulla mappa è calcolato dai dati di altitudine]]"
  ],
  ricorda: "Il Po nasce dal Monviso e passa per Torino."
};

/* Scritte della carta fisica (come negli atlanti di scuola).
   min = zoom da cui compaiono; r = rotazione in gradi (positivo = in senso orario).
   Le scritte dei fiumi vengono "agganciate" al fiume più vicino (vedi app.js). */
window.ETICHETTE_FISICHE = [
  // catene montuose e pianure (come sulla carta del libro)
  { t: "ALPI LEPONTINE",  tipo: "catena",  lat: 46.33, lng: 8.22, r: -12, min: 7 },
  { t: "ALPI PENNINE",    tipo: "catena",  lat: 46.04, lng: 7.62, r: -8,  min: 7 },
  { t: "ALPI GRAIE",      tipo: "catena",  lat: 45.33, lng: 6.98, r: -72, min: 7 },
  { t: "ALPI COZIE",      tipo: "catena",  lat: 44.80, lng: 6.93, r: -78, min: 7 },
  { t: "ALPI MARITTIME",  tipo: "catena",  lat: 44.22, lng: 7.02, r: -8,  min: 7 },
  { t: "APPENNINO LIGURE", tipo: "catena", lat: 44.52, lng: 8.95, r: -28, min: 7 },
  { t: "Pianura Padana",  tipo: "pianura", lat: 45.27, lng: 8.95, r: -6,  min: 7 },
  { t: "Langhe",          tipo: "regione", lat: 44.45, lng: 8.15, r: 0,   min: 8.5 },
  { t: "Monferrato",      tipo: "regione", lat: 45.11, lng: 8.47, r: 0,   min: 8.5 },
  { t: "Canavese",        tipo: "regione", lat: 45.43, lng: 7.80, r: 0,   min: 8.5 },
  // valli
  { t: "Val d'Ossola",    tipo: "valle", lat: 46.12, lng: 8.27, r: -70, min: 8.5 },
  { t: "Valle di Susa",   tipo: "valle", lat: 45.13, lng: 7.12, r: -12, min: 8.5 },
  { t: "Valsesia",        tipo: "valle", lat: 45.82, lng: 8.13, r: -55, min: 9 },
  // cime (quelle principali hanno già il loro pallino)
  { t: "▲ Monte Leone 3553",  tipo: "cima", lat: 46.2489, lng: 8.1103, min: 9 },
  { t: "▲ Monte Antola 1597", tipo: "cima", lat: 44.5925, lng: 9.1403, min: 9 },
  { t: "▲ Monte Basodino 3273", tipo: "cima", lat: 46.4146, lng: 8.4778, min: 9.5 },
  // fiumi, laghi e mare
  { t: "Po",           tipo: "fiume", lat: 44.93, lng: 7.68, min: 7,   km2: 2000 },
  { t: "Po",           tipo: "fiume", lat: 45.13, lng: 8.40, min: 7.5, km2: 8000 },
  { t: "Tanaro",       tipo: "fiume", lat: 44.85, lng: 8.42, min: 8,   km2: 1500 },
  { t: "Dora Baltea",  tipo: "fiume", lat: 45.33, lng: 7.95, min: 8,   km2: 2000 },
  { t: "Dora Riparia", tipo: "fiume", lat: 45.10, lng: 7.45, min: 8.5, km2: 600 },
  { t: "Sesia",        tipo: "fiume", lat: 45.45, lng: 8.38, min: 8,   km2: 700 },
  { t: "Stura di Demonte", tipo: "fiume", lat: 44.52, lng: 7.66, min: 8.5, km2: 700 },
  { t: "Stura di Lanzo",   tipo: "fiume", lat: 45.22, lng: 7.56, min: 8.5, km2: 500 },
  { t: "Orco",         tipo: "fiume", lat: 45.30, lng: 7.76, min: 8.5, km2: 500 },
  { t: "Bormida",      tipo: "fiume", lat: 44.80, lng: 8.55, min: 8.5, km2: 1500 },
  { t: "Scrivia",      tipo: "fiume", lat: 44.82, lng: 8.88, min: 8.5, km2: 600 },
  { t: "Ticino",       tipo: "fiume", lat: 45.55, lng: 8.72, min: 8,   km2: 3000 },
  { t: "Toce",         tipo: "fiume", lat: 46.00, lng: 8.33, min: 8.5, km2: 700 },
  { t: "Lago Maggiore", tipo: "lago", lat: 45.98, lng: 8.67, r: -60, min: 7 },
  { t: "Mar Ligure",    tipo: "lago", lat: 44.17, lng: 8.78, r: -15, min: 7 }
];

/* Città fuori dal Piemonte, per la carta politica (quelle del Piemonte sono i pallini). */
window.CITTA = [
  { nome: "Aosta",     lat: 45.7372, lng: 7.3206, tipo: "provincia" },
  { nome: "Milano",    lat: 45.4642, lng: 9.1900, tipo: "provincia" },
  { nome: "Varese",    lat: 45.8206, lng: 8.8251, tipo: "provincia" },
  { nome: "Pavia",     lat: 45.1847, lng: 9.1582, tipo: "provincia" },
  { nome: "Piacenza",  lat: 45.0526, lng: 9.6930, tipo: "provincia" },
  { nome: "Genova",    lat: 44.4056, lng: 8.9463, tipo: "provincia" },
  { nome: "Savona",    lat: 44.3091, lng: 8.4772, tipo: "provincia" },
  { nome: "Imperia",   lat: 43.8897, lng: 8.0343, tipo: "provincia" },
  { nome: "Chambéry",  lat: 45.5646, lng: 5.9178, tipo: "citta" },
  { nome: "Briançon",  lat: 44.8996, lng: 6.6431, tipo: "citta" },
  { nome: "Sion",      lat: 46.2331, lng: 7.3606, tipo: "citta" },
  { nome: "Briga",     lat: 46.3157, lng: 7.9879, tipo: "citta" },
  { nome: "Locarno",   lat: 46.1709, lng: 8.7995, tipo: "citta" },
  { nome: "Lugano",    lat: 46.0037, lng: 8.9511, tipo: "citta" }
];

/* Etichette dei territori confinanti. */
window.CONFINANTI = [
  { nome: "FRANCIA",        lat: 44.95, lng: 6.30 },
  { nome: "SVIZZERA",       lat: 46.50, lng: 7.55 },
  { nome: "VALLE D'AOSTA",  lat: 45.88, lng: 7.28 },
  { nome: "LOMBARDIA",      lat: 45.62, lng: 9.45 },
  { nome: "LIGURIA",        lat: 44.20, lng: 8.20 },
  { nome: "EMILIA-ROMAGNA", lat: 44.78, lng: 9.62 }
];

/* Scheda generale mostrata quando nessun luogo è selezionato.
   Numeri come nel libro di testo (Geografia vol. 5, pp. 34–37). */
window.SCHEDA = [
  {
    titolo: "📍 Carta d'identità",
    html: `<div class="stats">
        <div class="stat"><span>Superficie</span><b>25.386 km²</b><small>«Che meraviglia!»: 25.387</small></div>
        <div class="stat"><span>Abitanti</span><b>4.252.279</b><small>«Che meraviglia!»: 4.251.351</small></div>
        <div class="stat"><span>Densità</span><b>168 ab./km²</b><small>«Che meraviglia!»: 167</small></div>
        <div class="stat"><span>Capoluogo</span><b>Torino</b><small>848.885 ab.</small></div>
      </div>
      <ul>
      <li><b>Città principali:</b> Torino, Alessandria, Asti, Biella, Cuneo, Novara, Verbania (provincia del Verbano-Cusio-Ossola), Vercelli</li>
      <li>È una regione a <b>statuto ordinario</b>, come quasi tutte (la Valle d'Aosta invece è a statuto speciale)</li>
      <li><b>Il nome:</b> viene dal latino <i>ad pedem montium</i>, che significa «ai piedi dei monti»: il Piemonte infatti è circondato su tre lati dalle Alpi</li>
      <li><b>Bandiera:</b> rossa con una croce bianca e una striscia azzurra in alto</li>
      <li>[[È la seconda regione d'Italia per grandezza, dopo la Sicilia]]</li>
      <li>[[<b>Comuni:</b> 1.180]]</li>
      <li class="libri">📖 Libri: «Geografia» vol. 5, pp. 34–37 e «Che meraviglia!» Geografia 5, pp. 35–37. I numeri sono quelli di «Geografia»: se «Che meraviglia!» ne dà uno diverso, è scritto accanto.</li>
    </ul>`
  },
  {
    titolo: "🗺️ Confini e territorio",
    html: `<p>Si trova ai piedi delle <b>Alpi occidentali</b>, nel nord-ovest dell'Italia. Confina con <b>Valle d'Aosta</b>, <b>Lombardia</b>, <b>Liguria</b> ed <b>Emilia-Romagna</b> e con due Stati: <b>Francia</b> e <b>Svizzera</b>. Non ha il mare.</p>
      <p><b>Territorio</b></p>
      <div class="segbar-wrap terreno" role="img" aria-label="Territorio: montagna 43 per cento, collina 30 per cento, pianura 27 per cento">
        <div class="segbar">
          <span style="--w:43;--c:var(--s1)" title="Montagna: 43%"><b>43%</b></span>
          <span style="--w:30;--c:var(--s2)" title="Collina: 30%"><b>30%</b></span>
          <span style="--w:27;--c:var(--s3)" title="Pianura: 27%"><b>27%</b></span>
        </div>
        <ul class="seglegend">
          <li><i style="--c:var(--s1)"></i>Montagna <small>Alpi e Appennino Ligure</small><b>43%</b></li>
          <li><i style="--c:var(--s2)"></i>Collina <small>Langhe e Monferrato</small><b>30%</b></li>
          <li><i style="--c:var(--s3)"></i>Pianura <small>Pianura Padana</small><b>27%</b></li>
        </ul>
      </div>
      <ul>
      <li><b>Montagna:</b> a nord, a ovest e a sud-ovest ci sono le <b>Alpi</b>, con alcune delle cime più alte d'Italia: il <b>Monte Rosa</b> e il <b>Gran Paradiso</b>, che il Piemonte condivide con la Valle d'Aosta, e il <b>Monviso</b>. Da nord a sud: Alpi Lepontine, Pennine, Graie, Cozie e Marittime. A sud si estende l'<b>Appennino Ligure</b>.</li>
      <li><b>Collina:</b> la zona centrale è occupata da colline, con i gruppi delle <b>Langhe</b> e del <b>Monferrato</b>.</li>
      <li><b>Pianura:</b> a est c'è la <b>Pianura Padana</b>, con le sue numerose <b>risaie</b>.</li>
    </ul>`
  },
  {
    titolo: "💧 Fiumi e laghi",
    html: `<p>La regione è <b>ricca d'acqua</b>. Il fiume più importante è il <b>Po</b>, che <b>nasce dal Monviso</b>, passa per Torino e attraversa la Pianura Padana.</p>
      <p><b>Gli affluenti del Po</b> (i fiumi che finiscono nel Po). Destra e sinistra si guardano seguendo la corrente, cioè guardando verso il mare:</p>
      <ul>
      <li><b>di sinistra</b>, dalle Alpi: Dora Riparia, Stura di Lanzo, Orco, Dora Baltea, Sesia (e il Ticino, al confine con la Lombardia)</li>
      <li><b>di destra</b>: il Tanaro, che prima raccoglie la Stura di Demonte e la Bormida, e lo Scrivia</li>
      </ul>
      <p>I laghi più importanti sono il <b>Lago Maggiore</b> e il <b>Lago d'Orta</b>, tutti e due di <b>origine glaciale</b>: si sono formati dove un tempo c'erano dei grandi ghiacciai. Nel Lago Maggiore ci sono le <b>Isole Borromee</b>; al centro del Lago d'Orta c'è l'<b>Isola di San Giulio</b>. Più piccolo è il <b>Lago di Viverone</b>, tra Biella e Ivrea.</p>`
  },
  {
    titolo: "❄️ Clima e ambienti",
    html: `<p>Nella regione ci sono <b>climi diversi</b> e ogni zona ha un paesaggio diverso:</p>
      <ol class="fasce">
        <li style="--c:#e9dcd2"><b>Montagna</b> clima <b>alpino</b>: inverni rigidi e nevosi, estati fresche. Paesaggio imponente, con picchi e <b>ghiacciai perenni</b>.</li>
        <li style="--c:#f3e6c2"><b>Collina</b> clima <b>temperato</b> sulle colline appenniniche. Tanti <b>vigneti</b> ben coltivati che producono vini famosi.</li>
        <li style="--c:#d6ead3"><b>Pianura</b> clima <b>continentale</b>: inverni freddi e <b>nebbiosi</b>, estati <b>afose</b>. Le <b>risaie</b> formano scacchiere perfette, accanto alle zone industriali.</li>
      </ol>
      <p>In Piemonte ci sono vaste <b>aree naturali</b> incontaminate e selvagge. Tra queste c'è il <b>Parco Nazionale della Val Grande</b>, tra Domodossola e il Lago Maggiore: è l'<b>area selvaggia più vasta d'Italia</b>. È soprattutto montuoso (la cima Pedum supera i 2.000 metri) e ci vivono <b>lupi, cervi, camosci, falchi pellegrini e aquile reali</b>.</p>`
  },
  {
    titolo: "👥 Popolazione",
    html: `<ul>
      <li>Gli abitanti sono <b>4.252.279</b>, <b>168 per km²</b> [[(più di quattro volte la Valle d'Aosta, che ne ha 38)]]</li>
      <li>La maggior parte vive nella <b>fascia pedemontana</b> (cioè ai piedi delle montagne) e nella <b>Pianura Padana</b>, soprattutto nelle <b>grandi città</b> di pianura, dove passano le principali <b>vie di comunicazione</b></li>
      <li><b>Oltre metà</b> della popolazione vive nelle zone intorno a <b>Torino</b>, il capoluogo</li>
      <li>[[In montagna, invece, vivono poche persone]]</li>
      <li><b>Lingue:</b> si parlano l'<b>italiano</b>, alcuni <b>dialetti</b> locali e, nelle zone vicino al confine, il <b>francese</b></li>
    </ul>`
  },
  {
    titolo: "💼 Economia",
    html: `<p>Il Piemonte è una delle regioni <b>più ricche e industrializzate</b> d'Italia: si trova al centro di importanti vie di comunicazione, che hanno aiutato lo sviluppo delle attività economiche.</p>
      <p><b>Occupati per settore</b></p>
      <div class="segbar-wrap" role="img" aria-label="Occupati per settore: primario 3,4 per cento, secondario 31,8 per cento, terziario 64,8 per cento">
        <div class="segbar">
          <span style="--w:3.4;--c:var(--s1)" title="Primario: 3,4%"></span>
          <span style="--w:31.8;--c:var(--s2)" title="Secondario: 31,8%"><b>31,8%</b></span>
          <span style="--w:64.8;--c:var(--s3)" title="Terziario: 64,8%"><b>64,8%</b></span>
        </div>
        <ul class="seglegend">
          <li><i style="--c:var(--s1)"></i>Primario <small>agricoltura, allevamento</small><b>3,4%</b></li>
          <li><i style="--c:var(--s2)"></i>Secondario <small>industria</small><b>31,8%</b></li>
          <li><i style="--c:var(--s3)"></i>Terziario <small>turismo, commercio, servizi</small><b>64,8%</b></li>
        </ul>
        <p class="nota-libro">«Che meraviglia!»: primario 3%, secondario 34%, terziario 63%.</p>
      </div>
      <ul>
      <li><b>Primario:</b> l'agricoltura è <b>moderna e molto produttiva</b>. In pianura si coltivano <b>cereali</b> (mais, grano), <b>foraggio</b> e <b>riso</b>: il Piemonte è il <b>maggiore produttore di riso</b> d'Italia, con <b>oltre la metà</b> del riso italiano. Sulle colline ci sono <b>viti</b>, <b>noccioli</b> e <b>alberi da frutto</b>; le <b>Langhe</b> sono famose per i vini pregiati, i formaggi e i tartufi, soprattutto il <b>tartufo bianco d'Alba</b>. È molto sviluppato l'<b>allevamento</b>, soprattutto dei <b>bovini</b>.</li>
      <li><b>Secondario:</b> l'industria piemontese è una delle più avanzate d'Italia. I prodotti agricoli alimentano l'<b>industria alimentare</b>: vinicola (vino), casearia (formaggi) e dolciaria (dolci). Ci sono poi industrie dei settori <b>metalmeccanico, elettronico, informatico, chimico e tessile</b>. [[A Torino è nata la FIAT, la più grande fabbrica di automobili d'Italia.]]</li>
      <li><b>Terziario:</b> è il settore più redditizio e dà lavoro a <b>quasi il 65%</b> degli occupati: servizi commerciali, <b>banche</b>, <b>ricerca scientifica e tecnologica</b> ed <b>editoria</b> (a Torino ci sono importanti editori e il <b>Salone internazionale del libro</b>). Il <b>turismo</b> è sviluppato nelle <b>città d'arte</b>, in <b>montagna</b> e lungo i <b>laghi</b>, e cresce il turismo <b>enogastronomico</b>: si viene per assaggiare i vini e i prodotti del territorio.</li>
    </ul>
      <p><b>Il marchio DOP</b> (Denominazione di origine protetta) si dà a un prodotto speciale di una zona, fatto con materie prime e metodi di quella zona. Serve a difendere la qualità ed evitare le imitazioni. [[In Piemonte, per esempio, sono DOP i formaggi Castelmagno e Toma Piemontese e il Riso di Baraggia Biellese e Vercellese.]]</p>`
  },
  {
    titolo: "🚗 Comunicazioni",
    html: `<ul>
      <li>Una vasta rete <b>stradale</b> e <b>ferroviaria</b> collega il Piemonte al resto d'Italia e all'<b>Europa</b></li>
      <li><b>Galleria del Frejus</b> → <b>Francia</b> (in fondo alla Valle di Susa)</li>
      <li><b>Galleria del Sempione</b> → <b>Svizzera</b> (sopra la Val d'Ossola)</li>
      <li>Sulla carta ci sono anche altri valichi verso la Francia: Passo del Moncenisio, Colle del Monginevro, Colle della Maddalena, Colle di Tenda</li>
      <li>L'aeroporto principale è quello di <b>Torino-Caselle</b></li>
    </ul>`
  },
  {
    titolo: "🏛️ Torino, cultura e curiosità",
    html: `<ul>
      <li><b>Torino prima capitale d'Italia:</b> quando l'Italia diventò uno Stato unito, nel <b>1861</b>, la capitale fu Torino [[(fino al 1865)]]. Il primo <b>Parlamento italiano</b> si riuniva a <b>Palazzo Carignano</b>.</li>
      <li><b>Mole Antonelliana:</b> il monumento simbolo di Torino, progettato in quegli anni; oggi ospita il <b>Museo Nazionale del Cinema</b></li>
      <li><b>Museo Egizio:</b> il museo dedicato all'<b>arte egizia</b> più antico del mondo, fondato nel <b>1824</b>. Nei primi anni del Novecento si arricchì di migliaia di reperti della civiltà dei faraoni, trovati in Egitto da archeologi italiani. È il più importante al mondo <b>dopo quello del Cairo</b>.</li>
      <li><b>Salone internazionale del libro:</b> ogni anno a Torino arrivano migliaia di visitatori</li>
      <li><b>Sacra di San Michele:</b> un'antica abbazia all'imbocco della Valle di Susa</li>
      <li><b>Cibi inventati in Piemonte:</b> i <b>grissini</b>, il <b>tramezzino</b>, i <b>gianduiotti</b> e anche il <b>gelato stecco</b>!</li>
      <li><b>Reggia di Venaria Reale</b>, vicino a Torino: una delle residenze della famiglia reale dei <b>Savoia</b> [[(che governò il Piemonte per secoli)]], con le scuderie e un magnifico giardino. Fa parte delle <b>Residenze Sabaude</b>, Patrimonio dell'<b>UNESCO</b>.</li>
      <li><b>Isole Borromee</b>, nel Lago Maggiore: l'<b>Isola Bella</b> (palazzo della famiglia Borromeo e giardino a terrazze), l'<b>Isola Madre</b> (la più grande, con un giardino botanico dove vivono liberi pavoni bianchi, fagiani dorati e pappagalli) e l'<b>Isola dei Pescatori</b> (l'unica abitata tutto l'anno, da chi vive di pesca e turismo).</li>
    </ul>`
  }
];

/* Domande per esercitarsi, come negli esercizi del libro ("Uso la carta", vero/falso, "Comprendo il testo").
   sez = sezione della scheda: a ogni partita c'è almeno una domanda per sezione.
   tipo "scelta": opzioni + indice della risposta giusta (si parte da 0); tipo "vf": vero = true/false. */
window.SEZIONI_DOMANDE = ["identita", "territorio", "acque", "clima", "popolazione", "economia", "comunicazioni", "cultura"];
window.DOMANDE = [
  { sez: "identita", tipo: "scelta", d: "Qual è il capoluogo del Piemonte?", opzioni: ["Novara", "Torino", "Cuneo"], giusta: 1, spiega: "Il capoluogo è Torino (848.885 abitanti)." },
  { sez: "identita", tipo: "scelta", d: "Che cosa vuol dire il nome «Piemonte»?", opzioni: ["in mezzo al mare", "ai piedi dei monti", "terra dei fiumi"], giusta: 1, spiega: "Viene dal latino ad pedem montium, «ai piedi dei monti»: il Piemonte è circondato su tre lati dalle Alpi." },
  { sez: "identita", tipo: "scelta", d: "Quanti abitanti ha il Piemonte?", opzioni: ["circa 400.000", "circa 4 milioni e 250 mila", "circa 40 milioni"], giusta: 1, spiega: "Ha 4.252.279 abitanti (in «Che meraviglia!» 4.251.351)." },
  { sez: "identita", tipo: "scelta", d: "Quanto è grande il Piemonte?", opzioni: ["3.261 km²", "25.386 km²", "253.860 km²"], giusta: 1, spiega: "La superficie è di 25.386 km² (in «Che meraviglia!» 25.387; 3.261 km² è la Valle d'Aosta)." },
  { sez: "identita", tipo: "scelta", d: "Qual è la densità di popolazione del Piemonte?", opzioni: ["38 abitanti per km²", "168 abitanti per km²", "1.680 abitanti per km²"], giusta: 1, spiega: "168 abitanti per km² (in «Che meraviglia!» 167)." },
  { sez: "identita", tipo: "scelta", d: "Quale di queste NON è una città principale del Piemonte?", opzioni: ["Asti", "Biella", "Genova"], giusta: 2, spiega: "Genova è in Liguria. Le città principali del Piemonte sono Torino, Alessandria, Asti, Biella, Cuneo, Novara, Verbania e Vercelli." },
  { sez: "identita", tipo: "vf", d: "Il Piemonte ha il mare.", vero: false, spiega: "Falso: il Piemonte non ha coste. Tra il Piemonte e il mare c'è la Liguria." },
  { sez: "identita", tipo: "vf", extra: true, d: "Il Piemonte è la seconda regione d'Italia per grandezza.", vero: true, spiega: "Vero: è più piccola solo della Sicilia." },
  { sez: "territorio", tipo: "vf", d: "Il Piemonte confina a nord con la Germania.", vero: false, spiega: "Falso: a nord confina con la Svizzera." },
  { sez: "territorio", tipo: "vf", d: "La Pianura Padana occupa la parte occidentale del Piemonte.", vero: false, spiega: "Falso: la Pianura Padana è a est (la parte orientale). A ovest ci sono le Alpi." },
  { sez: "territorio", tipo: "vf", d: "L'Appennino Ligure si estende tra il Piemonte e la Liguria.", vero: true, spiega: "Vero: si trova a sud del Piemonte." },
  { sez: "territorio", tipo: "scelta", d: "Dove si trovano le cime piemontesi più alte?", opzioni: ["sulle Alpi, a nord, a ovest e a sud-ovest", "sull'Appennino, a sud", "nella Pianura Padana"], giusta: 0, spiega: "Sulle Alpi: il Monte Rosa, il Gran Paradiso e il Monviso." },
  { sez: "territorio", tipo: "scelta", d: "Da che cosa è occupata la zona centrale del Piemonte?", opzioni: ["dalle colline", "da un grande lago", "dalle risaie"], giusta: 0, spiega: "Dalle colline, con i gruppi delle Langhe e del Monferrato." },
  { sez: "territorio", tipo: "scelta", d: "Su quanti lati il Piemonte è circondato dalle Alpi?", opzioni: ["su uno", "su tre", "su quattro"], giusta: 1, spiega: "Su tre lati: a nord, a ovest e a sud-ovest." },
  { sez: "territorio", tipo: "scelta", d: "Quale tipo di territorio occupa la parte più grande del Piemonte?", opzioni: ["la montagna", "la collina", "la pianura"], giusta: 0, spiega: "La montagna: 43%. Poi la collina (30%) e la pianura (27%)." },
  { sez: "territorio", tipo: "scelta", d: "Quale montagna il Piemonte condivide con la Valle d'Aosta?", opzioni: ["il Monviso", "il Gran Paradiso", "la Cima dell'Argentera"], giusta: 1, spiega: "Il Gran Paradiso, e anche il Monte Rosa." },
  { sez: "territorio", tipo: "scelta", d: "Come si chiamano i due grandi gruppi di colline del Piemonte?", opzioni: ["Langhe e Monferrato", "Alpi e Appennini", "Ossola e Susa"], giusta: 0, spiega: "Le Langhe e il Monferrato, al centro della regione." },
  { sez: "territorio", tipo: "scelta", d: "Con quali regioni italiane confina il Piemonte?", opzioni: ["Valle d'Aosta, Lombardia, Liguria, Emilia-Romagna", "Toscana e Lazio", "Veneto e Friuli-Venezia Giulia"], giusta: 0, spiega: "Con Valle d'Aosta, Lombardia, Liguria ed Emilia-Romagna." },
  { sez: "territorio", tipo: "scelta", d: "Con quali Stati confina il Piemonte?", opzioni: ["Francia e Svizzera", "Austria e Slovenia", "Spagna e Francia"], giusta: 0, spiega: "Con la Francia a ovest e la Svizzera a nord." },
  { sez: "acque", tipo: "vf", d: "Il Po nasce sul Monviso.", vero: true, spiega: "Vero: il Po nasce dal Monviso, a ovest." },
  { sez: "acque", tipo: "scelta", d: "Qual è il fiume più importante del Piemonte?", opzioni: ["il Tevere", "il Po", "l'Arno"], giusta: 1, spiega: "Il Po, che nasce dal Monviso e passa per Torino." },
  { sez: "acque", tipo: "scelta", d: "Quali sono i laghi più importanti del Piemonte?", opzioni: ["Lago Maggiore e Lago d'Orta", "Lago di Garda e Lago di Como", "Lago Trasimeno e Lago di Bolsena"], giusta: 0, spiega: "Il Lago Maggiore e il Lago d'Orta." },
  { sez: "acque", tipo: "scelta", d: "Che origine hanno il Lago Maggiore e il Lago d'Orta?", opzioni: ["vulcanica", "glaciale", "artificiale"], giusta: 1, spiega: "Glaciale: si sono formati dove un tempo c'erano dei grandi ghiacciai." },
  { sez: "acque", tipo: "scelta", d: "In quale lago si trovano le Isole Borromee?", opzioni: ["nel Lago d'Orta", "nel Lago Maggiore", "nel Lago di Garda"], giusta: 1, spiega: "Nel Lago Maggiore: l'Isola Bella è una di loro." },
  { sez: "acque", tipo: "vf", d: "Il Piemonte è una regione povera d'acqua.", vero: false, spiega: "Falso: la regione è ricca d'acqua, con fiumi e laghi." },
  { sez: "acque", tipo: "scelta", extra: true, d: "In quale mare sfocia il Po?", opzioni: ["nel Mar Ligure", "nel mare Adriatico", "nel Mar Tirreno"], giusta: 1, spiega: "Nel mare Adriatico, dopo aver attraversato tutta la Pianura Padana." },
  { sez: "clima", tipo: "scelta", d: "Che clima c'è in montagna?", opzioni: ["alpino", "mediterraneo", "tropicale"], giusta: 0, spiega: "Alpino: inverni rigidi e nevosi, estati fresche." },
  { sez: "clima", tipo: "scelta", d: "Com'è il clima in pianura?", opzioni: ["continentale: inverni freddi e nebbiosi, estati afose", "mite e senza nebbia", "sempre nevoso"], giusta: 0, spiega: "Continentale: inverni freddi e nebbiosi, estati afose." },
  { sez: "clima", tipo: "scelta", d: "Che clima c'è sulle colline appenniniche?", opzioni: ["temperato", "polare", "desertico"], giusta: 0, spiega: "Temperato." },
  { sez: "clima", tipo: "scelta", d: "Che cosa caratterizza il paesaggio di collina?", opzioni: ["i vigneti", "le risaie", "i ghiacciai"], giusta: 0, spiega: "I vigneti ben coltivati che producono vini famosi." },
  { sez: "clima", tipo: "scelta", d: "Che cosa caratterizza il paesaggio di pianura?", opzioni: ["risaie e zone industriali", "picchi e ghiacciai", "vulcani"], giusta: 0, spiega: "Le risaie, che formano scacchiere perfette, e le zone industriali." },
  { sez: "clima", tipo: "scelta", d: "Qual è l'area selvaggia più vasta d'Italia?", opzioni: ["il Parco Nazionale della Val Grande", "le Isole Borromee", "la Pianura Padana"], giusta: 0, spiega: "Il Parco Nazionale della Val Grande, tra Domodossola e il Lago Maggiore." },
  { sez: "clima", tipo: "vf", d: "Nel Parco della Val Grande vivono lupi, cervi e aquile reali.", vero: true, spiega: "Vero: e anche camosci e falchi pellegrini." },
  { sez: "popolazione", tipo: "scelta", d: "Dove vive la maggior parte della popolazione?", opzioni: ["in alta montagna", "nella fascia pedemontana e nella Pianura Padana", "sulle isole del Lago Maggiore"], giusta: 1, spiega: "Nella fascia pedemontana (ai piedi delle montagne) e nella Pianura Padana." },
  { sez: "popolazione", tipo: "scelta", d: "Che cosa vuol dire «fascia pedemontana»?", opzioni: ["la zona ai piedi delle montagne", "la cima delle montagne", "la riva del mare"], giusta: 0, spiega: "È la zona ai piedi delle montagne, tra la montagna e la pianura." },
  { sez: "popolazione", tipo: "scelta", d: "Quanti piemontesi vivono nelle zone intorno a Torino?", opzioni: ["pochissimi", "oltre la metà", "nessuno"], giusta: 1, spiega: "Oltre metà della popolazione vive intorno a Torino." },
  { sez: "popolazione", tipo: "vf", d: "Il Piemonte è una delle regioni più ricche e industrializzate d'Italia.", vero: true, spiega: "Vero: si trova al centro di importanti vie di comunicazione." },
  { sez: "popolazione", tipo: "vf", extra: true, d: "In Piemonte ci sono più abitanti per km² che in Valle d'Aosta.", vero: true, spiega: "Vero: 168 contro 38, più di quattro volte tanto." },
  { sez: "economia", tipo: "scelta", d: "Di quale prodotto il Piemonte è il maggiore produttore d'Italia?", opzioni: ["l'olio", "il riso", "le arance"], giusta: 1, spiega: "Del riso: oltre la metà del riso italiano viene dal Piemonte. Le risaie sono nella Pianura Padana, intorno a Vercelli e Novara." },
  { sez: "economia", tipo: "scelta", d: "Che cosa si coltiva in pianura?", opzioni: ["mais, grano, foraggio e riso", "olive e agrumi", "caffè e cacao"], giusta: 0, spiega: "Mais, grano, foraggio e riso." },
  { sez: "economia", tipo: "scelta", d: "Che cosa c'è sulle colline?", opzioni: ["viti e alberi da frutto", "risaie", "miniere di carbone"], giusta: 0, spiega: "Viti e alberi da frutto." },
  { sez: "economia", tipo: "scelta", d: "Per che cosa è famosa la zona di Alba?", opzioni: ["per il tartufo", "per il mare", "per i vulcani"], giusta: 0, spiega: "Per il tartufo." },
  { sez: "economia", tipo: "scelta", d: "Quale allevamento è più sviluppato in Piemonte?", opzioni: ["quello dei bovini", "quello dei cammelli", "quello dei pesci"], giusta: 0, spiega: "Quello dei bovini." },
  { sez: "economia", tipo: "scelta", d: "In quali settori lavorano le industrie piemontesi?", opzioni: ["meccanico, elettronico, informatico, chimico e tessile", "solo la pesca", "solo il turismo"], giusta: 0, spiega: "Meccanico, elettronico, informatico, chimico e tessile." },
  { sez: "economia", tipo: "scelta", d: "Quale settore ha più occupati?", opzioni: ["il primario", "il secondario", "il terziario"], giusta: 2, spiega: "Il terziario: quasi il 65% (64,8%; in «Che meraviglia!» 63%)." },
  { sez: "economia", tipo: "vf", d: "In Piemonte l'agricoltura è moderna e molto produttiva.", vero: true, spiega: "Vero." },
  { sez: "economia", tipo: "scelta", extra: true, d: "Quale grande fabbrica di automobili è nata a Torino?", opzioni: ["la FIAT", "la Ferrari", "la Volkswagen"], giusta: 0, spiega: "La FIAT, nel 1899." },
  { sez: "comunicazioni", tipo: "scelta", d: "Quale galleria porta in Francia?", opzioni: ["il Sempione", "il Frejus", "il Gran San Bernardo"], giusta: 1, spiega: "Il Frejus, in fondo alla Valle di Susa." },
  { sez: "comunicazioni", tipo: "scelta", d: "Quale galleria porta in Svizzera?", opzioni: ["il Sempione", "il Frejus", "il Monte Bianco"], giusta: 0, spiega: "Il Sempione, sopra la Val d'Ossola. (Il Traforo del Monte Bianco è in Valle d'Aosta.)" },
  { sez: "comunicazioni", tipo: "scelta", d: "Che cosa ha aiutato lo sviluppo delle attività economiche?", opzioni: ["le importanti vie di comunicazione", "il mare", "i vulcani"], giusta: 0, spiega: "Il Piemonte si trova al centro di importanti vie di comunicazione." },
  { sez: "comunicazioni", tipo: "vf", d: "Una vasta rete di strade e ferrovie collega il Piemonte all'Europa.", vero: true, spiega: "Vero: anche attraverso le gallerie del Sempione e del Frejus." },
  { sez: "comunicazioni", tipo: "vf", d: "Il Traforo del Monte Bianco si trova in Piemonte.", vero: false, spiega: "Falso: è in Valle d'Aosta. Le gallerie del Piemonte sono il Sempione e il Frejus." },
  { sez: "cultura", tipo: "scelta", d: "Qual è il monumento simbolo di Torino?", opzioni: ["la Mole Antonelliana", "il Colosseo", "la Torre di Pisa"], giusta: 0, spiega: "La Mole Antonelliana." },
  { sez: "cultura", tipo: "scelta", d: "Che cosa si trova nel Museo Egizio di Torino?", opzioni: ["opere d'arte dell'antico Egitto", "automobili", "dinosauri"], giusta: 0, spiega: "Opere d'arte e reperti dell'antico Egitto." },
  { sez: "cultura", tipo: "scelta", d: "In che anno fu fondato il Museo Egizio?", opzioni: ["nel 1824", "nel 1924", "nel 1492"], giusta: 0, spiega: "Nel 1824: è il museo di arte egizia più antico del mondo." },
  { sez: "cultura", tipo: "vf", d: "Il Museo Egizio di Torino è il più importante al mondo dopo quello del Cairo.", vero: true, spiega: "Vero." },
  { sez: "cultura", tipo: "scelta", d: "Che cosa si svolge ogni anno a Torino?", opzioni: ["il Salone internazionale del libro", "il Festival di Sanremo", "il Palio di Siena"], giusta: 0, spiega: "Il Salone internazionale del libro, con migliaia di visitatori." },
  { sez: "cultura", tipo: "scelta", d: "Quale di questi cibi è stato inventato in Piemonte?", opzioni: ["la pizza", "i grissini", "la paella"], giusta: 1, spiega: "I grissini, e anche il tramezzino, i gianduiotti e il gelato stecco." },
  { sez: "cultura", tipo: "scelta", d: "Dove si trova la Sacra di San Michele?", opzioni: ["all'imbocco della Valle di Susa", "sul Lago Maggiore", "nel centro di Torino"], giusta: 0, spiega: "All'imbocco della Valle di Susa." },
  { sez: "cultura", tipo: "scelta", d: "Quale città fu la prima capitale d'Italia?", opzioni: ["Roma", "Torino", "Firenze"], giusta: 1, spiega: "Torino, dal 1861 [[al 1865]]." },
  { sez: "cultura", tipo: "scelta", d: "Dove si riuniva il primo Parlamento italiano?", opzioni: ["a Palazzo Carignano, a Torino", "nella Mole Antonelliana", "nella Reggia di Venaria"], giusta: 0, spiega: "A Palazzo Carignano, quando Torino era la capitale (1861)." },
  { sez: "cultura", tipo: "scelta", d: "Che cosa ospita oggi la Mole Antonelliana?", opzioni: ["il Museo Nazionale del Cinema", "il Museo Egizio", "il Parlamento"], giusta: 0, spiega: "Il Museo Nazionale del Cinema." },
  { sez: "cultura", tipo: "scelta", d: "Di quale famiglia era la Reggia di Venaria Reale?", opzioni: ["dei Savoia", "dei Medici", "dei Borromeo"], giusta: 0, spiega: "Dei Savoia: fa parte delle Residenze Sabaude, Patrimonio UNESCO." },
  { sez: "cultura", tipo: "vf", d: "La Reggia di Venaria Reale è Patrimonio dell'UNESCO.", vero: true, spiega: "Vero: fa parte delle Residenze Sabaude." },
  { sez: "cultura", tipo: "scelta", d: "Quale delle Isole Borromee è l'unica abitata tutto l'anno?", opzioni: ["l'Isola dei Pescatori", "l'Isola Bella", "l'Isola Madre"], giusta: 0, spiega: "L'Isola dei Pescatori: ci vive una piccola comunità di pesca e turismo." },
  { sez: "cultura", tipo: "scelta", d: "Su quale isola vivono liberi pavoni bianchi, fagiani dorati e pappagalli?", opzioni: ["sull'Isola Madre", "sull'Isola dei Pescatori", "sull'Isola di San Giulio"], giusta: 0, spiega: "Sull'Isola Madre, la più grande delle Isole Borromee, nel giardino botanico." },
  { sez: "identita", tipo: "scelta", d: "Il Piemonte è una regione a statuto…", opzioni: ["ordinario", "speciale"], giusta: 0, spiega: "Ordinario, come quasi tutte le regioni. La Valle d'Aosta invece è a statuto speciale." },
  { sez: "popolazione", tipo: "scelta", d: "Quali lingue si parlano in Piemonte?", opzioni: ["l'italiano, alcuni dialetti e, vicino ai confini, il francese", "solo il tedesco", "l'italiano e lo spagnolo"], giusta: 0, spiega: "L'italiano, alcuni dialetti locali e, nelle zone di confine, il francese." },
  { sez: "popolazione", tipo: "vf", d: "Molti piemontesi vivono nelle grandi città di pianura, dove passano le principali vie di comunicazione.", vero: true, spiega: "Vero." },
  { sez: "acque", tipo: "scelta", d: "Quali di questi sono affluenti di sinistra del Po (arrivano dalle Alpi)?", opzioni: ["Dora Riparia, Dora Baltea e Sesia", "Tanaro e Scrivia", "Arno e Tevere"], giusta: 0, spiega: "Da sinistra arrivano Dora Riparia, Stura di Lanzo, Orco, Dora Baltea e Sesia. Da destra il Tanaro e lo Scrivia." },
  { sez: "acque", tipo: "scelta", d: "Quali di questi arrivano nel Po da destra?", opzioni: ["il Tanaro e lo Scrivia", "la Dora Baltea e la Sesia", "l'Orco e la Stura di Lanzo"], giusta: 0, spiega: "Il Tanaro (che raccoglie la Stura di Demonte e la Bormida) e lo Scrivia." },
  { sez: "acque", tipo: "vf", d: "La Bormida si getta direttamente nel Po.", vero: false, spiega: "Falso: entra nel Tanaro, che poi entra nel Po." },
  { sez: "acque", tipo: "scelta", d: "Quale isola c'è al centro del Lago d'Orta?", opzioni: ["l'Isola di San Giulio", "l'Isola Bella", "l'Isola d'Elba"], giusta: 0, spiega: "L'Isola di San Giulio." },
  { sez: "economia", tipo: "scelta", d: "Quanto del riso italiano viene dal Piemonte?", opzioni: ["oltre la metà", "un decimo", "quasi niente"], giusta: 0, spiega: "Oltre la metà: il Piemonte è il maggiore produttore di riso d'Italia." },
  { sez: "economia", tipo: "scelta", d: "Che cosa si coltiva sulle colline, oltre alle viti?", opzioni: ["i noccioli", "il riso", "le arance"], giusta: 0, spiega: "I noccioli e gli alberi da frutto." },
  { sez: "economia", tipo: "scelta", d: "Quale industria usa i prodotti dell'agricoltura?", opzioni: ["l'industria alimentare: vinicola, casearia e dolciaria", "l'industria navale", "le miniere"], giusta: 0, spiega: "L'industria alimentare: fa vino, formaggi e dolci." },
  { sez: "economia", tipo: "scelta", d: "Che cosa vuol dire DOP?", opzioni: ["Denominazione di origine protetta", "Dolce originale piemontese", "Divieto di ogni produzione"], giusta: 0, spiega: "È un marchio per i prodotti speciali di una zona: ne difende la qualità ed evita le imitazioni." },
  { sez: "economia", tipo: "scelta", d: "Che cos'è il turismo enogastronomico?", opzioni: ["viaggiare per assaggiare vini e prodotti tipici", "viaggiare in treno", "andare a sciare"], giusta: 0, spiega: "Si viaggia per gustare vini e prodotti del territorio: in Piemonte è in aumento." },
  { sez: "economia", tipo: "scelta", d: "Dove è sviluppato il turismo in Piemonte?", opzioni: ["nelle città d'arte, in montagna e lungo i laghi", "solo al mare", "solo nelle risaie"], giusta: 0, spiega: "Nelle città d'arte, in montagna e lungo i laghi." }
];

/* Domande e risposte per ripassare (livello scuola primaria), come gli esercizi del libro.
   Nella scheda della regione la risposta si apre toccando la domanda. */
window.DOMANDE_RISPOSTE = [
  { gruppo: "🏔️ Territorio", domande: [
    { d: "Dove si trova il Piemonte?",
      r: "Nel nord-ovest dell'Italia, ai piedi delle Alpi occidentali." },
    { d: "Che cosa vuol dire il nome «Piemonte»?",
      r: "Vuol dire «ai piedi dei monti» (dal latino ad pedem montium): la regione infatti è circondata su tre lati dalle Alpi." },
    { d: "Con chi confina?",
      r: "Con la Valle d'Aosta, la Lombardia, la Liguria e l'Emilia-Romagna, e con due Stati: la Francia e la Svizzera." },
    { d: "Com'è il territorio?",
      r: "C'è un po' di tutto: 43% montagna, 30% collina e 27% pianura." },
    { d: "Dove si trovano le cime piemontesi più alte?",
      r: "Sulle Alpi, a nord, a ovest e a sud-ovest: il Monte Rosa e il Gran Paradiso (condivisi con la Valle d'Aosta) e il Monviso." },
    { d: "Che cosa c'è a sud?",
      r: "L'Appennino Ligure, tra il Piemonte e la Liguria." },
    { d: "Da che cosa è occupata la zona centrale del Piemonte?",
      r: "Dalle colline, con i gruppi delle Langhe e del Monferrato." },
    { d: "Che cosa c'è a est?",
      r: "La Pianura Padana, con le sue numerose risaie." }
  ]},
  { gruppo: "💧 Fiumi e laghi", domande: [
    { d: "Qual è il fiume più importante?",
      r: "Il Po, che nasce dal Monviso e passa per Torino." },
    { d: "Quali affluenti riceve il Po?",
      r: "Da sinistra, dalle Alpi: Dora Riparia, Stura di Lanzo, Orco, Dora Baltea e Sesia. Da destra: il Tanaro (che raccoglie la Stura di Demonte e la Bormida) e lo Scrivia. Destra e sinistra si guardano seguendo la corrente." },
    { d: "Quali sono i laghi più importanti della regione?",
      r: "Il Lago Maggiore e il Lago d'Orta, tutti e due di origine glaciale." },
    { d: "Che cosa vuol dire «di origine glaciale»?",
      r: "Che il lago si è formato dove un tempo c'era un grande ghiacciaio." }
  ]},
  { gruppo: "❄️ Clima e ambienti", domande: [
    { d: "Com'è il clima in montagna?",
      r: "Alpino: inverni rigidi e nevosi, estati fresche. Il paesaggio ha picchi e ghiacciai perenni." },
    { d: "Com'è il clima in pianura?",
      r: "Continentale: inverni freddi e nebbiosi, estati afose. Ci sono le risaie e le zone industriali." },
    { d: "E in collina?",
      r: "Sulle colline appenniniche il clima è temperato. Ci sono tanti vigneti che producono vini famosi." },
    { d: "Qual è l'area selvaggia più vasta d'Italia?",
      r: "Il Parco Nazionale della Val Grande, tra Domodossola e il Lago Maggiore. Ci vivono lupi, cervi, camosci, falchi pellegrini e aquile reali." }
  ]},
  { gruppo: "👥 Popolazione", domande: [
    { d: "Quanti abitanti ha il Piemonte?",
      r: "4.252.279: circa 4 milioni e 250 mila. Sono 168 per km²." },
    { d: "Dove vive la maggior parte delle persone?",
      r: "Nella fascia pedemontana, cioè ai piedi delle montagne, e nella Pianura Padana, soprattutto nelle grandi città, dove passano le vie di comunicazione. Oltre metà vive intorno a Torino." },
    { d: "Quali lingue si parlano?",
      r: "L'italiano, alcuni dialetti locali e, vicino ai confini, il francese. Il Piemonte è una regione a statuto ordinario." },
    { d: "Qual è il capoluogo?",
      r: "Torino, con 848.885 abitanti. Il suo monumento simbolo è la Mole Antonelliana." }
  ]},
  { gruppo: "💼 Lavoro e collegamenti", domande: [
    { d: "Il Piemonte è una regione ricca?",
      r: "Sì, è una delle più ricche e industrializzate d'Italia, perché si trova al centro di importanti vie di comunicazione." },
    { d: "Che cosa si coltiva?",
      r: "In pianura cereali, foraggio e riso: oltre metà del riso italiano viene dal Piemonte. Sulle colline viti, noccioli e alberi da frutto; ad Alba il tartufo bianco." },
    { d: "Che cosa producono le industrie?",
      r: "C'è l'industria alimentare (vino, formaggi, dolci), che usa i prodotti agricoli, e poi industrie metalmeccaniche, elettroniche, informatiche, chimiche e tessili." },
    { d: "Che cosa vuol dire DOP?",
      r: "Denominazione di origine protetta: un marchio per i prodotti speciali di una zona, che ne difende la qualità ed evita le imitazioni." },
    { d: "Dove vanno i turisti?",
      r: "Nelle città d'arte, in montagna e lungo i laghi. Cresce anche il turismo enogastronomico, per assaggiare vini e prodotti tipici." },
    { d: "Qual è il settore con più occupati?",
      r: "Il terziario, con quasi il 65%: turismo, commercio, banche, ricerca ed editoria." },
    { d: "Come si va in Francia e in Svizzera?",
      r: "Con le gallerie del Frejus (verso la Francia) e del Sempione (verso la Svizzera)." }
  ]},
  { gruppo: "🏛️ Torino e curiosità", domande: [
    { d: "Perché Torino è importante nella storia d'Italia?",
      r: "Perché fu la prima capitale d'Italia, nel 1861. Il primo Parlamento si riuniva a Palazzo Carignano." },
    { d: "Che cos'è la Reggia di Venaria Reale?",
      r: "Una residenza dei Savoia vicino a Torino, con le scuderie e un grande giardino. Fa parte delle Residenze Sabaude, Patrimonio UNESCO." },
    { d: "Quali sono le Isole Borromee?",
      r: "L'Isola Bella (palazzo e giardino a terrazze), l'Isola Madre (la più grande, con pavoni bianchi, fagiani dorati e pappagalli) e l'Isola dei Pescatori (l'unica abitata tutto l'anno)." },
    { d: "Che cos'è il Museo Egizio?",
      r: "È il museo di arte egizia più antico del mondo (1824) e il più importante dopo quello del Cairo." },
    { d: "Che cosa succede ogni anno a Torino?",
      r: "C'è il Salone internazionale del libro, con migliaia di visitatori." },
    { d: "Quali cibi sono stati inventati in Piemonte?",
      r: "I grissini, il tramezzino, i gianduiotti e il gelato stecco!" },
    { d: "Che cos'è la Sacra di San Michele?",
      r: "Un'antica abbazia costruita in cima a un monte, all'imbocco della Valle di Susa." }
  ]}
];

/* Flashcard per ripassare (livello scuola primaria): domanda breve davanti, risposta breve dietro. */
window.FLASHCARD = [
  { gruppo: "📍 Carta d'identità", carte: [
    { f: "Qual è il capoluogo?", r: "Torino (848.885 abitanti)." },
    { f: "Quanti abitanti ha il Piemonte?", r: "4.252.279: circa 4 milioni e 250 mila." },
    { f: "Quanto è grande?", r: "25.386 km²." },
    { f: "Qual è la densità di popolazione?", r: "168 abitanti per km²." },
    { f: "Che cosa vuol dire «Piemonte»?", r: "«Ai piedi dei monti»." },
    { f: "Quali sono le città principali?", r: "Torino, Alessandria, Asti, Biella, Cuneo, Novara, Verbania, Vercelli." },
    { f: "Il Piemonte ha il mare?", r: "No: tra il Piemonte e il mare c'è la Liguria." }
  ]},
  { gruppo: "🏔️ Territorio", carte: [
    { f: "Con quali Stati confina?", r: "Con la Francia e la Svizzera." },
    { f: "Con quali regioni confina?", r: "Valle d'Aosta, Lombardia, Liguria, Emilia-Romagna." },
    { f: "Quanta montagna, collina e pianura?", r: "43% montagna, 30% collina, 27% pianura." },
    { f: "Su quanti lati ci sono le Alpi?", r: "Su tre lati: nord, ovest e sud-ovest." },
    { f: "Quali sono le cime più alte?", r: "Monte Rosa, Gran Paradiso e Monviso." },
    { f: "Quali cime condivide con la Valle d'Aosta?", r: "Il Monte Rosa e il Gran Paradiso." },
    { f: "Quali montagne ci sono a sud?", r: "L'Appennino Ligure." },
    { f: "Quali colline ci sono al centro?", r: "Le Langhe e il Monferrato." },
    { f: "Dove si trova la Pianura Padana?", r: "A est, con le sue risaie." }
  ]},
  { gruppo: "💧 Fiumi e laghi", carte: [
    { f: "Qual è il fiume più importante?", r: "Il Po." },
    { f: "Dove nasce il Po?", r: "Dal Monviso." },
    { f: "Quali sono i laghi più importanti?", r: "Il Lago Maggiore e il Lago d'Orta." },
    { f: "Che origine hanno i due laghi?", r: "Glaciale." },
    { f: "Dove sono le Isole Borromee?", r: "Nel Lago Maggiore." },
    { f: "Quali sono le tre Isole Borromee?", r: "Isola Bella, Isola Madre, Isola dei Pescatori." },
    { f: "Quale isola c'è nel Lago d'Orta?", r: "L'Isola di San Giulio." },
    { f: "Affluenti di sinistra del Po?", r: "Dora Riparia, Stura di Lanzo, Orco, Dora Baltea, Sesia." },
    { f: "Affluenti di destra del Po?", r: "Tanaro (con Stura di Demonte e Bormida) e Scrivia." }
  ]},
  { gruppo: "❄️ Clima e ambienti", carte: [
    { f: "Clima in montagna?", r: "Alpino: inverni rigidi e nevosi, estati fresche." },
    { f: "Clima in pianura?", r: "Continentale: inverni freddi e nebbiosi, estati afose." },
    { f: "Clima sulle colline appenniniche?", r: "Temperato." },
    { f: "Che cosa c'è sulle colline?", r: "Vigneti che producono vini famosi." },
    { f: "Qual è l'area selvaggia più vasta d'Italia?", r: "Il Parco Nazionale della Val Grande." }
  ]},
  { gruppo: "👥 Popolazione", carte: [
    { f: "Dove vive la maggior parte delle persone?", r: "Nella fascia pedemontana e nella Pianura Padana." },
    { f: "Che cos'è la fascia pedemontana?", r: "La zona ai piedi delle montagne." },
    { f: "Quali lingue si parlano?", r: "Italiano, dialetti e, vicino ai confini, francese." },
    { f: "Quanti vivono intorno a Torino?", r: "Oltre metà dei piemontesi." }
  ]},
  { gruppo: "💼 Lavoro e collegamenti", carte: [
    { f: "Di che cosa è il maggiore produttore d'Italia?", r: "Del riso: oltre metà del riso italiano." },
    { f: "Che cosa si coltiva sulle colline?", r: "Viti, noccioli e alberi da frutto." },
    { f: "Quale industria usa i prodotti agricoli?", r: "L'industria alimentare: vinicola, casearia, dolciaria." },
    { f: "Che cosa vuol dire DOP?", r: "Denominazione di origine protetta." },
    { f: "Che cosa si coltiva in pianura?", r: "Mais, grano, foraggio e riso." },
    { f: "Per che cosa è famosa Alba?", r: "Per il tartufo." },
    { f: "Quale allevamento è più sviluppato?", r: "Quello dei bovini." },
    { f: "In quali settori ci sono industrie?", r: "Meccanico, elettronico, informatico, chimico e tessile." },
    { f: "Quale settore ha più occupati?", r: "Il terziario: quasi il 65%." },
    { f: "Quale galleria porta in Francia?", r: "La galleria del Frejus." },
    { f: "Quale galleria porta in Svizzera?", r: "La galleria del Sempione." }
  ]},
  { gruppo: "🏛️ Torino e curiosità", carte: [
    { f: "Qual è il monumento simbolo di Torino?", r: "La Mole Antonelliana (oggi Museo del Cinema)." },
    { f: "Qual è stata la prima capitale d'Italia?", r: "Torino, nel 1861." },
    { f: "Dove si riuniva il primo Parlamento?", r: "A Palazzo Carignano, a Torino." },
    { f: "Che cos'è la Reggia di Venaria?", r: "Una residenza dei Savoia, Patrimonio UNESCO." },
    { f: "Che cos'è il Museo Egizio?", r: "Il museo di arte egizia più antico del mondo (1824)." },
    { f: "Che cosa c'è ogni anno a Torino?", r: "Il Salone internazionale del libro." },
    { f: "Dimmi due cibi inventati in Piemonte.", r: "Ad esempio i grissini e i gianduiotti (e anche il tramezzino e il gelato stecco)." },
    { f: "Dove si trova la Sacra di San Michele?", r: "All'imbocco della Valle di Susa." }
  ]}
];

/* ---------------- Interrogazione ----------------
   Discorso da dire all'interrogazione (circa 3–4 minuti). Le parole tra **asterischi**
   sono le parole chiave: nel sito si possono nascondere per ripassarle a memoria. */
window.DISCORSO = [
  { titolo: "Dove si trova", testo: "Oggi vi parlo del Piemonte. Si trova nel **nord-ovest dell'Italia**, ai piedi delle **Alpi occidentali**. Il suo nome viene dal latino e vuol dire «**ai piedi dei monti**», perché è circondato su **tre lati dalle Alpi**. Confina con **Valle d'Aosta**, **Lombardia**, **Liguria** ed **Emilia-Romagna** e con due Stati: la **Francia** e la **Svizzera**. Il capoluogo è **Torino**. È una regione a **statuto ordinario**: si parlano l'**italiano**, alcuni **dialetti** e, vicino ai confini, il **francese**." },
  { titolo: "I numeri", testo: "Il Piemonte è grande **25.386 km²** e ha circa **4 milioni e 250 mila abitanti**, cioè **168 per km²**. Le città principali sono Torino, Alessandria, Asti, Biella, Cuneo, Novara, Verbania e Vercelli." },
  { titolo: "Il territorio", testo: "Il territorio è per il **43% montagna**, per il **30% collina** e per il **27% pianura**. A nord, a ovest e a sud-ovest ci sono le **Alpi**, con alcune delle cime più alte d'Italia: il **Monte Rosa** e il **Gran Paradiso**, che il Piemonte condivide con la Valle d'Aosta, e il **Monviso**. A sud si trova l'**Appennino Ligure**. Al centro ci sono le **colline** delle **Langhe** e del **Monferrato**, e a est la **Pianura Padana**, con le sue **risaie**." },
  { titolo: "Fiumi e laghi", testo: "La regione è **ricca d'acqua**. Il fiume più importante è il **Po**, che **nasce dal Monviso** e passa per Torino. Riceve tanti **affluenti**: da **sinistra**, dalle Alpi, la Dora Riparia, la Dora Baltea e la Sesia; da **destra** il **Tanaro** e lo Scrivia. I laghi più importanti sono il **Lago Maggiore** e il **Lago d'Orta**, tutti e due di **origine glaciale**. Nel Lago Maggiore ci sono le **Isole Borromee**: l'Isola Bella, l'Isola Madre e l'Isola dei Pescatori." },
  { titolo: "Clima e ambienti", testo: "In Piemonte ci sono **climi diversi**. In montagna il clima è **alpino**, con inverni rigidi e nevosi ed estati fresche; in pianura è **continentale**, con inverni freddi e **nebbiosi** ed estati **afose**; sulle colline appenniniche è **temperato**. Ogni zona ha il suo paesaggio: in montagna **picchi e ghiacciai**, in collina **vigneti**, in pianura **risaie** e zone industriali. C'è anche il **Parco Nazionale della Val Grande**, l'**area selvaggia più vasta d'Italia**." },
  { titolo: "La popolazione", testo: "La maggior parte delle persone vive nella **fascia pedemontana**, cioè ai piedi delle montagne, e nella **Pianura Padana**. **Oltre metà** della popolazione vive nelle zone intorno a **Torino**." },
  { titolo: "L'economia", testo: "Il Piemonte è una delle regioni **più ricche e industrializzate** d'Italia, perché si trova al centro di importanti **vie di comunicazione**. L'**agricoltura** è moderna: si coltivano **cereali, foraggio e riso**, e il Piemonte è il **maggiore produttore di riso** d'Italia: **oltre la metà** del riso italiano viene da qui. Sulle colline ci sono **viti** e **noccioli**, e **Alba** è famosa per il **tartufo bianco**. Si allevano soprattutto i **bovini**. Le **industrie** sono tra le più avanzate d'Italia: c'è l'industria **alimentare**, che fa vino, formaggi e dolci, e poi quella **metalmeccanica, elettronica, informatica, chimica e tessile**. Il settore più importante però è il **terziario**, con **quasi il 65%** degli occupati: commercio, banche, ricerca, editoria e **turismo**, nelle città d'arte, in montagna, sui laghi e per assaggiare i prodotti tipici." },
  { titolo: "I collegamenti", testo: "Una vasta rete di **strade** e **ferrovie** collega il Piemonte al resto d'Italia e all'**Europa**, con la galleria del **Frejus**, verso la **Francia**, e quella del **Sempione**, verso la **Svizzera**." },
  { titolo: "Torino e le curiosità", testo: "Torino è stata la **prima capitale d'Italia**, nel **1861**: il primo **Parlamento** si riuniva a **Palazzo Carignano**. Il monumento simbolo di Torino è la **Mole Antonelliana**, che oggi ospita il **Museo del Cinema**. Vicino c'è la **Reggia di Venaria**, una residenza dei **Savoia** Patrimonio **UNESCO**. A Torino c'è il **Museo Egizio**, il più antico museo di arte egizia del mondo, e ogni anno si tiene il **Salone internazionale del libro**. In Piemonte sono stati inventati i **grissini**, il **tramezzino**, i **gianduiotti** e il **gelato stecco**!" },
  { titolo: "Per concludere", testo: "Il Piemonte è una regione **ai piedi dei monti**, con **montagne, colline e pianura**, dove **nasce il Po**: è ricca di **natura**, di **lavoro** e di **cultura**." }
];

/* Flusso di domande dell'interrogazione: si parte dal generale, si va alla cartina, poi nei dettagli.
   seguito = domanda che l'insegnante fa subito dopo la precedente;
   tipo: "trabocchetto" o "ragionamento" (domande che chiedono il perché);
   mappa: che cosa mostrare sulla cartina quando si vede la risposta. */
window.FLUSSO = [
  { fase: "1️⃣ Si parte", domande: [
    { d: "Parlami del Piemonte.", r: "Comincia dal discorso: dove si trova, che cosa vuol dire il nome, i confini e il capoluogo, Torino.", mappa: { tipo: "regione" } }
  ]},
  { fase: "2️⃣ Alla cartina", domande: [
    { d: "Indicami il Piemonte sulla carta.", r: "È nel nord-ovest dell'Italia, ai piedi delle Alpi occidentali.", mappa: { tipo: "regione" } },
    { seguito: true, d: "Con chi confina?", r: "Con Valle d'Aosta, Lombardia, Liguria ed Emilia-Romagna, e con la Francia e la Svizzera.", mappa: { tipo: "regione" } },
    { seguito: true, tipo: "trabocchetto", d: "A nord confina con la Germania, vero?", r: "No! A nord confina con la Svizzera." },
    { d: "Indicami le montagne.", r: "Le Alpi sono a nord, a ovest e a sud-ovest: il Piemonte ne è circondato su tre lati.", mappa: { tipo: "zona", id: "montagna" } },
    { seguito: true, d: "E le colline?", r: "Al centro: le Langhe e il Monferrato.", mappa: { tipo: "zona", id: "collina" } },
    { seguito: true, tipo: "trabocchetto", d: "La Pianura Padana è a ovest?", r: "No, è a est (nella parte orientale). A ovest ci sono le Alpi.", mappa: { tipo: "zona", id: "pianura" } },
    { d: "Indicami il fiume principale.", r: "Il Po.", mappa: { tipo: "fiume" } },
    { seguito: true, d: "Dove nasce?", r: "Dal Monviso, a ovest, vicino alla Francia.", mappa: { tipo: "luogo", id: "monviso" } },
    { seguito: true, d: "Quali affluenti riceve?", r: "Da sinistra, dalle Alpi: Dora Riparia, Stura di Lanzo, Orco, Dora Baltea e Sesia. Da destra: il Tanaro (con la Stura di Demonte e la Bormida) e lo Scrivia.", mappa: { tipo: "fiume" } },
    { d: "Dov'è il capoluogo?", r: "Torino è in pianura, sul Po, ai piedi delle Alpi.", mappa: { tipo: "luogo", id: "torino" } }
  ]},
  { fase: "3️⃣ Il territorio", domande: [
    { d: "Com'è il territorio?", r: "43% montagna, 30% collina e 27% pianura." },
    { seguito: true, d: "Dove si trovano le cime più alte?", r: "Sulle Alpi: il Monte Rosa e il Gran Paradiso, condivisi con la Valle d'Aosta, e il Monviso.", mappa: { tipo: "luogo", id: "monterosa" } },
    { seguito: true, d: "E a sud che cosa c'è?", r: "L'Appennino Ligure, tra il Piemonte e la Liguria." },
    { tipo: "ragionamento", d: "Perché il Piemonte si chiama così?", r: "Perché vuol dire «ai piedi dei monti»: è circondato su tre lati dalle Alpi." },
    { d: "Quali sono i laghi più importanti?", r: "Il Lago Maggiore e il Lago d'Orta, di origine glaciale.", mappa: { tipo: "luogo", id: "lagomaggiore" } },
    { seguito: true, tipo: "ragionamento", d: "Che cosa vuol dire «di origine glaciale»?", r: "Che si sono formati dove un tempo c'erano dei grandi ghiacciai." },
    { seguito: true, d: "Quali sono le Isole Borromee?", r: "L'Isola Bella, l'Isola Madre (la più grande) e l'Isola dei Pescatori (l'unica abitata tutto l'anno).", mappa: { tipo: "luogo", id: "lagomaggiore" } }
  ]},
  { fase: "4️⃣ Clima e ambienti", domande: [
    { d: "Che clima c'è?", r: "Dipende dalla zona: alpino in montagna, continentale in pianura, temperato sulle colline appenniniche." },
    { seguito: true, d: "Com'è l'inverno in pianura?", r: "Freddo e nebbioso. L'estate invece è afosa." },
    { seguito: true, d: "Com'è il paesaggio delle tre zone?", r: "In montagna picchi e ghiacciai, in collina vigneti, in pianura risaie e zone industriali." },
    { d: "Conosci un'area naturale importante?", r: "Il Parco Nazionale della Val Grande: è l'area selvaggia più vasta d'Italia.", mappa: { tipo: "luogo", id: "valgrande" } }
  ]},
  { fase: "5️⃣ La popolazione", domande: [
    { d: "Quanti abitanti ha il Piemonte?", r: "Circa 4 milioni e 250 mila: 168 per km²." },
    { seguito: true, d: "Dove vive la maggior parte delle persone?", r: "Nella fascia pedemontana e nella Pianura Padana, nelle grandi città; oltre metà intorno a Torino.", mappa: { tipo: "luogo", id: "torino" } },
    { d: "Che lingue si parlano?", r: "L'italiano, alcuni dialetti e, nelle zone di confine, il francese. È una regione a statuto ordinario." },
    { seguito: true, tipo: "ragionamento", d: "Perché poche persone vivono in alta montagna?", r: "Perché fa freddo, è difficile costruire e coltivare, e il lavoro è soprattutto in pianura e nelle città." }
  ]},
  { fase: "6️⃣ L'economia", domande: [
    { d: "È una regione ricca?", r: "Sì: è una delle più ricche e industrializzate d'Italia." },
    { seguito: true, tipo: "ragionamento", d: "Perché?", r: "Perché si trova al centro di importanti vie di comunicazione, che hanno aiutato lo sviluppo delle attività economiche." },
    { d: "Che cosa si coltiva?", r: "In pianura mais, grano, foraggio e riso; sulle colline viti e alberi da frutto." },
    { seguito: true, d: "Di quale prodotto il Piemonte è il primo in Italia?", r: "Del riso: oltre metà del riso italiano viene dal Piemonte. Le risaie sono intorno a Vercelli e Novara.", mappa: { tipo: "luogo", id: "risaie" } },
    { seguito: true, d: "Per che cosa è famosa Alba?", r: "Per il tartufo.", mappa: { tipo: "luogo", id: "alba" } },
    { d: "Qual è il settore con più occupati?", r: "Il terziario, quasi il 65%: turismo, commercio, banche, ricerca ed editoria." },
    { d: "Che cosa vuol dire DOP?", r: "Denominazione di origine protetta: un marchio che protegge i prodotti speciali di una zona dalle imitazioni." },
    { seguito: true, tipo: "trabocchetto", d: "Allora l'industria non è importante?", r: "Sì che lo è! Il Piemonte è molto industrializzato (settori meccanico, elettronico, informatico, chimico e tessile), ma nel terziario lavorano più persone." }
  ]},
  { fase: "7️⃣ I collegamenti", domande: [
    { tipo: "ragionamento", d: "Se ci sono le Alpi, come si va in Francia e in Svizzera?", r: "Con le gallerie che passano sotto le montagne: il Frejus e il Sempione." },
    { seguito: true, tipo: "trabocchetto", d: "Quale galleria porta in Francia?", r: "Il Frejus. Il Sempione porta in Svizzera.", mappa: { tipo: "luogo", id: "frejus" } }
  ]},
  { fase: "8️⃣ Torino e le curiosità", domande: [
    { tipo: "trabocchetto", d: "Roma è sempre stata la capitale d'Italia?", r: "No! Nel 1861 la prima capitale fu Torino: il Parlamento si riuniva a Palazzo Carignano.", mappa: { tipo: "luogo", id: "torino" } },
    { d: "Qual è il monumento simbolo di Torino?", r: "La Mole Antonelliana, che oggi ospita il Museo Nazionale del Cinema.", mappa: { tipo: "luogo", id: "torino" } },
    { seguito: true, d: "Conosci una residenza dei Savoia?", r: "La Reggia di Venaria Reale, con le scuderie e un grande giardino: fa parte delle Residenze Sabaude, Patrimonio UNESCO." },
    { seguito: true, d: "Che cos'è il Museo Egizio?", r: "Il museo di arte egizia più antico del mondo, fondato nel 1824: è il più importante dopo quello del Cairo." },
    { d: "Sai dirmi un cibo inventato in Piemonte?", r: "I grissini, il tramezzino, i gianduiotti o il gelato stecco!" }
  ]},
  { fase: "9️⃣ Per chiudere", domande: [
    { d: "Che cosa ti ha colpito di più?", r: "Prepara una risposta tua, per esempio: «Che il Po nasce dal Monviso» oppure «Il Museo Egizio di Torino»." },
    { tipo: "ragionamento", d: "Confronta il Piemonte con la Valle d'Aosta.", r: "La Valle d'Aosta è tutta montagna e ha pochi abitanti (38 per km²); il Piemonte ha anche colline e pianura, è molto più grande e più popolato (168 per km²)." }
  ]}
];

window.TRABOCCHETTI = [
  ["Il Piemonte confina a nord con la Germania?", "No, con la **Svizzera**"],
  ["La Pianura Padana occupa la parte occidentale?", "No, quella **orientale** (a est)"],
  ["Il Piemonte ha il mare?", "No: c'è la **Liguria** in mezzo"],
  ["Il Po nasce dal Monte Rosa?", "No, dal **Monviso**"],
  ["Il Traforo del Monte Bianco è in Piemonte?", "No, in **Valle d'Aosta**: in Piemonte ci sono il **Frejus** e il **Sempione**"],
  ["Il settore con più occupati è l'industria?", "No, il **terziario** (quasi il 65%)"],
  ["Il Lago di Garda è in Piemonte?", "No: i laghi più importanti sono il **Maggiore** e il **d'Orta**"],
  ["Roma è sempre stata la capitale d'Italia?", "No: la prima fu **Torino**, nel **1861**"],
  ["La Bormida si getta nel Po?", "No, nel **Tanaro**, che poi va nel Po"]
];

window.CONSIGLI = [
  "Rispondi con **frasi complete**: «Il fiume più importante è il Po», non solo «il Po».",
  "Per il territorio usa i **tre numeri**: **43% montagna, 30% collina, 27% pianura**.",
  "Ricordati da dove viene il nome: «**ai piedi dei monti**». È un ottimo modo per cominciare!",
  "Se non ricordi un numero preciso, va bene dire **«circa»** (per esempio «circa 4 milioni e 250 mila abitanti»).",
  "Alla cartina **indica con il dito** mentre parli: Alpi a nord e a ovest, colline al centro, pianura a est.",
  "Le domande di **ragionamento** (💭) chiedono il **perché**: alle medie piacciono molto."
];

/* Visita guidata: tappe animate sulla cartina.
   vista: dove va la cartina ("larga", "regione", oppure gli id dei luoghi da inquadrare);
   carta: "fisica" o "politica"; luci: luoghi che pulsano; zone: id delle zone di regione.js;
   fiume: "disegna" (il fiume principale si disegna) o "luce"; bordo / confini: effetti speciali. */
window.TOUR = [
  { titolo: "Ecco il Piemonte", carta: "fisica", vista: "larga", bordo: true,
    testo: "Siamo nel nord-ovest dell'Italia, ai piedi delle Alpi occidentali. La linea rossa è il confine del Piemonte. Il suo nome vuol dire «ai piedi dei monti», perché è circondato su tre lati dalle Alpi." },
  { titolo: "I confini", carta: "politica", vista: "larga", confini: true,
    testo: "Il Piemonte confina con la Valle d'Aosta, la Lombardia, la Liguria e l'Emilia-Romagna, e con due Stati: la Francia e la Svizzera. Non ha il mare." },
  { titolo: "Montagna, collina e pianura", carta: "fisica", vista: "regione", zone: ["montagna", "collina", "pianura"],
    testo: "Il territorio è per il 43% montagna, per il 30% collina e per il 27% pianura. Guarda i colori: marrone per la montagna, giallo per la collina, verde per la pianura." },
  { titolo: "Le Alpi e le cime più alte", carta: "fisica", vista: ["monterosa", "granparadiso", "monviso"], luci: ["monterosa", "granparadiso", "monviso"],
    testo: "A nord, a ovest e a sud-ovest ci sono le Alpi, con alcune delle cime più alte d'Italia: il Monte Rosa e il Gran Paradiso, che il Piemonte condivide con la Valle d'Aosta, e il Monviso. A sud si estende l'Appennino Ligure." },
  { titolo: "Le colline: Langhe e Monferrato", carta: "fisica", vista: ["langhe", "monferrato"], luci: ["langhe", "monferrato"],
    testo: "La zona centrale è occupata dalle colline, con i gruppi delle Langhe e del Monferrato. Qui il clima è temperato e ci sono tanti vigneti che producono vini famosi." },
  { titolo: "La Pianura Padana e le risaie", carta: "fisica", vista: ["risaie", "vercelli", "novara"], luci: ["risaie"],
    testo: "A est si trova la Pianura Padana, con le sue numerose risaie. Viste dall'alto formano scacchiere perfette: il Piemonte è il maggiore produttore di riso d'Italia." },
  { titolo: "Il Po", carta: "fisica", vista: "regione", fiume: "disegna",
    testo: "La regione è ricca d'acqua. Il fiume più importante è il Po: nasce dal Monviso, passa per Torino e attraversa il Piemonte da ovest a est. Riceve tanti affluenti: da sinistra, dalle Alpi, la Dora Riparia, la Dora Baltea e la Sesia; da destra il Tanaro e lo Scrivia." },
  { titolo: "I laghi", carta: "fisica", vista: ["lagomaggiore", "lagoorta"], luci: ["lagomaggiore", "lagoorta"],
    testo: "I laghi più importanti sono il Lago Maggiore e il Lago d'Orta, tutti e due di origine glaciale: si sono formati dove un tempo c'erano grandi ghiacciai. Nel Lago Maggiore ci sono le Isole Borromee: l'Isola Bella, l'Isola Madre e l'Isola dei Pescatori. Nel Lago d'Orta c'è l'Isola di San Giulio." },
  { titolo: "Il clima", carta: "fisica", vista: "regione", zone: ["montagna", "collina", "pianura"],
    testo: "In montagna il clima è alpino, con inverni rigidi e nevosi ed estati fresche. In pianura è continentale, con inverni freddi e nebbiosi ed estati afose. Sulle colline appenniniche è temperato." },
  { titolo: "Il Parco della Val Grande", carta: "fisica", vista: ["valgrande"], zoom: 10, luci: ["valgrande"],
    testo: "Tra Domodossola e il Lago Maggiore c'è il Parco Nazionale della Val Grande: è l'area selvaggia più vasta d'Italia. Ci vivono lupi, cervi, camosci, falchi pellegrini e aquile reali." },
  { titolo: "Torino, il capoluogo", carta: "fisica", vista: ["torino"], zoom: 11, luci: ["torino"],
    testo: "Torino è il capoluogo ed è stata la prima capitale d'Italia, nel 1861. Il suo simbolo è la Mole Antonelliana, che oggi ospita il Museo del Cinema. Qui c'è il Museo Egizio, il più antico museo di arte egizia del mondo, e vicino c'è la Reggia di Venaria, una residenza dei Savoia." },
  { titolo: "Dove vive la gente", carta: "fisica", vista: "regione", zone: ["pianura"], luci: ["torino"],
    testo: "Il Piemonte ha più di 4 milioni di abitanti. La maggior parte vive ai piedi delle montagne e nella Pianura Padana, e oltre metà vive intorno a Torino." },
  { titolo: "Il lavoro", carta: "fisica", vista: "regione", luci: ["risaie", "alba", "torino"],
    testo: "Il Piemonte è una delle regioni più ricche e industrializzate d'Italia. Si coltivano mais, grano e riso: oltre metà del riso italiano viene da qui. Sulle colline ci sono viti e noccioli, e ad Alba il tartufo. Ci sono tante industrie, ma il settore più importante è il terziario, con il turismo nelle città d'arte, in montagna e sui laghi." },
  { titolo: "Le gallerie sotto le Alpi", carta: "politica", vista: "regione", luci: ["frejus", "sempione"],
    testo: "Strade e ferrovie collegano il Piemonte al resto d'Italia e all'Europa. Sotto le Alpi passano due grandi gallerie: il Frejus, verso la Francia, e il Sempione, verso la Svizzera." },
  { titolo: "Fine della visita! 🎉", carta: "fisica", vista: "regione", fine: true,
    testo: "Hai visto le parti principali del Piemonte. Ora prova a esercitarti: con il quiz, le flashcard o l'interrogazione!" }
];
