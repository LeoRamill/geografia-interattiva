/*
 * Testi e dati della regione Valle d'Aosta: categorie, luoghi, scheda, domande, flashcard,
 * interrogazione e visita guidata. Le impostazioni (confini, fiume, zone…) sono in regione.js.
 *
 * Regole (vedi CLAUDE.md): livello quinta elementare / prima media; i riferimenti sono due libri di testo,
 * «Geografia» vol. 5 (pp. 30–33) e «Che meraviglia!» Geografia 5 (pp. 32–34). I numeri sono quelli di «Geografia»;
 * se «Che meraviglia!» dice un numero diverso, c'è una nota.
 * Quello che non è in nessuno dei due libri va tra [[ ]] (frasi) o con extra: true (luoghi e domande).
 * Per aggiungere un luogo basta copiare un oggetto dell'elenco LUOGHI e cambiare nome, coordinate e testi.
 */

/* Categorie in ordine di importanza per lo studio (così appaiono nella legenda).
   spenta: true = all'apertura i pallini non si vedono (si accendono dalla legenda). */
window.CATEGORIE = {
  montagne: { nome: "Montagne e ghiacciai",   icona: "⛰️", colore: "#64748b" },
  citta:    { nome: "Città e paesi",          icona: "🏘️", colore: "#2563eb" },
  natura:   { nome: "Parchi, laghi e fiumi",  icona: "🦌", colore: "#15803d" },
  passi:    { nome: "Passi e trafori",        icona: "🚗", colore: "#c2410c" },
  sapori:   { nome: "Prodotti tipici",        icona: "🧀", colore: "#a16207" },
  castelli: { nome: "Castelli e monumenti",   icona: "🏰", colore: "#b91c1c" },
  turismo:  { nome: "Sci e terme",            icona: "⛷️", colore: "#0891b2", spenta: true }
};

window.LUOGHI = [
  /* ---------------- CITTÀ E PAESI ---------------- */
  {
    id: "aosta", nome: "Aosta", cat: "citta", lat: 45.7372, lng: 7.3206,
    sottotitolo: "Capoluogo di regione · 33.186 abitanti, circa un quarto della popolazione",
    testo: "Aosta è l'unica vera città della regione e ne è il capoluogo. Fu fondata dai Romani nel 25 a.C. con il nome di Augusta Praetoria [[Salassorum]], in onore dell'imperatore Augusto, dopo la sconfitta dei Salassi. La città conserva ancora oggi la forma dell'antico accampamento romano, con le strade che si incrociano ad angolo retto, e la cinta di mura è quasi tutta intatta. [[Per i suoi tanti monumenti romani è chiamata la \"Roma delle Alpi\".]]",
    punti: [
      "Aosta romana: le mura (quasi intatte), le strade ad angolo retto, la Porta Pretoria (l'ingresso della città), il teatro, l'anfiteatro, il foro [[(con il criptoportico)]] e le terme",
      "Fuori dalle mura: l'Arco d'Augusto e il ponte romano sul torrente Buthier, sulla strada per la Gallia",
      "[[Area megalitica di Saint-Martin-de-Corléans: resti di oltre 5.000 anni fa]]",
      "[[Qui nacque sant'Anselmo d'Aosta (1033), filosofo e arcivescovo di Canterbury]]",
      "[[Fiera di Sant'Orso (30–31 gennaio): artigianato del legno, si svolge da oltre 1000 anni]]",
      "[[Arena della Croix-Noire: finale della Bataille des Reines, la sfida tra mucche \"regine\"]]",
      "[[Industria: l'acciaieria Cogne Acciai Speciali]]",
      "Vicino alla città c'è l'aeroporto (si vede sulle carte dei libri)"
    ],
    ricorda: "Aosta = Augusta Praetoria, fondata dai Romani nel 25 a.C.; il nome della regione viene da qui."
  },
  {
    id: "cogne", nome: "Cogne", cat: "citta", lat: 45.6086, lng: 7.3561,
    sottotitolo: "Porta del Parco Nazionale del Gran Paradiso",
    testo: "Cogne si trova in una valle laterale a sud di Aosta, ai piedi del Gran Paradiso. [[In passato era famosa per le miniere di ferro, che rifornivano l'acciaieria di Aosta e furono chiuse nel 1979.]] Oggi vive di turismo ed è uno dei punti di accesso principali al Parco Nazionale del Gran Paradiso.",
    punti: [
      "[[Antiche miniere di ferro (chiuse nel 1979)]]",
      "[[Merletti di Cogne: pizzi lavorati a mano dalle donne del paese]]",
      "[[A Valnontey c'è il giardino botanico alpino Paradisia]]",
      "[[Grandi prati di Sant'Orso e cascate di Lillaz]]"
    ],
    ricorda: "Miniere di ferro, merletti e porta del Gran Paradiso."
  },
  {
    id: "lys", nome: "Valle del Lys (Gressoney)", cat: "citta", lat: 45.8317, lng: 7.8239,
    sottotitolo: "La valle dei Walser",
    testo: "Una parte dei valdostani parla il walser, una lingua che deriva dal tedesco. [[Nella valle del Lys, ai piedi del Monte Rosa, vivono i Walser: discendenti di popolazioni di lingua tedesca arrivate nel Medioevo dal Vallese, in Svizzera. Ancora oggi a Gressoney e a Issime si parlano antiche lingue di origine tedesca (il titsch e il töitschu) e si vedono le tipiche case in legno e pietra.]]",
    punti: [
      "Paesi principali: Gressoney-La-Trinité, Gressoney-Saint-Jean, Issime",
      "Lingua walser, che deriva dal tedesco",
      "[[Fa parte del comprensorio sciistico Monterosa Ski]]",
      "Il torrente Lys è un affluente della Dora Baltea"
    ],
    ricorda: "In Valle d'Aosta si parlano italiano, francese, patois e walser."
  },
  {
    id: "pontstmartin", nome: "Pont-Saint-Martin", cat: "citta", lat: 45.5958, lng: 7.7956,
    sottotitolo: "La porta d'ingresso della regione",
    testo: "Pont-Saint-Martin è l'ultimo paese prima del Piemonte: qui la Dora Baltea esce dalla regione. [[Il paese prende il nome dal suo ponte romano a una sola arcata, costruito nel I secolo a.C. e ancora in piedi dopo più di 2.000 anni.]]",
    punti: [
      "[[Ponte romano del I secolo a.C.]]",
      "[[Era attraversato dalla strada romana delle Gallie]]",
      "[[Famoso Carnevale storico, con la leggenda del ponte e del diavolo]]"
    ],
    ricorda: "Ponte romano e confine con il Piemonte."
  },

  /* ---------------- MONTAGNE ---------------- */
  {
    id: "montebianco", nome: "Monte Bianco", cat: "montagne", lat: 45.8326, lng: 6.8652,
    sottotitolo: "4.807 m · la vetta più alta delle Alpi",
    testo: "Il Monte Bianco è la montagna più alta delle Alpi e dell'Europa occidentale. Si trova sul confine tra Italia e Francia, sopra Courmayeur. Il massiccio è coperto da grandi ghiacciai, come quello del Miage e quello della Brenva, che oggi si stanno ritirando a causa del riscaldamento climatico.",
    punti: [
      "Altezza: 4.807 metri (la misura cambia un po' a ogni rilevazione, perché la cima è di ghiaccio e neve: nel 2021 erano 4.805,6 m)",
      "Confine tra Italia (Courmayeur) e Francia (Chamonix)",
      "[[La funivia Skyway Monte Bianco sale fino a Punta Helbronner (3.466 m)]]",
      "Ogni anno è la meta di moltissimi alpinisti",
      "Sotto la montagna passa il Traforo del Monte Bianco"
    ],
    ricorda: "È la montagna più alta d'Europa occidentale."
  },
  {
    id: "cervino", nome: "Cervino", cat: "montagne", lat: 45.9763, lng: 7.6586,
    sottotitolo: "4.478 m · la montagna a forma di piramide",
    testo: "Il Cervino è famoso in tutto il mondo per la sua forma a piramide. Si trova sul confine con la Svizzera, sopra Breuil-Cervinia, in fondo alla Valtournenche. [[Dall'altra parte, in Svizzera, si trova il paese di Zermatt.]]",
    punti: [
      "Altezza: 4.478 metri: è la terza montagna d'Italia, dopo Monte Bianco e Monte Rosa",
      "Confine tra Italia e Svizzera",
      "[[Fu scalato per la prima volta nel 1865]]",
      "[[In francese si chiama Mont Cervin, in tedesco Matterhorn]]"
    ],
    ricorda: "Forma a piramide, al confine con la Svizzera."
  },
  {
    id: "monterosa", nome: "Monte Rosa", cat: "montagne", lat: 45.9180, lng: 7.8600,
    sottotitolo: "4.637 m (Punta Dufour) · un grande massiccio",
    testo: "Il Monte Rosa non è una sola cima ma un grande massiccio con molte vette sopra i 4.000 metri. La più alta, la Punta Dufour (4.637 m), si trova sul versante svizzero. Ai suoi piedi si aprono le valli di Ayas e del Lys (Gressoney).",
    punti: [
      "Cima più alta: Punta Dufour, 4.637 m (la misura ufficiale svizzera è 4.634 m)",
      "[[Sulla Punta Gnifetti (4.554 m) c'è la Capanna Margherita, il rifugio più alto d'Europa]]",
      "[[Ghiacciaio del Lys]]",
      "[[Il nome viene dalla parola \"roise\", che nel dialetto locale indica il ghiacciaio]]"
    ],
    ricorda: "Massiccio con molte cime sopra i 4.000 m."
  },
  {
    id: "granparadiso", nome: "Gran Paradiso", cat: "montagne", lat: 45.5178, lng: 7.2667,
    sottotitolo: "4.061 m · l'unico \"4000\" tutto in Italia",
    testo: "[[Il Gran Paradiso è l'unica montagna sopra i 4.000 metri che si trova interamente in territorio italiano.]] Dà il nome al primo parco nazionale d'Italia, che si estende tra la Valle d'Aosta e il Piemonte.",
    punti: [
      "Altezza: 4.061 metri",
      "[[Unico \"4000\" interamente italiano]]",
      "[[Si sale dalla Valsavarenche o dalla Valle di Cogne]]"
    ],
    ricorda: "L'unico 4000 tutto italiano."
  },
  {
    id: "miage", extra: true, nome: "Ghiacciaio del Miage", cat: "montagne", lat: 45.7900, lng: 6.8850,
    sottotitolo: "Uno dei grandi ghiacciai del Monte Bianco",
    testo: "Il ghiacciaio del Miage scende dal Monte Bianco nella Val Veny, vicino a Courmayeur. È ricoperto di detriti e sassi, per questo sembra grigio. Come tutti i ghiacciai delle Alpi si sta ritirando a causa del riscaldamento climatico.",
    punti: [
      "Si trova in Val Veny, sopra Courmayeur",
      "È uno dei più grandi ghiacciai \"neri\" (coperti di detriti) delle Alpi",
      "Ai suoi piedi c'è il piccolo lago del Miage"
    ],
    ricorda: "I ghiacciai si stanno ritirando per il riscaldamento globale."
  },

  {
    id: "dolent", nome: "Mont Dolent", cat: "montagne", lat: 45.9225, lng: 7.0461,
    sottotitolo: "3.820 m · dove si incontrano tre Stati",
    testo: "Il Mont Dolent si trova in fondo alla Val Ferret, a nord-est del Monte Bianco. [[Sulla sua cima si incontrano i confini di tre Stati: Italia, Francia e Svizzera. Stando lassù si può mettere un piede in ciascuno dei tre Paesi!]]",
    punti: [
      "Altezza: 3.820 metri",
      "[[Sulla cima si incontrano Italia, Francia e Svizzera]]",
      "[[Si trova in fondo alla Val Ferret, vicino a Courmayeur]]"
    ],
    ricorda: "Mont Dolent = punto d'incontro di Italia, Francia e Svizzera."
  },

  /* ---------------- CASTELLI E MONUMENTI ---------------- */
  {
    id: "fenis", extra: true, nome: "Castello di Fénis", cat: "castelli", lat: 45.7364, lng: 7.4925,
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
    id: "verres-issogne", extra: true, nome: "Castelli di Verrès e Issogne", cat: "castelli", lat: 45.6614, lng: 7.6921,
    sottotitolo: "Due castelli degli Challant, uno di fronte all'altro",
    testo: "Verrès e Issogne si trovano uno di fronte all'altro, sulle due rive della Dora Baltea, e appartenevano entrambi alla famiglia Challant. Il castello di Verrès, costruito nel Trecento su una roccia, è una fortezza massiccia a forma di cubo, fatta per difendere la valle. Il castello di Issogne, invece, non è una fortezza ma un'elegante residenza signorile, trasformata alla fine del Quattrocento, con un cortile famoso per la fontana del melograno in ferro battuto.",
    punti: [
      "Verrès: fortezza a forma di cubo (XIV secolo), sede del Carnevale storico",
      "Issogne: residenza rinascimentale con la fontana del melograno",
      "Il portico di Issogne è affrescato con scene di vita quotidiana (botteghe, mercato)",
      "Entrambi appartenevano alla famiglia Challant"
    ],
    ricorda: "Verrès = fortezza a cubo · Issogne = fontana del melograno."
  },
  {
    id: "bard", extra: true, nome: "Forte di Bard", cat: "castelli", lat: 45.6086, lng: 7.7442,
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
    id: "sarre", extra: true, nome: "Castello di Sarre", cat: "castelli", lat: 45.7194, lng: 7.2556,
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
    id: "castelsavoia", extra: true, nome: "Castel Savoia", cat: "castelli", lat: 45.7630, lng: 7.8240,
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
    testo: "Il Parco Nazionale del Gran Paradiso è il primo parco nazionale d'Italia. Gli stambecchi venivano cacciati in gran numero e rischiavano di scomparire: per proteggerli, nel 1856 il re Vittorio Emanuele II dichiarò queste montagne riserva reale di caccia. Nel 1920 la riserva fu donata allo Stato italiano, che nel 1922 la trasformò in un parco. Il parco si estende tra la Valle d'Aosta [[(valli di Cogne, Valsavarenche e Rhêmes)]] e il Piemonte. Ci sono percorsi che permettono ai turisti di ammirare l'ambiente alpino e i suoi animali.",
    punti: [
      "1856 riserva reale di caccia → 1920 donata allo Stato → 1922 Parco: il primo d'Italia",
      "Simbolo: lo stambecco",
      "Animali: stambecchi, camosci, marmotte, ermellini, volpi e uccelli rapaci come l'aquila, il gufo reale, la poiana e il gipeto, che è tornato a fare il nido qui negli ultimi anni [[(e anche i lupi)]]",
      "Piante: nel fondovalle boschi di abeti rossi, abeti bianchi e larici [[(e pino cembro)]]; poi i pascoli alpini, pieni di fiori in primavera [[(stella alpina, genepì)]]; più in alto muschi e licheni e le vette rocciose coperte di ghiaccio"
    ],
    ricorda: "Primo parco nazionale (1922), simbolo lo stambecco."
  },
  {
    id: "montavic", extra: true, nome: "Parco naturale del Mont Avic", cat: "natura", lat: 45.6450, lng: 7.5850,
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
    id: "placemoulin", extra: true, nome: "Lago di Place-Moulin", cat: "natura", lat: 45.9000, lng: 7.4900,
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
    testo: "Il Traforo del Monte Bianco è una galleria lunga circa 11,6 km che passa sotto la montagna e collega Courmayeur, in Italia, a Chamonix, in Francia. [[Fu inaugurato nel 1965. Nel 1999 un grave incendio al suo interno causò 39 vittime; dopo l'incidente la galleria è stata resa molto più sicura.]]",
    punti: [
      "[[Inaugurato nel 1965]]",
      "[[Lunghezza circa 11,6 km]]",
      "Collega l'Italia (Courmayeur) alla Francia (Chamonix)",
      "Qui arriva l'autostrada A5 che parte da Torino"
    ],
    ricorda: "Monte Bianco → Francia."
  },
  {
    id: "gsb", nome: "Gran San Bernardo", cat: "passi", lat: 45.8620, lng: 7.1750,
    sottotitolo: "Passo (2.473 m) e traforo · verso la Svizzera",
    testo: "Il colle del Gran San Bernardo è un antico passaggio verso la Svizzera, usato già dai Romani. [[Qui c'è un ospizio fondato nell'XI secolo per aiutare i viaggiatori, famoso per i cani San Bernardo, usati per soccorrere le persone nella neve. Nel 1800 Napoleone attraversò il passo con il suo esercito.]] Più in basso, dal 1964, una galleria permette di passare anche d'inverno.",
    punti: [
      "Colle a 2.473 m [[(altre fonti: 2.469 m)]], confine con la Svizzera",
      "[[Ospizio e cani San Bernardo]]",
      "[[1800: lo attraversa Napoleone]]",
      "[[Traforo del Gran San Bernardo aperto nel 1964]]",
      "[[Nella valle: jambon de Bosses DOP e Carnevale della Coumba Freida]]"
    ],
    ricorda: "Gran San Bernardo → Svizzera."
  },
  {
    id: "psb", nome: "Piccolo San Bernardo", cat: "passi", lat: 45.6806, lng: 6.8836,
    sottotitolo: "Passo (2.188 m) · verso la Francia",
    testo: "Il colle del Piccolo San Bernardo collega la Valle d'Aosta (La Thuile) alla Francia. [[Era già percorso dai Romani con la strada delle Gallie. D'inverno è chiuso per la neve.]]",
    punti: [
      "Altezza: 2.188 metri",
      "Confine con la Francia",
      "[[Antica strada romana delle Gallie]]",
      "[[Resti di un \"cromlech\", un cerchio di pietre preistorico]]"
    ],
    ricorda: "Piccolo San Bernardo → Francia."
  },

  /* ---------------- SCI E TERME ---------------- */
  {
    id: "courmayeur", nome: "Courmayeur", cat: "turismo", lat: 45.7967, lng: 6.9722,
    sottotitolo: "Ai piedi del Monte Bianco",
    testo: "Courmayeur è una delle località turistiche più famose delle Alpi, ai piedi del Monte Bianco. D'inverno si scia, d'estate si fanno escursioni e scalate: è considerata la capitale dell'alpinismo italiano. [[Qui vicino nasce la Dora Baltea, dall'unione della Dora di Veny e della Dora di Ferret.]]",
    punti: [
      "Sci e alpinismo: dal 2019 l'alpinismo è Patrimonio dell'Umanità UNESCO",
      "[[Funivia Skyway Monte Bianco]]",
      "[[Valli laterali: Val Veny e Val Ferret]]",
      "[[Durante il fascismo fu rinominata \"Cormaiore\"]]"
    ],
    ricorda: "Capitale dell'alpinismo, ai piedi del Monte Bianco."
  },
  {
    id: "cervinia", nome: "Breuil-Cervinia", cat: "turismo", lat: 45.9336, lng: 7.6297,
    sottotitolo: "Sciare tra Italia e Svizzera",
    testo: "[[Breuil-Cervinia si trova in fondo alla Valtournenche, ai piedi del Cervino. Le sue piste sono collegate con quelle di Zermatt, in Svizzera, e si può sciare anche d'estate sul ghiacciaio. Poco sotto il paese c'è il Lago Blu, in cui si specchia il Cervino.]]",
    punti: [
      "[[Piste collegate con Zermatt (Svizzera)]]",
      "[[Sci estivo sul ghiacciaio del Plateau Rosa]]",
      "[[Lago Blu, piccolo lago alpino]]"
    ],
    ricorda: "Ai piedi del Cervino, piste collegate con la Svizzera."
  },
  {
    id: "lathuile", nome: "La Thuile", cat: "turismo", lat: 45.7136, lng: 6.9519,
    sottotitolo: "Sci tra Italia e Francia",
    testo: "[[La Thuile è una località sciistica le cui piste sono collegate con quelle di La Rosière, in Francia, attraverso il Piccolo San Bernardo. In passato era un paese di miniere di carbone.]]",
    punti: [
      "[[Comprensorio sciistico internazionale con la Francia]]",
      "[[Antiche miniere di carbone]]",
      "Vicino al colle del Piccolo San Bernardo"
    ],
    ricorda: "Si scia fino in Francia."
  },
  {
    id: "pila", extra: true, nome: "Pila", cat: "turismo", lat: 45.6745, lng: 7.3119,
    sottotitolo: "Le piste sopra Aosta",
    testo: "Pila è la località sciistica di Aosta: si raggiunge direttamente dalla città con una cabinovia. Dalle piste si vedono il Monte Bianco, il Cervino, il Monte Rosa e il Gran Paradiso.",
    punti: [
      "Cabinovia diretta da Aosta",
      "Vista su tutti i grandi \"4000\" della regione"
    ],
    ricorda: "La neve a due passi da Aosta."
  },
  {
    id: "monterosaski", nome: "Champoluc e gli impianti di risalita", cat: "turismo", lat: 45.8306, lng: 7.7272,
    sottotitolo: "Sci ai piedi del Monte Rosa",
    testo: "Champoluc, in Val d'Ayas, è una località sciistica ai piedi del Monte Rosa. In inverno il turismo è favorito dai numerosi impianti di risalita (funivie, seggiovie, skilift) che portano gli sciatori in alto. [[Il comprensorio Monterosa Ski collega la Val d'Ayas, la valle di Gressoney e la Valsesia, in Piemonte.]]",
    punti: [
      "Val d'Ayas, ai piedi del Monte Rosa",
      "Tanti impianti di risalita per il turismo invernale",
      "[[Collega Val d'Ayas, valle del Lys e Valsesia]]"
    ],
    ricorda: "Sci ai piedi del Monte Rosa."
  },
  {
    id: "presaintdidier", extra: true, nome: "Terme di Pré-Saint-Didier", cat: "turismo", lat: 45.7647, lng: 6.9853,
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
    testo: "[[Saint-Vincent è chiamata la \"Riviera delle Alpi\" per il suo clima mite. È famosa per le sue acque termali, scoperte nel Settecento, e per il Casinò, uno dei pochi in Italia.]]",
    punti: [
      "[[Terme, con la fonte delle acque scoperta nel 1770]]",
      "[[Casinò de la Vallée]]",
      "[[Clima più mite rispetto al resto della regione]]"
    ],
    ricorda: "Terme e casinò."
  },

  /* ---------------- PRODOTTI TIPICI ---------------- */
  {
    id: "valpelline", nome: "Valpelline – la Fontina", cat: "sapori", lat: 45.8260, lng: 7.3280,
    sottotitolo: "Fontina DOP e zuppa alla valpellinese",
    testo: "La Fontina DOP è il formaggio simbolo della Valle d'Aosta, prodotto in tutta la regione con il latte crudo delle mucche di razza valdostana. [[A Valpelline si trova un grande magazzino di stagionatura scavato nella roccia, dove riposano migliaia di forme. Con la Fontina si fanno la fonduta, la polenta concia e la zuppa alla valpellinese (pane, cavolo, Fontina e brodo).]]",
    punti: [
      "Fontina DOP: latte crudo di mucca valdostana",
      "[[D'estate le mucche salgono negli alpeggi (e scendono in autunno con la \"désarpa\")]]",
      "[[Piatti: fonduta, polenta concia, zuppa alla valpellinese]]",
      "[[Altri formaggi: Fromadzo DOP]]"
    ],
    ricorda: "Fontina = formaggio simbolo della regione."
  },
  {
    id: "arnad", extra: true, nome: "Arnad – il lardo", cat: "sapori", lat: 45.6447, lng: 7.7203,
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
    testo: "Tra Morgex e La Salle crescono vigneti che arrivano a circa 1.000–1.200 metri di altezza, tra i più alti d'Europa. [[Qui si produce il vino bianco Blanc de Morgex et de La Salle.]] Le viti crescono sul versante al sole (adret), mentre quello in ombra (envers) è coperto di boschi.",
    punti: [
      "[[Vigneti tra i più alti d'Europa]]",
      "Si chiamano \"vigneti eroici\": sono su terreni ripidi e difficili, dove tutto si fa a mano",
      "[[Vino Blanc de Morgex et de La Salle]]",
      "[[Altri vini valdostani: Enfer d'Arvier, Torrette]]"
    ],
    ricorda: "Vigneti eroici: di montagna, sul versante al sole (adret), coltivati a mano."
  }
];

/* Scheda del fiume principale (si apre cliccando il fiume sulla cartina). */
window.FIUME_INFO = {
  nome: "Dora Baltea", cat: "natura",
  sottotitolo: "Il fiume principale della regione",
  testo: "La Dora Baltea nasce vicino a Courmayeur, ai piedi del Monte Bianco, [[dall'unione della Dora di Veny e della Dora di Ferret]]. Attraversa tutta la valle centrale passando per Aosta, raccoglie l'acqua dei torrenti delle valli laterali, entra in Piemonte a Pont-Saint-Martin e si getta nel Po.",
  punti: [
    "[[Affluenti: Buthier, Grand Eyvia, Savara, Marmore, Évançon, Lys…]]",
    "È un affluente del Po [[(di sinistra)]]",
    "Le sue acque e quelle dei torrenti producono energia idroelettrica",
    "Il tracciato sulla mappa è calcolato dai dati di altitudine"
  ],
  ricorda: "Dora Baltea → sfocia nel Po."
};

/* Scritte della carta fisica (come negli atlanti di scuola).
   min = zoom da cui compaiono; r = rotazione in gradi (positivo = in senso orario).
   Le scritte dei fiumi vengono "agganciate" al fiume più vicino (vedi app.js). */
window.ETICHETTE_FISICHE = [
  // catene montuose e pianure
  { t: "ALPI PENNINE",   tipo: "catena",  lat: 46.03, lng: 7.55, r: -8,  min: 8 },
  { t: "ALPI GRAIE",     tipo: "catena",  lat: 45.43, lng: 6.98, r: -12, min: 8 },
  { t: "ALPI LEPONTINE", tipo: "catena",  lat: 46.27, lng: 8.38, r: -10, min: 8 },
  { t: "Pianura Padana", tipo: "pianura", lat: 45.24, lng: 8.38, r: -6,  min: 8 },
  { t: "Canavese",       tipo: "regione", lat: 45.40, lng: 7.78, r: 0,   min: 9 },
  // valli della Valle d'Aosta
  { t: "Valpelline",                 tipo: "valle", lat: 45.865, lng: 7.405, r: -35, min: 9.75 },
  { t: "Valtournenche",              tipo: "valle", lat: 45.845, lng: 7.612, r: -86, min: 9.75 },
  { t: "Val d'Ayas",                 tipo: "valle", lat: 45.765, lng: 7.705, r: -80, min: 9.75 },
  { t: "Valle di Gressoney",         tipo: "valle", lat: 45.715, lng: 7.818, r: -86, min: 9.75 },
  { t: "Valle del Gran San Bernardo", tipo: "valle", lat: 45.800, lng: 7.245, r: 45, min: 9.75 },
  { t: "Valgrisenche",               tipo: "valle", lat: 45.640, lng: 7.095, r: -50, min: 9.75 },
  { t: "Val di Rhêmes",              tipo: "valle", lat: 45.610, lng: 7.150, r: -70, min: 9.75 },
  { t: "Valsavarenche",              tipo: "valle", lat: 45.605, lng: 7.212, r: -86, min: 9.75 },
  { t: "Valle di Cogne",             tipo: "valle", lat: 45.655, lng: 7.300, r: 45,  min: 9.75 },
  { t: "Val Veny",                   tipo: "valle", lat: 45.772, lng: 6.915, r: -23, min: 10.5 },
  { t: "Val Ferret",                 tipo: "valle", lat: 45.850, lng: 7.025, r: -50, min: 10.5 },
  // cime (quelle principali hanno già il loro pallino)
  { t: "▲ Grandes Jorasses 4208", tipo: "cima", lat: 45.8689, lng: 6.9875, min: 9.75 },
  { t: "▲ Grand Combin 4314",     tipo: "cima", lat: 45.9375, lng: 7.2992, min: 9.75 },
  { t: "▲ Grivola 3969",          tipo: "cima", lat: 45.5958, lng: 7.2569, min: 10 },
  { t: "▲ Mont Émilius 3559",     tipo: "cima", lat: 45.6786, lng: 7.3847, min: 10 },
  // fiumi e laghi
  { t: "Dora Baltea", tipo: "fiume", lat: 45.737, lng: 7.470, min: 8,  km2: 2000 },
  { t: "Dora Baltea", tipo: "fiume", lat: 45.470, lng: 7.900, min: 9,  km2: 2000 },
  { t: "Po",          tipo: "fiume", lat: 45.165, lng: 7.960, min: 8,  km2: 5000 },
  { t: "Sesia",       tipo: "fiume", lat: 45.560, lng: 8.360, min: 8.5, km2: 500 },
  { t: "Orco",        tipo: "fiume", lat: 45.340, lng: 7.760, min: 9,  km2: 300 },
  { t: "Rodano",      tipo: "fiume", lat: 46.190, lng: 7.250, min: 8,  km2: 2000 },
  { t: "Isère",       tipo: "fiume", lat: 45.580, lng: 6.700, min: 8.5, km2: 500 },
  { t: "Arve",        tipo: "fiume", lat: 45.935, lng: 6.730, min: 9,  km2: 300 },
  { t: "Toce",        tipo: "fiume", lat: 46.050, lng: 8.320, min: 9,  km2: 500 },
  { t: "Lago Maggiore", tipo: "lago", lat: 45.950, lng: 8.640, r: -60, min: 8 },
  { t: "Lago Lemano",   tipo: "lago", lat: 46.300, lng: 6.330, r: -15, min: 8 }
];

/* Città fuori dalla Valle d'Aosta, per la carta politica
   (quelle della Valle sono i nomi dei comuni e i pallini). */
window.CITTA = [
  { nome: "Biella",      lat: 45.5665, lng: 8.0531, tipo: "provincia" },
  { nome: "Vercelli",    lat: 45.3202, lng: 8.4185, tipo: "provincia" },
  { nome: "Novara",      lat: 45.4469, lng: 8.6219, tipo: "provincia" },
  { nome: "Verbania",    lat: 45.9214, lng: 8.5519, tipo: "provincia" },
  { nome: "Ivrea",       lat: 45.4667, lng: 7.8756, tipo: "citta" },
  { nome: "Cuorgnè",     lat: 45.3906, lng: 7.6486, tipo: "citta" },
  { nome: "Varallo",     lat: 45.8167, lng: 8.2583, tipo: "citta" },
  { nome: "Domodossola", lat: 46.1167, lng: 8.2917, tipo: "citta" },
  { nome: "Chamonix",    lat: 45.9237, lng: 6.8694, tipo: "citta" },
  { nome: "Bourg-Saint-Maurice", lat: 45.6186, lng: 6.7690, tipo: "citta" },
  { nome: "Albertville", lat: 45.6758, lng: 6.3925, tipo: "citta" },
  { nome: "Annecy",      lat: 45.8992, lng: 6.1294, tipo: "provincia" },
  { nome: "Martigny",    lat: 46.1028, lng: 7.0725, tipo: "citta" },
  { nome: "Sion",        lat: 46.2331, lng: 7.3606, tipo: "provincia" },
  { nome: "Zermatt",     lat: 46.0207, lng: 7.7491, tipo: "citta" }
];

/* Etichette dei territori confinanti. */
window.CONFINANTI = [
  { nome: "FRANCIA",  lat: 45.70, lng: 6.62 },
  { nome: "SVIZZERA", lat: 46.10, lng: 7.15 },
  { nome: "PIEMONTE", lat: 45.42, lng: 7.68 }
];

/* Scheda generale mostrata quando nessun luogo è selezionato.
   Numeri come nel libro di testo (Geografia vol. 5, pp. 30–33). */
window.SCHEDA = [
  {
    titolo: "📍 Carta d'identità",
    html: `<div class="stats">
        <div class="stat"><span>Superficie</span><b>3.261 km²</b></div>
        <div class="stat"><span>Abitanti</span><b>123.337</b><small>«Che meraviglia!»: 123.513</small></div>
        <div class="stat"><span>Densità</span><b>38 ab./km²</b></div>
        <div class="stat"><span>Capoluogo</span><b>Aosta</b><small>33.186 ab.</small></div>
      </div>
      <ul>
      <li>La regione <b>più piccola</b> e <b>meno popolata</b> d'Italia</li>
      <li><b>Territorio:</b> 100% montagna</li>
      <li>[[<b>Comuni:</b> 74, nessuna provincia]]</li>
      <li><b>Regione autonoma a statuto speciale</b> [[dal 1948]]</li>
      <li>[[<b>Bandiera:</b> nera e rossa]]</li>
      <li><b>Stemma:</b> un leone d'argento su sfondo nero, con una corona sopra lo scudo</li>
      <li class="libri">📖 Libri: «Geografia» vol. 5, pp. 30–33 e «Che meraviglia!» Geografia 5, pp. 32–34. I numeri sono quelli di «Geografia»: se «Che meraviglia!» ne dà uno diverso, è scritto accanto.</li>
    </ul>`
  },
  {
    titolo: "🗺️ Confini e territorio",
    html: `<p>Si trova nella parte <b>nord-occidentale</b> dell'Italia. Confina a <b>nord</b> con la <b>Svizzera</b>, a <b>ovest</b> con la <b>Francia</b>, a <b>sud</b> e a <b>est</b> con il <b>Piemonte</b>. [[Sul <b>Mont Dolent</b> (3.820 m) si incontrano i confini di Italia, Francia e Svizzera.]]</p>
      <p>Il territorio è <b>interamente montuoso</b>: una grande valle centrale, percorsa dalla <b>Dora Baltea</b>, [[da cui si aprono a "lisca di pesce" circa venti valli laterali (Valpelline, Valtournenche, Val d'Ayas, Valle di Gressoney, Valle di Cogne, Valsavarenche, Val di Rhêmes, Valgrisenche…)]].</p>
      <p><b>Le montagne più alte d'Europa:</b> Monte Bianco (4.807 m), Monte Rosa (4.637 m), Cervino (4.478 m), Gran Paradiso (4.061 m). A nord ci sono le <b>Alpi Pennine</b>, a ovest e a sud le <b>Alpi Graie</b>.</p>
      <p><b>Ghiacciai:</b> si trovano sulle vette oltre i 3.000 m; un tempo erano perenni, oggi si riducono per i cambiamenti climatici. I ghiacciai alimentano numerosi <b>torrenti</b>, che scorrono in <b>valli glaciali</b> dalla tipica forma <b>stretta e allungata</b>.</p>
      <p><b>Acque:</b> i torrenti delle valli laterali confluiscono nella <b>Dora Baltea</b>, che nasce ai piedi del Monte Bianco e scorre nella valle glaciale più ampia, dove sorge <b>Aosta</b>. Attraversa la regione da ovest a est e poi diventa un <b>affluente del Po</b>. Tra le cime ci sono tanti piccoli laghi alpini.</p>`
  },
  {
    titolo: "👥 Popolazione",
    html: `<ul>
      <li>È la regione <b>meno popolata</b> d'Italia: 123.337 abitanti, <b>38 per km²</b></li>
      <li>La maggior parte degli abitanti vive nel <b>fondovalle</b>, lungo la valle della Dora Baltea</li>
      <li><b>Aosta</b> (33.186 ab.) ha circa <b>un quarto</b> della popolazione; gli altri vivono in <b>piccoli comuni</b></li>
      <li>[[Nel Novecento molte valli laterali si sono <b>spopolate</b>: la gente è scesa in città o in pianura per lavorare]]</li>
      <li><b>Bilinguismo:</b> le lingue ufficiali sono due, l'<b>italiano</b> e il <b>francese</b>; si parlano e si insegnano tutte e due a scuola</li>
      <li>Una parte della popolazione parla anche il <b>patois</b>, che viene dal francese [[(è un dialetto francoprovenzale)]], e il <b>walser</b>, che viene dal tedesco [[(nella valle del Lys)]]</li>
    </ul>`
  },
  {
    titolo: "❄️ Clima e ambienti",
    html: `<p>Clima <b>alpino</b>: inverni lunghi e molto freddi, con frequenti <b>nevicate</b>; estati brevi e fresche. [[Il fondovalle è secco: già nel Medioevo si costruivano i <b>rus</b>, canali per irrigare i campi.]]</p>
      <p>[[<b>Adret</b> = versante al sole (paesi, vigneti) · <b>Envers</b> = versante in ombra (boschi).]]</p>
      <p><b>Piante e animali cambiano con l'altitudine.</b> Salendo si incontrano (altezze indicative):</p>
      <ol class="fasce" reversed>
        <li style="--c:#f1f4f8"><b>oltre 3.000 m</b> nevi e ghiacciai</li>
        <li style="--c:#cfc7c0"><b>2.500–3.000 m</b> rocce, muschi e licheni</li>
        <li style="--c:#e2cf9f"><b>2.000–2.500 m</b> prati e piante erbacee (pascoli, alpeggi)</li>
        <li style="--c:#9fc08a"><b>1.000–2.000 m</b> boschi di abeti (rossi e bianchi) e larici</li>
        <li style="--c:#c8dc9c"><b>fondovalle</b> campi, vigneti, frutteti</li>
      </ol>
      <p>Sulle montagne vivono molti animali selvatici: <b>stambecchi</b>, camosci, marmotte, ermellini, volpi e uccelli rapaci come l'<b>aquila</b>, il gufo reale, la poiana e il <b>gipeto</b>, tornato a fare il nido qui negli ultimi anni.</p>
      <p><b>Parco Nazionale del Gran Paradiso</b>, il primo d'Italia; il suo simbolo è lo stambecco. Gli stambecchi rischiavano di scomparire perché venivano cacciati troppo: nel <b>1856</b> il re <b>Vittorio Emanuele II</b> fece di queste montagne una <b>riserva reale di caccia</b>, nel <b>1920</b> la riserva fu donata allo Stato e nel <b>1922</b> diventò il Parco.</p>
      <p>📜 <b>Costituzione, articolo 9:</b> la Repubblica «tutela l'ambiente, la biodiversità e gli ecosistemi, anche nell'interesse delle future generazioni». I parchi servono proprio a questo.</p>`
  },
  {
    titolo: "🏛️ Storia in breve",
    html: `<ol class="timeline">
      <li><b>Salassi</b> – un popolo gallico (celtico) che abitava la valle</li>
      <li><b>25 a.C.</b> – i Romani sconfiggono i Salassi e fondano <i>Augusta Praetoria</i>, in onore di Augusto: da qui vengono i nomi di <b>Aosta</b> e della regione. Restano le strade ad angolo retto dell'accampamento romano, la cinta di mura quasi intatta, la Porta Pretoria, il teatro, l'anfiteatro, il foro, le terme, l'Arco d'Augusto e il ponte romano sul Buthier.</li>
      <li><b>Medioevo</b> (il periodo che segue la fine dell'Impero Romano d'Occidente) – si costruiscono i <b>castelli medievali</b>, che oggi attirano tanti turisti [[; la regione passa per secoli ai <b>Savoia</b>]]</li>
      <li><b>1856</b> – il re Vittorio Emanuele II fa delle montagne del Gran Paradiso una riserva reale di caccia, che nel <b>1922</b> diventa il primo Parco nazionale d'Italia</li>
      <li><b>1948</b> – diventa regione autonoma a <b>statuto speciale</b>, bilingue</li>
    </ol>`
  },
  {
    titolo: "💼 Economia",
    html: `<p><b>Occupati per settore</b></p>
      <div class="segbar-wrap" role="img" aria-label="Occupati per settore: primario 2,8 per cento, secondario 21,3 per cento, terziario 75,9 per cento">
        <div class="segbar">
          <span style="--w:2.8;--c:var(--s1)" title="Primario: 2,8%"></span>
          <span style="--w:21.3;--c:var(--s2)" title="Secondario: 21,3%"><b>21,3%</b></span>
          <span style="--w:75.9;--c:var(--s3)" title="Terziario: 75,9%"><b>75,9%</b></span>
        </div>
        <ul class="seglegend">
          <li><i style="--c:var(--s1)"></i>Primario <small>agricoltura, allevamento</small><b>2,8%</b></li>
          <li><i style="--c:var(--s2)"></i>Secondario <small>industria, energia, artigianato</small><b>21,3%</b></li>
          <li><i style="--c:var(--s3)"></i>Terziario <small>turismo, commercio, servizi</small><b>75,9%</b></li>
        </ul>
        <p class="nota-libro">«Che meraviglia!»: primario 4%, secondario 23%, terziario 73%.</p>
      </div>
      <ul>
      <li><b>Primario:</b> l'agricoltura si pratica nel <b>fondovalle</b> e ha pochi addetti: cereali, e nelle vallate più soleggiate <b>patate</b>, <b>alberi da frutto</b> (mele) e <b>ortaggi</b>. Sui versanti di alcune montagne ci sono i <b>terrazzamenti</b>, ripiani di terreno sostenuti da muretti in pietra, dove crescono i <b>vigneti</b> (i <b>vigneti eroici</b>), che danno vini di ottima qualità. Sui <b>pascoli alpini</b> si allevano i <b>bovini</b>: il latte e i formaggi, come la <b>Fontina</b>, sono un'eccellenza della regione.</li>
      <li><b>Secondario:</b> grazie all'abbondanza d'acqua si produce molta <b>energia idroelettrica</b> [[(più di quella che la regione consuma)]]. Ci sono industrie <b>alimentari</b>, <b>tessili</b>, <b>edili</b> e di lavorazione dei <b>minerali</b> [[(acciaieria di Aosta)]]. I boschi danno il <b>legname</b>, usato per costruire e per gli <b>oggetti artigianali</b>: l'<b>artigianato del legno</b> è tipico della regione.</li>
      <li><b>Terziario:</b> il più importante, grazie al <b>turismo</b>: bellezze naturali e artistiche, <b>alpinismo</b> e <b>sport invernali</b>. In <b>estate</b> si visitano i <b>castelli medievali</b> e si sale ai <b>rifugi</b> in alta quota; in <b>inverno</b> ci sono le <b>stazioni sciistiche</b>, gli alberghi e numerosi <b>impianti di risalita</b>. Dal 2019 l'alpinismo è <b>Patrimonio dell'Umanità UNESCO</b>.</li>
    </ul>`
  },
  {
    titolo: "🚗 Comunicazioni",
    html: `<p>Nonostante le montagne, i collegamenti sono assicurati da:</p>
      <ul>
      <li><b>Autostrada A5</b> Torino – Aosta – Monte Bianco, nel fondovalle</li>
      <li><b>Valichi alpini:</b> Colle del Gran San Bernardo (2.473 m) e Colle del Piccolo San Bernardo (2.188 m)</li>
      <li><b>Traforo del Monte Bianco</b> [[(1965)]] → Francia</li>
      <li><b>Traforo del Gran San Bernardo</b> [[(1964)]] → Svizzera</li>
      <li><b>Aeroporto</b> vicino ad Aosta (si vede sulle carte dei libri)</li>
      <li>[[Ferrovia Aosta – Torino]]</li>
    </ul>`
  },
  {
    titolo: "🎉 Tradizioni e sport",
    html: `<ul>
      <li><b>Sport tradizionali</b> tipici della Valle d'Aosta:
        <ul>
          <li><b>fiolet</b>: con una mazza si colpisce un piccolo pezzo di legno a forma di uovo (il <i>fiolet</i>), appoggiato su una pietra, per lanciarlo il più lontano possibile</li>
          <li><b>palet</b>: si lanciano dei dischi di metallo cercando di avvicinarli il più possibile a un bersaglio</li>
          <li>[[e poi il <b>tsan</b> e la <b>rebatta</b>]]</li>
        </ul>
      </li>
      <li>[[<b>Fiera di Sant'Orso</b> (30–31 gennaio, Aosta): fiera dell'artigianato del legno, che si tiene da oltre 1000 anni]]</li>
      <li>[[<b>Bataille des Reines</b>: sfide tra mucche, che si spingono con le corna senza farsi male, per eleggere la "regina"]]</li>
    </ul>`
  }
];

/* Domande per esercitarsi, come negli esercizi del libro ("Osserva la carta e rispondi", vero/falso).
   sez = sezione della scheda: a ogni partita c'è almeno una domanda per sezione.
   tipo "scelta": opzioni + indice della risposta giusta (si parte da 0); tipo "vf": vero = true/false. */
window.SEZIONI_DOMANDE = ["identita", "territorio", "popolazione", "clima", "storia", "economia", "comunicazioni", "tradizioni"];
window.DOMANDE = [
  {"sez": "identita", "tipo": "scelta", "d": "Il territorio della Valle d'Aosta è…", "opzioni": ["pianeggiante", "collinare", "montuoso"], "giusta": 2, "spiega": "È interamente montuoso: 100% montagna."},
  {"sez": "identita", "tipo": "vf", "d": "La Valle d'Aosta è una regione a statuto speciale.", "vero": true, "spiega": "Vero: dal 1948 ha più autonomia delle altre regioni."},
  {"sez": "identita", "tipo": "vf", "extra": true, "d": "La Valle d'Aosta è divisa in molte province.", "vero": false, "spiega": "Falso: non ha province; ha 74 comuni."},
  {"sez": "identita", "tipo": "scelta", "d": "Qual è il capoluogo della Valle d'Aosta?", "opzioni": ["Courmayeur", "Aosta", "Torino"], "giusta": 1, "spiega": "Il capoluogo è Aosta (33.186 abitanti). Torino è il capoluogo del Piemonte."},
  {"sez": "identita", "tipo": "scelta", "d": "Rispetto alle altre regioni italiane, la Valle d'Aosta è…", "opzioni": ["la più grande", "la più piccola e la meno popolata", "la più popolata"], "giusta": 1, "spiega": "È la regione più piccola (3.261 km²) e la meno popolata d'Italia."},
  {"sez": "identita", "tipo": "scelta", "d": "Quanti abitanti ha la Valle d'Aosta?", "opzioni": ["circa 12.000", "circa 123.000", "circa 1.200.000"], "giusta": 1, "spiega": "Ha 123.337 abitanti (in «Che meraviglia!» 123.513)."},
  {"sez": "identita", "tipo": "scelta", "d": "Quanto è grande la Valle d'Aosta?", "opzioni": ["circa 326 km²", "circa 3.261 km²", "circa 32.610 km²"], "giusta": 1, "spiega": "La superficie è di 3.261 km²."},
  {"sez": "identita", "tipo": "vf", "extra": true, "d": "La bandiera della Valle d'Aosta è nera e rossa.", "vero": true, "spiega": "Vero: è divisa a metà, nera e rossa."},
  {"sez": "identita", "tipo": "vf", "d": "Nello stemma della regione c'è un leone.", "vero": true, "spiega": "Vero: un leone d'argento su sfondo nero, con una corona sopra lo scudo."},
  {"sez": "territorio", "tipo": "scelta", "d": "Con quale Paese confina la Valle d'Aosta a nord?", "opzioni": ["Francia", "Svizzera", "Austria"], "giusta": 1, "spiega": "A nord c'è la Svizzera (il Cantone Vallese)."},
  {"sez": "territorio", "tipo": "scelta", "d": "Con quale Paese confina a ovest?", "opzioni": ["Svizzera", "Slovenia", "Francia"], "giusta": 2, "spiega": "A ovest c'è la Francia: si passa con il Traforo del Monte Bianco o il Colle del Piccolo San Bernardo."},
  {"sez": "territorio", "tipo": "scelta", "d": "Con quale regione italiana confina?", "opzioni": ["Piemonte", "Lombardia", "Liguria"], "giusta": 0, "spiega": "Confina solo con il Piemonte, a sud e a est."},
  {"sez": "territorio", "tipo": "scelta", "d": "Qual è il fiume che attraversa la regione?", "opzioni": ["Adige", "Dora Baltea", "Ticino"], "giusta": 1, "spiega": "La Dora Baltea nasce ai piedi del Monte Bianco e attraversa la regione da ovest a est."},
  {"sez": "territorio", "tipo": "scelta", "d": "In quale fiume si getta la Dora Baltea?", "opzioni": ["Po", "Rodano", "Sesia"], "giusta": 0, "spiega": "La Dora Baltea esce a Pont-Saint-Martin, attraversa il Piemonte e si getta nel Po."},
  {"sez": "territorio", "tipo": "scelta", "d": "Qual è la montagna più alta della regione?", "opzioni": ["Cervino", "Monte Bianco", "Gran Paradiso"], "giusta": 1, "spiega": "Il Monte Bianco (4.807 m) è la vetta più alta delle Alpi."},
  {"sez": "territorio", "tipo": "scelta", "d": "Quanto è alto il Cervino?", "opzioni": ["4.478 m", "4.807 m", "3.820 m"], "giusta": 0, "spiega": "Il Cervino è alto 4.478 m: è la terza montagna d'Italia."},
  {"sez": "territorio", "tipo": "scelta", "extra": true, "d": "Su quale montagna si incontrano i confini di Italia, Francia e Svizzera?", "opzioni": ["Gran Paradiso", "Mont Dolent", "Monte Rosa"], "giusta": 1, "spiega": "Sul Mont Dolent (3.820 m), in fondo alla Val Ferret."},
  {"sez": "territorio", "tipo": "vf", "d": "Il Gran Paradiso è il monte più alto della regione.", "vero": false, "spiega": "Falso: il più alto è il Monte Bianco. Il Gran Paradiso (4.061 m) è l'unico \"4000\" tutto in territorio italiano."},
  {"sez": "territorio", "tipo": "vf", "d": "La regione ha molti torrenti.", "vero": true, "spiega": "Vero: scendono dalle valli laterali e confluiscono nella Dora Baltea."},
  {"sez": "territorio", "tipo": "vf", "d": "I ghiacciai stanno diminuendo a causa dei cambiamenti climatici.", "vero": true, "spiega": "Vero: un tempo erano perenni, oggi si riducono."},
  {"sez": "territorio", "tipo": "vf", "d": "Il Cervino si trova al confine con la Svizzera.", "vero": true, "spiega": "Vero: dall'altra parte c'è Zermatt."},
  {"sez": "territorio", "tipo": "scelta", "d": "Quale catena montuosa si trova a nord, al confine con la Svizzera?", "opzioni": ["Alpi Pennine", "Alpi Graie", "Appennini"], "giusta": 0, "spiega": "A nord ci sono le Alpi Pennine (Cervino, Monte Rosa); a ovest e a sud le Alpi Graie (Monte Bianco, Gran Paradiso)."},
  {"sez": "territorio", "tipo": "scelta", "d": "In quale catena montuosa si trovano il Monte Bianco e il Gran Paradiso?", "opzioni": ["Alpi Pennine", "Alpi Graie", "Dolomiti"], "giusta": 1, "spiega": "Nelle Alpi Graie, a ovest e a sud della regione."},
  {"sez": "territorio", "tipo": "scelta", "extra": true, "d": "Che cosa ha di speciale il Gran Paradiso?", "opzioni": ["è il monte più alto d'Europa", "è l'unico \"4000\" tutto in territorio italiano", "è un vulcano"], "giusta": 1, "spiega": "È alto 4.061 m ed è l'unica montagna sopra i 4.000 m che si trova interamente in Italia."},
  {"sez": "territorio", "tipo": "scelta", "d": "Dove nasce la Dora Baltea?", "opzioni": ["ai piedi del Monte Bianco", "sul Monte Rosa", "nel Lago Maggiore"], "giusta": 0, "spiega": "Nasce vicino a Courmayeur, ai piedi del Monte Bianco."},
  {"sez": "territorio", "tipo": "scelta", "d": "In che direzione la Dora Baltea attraversa la regione?", "opzioni": ["da ovest a est", "da nord a sud", "da est a ovest"], "giusta": 0, "spiega": "Da ovest (Monte Bianco) a est, poi scende verso Pont-Saint-Martin ed esce in Piemonte."},
  {"sez": "territorio", "tipo": "scelta", "d": "Quanto è alto il Monte Rosa (Punta Dufour)?", "opzioni": ["4.061 m", "4.637 m", "3.820 m"], "giusta": 1, "spiega": "La Punta Dufour è alta 4.637 m (la misura ufficiale svizzera è 4.634 m)."},
  {"sez": "popolazione", "tipo": "scelta", "d": "Quali sono le lingue ufficiali?", "opzioni": ["italiano e tedesco", "italiano e francese", "solo l'italiano"], "giusta": 1, "spiega": "È una regione bilingue: italiano e francese."},
  {"sez": "popolazione", "tipo": "scelta", "d": "Qual è la densità di popolazione?", "opzioni": ["38 abitanti per km²", "200 abitanti per km²", "3 abitanti per km²"], "giusta": 0, "spiega": "123.337 abitanti su 3.261 km²: circa 38 abitanti per km², tra le più basse d'Italia."},
  {"sez": "popolazione", "tipo": "scelta", "d": "Dove vive la maggior parte della popolazione?", "opzioni": ["in alta montagna", "nel fondovalle", "vicino ai ghiacciai"], "giusta": 1, "spiega": "Nel fondovalle, lungo la Dora Baltea; Aosta da sola ha circa un quarto degli abitanti."},
  {"sez": "popolazione", "tipo": "vf", "d": "Aosta ha circa un quarto degli abitanti della regione.", "vero": true, "spiega": "Vero: 33.186 abitanti su 123.337."},
  {"sez": "popolazione", "tipo": "vf", "extra": true, "d": "Nel Novecento molte valli laterali si sono spopolate.", "vero": true, "spiega": "Vero: molte persone sono scese in città o in pianura per lavorare."},
  {"sez": "clima", "tipo": "scelta", "d": "Quale animale è il simbolo del Parco Nazionale del Gran Paradiso?", "opzioni": ["l'orso", "lo stambecco", "il lupo"], "giusta": 1, "spiega": "Lo stambecco, che il parco ha salvato dall'estinzione."},
  {"sez": "clima", "tipo": "scelta", "d": "In che anno è nato il Parco Nazionale del Gran Paradiso?", "opzioni": ["1922", "1948", "1965"], "giusta": 0, "spiega": "Nel 1922: è il parco nazionale più antico d'Italia."},
  {"sez": "clima", "tipo": "scelta", "d": "Salendo in montagna, dopo i boschi di abeti e larici si trovano…", "opzioni": ["risaie e vigneti", "piante erbacee, poi muschi e licheni", "palme e ulivi"], "giusta": 1, "spiega": "Più in alto ci sono prati e piante erbacee, poi muschi e licheni, e infine nevi e ghiacciai."},
  {"sez": "clima", "tipo": "vf", "d": "Sulle cime più alte crescono abeti e larici.", "vero": false, "spiega": "Falso: abeti e larici crescono più in basso; sulle cime ci sono rocce, muschi, licheni e ghiacciai."},
  {"sez": "clima", "tipo": "vf", "d": "Il clima della Valle d'Aosta è mediterraneo.", "vero": false, "spiega": "Falso: è un clima alpino, con inverni lunghi e freddi e abbondanti nevicate."},
  {"sez": "storia", "tipo": "scelta", "d": "Come si chiamava Aosta al tempo dei Romani?", "opzioni": ["Augusta Taurinorum", "Augusta Praetoria", "Aquileia"], "giusta": 1, "spiega": "Augusta Praetoria, in onore dell'imperatore Augusto (Augusta Taurinorum era Torino)."},
  {"sez": "storia", "tipo": "scelta", "d": "Quale popolo abitava la regione prima dei Romani?", "opzioni": ["i Salassi", "gli Etruschi", "i Sanniti"], "giusta": 0, "spiega": "I Salassi, un popolo gallico (celtico)."},
  {"sez": "storia", "tipo": "scelta", "extra": true, "d": "In che anno la Valle d'Aosta è diventata regione a statuto speciale?", "opzioni": ["1861", "1922", "1948"], "giusta": 2, "spiega": "Nel 1948: da allora ha più autonomia delle altre regioni."},
  {"sez": "storia", "tipo": "scelta", "d": "Quale di questi è un monumento romano di Aosta?", "opzioni": ["la Porta Pretoria", "il Colosseo", "il Forte di Bard"], "giusta": 0, "spiega": "La Porta Pretoria era l'ingresso della città romana. Ad Aosta ci sono anche le mura, il teatro, l'anfiteatro e l'Arco d'Augusto."},
  {"sez": "storia", "tipo": "scelta", "extra": true, "d": "Quale famiglia ha governato la regione per secoli, a partire dal Medioevo?", "opzioni": ["i Medici", "i Savoia", "gli Asburgo"], "giusta": 1, "spiega": "I Savoia, dall'anno 1000 circa."},
  {"sez": "storia", "tipo": "vf", "d": "Il nome \"Aosta\" deriva dall'imperatore romano Augusto.", "vero": true, "spiega": "Vero: Augusta Praetoria, la città fondata in suo onore nel 25 a.C."},
  {"sez": "economia", "tipo": "scelta", "d": "Che cosa si produce grazie alla grande disponibilità di acqua?", "opzioni": ["energia idroelettrica", "petrolio", "energia eolica"], "giusta": 0, "spiega": "Dighe e torrenti producono energia idroelettrica, più di quella che la regione consuma."},
  {"sez": "economia", "tipo": "scelta", "d": "Quale settore ha più occupati?", "opzioni": ["primario", "secondario", "terziario"], "giusta": 2, "spiega": "Il terziario (75,9%; in «Che meraviglia!» 73%), soprattutto grazie al turismo."},
  {"sez": "economia", "tipo": "scelta", "d": "Come si chiama il formaggio più famoso della regione?", "opzioni": ["Gorgonzola", "Fontina", "Parmigiano"], "giusta": 1, "spiega": "La Fontina DOP, fatta con il latte delle mucche valdostane."},
  {"sez": "economia", "tipo": "scelta", "d": "Perché si parla di \"vigneti eroici\"?", "opzioni": ["perché li piantarono i soldati", "perché sono su terreni ripidi e si coltivano a mano", "perché fanno il vino più forte"], "giusta": 1, "spiega": "Sono su terreni ripidi e difficili, dove il clima e il terreno obbligano a lavorare a mano."},
  {"sez": "economia", "tipo": "vf", "d": "L'alpinismo è Patrimonio dell'Umanità UNESCO.", "vero": true, "spiega": "Vero: dal 2019."},
  {"sez": "economia", "tipo": "scelta", "d": "Quali animali si allevano nei grandi pascoli?", "opzioni": ["i bovini (le mucche)", "i cammelli", "gli struzzi"], "giusta": 0, "spiega": "I bovini: con il loro latte si fanno ottimi formaggi come la Fontina."},
  {"sez": "economia", "tipo": "scelta", "d": "Quale artigianato è tipico della Valle d'Aosta?", "opzioni": ["la lavorazione del legno", "il vetro di Murano", "la ceramica di Faenza"], "giusta": 0, "spiega": "La lavorazione del legno: si può vedere alla Fiera di Sant'Orso."},
  {"sez": "economia", "tipo": "vf", "d": "L'agricoltura dà lavoro a moltissime persone.", "vero": false, "spiega": "Falso: il settore primario ha solo il 2,8% degli occupati (4% in «Che meraviglia!»). L'agricoltura si pratica nel fondovalle: cereali, patate, viti e alberi da frutto."},
  {"sez": "comunicazioni", "tipo": "scelta", "d": "Quale galleria porta in Francia?", "opzioni": ["Traforo del Gran San Bernardo", "Traforo del Monte Bianco", "Traforo del Frejus"], "giusta": 1, "spiega": "Il Traforo del Monte Bianco (1965) collega Courmayeur a Chamonix. Il Gran San Bernardo porta in Svizzera."},
  {"sez": "comunicazioni", "tipo": "scelta", "d": "Dove porta il Traforo del Gran San Bernardo?", "opzioni": ["in Francia", "in Svizzera", "in Piemonte"], "giusta": 1, "spiega": "In Svizzera (1964). Il Traforo del Monte Bianco invece porta in Francia."},
  {"sez": "comunicazioni", "tipo": "scelta", "d": "Quale autostrada percorre il fondovalle della regione?", "opzioni": ["A1", "A5", "A22"], "giusta": 1, "spiega": "L'autostrada A5 Torino – Aosta – Monte Bianco."},
  {"sez": "comunicazioni", "tipo": "vf", "d": "Il Colle del Piccolo San Bernardo porta in Francia.", "vero": true, "spiega": "Vero: è un valico alpino a 2.188 m, chiuso d'inverno per la neve. Il Colle del Gran San Bernardo (2.473 m) porta invece in Svizzera."},
  {"sez": "territorio", "tipo": "scelta", "d": "Osserva la carta: con chi confina la Valle d'Aosta a nord, a sud, a est e a ovest?", "opzioni": ["nord Svizzera, ovest Francia, sud ed est Piemonte", "nord Francia, ovest Svizzera, sud Liguria", "nord Austria, ovest Francia, sud Lombardia"], "giusta": 0, "spiega": "Nord: Svizzera. Ovest: Francia. Sud ed est: Piemonte."},
  {"sez": "territorio", "tipo": "scelta", "d": "Che forma hanno le valli glaciali della Valle d'Aosta?", "opzioni": ["stretta e allungata", "rotonda come un lago", "piatta come una pianura"], "giusta": 0, "spiega": "Sono strette e allungate. Aosta sorge nella valle più ampia, quella della Dora Baltea."},
  {"sez": "popolazione", "tipo": "scelta", "d": "Che cosa sono il walser e il patois?", "opzioni": ["lingue parlate da una parte degli abitanti", "due formaggi", "due sport tradizionali"], "giusta": 0, "spiega": "Il walser deriva dal tedesco, il patois dal francese. Le lingue ufficiali sono l'italiano e il francese."},
  {"sez": "popolazione", "tipo": "vf", "d": "Nelle scuole della Valle d'Aosta si insegnano l'italiano e il francese.", "vero": true, "spiega": "Vero: è una regione bilingue, le due lingue si parlano e si insegnano a scuola."},
  {"sez": "clima", "tipo": "scelta", "d": "Perché nel 1856 il re Vittorio Emanuele II fece del Gran Paradiso una riserva di caccia?", "opzioni": ["per proteggere gli stambecchi, che rischiavano di scomparire", "per costruire una stazione sciistica", "per cercare l'oro"], "giusta": 0, "spiega": "Gli stambecchi venivano cacciati in gran numero. Nel 1920 la riserva fu donata allo Stato e nel 1922 diventò il Parco."},
  {"sez": "clima", "tipo": "vf", "d": "Il gipeto è un uccello rapace che è tornato a fare il nido nel Parco del Gran Paradiso.", "vero": true, "spiega": "Vero. Nel parco vivono anche l'aquila, il gufo reale e la poiana, e poi camosci, marmotte, ermellini e volpi."},
  {"sez": "clima", "tipo": "scelta", "d": "Quali alberi formano i boschi nel fondovalle del Parco del Gran Paradiso?", "opzioni": ["abeti rossi, abeti bianchi e larici", "ulivi e viti", "palme e banani"], "giusta": 0, "spiega": "Abeti rossi, abeti bianchi e larici. Più in alto ci sono i pascoli alpini, pieni di fiori in primavera."},
  {"sez": "clima", "tipo": "scelta", "d": "Che cosa dice l'articolo 9 della Costituzione?", "opzioni": ["che la Repubblica tutela l'ambiente, anche per le generazioni future", "che tutti devono saper sciare", "che le regioni sono venti"], "giusta": 0, "spiega": "La Repubblica «tutela l'ambiente, la biodiversità e gli ecosistemi, anche nell'interesse delle future generazioni». I parchi servono a questo."},
  {"sez": "storia", "tipo": "scelta", "d": "Che cos'è il Medioevo?", "opzioni": ["il periodo che segue la fine dell'Impero Romano d'Occidente", "il periodo dei dinosauri", "il secolo in cui viviamo"], "giusta": 0, "spiega": "È il periodo dopo la fine dell'Impero Romano d'Occidente: allora furono costruiti i castelli medievali della Valle d'Aosta."},
  {"sez": "storia", "tipo": "vf", "d": "Ad Aosta le strade del centro si incrociano ad angolo retto, come nell'antico accampamento romano.", "vero": true, "spiega": "Vero. Anche la cinta di mura romana è quasi intatta."},
  {"sez": "economia", "tipo": "scelta", "d": "Che cosa si ricava dai boschi?", "opzioni": ["il legname, per costruire e per gli oggetti artigianali", "il petrolio", "il sale"], "giusta": 0, "spiega": "Il legname: serve per l'edilizia e per gli oggetti artigianali."},
  {"sez": "economia", "tipo": "scelta", "d": "Quali industrie ci sono in Valle d'Aosta?", "opzioni": ["alimentari, tessili, edili e di lavorazione dei minerali", "navali e petrolchimiche", "di automobili e aerei"], "giusta": 0, "spiega": "Alimentari, tessili, edili e di lavorazione dei minerali."},
  {"sez": "economia", "tipo": "scelta", "d": "Che cosa sono i terrazzamenti?", "opzioni": ["ripiani di terreno sostenuti da muretti in pietra, dove crescono le viti", "le terrazze delle case", "le piste da sci"], "giusta": 0, "spiega": "Sono ripiani costruiti sui versanti ripidi delle montagne per coltivare i vigneti."},
  {"sez": "economia", "tipo": "scelta", "d": "Che cosa si coltiva nelle vallate più soleggiate?", "opzioni": ["patate, alberi da frutto e ortaggi", "riso", "arance e limoni"], "giusta": 0, "spiega": "Patate, alberi da frutto e ortaggi."},
  {"sez": "economia", "tipo": "scelta", "d": "Che cosa fanno i turisti d'estate e d'inverno?", "opzioni": ["d'estate visitano castelli e salgono ai rifugi, d'inverno sciano", "fanno il bagno al mare", "visitano i vulcani"], "giusta": 0, "spiega": "D'estate castelli medievali e rifugi in alta quota; d'inverno stazioni sciistiche e impianti di risalita."},
  {"sez": "comunicazioni", "tipo": "vf", "d": "Vicino ad Aosta c'è un aeroporto.", "vero": true, "spiega": "Vero: si vede sulle carte dei libri."},
  {"sez": "tradizioni", "tipo": "scelta", "d": "Che cosa sono il fiolet e il palet?", "opzioni": ["sport tradizionali valdostani", "formaggi tipici", "danze popolari"], "giusta": 0, "spiega": "Sono sport tradizionali: nel fiolet si lancia lontano un pezzo di legno colpendolo con una mazza, nel palet si lanciano dischi di metallo verso un bersaglio."},
  {"sez": "tradizioni", "tipo": "scelta", "extra": true, "d": "Che cos'è la Bataille des Reines?", "opzioni": ["una sfida tra mucche", "una battaglia di Napoleone", "una gara di sci"], "giusta": 0, "spiega": "È una sfida tra mucche, che si spingono con le corna senza farsi male, per eleggere la \"regina\"."},
  {"sez": "tradizioni", "tipo": "vf", "extra": true, "d": "La Fiera di Sant'Orso, ad Aosta, si tiene da più di 1000 anni.", "vero": true, "spiega": "Vero: si svolge il 30 e 31 gennaio ed è dedicata all'artigianato del legno."}
];

/* Domande e risposte per ripassare (livello scuola primaria), come gli esercizi del libro.
   Nella scheda della regione la risposta si apre toccando la domanda. */
window.DOMANDE_RISPOSTE = [
  { gruppo: "🏔️ Territorio", domande: [
    { d: "Dove si trova la Valle d'Aosta?",
      r: "Nella parte nord-occidentale dell'Italia, in mezzo alle Alpi." },
    { d: "Con quali Stati e con quale regione confina?",
      r: "A nord con la Svizzera, a ovest con la Francia, a sud e a est con il Piemonte." },
    { d: "Il territorio è montuoso, collinare o pianeggiante?",
      r: "È tutto montuoso (100% montagna): non ci sono né pianure né colline." },
    { d: "Quali sono le montagne più alte?",
      r: "Il Monte Bianco (4.807 m), il Monte Rosa (4.637 m), il Cervino (4.478 m) e il Gran Paradiso (4.061 m). Sono tra le montagne più alte d'Europa." },
    { d: "Quali catene montuose ci sono?",
      r: "A nord le Alpi Pennine (con il Cervino e il Monte Rosa), a ovest e a sud le Alpi Graie (con il Monte Bianco e il Gran Paradiso)." },
    { d: "Qual è il fiume principale?",
      r: "La Dora Baltea. Nasce ai piedi del Monte Bianco, attraversa la regione da ovest a est e poi diventa un affluente del Po. Nelle sue acque confluiscono molti torrenti." },
    { d: "Come sono le valli?",
      r: "Sono valli glaciali, strette e allungate, percorse dai torrenti che nascono dai ghiacciai. Aosta sorge nella valle più ampia, quella della Dora Baltea." },
    { d: "Ci sono laghi?",
      r: "Sì, ma sono piccoli laghi alpini sparsi tra le montagne. [[Ci sono anche laghi artificiali, creati con le dighe.]]" },
    { d: "Che cosa sono i ghiacciai? Perché si stanno riducendo?",
      r: "Sono grandi masse di ghiaccio sulle cime più alte, oltre i 3.000 metri. Si stanno riducendo a causa dei cambiamenti climatici." }
  ]},
  { gruppo: "❄️ Clima e ambienti", domande: [
    { d: "Com'è il clima?",
      r: "È un clima alpino: gli inverni sono lunghi e molto freddi, con tanta neve; le estati sono brevi e fresche." },
    { d: "Come cambiano le piante salendo in montagna?",
      r: "In basso ci sono campi e vigneti, poi boschi di abeti e larici, poi prati e piante erbacee, poi muschi e licheni. In cima ci sono neve e ghiacciai." },
    { d: "Quali animali vivono sulle montagne?",
      r: "Stambecchi, camosci, marmotte, ermellini, volpi e uccelli rapaci come l'aquila, il gufo reale, la poiana e il gipeto." },
    { d: "Come è nato il Parco del Gran Paradiso?",
      r: "Nel 1856 il re Vittorio Emanuele II fece di queste montagne una riserva reale di caccia, per proteggere gli stambecchi. Nel 1920 la riserva fu donata allo Stato e nel 1922 diventò il primo Parco nazionale d'Italia." },
    { d: "Qual è il parco più importante?",
      r: "Il Parco Nazionale del Gran Paradiso, nato nel 1922: è il parco nazionale più antico d'Italia. Il suo simbolo è lo stambecco." }
  ]},
  { gruppo: "👥 Popolazione", domande: [
    { d: "Quanti abitanti ha la Valle d'Aosta?",
      r: "123.337 abitanti. È la regione più piccola e meno popolata d'Italia." },
    { d: "Qual è il capoluogo?",
      r: "Aosta, con circa 33.000 abitanti: ci vive circa un quarto della popolazione della regione." },
    { d: "Dove vive la maggior parte delle persone?",
      r: "Nel fondovalle, lungo la Dora Baltea. Gli altri abitanti vivono in piccoli comuni di montagna." },
    { d: "Quali lingue si parlano?",
      r: "Italiano e francese: sono tutte e due lingue ufficiali e si insegnano a scuola. Per questo è una regione bilingue. Una parte degli abitanti parla anche il patois, che viene dal francese, e il walser, che viene dal tedesco." },
    { d: "Che cosa vuol dire che è una regione \"a statuto speciale\"?",
      r: "Vuol dire che ha più autonomia delle altre regioni: può decidere da sola su molte cose, anche per proteggere la sua lingua e la sua cultura. [[Lo è dal 1948.]]" }
  ]},
  { gruppo: "💼 Lavoro e collegamenti", domande: [
    { d: "Qual è l'attività economica più importante?",
      r: "Il turismo: d'estate si visitano i castelli medievali e si sale ai rifugi in alta quota; d'inverno si scia, con tante stazioni sciistiche e impianti di risalita." },
    { d: "Quali industrie ci sono?",
      r: "Industrie alimentari, tessili, edili e di lavorazione dei minerali. Dai boschi si ricava il legname, per costruire e per gli oggetti artigianali." },
    { d: "Che cosa si produce grazie all'acqua?",
      r: "L'energia idroelettrica: l'acqua dei torrenti e delle dighe fa funzionare le centrali elettriche." },
    { d: "Che cosa si coltiva e che cosa si alleva?",
      r: "Nel fondovalle si coltivano cereali, patate, alberi da frutto e ortaggi; sui terrazzamenti, ripiani sostenuti da muretti in pietra, crescono le viti. Nei pascoli alpini si allevano le mucche: con il loro latte si fa la Fontina." },
    { d: "Che cosa sono i \"vigneti eroici\"?",
      r: "Sono vigneti su terreni ripidi di montagna, dove tutto il lavoro si fa a mano." },
    { d: "Come si va dalla Valle d'Aosta agli altri Paesi?",
      r: "Con l'autostrada A5, attraverso i valichi alpini (Gran San Bernardo e Piccolo San Bernardo) e con le gallerie: il Traforo del Monte Bianco porta in Francia, quello del Gran San Bernardo in Svizzera. Vicino ad Aosta c'è anche un aeroporto." }
  ]},
  { gruppo: "🏛️ Storia e tradizioni", domande: [
    { d: "Chi abitava la regione prima dei Romani?",
      r: "I Salassi, un popolo gallico." },
    { d: "Chi ha fondato Aosta? Come si chiamava?",
      r: "L'hanno fondata i Romani nel 25 a.C. e la chiamarono Augusta Praetoria, in onore dell'imperatore Augusto. Da qui viene il nome Aosta." },
    { d: "Quali monumenti romani si possono vedere ad Aosta?",
      r: "Le mura (quasi intatte), la Porta Pretoria, il teatro, l'anfiteatro, l'Arco d'Augusto e il ponte romano sul torrente Buthier. Anche le strade del centro, che si incrociano ad angolo retto, sono quelle dell'accampamento romano." },
    { d: "Che cos'è il Medioevo?",
      r: "È il periodo che segue la fine dell'Impero Romano d'Occidente. In Valle d'Aosta ci sono tanti castelli medievali." },
    { d: "Quali sono gli sport tradizionali della Valle d'Aosta?",
      r: "Il fiolet e il palet, [[e anche il tsan e la rebatta]]." }
  ]}
];

/* Flashcard per ripassare (livello scuola primaria): domanda breve davanti, risposta breve dietro. */
window.FLASHCARD = [
  { gruppo: "📍 Carta d'identità", carte: [
    { f: "Qual è il capoluogo?", r: "Aosta (circa 33.000 abitanti)." },
    { f: "Quanti abitanti ha la regione?", r: "123.337: è la regione meno popolata d'Italia." },
    { f: "Quanto è grande?", r: "3.261 km²: è la regione più piccola d'Italia." },
    { f: "Qual è la densità di popolazione?", r: "38 abitanti per km²." },
    { f: "Di che colori è la bandiera?", r: "[[Nera e rossa.]]" },
    { f: "Che cosa c'è nello stemma?", r: "Un leone d'argento su sfondo nero, con una corona." },
    { f: "Da quando è una regione a statuto speciale?", r: "[[Dal 1948.]]" }
  ]},
  { gruppo: "🏔️ Territorio", carte: [
    { f: "Dove si trova?", r: "Nel nord-ovest dell'Italia, in mezzo alle Alpi." },
    { f: "Con quale Stato confina a nord?", r: "Con la Svizzera." },
    { f: "Con quale Stato confina a ovest?", r: "Con la Francia." },
    { f: "Con quale regione italiana confina?", r: "Con il Piemonte, a sud e a est." },
    { f: "Com'è il territorio?", r: "Tutto montuoso: 100% montagna." },
    { f: "Qual è la montagna più alta?", r: "Il Monte Bianco: 4.807 m." },
    { f: "Quanto è alto il Monte Rosa?", r: "4.637 m (Punta Dufour)." },
    { f: "Quanto è alto il Cervino?", r: "4.478 m. [[Ha la forma di una piramide.]]" },
    { f: "Che cosa ha di speciale il Gran Paradiso?", r: "È alto 4.061 m [[ed è l'unico \"4000\" tutto in Italia]]." },
    { f: "Quali sono le catene montuose?", r: "Le Alpi Pennine (a nord) e le Alpi Graie (a ovest e a sud)." },
    { f: "Qual è il fiume principale?", r: "La Dora Baltea, che diventa un affluente del Po." },
    { f: "Come sono le valli glaciali?", r: "Strette e allungate." },
    { f: "Dove si trovano i ghiacciai?", r: "Sulle cime oltre i 3.000 m. Si stanno riducendo." }
  ]},
  { gruppo: "❄️ Clima e ambienti", carte: [
    { f: "Che clima c'è?", r: "Clima alpino: inverni freddi e nevosi, estati brevi e fresche." },
    { f: "Quali alberi ci sono nei boschi di montagna?", r: "Abeti e larici." },
    { f: "Che cosa si trova sopra i boschi?", r: "Prati e piante erbacee, poi muschi e licheni." },
    { f: "Qual è il parco nazionale più antico d'Italia?", r: "Il Parco Nazionale del Gran Paradiso (1922)." },
    { f: "Qual è il simbolo del Parco del Gran Paradiso?", r: "Lo stambecco." },
    { f: "Che cosa successe nel 1856?", r: "Il re Vittorio Emanuele II fece del Gran Paradiso una riserva reale di caccia." },
    { f: "Dimmi tre uccelli rapaci del Parco.", r: "Ad esempio l'aquila, il gufo reale e il gipeto (e anche la poiana)." },
    { f: "Che cosa dice l'articolo 9 della Costituzione?", r: "Che la Repubblica tutela l'ambiente, anche per le generazioni future." }
  ]},
  { gruppo: "👥 Popolazione", carte: [
    { f: "Dove vive la maggior parte delle persone?", r: "Nel fondovalle, lungo la Dora Baltea." },
    { f: "Quanti abitanti vivono ad Aosta?", r: "Circa un quarto di quelli della regione." },
    { f: "Quali sono le lingue ufficiali?", r: "Italiano e francese: è una regione bilingue." },
    { f: "Che cosa sono il walser e il patois?", r: "Lingue parlate da una parte degli abitanti: il walser viene dal tedesco, il patois dal francese." }
  ]},
  { gruppo: "💼 Lavoro e collegamenti", carte: [
    { f: "Qual è l'attività più importante?", r: "Il turismo: sci, alpinismo, castelli e monumenti." },
    { f: "Che energia si produce con l'acqua?", r: "Energia idroelettrica." },
    { f: "Qual è il formaggio più famoso?", r: "La Fontina." },
    { f: "Che cosa si ricava dai boschi?", r: "Il legname, per costruire e per gli oggetti artigianali." },
    { f: "Quali industrie ci sono?", r: "Alimentari, tessili, edili e di lavorazione dei minerali." },
    { f: "Che cosa sono i terrazzamenti?", r: "Ripiani di terreno sostenuti da muretti in pietra, per le viti." },
    { f: "Che cosa sono i vigneti eroici?", r: "Vigneti su terreni ripidi, lavorati a mano." },
    { f: "Quale galleria porta in Francia?", r: "Il Traforo del Monte Bianco." },
    { f: "Quale galleria porta in Svizzera?", r: "Il Traforo del Gran San Bernardo." },
    { f: "Quale autostrada percorre la valle?", r: "La A5: Torino – Aosta – Monte Bianco." }
  ]},
  { gruppo: "🏛️ Storia e tradizioni", carte: [
    { f: "Chi abitava qui prima dei Romani?", r: "I Salassi, un popolo gallico." },
    { f: "Come si chiamava Aosta al tempo dei Romani?", r: "Augusta Praetoria, in onore dell'imperatore Augusto (25 a.C.)." },
    { f: "Dimmi due monumenti romani di Aosta.", r: "Ad esempio la Porta Pretoria e l'Arco d'Augusto (e anche il teatro e l'anfiteatro)." },
    { f: "Quali sono gli sport tradizionali?", r: "Il fiolet e il palet [[(e anche il tsan e la rebatta)]]." },
    { f: "Che cos'è il Medioevo?", r: "Il periodo che segue la fine dell'Impero Romano d'Occidente." }
  ]}
];

/* ---------------- Interrogazione ----------------
   Discorso da dire all'interrogazione (circa 3 minuti). Le parole tra **asterischi**
   sono le parole chiave: nel sito si possono nascondere per ripassarle a memoria. */
window.DISCORSO = [
  { titolo: "Dove si trova", testo: "Oggi vi parlo della Valle d'Aosta. Si trova nel **nord-ovest dell'Italia**, in mezzo alle **Alpi**. Confina a **nord con la Svizzera**, a **ovest con la Francia** e a **sud e a est con il Piemonte**. È la **regione più piccola d'Italia**, con 3.261 km², ed è anche la **meno popolata**. Il capoluogo è **Aosta**. [[Dal **1948**]] è una regione **a statuto speciale**, cioè ha più autonomia delle altre regioni, ed è **bilingue**: le lingue ufficiali sono l'**italiano** e il **francese**, e si insegnano tutte e due a scuola. Una parte degli abitanti parla anche il **patois**, che viene dal francese, e il **walser**, che viene dal tedesco." },
  { titolo: "Il territorio", testo: "Il territorio è **tutto montuoso**: c'è una grande valle centrale da cui partono tante valli laterali. Qui ci sono le **montagne più alte d'Europa**: il **Monte Bianco**, alto **4.807 metri**, il **Monte Rosa** (4.637 m), il **Cervino** (4.478 m), [[che ha la forma di una piramide]], e il **Gran Paradiso** (4.061 m), [[l'unico \"quattromila\" tutto in Italia]]. A nord ci sono le **Alpi Pennine**, a ovest e a sud le **Alpi Graie**. Sulle cime sopra i 3.000 metri ci sono i **ghiacciai**, che si stanno riducendo a causa dei **cambiamenti climatici**. I ghiacciai alimentano tanti torrenti, che scorrono in **valli glaciali** strette e allungate." },
  { titolo: "Il fiume e i laghi", testo: "Il fiume principale è la **Dora Baltea**: nasce ai piedi del Monte Bianco, attraversa la regione **da ovest a est** e poi diventa un **affluente del Po**. Nella Dora confluiscono molti **torrenti** che scendono dalle valli laterali. Tra le montagne ci sono tanti piccoli **laghi alpini**." },
  { titolo: "Clima e ambienti", testo: "Il clima è **alpino**: gli inverni sono lunghi e freddi, con tanta neve, e le estati sono brevi e fresche. Le piante cambiano con l'altitudine: salendo si trovano **boschi di abeti e larici**, poi **prati**, poi **muschi e licheni**, e in cima neve e ghiacciai. Sulle montagne vivono **stambecchi**, camosci, marmotte, ermellini, volpi e rapaci come l'**aquila** e il **gipeto**. Gli stambecchi rischiavano di scomparire: nel **1856** il re **Vittorio Emanuele II** fece del Gran Paradiso una **riserva di caccia**, e nel **1922** nacque il **Parco Nazionale del Gran Paradiso**, il più antico d'Italia; il suo simbolo è lo **stambecco**." },
  { titolo: "La popolazione", testo: "Gli abitanti sono **123.337**, circa **38 per km²**. La maggior parte vive nel **fondovalle**, lungo la Dora Baltea. Ad **Aosta**, che ha circa 33.000 abitanti, vive circa **un quarto** della popolazione; gli altri vivono in piccoli comuni." },
  { titolo: "L'economia", testo: "L'attività più importante è il **turismo**: d'estate si visitano i **castelli medievali** e si sale ai **rifugi**, d'inverno si va a **sciare**, con tanti impianti di risalita. Infatti il **settore terziario** dà lavoro a circa **tre persone su quattro**. Grazie ai tanti corsi d'acqua si produce molta **energia idroelettrica**. L'**agricoltura** si fa nel fondovalle e dà lavoro a poche persone: si coltivano cereali, patate, alberi da frutto, ortaggi e le viti dei **vigneti eroici**, sui **terrazzamenti** sostenuti da muretti in pietra. Nei pascoli si **allevano le mucche**: con il loro latte si fa la **Fontina**. Ci sono industrie **alimentari, tessili, edili** e di lavorazione dei **minerali**, e dai boschi si ricava il **legname** per costruire e per l'**artigianato del legno**." },
  { titolo: "I collegamenti", testo: "Anche se ci sono tante montagne, la regione è ben collegata: nel fondovalle c'è l'**autostrada A5**, ci sono i **valichi alpini** del Gran San Bernardo e del Piccolo San Bernardo e due grandi gallerie: il **Traforo del Monte Bianco** porta in **Francia** e quello del **Gran San Bernardo** in **Svizzera**." },
  { titolo: "La storia", testo: "Anticamente qui vivevano i **Salassi**, un popolo gallico. Nel **25 a.C.** i **Romani** li sconfissero e fondarono **Augusta Praetoria**, in onore dell'imperatore **Augusto**: da qui viene il nome **Aosta**. Ad Aosta si vedono ancora la **Porta Pretoria**, l'**Arco d'Augusto**, il teatro e l'anfiteatro romani. Nel **Medioevo**, il periodo dopo la fine dell'Impero Romano d'Occidente, furono costruiti molti **castelli**. [[La regione passò ai **Savoia**.]]" },
  { titolo: "Le tradizioni", testo: "Ci sono sport tradizionali come il **fiolet** e il **palet**, [[e ogni anno ad Aosta si tiene la **Fiera di Sant'Orso**, dedicata all'artigianato del legno, che esiste da più di mille anni]]." },
  { titolo: "Per concludere", testo: "La Valle d'Aosta è una regione piccola, ma ha le **montagne più alte d'Europa**, una **natura protetta** e una **storia antica**, che va dai Romani ai castelli." }
];

/* Flusso di domande dell'interrogazione: si parte dal generale, si va alla cartina, poi nei dettagli.
   seguito = domanda che l'insegnante fa subito dopo la precedente;
   tipo: "trabocchetto" o "ragionamento" (domande che chiedono il perché);
   mappa: che cosa mostrare sulla cartina quando si vede la risposta. */
window.FLUSSO = [
  { fase: "1️⃣ Si parte", domande: [
    { d: "Parlami della Valle d'Aosta.", r: "Comincia dal discorso: dove si trova, i confini, che è la regione più piccola d'Italia e che il capoluogo è Aosta.", mappa: { tipo: "regione" } }
  ]},
  { fase: "2️⃣ Alla cartina", domande: [
    { d: "Indicami la Valle d'Aosta sulla carta.", r: "È in alto a sinistra, nel nord-ovest dell'Italia, in mezzo alle Alpi.", mappa: { tipo: "regione" } },
    { seguito: true, d: "Con chi confina?", r: "A nord con la Svizzera, a ovest con la Francia, a sud e a est con il Piemonte.", mappa: { tipo: "regione" } },
    { seguito: true, d: "Che montagne ci sono al confine con la Svizzera?", r: "Le Alpi Pennine, con il Cervino e il Monte Rosa.", mappa: { tipo: "zona", id: "pennine" } },
    { d: "Osserva la carta e dimmi i confini: nord, sud, est e ovest.", r: "Nord: Svizzera. Ovest: Francia. Sud ed est: Piemonte.", mappa: { tipo: "regione" } },
    { d: "Indicami il fiume principale.", r: "La Dora Baltea.", mappa: { tipo: "fiume" } },
    { seguito: true, d: "In che direzione scorre? Dove va a finire?", r: "Scorre da ovest a est, poi esce in Piemonte e diventa un affluente del Po.", mappa: { tipo: "fiume" } },
    { d: "Dov'è il capoluogo?", r: "Aosta è al centro della regione, nel fondovalle, lungo la Dora Baltea.", mappa: { tipo: "luogo", id: "aosta" } }
  ]},
  { fase: "3️⃣ Il territorio", domande: [
    { d: "Com'è il territorio?", r: "È tutto montuoso: 100% montagna. Non ci sono pianure né colline." },
    { seguito: true, d: "Quali sono le montagne più alte? Quanto sono alte?", r: "Il Monte Bianco (4.807 m), il Monte Rosa (4.637 m), il Cervino (4.478 m) e il Gran Paradiso (4.061 m).", mappa: { tipo: "luogo", id: "montebianco" } },
    { seguito: true, tipo: "trabocchetto", d: "Il Gran Paradiso è la montagna più alta?", r: "No, la più alta è il Monte Bianco. [[Il Gran Paradiso è l'unico \"4000\" che si trova tutto in Italia.]]", mappa: { tipo: "luogo", id: "granparadiso" } },
    { d: "Che cosa sono i ghiacciai? Perché si stanno riducendo?", r: "Sono grandi masse di ghiaccio sulle cime sopra i 3.000 m. Si riducono a causa dei cambiamenti climatici." }
  ]},
  { fase: "4️⃣ Clima e ambienti", domande: [
    { d: "Che clima c'è?", r: "Clima alpino: inverni lunghi, freddi e con tanta neve; estati brevi e fresche." },
    { seguito: true, tipo: "ragionamento", d: "Perché fa così freddo?", r: "Perché siamo in alta montagna: più si sale, più fa freddo." },
    { seguito: true, d: "Come cambiano le piante salendo in montagna?", r: "Prima boschi di abeti e larici, poi prati e piante erbacee, poi muschi e licheni; in cima neve e ghiacciai." },
    { d: "Quale parco c'è? Quando è nato? Qual è il suo simbolo?", r: "Il Parco Nazionale del Gran Paradiso, nato nel 1922: è il più antico d'Italia. Il simbolo è lo stambecco.", mappa: { tipo: "luogo", id: "parcogp" } },
    { seguito: true, tipo: "trabocchetto", d: "Allora è nato nel 1856?", r: "No: nel 1856 il re Vittorio Emanuele II creò una riserva reale di caccia; nel 1920 fu donata allo Stato e il Parco nacque nel 1922." },
    { seguito: true, d: "Quali animali ci vivono?", r: "Stambecchi, camosci, marmotte, ermellini, volpi e rapaci come l'aquila, il gufo reale, la poiana e il gipeto." },
    { tipo: "ragionamento", d: "Perché è importante proteggere l'ambiente?", r: "Per non far scomparire piante e animali e per lasciarlo alle generazioni future: lo dice anche l'articolo 9 della Costituzione." }
  ]},
  { fase: "5️⃣ La popolazione", domande: [
    { d: "È una regione molto popolata?", r: "No, è la meno popolata d'Italia: 123.337 abitanti, circa 38 per km²." },
    { seguito: true, tipo: "ragionamento", d: "Perché secondo te ci vive poca gente?", r: "Perché è tutta montagna: fa freddo e c'è poco spazio piano per costruire e coltivare." },
    { seguito: true, tipo: "ragionamento", d: "Dove vive la maggior parte delle persone? Perché?", r: "Nel fondovalle, lungo la Dora Baltea: è più piano, il clima è meno duro e ci sono le strade e il lavoro." },
    { d: "Che lingue si parlano?", r: "Italiano e francese: sono tutte e due lingue ufficiali e si insegnano a scuola, è una regione bilingue (è vicina alla Francia). Alcuni parlano anche il patois e il walser." },
    { seguito: true, d: "Che cosa vuol dire \"regione a statuto speciale\"?", r: "Che ha più autonomia delle altre regioni, anche per proteggere la sua lingua e la sua cultura. [[Lo è dal 1948.]]" }
  ]},
  { fase: "6️⃣ L'economia", domande: [
    { d: "Di che cosa vive la gente?", r: "Soprattutto di turismo: il settore terziario dà lavoro a circa 3 persone su 4." },
    { seguito: true, tipo: "ragionamento", d: "Perché il turismo è così importante?", r: "Per le montagne (sci e alpinismo), la natura, i castelli e i monumenti romani." },
    { seguito: true, tipo: "ragionamento", d: "Che cosa si produce con l'acqua? Perché proprio qui?", r: "Energia idroelettrica, perché ci sono tanti torrenti, ghiacciai e dighe." },
    { d: "E l'agricoltura?", r: "Dà lavoro a poche persone e si fa nel fondovalle: cereali, patate, frutta e i vigneti eroici." },
    { seguito: true, d: "Che cosa si alleva? Che cosa si produce?", r: "Le mucche, nei pascoli: con il loro latte si fa la Fontina." },
    { d: "E l'industria?", r: "Ci sono industrie alimentari, tessili, edili e di lavorazione dei minerali; dai boschi si ricava il legname per costruire e per l'artigianato." }
  ]},
  { fase: "7️⃣ I collegamenti", domande: [
    { tipo: "ragionamento", d: "Se è circondata dalle montagne, come si va in Francia o in Svizzera?", r: "Con l'autostrada A5, i valichi alpini (Gran e Piccolo San Bernardo) e le gallerie." },
    { seguito: true, tipo: "trabocchetto", d: "Quale galleria porta in Francia?", r: "Il Traforo del Monte Bianco. Quello del Gran San Bernardo porta in Svizzera.", mappa: { tipo: "luogo", id: "traforomb" } }
  ]},
  { fase: "8️⃣ La storia", domande: [
    { d: "Chi abitava qui anticamente?", r: "I Salassi, un popolo gallico." },
    { seguito: true, d: "Poi chi arrivò?", r: "I Romani, nel 25 a.C." },
    { seguito: true, d: "Da dove viene il nome Aosta?", r: "Da Augusta Praetoria, la città che i Romani fondarono in onore dell'imperatore Augusto.", mappa: { tipo: "luogo", id: "aosta" } },
    { seguito: true, d: "Che cosa hanno lasciato i Romani?", r: "La Porta Pretoria, l'Arco d'Augusto, il teatro e l'anfiteatro." }
  ]},
  { fase: "9️⃣ Per chiudere", domande: [
    { d: "Che cosa ti ha colpito di più?", r: "Prepara una risposta tua, per esempio: \"Che ci sono le montagne più alte d'Europa\" oppure \"Il Parco del Gran Paradiso, che ha salvato gli stambecchi\"." },
    { tipo: "ragionamento", d: "Confrontala con la nostra regione.", r: "Prepara 2–3 differenze: montagne o pianura, clima, numero di abitanti, lavori più diffusi." }
  ]}
];

window.TRABOCCHETTI = [
  ["Il Gran Paradiso è il monte più alto?", "No, è il **Monte Bianco**"],
  ["La Dora Baltea sfocia nel mare?", "No, si getta nel **Po**"],
  ["È divisa in province?", "No, non ha province"],
  ["Il clima è mediterraneo?", "No, è **alpino**"],
  ["Si parla il tedesco come lingua ufficiale?", "No: **italiano e francese**"],
  ["Il Traforo del Monte Bianco va in Svizzera?", "No, in **Francia**"],
  ["Il Parco del Gran Paradiso è nato nel 1856?", "No: nel 1856 nacque la **riserva di caccia** del re; il **Parco** è del **1922**"]
];

window.CONSIGLI = [
  "Rispondi con **frasi complete**: \"Il fiume principale è la Dora Baltea\", non solo \"la Dora\".",
  "Parti dal **generale** e poi aggiungi i **dettagli**, come nel discorso.",
  "Se non ricordi un numero preciso, va bene dire **\"circa\"** (per esempio \"circa 120.000 abitanti\").",
  "Alla cartina **indica con il dito** mentre parli.",
  "Le domande di **ragionamento** (💭) chiedono il **perché**: alle medie piacciono molto."
];

/* Visita guidata: tappe animate sulla cartina.
   vista: dove va la cartina ("larga", "regione", oppure gli id dei luoghi da inquadrare);
   carta: "fisica" o "politica"; luci: luoghi che pulsano; zone: "pennine"/"graie";
   fiume: "disegna" (il fiume principale si disegna) o "luce"; bordo / confini: effetti speciali. */
window.TOUR = [
  { titolo: "Ecco la Valle d'Aosta", carta: "fisica", vista: "larga", bordo: true,
    testo: "Siamo nel nord-ovest dell'Italia, in mezzo alle Alpi. La linea rossa è il confine della Valle d'Aosta: è la regione più piccola d'Italia ed è anche la meno popolata." },
  { titolo: "I confini", carta: "politica", vista: "larga", confini: true,
    testo: "La Valle d'Aosta confina con due Stati e con una regione: a nord con la Svizzera, a ovest con la Francia, a sud e a est con il Piemonte." },
  { titolo: "Una regione tutta di montagna", carta: "fisica", vista: "regione", fiume: "luce",
    testo: "Il territorio è tutto montuoso: 100% montagna! In mezzo c'è una grande valle, percorsa dalla Dora Baltea, da cui partono tante valli laterali. Sono valli glaciali, strette e allungate." },
  { titolo: "Il Monte Bianco", carta: "fisica", vista: ["montebianco"], zoom: 11, luci: ["montebianco"],
    testo: "Qui, al confine con la Francia, c'è il Monte Bianco: con 4.807 metri è la montagna più alta delle Alpi." },
  { titolo: "Il Cervino e il Monte Rosa", carta: "fisica", vista: ["cervino", "monterosa"], luci: ["cervino", "monterosa"],
    testo: "A nord, al confine con la Svizzera, ci sono il Cervino (4.478 m), con la sua forma a piramide, e il Monte Rosa (4.637 m)." },
  { titolo: "Il Gran Paradiso e i ghiacciai", carta: "fisica", vista: ["granparadiso"], zoom: 10.5, luci: ["granparadiso"],
    testo: "A sud c'è il Gran Paradiso (4.061 m). Sulle cime più alte, sopra i 3.000 metri, ci sono i ghiacciai, che si stanno riducendo a causa dei cambiamenti climatici." },
  { titolo: "Alpi Pennine e Alpi Graie", carta: "fisica", vista: "regione", zone: ["pennine", "graie"],
    testo: "Le montagne a nord, verso la Svizzera, sono le Alpi Pennine. Quelle a ovest e a sud, con il Monte Bianco e il Gran Paradiso, sono le Alpi Graie." },
  { titolo: "La Dora Baltea", carta: "fisica", vista: "larga", fiume: "disegna",
    testo: "Il fiume principale è la Dora Baltea. Nasce ai piedi del Monte Bianco, attraversa tutta la regione da ovest a est e raccoglie l'acqua di tanti torrenti. Poi entra in Piemonte e diventa un affluente del Po." },
  { titolo: "Il clima e il parco", carta: "fisica", vista: ["parcogp"], zoom: 10.5, luci: ["parcogp"],
    testo: "Il clima è alpino: inverni lunghi e freddi, con tanta neve, ed estati brevi e fresche. Gli stambecchi rischiavano di scomparire: nel 1856 il re Vittorio Emanuele II fece di queste montagne una riserva di caccia, e nel 1922 nacque il Parco Nazionale del Gran Paradiso, il primo d'Italia. Il suo simbolo è lo stambecco." },
  { titolo: "Aosta, il capoluogo", carta: "fisica", vista: ["aosta"], zoom: 12, luci: ["aosta"],
    testo: "Aosta è il capoluogo. L'hanno fondata i Romani nel 25 a.C. con il nome di Augusta Praetoria: ci sono ancora la Porta Pretoria, l'Arco d'Augusto e il teatro romano." },
  { titolo: "Dove vive la gente", carta: "fisica", vista: "regione", fiume: "luce", luci: ["aosta"],
    testo: "Gli abitanti sono 123.337. La maggior parte vive nel fondovalle, lungo la Dora Baltea, e circa un quarto vive ad Aosta. Le lingue ufficiali sono l'italiano e il francese." },
  { titolo: "Il lavoro", carta: "fisica", vista: "regione", luci: ["courmayeur", "cervinia", "placemoulin", "valpelline"],
    testo: "L'attività più importante è il turismo: d'estate castelli e rifugi, d'inverno lo sci. Con l'acqua dei torrenti e delle dighe si produce energia idroelettrica, e dai boschi si ricava il legname. Nei pascoli si allevano le mucche: con il loro latte si fa la Fontina." },
  { titolo: "Le strade tra le montagne", carta: "politica", vista: "regione", luci: ["traforomb", "gsb", "psb"],
    testo: "Per uscire dalla regione ci sono l'autostrada A5, i valichi del Gran San Bernardo e del Piccolo San Bernardo e due grandi gallerie: il Traforo del Monte Bianco porta in Francia, quello del Gran San Bernardo in Svizzera." },
  { titolo: "Fine della visita! 🎉", carta: "fisica", vista: "regione", fine: true,
    testo: "Hai visto le parti principali della Valle d'Aosta. Ora prova a esercitarti: con il quiz, le flashcard o l'interrogazione!" }
];
