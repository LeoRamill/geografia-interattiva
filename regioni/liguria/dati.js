/*
 * Testi e dati della regione Liguria: categorie, luoghi, scheda, domande, flashcard,
 * interrogazione e visita guidata. Le impostazioni (confini, fiume, zone…) sono in regione.js.
 *
 * Riferimento: due libri di testo. «Geografia» vol. 5, pp. 38–41 (A colpo d'occhio, Territorio, Clima e ambienti,
 * Popolazione e attività economiche, Approfondisco: l'acquario di Genova e la focaccia di Recco, Life Skills) e
 * «Che meraviglia!» Geografia 5, pp. 38–40 (Cinque Terre, Portovenere, Educazione civica: rischio alluvioni).
 * I numeri sono quelli di «Geografia»; se «Che meraviglia!» dice un numero diverso, c'è una nota.
 * Quello che non è in nessuno dei due libri va tra [[ ]] (frasi) o con extra: true (luoghi e domande). Vedi CLAUDE.md.
 */

/* Categorie in ordine di importanza per lo studio (così appaiono nella legenda).
   spenta: true = all'apertura i pallini non si vedono (si accendono dalla legenda). */
window.CATEGORIE = {
  montagne: { nome: "Montagne e colline",     icona: "⛰️", colore: "#64748b" },
  citta:    { nome: "Città e porti",          icona: "🏘️", colore: "#2563eb" },
  mare:     { nome: "Mare e coste",           icona: "🌊", colore: "#0891b2" },
  natura:   { nome: "Fiumi, boschi e parchi", icona: "🌳", colore: "#15803d" },
  passi:    { nome: "Valichi",                icona: "🚗", colore: "#c2410c" },
  sapori:   { nome: "Agricoltura e prodotti", icona: "🌿", colore: "#a16207" }
};

window.LUOGHI = [
  /* ---------------- MONTAGNE E COLLINE ---------------- */
  {
    id: "saccarello", nome: "Monte Saccarello", cat: "montagne", lat: 44.0611, lng: 7.7103,
    sottotitolo: "2.200 m · Alpi Marittime",
    testo: "Il Monte Saccarello si trova nelle Alpi Marittime, nella parte più a ovest della Liguria, vicino al confine con la Francia e con il Piemonte. Sulla carta del libro è la cima più alta della regione. [[In cima c'è una grande statua del Redentore.]]",
    punti: [
      "Altezza: 2.200 m [[(altre fonti: 2.201 m)]]",
      "Alpi Marittime, a ovest",
      "Vicino al confine con la Francia e il Piemonte",
      "[[È la cima più alta della Liguria]]"
    ],
    ricorda: "Monte Saccarello: 2.200 m, nelle Alpi Marittime."
  },
  {
    id: "ceppo", nome: "Monte Ceppo", cat: "montagne", lat: 43.9275, lng: 7.7700,
    sottotitolo: "1.627 m · Alpi Marittime",
    testo: "Il Monte Ceppo si trova nelle Alpi Marittime, nell'entroterra di Sanremo. Fa vedere bene una cosa importante della Liguria: le montagne sono vicinissime al mare. [[Dalla cima, in pochi chilometri, si scende fino alla spiaggia.]]",
    punti: [
      "Altezza: 1.627 m",
      "Alpi Marittime, nell'entroterra di Sanremo",
      "Le montagne arrivano vicinissime al mare"
    ],
    ricorda: "Monte Ceppo: 1.627 m, sopra Sanremo."
  },
  {
    id: "cadibona", nome: "Colle di Cadibona", cat: "montagne", lat: 44.330, lng: 8.361,
    sottotitolo: "436 m · qui le Alpi finiscono e comincia l'Appennino",
    testo: "Il Colle di Cadibona si trova vicino a Savona. È un punto molto importante: a ovest ci sono le Alpi Marittime, mentre dal Colle di Cadibona parte l'Appennino Ligure, che va verso est. È anche un valico: di qui si passa dalla costa al Piemonte.",
    punti: [
      "Altezza: 436 m (in «Che meraviglia!» 435 m)",
      "Vicino a Savona",
      "Divide le Alpi Marittime (a ovest) dall'Appennino Ligure (a est)",
      "Sulla carta: vicino passa l'autostrada A6 verso il Piemonte"
    ],
    ricorda: "Dal Colle di Cadibona parte l'Appennino Ligure."
  },
  {
    id: "maggiorasca", nome: "Monte Maggiorasca", cat: "montagne", lat: 44.5511, lng: 9.4906,
    sottotitolo: "1.799 m · Appennino Ligure",
    testo: "Il Monte Maggiorasca si trova nell'Appennino Ligure, sul confine con l'Emilia-Romagna, nell'entroterra di Chiavari. Vicino c'è il Monte Penna, alto 1.735 m. [[È la cima più alta dell'Appennino Ligure.]]",
    punti: [
      "Altezza: 1.799 m [[(altre fonti: 1.804 m)]]",
      "Appennino Ligure, sul confine con l'Emilia-Romagna",
      "Vicino c'è il Monte Penna (1.735 m)",
      "[[La cima più alta dell'Appennino Ligure]]"
    ],
    ricorda: "Monte Maggiorasca: 1.799 m, nell'Appennino Ligure."
  },

  /* ---------------- CITTÀ E PORTI ---------------- */
  {
    id: "genova", nome: "Genova", cat: "citta", lat: 44.4072, lng: 8.9340,
    sottotitolo: "Capoluogo · 560.688 abitanti",
    testo: "Genova è il capoluogo della Liguria. Si trova al centro della costa, sul Golfo di Genova, proprio dove si dividono la Riviera di Ponente (a ovest) e la Riviera di Levante (a est). Ha il porto principale della regione e qui c'è l'acquario più grande d'Europa. A Genova e nei comuni intorno vive oltre la metà dei liguri. [[Il simbolo della città è la Lanterna, l'antico faro del porto.]]",
    punti: [
      "Abitanti: 560.688",
      "Porto principale della Liguria; sulla carta c'è anche l'aeroporto",
      "Acquario di Genova: il più grande d'Europa",
      "Con la sua città metropolitana ha oltre metà degli abitanti della regione",
      "[[Qui è nato Cristoforo Colombo]]"
    ],
    ricorda: "Genova: capoluogo, porto principale e acquario più grande d'Europa."
  },
  {
    id: "savona", nome: "Savona", cat: "citta", lat: 44.3091, lng: 8.4772,
    sottotitolo: "Città principale della Riviera di Ponente · porto",
    testo: "Savona si trova sulla costa, a ovest di Genova, nella Riviera di Ponente. È una città portuale: il suo porto è molto attivo e serve al commercio marittimo. Poco lontano c'è il Colle di Cadibona, da dove parte l'Appennino Ligure. [[Sul mare c'è la grande fortezza del Priamar.]]",
    punti: [
      "Capoluogo di provincia",
      "Porto molto attivo: commercio marittimo",
      "Sulla carta, vicino: Spotorno e, davanti alla costa, la piccola Isola di Bergeggi",
      "Riviera di Ponente, a ovest di Genova",
      "Vicino: il Colle di Cadibona",
      "[[La fortezza del Priamar]]"
    ],
    ricorda: "Savona: un porto molto attivo nella Riviera di Ponente."
  },
  {
    id: "imperia", nome: "Imperia", cat: "citta", lat: 43.8897, lng: 8.0343,
    sottotitolo: "Città principale della Riviera di Ponente",
    testo: "Imperia si trova nella Riviera di Ponente, nella parte più a ovest della Liguria. La sua provincia confina con la Francia. [[La città è nata nel 1923 unendo due città vicine, Porto Maurizio e Oneglia, ed è famosa per l'olio d'oliva.]]",
    punti: [
      "Capoluogo di provincia",
      "Riviera di Ponente, la parte più a ovest",
      "La sua provincia confina con la Francia",
      "Sulla carta, vicino: Cervo, Sanremo e, nell'entroterra, Perinaldo",
      "[[Nata nel 1923 da Porto Maurizio e Oneglia]]",
      "[[Famosa per l'olio d'oliva]]"
    ],
    ricorda: "Imperia: la città principale più a ovest."
  },
  {
    id: "laspezia", nome: "La Spezia", cat: "citta", lat: 44.112, lng: 9.830,
    sottotitolo: "Città principale della Riviera di Levante · porto",
    testo: "La Spezia si trova nella parte più a est della Liguria, in fondo al Golfo di La Spezia, vicino alla Toscana. Il suo porto è molto attivo. Poco lontano ci sono le Cinque Terre. Il golfo è chiamato «Golfo dei Poeti», perché la sua bellezza ha attirato tanti poeti e artisti. [[In città c'è un grande arsenale della Marina Militare.]]",
    punti: [
      "Capoluogo di provincia",
      "Porto molto attivo, sul Golfo di La Spezia",
      "La parte più a est, vicino alla Toscana",
      "Vicino: le Cinque Terre, Portovenere, Lerici e Sarzana",
      "[[Arsenale della Marina Militare]]"
    ],
    ricorda: "La Spezia: porto molto attivo, sul suo golfo, a est."
  },
  {
    id: "ventimiglia", nome: "Ventimiglia", cat: "citta", lat: 43.7903, lng: 7.6081,
    sottotitolo: "L'ultima città prima della Francia",
    testo: "Ventimiglia si trova nella Riviera di Ponente, all'estremo ovest della Liguria, vicino al confine con la Francia. Qui sfocia nel mare il Roia, uno dei principali fiumi liguri che vanno al mare. [[Ogni venerdì c'è un grande mercato, dove arrivano anche tanti francesi.]]",
    punti: [
      "Vicino al confine con la Francia",
      "Alla foce del fiume Roia",
      "Riviera di Ponente, provincia di Imperia",
      "[[Il grande mercato del venerdì]]"
    ],
    ricorda: "Ventimiglia: la città vicino al confine con la Francia."
  },
  {
    id: "cairo", nome: "Cairo Montenotte", cat: "citta", lat: 44.3989, lng: 8.2767,
    sottotitolo: "Una cittadina dell'entroterra, sulla Bormida",
    testo: "Non tutti i liguri vivono sul mare. Cairo Montenotte si trova nell'entroterra, al di là delle montagne, nella valle della Bormida: uno dei fiumi che vanno verso nord e finiscono nel Po. È un esempio di centro abitato che sorge lungo una valle. [[Qui ci sono diverse industrie.]]",
    punti: [
      "Nell'entroterra, provincia di Savona",
      "Sulla Bormida, che va verso il Po",
      "Un centro abitato lungo una valle",
      "[[Nel 1796 qui vicino Napoleone vinse la battaglia di Montenotte]]"
    ],
    ricorda: "Cairo Montenotte: nell'entroterra, sulla Bormida."
  },

  /* ---------------- MARE E COSTE ---------------- */
  {
    id: "varazze", nome: "Varazze", cat: "mare", lat: 44.3600, lng: 8.5760,
    sottotitolo: "Spiagge della Riviera di Ponente",
    testo: "Varazze è una località balneare della Riviera di Ponente, in provincia di Savona: la foto del libro mostra il suo panorama. Nella Riviera di Ponente i rilievi scendono più dolcemente verso il mare e sulla costa ci sono anche spiagge di sabbia o di ciottoli. Le località come Varazze attirano tanti turisti.",
    punti: [
      "Riviera di Ponente, provincia di Savona",
      "I rilievi scendono dolcemente verso il mare",
      "Spiagge di sabbia o di ciottoli",
      "Località balneare: tanti turisti",
      "Altre località balneari sulla carta: Spotorno, Finale Ligure, Loano, Alassio"
    ],
    ricorda: "Varazze: spiagge nella Riviera di Ponente."
  },
  {
    id: "capomele", nome: "Capo Mele", cat: "mare", lat: 43.9590, lng: 8.1700,
    sottotitolo: "Un promontorio della Riviera di Ponente",
    testo: "La costa ligure è ricca di golfi, insenature e promontori. Un promontorio è un pezzo di terra alta che sporge nel mare. Capo Mele è un promontorio della Riviera di Ponente, vicino ad Alassio. [[Sopra c'è un faro.]]",
    punti: [
      "Promontorio: terra che sporge nel mare",
      "Golfo: mare che entra nella terra (come il Golfo di Genova)",
      "Riviera di Ponente, vicino ad Alassio: qui le coste sono basse",
      "[[C'è un faro]]"
    ],
    ricorda: "Capo Mele: un promontorio della Riviera di Ponente."
  },
  {
    id: "sestrilevante", nome: "Sestri Levante", cat: "mare", lat: 44.2735, lng: 9.3990,
    sottotitolo: "Una cittadina sul mare della Riviera di Levante",
    testo: "Sestri Levante si trova nella Riviera di Levante, a est di Genova. Il nome stesso dice dove si trova: a «levante», cioè a est. [[La città vecchia è costruita su una penisola stretta tra due baie: la Baia delle Favole e la Baia del Silenzio.]]",
    punti: [
      "Riviera di Levante, a est di Genova",
      "Il nome contiene la parola «Levante»",
      "[[Tra due baie: la Baia delle Favole e la Baia del Silenzio]]",
      "[[La Baia delle Favole ricorda lo scrittore di fiabe Andersen, che ci soggiornò]]"
    ],
    ricorda: "Sestri Levante: nella Riviera di Levante, a est di Genova."
  },

  {
    id: "portovenere", nome: "Portovenere e il Golfo dei Poeti", cat: "mare", lat: 44.052, lng: 9.835,
    sottotitolo: "Patrimonio UNESCO, con le Cinque Terre",
    testo: "Portovenere è un paesino a picco sul mare. Sorge sulla cima di un promontorio che forma la sponda ovest del Golfo di La Spezia, detto «Golfo dei Poeti» perché la sua bellezza ha attirato tanti poeti e artisti. Il nome viene da un antico tempio dedicato alla dea Venere, che secondo la leggenda era nata dalla spuma del mare. Davanti al paese ci sono tre piccole isole: la Palmaria, il Tino e il Tinetto. Portovenere e le Cinque Terre sono Patrimonio dell'UNESCO.",
    punti: [
      "Su un promontorio del Golfo di La Spezia, il «Golfo dei Poeti»",
      "Il nome viene dal tempio della dea Venere",
      "Tre isole: Palmaria, Tino e Tinetto",
      "Patrimonio dell'UNESCO, insieme alle Cinque Terre",
      "[[Qui vissero i poeti inglesi Byron e Shelley]]"
    ],
    ricorda: "Portovenere: tempio di Venere, Golfo dei Poeti, UNESCO."
  },

  /* ---------------- FIUMI, BOSCHI E PARCHI ---------------- */
  {
    id: "cinqueterre", nome: "Cinque Terre", cat: "natura", lat: 44.1196, lng: 9.7105,
    sottotitolo: "Parco Nazionale · Patrimonio dell'Umanità UNESCO",
    testo: "Le Cinque Terre sono cinque borghi della Riviera di Levante costruiti a picco sul mare: Riomaggiore, Manarola, Corniglia, Vernazza e Monterosso al Mare. Il Parco Nazionale delle Cinque Terre tutela il loro paesaggio e il loro ambiente unico, con le case colorate, i terrazzamenti con i vigneti, le scogliere con i sentieri a strapiombo sul mare e la macchia mediterranea. Le Cinque Terre, insieme a Portovenere, sono Patrimonio Mondiale dell'Umanità UNESCO e attirano turisti in ogni stagione.",
    punti: [
      "Cinque borghi: Riomaggiore, Manarola, Corniglia, Vernazza, Monterosso al Mare",
      "Parco Nazionale delle Cinque Terre",
      "Patrimonio Mondiale dell'Umanità UNESCO",
      "Il paese di Manarola, nella foto del libro, è a picco sul mare",
      "Terrazzamenti con i vigneti e sentieri a strapiombo sul mare [[; un treno collega i borghi]]"
    ],
    ricorda: "Cinque Terre: Parco Nazionale e Patrimonio dell'Umanità UNESCO."
  },
  {
    id: "portofino", nome: "Promontorio di Portofino", cat: "natura", lat: 44.3150, lng: 9.1850,
    sottotitolo: "Parco naturale · Riviera di Levante",
    testo: "Il promontorio di Portofino si trova nella Riviera di Levante, a est di Genova. Il Parco naturale di Portofino protegge la sua bellezza: insieme alle Cinque Terre è uno dei paesaggi che attirano in Liguria turisti in ogni stagione. [[Il piccolo porto di Portofino, con le case colorate, è famoso in tutto il mondo; via mare si arriva all'antica abbazia di San Fruttuoso.]]",
    punti: [
      "Promontorio della Riviera di Levante",
      "Parco naturale di Portofino",
      "Turismo balneare, in ogni stagione: Portofino, Camogli e le Cinque Terre",
      "Sulla carta, vicino: Camogli, Santa Margherita Ligure, Rapallo e Chiavari",
      "[[L'abbazia di San Fruttuoso, raggiungibile a piedi o in barca]]"
    ],
    ricorda: "Portofino: un promontorio protetto da un parco naturale."
  },
  {
    id: "beigua", nome: "Parco del Beigua", cat: "natura", lat: 44.4340, lng: 8.5800,
    sottotitolo: "Parco Regionale · tra Genova e Savona",
    testo: "Il Parco Regionale del Beigua si estende sulle alture tra la città metropolitana di Genova e la provincia di Savona e tutela il paesaggio di questa parte della Liguria. [[Dalle sue cime, a pochi chilometri dal mare, nelle giornate limpide si vedono insieme il mare e le Alpi. È un Geoparco UNESCO, per le sue rocce antichissime.]]",
    punti: [
      "Parco Regionale",
      "Sulle alture tra Genova e Savona",
      "Tutela il paesaggio",
      "[[Geoparco UNESCO]]"
    ],
    ricorda: "Parco del Beigua: sulle alture tra Genova e Savona."
  },
  {
    id: "dolceacqua", nome: "Dolceacqua", cat: "natura", lat: 43.8497, lng: 7.6236,
    sottotitolo: "Un borgo sul Nervia, circondato dai boschi",
    testo: "Dolceacqua è un borgo dell'entroterra della Riviera di Ponente, vicino a Ventimiglia. Si trova sulle rive del Nervia, uno dei tanti torrenti brevi che scendono verso il mare, ed è circondato da boschi: la Liguria infatti è ricca di foreste. [[Ha un antico ponte di pietra e un castello. Il pittore Claude Monet lo dipinse nel 1884.]]",
    punti: [
      "Sulle rive del Nervia, un torrente che va al mare",
      "Circondato da boschi",
      "Entroterra della Riviera di Ponente",
      "[[Il ponte medievale e il castello dei Doria]]"
    ],
    ricorda: "Dolceacqua: un borgo sul Nervia, tra i boschi."
  },

  /* ---------------- VALICHI ---------------- */
  {
    id: "turchino", nome: "Passo del Turchino", cat: "passi", lat: 44.4867, lng: 8.7372,
    sottotitolo: "588 m · da Genova verso il Piemonte",
    testo: "Il Passo del Turchino è un valico dell'Appennino Ligure, sopra Voltri, a ovest di Genova. Le montagne separano la costa dal resto dell'Italia: i valichi servono a passare dall'altra parte, verso il Piemonte.",
    punti: [
      "Altezza: 588 m (in «Che meraviglia!» 532 m)",
      "Appennino Ligure, sopra Voltri",
      "Collega la costa con il Piemonte"
    ],
    ricorda: "Passo del Turchino: un valico sopra Voltri, verso il Piemonte."
  },
  {
    id: "giovi", nome: "Passo dei Giovi", cat: "passi", lat: 44.5450, lng: 8.9330,
    sottotitolo: "472 m · da Genova verso la valle dello Scrivia",
    testo: "Il Passo dei Giovi è un valico dell'Appennino Ligure a nord di Genova, vicino a Busalla. Da qui si scende nella valle dello Scrivia, verso il Piemonte e la Lombardia. Sulla carta vicino passa l'autostrada A7. [[È uno dei passaggi più usati per andare da Genova a Milano.]]",
    punti: [
      "Altezza: 472 m",
      "A nord di Genova, vicino a Busalla",
      "Porta nella valle dello Scrivia",
      "Sulla carta: l'autostrada A7"
    ],
    ricorda: "Passo dei Giovi: da Genova alla valle dello Scrivia."
  },
  {
    id: "nava", nome: "Colle di Nava", cat: "passi", lat: 44.0975, lng: 7.8710,
    sottotitolo: "941 m · da Imperia verso il Piemonte",
    testo: "Il Colle di Nava è un valico delle Alpi Marittime, nell'entroterra di Imperia. Collega la Riviera di Ponente con il Piemonte. [[D'estate è famoso per i campi di lavanda in fiore.]]",
    punti: [
      "Altezza: 941 m",
      "Alpi Marittime, entroterra di Imperia",
      "Collega la Riviera di Ponente con il Piemonte",
      "[[I campi di lavanda]]"
    ],
    ricorda: "Colle di Nava: da Imperia verso il Piemonte."
  },

  {
    id: "scoffera", nome: "Passo della Scoffera", cat: "passi", lat: 44.478, lng: 9.100,
    sottotitolo: "674 m · da Genova verso la valle del Trebbia",
    testo: "Il Passo della Scoffera è un valico dell'Appennino Ligure, nell'entroterra di Genova. Collega Genova con la valle del Trebbia, verso l'Emilia-Romagna. [[Ci passa la strada statale che va da Genova a Piacenza.]]",
    punti: [
      "Altezza: 674 m",
      "Appennino Ligure, sopra Genova",
      "Verso la valle del Trebbia e l'Emilia-Romagna",
      "Si vede sulla carta di «Che meraviglia!»"
    ],
    ricorda: "Passo della Scoffera: da Genova verso il Trebbia."
  },
  {
    id: "bracco", nome: "Passo del Bracco", cat: "passi", lat: 44.252, lng: 9.560,
    sottotitolo: "615 m · nella Riviera di Levante",
    testo: "Il Passo del Bracco è un valico della Riviera di Levante, tra Sestri Levante e La Spezia. Qui le montagne arrivano vicine al mare e la strada deve salire per superarle. [[Ci passa la via Aurelia, l'antica strada romana lungo la costa.]]",
    punti: [
      "Altezza: 615 m",
      "Riviera di Levante, tra Sestri Levante e La Spezia",
      "Si vede sulla carta di «Che meraviglia!»"
    ],
    ricorda: "Passo del Bracco: nella Riviera di Levante."
  },

  /* ---------------- AGRICOLTURA E PRODOTTI ---------------- */
  {
    id: "terrazzamenti", nome: "Ulivi e terrazzamenti", cat: "sapori", lat: 43.9667, lng: 7.9833,
    sottotitolo: "Come si coltiva in collina",
    testo: "Il terreno montuoso e la scarsità d'acqua non aiutano l'agricoltura, che si fa nelle piccole pianure vicino al mare e soprattutto in collina. I pendii sono ripidi, così gli agricoltori ricavano lo spazio per le coltivazioni con la tecnica del terrazzamento: creano tante piccole strisce di terra piana, una sopra l'altra, come i gradini di una scala, [[sostenute da muretti di pietra]]. Si coltivano ulivi, viti, frutta e ortaggi. [[Qui, nell'entroterra di Imperia, ci sono tanti uliveti: le olive taggiasche danno un olio famoso.]]",
    punti: [
      "Tecnica del terrazzamento",
      "Si coltivano ulivi, viti, frutta e ortaggi",
      "L'agricoltura è soprattutto in collina",
      "[[Olive taggiasche]]"
    ],
    ricorda: "In collina si coltiva con i terrazzamenti."
  },
  {
    id: "sanremo", nome: "Sanremo e i fiori", cat: "sapori", lat: 43.8159, lng: 7.7761,
    sottotitolo: "Fiori e piante ornamentali",
    testo: "Sanremo è una città della Riviera di Ponente, in provincia di Imperia. Nella Riviera di Ponente è diffusa la floricoltura, cioè la coltivazione di fiori e piante ornamentali, spesso nelle serre. [[Per questo il tratto di costa intorno a Sanremo è chiamato «Riviera dei Fiori». Ogni anno a Sanremo si tiene il Festival della canzone italiana.]]",
    punti: [
      "Riviera di Ponente, provincia di Imperia",
      "Floricoltura: coltivazione di fiori e piante ornamentali, in serra",
      "[[La «Riviera dei Fiori»]]",
      "[[Il Festival di Sanremo]]"
    ],
    ricorda: "Nella Riviera di Ponente si coltivano i fiori."
  },
  {
    id: "albenga", nome: "Albenga e il carciofo", cat: "sapori", lat: 44.0550, lng: 8.1900,
    sottotitolo: "Il carciofo spinoso di Albenga",
    testo: "Albenga è una città della Riviera di Ponente, in provincia di Savona. È famosa per il carciofo spinoso di Albenga, un prodotto dell'agricoltura ligure noto per il colore e la tenerezza delle sue foglie. [[La città si trova in una delle poche pianure della Liguria, piena di campi e di serre.]]",
    punti: [
      "Riviera di Ponente, provincia di Savona",
      "Carciofo spinoso: colore e foglie tenere",
      "[[In una delle poche pianure liguri]]",
      "[[Ha un centro storico con alte torri medievali]]"
    ],
    ricorda: "Albenga: il carciofo spinoso."
  },
  {
    id: "basilico", nome: "Basilico in serra", cat: "sapori", lat: 44.4190, lng: 8.7900,
    sottotitolo: "Il basilico si coltiva nelle serre",
    testo: "In Liguria nelle serre si coltiva il basilico. [[Il più famoso è quello di Pra', un quartiere di Genova a ovest del porto. Con il basilico si prepara il pesto alla genovese.]]",
    punti: [
      "Coltivato nelle serre",
      "[[Basilico di Pra', a Genova]]",
      "[[Serve per il pesto alla genovese]]"
    ],
    ricorda: "Nelle serre liguri si coltiva il basilico."
  },
  {
    id: "recco", nome: "Recco e la focaccia", cat: "sapori", lat: 44.3622, lng: 9.1433,
    sottotitolo: "La focaccia di Recco",
    testo: "Recco è un paese della Riviera di Levante, vicino a Genova, famoso per la sua focaccia. Secondo la leggenda la focaccia di Recco fu inventata dai contadini che si erano rifugiati nell'entroterra per sfuggire alle incursioni dei pirati saraceni. Per prepararla occorrono farina, acqua, sale, olio e un formaggio morbido.",
    punti: [
      "Riviera di Levante, vicino a Genova",
      "Ingredienti: farina, acqua, sale, olio e un formaggio morbido",
      "Leggenda: i contadini in fuga dai pirati saraceni",
      "[[Il formaggio è di solito la crescenza]]"
    ],
    ricorda: "Recco: la focaccia con il formaggio."
  }
];

/* Scheda del fiume disegnato sulla cartina (si apre cliccando il fiume).
   La Liguria non ha un fiume principale: il libro distingue i fiumi brevi verso il mare
   e quelli più lunghi verso il Po. Sulla cartina c'è lo Scrivia, uno di questi. */
window.FIUME_INFO = {
  nome: "Scrivia", cat: "natura",
  sottotitolo: "Uno dei fiumi che vanno verso nord, nel Po",
  testo: "Dai rilievi della Liguria nascono numerosi fiumi. Quelli che sfociano nel Mar Ligure sono brevi e a carattere torrentizio: hanno tanta acqua quando piove e pochissima d'estate. I principali sono il Magra, il Roia e l'Arroscia. Verso nord vanno invece fiumi più lunghi e regolari, che finiscono nel Po: il Tanaro, la Bormida, lo Scrivia e il Trebbia. Sulla cartina è disegnato lo Scrivia: nasce nell'Appennino Ligure [[vicino a Torriglia]], passa per Busalla e scende verso il Piemonte.",
  punti: [
    "Nasce nell'Appennino Ligure e va verso nord",
    "Finisce nel Po, come il Tanaro, la Bormida e il Trebbia",
    "I fiumi verso il Mar Ligure invece sono brevi e a carattere torrentizio: i principali sono il Magra, il Roia e l'Arroscia",
    "Con le piogge abbondanti i fiumi liguri straripano facilmente: frane e alluvioni",
    "[[È lungo circa 117 km]]",
    "[[Il tracciato sulla mappa è calcolato dai dati di altitudine]]"
  ],
  ricorda: "Lo Scrivia nasce nell'Appennino Ligure e va verso il Po."
};

/* Scritte della carta fisica (come negli atlanti di scuola).
   min = zoom da cui compaiono; r = rotazione in gradi (positivo = in senso orario).
   Le scritte dei fiumi vengono "agganciate" al fiume più vicino (vedi app.js). */
window.ETICHETTE_FISICHE = [
  // catene montuose (come sulla carta del libro)
  // appena fuori dal confine, come nel libro: dentro la regione ci sono i pallini (da zoom 8: sul telefono coprivano tutto)
  { t: "ALPI MARITTIME",   tipo: "catena", lat: 44.24, lng: 7.97, r: 0, min: 8 },
  { t: "APPENNINO LIGURE", tipo: "catena", lat: 44.70, lng: 9.45, r: 4, min: 8 },
  // le due Riviere, scritte sul mare come nel libro
  { t: "Riviera di Ponente", tipo: "regione", lat: 44.02, lng: 8.40, r: -48, min: 8 },
  { t: "Riviera di Levante", tipo: "regione", lat: 44.17, lng: 9.42, r: 24,  min: 8 },
  // cime (quelle principali hanno già il loro pallino)
  { t: "▲ Monte Penna 1735",    tipo: "cima", lat: 44.4870, lng: 9.5110, min: 9.5 },
  { t: "▲ Monte Settepani 1386", tipo: "cima", lat: 44.2450, lng: 8.1960, min: 9.5 },
  // fiumi, mare e golfi
  { t: "Tanaro",   tipo: "fiume", lat: 44.36, lng: 8.02, min: 8.5, km2: 400 },
  { t: "Bormida",  tipo: "fiume", lat: 44.55, lng: 8.33, min: 8.5, km2: 300 },
  { t: "Trebbia",  tipo: "fiume", lat: 44.57, lng: 9.28, min: 8.5, km2: 150 },
  { t: "Roia",     tipo: "fiume", lat: 43.88, lng: 7.56, min: 9,   km2: 400 },
  { t: "Arroscia", tipo: "fiume", lat: 44.04, lng: 7.98, min: 9,   km2: 100 },
  { t: "Argentina", tipo: "fiume", lat: 43.90, lng: 7.85, min: 9.5, km2: 100 },
  { t: "Lavagna",  tipo: "fiume", lat: 44.40, lng: 9.27, min: 9,   km2: 100 },
  { t: "Vara",     tipo: "fiume", lat: 44.27, lng: 9.67, min: 8.5, km2: 200 },
  { t: "Magra",    tipo: "fiume", lat: 44.15, lng: 9.94, min: 8.5, km2: 1000 },
  { t: "Mar Ligure",         tipo: "lago", lat: 43.85, lng: 8.85, r: -10, min: 7 },
  { t: "Golfo di Genova",    tipo: "lago", lat: 44.28, lng: 8.95, r: 0,   min: 8.5 },
  { t: "Golfo di La Spezia", tipo: "lago", lat: 44.05, lng: 9.875, r: -62, min: 10 }
];

/* Città fuori dalla Liguria, per la carta politica (quelle della Liguria sono i pallini). */
window.CITTA = [
  { nome: "Cuneo",       lat: 44.3845, lng: 7.5427,  tipo: "provincia" },
  { nome: "Asti",        lat: 44.9008, lng: 8.2064,  tipo: "provincia" },
  { nome: "Alessandria", lat: 44.9124, lng: 8.6150,  tipo: "provincia" },
  { nome: "Pavia",       lat: 45.1847, lng: 9.1582,  tipo: "provincia" },
  { nome: "Piacenza",    lat: 45.0526, lng: 9.6930,  tipo: "provincia" },
  { nome: "Parma",       lat: 44.8015, lng: 10.3279, tipo: "provincia" },
  { nome: "Massa",       lat: 44.0354, lng: 10.1396, tipo: "provincia" },
  { nome: "Lucca",       lat: 43.8430, lng: 10.5027, tipo: "provincia" },
  { nome: "Nizza",       lat: 43.7034, lng: 7.2663,  tipo: "citta" },
  { nome: "Novi Ligure", lat: 44.7617, lng: 8.7869,  tipo: "citta" }
];

/* Etichette dei territori confinanti (nella visita guidata lampeggiano: solo chi confina davvero). */
window.CONFINANTI = [
  { nome: "FRANCIA",        lat: 43.98, lng: 7.10 },   // più a ovest: sul telefono non c'è spazio tra il bordo e la Liguria
  { nome: "PIEMONTE",       lat: 44.52, lng: 8.05 },
  { nome: "EMILIA-ROMAGNA", lat: 44.86, lng: 9.85 },
  { nome: "TOSCANA",        lat: 44.30, lng: 10.08 }
];

/* Scheda generale mostrata quando nessun luogo è selezionato.
   Numeri come nel libro di testo (Geografia vol. 5, pp. 38–41). */
window.SCHEDA = [
  {
    titolo: "📍 Carta d'identità",
    html: `<div class="stats">
        <div class="stat"><span>Superficie</span><b>5.416 km²</b></div>
        <div class="stat"><span>Abitanti</span><b>1.507.438</b><small>«Che meraviglia!»: 1.507.636</small></div>
        <div class="stat"><span>Densità</span><b>278 ab./km²</b></div>
        <div class="stat"><span>Capoluogo</span><b>Genova</b><small>560.688 ab.</small></div>
      </div>
      <ul>
      <li><b>Città principali:</b> Genova, Imperia, La Spezia, Savona</li>
      <li><b>Il nome:</b> viene dai <b>Liguri</b>, le antiche popolazioni che, molto prima dei Romani, si stanziarono in questa regione</li>
      <li><b>Stemma:</b> la croce rossa su fondo bianco con quattro stelle, sopra la forma di una nave [[(la croce è quella di San Giorgio, simbolo di Genova; le stelle sono le quattro province)]]</li>
      <li>[[È una delle regioni più piccole d'Italia: sono più piccole solo la Valle d'Aosta e il Molise]]</li>
      <li>[[<b>Comuni:</b> 234]]</li>
      <li>È una regione a <b>statuto ordinario</b></li>
      <li class="libri">📖 Libri: «Geografia» vol. 5, pp. 38–41 e «Che meraviglia!» Geografia 5, pp. 38–40. I numeri sono quelli di «Geografia»: se «Che meraviglia!» ne dà uno diverso, è scritto accanto.</li>
    </ul>`
  },
  {
    titolo: "🗺️ Confini e territorio",
    html: `<p>Si trova nel <b>nord-ovest</b> dell'Italia e si estende su uno <b>stretto arco</b> di montagne affacciato sul <b>Mar Ligure</b>. Confina a ovest con la <b>Francia</b>, a nord con il <b>Piemonte</b> e l'<b>Emilia-Romagna</b>, a est con la <b>Toscana</b>.</p>
      <p><b>Territorio</b></p>
      <div class="segbar-wrap terreno" role="img" aria-label="Territorio: montagna 65 per cento, collina 35 per cento">
        <div class="segbar">
          <span style="--w:65;--c:var(--s1)" title="Montagna: 65%"><b>65%</b></span>
          <span style="--w:35;--c:var(--s2)" title="Collina: 35%"><b>35%</b></span>
        </div>
        <ul class="seglegend">
          <li><i style="--c:var(--s1)"></i>Montagna <small>Alpi Marittime e Appennino Ligure</small><b>65%</b></li>
          <li><i style="--c:var(--s2)"></i>Collina <small>arriva fino al mare</small><b>35%</b></li>
        </ul>
      </div>
      <ul>
      <li><b>Montagne e colline</b> occupano quasi tutto il territorio e <b>arrivano fino al mare</b>. Ci sono solo <b>poche e piccole pianure</b>, sulla costa, vicino alla foce dei fiumi.</li>
      <li><b>A ovest</b>, al confine con la Francia, ci sono le <b>Alpi Marittime</b> (Monte Saccarello, 2.200 m).</li>
      <li>Dal <b>Colle di Cadibona</b>, vicino a Savona, parte l'<b>Appennino Ligure</b> (Monte Maggiorasca, 1.799 m).</li>
    </ul>`
  },
  {
    titolo: "🌊 Coste e Riviere",
    html: `<p>La costa è ricca di <b>golfi</b> (il mare che entra nella terra), <b>insenature</b> e <b>promontori</b> (la terra che sporge nel mare). Al centro c'è il <b>Golfo di Genova</b>, che divide la costa in due Riviere:</p>
      <ul>
      <li><b>Riviera di Ponente</b>, a <b>ovest</b> di Genova: i rilievi scendono <b>più dolcemente</b> verso il mare, le coste sono <b>basse</b> e ci sono anche <b>spiagge</b> di sabbia o di ciottoli (come a Varazze).</li>
      <li><b>Riviera di Levante</b>, a <b>est</b> di Genova: gli Appennini arrivano <b>a picco sul mare</b> e le coste sono <b>alte e rocciose</b> (come a Manarola, nelle Cinque Terre).</li>
      <li>[[Un trucco per ricordarle: «ponente» è dove il sole si <i>pone</i>, cioè tramonta (ovest); «levante» è dove il sole si <i>leva</i>, cioè sorge (est).]]</li>
    </ul>`
  },
  {
    titolo: "💧 Fiumi",
    html: `<p>Dai rilievi nascono <b>numerosi fiumi</b>, di due tipi:</p>
      <ul>
      <li>quelli che sfociano nel <b>Mar Ligure</b> sono <b>brevi</b> e a <b>carattere torrentizio</b>: hanno tanta acqua quando piove e quasi niente d'estate. I principali sono il <b>Magra</b>, il <b>Roia</b> e l'<b>Arroscia</b> [[(e poi il Nervia, l'Entella…)]];</li>
      <li>quelli che vanno <b>verso nord</b> sono <b>più lunghi e regolari</b> e finiscono, <b>direttamente o indirettamente</b>, nel <b>Po</b>: il <b>Tanaro</b>, la <b>Bormida</b>, lo <b>Scrivia</b> e il <b>Trebbia</b>. («Indirettamente» vuol dire che prima entrano in un altro fiume: [[la Bormida, per esempio, entra nel Tanaro, che poi entra nel Po]].)</li>
      <li>[[Il Magra, con il suo affluente Vara, nasce in Toscana e sfocia nel Mar Ligure vicino a La Spezia.]]</li>
      <li>⚠️ Con le piogge abbondanti i fiumi <b>straripano</b> facilmente e provocano <b>frane</b> e <b>alluvioni</b> (vedi «Ambiente a rischio»).</li>
    </ul>`
  },
  {
    titolo: "☀️ Clima e ambienti",
    html: `<p>Il clima è <b>mite tutto l'anno</b> grazie all'influenza del <b>mare</b>. Anche le <b>montagne</b> aiutano: proteggono la regione dai <b>venti freddi del nord</b>. Perciò gli <b>inverni</b> sono <b>miti</b> e le <b>estati calde e ventilate</b>.</p>
      <ol class="fasce">
        <li style="--c:#e9dcd2"><b>Rilievi</b> la Liguria è ricca di foreste di <b>latifoglie</b> (alberi con foglie larghe): le montagne sono ricoperte da boschi di <b>castagni</b>, <b>roverella</b> e <b>cerro</b> [[(la roverella e il cerro sono due tipi di quercia)]].</li>
        <li style="--c:#d6ead3"><b>Costa</b> un tempo c'era la <b>macchia mediterranea</b> (arbusti sempreverdi); oggi spesso le <b>coltivazioni</b> ne hanno preso il posto.</li>
      </ol>
      <p><b>Parchi:</b> il <b>Parco Nazionale delle Cinque Terre</b>, con i cinque borghi di <b>Riomaggiore, Manarola, Corniglia, Vernazza e Monterosso al Mare</b>, e il <b>Parco Regionale del Beigua</b>, sulle alture tra Genova e Savona, tutelano i paesaggi di queste parti della regione. Le Cinque Terre, con il loro ambiente unico, sono <b>Patrimonio Mondiale dell'Umanità UNESCO</b>, insieme a <b>Portovenere</b>. Lungo la loro costa rocciosa ci sono <b>scogliere</b> con <b>sentieri a strapiombo</b> sul mare.</p>`
  },
  {
    titolo: "⚠️ Ambiente a rischio e turismo sostenibile",
    html: `<p>La Liguria è una regione <b>a rischio</b> a causa dei <b>fiumi</b>: quando piove molto, <b>straripano</b> facilmente e provocano <b>frane</b> e <b>alluvioni</b>.</p>
      <ul>
      <li>Nelle poche aree pianeggianti sono stati costruiti <b>moltissimi edifici</b></li>
      <li>Sono stati tagliati tanti <b>boschi</b>: così il terreno è diventato più fragile</li>
      <li>Anche il <b>troppo turismo</b> ha danneggiato l'ambiente e i suoi equilibri naturali</li>
      </ul>
      <p><b>Turismo sostenibile</b> = un modo di viaggiare che rispetta l'<b>ambiente</b> e le <b>persone che ci vivono</b> [[(per esempio: usare il treno, non lasciare rifiuti, restare sui sentieri, visitare anche fuori stagione)]].</p>`
  },
  {
    titolo: "👥 Popolazione",
    html: `<ul>
      <li>Gli abitanti sono <b>1.507.438</b>, <b>278 per km²</b> [[(molti più del Piemonte, che ne ha 168: in Liguria si vive vicini, perché lo spazio piano è poco)]]</li>
      <li>Il terreno è soprattutto <b>montuoso</b>, quindi i centri abitati sorgono lungo il <b>litorale</b> (la costa), nell'<b>entroterra</b> (la parte lontana dal mare) o lungo <b>alcune valli</b></li>
      <li>A <b>Genova</b>, il capoluogo, e nella sua città metropolitana vive <b>oltre la metà</b> degli abitanti: la gente si concentra lungo la <b>costa</b>, dove la densità è alta, soprattutto nelle città principali</li>
      <li><b>Lingue:</b> l'<b>italiano</b> e alcuni <b>dialetti</b> locali</li>
      <li><b>Storia:</b> i <b>Liguri</b> erano le antiche popolazioni che, molto prima dei Romani, si stanziarono in questa regione. [[Nel Medioevo Genova fu una potente repubblica marinara, con navi e commerci in tutto il Mediterraneo.]]</li>
    </ul>`
  },
  {
    titolo: "💼 Economia",
    html: `<p>Il <b>turismo</b> è una delle principali risorse della regione: le tante <b>località balneari</b>, il <b>clima mite</b> e la <b>bellezza del paesaggio</b> (come il Parco naturale di <b>Portofino</b> e le <b>Cinque Terre</b>) attirano turisti <b>in ogni stagione</b>.</p>
      <p><b>Occupati per settore</b></p>
      <div class="segbar-wrap" role="img" aria-label="Occupati per settore: primario 2,2 per cento, secondario 19,6 per cento, terziario 78,2 per cento">
        <div class="segbar">
          <span style="--w:2.2;--c:var(--s1)" title="Primario: 2,2%"></span>
          <span style="--w:19.6;--c:var(--s2)" title="Secondario: 19,6%"><b>19,6%</b></span>
          <span style="--w:78.2;--c:var(--s3)" title="Terziario: 78,2%"><b>78,2%</b></span>
        </div>
        <ul class="seglegend">
          <li><i style="--c:var(--s1)"></i>Primario <small>agricoltura, allevamento, pesca</small><b>2,2%</b></li>
          <li><i style="--c:var(--s2)"></i>Secondario <small>industria</small><b>19,6%</b></li>
          <li><i style="--c:var(--s3)"></i>Terziario <small>turismo, commercio, porti, servizi</small><b>78,2%</b></li>
        </ul>
        <p class="nota-libro">«Che meraviglia!»: primario 4%, secondario 23%, terziario 73%.</p>
      </div>
      <ul>
      <li><b>Terziario:</b> è <b>di gran lunga</b> il settore più sviluppato. Oltre al turismo spiccano le attività <b>commerciali</b>, <b>assicurative</b>, <b>bancarie</b> e <b>portuali</b>. Il porto principale è quello di <b>Genova</b>, ma anche i porti di <b>Savona</b> e <b>La Spezia</b> sono molto attivi. La Liguria è uno <b>sbocco naturale sul Mar Mediterraneo</b>: le città portuali sono fondamentali e il <b>commercio marittimo</b> (le merci che viaggiano per nave) è molto sviluppato. Nei porti arrivano anche moltissimi visitatori. Il turismo più importante è quello <b>balneare</b>, in località come <b>Portofino</b>, <b>Camogli</b> e le <b>Cinque Terre</b>.</li>
      <li><b>Secondario:</b> intorno ai porti ci sono <b>industrie navali e cantieri</b> (dove si costruiscono le navi) e impianti <b>petrolchimici</b>, <b>siderurgici</b> (acciaio) e <b>meccanici</b>; in passato erano molto più grandi. Negli ultimi decenni queste attività hanno avuto un <b>forte calo</b>, mentre è cresciuto il settore <b>alimentare</b>.</li>
      <li><b>Primario:</b> il terreno montuoso e la <b>scarsità d'acqua</b> non aiutano l'<b>agricoltura</b>, che si fa nelle piccole pianure costiere e soprattutto in <b>collina</b>, dove lo spazio per coltivare si ricava con il <b>terrazzamento</b>. Si coltivano <b>ulivi, viti, frutta e ortaggi</b> e, nelle <b>serre</b>, il <b>basilico</b>. Nella <b>Riviera di Ponente</b> è diffusa la <b>floricoltura</b>, cioè la coltivazione di <b>fiori e piante ornamentali</b>, in serra. Famoso il <b>carciofo spinoso di Albenga</b>. L'<b>allevamento</b> è poco sviluppato e la <b>pesca</b> non rende molto, perché il Mar Ligure è <b>poco pescoso</b>.</li>
    </ul>`
  },
  {
    titolo: "🚗 Comunicazioni",
    html: `<p>Sulle carte dei libri si vedono:</p>
      <ul>
      <li><b>Porti:</b> <b>Genova</b> (il principale), <b>Savona</b> e <b>La Spezia</b>; vicino a Genova c'è anche l'<b>aeroporto</b></li>
      <li><b>Autostrade lungo la costa:</b> l'<b>A10</b> nella Riviera di Ponente, verso la <b>Francia</b>, e l'<b>A12</b> nella Riviera di Levante, verso la <b>Toscana</b></li>
      <li><b>Autostrade verso nord:</b> l'<b>A6</b> (da Savona), l'<b>A26</b> e l'<b>A7</b> (da Genova) verso il Piemonte e la Lombardia; l'<b>A15</b> da La Spezia verso l'Emilia-Romagna</li>
      <li><b>Valichi</b> per attraversare le montagne: Colle di Nava, Colle di Cadibona, Passo del Turchino, Passo dei Giovi; sulla carta di «Che meraviglia!» anche il Passo della Scoffera (674 m) e il Passo del Bracco (615 m)</li>
      <li>[[Strade e ferrovie lungo la costa passano in tante gallerie, perché le montagne arrivano fino al mare]]</li>
    </ul>`
  },
  {
    titolo: "🐬 Genova, cultura e curiosità",
    html: `<ul>
      <li><b>L'acquario di Genova</b> è l'<b>acquario più grande d'Europa</b>. Ha una settantina di ambienti dove vivono circa <b>12.000 animali</b> di <b>600 specie</b> di tutto il mondo: squali, pinguini, foche, delfini e molti altri mammiferi marini. Nel padiglione dei cetacei, da un <b>tunnel</b> di 15 metri con una parete di vetro lunga 24 metri, si guardano i <b>delfini</b> come se si fosse sott'acqua. Ci sono anche una <b>foresta tropicale</b> e una <b>scogliera corallina</b> ricostruite.</li>
      <li><b>La focaccia di Recco:</b> secondo la leggenda la inventarono i contadini che si erano rifugiati nell'entroterra per sfuggire ai <b>pirati saraceni</b>. Si fa con <b>farina, acqua, sale, olio e un formaggio morbido</b>.</li>
      <li><b>Il carciofo spinoso di Albenga</b>, noto per il colore e la tenerezza delle sue foglie.</li>
      <li><b>Portovenere</b>, paesino a picco sul mare sul <b>Golfo di La Spezia</b>, detto «<b>Golfo dei Poeti</b>» perché ha attirato tanti poeti e artisti. Il nome viene da un antico tempio della dea <b>Venere</b>, nata secondo la leggenda dalla spuma del mare. Davanti ci sono le isole <b>Palmaria</b>, <b>Tino</b> e <b>Tinetto</b>. Con le Cinque Terre è Patrimonio dell'<b>UNESCO</b>.</li>
      <li>[[Con il basilico ligure si fa il <b>pesto alla genovese</b>]]</li>
      <li>[[A Genova è nato <b>Cristoforo Colombo</b>, che nel 1492 arrivò in America]]</li>
      <li>[[Il simbolo di Genova è la <b>Lanterna</b>, il faro del porto, alto 77 metri]]</li>
    </ul>`
  }
];

/* Domande per esercitarsi, come negli esercizi del libro ("Uso la carta", "Comprendo il testo", vero/falso).
   sez = sezione della scheda: a ogni partita c'è almeno una domanda per sezione.
   tipo "scelta": opzioni + indice della risposta giusta (si parte da 0); tipo "vf": vero = true/false. */
window.SEZIONI_DOMANDE = ["identita", "territorio", "coste", "acque", "clima", "popolazione", "economia", "comunicazioni", "cultura"];
window.DOMANDE = [
  { sez: "identita", tipo: "scelta", d: "Qual è il capoluogo della Liguria?", opzioni: ["Savona", "Genova", "La Spezia"], giusta: 1, spiega: "Il capoluogo è Genova (560.688 abitanti)." },
  { sez: "identita", tipo: "scelta", d: "Quanti abitanti ha la Liguria?", opzioni: ["circa 150.000", "circa un milione e mezzo", "circa 15 milioni"], giusta: 1, spiega: "Ha 1.507.438 abitanti (in «Che meraviglia!» 1.507.636)." },
  { sez: "identita", tipo: "scelta", d: "Quanto è grande la Liguria?", opzioni: ["5.416 km²", "25.386 km²", "54.160 km²"], giusta: 0, spiega: "La superficie è di 5.416 km² (25.386 km² è il Piemonte)." },
  { sez: "identita", tipo: "scelta", d: "Qual è la densità di popolazione della Liguria?", opzioni: ["38 abitanti per km²", "168 abitanti per km²", "278 abitanti per km²"], giusta: 2, spiega: "278 abitanti per km² (38 è la Valle d'Aosta, 168 il Piemonte)." },
  { sez: "identita", tipo: "scelta", d: "Quale di queste NON è una città principale della Liguria?", opzioni: ["Imperia", "Torino", "La Spezia"], giusta: 1, spiega: "Torino è in Piemonte. Le città principali della Liguria sono Genova, Imperia, La Spezia e Savona." },
  { sez: "identita", tipo: "scelta", d: "Chi erano i Liguri?", opzioni: ["antiche popolazioni che vivevano qui molto prima dei Romani", "i soldati di Napoleone", "i pirati saraceni"], giusta: 0, spiega: "Erano le antiche popolazioni che, molto prima dei Romani, si stanziarono in questa regione." },
  { sez: "identita", tipo: "vf", d: "La Liguria ha il mare.", vero: true, spiega: "Vero: si affaccia sul Mar Ligure." },
  { sez: "identita", tipo: "vf", extra: true, d: "La Liguria è una delle regioni più piccole d'Italia.", vero: true, spiega: "Vero: sono più piccole solo la Valle d'Aosta e il Molise." },

  { sez: "territorio", tipo: "scelta", d: "Con quale regione confina a est la Liguria?", opzioni: ["con il Piemonte", "con la Toscana", "con la Lombardia"], giusta: 1, spiega: "A est confina con la Toscana. (È una domanda «Uso la carta» del libro.)" },
  { sez: "territorio", tipo: "scelta", d: "Con quale Stato confina la Liguria?", opzioni: ["con la Francia", "con la Svizzera", "con l'Austria"], giusta: 0, spiega: "Con la Francia, a ovest." },
  { sez: "territorio", tipo: "scelta", d: "Con quali regioni confina la Liguria?", opzioni: ["Piemonte, Emilia-Romagna e Toscana", "Lombardia e Veneto", "Lazio e Umbria"], giusta: 0, spiega: "Con il Piemonte e l'Emilia-Romagna (a nord) e con la Toscana (a est)." },
  { sez: "territorio", tipo: "vf", d: "La Liguria confina con la Lombardia.", vero: false, spiega: "Falso: la Lombardia è vicina, ma in mezzo ci sono il Piemonte e l'Emilia-Romagna." },
  { sez: "territorio", tipo: "scelta", d: "Qual è la principale caratteristica del territorio della Liguria?", opzioni: ["è quasi tutto montagne e colline, che arrivano fino al mare", "è quasi tutto pianura", "è un'isola"], giusta: 0, spiega: "Montagna 65% e collina 35%: ci sono solo poche e piccole pianure." },
  { sez: "territorio", tipo: "scelta", d: "Quale tipo di territorio occupa la parte più grande della Liguria?", opzioni: ["la montagna", "la collina", "la pianura"], giusta: 0, spiega: "La montagna: 65%. Il resto (35%) è collina." },
  { sez: "territorio", tipo: "vf", d: "In Liguria ci sono grandi pianure.", vero: false, spiega: "Falso: ci sono solo poche e piccole pianure." },
  { sez: "territorio", tipo: "scelta", d: "Quali montagne ci sono a ovest, al confine con la Francia?", opzioni: ["le Alpi Marittime", "le Alpi Pennine", "le Dolomiti"], giusta: 0, spiega: "Le Alpi Marittime, con il Monte Saccarello (2.200 m)." },
  { sez: "territorio", tipo: "scelta", d: "Da dove parte l'Appennino Ligure?", opzioni: ["dal Colle di Cadibona", "dal Monte Bianco", "dal Golfo di La Spezia"], giusta: 0, spiega: "Dal Colle di Cadibona, vicino a Savona." },
  { sez: "territorio", tipo: "scelta", d: "Che forma ha la Liguria?", opzioni: ["uno stretto arco affacciato sul mare", "un grande quadrato", "un triangolo in mezzo al mare"], giusta: 0, spiega: "Si estende su uno stretto arco montuoso affacciato sul Mar Ligure." },
  { sez: "territorio", tipo: "scelta", d: "Qual è la cima più alta sulla carta del libro?", opzioni: ["il Monte Saccarello", "il Monte Maggiorasca", "il Monte Settepani"], giusta: 0, spiega: "Il Monte Saccarello, 2.200 m, nelle Alpi Marittime." },

  { sez: "coste", tipo: "scelta", d: "Su quale mare si affaccia la Liguria?", opzioni: ["sul Mar Ligure", "sul mare Adriatico", "sul Mar Ionio"], giusta: 0, spiega: "Sul Mar Ligure. (È una domanda «Uso la carta» del libro.)" },
  { sez: "coste", tipo: "scelta", d: "Dove si trova la Riviera di Levante rispetto a Genova?", opzioni: ["a est", "a ovest", "a nord"], giusta: 0, spiega: "A est. La Riviera di Ponente è a ovest. (È una domanda «Uso la carta» del libro.)" },
  { sez: "coste", tipo: "scelta", d: "Dove si trova la Riviera di Ponente rispetto a Genova?", opzioni: ["a est", "a ovest", "a sud"], giusta: 1, spiega: "A ovest del Golfo di Genova." },
  { sez: "coste", tipo: "scelta", d: "Com'è la costa nella Riviera di Levante?", opzioni: ["alta e rocciosa: gli Appennini arrivano a picco sul mare", "bassa e piena di spiagge", "piena di lagune"], giusta: 0, spiega: "Alta e rocciosa, come a Manarola, nelle Cinque Terre." },
  { sez: "coste", tipo: "scelta", d: "Com'è la costa nella Riviera di Ponente?", opzioni: ["i rilievi scendono più dolcemente e ci sono spiagge di sabbia o di ciottoli", "ci sono solo scogliere altissime", "ci sono i ghiacciai"], giusta: 0, spiega: "I rilievi scendono più dolcemente verso il mare e ci sono anche spiagge, come a Varazze." },
  { sez: "coste", tipo: "scelta", d: "Quale golfo divide le due Riviere?", opzioni: ["il Golfo di Genova", "il Golfo di Napoli", "il Golfo di Trieste"], giusta: 0, spiega: "Il Golfo di Genova: a ovest c'è la Riviera di Ponente, a est quella di Levante." },
  { sez: "coste", tipo: "vf", d: "La costa ligure è ricca di golfi, insenature e promontori.", vero: true, spiega: "Vero." },
  { sez: "coste", tipo: "scelta", d: "Che cos'è un promontorio?", opzioni: ["un pezzo di terra che sporge nel mare", "un tratto di mare che entra nella terra", "un fiume che sfocia nel mare"], giusta: 0, spiega: "È una terra che sporge nel mare, come Capo Mele o Portofino. Il golfo invece è il mare che entra nella terra." },
  { sez: "coste", tipo: "vf", d: "Manarola è un paese a picco sul mare nella Riviera di Ponente.", vero: false, spiega: "Falso: Manarola, nelle Cinque Terre, è nella Riviera di Levante." },

  { sez: "acque", tipo: "scelta", d: "Come sono i fiumi che sfociano nel Mar Ligure?", opzioni: ["brevi e a carattere torrentizio", "lunghi e regolari", "larghi e navigabili"], giusta: 0, spiega: "Sono brevi e a carattere torrentizio." },
  { sez: "acque", tipo: "scelta", d: "Che cosa vuol dire «a carattere torrentizio»?", opzioni: ["che hanno tanta acqua quando piove e poca d'estate", "che sono sempre ghiacciati", "che sono lunghissimi"], giusta: 0, spiega: "Sono come torrenti: si riempiono con le piogge e d'estate restano quasi secchi." },
  { sez: "acque", tipo: "scelta", d: "Dove vanno i fiumi più lunghi e regolari della Liguria?", opzioni: ["verso nord, nel Po", "verso sud, nel Mar Ligure", "in un grande lago"], giusta: 0, spiega: "Vanno verso nord e finiscono, direttamente o indirettamente, nel Po." },
  { sez: "acque", tipo: "scelta", d: "Quali fiumi della Liguria finiscono nel Po?", opzioni: ["Tanaro, Bormida, Scrivia e Trebbia", "Arno e Tevere", "Adige e Piave"], giusta: 0, spiega: "Il Tanaro, la Bormida, lo Scrivia e il Trebbia." },
  { sez: "acque", tipo: "vf", d: "Il Tanaro sfocia nel Mar Ligure.", vero: false, spiega: "Falso: il Tanaro va verso nord e finisce nel Po." },
  { sez: "acque", tipo: "vf", d: "Dai rilievi della Liguria nascono numerosi fiumi.", vero: true, spiega: "Vero: alcuni vanno al mare, altri verso il Po." },
  { sez: "acque", tipo: "vf", d: "In Liguria c'è un grande lago.", vero: false, spiega: "Falso: il libro non parla di laghi. In Liguria ci sono il mare e tanti fiumi." },

  { sez: "clima", tipo: "scelta", d: "Com'è il clima della Liguria?", opzioni: ["mite tutto l'anno", "freddo e nebbioso", "sempre nevoso"], giusta: 0, spiega: "Mite tutto l'anno, grazie all'influenza del mare." },
  { sez: "clima", tipo: "scelta", d: "Da quali elementi fisici è influenzato il clima?", opzioni: ["dal mare e dalle montagne", "dai ghiacciai e dai laghi", "dai vulcani"], giusta: 0, spiega: "Dal mare e dalle montagne, che proteggono la regione dai venti del nord." },
  { sez: "clima", tipo: "scelta", d: "Perché in Liguria gli inverni sono miti?", opzioni: ["perché le montagne la proteggono dai venti freddi del nord e c'è il mare", "perché è vicina all'equatore", "perché non piove mai"], giusta: 0, spiega: "Le montagne fermano i venti freddi del nord e il mare tiene il clima mite." },
  { sez: "clima", tipo: "scelta", d: "Come sono le estati in Liguria?", opzioni: ["calde e ventilate", "fredde e nevose", "nebbiose"], giusta: 0, spiega: "Calde e ventilate." },
  { sez: "clima", tipo: "scelta", d: "Qual è la vegetazione sui rilievi?", opzioni: ["boschi di castagni, roverella e cerro", "risaie", "palme e cactus"], giusta: 0, spiega: "La Liguria è ricca di foreste di latifoglie: castagni, roverella e cerro." },
  { sez: "clima", tipo: "scelta", d: "Qual è la vegetazione sul mare?", opzioni: ["la macchia mediterranea, che oggi spesso ha lasciato il posto alle coltivazioni", "i ghiacciai", "i boschi di abeti"], giusta: 0, spiega: "Un tempo sulla costa c'era la macchia mediterranea; oggi spesso al suo posto ci sono le coltivazioni." },
  { sez: "clima", tipo: "scelta", d: "Che cosa sono le latifoglie?", opzioni: ["alberi con foglie larghe, come il castagno", "alberi con gli aghi, come il pino", "piante che vivono nel mare"], giusta: 0, spiega: "Sono alberi con foglie larghe e piatte, come il castagno e le querce." },
  { sez: "clima", tipo: "scelta", d: "Quali borghi fanno parte delle Cinque Terre?", opzioni: ["Riomaggiore, Manarola, Corniglia, Vernazza e Monterosso al Mare", "Genova, Savona, Imperia, La Spezia e Sanremo", "Recco, Rapallo, Chiavari, Sestri Levante e Portofino"], giusta: 0, spiega: "Riomaggiore, Manarola, Corniglia, Vernazza e Monterosso al Mare." },
  { sez: "clima", tipo: "vf", d: "Le Cinque Terre sono Patrimonio Mondiale dell'Umanità UNESCO.", vero: true, spiega: "Vero, per il loro ambiente unico." },
  { sez: "clima", tipo: "scelta", d: "Dove si trova il Parco Regionale del Beigua?", opzioni: ["sulle alture tra Genova e Savona", "vicino al confine con la Francia", "nelle Cinque Terre"], giusta: 0, spiega: "Sulle alture tra la città metropolitana di Genova e la provincia di Savona." },

  { sez: "popolazione", tipo: "scelta", d: "Dove sorgono i centri abitati della Liguria?", opzioni: ["lungo il litorale, nell'entroterra o lungo alcune valli", "solo in alta montagna", "in una grande pianura"], giusta: 0, spiega: "Lungo il litorale (la costa), nell'entroterra o lungo alcune valli." },
  { sez: "popolazione", tipo: "scelta", d: "Perché le città sono soprattutto sulla costa e nelle valli?", opzioni: ["perché il terreno è soprattutto montuoso", "perché in montagna è vietato costruire", "perché ci sono i vulcani"], giusta: 0, spiega: "Il terreno è prevalentemente montuoso: si costruisce dove c'è un po' di spazio." },
  { sez: "popolazione", tipo: "scelta", d: "Quanti liguri vivono a Genova e nella sua città metropolitana?", opzioni: ["oltre la metà", "pochissimi", "nessuno"], giusta: 0, spiega: "Oltre la metà degli abitanti della regione." },
  { sez: "popolazione", tipo: "scelta", d: "Che cosa vuol dire «entroterra»?", opzioni: ["la parte di terra lontana dal mare", "la spiaggia", "il fondo del mare"], giusta: 0, spiega: "È la zona all'interno, lontana dalla costa." },
  { sez: "popolazione", tipo: "vf", d: "Il litorale è la zona lungo il mare.", vero: true, spiega: "Vero: il litorale è la costa." },
  { sez: "popolazione", tipo: "vf", d: "In Liguria ci sono più abitanti per km² che in Piemonte.", vero: true, spiega: "Vero: 278 contro 168." },

  { sez: "economia", tipo: "scelta", d: "Qual è il settore più sviluppato?", opzioni: ["il primario", "il secondario", "il terziario"], giusta: 2, spiega: "Il terziario, di gran lunga: 78,2% degli occupati (in «Che meraviglia!» 73%)." },
  { sez: "economia", tipo: "scelta", d: "Quali sono le principali attività del terziario?", opzioni: ["turismo e attività commerciali, assicurative, bancarie e portuali", "agricoltura e pesca", "miniere"], giusta: 0, spiega: "Il turismo e le attività commerciali, assicurative, bancarie e portuali." },
  { sez: "economia", tipo: "scelta", d: "Perché i turisti vengono in Liguria in ogni stagione?", opzioni: ["per le località balneari, il clima mite e la bellezza del paesaggio", "per sciare sui ghiacciai", "per vedere i vulcani"], giusta: 0, spiega: "Località balneari, clima mite e paesaggi come Portofino e le Cinque Terre." },
  { sez: "economia", tipo: "scelta", d: "Quale tecnica usano gli agricoltori per ricavare il terreno per le coltivazioni?", opzioni: ["il terrazzamento", "la bonifica delle paludi", "le risaie"], giusta: 0, spiega: "Il terrazzamento: strisce di terra piana sui pendii, come gradini." },
  { sez: "economia", tipo: "scelta", d: "Che cosa si coltiva in collina?", opzioni: ["ulivi, viti, frutta e ortaggi", "riso e mais", "cotone e caffè"], giusta: 0, spiega: "Ulivi, viti, frutta e ortaggi." },
  { sez: "economia", tipo: "scelta", d: "Che cosa si coltiva nelle serre?", opzioni: ["il basilico", "il riso", "le castagne"], giusta: 0, spiega: "Il basilico." },
  { sez: "economia", tipo: "scelta", d: "Che cosa si coltiva nella Riviera di Ponente?", opzioni: ["fiori e piante ornamentali", "riso", "tabacco"], giusta: 0, spiega: "Fiori e piante ornamentali." },
  { sez: "economia", tipo: "scelta", d: "Qual è il porto principale della Liguria?", opzioni: ["Genova", "Savona", "La Spezia"], giusta: 0, spiega: "Genova. Anche Savona e La Spezia hanno porti molto attivi." },
  { sez: "economia", tipo: "vf", d: "Negli ultimi decenni i cantieri navali e le industrie sono molto cresciuti.", vero: false, spiega: "Falso: hanno avuto un forte calo; è cresciuto invece il settore alimentare." },
  { sez: "economia", tipo: "vf", d: "In Liguria l'allevamento è molto sviluppato.", vero: false, spiega: "Falso: l'allevamento è poco sviluppato." },
  { sez: "economia", tipo: "vf", d: "La pesca in Liguria rende molto.", vero: false, spiega: "Falso: la pesca non è molto redditizia." },
  { sez: "economia", tipo: "scelta", d: "Per che cosa è noto il carciofo spinoso di Albenga?", opzioni: ["per il colore e la tenerezza delle foglie", "perché è blu", "perché è grande come un pallone"], giusta: 0, spiega: "Per il colore e la tenerezza delle sue foglie." },

  { sez: "comunicazioni", tipo: "scelta", d: "Quale autostrada va lungo la Riviera di Ponente, verso la Francia?", opzioni: ["l'A10", "l'A1", "l'A22"], giusta: 0, spiega: "L'A10 (si vede sulla carta del libro)." },
  { sez: "comunicazioni", tipo: "scelta", d: "Quale autostrada va lungo la Riviera di Levante, verso la Toscana?", opzioni: ["l'A12", "l'A4", "l'A14"], giusta: 0, spiega: "L'A12." },
  { sez: "comunicazioni", tipo: "scelta", d: "Quali valichi portano dalla Liguria al Piemonte?", opzioni: ["Colle di Nava, Colle di Cadibona, Passo del Turchino e Passo dei Giovi", "Frejus e Sempione", "Brennero e Tarvisio"], giusta: 0, spiega: "Colle di Nava, Colle di Cadibona, Passo del Turchino e Passo dei Giovi (Frejus e Sempione sono in Piemonte)." },
  { sez: "comunicazioni", tipo: "scelta", d: "Quale valico porta da Genova nella valle dello Scrivia?", opzioni: ["il Passo dei Giovi", "il Colle di Nava", "il Colle di Cadibona"], giusta: 0, spiega: "Il Passo dei Giovi, vicino a Busalla." },
  { sez: "comunicazioni", tipo: "vf", d: "Vicino a Genova c'è un aeroporto.", vero: true, spiega: "Vero: sulla carta del libro c'è il simbolo dell'aereo vicino a Genova." },
  { sez: "comunicazioni", tipo: "vf", d: "La Liguria non ha porti importanti.", vero: false, spiega: "Falso: Genova ha il porto principale e anche Savona e La Spezia hanno porti molto attivi." },

  { sez: "cultura", tipo: "scelta", d: "Qual è l'acquario più grande d'Europa?", opzioni: ["quello di Genova", "quello di Venezia", "quello di Parigi"], giusta: 0, spiega: "L'acquario di Genova." },
  { sez: "cultura", tipo: "scelta", d: "Quante specie di animali ci sono nell'acquario di Genova?", opzioni: ["circa 60", "circa 600", "circa 60.000"], giusta: 1, spiega: "600 specie, con circa 12.000 esemplari." },
  { sez: "cultura", tipo: "scelta", d: "Come si possono osservare i delfini nell'acquario?", opzioni: ["da un tunnel con una parete di vetro, come sott'acqua", "facendo il bagno con loro", "solo in fotografia"], giusta: 0, spiega: "Nel padiglione dei cetacei c'è un tunnel di 15 metri con una parete di vetro lunga 24 metri." },
  { sez: "cultura", tipo: "vf", d: "Nell'acquario di Genova sono state ricostruite una foresta tropicale e una scogliera corallina.", vero: true, spiega: "Vero." },
  { sez: "cultura", tipo: "scelta", d: "Secondo la leggenda, chi inventò la focaccia di Recco?", opzioni: ["contadini fuggiti nell'entroterra per sfuggire ai pirati saraceni", "i soldati romani", "un cuoco francese"], giusta: 0, spiega: "I contadini rifugiati nell'entroterra durante le incursioni dei pirati saraceni." },
  { sez: "cultura", tipo: "scelta", d: "Che cosa serve per la focaccia di Recco?", opzioni: ["farina, acqua, sale, olio e un formaggio morbido", "riso e zafferano", "pomodoro e mozzarella"], giusta: 0, spiega: "Farina, acqua, sale, olio e un formaggio morbido." },
  { sez: "identita", tipo: "scelta", d: "La Liguria è una regione a statuto…", opzioni: ["ordinario", "speciale"], giusta: 0, spiega: "Ordinario, come quasi tutte le regioni (la Valle d'Aosta invece è a statuto speciale)." },
  { sez: "popolazione", tipo: "scelta", d: "Quali lingue si parlano in Liguria?", opzioni: ["l'italiano e alcuni dialetti locali", "l'italiano e il tedesco", "solo il francese"], giusta: 0, spiega: "L'italiano e alcuni dialetti locali." },
  { sez: "popolazione", tipo: "scelta", d: "Dove si concentrano gli abitanti?", opzioni: ["lungo la costa, dove la densità è alta", "sulle montagne più alte", "nelle isole"], giusta: 0, spiega: "Lungo la costa, soprattutto nelle città principali." },
  { sez: "territorio", tipo: "scelta", d: "Dove si trovano le poche pianure della Liguria?", opzioni: ["sulla costa, vicino alla foce dei fiumi", "in cima all'Appennino", "al confine con la Francia, in montagna"], giusta: 0, spiega: "Sono piccole pianure costiere, vicino alla foce dei fiumi." },
  { sez: "coste", tipo: "vf", d: "Nella Riviera di Ponente le coste sono basse.", vero: true, spiega: "Vero: i rilievi scendono dolcemente verso il mare. Nella Riviera di Levante invece le coste sono alte e rocciose." },
  { sez: "acque", tipo: "scelta", d: "Quali sono i principali fiumi che sfociano nel Mar Ligure?", opzioni: ["il Magra, il Roia e l'Arroscia", "il Tanaro e la Bormida", "il Po e l'Adige"], giusta: 0, spiega: "Il Magra, il Roia e l'Arroscia. Il Tanaro e la Bormida invece vanno verso il Po." },
  { sez: "acque", tipo: "vf", d: "Con le piogge abbondanti i fiumi liguri possono straripare.", vero: true, spiega: "Vero: straripano facilmente e provocano frane e alluvioni." },
  { sez: "clima", tipo: "scelta", d: "Perché la Liguria è una regione a rischio?", opzioni: ["perché con le piogge forti i fiumi straripano e ci sono frane e alluvioni", "perché ci sono tanti vulcani", "perché fa troppo freddo"], giusta: 0, spiega: "I fiumi straripano facilmente; in più si è costruito tanto nelle poche pianure e si sono tagliati molti boschi." },
  { sez: "clima", tipo: "scelta", d: "Che cos'è il turismo sostenibile?", opzioni: ["un modo di viaggiare che rispetta l'ambiente e chi ci vive", "un viaggio molto lungo", "andare in vacanza solo d'estate"], giusta: 0, spiega: "È un turismo che unisce le esigenze di chi visita con il rispetto dell'ambiente e delle comunità locali." },
  { sez: "clima", tipo: "vf", d: "Tagliare i boschi rende il terreno più fragile.", vero: true, spiega: "Vero: senza alberi il terreno frana più facilmente." },
  { sez: "economia", tipo: "scelta", d: "Che cos'è la floricoltura?", opzioni: ["la coltivazione dei fiori", "l'allevamento delle api", "la pesca dei pesci"], giusta: 0, spiega: "È la coltivazione di fiori: in Liguria si fa soprattutto in serra." },
  { sez: "economia", tipo: "scelta", d: "Perché la pesca in Liguria rende poco?", opzioni: ["perché il Mar Ligure è poco pescoso", "perché è vietato pescare", "perché il mare è ghiacciato"], giusta: 0, spiega: "Il Mar Ligure ha pochi pesci." },
  { sez: "economia", tipo: "scelta", d: "Quali industrie ci sono intorno ai porti?", opzioni: ["navali e cantieristiche, petrolchimiche, siderurgiche e meccaniche", "solo industrie della lana", "nessuna"], giusta: 0, spiega: "Industrie navali e cantieri, impianti petrolchimici, siderurgici e meccanici." },
  { sez: "economia", tipo: "scelta", d: "Quali località balneari sono famose?", opzioni: ["Portofino, Camogli e le Cinque Terre", "Cortina e Sestriere", "Courmayeur e Cervinia"], giusta: 0, spiega: "Portofino, Camogli e le Cinque Terre." },
  { sez: "comunicazioni", tipo: "scelta", d: "Che cosa vuol dire che la Liguria è uno «sbocco naturale sul Mediterraneo»?", opzioni: ["che dai suoi porti le merci arrivano e partono per mare", "che ha un grande lago", "che non ha porti"], giusta: 0, spiega: "Con i suoi porti, come Genova e Savona, è fondamentale per il commercio marittimo." },
  { sez: "comunicazioni", tipo: "scelta", d: "Quale passo si trova nella Riviera di Levante, tra Sestri Levante e La Spezia?", opzioni: ["il Passo del Bracco", "il Colle di Nava", "il Passo del Turchino"], giusta: 0, spiega: "Il Passo del Bracco (615 m)." },
  { sez: "cultura", tipo: "scelta", d: "Da dove viene il nome Portovenere?", opzioni: ["da un antico tempio dedicato alla dea Venere", "da un porto di Venezia", "da un vento"], giusta: 0, spiega: "Da un tempio della dea Venere, che secondo la leggenda era nata dalla spuma del mare." },
  { sez: "cultura", tipo: "scelta", d: "Quale golfo è chiamato «Golfo dei Poeti»?", opzioni: ["il Golfo di La Spezia", "il Golfo di Genova", "il Golfo di Napoli"], giusta: 0, spiega: "Il Golfo di La Spezia: la sua bellezza ha attirato tanti poeti e artisti." },
  { sez: "cultura", tipo: "scelta", d: "Quali isole ci sono davanti a Portovenere?", opzioni: ["Palmaria, Tino e Tinetto", "Elba e Capraia", "le Isole Borromee"], giusta: 0, spiega: "La Palmaria, il Tino e il Tinetto." },
  { sez: "cultura", tipo: "vf", d: "Portovenere e le Cinque Terre sono Patrimonio dell'UNESCO.", vero: true, spiega: "Vero." },
  { sez: "cultura", tipo: "scelta", extra: true, d: "Quale famoso navigatore è nato a Genova?", opzioni: ["Cristoforo Colombo", "Marco Polo", "Amerigo Vespucci"], giusta: 0, spiega: "Cristoforo Colombo, che nel 1492 arrivò in America. (Marco Polo era di Venezia, Amerigo Vespucci di Firenze.)" },
  { sez: "cultura", tipo: "scelta", extra: true, d: "Quale salsa si prepara con il basilico ligure?", opzioni: ["il pesto alla genovese", "il ragù", "la maionese"], giusta: 0, spiega: "Il pesto alla genovese." }
];

/* Domande e risposte per ripassare (livello scuola primaria), come gli esercizi del libro.
   Nella scheda della regione la risposta si apre toccando la domanda. */
window.DOMANDE_RISPOSTE = [
  { gruppo: "🏔️ Territorio", domande: [
    { d: "Dove si trova la Liguria?",
      r: "Nel nord-ovest dell'Italia: è uno stretto arco di montagne e colline affacciato sul Mar Ligure." },
    { d: "Con chi confina?",
      r: "A ovest con la Francia, a nord con il Piemonte e l'Emilia-Romagna, a est con la Toscana. A sud c'è il Mar Ligure." },
    { d: "Qual è la principale caratteristica del territorio?",
      r: "È quasi tutto montagne (65%) e colline (35%), che arrivano fino al mare. Ci sono solo poche e piccole pianure." },
    { d: "Quali montagne ci sono?",
      r: "A ovest, al confine con la Francia, le Alpi Marittime. Dal Colle di Cadibona, vicino a Savona, parte l'Appennino Ligure." },
    { d: "Qual è la cima più alta sulla carta del libro?",
      r: "Il Monte Saccarello, 2.200 m, nelle Alpi Marittime." },
    { d: "Da chi viene il nome della regione?",
      r: "Dai Liguri, le antiche popolazioni che si stanziarono qui molto prima dei Romani." }
  ]},
  { gruppo: "🌊 Coste e Riviere", domande: [
    { d: "Com'è la costa?",
      r: "È ricca di golfi, insenature e promontori. Al centro c'è il Golfo di Genova." },
    { d: "Dove si trova la Riviera di Levante, rispetto a Genova?",
      r: "A est. La Riviera di Ponente invece è a ovest." },
    { d: "Che differenza c'è tra le due Riviere?",
      r: "Nella Riviera di Levante gli Appennini arrivano a picco sul mare e le coste sono alte e rocciose. Nella Riviera di Ponente i rilievi scendono più dolcemente, le coste sono basse e ci sono anche spiagge di sabbia o di ciottoli." },
    { d: "Che cos'è Portovenere?",
      r: "Un paesino a picco sul mare, sul Golfo di La Spezia, detto «Golfo dei Poeti». Il nome viene dal tempio della dea Venere. Davanti ci sono le isole Palmaria, Tino e Tinetto. Con le Cinque Terre è Patrimonio dell'UNESCO." }
  ]},
  { gruppo: "💧 Fiumi", domande: [
    { d: "Come sono i fiumi che vanno nel Mar Ligure?",
      r: "Brevi e a carattere torrentizio: hanno tanta acqua quando piove e poca d'estate. I principali sono il Magra, il Roia e l'Arroscia." },
    { d: "Quali fiumi vanno verso nord?",
      r: "Fiumi più lunghi e regolari, che finiscono nel Po: il Tanaro, la Bormida, lo Scrivia e il Trebbia." },
    { d: "Perché la Liguria è una regione a rischio?",
      r: "Perché con le piogge abbondanti i fiumi straripano e ci sono frane e alluvioni. Nelle poche pianure si è costruito tanto e sono stati tagliati molti boschi, così il terreno è più fragile." }
  ]},
  { gruppo: "☀️ Clima e ambienti", domande: [
    { d: "Da quali elementi fisici è influenzato il clima?",
      r: "Dal mare e dalle montagne. Il clima è mite tutto l'anno: inverni miti ed estati calde e ventilate." },
    { d: "Perché gli inverni sono miti?",
      r: "Perché le montagne proteggono la regione dai venti freddi del nord, e il mare la tiene calda." },
    { d: "Qual è la vegetazione sul mare?",
      r: "Un tempo c'era la macchia mediterranea; oggi spesso ci sono le coltivazioni al suo posto." },
    { d: "E sui rilievi?",
      r: "Boschi di latifoglie: castagni, roverella e cerro." },
    { d: "Quali sono i parchi più importanti?",
      r: "Il Parco Nazionale delle Cinque Terre (Patrimonio dell'Umanità UNESCO) e il Parco Regionale del Beigua, tra Genova e Savona." },
    { d: "Quali sono le Cinque Terre?",
      r: "Riomaggiore, Manarola, Corniglia, Vernazza e Monterosso al Mare." },
    { d: "Che cos'è il turismo sostenibile?",
      r: "Un modo di viaggiare che rispetta l'ambiente e le persone che ci vivono: in Liguria il troppo turismo ha danneggiato l'ambiente." }
  ]},
  { gruppo: "👥 Popolazione", domande: [
    { d: "Quanti abitanti ha la Liguria?",
      r: "1.507.438: circa un milione e mezzo. Sono 278 per km²." },
    { d: "Dove vive la gente?",
      r: "Il terreno è montuoso, quindi i centri abitati sono lungo il litorale, nell'entroterra o lungo alcune valli. Oltre la metà degli abitanti vive a Genova e nella sua città metropolitana." },
    { d: "Qual è il capoluogo?",
      r: "Genova, con 560.688 abitanti. Le altre città principali sono Imperia, La Spezia e Savona." },
    { d: "Quali lingue si parlano?",
      r: "L'italiano e alcuni dialetti locali. La Liguria è una regione a statuto ordinario." }
  ]},
  { gruppo: "💼 Lavoro e collegamenti", domande: [
    { d: "Qual è il settore più sviluppato?",
      r: "Il terziario, di gran lunga (78,2%): turismo e attività commerciali, assicurative, bancarie e portuali." },
    { d: "Perché il turismo è così importante?",
      r: "Per le tante località balneari, il clima mite e la bellezza del paesaggio, come Portofino e le Cinque Terre: i turisti arrivano in ogni stagione." },
    { d: "Quali sono i porti più importanti?",
      r: "Genova, il principale; anche Savona e La Spezia sono molto attivi. La Liguria è uno sbocco naturale sul Mediterraneo: nei porti si fa il commercio marittimo e arrivano tanti visitatori." },
    { d: "E l'industria?",
      r: "In passato intorno ai porti c'erano grandi cantieri navali e industrie, ma negli ultimi decenni sono molto calati. È cresciuto il settore alimentare." },
    { d: "Quale tecnica usano gli agricoltori?",
      r: "Il terrazzamento: in collina creano tante strisce di terra piana, come gradini, per coltivare ulivi, viti, frutta e ortaggi." },
    { d: "Che cosa si coltiva nelle serre e nella Riviera di Ponente?",
      r: "Nelle serre il basilico; nella Riviera di Ponente fiori e piante ornamentali (la floricoltura)." },
    { d: "Perché la pesca rende poco?",
      r: "Perché il Mar Ligure è poco pescoso." }
  ]},
  { gruppo: "🐬 Genova e curiosità", domande: [
    { d: "Che cos'ha di speciale l'acquario di Genova?",
      r: "È il più grande d'Europa: circa 12.000 animali di 600 specie, e un tunnel di vetro da cui si guardano i delfini come sott'acqua." },
    { d: "Chi inventò la focaccia di Recco?",
      r: "Secondo la leggenda i contadini rifugiati nell'entroterra per sfuggire ai pirati saraceni. Si fa con farina, acqua, sale, olio e formaggio morbido." },
    { d: "Per che cosa è famosa Albenga?",
      r: "Per il carciofo spinoso, noto per il colore e la tenerezza delle sue foglie." }
  ]}
];

/* Flashcard per ripassare (livello scuola primaria): domanda breve davanti, risposta breve dietro. */
window.FLASHCARD = [
  { gruppo: "📍 Carta d'identità", carte: [
    { f: "Qual è il capoluogo?", r: "Genova (560.688 abitanti)." },
    { f: "Quanti abitanti ha la Liguria?", r: "1.507.438: circa un milione e mezzo." },
    { f: "Quanto è grande?", r: "5.416 km²." },
    { f: "Qual è la densità di popolazione?", r: "278 abitanti per km²." },
    { f: "Quali sono le città principali?", r: "Genova, Imperia, La Spezia, Savona." },
    { f: "Chi erano i Liguri?", r: "Antiche popolazioni che vivevano qui molto prima dei Romani." }
  ]},
  { gruppo: "🏔️ Territorio", carte: [
    { f: "Con quale Stato confina?", r: "Con la Francia, a ovest." },
    { f: "Con quali regioni confina?", r: "Piemonte, Emilia-Romagna, Toscana." },
    { f: "Con quale regione confina a est?", r: "Con la Toscana." },
    { f: "Quanta montagna e quanta collina?", r: "65% montagna, 35% collina." },
    { f: "Ci sono pianure?", r: "Solo poche e piccole." },
    { f: "Quali montagne ci sono a ovest?", r: "Le Alpi Marittime." },
    { f: "Da dove parte l'Appennino Ligure?", r: "Dal Colle di Cadibona." },
    { f: "Qual è la cima più alta sulla carta?", r: "Il Monte Saccarello, 2.200 m." }
  ]},
  { gruppo: "🌊 Coste e Riviere", carte: [
    { f: "Su quale mare si affaccia?", r: "Sul Mar Ligure." },
    { f: "Quale golfo c'è al centro?", r: "Il Golfo di Genova." },
    { f: "Dov'è la Riviera di Levante?", r: "A est di Genova." },
    { f: "Dov'è la Riviera di Ponente?", r: "A ovest di Genova." },
    { f: "Com'è la costa di Levante?", r: "Alta e rocciosa: montagne a picco sul mare." },
    { f: "Com'è la costa di Ponente?", r: "Più dolce, con spiagge di sabbia o ciottoli." },
    { f: "Che cos'è un promontorio?", r: "Terra che sporge nel mare." },
    { f: "Qual è il «Golfo dei Poeti»?", r: "Il Golfo di La Spezia." },
    { f: "Da dove viene il nome Portovenere?", r: "Da un tempio della dea Venere." },
    { f: "Isole davanti a Portovenere?", r: "Palmaria, Tino e Tinetto." }
  ]},
  { gruppo: "💧 Fiumi", carte: [
    { f: "Come sono i fiumi verso il mare?", r: "Brevi e a carattere torrentizio." },
    { f: "Dove vanno i fiumi più lunghi?", r: "Verso nord, nel Po." },
    { f: "Quali fiumi vanno nel Po?", r: "Tanaro, Bormida, Scrivia e Trebbia." },
    { f: "Principali fiumi verso il mare?", r: "Magra, Roia e Arroscia." },
    { f: "Che cosa succede con le piogge forti?", r: "I fiumi straripano: frane e alluvioni." }
  ]},
  { gruppo: "☀️ Clima e ambienti", carte: [
    { f: "Com'è il clima?", r: "Mite tutto l'anno." },
    { f: "Che cosa influenza il clima?", r: "Il mare e le montagne." },
    { f: "Come sono inverni ed estati?", r: "Inverni miti, estati calde e ventilate." },
    { f: "Quali alberi ci sono sui monti?", r: "Castagni, roverella e cerro." },
    { f: "Che vegetazione c'era sulla costa?", r: "La macchia mediterranea." },
    { f: "Quali sono le Cinque Terre?", r: "Riomaggiore, Manarola, Corniglia, Vernazza, Monterosso al Mare." },
    { f: "Dov'è il Parco del Beigua?", r: "Sulle alture tra Genova e Savona." },
    { f: "Che cos'è il turismo sostenibile?", r: "Un turismo che rispetta l'ambiente e chi ci vive." }
  ]},
  { gruppo: "👥 Popolazione", carte: [
    { f: "Dove sorgono i paesi e le città?", r: "Lungo il litorale, nell'entroterra o lungo alcune valli." },
    { f: "Perché non in montagna?", r: "Perché il terreno è soprattutto montuoso e ripido." },
    { f: "Quanti vivono a Genova e dintorni?", r: "Oltre la metà dei liguri." }
  ]},
  { gruppo: "💼 Lavoro e collegamenti", carte: [
    { f: "Qual è il settore più sviluppato?", r: "Il terziario: 78,2%." },
    { f: "Qual è il porto principale?", r: "Genova (poi Savona e La Spezia)." },
    { f: "Che tecnica si usa in collina?", r: "Il terrazzamento." },
    { f: "Che cosa si coltiva in collina?", r: "Ulivi, viti, frutta e ortaggi." },
    { f: "Che cosa si coltiva in serra?", r: "Il basilico." },
    { f: "Che cosa si coltiva nella Riviera di Ponente?", r: "Fiori e piante ornamentali." },
    { f: "Che cosa c'era intorno ai porti?", r: "Grandi cantieri navali e industrie." },
    { f: "Che cos'è la floricoltura?", r: "La coltivazione dei fiori." },
    { f: "Perché la pesca rende poco?", r: "Il Mar Ligure è poco pescoso." },
    { f: "Località balneari famose?", r: "Portofino, Camogli, Cinque Terre." }
  ]},
  { gruppo: "🐬 Genova e curiosità", carte: [
    { f: "Qual è l'acquario più grande d'Europa?", r: "L'acquario di Genova." },
    { f: "Quante specie ci sono nell'acquario?", r: "600 (circa 12.000 animali)." },
    { f: "Ingredienti della focaccia di Recco?", r: "Farina, acqua, sale, olio e formaggio morbido." },
    { f: "Per che cosa è famosa Albenga?", r: "Per il carciofo spinoso." }
  ]}
];

/* ---------------- Interrogazione ----------------
   Discorso da dire all'interrogazione (circa 3–4 minuti). Le parole tra **asterischi**
   sono le parole chiave: nel sito si possono nascondere per ripassarle a memoria. */
window.DISCORSO = [
  { titolo: "Dove si trova", testo: "Oggi vi parlo della Liguria. Si trova nel **nord-ovest dell'Italia** ed è uno **stretto arco** di montagne e colline affacciato sul **Mar Ligure**. Confina a ovest con la **Francia**, a nord con il **Piemonte** e l'**Emilia-Romagna** e a est con la **Toscana**. Il capoluogo è **Genova**. Il nome viene dai **Liguri**, antiche popolazioni che vivevano qui **molto prima dei Romani**. È una regione a **statuto ordinario** e si parlano l'**italiano** e alcuni **dialetti**." },
  { titolo: "I numeri", testo: "La Liguria è grande **5.416 km²** e ha circa **un milione e mezzo di abitanti**, cioè **278 per km²**. Le città principali sono **Genova**, **Imperia**, **La Spezia** e **Savona**." },
  { titolo: "Il territorio", testo: "Il territorio è per il **65% montagna** e per il **35% collina**: montagne e colline arrivano **fino al mare** e ci sono solo **poche e piccole pianure**. A ovest, al confine con la Francia, ci sono le **Alpi Marittime**, con il **Monte Saccarello**. Dal **Colle di Cadibona**, vicino a Savona, parte l'**Appennino Ligure**." },
  { titolo: "La costa", testo: "La costa è ricca di **golfi**, **insenature** e **promontori**. Al centro c'è il **Golfo di Genova**, che la divide in due: a **ovest** la **Riviera di Ponente**, dove i rilievi scendono **dolcemente** e ci sono **spiagge** di sabbia o di ciottoli; a **est** la **Riviera di Levante**, dove gli Appennini arrivano **a picco sul mare** e le coste sono **alte e rocciose**." },
  { titolo: "I fiumi", testo: "Dai rilievi nascono **numerosi fiumi**. Quelli che sfociano nel Mar Ligure sono **brevi** e a **carattere torrentizio**, come il **Magra**, il **Roia** e l'**Arroscia**: con le piogge forti straripano facilmente e provocano **frane** e **alluvioni**. Verso **nord** invece vanno fiumi **più lunghi e regolari**, che finiscono nel **Po**: il **Tanaro**, la **Bormida**, lo **Scrivia** e il **Trebbia**." },
  { titolo: "Clima e ambienti", testo: "Il clima è **mite tutto l'anno** grazie al **mare**, e le **montagne** proteggono la regione dai **venti del nord**: gli inverni sono **miti** e le estati **calde e ventilate**. Le montagne sono coperte di **boschi** di **castagni**, **roverella** e **cerro**; sulla costa un tempo c'era la **macchia mediterranea**, oggi spesso sostituita dalle coltivazioni. Ci sono il **Parco Nazionale delle Cinque Terre**, che è **Patrimonio dell'Umanità UNESCO**, e il **Parco del Beigua**." },
  { titolo: "La popolazione", testo: "Siccome il terreno è **montuoso**, i paesi e le città sorgono lungo il **litorale**, nell'**entroterra** o lungo **alcune valli**. **Oltre la metà** degli abitanti vive a **Genova** e nei comuni intorno." },
  { titolo: "L'economia", testo: "Il settore più sviluppato è di gran lunga il **terziario**, con il **78%** degli occupati. Il **turismo** è una delle risorse principali, grazie alle **località balneari**, al **clima mite** e a paesaggi come **Portofino** e le **Cinque Terre**. Sono importanti anche i **porti**: il principale è quello di **Genova**, poi **Savona** e **La Spezia**. La Liguria è uno **sbocco sul Mediterraneo** e il **commercio marittimo** è molto sviluppato. Intorno ai porti ci sono **cantieri navali** e industrie petrolchimiche, siderurgiche e meccaniche, ma in passato erano molto più grandi. L'**agricoltura** si fa in collina con i **terrazzamenti**: si coltivano **ulivi**, **viti**, frutta e ortaggi, il **basilico** nelle serre e i **fiori** nella Riviera di Ponente: è la **floricoltura**. La pesca rende poco, perché il Mar Ligure è **poco pescoso**." },
  { titolo: "Le curiosità", testo: "A Genova c'è l'**acquario più grande d'Europa**, con **600 specie** di animali e un tunnel di vetro da cui si vedono i **delfini**. Sul Golfo di La Spezia, detto «**Golfo dei Poeti**», c'è **Portovenere**, che con le Cinque Terre è Patrimonio **UNESCO**. Sono famosi anche la **focaccia di Recco**, inventata secondo la leggenda dai contadini in fuga dai **pirati saraceni**, e il **carciofo spinoso di Albenga**." },
  { titolo: "Per concludere", testo: "La Liguria è una regione **stretta tra le montagne e il mare**, con un **clima mite**, coste bellissime e tanti **turisti** in ogni stagione. Però è anche **fragile**: per proteggerla serve un **turismo sostenibile**." }
];

/* Flusso di domande dell'interrogazione: si parte dal generale, si va alla cartina, poi nei dettagli.
   seguito = domanda che l'insegnante fa subito dopo la precedente;
   tipo: "trabocchetto" o "ragionamento" (domande che chiedono il perché);
   mappa: che cosa mostrare sulla cartina quando si vede la risposta. */
window.FLUSSO = [
  { fase: "1️⃣ Si parte", domande: [
    { d: "Parlami della Liguria.", r: "Comincia dal discorso: dove si trova, la forma ad arco sul mare, i confini e il capoluogo, Genova.", mappa: { tipo: "regione" } }
  ]},
  { fase: "2️⃣ Alla cartina", domande: [
    { d: "Indicami la Liguria sulla carta.", r: "È nel nord-ovest dell'Italia: uno stretto arco affacciato sul Mar Ligure.", mappa: { tipo: "regione" } },
    { seguito: true, d: "Con chi confina?", r: "A ovest con la Francia, a nord con il Piemonte e l'Emilia-Romagna, a est con la Toscana.", mappa: { tipo: "regione" } },
    { seguito: true, tipo: "trabocchetto", d: "Confina anche con la Lombardia, vero?", r: "No! La Lombardia è vicina, ma in mezzo ci sono il Piemonte e l'Emilia-Romagna." },
    { seguito: true, d: "Su quale mare si affaccia?", r: "Sul Mar Ligure.", mappa: { tipo: "regione" } },
    { d: "Indicami le montagne.", r: "Sono quasi dappertutto: le Alpi Marittime a ovest e l'Appennino Ligure dal Colle di Cadibona verso est.", mappa: { tipo: "zona", id: "montagna" } },
    { seguito: true, d: "E la collina?", r: "Scende fino al mare, lungo quasi tutta la costa.", mappa: { tipo: "zona", id: "collina" } },
    { seguito: true, d: "Dove comincia l'Appennino?", r: "Dal Colle di Cadibona, vicino a Savona.", mappa: { tipo: "luogo", id: "cadibona" } },
    { d: "Indicami la Riviera di Levante.", r: "È a est di Genova.", mappa: { tipo: "zona", id: "levante" } },
    { seguito: true, tipo: "trabocchetto", d: "Quindi la Riviera di Ponente è a est anche lei?", r: "No! La Riviera di Ponente è a ovest di Genova.", mappa: { tipo: "zona", id: "ponente" } },
    { d: "Dov'è il capoluogo?", r: "Genova è al centro della costa, sul Golfo di Genova.", mappa: { tipo: "luogo", id: "genova" } }
  ]},
  { fase: "3️⃣ Il territorio e la costa", domande: [
    { d: "Com'è il territorio?", r: "65% montagna e 35% collina: montagne e colline arrivano fino al mare. Ci sono solo poche e piccole pianure." },
    { seguito: true, tipo: "trabocchetto", d: "E quanta pianura c'è?", r: "Nel grafico del libro niente: ci sono solo poche e piccole pianure." },
    { d: "Com'è la costa?", r: "Ricca di golfi, insenature e promontori." },
    { seguito: true, d: "Che differenza c'è tra le due Riviere?", r: "A Levante le montagne arrivano a picco sul mare (coste alte e rocciose); a Ponente scendono più dolcemente e ci sono spiagge.", mappa: { tipo: "luogo", id: "cinqueterre" } },
    { seguito: true, tipo: "ragionamento", d: "Perché le spiagge sono soprattutto a Ponente?", r: "Perché lì i rilievi scendono più dolcemente verso il mare e c'è un po' di spazio; a Levante le montagne cadono a picco sull'acqua." }
  ]},
  { fase: "4️⃣ I fiumi", domande: [
    { d: "Come sono i fiumi della Liguria?", r: "Ci sono due tipi: quelli verso il mare sono brevi e a carattere torrentizio; quelli verso nord sono più lunghi e regolari e vanno nel Po." },
    { seguito: true, tipo: "ragionamento", d: "Perché i fiumi verso il mare sono così brevi?", r: "Perché le montagne sono vicinissime al mare: l'acqua fa poca strada e scende ripida." },
    { seguito: true, d: "Dimmi un fiume che va nel Po.", r: "Lo Scrivia (anche il Tanaro, la Bormida e il Trebbia).", mappa: { tipo: "fiume" } },
    { seguito: true, d: "E i principali fiumi che vanno al mare?", r: "Il Magra, il Roia e l'Arroscia." },
    { tipo: "ragionamento", d: "Perché in Liguria ci sono spesso frane e alluvioni?", r: "Perché con le piogge forti i fiumi straripano; e poi nelle poche pianure si è costruito tanto e si sono tagliati molti boschi, così il terreno è più fragile." }
  ]},
  { fase: "5️⃣ Clima e ambienti", domande: [
    { d: "Com'è il clima?", r: "Mite tutto l'anno: inverni miti ed estati calde e ventilate." },
    { seguito: true, tipo: "ragionamento", d: "Perché d'inverno non fa molto freddo?", r: "Per il mare, e perché le montagne proteggono la regione dai venti freddi del nord." },
    { d: "Che vegetazione c'è?", r: "Sui monti boschi di latifoglie: castagni, roverella e cerro. Sulla costa un tempo la macchia mediterranea, oggi spesso coltivazioni." },
    { d: "Conosci un parco della Liguria?", r: "Il Parco Nazionale delle Cinque Terre, Patrimonio dell'Umanità UNESCO, e il Parco del Beigua.", mappa: { tipo: "luogo", id: "cinqueterre" } },
    { seguito: true, d: "Quali sono le Cinque Terre?", r: "Riomaggiore, Manarola, Corniglia, Vernazza e Monterosso al Mare." }
  ]},
  { fase: "6️⃣ La popolazione", domande: [
    { d: "Quanti abitanti ha la Liguria?", r: "Circa un milione e mezzo: 278 per km²." },
    { seguito: true, d: "Dove vive la gente?", r: "Lungo il litorale, nell'entroterra o lungo alcune valli; oltre la metà a Genova e dintorni.", mappa: { tipo: "luogo", id: "genova" } },
    { d: "Che lingue si parlano?", r: "L'italiano e alcuni dialetti locali. È una regione a statuto ordinario." },
    { seguito: true, tipo: "ragionamento", d: "Perché quasi nessuno vive sulle montagne?", r: "Perché il terreno è ripido: è più facile costruire e lavorare sulla costa e nelle valli." }
  ]},
  { fase: "7️⃣ L'economia", domande: [
    { d: "Qual è il settore più importante?", r: "Il terziario, con il 78,2% degli occupati: turismo, commercio, banche, assicurazioni e porti." },
    { seguito: true, tipo: "ragionamento", d: "Perché ci sono tanti turisti?", r: "Per le località balneari, il clima mite e la bellezza del paesaggio, come Portofino e le Cinque Terre.", mappa: { tipo: "luogo", id: "portofino" } },
    { d: "Quali sono i porti principali?", r: "Genova, il più importante; poi Savona e La Spezia.", mappa: { tipo: "luogo", id: "laspezia" } },
    { seguito: true, tipo: "ragionamento", d: "Perché i porti sono così importanti per la Liguria?", r: "Perché la Liguria è uno sbocco naturale sul Mediterraneo: da qui partono e arrivano le merci (commercio marittimo) e tanti visitatori." },
    { seguito: true, tipo: "trabocchetto", d: "Quindi i cantieri navali sono in crescita?", r: "No: in passato erano grandi, ma negli ultimi decenni sono molto calati. È cresciuto il settore alimentare." },
    { d: "Come si coltiva in Liguria, se è tutta montagna e collina?", r: "Con i terrazzamenti: strisce di terra piana sui pendii, come gradini. Si coltivano ulivi, viti, frutta e ortaggi.", mappa: { tipo: "luogo", id: "terrazzamenti" } },
    { seguito: true, d: "E nelle serre?", r: "Il basilico; nella Riviera di Ponente anche fiori e piante ornamentali.", mappa: { tipo: "luogo", id: "sanremo" } }
  ]},
  { fase: "8️⃣ Genova e le curiosità", domande: [
    { d: "Che cosa c'è di speciale a Genova?", r: "Il porto principale e l'acquario più grande d'Europa.", mappa: { tipo: "luogo", id: "genova" } },
    { seguito: true, d: "Che cosa si vede nell'acquario?", r: "Circa 12.000 animali di 600 specie: squali, pinguini, foche e delfini, che si guardano da un tunnel di vetro." },
    { d: "Sai dirmi un prodotto tipico?", r: "La focaccia di Recco o il carciofo spinoso di Albenga.", mappa: { tipo: "luogo", id: "recco" } },
    { d: "Che cos'è Portovenere?", r: "Un paesino a picco sul mare, sul Golfo dei Poeti; il nome viene da un tempio della dea Venere. Con le Cinque Terre è Patrimonio UNESCO.", mappa: { tipo: "luogo", id: "portovenere" } }
  ]},
  { fase: "9️⃣ Per chiudere", domande: [
    { tipo: "ragionamento", d: "Se dovessi organizzare una gita in Liguria, dove andresti?", r: "Prepara un tuo itinerario (è l'attività «Life Skills» del libro). Per esempio: 1° giorno Genova e l'acquario; 2° giorno Portofino; 3° giorno le Cinque Terre; 4° giorno la Riviera di Ponente, con le spiagge e i fiori di Sanremo." },
    { tipo: "ragionamento", d: "Che cos'è il turismo sostenibile? Che cosa potresti fare tu?", r: "È un turismo che rispetta l'ambiente e chi ci vive. Per esempio: usare il treno, non lasciare rifiuti, restare sui sentieri." },
    { tipo: "ragionamento", d: "Confronta la Liguria con il Piemonte.", r: "Il Piemonte non ha il mare ed è molto più grande, con montagne, colline e una grande pianura. La Liguria è stretta tra montagne e mare, non ha pianure grandi ma ha più abitanti per km² (278 contro 168)." }
  ]}
];

window.TRABOCCHETTI = [
  ["La Liguria confina con la Lombardia?", "No: confina con **Piemonte**, **Emilia-Romagna** e **Toscana** (e con la **Francia**)"],
  ["La Riviera di Levante è a ovest di Genova?", "No, è a **est**. A ovest c'è la Riviera di **Ponente**"],
  ["Nella Riviera di Levante ci sono soprattutto spiagge?", "No: lì le coste sono **alte e rocciose**. Le spiagge sono soprattutto a **Ponente**"],
  ["La Liguria ha una grande pianura?", "No: solo **poche e piccole** pianure (65% montagna, 35% collina)"],
  ["I fiumi che vanno al mare sono lunghi?", "No, sono **brevi** e a **carattere torrentizio**. Quelli lunghi vanno verso il **Po**"],
  ["Il settore più importante è l'industria?", "No, è il **terziario** (78,2%)"],
  ["L'Appennino Ligure comincia al confine con la Francia?", "No: lì ci sono le **Alpi Marittime**. L'Appennino parte dal **Colle di Cadibona**"],
  ["Il «Golfo dei Poeti» è il Golfo di Genova?", "No, è il **Golfo di La Spezia**"],
  ["Con tanto mare, la pesca rende molto?", "No: il Mar Ligure è **poco pescoso**"]
];

window.CONSIGLI = [
  "Rispondi con **frasi complete**: «Il capoluogo è Genova», non solo «Genova».",
  "Per il territorio usa i **due numeri**: **65% montagna, 35% collina**. E ricorda: niente pianure grandi!",
  "Per non confondere le Riviere: **Ponente = ovest** (dove il sole si «pone», tramonta), **Levante = est** (dove il sole si «leva», sorge).",
  "Se non ricordi un numero preciso, va bene dire **«circa»** (per esempio «circa un milione e mezzo di abitanti»).",
  "Alla cartina **indica con il dito** mentre parli: Alpi Marittime a ovest, Appennino da Cadibona verso est, Genova al centro.",
  "Le domande di **ragionamento** (💭) chiedono il **perché**: per esempio «perché i fiumi verso il mare sono brevi?»."
];

/* Visita guidata: tappe animate sulla cartina.
   vista: dove va la cartina ("larga", "regione", oppure gli id dei luoghi da inquadrare);
   carta: "fisica" o "politica"; luci: luoghi che pulsano; zone: id delle zone di regione.js;
   fiume: "disegna" (il fiume si disegna) o "luce"; bordo / confini: effetti speciali. */
window.TOUR = [
  { titolo: "Ecco la Liguria", carta: "fisica", vista: "larga", bordo: true,
    testo: "Siamo nel nord-ovest dell'Italia. La linea rossa è il confine della Liguria: è uno stretto arco di montagne e colline affacciato sul Mar Ligure. Il suo nome viene dai Liguri, un popolo antico che viveva qui molto prima dei Romani." },
  { titolo: "I confini", carta: "politica", vista: "larga", confini: true,
    testo: "La Liguria confina a ovest con la Francia, a nord con il Piemonte e l'Emilia-Romagna, a est con la Toscana. A sud c'è il Mar Ligure." },
  { titolo: "Montagna e collina", carta: "fisica", vista: "regione", zone: ["montagna", "collina"],
    testo: "Montagne e colline occupano quasi tutto il territorio e arrivano fino al mare: la montagna è il 65 per cento, la collina il 35 per cento. Ci sono solo poche e piccole pianure. Guarda i colori: marrone per la montagna, giallo per la collina." },
  { titolo: "Alpi Marittime e Appennino Ligure", carta: "fisica", vista: "regione", luci: ["saccarello", "cadibona", "maggiorasca"],
    testo: "A ovest, al confine con la Francia, ci sono le Alpi Marittime, con il Monte Saccarello, alto 2.200 metri. Dal Colle di Cadibona, vicino a Savona, parte l'Appennino Ligure, con il Monte Maggiorasca." },
  { titolo: "Il Golfo di Genova e le due Riviere", carta: "fisica", vista: "regione", zone: ["ponente", "levante"], luci: ["genova"],
    testo: "La costa è ricca di golfi, insenature e promontori. Al centro c'è il Golfo di Genova, che la divide in due: a ovest la Riviera di Ponente, a est la Riviera di Levante." },
  { titolo: "La Riviera di Ponente", carta: "fisica", vista: ["varazze", "capomele", "sanremo"], zone: ["ponente"], luci: ["varazze", "capomele"],
    testo: "Nella Riviera di Ponente i rilievi scendono più dolcemente verso il mare e sulla costa ci sono anche spiagge di sabbia o di ciottoli, come a Varazze. Capo Mele è un promontorio: un pezzo di terra che sporge nel mare." },
  { titolo: "La Riviera di Levante", carta: "fisica", vista: ["portofino", "sestrilevante", "cinqueterre"], zone: ["levante"], luci: ["portofino", "cinqueterre"],
    testo: "Nella Riviera di Levante gli Appennini arrivano a picco sul mare e le coste sono alte e rocciose, come a Portofino e nelle Cinque Terre." },
  { titolo: "I fiumi", carta: "fisica", vista: "regione", fiume: "disegna",
    testo: "Dai rilievi nascono tanti fiumi. Quelli che finiscono nel Mar Ligure sono brevi e a carattere torrentizio, come il Magra, il Roia e l'Arroscia: quando piove molto possono straripare e provocare frane e alluvioni. Verso nord vanno fiumi più lunghi e regolari, che finiscono nel Po: il Tanaro, la Bormida, lo Scrivia e il Trebbia. Questo è lo Scrivia." },
  { titolo: "Il clima", carta: "fisica", vista: "larga",
    testo: "Il clima è mite tutto l'anno grazie al mare. Le montagne fanno da muro e proteggono la Liguria dai venti freddi del nord: per questo gli inverni sono miti e le estati calde e ventilate." },
  { titolo: "Boschi e macchia mediterranea", carta: "fisica", vista: ["dolceacqua", "ceppo"], luci: ["dolceacqua"],
    testo: "La Liguria è ricca di boschi: sulle montagne crescono castagni, roverelle e cerri. Sulla costa un tempo c'era la macchia mediterranea, ma spesso le coltivazioni ne hanno preso il posto." },
  { titolo: "I parchi e Portovenere", carta: "fisica", vista: ["cinqueterre", "beigua"], luci: ["cinqueterre", "beigua", "portovenere"],
    testo: "Il Parco Nazionale delle Cinque Terre protegge cinque borghi sul mare: Riomaggiore, Manarola, Corniglia, Vernazza e Monterosso al Mare. Insieme a Portovenere, sul Golfo dei Poeti, sono Patrimonio dell'Umanità UNESCO. Il Parco del Beigua è sulle alture tra Genova e Savona." },
  { titolo: "Genova, il capoluogo", carta: "fisica", vista: ["genova"], zoom: 11, luci: ["genova"],
    testo: "Genova è il capoluogo e ha il porto più importante della Liguria. Qui c'è l'acquario più grande d'Europa, con squali, pinguini, foche e delfini." },
  { titolo: "Dove vive la gente", carta: "politica", vista: "regione", luci: ["genova", "savona", "imperia", "laspezia"],
    testo: "La Liguria ha circa un milione e mezzo di abitanti. Il terreno è montuoso, perciò i paesi e le città sono lungo la costa, nell'entroterra o lungo alcune valli. Oltre la metà degli abitanti vive a Genova e dintorni." },
  { titolo: "Il lavoro", carta: "fisica", vista: "regione", luci: ["genova", "savona", "laspezia", "portofino"],
    testo: "Il settore più importante è il terziario: il turismo e il commercio per mare, perché la Liguria è uno sbocco sul Mediterraneo. I porti di Genova, Savona e La Spezia sono molto attivi, e intorno ci sono cantieri navali e industrie. I turisti sono tantissimi: per questo serve un turismo sostenibile, che rispetti l'ambiente." },
  { titolo: "I prodotti", carta: "fisica", vista: "regione", luci: ["terrazzamenti", "sanremo", "albenga", "recco"],
    testo: "In collina si coltiva con i terrazzamenti: ulivi, viti, frutta e ortaggi. Nelle serre cresce il basilico e nella Riviera di Ponente si coltivano i fiori: è la floricoltura. Sono famosi il carciofo spinoso di Albenga e la focaccia di Recco." },
  { titolo: "Fine della visita! 🎉", carta: "fisica", vista: "regione", fine: true,
    testo: "Hai visto le parti principali della Liguria. Ora prova a esercitarti: con il quiz, le flashcard o l'interrogazione!" }
];
