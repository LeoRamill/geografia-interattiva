/*
 * Codice comune a tutte le regioni. Si carica da app/carica.js dopo i file della regione:
 * regioni/<id>/regione.js (window.REGIONE), confine.js, fiumi.js, politica.js, zone.js, dati.js.
 * Niente di specifico di una regione deve stare qui: va in regione.js o in dati.js.
 */
(function () {
  "use strict";

  const R = window.REGIONE;
  const BASE = `regioni/${R.id}/`;
  const maiuscola = t => t.charAt(0).toUpperCase() + t.slice(1);
  const areaBounds = a => L.latLngBounds([a[1], a[0]], [a[3], a[2]]);   // [lng0, lat0, lng1, lat1] -> bounds
  document.title = R.nome + " interattiva";
  document.querySelector(".brand h1").textContent = R.nome;
  // bandiera: una striscia verticale per ogni colore di REGIONE.bandiera
  // (o il disegno vero, se regione.js ha bandiera_svg: è scritto da noi, non viene da fuori)
  document.querySelector(".brand .flag").innerHTML = R.bandiera_svg || R.bandiera.map(c => `<i style="background:${c}"></i>`).join("");
  document.getElementById("map").setAttribute("aria-label", "Mappa: " + R.nome);

  const CAT = window.CATEGORIE;
  const LUOGHI = window.LUOGHI;
  const panel = document.getElementById("panel");

  // Dimensione del testo (pulsante A+): normale, grande, molto grande
  const SCALE = [1, 1.15, 1.3];
  let livelloTesto = 0;
  try { livelloTesto = Math.min(SCALE.length - 1, Math.max(0, +localStorage.getItem("testo") || 0)); } catch (e) { /* non importa */ }
  document.documentElement.style.setProperty("--scala", SCALE[livelloTesto]);
  const quiz = { on: false, order: [], i: 0, ok: 0, done: 0, marks: {}, tries: 0 };
  const domande = { on: false, elenco: [], i: 0, ok: 0, risposto: false };
  const flash = { on: false, gruppo: null, mazzo: [], coda: [], sapute: 0, primoColpo: 0, sbagliate: new Set() };
  const interr = { on: false, scheda: "discorso", passi: [], i: 0, nascondi: false, crono: null, inizio: 0 };
  const tour = { on: false, i: 0, play: true, voce: false, timer: null, timers: [], raf: null, cartaPrima: null };

  /* ---------------- Mappa ---------------- */
  const confine = L.geoJSON(window.CONFINE);
  const bounds = confine.getBounds();

  // Area coperta dal rilievo della carta fisica (vedi tools/genera_rilievo.py e regione.js)
  const AREA_LARGA = areaBounds(R.area_larga);
  const AREA_REGIONE = areaBounds(R.area_regione);
  const ZOOM_MIN = R.zoom_min || 8;

  const small = window.matchMedia("(max-width: 820px)").matches;
  const FIT = small
    ? { padding: [12, 12] }
    : { paddingTopLeft: [215, 20], paddingBottomRight: [20, 20] };   // spazio per la legenda
  const NOMI_ZOOM = 10.5;   // da questo zoom in su compaiono i nomi dei luoghi

  const map = L.map("map", {
    zoomControl: false,
    zoomSnap: 0.25,
    minZoom: ZOOM_MIN,
    maxZoom: 16,
    maxBounds: AREA_LARGA,
    maxBoundsViscosity: 0.8
  });
  L.control.zoom({ position: "bottomright" }).addTo(map);
  window.GEO = { map };     // per le prove automatiche (tools/prova_sito.js)

  // Livelli della mappa, dal basso verso l'alto
  map.createPane("politica").style.zIndex = 250;   // aree colorate della carta politica
  map.createPane("fiumi").style.zIndex = 380;      // fiumi, confini, strade
  map.createPane("scritte").style.zIndex = 450;    // nomi (sopra la velatura bianca)
  map.getPane("scritte").style.pointerEvents = "none";

  /* ---------- Carta FISICA: rilievo a colori + fiumi + nomi ---------- */
  // Rilievo creato da noi con i dati di altitudine (Terrain Tiles, AWS Open Data).
  // Le tessere sono nella cartella regioni/<id>/tiles/rilievo: niente chiavi, funziona anche offline.
  const ATTR_RILIEVO = 'rilievo: <a href="https://registry.opendata.aws/terrain-tiles/">Terrain Tiles</a> (SRTM, EU-DEM &copy; Copernicus)';
  const rilievo = [
    L.tileLayer(BASE + "tiles/rilievo/{z}/{x}/{y}.jpg?v=5", {
      minZoom: ZOOM_MIN, maxNativeZoom: 11, maxZoom: 19, bounds: AREA_LARGA, className: "atlante", attribution: ATTR_RILIEVO
    }),
    L.tileLayer(BASE + "tiles/rilievo/{z}/{x}/{y}.jpg?v=5", {
      minZoom: 12, minNativeZoom: 12, maxNativeZoom: 12, maxZoom: 19, bounds: AREA_REGIONE, className: "atlante"
    })
  ];

  // Fiumi ricavati dai dati di altitudine (tools/genera_fiumi.py)
  function stileFiume(km2, sottile) {
    const w = km2 < 100 ? 1 : km2 < 500 ? 1.6 : km2 < 2000 ? 2.4 : 3.2;
    return { color: "#2f7fc8", weight: sottile ? w * 0.7 : w, opacity: 0.9, lineCap: "round", lineJoin: "round",
             className: km2 < 150 ? "fiume-piccolo" : km2 < 600 ? "fiume-medio" : "", interactive: false, pane: "fiumi" };
  }
  const fiumi = sottile => L.geoJSON(window.FIUMI.fiumi, { style: f => stileFiume(f.properties.km2, sottile) });

  // Confine di Stato tratteggiato (come negli atlanti)
  const P = window.POLITICA;
  const confineStato = () => L.geoJSON({ type: "FeatureCollection", features: [
      { type: "Feature", properties: {}, geometry: P.confini.stato },
      { type: "Feature", properties: {}, geometry: P.confini.estero }] }, {
    style: { color: "#7a3e9d", weight: 2.5, dashArray: "8 4 2 4", opacity: 0.9, interactive: false, pane: "fiumi" }
  });

  // Scritte che compaiono solo da un certo zoom in su
  const scritte = [];   // { marker, min, gruppo }
  function scritta(lat, lng, html, cls, min, gruppo, rot) {
    const m = L.marker([lat, lng], {
      pane: "scritte", interactive: false, keyboard: false,
      icon: L.divIcon({ className: "lbl-wrap", iconSize: [0, 0],
                        html: `<div class="lbl ${cls}" style="--r:${rot || 0}deg">${html}</div>` })
    });
    scritte.push({ marker: m, min: min || 0, gruppo });
    return m;
  }

  // aggancia la scritta di un fiume al punto più vicino del fiume e la ruota come il fiume
  const puntiFiume = [];
  window.FIUMI.fiumi.features.forEach(f => {
    const c = f.geometry.coordinates;
    for (let k = 0; k < c.length - 1; k++) {
      // la direzione si calcola su un tratto più lungo, così la scritta non è storta
      const a = c[Math.max(0, k - 4)], b = c[Math.min(c.length - 1, k + 5)];
      puntiFiume.push({ a: c[k], b: c[k + 1], da: a, a2: b, km2: f.properties.km2 });
    }
  });
  function agganciaAlFiume(e) {
    let best = null, dmin = Infinity;
    puntiFiume.forEach(p => {
      if (p.km2 < e.km2) return;
      const mx = (p.a[0] + p.b[0]) / 2, my = (p.a[1] + p.b[1]) / 2;
      const d = (mx - e.lng) ** 2 + ((my - e.lat) * 1.43) ** 2;
      if (d < dmin) { dmin = d; best = p; }
    });
    if (!best || dmin > 0.05) return { lat: e.lat, lng: e.lng, r: 0 };
    const dx = best.a2[0] - best.da[0], dy = (best.a2[1] - best.da[1]) * 1.43;
    let r = -Math.atan2(dy, dx) * 180 / Math.PI;
    if (r > 90) r -= 180;
    if (r < -90) r += 180;
    return { lat: (best.a[1] + best.b[1]) / 2, lng: (best.a[0] + best.b[0]) / 2, r };
  }

  const fisica = L.layerGroup([...rilievo, fiumi(false), confineStato()]);
  window.ETICHETTE_FISICHE.forEach(e => {
    let { lat, lng, r } = e;
    if (e.tipo === "fiume") ({ lat, lng, r } = agganciaAlFiume(e));
    scritta(lat, lng, e.t, "lbl-" + e.tipo, e.min, fisica, r);
  });

  /* ---------- Carta POLITICA: Stati, province, comuni, città, strade ---------- */
  const politica = L.layerGroup([
    ...(P.mare ? [L.geoJSON({ type: "Feature", properties: {}, geometry: P.mare },
                            { style: { pane: "politica", fillColor: "#b9dcf2", fillOpacity: 1, stroke: false, interactive: false } })] : []),
    L.geoJSON(P.aree, { style: f => ({ pane: "politica", fillColor: f.properties.colore, fillOpacity: 1,
                                       color: "#8a8190", weight: 1, interactive: false }) }),
    L.geoJSON(P.comuni, { style: f => ({ pane: "politica", fillColor: f.properties.colore, fillOpacity: 1,
                                         color: "#8fa58a", weight: 0.7, dashArray: "3 3", interactive: false }) }),
    L.geoJSON(P.laghi, { style: { pane: "politica", fillColor: "#a9d0ef", fillOpacity: 1, color: "#6aa6d6", weight: 1, interactive: false } }),
    fiumi(true),
    L.geoJSON({ type: "Feature", properties: {}, geometry: P.confini.regioni },
              { style: { pane: "fiumi", color: "#6b6170", weight: 2.2, opacity: 0.9, interactive: false } }),
    L.geoJSON(P.strade, { style: f => ({ pane: "fiumi", color: "#d23c2f", opacity: 0.85, interactive: false, className: f.properties.tipo === "Major Highway" ? "strada" : "strada strada-minore",
                                         weight: f.properties.tipo === "Major Highway" ? 2.4 : 1.4 }) }),
    confineStato()
  ]);
  // i nomi delle province della regione si vedono subito; quelli delle altre zone avvicinandosi
  // (da lontano basta il nome della regione o dello Stato vicino, in CONFINANTI)
  P.aree.features.forEach(f => {
    const [lat, lng] = f.properties.etichetta;
    scritta(lat, lng, f.properties.nome, "lbl-area", f.properties.regione ? 8 : 9.5, politica);
  });
  P.comuni.features.forEach(f => {
    const [lat, lng] = f.properties.etichetta;
    scritta(lat, lng, f.properties.nome, "lbl-comune", 11, politica);
  });
  window.CITTA.forEach(c => {
    scritta(c.lat, c.lng, `<span class="dot dot-${c.tipo}"></span>${c.nome}`, "lbl-citta", c.tipo === "provincia" ? 8 : 9, politica);
  });

  /* ---------- Cartine che hanno bisogno di internet ---------- */
  const ESRI = "https://server.arcgisonline.com/ArcGIS/rest/services/";
  const OTM = "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png";
  const satellite = L.layerGroup([
    L.tileLayer(ESRI + "World_Imagery/MapServer/tile/{z}/{y}/{x}", {
      maxZoom: 18, attribution: 'immagini &copy; <a href="https://www.esri.com">Esri</a>'
    }),
    confineStato()
  ]);
  const escursionistica = L.layerGroup([
    L.tileLayer(OTM, {
      maxZoom: 17,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> · &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)'
    })
  ]);
  const semplice = L.layerGroup([
    L.tileLayer(ESRI + "World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}", {
      maxNativeZoom: 13, maxZoom: 19, opacity: 0.6, attribution: 'rilievo &copy; <a href="https://www.esri.com">Esri</a>'
    }),
    confineStato()
  ]);

  // Velatura bianca fuori dalla regione: un grande rettangolo con dei "buchi" a forma di regione
  // (più di uno se la regione ha delle isole).
  const g = window.CONFINE.geometry;
  const poligoni = g.type === "Polygon" ? [g.coordinates] : g.coordinates;
  const anelli = poligoni.map(p => p[0].map(([lng, lat]) => [lat, lng]));
  const fuori = AREA_LARGA.pad(1);
  const world = [fuori.getSouthWest(), fuori.getSouthEast(), fuori.getNorthEast(), fuori.getNorthWest()];
  const velo = L.polygon([world, ...anelli], {
    stroke: false, fillColor: "#ffffff", fillOpacity: 0.45, interactive: false
  }).addTo(map);

  L.featureGroup([
    L.geoJSON(window.CONFINE, { style: { color: "#ffffff", weight: 7, opacity: 0.9, fill: false, interactive: false } }),
    L.geoJSON(window.CONFINE, { style: { color: "#c8102e", weight: 3, fill: false, interactive: false } })
  ]).addTo(map);

  // Fiume principale: tracciato calcolato dai dati di altitudine, cliccabile
  L.polyline(window.FIUMI.principale, {
    color: "#1f63b5", weight: 5, opacity: 0.9, lineCap: "round", lineJoin: "round", interactive: false
  }).addTo(map);
  // linea invisibile più larga sopra il fiume, così è facile cliccarlo (anche con il dito)
  const fiumeClic = L.polyline(window.FIUMI.principale, { color: "#000", opacity: 0, weight: 22, bubblingMouseEvents: false }).addTo(map);
  fiumeClic.bindTooltip(R.fiume.nome, { sticky: true, className: "tip" });
  fiumeClic.on("click", e => {
    if (quiz.on) return quizClicMappa(e.latlng, true);
    if (!domande.on && !flash.on && !interr.on && !tour.on) showPlace(window.FIUME_INFO, null);
  });

  // Etichette dei territori confinanti
  window.CONFINANTI.forEach(c => {
    L.marker([c.lat, c.lng], {
      pane: "scritte", interactive: false, keyboard: false,
      icon: L.divIcon({ className: "", html: `<div class="country-label">${c.nome}</div>`, iconSize: [120, 20], iconAnchor: [60, 10] })
    }).addTo(map);
  });

  /* ---------- Paralleli e meridiani (reticolato geografico) ---------- */
  // ogni mezzo grado dentro l'area della cartina
  const mezzi = (a, b) => { const v = []; for (let x = Math.floor(a * 2) / 2; x <= Math.ceil(b * 2) / 2; x += 0.5) v.push(x); return v; };
  const PARALLELI = mezzi(AREA_LARGA.getSouth(), AREA_LARGA.getNorth());
  const MERIDIANI = mezzi(AREA_LARGA.getWest(), AREA_LARGA.getEast());
  const ret = AREA_LARGA.pad(1);
  const gradi = (v, dir) => Math.floor(v) + "°" + (v % 1 ? "30′" : "") + " " + dir;
  map.createPane("reticolo").style.zIndex = 420;   // sopra la velatura bianca
  const stileReticolo = { color: "#1d4f86", weight: 1.3, opacity: 0.7, dashArray: "6 4", interactive: false, pane: "reticolo" };
  const reticolato = L.layerGroup();
  const scritteReticolo = [];
  PARALLELI.forEach(lat => {
    L.polyline([[lat, ret.getWest()], [lat, ret.getEast()]], stileReticolo).addTo(reticolato);
    scritteReticolo.push({ tipo: "lat", v: lat, m: L.marker([lat, AREA_LARGA.getCenter().lng], { pane: "scritte", interactive: false, keyboard: false,
      icon: L.divIcon({ className: "lbl-wrap", iconSize: [0, 0], html: `<div class="lbl lbl-grid">${gradi(lat, "N")}</div>` }) }) });
  });
  MERIDIANI.forEach(lng => {
    L.polyline([[ret.getSouth(), lng], [ret.getNorth(), lng]], stileReticolo).addTo(reticolato);
    scritteReticolo.push({ tipo: "lng", v: lng, m: L.marker([AREA_LARGA.getCenter().lat, lng], { pane: "scritte", interactive: false, keyboard: false,
      icon: L.divIcon({ className: "lbl-wrap", iconSize: [0, 0], html: `<div class="lbl lbl-grid">${gradi(lng, "E")}</div>` }) }) });
  });
  // le scritte stanno sul bordo destro (paralleli) e in basso (meridiani) della parte visibile
  function posizionaReticolo() {
    if (!map.hasLayer(reticolato)) return;
    const size = map.getSize(), c = map.getCenter();
    scritteReticolo.forEach(r => {
      let pt;
      if (r.tipo === "lat") {
        const y = map.latLngToContainerPoint([r.v, c.lng]).y;
        pt = y > 70 && y < size.y - 50 ? L.point(size.x - 46, y) : null;
      } else {
        const x = map.latLngToContainerPoint([c.lat, r.v]).x;
        pt = x > 30 && x < size.x - 70 ? L.point(x, size.y - 44) : null;
      }
      if (pt) { r.m.setLatLng(map.containerPointToLatLng(pt)); if (!reticolato.hasLayer(r.m)) r.m.addTo(reticolato); }
      else if (reticolato.hasLayer(r.m)) reticolato.removeLayer(r.m);
    });
  }
  map.on("moveend zoomend resize", posizionaReticolo);

  /* ---------- Selettore delle cartine ---------- */
  // "prova": una tessera di esempio (vicino alla regione); se si carica, c'è internet e la cartina è disponibile
  const centro8 = map.project(bounds.getCenter(), 8).divideBy(256).floor();
  const T8 = { x: centro8.x, y: centro8.y };
  const CARTE = {
    fisica:    { nome: "Fisica",    icona: "⛰️", gruppo: fisica,    velo: 0.45 },
    politica:  { nome: "Politica",  icona: "🗺️", gruppo: politica,  velo: 0.12 },
    satellite: { nome: "Satellite", icona: "🛰️", gruppo: satellite, velo: 0.30,
                 prova: `${ESRI}World_Imagery/MapServer/tile/8/${T8.y}/${T8.x}` },
    escursionistica: { nome: "Escursionistica", icona: "🥾", gruppo: escursionistica, velo: 0.35, altre: true,
                 prova: `https://a.tile.opentopomap.org/8/${T8.x}/${T8.y}.png` },
    semplice:  { nome: "Semplice",  icona: "🏔️", gruppo: semplice,  velo: 0.45, altre: true,
                 prova: `${ESRI}World_Shaded_Relief/MapServer/tile/8/${T8.y}/${T8.x}` }
  };
  let cartaAttiva = null;
  let cartaDesiderata = null;   // cartina salvata che aspetta internet per essere mostrata
  const bottoniCarta = {};
  const disponibile = {};
  let bottoneAltre = null, menuAltre = null;

  function aggiornaScritte() {
    if (!cartaAttiva) return;
    const z = map.getZoom();
    scritte.forEach(s => {
      const on = s.gruppo === CARTE[cartaAttiva].gruppo && z >= s.min;
      if (on && !map.hasLayer(s.marker)) s.marker.addTo(map);
      if (!on && map.hasLayer(s.marker)) map.removeLayer(s.marker);
    });
    map.getContainer().classList.toggle("zoom-basso", z < 9.75);
    map.getContainer().classList.toggle("zoom-lontano", z < 8.5);   // regioni grandi viste da lontano
    map.getContainer().classList.toggle("zoom-alto", z >= 10.5);
  }

  function mostraCarta(id, ricorda = true) {
    if (cartaAttiva) map.removeLayer(CARTE[cartaAttiva].gruppo);
    cartaAttiva = id;
    CARTE[id].gruppo.addTo(map);
    velo.setStyle({ fillOpacity: CARTE[id].velo });
    document.body.dataset.carta = id;
    Object.entries(bottoniCarta).forEach(([k, b]) => b.setAttribute("aria-pressed", String(k === id)));
    if (bottoneAltre) {
      const altra = CARTE[id].altre;
      bottoneAltre.setAttribute("aria-pressed", String(!!altra));
      bottoneAltre.innerHTML = altra ? `<span aria-hidden="true">${CARTE[id].icona}</span> ${CARTE[id].nome} ▾` : "Altre ▾";
      menuAltre.hidden = true;
      bottoneAltre.setAttribute("aria-expanded", "false");
    }
    aggiornaScritte();
    if (ricorda) {
      cartaDesiderata = null;
      try { localStorage.setItem("carta", id); } catch (e) { /* non importa */ }
    }
  }

  // Mostra i pulsanti delle cartine online solo se la tessera di prova si carica
  function provaTessera(url) {
    return new Promise(ok => {
      const img = new Image();
      const t = setTimeout(() => { img.src = ""; ok(false); }, 6000);
      img.onload = () => { clearTimeout(t); ok(true); };
      img.onerror = () => { clearTimeout(t); ok(false); };
      img.src = url + (url.includes("?") ? "&" : "?") + "t=" + Date.now();
    });
  }

  function aggiornaPulsanti() {
    Object.entries(CARTE).forEach(([id, c]) => {
      if (c.prova) bottoniCarta[id].hidden = !disponibile[id];
    });
    bottoneAltre.hidden = !Object.entries(CARTE).some(([id, c]) => c.altre && disponibile[id]);
    if (bottoneAltre.hidden) menuAltre.hidden = true;
    // se la cartina in uso non è più raggiungibile si torna alla fisica
    if (CARTE[cartaAttiva].prova && !disponibile[cartaAttiva]) {
      cartaDesiderata = cartaDesiderata || cartaAttiva;
      mostraCarta("fisica", false);
    }
    // la cartina scelta l'ultima volta era online: appena c'è internet la rimette
    if (cartaDesiderata && disponibile[cartaDesiderata] && cartaAttiva === "fisica") mostraCarta(cartaDesiderata);
  }

  function controllaInternet() {
    const online = Object.entries(CARTE).filter(([, c]) => c.prova);
    if (navigator.onLine === false) {
      online.forEach(([id]) => { disponibile[id] = false; });
      aggiornaPulsanti();
      return;
    }
    online.forEach(([id, c]) => provaTessera(c.prova).then(ok => { disponibile[id] = ok; aggiornaPulsanti(); }));
  }
  window.addEventListener("online", controllaInternet);
  window.addEventListener("offline", controllaInternet);

  const Selettore = L.Control.extend({
    options: { position: "topright" },
    onAdd() {
      const div = L.DomUtil.create("div", "carta-switch-wrap");
      const riga = L.DomUtil.create("div", "carta-switch", div);
      riga.setAttribute("role", "group");
      riga.setAttribute("aria-label", "Tipo di cartina");
      menuAltre = L.DomUtil.create("div", "carta-menu", div);
      menuAltre.hidden = true;
      Object.entries(CARTE).forEach(([id, c]) => {
        const b = L.DomUtil.create("button", "", c.altre ? menuAltre : riga);
        b.innerHTML = `<span aria-hidden="true">${c.icona}</span> ${c.nome}`;
        b.addEventListener("click", () => mostraCarta(id));
        if (c.prova) b.hidden = true;           // compare solo se c'è internet
        bottoniCarta[id] = b;
      });
      bottoneAltre = L.DomUtil.create("button", "altre", riga);
      bottoneAltre.textContent = "Altre ▾";
      bottoneAltre.hidden = true;
      bottoneAltre.setAttribute("aria-expanded", "false");
      bottoneAltre.addEventListener("click", () => {
        menuAltre.hidden = !menuAltre.hidden;
        bottoneAltre.setAttribute("aria-expanded", String(!menuAltre.hidden));
      });
      L.DomEvent.disableClickPropagation(div);
      return div;
    }
  });
  new Selettore().addTo(map);
  map.on("zoomend", aggiornaScritte);
  L.control.scale({ imperial: false, position: "bottomleft" }).addTo(map);

  /* ---------------- Marker ---------------- */
  const markers = {};      // id -> L.marker
  const visibili = new Set(Object.keys(CAT).filter(k => !CAT[k].spenta));
  let attivo = null;

  const vicino = () => map.getZoom() >= NOMI_ZOOM;
  const pinSize = () => (vicino() ? (small ? 28 : 30) : (small ? 22 : 24));

  function pinIcon(l, extra) {
    const c = CAT[l.cat];
    const n = pinSize();
    return L.divIcon({
      className: "",
      html: `<div class="pin ${extra || ""}" style="--c:${c.colore};--s:${n}px"><span>${c.icona}</span></div>`,
      iconSize: [n, n],
      iconAnchor: [n / 2, n / 2],
      tooltipAnchor: [n / 2 + 2, 0]
    });
  }

  LUOGHI.forEach(l => {
    const m = L.marker([l.lat, l.lng], { icon: pinIcon(l), title: l.nome, riseOnHover: true });
    m.bindTooltip(l.nome, { permanent: true, direction: "right", className: "name-label" });
    m.on("mouseover", () => { const t = m.getTooltip().getElement(); if (t) t.classList.add("hov"); });
    m.on("mouseout", () => { const t = m.getTooltip().getElement(); if (t) t.classList.remove("hov"); });
    m.on("click", () => (quiz.on ? quizAnswer(l) : select(l.id)));
    m.addTo(map);
    markers[l.id] = m;
  });

  function refreshIcons() {
    LUOGHI.forEach(l => {
      let extra = "";
      if (quiz.on) extra = quiz.marks[l.id] || "quiz";
      else if (l.id === attivo) extra = "active";
      markers[l.id].setIcon(pinIcon(l, extra));
    });
  }

  let eraVicino = null;
  function onZoom() {
    const v = vicino();
    map.getContainer().classList.toggle("show-names", v);
    if (v !== eraVicino) { eraVicino = v; refreshIcons(); }
  }
  map.on("zoomend", onZoom);

  function applyFilters() {
    LUOGHI.forEach(l => {
      const show = visibili.has(l.cat);
      const m = markers[l.id];
      if (show && !map.hasLayer(m)) m.addTo(map);
      if (!show && map.hasLayer(m)) map.removeLayer(m);
    });
    aggiornaTutti();
  }


  /* ---------------- Legenda (filtra per categoria) ---------------- */
  const legendBtns = {};
  let btnTutti = null;
  // interruttore "Tutti i luoghi": acceso, spento o "in parte" (solo alcune categorie)
  function aggiornaTutti() {
    if (!btnTutti) return;
    const n = Object.keys(CAT).filter(k => visibili.has(k)).length, tot = Object.keys(CAT).length;
    btnTutti.setAttribute("aria-pressed", n === tot ? "true" : n === 0 ? "false" : "mixed");
    btnTutti.querySelector(".sw").textContent = n === 0 ? "🙈" : "👁️";
    btnTutti.querySelector(".nm").textContent = n === tot ? "Tutti i luoghi" : n === 0 ? "Tutti i luoghi (spenti)" : `Tutti i luoghi (${n} su ${tot})`;
  }
  const Legenda = L.Control.extend({
    options: { position: "topleft" },
    onAdd() {
      const div = L.DomUtil.create("div", "legend");
      const toggle = L.DomUtil.create("button", "legend-toggle", div);
      toggle.textContent = "Legenda";
      toggle.setAttribute("aria-expanded", String(!small));
      toggle.addEventListener("click", () =>
        toggle.setAttribute("aria-expanded", String(toggle.getAttribute("aria-expanded") !== "true")));
      const items = L.DomUtil.create("div", "legend-items", div);
      btnTutti = L.DomUtil.create("button", "legend-item legend-tutti", items);
      btnTutti.style.setProperty("--c", "#374151");
      btnTutti.title = "Mostra o nascondi tutti i luoghi insieme";
      btnTutti.innerHTML = `<span class="sw">👁️</span><span class="nm">Tutti i luoghi</span>`;
      btnTutti.addEventListener("click", () => {
        const tutti = Object.keys(CAT).every(k => visibili.has(k));
        Object.keys(CAT).forEach(k => { if (tutti) visibili.delete(k); else visibili.add(k); });
        Object.entries(legendBtns).forEach(([k, b]) => b.setAttribute("aria-pressed", String(visibili.has(k))));
        applyFilters();
      });
      Object.entries(CAT).forEach(([key, c]) => {
        const b = L.DomUtil.create("button", "legend-item", items);
        b.style.setProperty("--c", c.colore);
        b.setAttribute("aria-pressed", String(visibili.has(key)));
        b.title = "Mostra/nascondi: " + c.nome;
        b.innerHTML = `<span class="sw">${c.icona}</span><span class="nm">${c.nome}</span>`;
        b.addEventListener("click", () => {
          if (visibili.has(key)) visibili.delete(key); else visibili.add(key);
          b.setAttribute("aria-pressed", String(visibili.has(key)));
          applyFilters();
        });
        legendBtns[key] = b;
      });
      L.DomUtil.create("div", "legend-hint", items).textContent = "Tocca una voce per mostrarla o nasconderla";
      const ret = L.DomUtil.create("button", "legend-item legend-grid", items);
      ret.style.setProperty("--c", "#2b5d8f");
      ret.title = "Mostra/nascondi paralleli e meridiani";
      ret.innerHTML = `<span class="sw">▦</span><span class="nm">Paralleli e meridiani</span>`;
      ret.setAttribute("aria-pressed", "true");
      ret.addEventListener("click", () => {
        const on = !map.hasLayer(reticolato);
        if (on) { reticolato.addTo(map); posizionaReticolo(); } else map.removeLayer(reticolato);
        ret.setAttribute("aria-pressed", String(on));
      });
      const alt = L.DomUtil.create("div", "alt-scale", items);
      alt.innerHTML = `<div class="alt-title">Altitudine</div>
        <div class="alt-bar"></div>
        <div class="alt-ticks"><span>0</span><span>1000</span><span>2000</span><span>3000</span><span>4000 m</span></div>
        <div class="alt-note">⬜ sopra i 3.000 m: nevi e ghiacciai · 🟦 laghi</div>`;
      const pol = L.DomUtil.create("div", "pol-scale", items);
      pol.innerHTML = `<div class="alt-title">Confini e strade</div>
        <div class="pol-row"><span class="ln ln-stato"></span>Confine di Stato</div>
        <div class="pol-row"><span class="ln ln-regione"></span>Confine di regione</div>
        <div class="pol-row"><span class="ln ln-prov"></span>Provincia, cantone, dipartimento</div>
        <div class="pol-row"><span class="ln ln-comune"></span>Comune</div>
        <div class="pol-row"><span class="ln ln-strada"></span>Strada principale</div>
        <div class="pol-row"><span class="dot dot-provincia"></span>Capoluogo</div>`;
      L.DomEvent.disableClickPropagation(div);
      L.DomEvent.disableScrollPropagation(div);
      return div;
    }
  });
  new Legenda().addTo(map);
  applyFilters();
  reticolato.addTo(map);

  map.fitBounds(bounds, FIT);
  onZoom();
  let cartaIniziale = "fisica";
  try { const c = localStorage.getItem("carta"); if (CARTE[c]) cartaIniziale = c; } catch (e) { /* non importa */ }
  // le cartine online si mostrano solo dopo aver verificato che c'è internet
  if (CARTE[cartaIniziale].prova) { cartaDesiderata = cartaIniziale; cartaIniziale = "fisica"; }
  mostraCarta(cartaIniziale, false);
  controllaInternet();

  /* ---------------- Pannello ---------------- */
  const esc = s => String(s).replace(/[&<>"]/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));
  // [[testo]] = approfondimento (non è in nessuno dei libri di testo)
  const SPAN_EXTRA = '<span class="extra" title="Approfondimento: non è nei libri di testo">$1</span>';
  const marcaExtra = html => html.replace(/\[\[(.+?)\]\]/g, SPAN_EXTRA);
  // testo semplice -> HTML: **parola chiave** e [[approfondimento]]
  const ricco = t => marcaExtra(esc(t).replace(/\*\*(.+?)\*\*/g, '<b class="kw" tabindex="0">$1</b>'));
  const BADGE_EXTRA = '<span class="badge-extra">📚 Approfondimento – non è nei libri</span>';
  const NOTA_EXTRA = '<p class="nota-extra"><span class="extra-icona">📚</span> = approfondimento: non è nei libri di testo</p>';

  function showHome() {
    modoStudio(false);
    fermaCrono();
    attivo = null;
    refreshIcons();
    const sezioni = window.SCHEDA.map((s, i) =>
      `<details class="sec"${i === 0 ? " open" : ""}><summary>${s.titolo}</summary><div class="body">${marcaExtra(s.html)}</div></details>`
    ).join("");

    const gruppi = Object.entries(CAT).map(([key, c]) => {
      const items = LUOGHI.filter(l => l.cat === key)
        .map(l => `<button class="place-btn" style="--c:${c.colore}" data-id="${l.id}">${esc(l.nome)}${l.extra ? ' <span title="Approfondimento: non è nei libri di testo">📚</span>' : ""}</button>`).join("");
      return `<div class="place-group"><h4>${c.icona} ${c.nome}</h4><div class="place-list">${items}</div></div>`;
    }).join("");

    // Domande e risposte: la risposta si apre toccando la domanda
    let nq = 0;
    const qa = window.DOMANDE_RISPOSTE.map(g => `<h4 class="qa-gruppo">${g.gruppo}</h4>` +
      g.domande.map(q => `<details class="qa"><summary><span class="qa-n">${++nq}.</span> ${esc(q.d)}</summary><p>${ricco(q.r)}</p></details>`).join("")
    ).join("");
    const sezioneQA = `
      <details class="sec sec-qa"><summary>📝 Domande e risposte</summary><div class="body">
        <p class="hint">Prova a rispondere da solo/a, poi tocca la domanda per vedere la risposta.</p>
        <div class="qa-azioni">
          <button class="btn btn-ghost btn-small" id="qa-tutte">Mostra tutte le risposte</button>
          <button class="btn btn-small" id="qa-flash">🃏 Ripassa con le flashcard</button>
        </div>
        ${qa}
      </div></details>`;

    panel.innerHTML = `
      <h2>${esc(maiuscola(R.con_articolo))}</h2>
      <p class="sub">${esc(R.sottotitolo)}</p>
      <button class="btn tour-avvia" id="tour-avvia">▶ Visita guidata della regione</button>
      <p class="hint">👆 Clicca un pallino sulla mappa (o un nome nell'elenco dei luoghi) per leggere la sua scheda. Avvicinati con lo zoom per vedere i nomi. Clicca anche la linea blu del fiume!</p>
      ${NOTA_EXTRA}
      ${sezioni}
      ${sezioneQA}
      <details class="sec places"><summary>📍 Tutti i luoghi della mappa</summary><div class="body">${gruppi}</div></details>`;
    panel.querySelectorAll(".place-btn").forEach(b => b.addEventListener("click", () => select(b.dataset.id)));
    panel.querySelector("#qa-flash").addEventListener("click", () => startFlash());
    panel.querySelector("#tour-avvia").addEventListener("click", startTour);
    const tutte = panel.querySelector("#qa-tutte");
    tutte.addEventListener("click", () => {
      const apri = tutte.textContent.startsWith("Mostra");
      panel.querySelectorAll("details.qa").forEach(d => { d.open = apri; });
      tutte.textContent = apri ? "Nascondi tutte le risposte" : "Mostra tutte le risposte";
    });
    panel.scrollTop = 0;
  }

  function showPlace(l, idx) {
    const c = CAT[l.cat];
    const nav = idx === null ? "" : `
      <div class="nav-row">
        <button class="btn btn-ghost btn-small" data-go="${(idx - 1 + LUOGHI.length) % LUOGHI.length}">← Precedente</button>
        <button class="btn btn-ghost btn-small" data-go="${(idx + 1) % LUOGHI.length}">Successivo →</button>
      </div>`;
    panel.innerHTML = `
      <button class="btn btn-ghost btn-small back" id="back">← Torna alla regione</button>
      <div><span class="badge" style="--c:${c.colore}">${c.icona} ${c.nome}</span></div>
      <h2>${esc(l.nome)}</h2>
      ${l.extra ? BADGE_EXTRA : ""}
      <p class="sub">${esc(l.sottotitolo)}</p>
      <p>${ricco(l.testo)}</p>
      <div class="facts"><h3>Informazioni principali</h3><ul>${l.punti.map(p => `<li>${ricco(p)}</li>`).join("")}</ul></div>
      <div class="remember"><small>Da ricordare</small>${esc(l.ricorda)}</div>
      ${!l.extra && (l.testo + l.punti.join("")).includes("[[") ? NOTA_EXTRA : ""}
      ${nav}`;
    panel.querySelector("#back").addEventListener("click", goHome);
    panel.querySelectorAll("[data-go]").forEach(b => b.addEventListener("click", () => select(LUOGHI[+b.dataset.go].id)));
    panel.scrollTop = 0;
  }

  function select(id) {
    if (domande.on || flash.on || interr.on || tour.on) return;   // in modalità studio e nella visita la scheda non si apre
    const idx = LUOGHI.findIndex(l => l.id === id);
    if (idx < 0) return;
    const l = LUOGHI[idx];
    if (!visibili.has(l.cat)) {               // se la categoria era nascosta, la riattiva
      visibili.add(l.cat);
      legendBtns[l.cat].setAttribute("aria-pressed", "true");
      applyFilters();
    }
    attivo = id;
    refreshIcons();
    showPlace(l, idx);
    map.flyTo([l.lat, l.lng], Math.max(map.getZoom(), 11), { duration: 0.6 });
    if (window.matchMedia("(max-width: 820px)").matches) panel.scrollIntoView({ behavior: "smooth" });
  }

  function goHome() {
    showHome();
    map.flyToBounds(bounds, Object.assign({ duration: 0.6 }, FIT));
  }

  document.getElementById("btn-home").addEventListener("click", () => {
    if (tour.on) return stopTour();
    if (quiz.on) stopQuiz();
    domande.on = flash.on = interr.on = false;
    goHome();
  });

  /* ---------------- Quiz ---------------- */
  // Bersagli del quiz che non sono pallini: il fiume principale e le zone della regione (regione.js, zone.js)
  const EXTRA = [
    { id: "fiume", nome: R.fiume.nome, con_articolo: R.fiume.con_articolo, cat: "natura", tipo: "fiume",
      lat: R.fiume.etichetta[0], lng: R.fiume.etichetta[1], aiuto: "clicca sul fiume", ricorda: R.fiume.ricorda },
    ...(R.zone || []).map(z => ({ id: z.id, nome: z.nome, con_articolo: z.con_articolo, plurale: z.plurale, colore: z.colore,
      cat: z.cat || "montagne", tipo: "zona", gruppo: z.gruppo || "", lat: z.etichetta[0], lng: z.etichetta[1],
      aiuto: "clicca sulla zona della cartina", ricorda: z.ricorda }))
  ];
  const FIUME = EXTRA[0];
  const ZONE_QUIZ = EXTRA.filter(x => x.tipo === "zona");

  function dentroAnello(ll, anello) {          // anello: [[lng, lat], ...]
    let c = false;
    for (let a = 0, b = anello.length - 1; a < anello.length; b = a++) {
      const [xa, ya] = anello[a], [xb, yb] = anello[b];
      if ((ya > ll.lat) !== (yb > ll.lat) && ll.lng < (xb - xa) * (ll.lat - ya) / (yb - ya) + xa) c = !c;
    }
    return c;
  }
  function dentroGeom(ll, g) {
    const poligoni = g.type === "Polygon" ? [g.coordinates] : g.coordinates;
    return poligoni.some(p => dentroAnello(ll, p[0]) && !p.slice(1).some(buco => dentroAnello(ll, buco)));
  }
  // la zona cliccata, cercata tra quelle dello stesso gruppo della domanda (es. montagna/collina, oppure le Riviere)
  const zonaDi = (ll, t) => ZONE_QUIZ.filter(z => z.gruppo === t.gruppo).map(z => z.id)
    .find(id => window.ZONE[id] && dentroGeom(ll, window.ZONE[id])) || null;

  // mostra per un attimo in verde la zona o il fiume
  let evidenziato = null;
  function evidenzia(t) {
    if (evidenziato) map.removeLayer(evidenziato);
    evidenziato = t.tipo === "zona"
      ? L.geoJSON(window.ZONE[t.id], { style: { color: "#15803d", weight: 2, fillColor: "#22c55e", fillOpacity: 0.35, interactive: false } })
      : L.polyline(window.FIUMI.principale, { color: "#22c55e", weight: 10, opacity: 0.85, interactive: false });
    const questo = evidenziato.addTo(map);
    setTimeout(() => { if (evidenziato === questo) { map.removeLayer(questo); evidenziato = null; } }, 2500);
  }
  const descrivi = l => l.con_articolo || l.nome;
  const dovEra = t => markers[t.id] ? `${t.nome} è il pallino verde.`
    : `${maiuscola(descrivi(t))} ${t.plurale ? "sono" : "è"} ${t.tipo === "zona" ? "la zona verde" : "la linea verde"}.`;
  function rivela(t) {
    if (markers[t.id]) quiz.marks[t.id] = "correct"; else evidenzia(t);
    map.panTo([t.lat, t.lng]);
  }

  // clic sulla cartina (non su un pallino) durante il quiz
  function quizClicMappa(ll, sulFiume) {
    const t = quiz.order[quiz.i];
    if (!t) return;
    if (t.tipo === "zona") {
      const z = zonaDi(ll, t);
      if (!z) {
        const scelte = ZONE_QUIZ.filter(x => x.gruppo === t.gruppo);
        qFb.className = "quiz-feedback ko";
        qFb.textContent = scelte.length > 1 && t.gruppo
          ? `Lì non c'è nessuna di queste zone: ${scelte.map(x => x.nome).join(", ")}. Riprova!`
          : `Clicca dentro ${R.con_articolo}.`;
        return;
      }
      return quizAnswer(EXTRA.find(x => x.id === z));
    }
    if (sulFiume) quizAnswer(FIUME);      // ha cliccato il fiume principale
  }
  map.on("click", e => { if (quiz.on) quizClicMappa(e.latlng, false); });

  const qbar = document.getElementById("quizbar");
  const qTarget = document.getElementById("quiz-target");
  const qScore = document.getElementById("quiz-score");
  const qFb = document.getElementById("quiz-feedback");
  L.DomEvent.disableClickPropagation(qbar);

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }

  function startQuiz() {
    if (![...LUOGHI, ...EXTRA].some(l => visibili.has(l.cat))) {
      panel.innerHTML = `
        <button class="btn btn-ghost btn-small back" id="back">← Indietro</button>
        <h2>🗺️ Dov'è?</h2>
        <p>Tutti i luoghi sono spenti. Accendi almeno una categoria nella <b>legenda</b> (oppure tocca <b>Tutti i luoghi</b>) e riprova.</p>`;
      panel.querySelector("#back").addEventListener("click", showQuizMenu);
      return;
    }
    Object.assign(quiz, { on: true, order: shuffle([...LUOGHI, ...EXTRA].filter(l => visibili.has(l.cat))), i: 0, ok: 0, done: 0, marks: {}, tries: 0 });
    document.body.classList.add("quiz-on");
    qbar.hidden = false;
    applyFilters();
    refreshIcons();
    // in basso c'è la barra del quiz: si lascia spazio, così nessun pallino resta coperto
    const alto = qbar.offsetHeight || 90;
    map.flyToBounds(bounds, Object.assign({ duration: 0.6 }, FIT, {
      paddingTopLeft: FIT.paddingTopLeft || FIT.padding, paddingBottomRight: [20, alto + 40], padding: null }));
    panel.innerHTML = `
      <h2>🎯 Quiz: dov'è?</h2>
      <p class="sub">Esercitati per l'interrogazione.</p>
      <p>In basso sulla mappa compare il nome di un luogo: clicca il pallino giusto. Hai <b>due tentativi</b> per ogni luogo.</p>
      <p>Ci sono anche ${esc(FIUME.con_articolo)} (clicca sul fiume)${ZONE_QUIZ.length ? ` e ${ZONE_QUIZ.map(z => `<b>${esc(z.nome)}</b>`).join(", ")} (clicca sulla zona della cartina dove si trovano)` : ""}.</p>
      <p class="hint">Ci sono solo i luoghi delle categorie accese nella legenda.</p>
      <p class="hint">I pallini sono tutti grigi e senza icona, così non puoi barare! 😉</p>`;
    nextQuestion();
  }

  function nextQuestion() {
    if (quiz.i >= quiz.order.length) return endQuiz();
    quiz.tries = 0;
    const t = quiz.order[quiz.i];
    qTarget.innerHTML = esc(t.nome) + (t.aiuto ? ` <small class="quiz-aiuto">(${t.aiuto})</small>` : "");
    qScore.textContent = `${quiz.ok} / ${quiz.done}`;
  }

  function quizAnswer(l) {
    const target = quiz.order[quiz.i];
    if (!target || (markers[l.id] && quiz.marks[l.id] === "correct")) return;
    if (l.id === target.id) {
      if (markers[l.id]) quiz.marks[l.id] = "correct"; else evidenzia(target);
      if (quiz.tries === 0) quiz.ok++;
      quiz.done++;
      qFb.className = "quiz-feedback ok";
      qFb.textContent = `✔ Giusto! ${target.nome}: ${target.ricorda}`;
      advance();
    } else {
      quiz.tries++;
      if (markers[l.id]) {
        quiz.marks[l.id] = "wrong";
        refreshIcons();
        setTimeout(() => { if (quiz.marks[l.id] === "wrong") { delete quiz.marks[l.id]; refreshIcons(); } }, 700);
      }
      if (quiz.tries >= 2) {
        quiz.done++;
        rivela(target);
        qFb.className = "quiz-feedback ko";
        qFb.textContent = `✘ No: hai cliccato ${descrivi(l)}. ${dovEra(target)}`;
        advance();
      } else {
        qFb.className = "quiz-feedback ko";
        qFb.textContent = `✘ Hai cliccato ${descrivi(l)}. Riprova!`;
      }
    }
  }

  function advance() {
    refreshIcons();
    quiz.i++;
    nextQuestion();
  }

  function endQuiz() {
    qTarget.textContent = "Finito!";
    qScore.textContent = `${quiz.ok} / ${quiz.done}`;
    const pct = quiz.done ? Math.round((quiz.ok / quiz.done) * 100) : 0;
    const msg = pct >= 90 ? "Bravissimo/a, sei pronto/a per l'interrogazione! 🏆" : pct >= 60 ? "Buon lavoro! Ripassa i luoghi che hai sbagliato. 👍" : "Ripassa le schede e riprova! 💪";
    qFb.className = "quiz-feedback ok";
    qFb.textContent = `Hai indovinato ${quiz.ok} luoghi su ${quiz.done} al primo colpo (${pct}%). ${msg}`;
  }

  function stopQuiz() {
    quiz.on = false;
    if (evidenziato) { map.removeLayer(evidenziato); evidenziato = null; }
    document.body.classList.remove("quiz-on");
    qbar.hidden = true;
    qFb.textContent = "";
    applyFilters();
    showHome();
  }

  /* ---------------- Menu del quiz e modalità "Domande" ---------------- */
  // sul telefono il pannello è sotto la cartina: ci si scorre sopra da soli
  function mostraPannello() {
    if (window.matchMedia("(max-width: 820px)").matches) panel.scrollIntoView({ behavior: "smooth" });
  }
  // modalità studio (flashcard e domande): sul telefono la cartina si rimpicciolisce
  function modoStudio(on) {
    if (document.body.classList.contains("studio") === on) return;
    document.body.classList.toggle("studio", on);
    setTimeout(() => map.invalidateSize(), 60);
  }

  function showQuizMenu() {
    modoStudio(false);
    attivo = null;
    refreshIcons();
    panel.innerHTML = `
      <button class="btn btn-ghost btn-small back" id="back">← Torna alla regione</button>
      <h2>🎯 Esercitati</h2>
      <p class="sub">Scegli come vuoi ripassare.</p>
      <button class="quiz-card" id="q-dove"><span>🗺️</span><b>Dov'è?</b><small>Compare il nome di un luogo: trovalo sulla cartina.</small></button>
      <button class="quiz-card" id="q-domande"><span>❓</span><b>Domande e vero/falso</b><small>Come gli esercizi del libro: "Osserva la carta e rispondi".</small></button>
      <button class="quiz-card" id="q-flash"><span>🃏</span><b>Flashcard</b><small>Leggi la domanda, rispondi a voce, poi gira la carta.</small></button>
      <button class="quiz-card" id="q-interr"><span>🎤</span><b>Interrogazione</b><small>Il discorso da dire e una simulazione con le domande dell'insegnante.</small></button>`;
    panel.querySelector("#back").addEventListener("click", goHome);
    panel.querySelector("#q-dove").addEventListener("click", startQuiz);
    panel.querySelector("#q-domande").addEventListener("click", startDomande);
    panel.querySelector("#q-flash").addEventListener("click", () => startFlash());
    panel.querySelector("#q-interr").addEventListener("click", () => startInterr("discorso"));
    panel.scrollTop = 0;
    mostraPannello();
  }

  const QUANTE = 12;   // domande per partita
  function startDomande() {
    // almeno una domanda per ogni sezione della scheda, poi le altre a caso
    const perSezione = {};
    window.DOMANDE.forEach(q => (perSezione[q.sez] = perSezione[q.sez] || []).push(q));
    const una = window.SEZIONI_DOMANDE.map(sz => perSezione[sz] && shuffle(perSezione[sz].slice())[0]).filter(Boolean);
    const altre = shuffle(window.DOMANDE.filter(q => !una.includes(q))).slice(0, Math.max(0, QUANTE - una.length));
    Object.assign(domande, { on: true, elenco: shuffle(una.concat(altre)), i: 0, ok: 0, risposto: false });
    flash.on = interr.on = false;
    fermaCrono();
    modoStudio(true);
    attivo = null;
    refreshIcons();
    renderDomanda();
    mostraPannello();
  }

  function renderDomanda() {
    const q = domande.elenco[domande.i];
    const opzioni = q.tipo === "vf" ? ["Vero", "Falso"] : q.opzioni;
    panel.innerHTML = `
      <button class="btn btn-ghost btn-small back" id="back">← Esci</button>
      <h2>❓ Domande</h2>
      <p class="sub">Domanda ${domande.i + 1} di ${domande.elenco.length} · Risposte giuste: ${domande.ok}</p>
      <div class="qbar"><span style="width:${(domande.i / domande.elenco.length) * 100}%"></span></div>
      ${q.tipo === "vf" ? '<p class="qtipo">Vero o falso?</p>' : ""}
      ${q.extra ? BADGE_EXTRA : ""}
      <p class="qtesto">${esc(q.d)}</p>
      <div class="qopts">${opzioni.map((o, k) => `<button class="qopt" data-k="${k}">${esc(o)}</button>`).join("")}</div>
      <div class="qfb" aria-live="polite"></div>
      <button class="btn qnext" hidden>${domande.i + 1 < domande.elenco.length ? "Avanti →" : "Vedi il risultato"}</button>`;
    panel.querySelector("#back").addEventListener("click", () => { domande.on = false; goHome(); });
    const giusta = q.tipo === "vf" ? (q.vero ? 0 : 1) : q.giusta;
    panel.querySelectorAll(".qopt").forEach(b => b.addEventListener("click", () => {
      if (domande.risposto) return;
      domande.risposto = true;
      const k = +b.dataset.k, bene = k === giusta;
      if (bene) domande.ok++;
      panel.querySelectorAll(".qopt").forEach(x => {
        x.disabled = true;
        if (+x.dataset.k === giusta) x.classList.add("ok");
      });
      if (!bene) b.classList.add("ko");
      const fb = panel.querySelector(".qfb");
      fb.className = "qfb " + (bene ? "ok" : "ko");
      fb.innerHTML = `<b>${bene ? "✔ Giusto!" : "✘ Non è giusto."}</b> ${ricco(q.spiega)}`;
      const next = panel.querySelector(".qnext");
      next.hidden = false;
      next.focus();
    }));
    panel.querySelector(".qnext").addEventListener("click", () => {
      domande.i++;
      domande.risposto = false;
      if (domande.i < domande.elenco.length) renderDomanda(); else fineDomande();
    });
    panel.scrollTop = 0;
  }

  function fineDomande() {
    const n = domande.elenco.length, pct = Math.round((domande.ok / n) * 100);
    const msg = pct >= 90 ? "Bravissimo/a, sei pronto/a per l'interrogazione! 🏆" : pct >= 60 ? "Buon lavoro! Ripassa le schede delle domande sbagliate. 👍" : "Ripassa la scheda della regione e riprova! 💪";
    panel.innerHTML = `
      <h2>❓ Risultato</h2>
      <p class="qrisultato"><b>${domande.ok}</b> su ${n}</p>
      <p>${msg}</p>
      <div class="nav-row">
        <button class="btn btn-ghost btn-small" id="q-home">← Torna alla regione</button>
        <button class="btn btn-small" id="q-ancora">Altre domande</button>
      </div>`;
    panel.querySelector("#q-home").addEventListener("click", () => { domande.on = false; goHome(); });
    panel.querySelector("#q-ancora").addEventListener("click", startDomande);
  }

  /* ---------------- Interrogazione: discorso e simulazione ---------------- */
  // **parola** -> parola chiave (si può nascondere per ripassare)
  const conChiavi = ricco;

  function fermaCrono() {
    if (interr.crono) { clearInterval(interr.crono); interr.crono = null; }
  }

  function startInterr(scheda) {
    domande.on = flash.on = false;
    const passi = [];
    window.FLUSSO.forEach(f => f.domande.forEach(q => passi.push(Object.assign({ fase: f.fase }, q))));
    Object.assign(interr, { on: true, scheda, passi, i: 0 });
    modoStudio(true);
    attivo = null;
    refreshIcons();
    renderInterr();
    mostraPannello();
  }

  function renderInterr() {
    fermaCrono();
    const tab = (id, t) => `<button class="tab" data-tab="${id}" aria-pressed="${interr.scheda === id}">${t}</button>`;
    panel.innerHTML = `
      <button class="btn btn-ghost btn-small back" id="back">← Esci</button>
      <h2>🎤 Interrogazione</h2>
      <div class="tabs" role="group" aria-label="Parti dell'interrogazione">${tab("discorso", "📜 Il discorso")}${tab("simulazione", "🔁 Simulazione")}</div>
      <div id="interr-corpo"></div>`;
    panel.querySelector("#back").addEventListener("click", () => { interr.on = false; goHome(); });
    panel.querySelectorAll(".tab").forEach(b => b.addEventListener("click", () => { interr.scheda = b.dataset.tab; renderInterr(); }));
    if (interr.scheda === "discorso") renderDiscorso(); else renderSimulazione();
    panel.scrollTop = 0;
  }

  function renderDiscorso() {
    const corpo = panel.querySelector("#interr-corpo");
    corpo.innerHTML = `
      <p class="hint">Si dice in circa 3–4 minuti. Le parole evidenziate sono le <b>parole chiave</b>: se le dici, l'insegnante capisce che hai studiato.</p>
      <div class="discorso-azioni">
        <button class="btn btn-ghost btn-small" id="kw-toggle">${interr.nascondi ? "👁️ Mostra le parole chiave" : "🙈 Nascondi le parole chiave"}</button>
        <button class="btn btn-ghost btn-small" id="crono-btn">⏱️ Cronometro</button>
        <span class="crono" id="crono-t" aria-live="off">0:00</span>
      </div>
      <p class="hint kw-hint" ${interr.nascondi ? "" : "hidden"}>Leggi ad alta voce e prova a dire le parole mancanti, poi toccale per controllare.</p>
      <div class="discorso${interr.nascondi ? " nascondi" : ""}">
        ${window.DISCORSO.map(p => `<h4>${esc(p.titolo)}</h4><p>${conChiavi(p.testo)}</p>`).join("")}
      </div>
      <details class="sec"><summary>⚠️ Domande trabocchetto</summary><div class="body">
        <table class="trab">${window.TRABOCCHETTI.map(([d, r]) => `<tr><td>${esc(d)}</td><td>${conChiavi(r)}</td></tr>`).join("")}</table>
      </div></details>
      <details class="sec"><summary>💡 Consigli</summary><div class="body">
        <ul>${window.CONSIGLI.map(c => `<li>${conChiavi(c)}</li>`).join("")}</ul>
      </div></details>
      <button class="btn" id="vai-sim">Prova la simulazione →</button>`;
    corpo.querySelector("#kw-toggle").addEventListener("click", () => { interr.nascondi = !interr.nascondi; renderInterr(); });
    corpo.querySelectorAll(".discorso .kw").forEach(k => {
      const scopri = () => k.classList.add("vista");
      k.addEventListener("click", scopri);
      k.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); scopri(); } });
    });
    const btn = corpo.querySelector("#crono-btn"), out = corpo.querySelector("#crono-t");
    btn.addEventListener("click", () => {
      if (interr.crono) { fermaCrono(); btn.textContent = "⏱️ Ricomincia"; return; }
      interr.inizio = Date.now();
      out.textContent = "0:00";
      btn.textContent = "⏹️ Ferma";
      interr.crono = setInterval(() => {
        const sec = Math.floor((Date.now() - interr.inizio) / 1000);
        out.textContent = `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;
      }, 250);
    });
    corpo.querySelector("#vai-sim").addEventListener("click", () => { interr.scheda = "simulazione"; interr.i = 0; renderInterr(); });
  }

  // mostra sulla cartina il punto di cui parla la domanda
  function mostraSullaMappa(m) {
    if (!m) return;
    if (m.tipo === "regione") map.flyToBounds(bounds, Object.assign({ duration: 0.6 }, FIT));
    else if (m.tipo === "fiume") { evidenzia(FIUME); map.flyToBounds(bounds, Object.assign({ duration: 0.6 }, FIT)); }
    else if (m.tipo === "zona") { evidenzia(EXTRA.find(x => x.id === m.id)); map.flyToBounds(bounds, Object.assign({ duration: 0.6 }, FIT)); }
    else if (m.tipo === "luogo") {
      const l = LUOGHI.find(x => x.id === m.id);
      if (!l) return;
      if (!visibili.has(l.cat)) { visibili.add(l.cat); legendBtns[l.cat].setAttribute("aria-pressed", "true"); applyFilters(); }
      attivo = l.id;
      refreshIcons();
      map.flyTo([l.lat, l.lng], Math.max(map.getZoom(), 10), { duration: 0.6 });
    }
  }

  function renderSimulazione() {
    const corpo = panel.querySelector("#interr-corpo");
    const n = interr.passi.length;
    if (interr.i >= n) {
      corpo.innerHTML = `
        <p class="qrisultato">🎉</p>
        <p><b>Hai fatto tutta l'interrogazione!</b> Se qualche risposta non la sapevi, rileggi il discorso e riprova.</p>
        <div class="nav-row">
          <button class="btn btn-ghost btn-small" id="sim-discorso">📜 Rileggi il discorso</button>
          <button class="btn btn-small" id="sim-ancora">Ricomincia</button>
        </div>`;
      corpo.querySelector("#sim-discorso").addEventListener("click", () => { interr.scheda = "discorso"; renderInterr(); });
      corpo.querySelector("#sim-ancora").addEventListener("click", () => { interr.i = 0; renderInterr(); });
      return;
    }
    const q = interr.passi[interr.i];
    const badge = q.tipo === "trabocchetto" ? '<span class="sim-badge trab">⚠️ Trabocchetto</span>'
      : q.tipo === "ragionamento" ? '<span class="sim-badge rag">💭 Ragionamento</span>' : "";
    corpo.innerHTML = `
      <p class="sub">Domanda ${interr.i + 1} di ${n}</p>
      <div class="qbar"><span style="width:${(interr.i / n) * 100}%"></span></div>
      <div class="sim-fase">${q.fase}</div>
      <div class="sim-domanda${q.seguito ? " seguito" : ""}">
        <span class="sim-chi">👩‍🏫 ${q.seguito ? "E subito dopo l'insegnante chiede:" : "L'insegnante chiede:"}</span>
        <p>${esc(q.d)}</p>${badge}
      </div>
      <p class="hint">Rispondi a voce, poi controlla.</p>
      <button class="btn" id="sim-mostra">Mostra la risposta</button>
      <div class="sim-risposta" hidden><span>✅ Risposta</span><p>${ricco(q.r)}</p>${q.mappa ? '<small>👀 Guarda la cartina</small>' : ""}</div>
      <div class="nav-row">
        <button class="btn btn-ghost btn-small" id="sim-prima" ${interr.i ? "" : "disabled"}>← Indietro</button>
        <button class="btn btn-small" id="sim-dopo">${interr.i + 1 < n ? "Avanti →" : "Fine"}</button>
      </div>`;
    corpo.querySelector("#sim-mostra").addEventListener("click", e => {
      corpo.querySelector(".sim-risposta").hidden = false;
      e.currentTarget.hidden = true;
      mostraSullaMappa(q.mappa);
    });
    corpo.querySelector("#sim-prima").addEventListener("click", () => { interr.i--; attivo = null; refreshIcons(); renderInterr(); });
    corpo.querySelector("#sim-dopo").addEventListener("click", () => { interr.i++; attivo = null; refreshIcons(); renderInterr(); });
  }

  /* ---------------- Flashcard ---------------- */
  function startFlash(gruppo = null, soloQueste = null) {
    const tutte = [];
    window.FLASHCARD.forEach(g => g.carte.forEach(c => tutte.push(Object.assign({ gruppo: g.gruppo }, c))));
    const mazzo = soloQueste || tutte.filter(c => !gruppo || c.gruppo === gruppo);
    Object.assign(flash, { on: true, gruppo, mazzo, coda: shuffle(mazzo.slice()), sapute: 0, primoColpo: 0, sbagliate: new Set() });
    domande.on = interr.on = false;
    fermaCrono();
    modoStudio(true);
    attivo = null;
    refreshIcons();
    renderFlash();
    mostraPannello();
  }

  function renderFlash() {
    if (!flash.coda.length) return fineFlash();
    const c = flash.coda[0], tot = flash.mazzo.length;
    const filtri = [null, ...window.FLASHCARD.map(g => g.gruppo)].map(g =>
      `<button class="chip-f" data-g="${g || ""}" aria-pressed="${g === flash.gruppo}">${g || "Tutte"}</button>`).join("");
    panel.innerHTML = `
      <button class="btn btn-ghost btn-small back" id="back">← Esci</button>
      <h2>🃏 Flashcard</h2>
      <div class="flash-filtri" role="group" aria-label="Scegli l'argomento">${filtri}</div>
      <p class="sub">Sapute ${flash.sapute} su ${tot}${flash.coda.length > 1 ? ` · ne restano ${flash.coda.length}` : " · ultima carta!"}</p>
      <div class="qbar"><span style="width:${(flash.sapute / tot) * 100}%"></span></div>
      <button class="flashcard" aria-label="Gira la carta">
        <span class="flash-face flash-front"><small>${c.gruppo}</small><b>${esc(c.f)}</b><em>Rispondi a voce, poi tocca per girare</em></span>
        <span class="flash-face flash-back" aria-hidden="true"><small>Risposta</small><b>${ricco(c.r)}</b><em>Tocca per rigirare</em></span>
      </button>
      <div class="flash-azioni" hidden>
        <button class="btn btn-ghost" id="f-ko">↻ Da ripassare</button>
        <button class="btn btn-ok" id="f-ok">✔ Lo sapevo</button>
      </div>`;
    panel.querySelector("#back").addEventListener("click", () => { flash.on = false; goHome(); });
    panel.querySelectorAll(".chip-f").forEach(b => b.addEventListener("click", () => startFlash(b.dataset.g || null)));
    const carta = panel.querySelector(".flashcard"), azioni = panel.querySelector(".flash-azioni");
    carta.addEventListener("click", () => {
      const girata = carta.classList.toggle("girata");
      carta.querySelector(".flash-front").setAttribute("aria-hidden", String(girata));
      carta.querySelector(".flash-back").setAttribute("aria-hidden", String(!girata));
      carta.setAttribute("aria-label", girata ? "Rigira la carta" : "Gira la carta");
      azioni.hidden = false;
    });
    panel.querySelector("#f-ok").addEventListener("click", () => {
      if (!flash.sbagliate.has(c.f)) flash.primoColpo++;
      flash.sapute++;
      flash.coda.shift();
      renderFlash();
    });
    panel.querySelector("#f-ko").addEventListener("click", () => {
      flash.sbagliate.add(c.f);
      flash.coda.push(flash.coda.shift());   // torna in fondo al mazzo
      renderFlash();
    });
  }

  function fineFlash() {
    const tot = flash.mazzo.length, da = flash.mazzo.filter(c => flash.sbagliate.has(c.f));
    panel.innerHTML = `
      <h2>🃏 Mazzo finito!</h2>
      <p class="qrisultato"><b>${flash.primoColpo}</b> su ${tot}</p>
      <p>carte che sapevi già la prima volta.${da.length ? "" : " Le sapevi tutte! 🏆"}</p>
      ${da.length ? `<p class="hint">Le hai ripassate tutte, ma queste all'inizio non le sapevi:</p>
        <ul class="flash-lista">${da.map(c => `<li>${esc(c.f)}</li>`).join("")}</ul>` : ""}
      <div class="nav-row">
        <button class="btn btn-ghost btn-small" id="f-home">← Torna alla regione</button>
        ${da.length ? `<button class="btn btn-small" id="f-sbagliate">Ripassa solo queste (${da.length})</button>` : ""}
        <button class="btn btn-small" id="f-ancora">Ricomincia</button>
      </div>`;
    panel.querySelector("#f-home").addEventListener("click", () => { flash.on = false; goHome(); });
    panel.querySelector("#f-ancora").addEventListener("click", () => startFlash(flash.gruppo));
    if (da.length) panel.querySelector("#f-sbagliate").addEventListener("click", () => startFlash(flash.gruppo, da));
    panel.scrollTop = 0;
  }

  document.getElementById("btn-quiz").addEventListener("click", () => {
    if (tour.on) { stopTour(); showQuizMenu(); return; }
    if (quiz.on) stopQuiz();
    else if (domande.on || flash.on || interr.on) { domande.on = flash.on = interr.on = false; goHome(); }
    else showQuizMenu();
  });
  document.getElementById("quiz-stop").addEventListener("click", stopQuiz);
  document.getElementById("quiz-skip").addEventListener("click", () => {
    if (!quiz.on || quiz.i >= quiz.order.length) return;
    const t = quiz.order[quiz.i];
    quiz.done++;
    rivela(t);
    qFb.className = "quiz-feedback ko";
    qFb.textContent = `Saltato: ${dovEra(t)}`;
    advance();
  });

  /* ---------------- Visita guidata ---------------- */
  map.createPane("tour").style.zIndex = 640;
  map.getPane("tour").style.pointerEvents = "none";
  const tourLayer = L.layerGroup().addTo(map);
  const pocoMoto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Voce della visita: registrata una volta sola (voce "Paola", tools/genera_audio.py), uguale su ogni dispositivo
  const AUDIO_V = 2;
  const audioTour = new Audio();
  audioTour.preload = "auto";

  const BottoneTour = L.Control.extend({
    options: { position: "bottomleft" },
    onAdd() {
      const b = L.DomUtil.create("button", "tour-btn");
      b.innerHTML = "▶ Visita guidata";
      b.title = "Una visita animata alle parti principali della regione";
      b.addEventListener("click", () => (tour.on ? stopTour() : startTour()));
      L.DomEvent.disableClickPropagation(b);
      return b;
    }
  });
  new BottoneTour().addTo(map);

  const dopo = (ms, f) => tour.timers.push(setTimeout(f, ms));
  function pulisciTour() {
    clearTimeout(tour.timer);
    tour.timer = null;
    tour.timers.forEach(clearTimeout);
    tour.timers = [];
    if (tour.raf) cancelAnimationFrame(tour.raf);
    tour.raf = null;
    tourLayer.clearLayers();
    map.getContainer().classList.remove("tour-confini");
    audioTour.pause();
  }

  function startTour() {
    if (quiz.on) stopQuiz();
    domande.on = flash.on = interr.on = false;
    fermaCrono();
    modoStudio(false);
    Object.assign(tour, { on: true, i: 0, play: true, cartaPrima: cartaAttiva });
    attivo = null;
    refreshIcons();
    document.body.classList.add("tour-on");
    setTimeout(() => map.invalidateSize(), 60);
    renderTappa();
    // sul telefono: torna in cima, così si vedono la cartina e la spiegazione
    if (small) window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function stopTour() {
    pulisciTour();
    tour.on = false;
    document.body.classList.remove("tour-on");
    setTimeout(() => map.invalidateSize(), 60);
    if (tour.cartaPrima && tour.cartaPrima !== cartaAttiva) mostraCarta(tour.cartaPrima, false);
    goHome();
  }

  // dove va la cartina in ogni tappa
  function vaiA(t) {
    const anima = !pocoMoto, opz = { duration: 1.4 };
    const centro = (ll, z) => anima ? map.flyTo(ll, z, opz) : map.setView(ll, z, { animate: false });
    const inquadra = (b, extra) => anima ? map.flyToBounds(b, Object.assign({}, FIT, extra, opz)) : map.fitBounds(b, Object.assign({}, FIT, extra));
    if (t.vista === "larga") {
      // la vista più larga possibile senza uscire dall'area della cartina; se la regione è grande
      // (e quella vista la taglierebbe) si inquadra semplicemente tutta la regione
      const pad = FIT.padding ? L.point(FIT.padding).multiplyBy(2) : L.point(FIT.paddingTopLeft).add(FIT.paddingBottomRight);
      const zRegione = map.getBoundsZoom(bounds, false, pad);
      const zArea = Math.max(map.getMinZoom(), Math.ceil(map.getBoundsZoom(AREA_LARGA, true) * 4) / 4);
      if (zArea >= zRegione) inquadra(bounds);
      else centro(AREA_LARGA.getCenter(), zArea);
    }
    else if (t.vista === "regione") inquadra(bounds);
    else {
      const ll = t.vista.map(id => LUOGHI.find(l => l.id === id)).map(l => [l.lat, l.lng]);
      if (ll.length === 1) centro(ll[0], t.zoom || 11);
      else inquadra(L.latLngBounds(ll).pad(0.8), { maxZoom: 11 });
    }
  }

  const etichettaTour = (ll, html, cls) => L.marker(ll, {
    pane: "tour", interactive: false, keyboard: false,
    icon: L.divIcon({ className: "", iconSize: [0, 0], html: `<div class="${cls}">${html}</div>` })
  }).addTo(tourLayer);

  function luce(l) {
    etichettaTour([l.lat, l.lng], `<span></span><b>${CAT[l.cat].icona} ${esc(l.nome)}</b>`, "tour-luce");
  }

  function zona(id) {
    const c = EXTRA.find(x => x.id === id), colore = c.colore || "#7c3aed";
    L.geoJSON(window.ZONE[id], { pane: "tour", style: { color: colore, weight: 3, fillColor: colore, fillOpacity: 0.32, className: "tour-zona" } }).addTo(tourLayer);
    etichettaTour([c.lat, c.lng], c.nome.toUpperCase(), "tour-zona-nome");
  }

  function disegnaFiume() {
    const pts = window.FIUMI.principale;
    const linea = L.polyline([pts[0], pts[0]], { pane: "tour", color: "#06b6d4", weight: 8, opacity: 0.95, lineCap: "round", lineJoin: "round", className: "tour-glow" }).addTo(tourLayer);
    etichettaTour(pts[0], "💧 Nasce qui", "tour-zona-nome piccolo");
    const fine = () => etichettaTour(pts[pts.length - 1], `${esc(R.fiume.foce || "")} ↓`, "tour-zona-nome piccolo");
    if (pocoMoto) { linea.setLatLngs(pts); fine(); return; }
    const t0 = performance.now(), durata = 5000;
    const passo = now => {
      const k = Math.min(1, (now - t0) / durata);
      linea.setLatLngs(pts.slice(0, Math.max(2, Math.round(k * pts.length))));
      if (k < 1) tour.raf = requestAnimationFrame(passo); else { tour.raf = null; fine(); }
    };
    tour.raf = requestAnimationFrame(passo);
  }

  // quanto dura una tappa (più testo = più tempo)
  function durata(t) {
    const parole = t.testo.split(/\s+/).length;
    return Math.max(8000, parole * 400 + 2500) + (t.zone ? 2500 : 0) + (t.fiume === "disegna" ? 3000 : 0);
  }

  /* --- Voce: file audio della tappa --- */
  const fileAudio = k => `${BASE}audio/tour/${String(k + 1).padStart(2, "0")}.mp3?v=${AUDIO_V}`;
  function parla() {
    const tappa = tour.i;
    audioTour.onended = () => { if (tour.on && tour.play && tour.voce && tour.i === tappa) { clearTimeout(tour.timer); tour.timer = setTimeout(avanti, 1200); } };
    audioTour.ontimeupdate = () => {
      const sp = panel.querySelector(".tour-tempo.voce span");
      if (sp && audioTour.duration) sp.style.width = (audioTour.currentTime / audioTour.duration) * 100 + "%";
    };
    if (!audioTour.src.endsWith(fileAudio(tappa).replace(/^audio/, "/audio")) || audioTour.ended) {
      audioTour.src = fileAudio(tappa);
    }
    const p = audioTour.play();
    if (p && p.catch) p.catch(() => { /* audio bloccato o non disponibile: si va avanti con il tempo */ });
  }
  // il file della tappa dopo si prepara in anticipo, così parte subito
  function preparaProssimo() {
    if (tour.voce && tour.i + 1 < window.TOUR.length) { const a = new Audio(); a.preload = "auto"; a.src = fileAudio(tour.i + 1); }
  }

  function programma() {
    clearTimeout(tour.timer);
    const t = window.TOUR[tour.i];
    const barra = panel.querySelector(".tour-tempo");
    if (!tour.play || t.fine) { if (barra) barra.classList.add("ferma"); return; }
    const d = tour.voce ? durata(t) * 2 : durata(t);       // con la voce si va avanti quando finisce di parlare (questo è solo di riserva)
    if (barra) {
      barra.classList.remove("ferma");
      const sp = barra.querySelector("span");
      sp.style.animation = "none";
      void sp.offsetWidth;                                  // fa ripartire la barra
      sp.style.animation = "";
      sp.style.setProperty("--d", (tour.voce ? 0 : d) + "ms");
      sp.style.width = "";
      barra.classList.toggle("voce", tour.voce);
    }
    tour.timer = setTimeout(avanti, d);
  }

  function avanti() {
    if (tour.i < window.TOUR.length - 1) { tour.i++; renderTappa(); }
  }

  function renderTappa() {
    pulisciTour();
    const T = window.TOUR, t = T[tour.i], n = T.length;
    if (t.carta && t.carta !== cartaAttiva) mostraCarta(t.carta, false);
    vaiA(t);
    dopo(pocoMoto ? 50 : 1500, () => {
      if (t.bordo) L.geoJSON(window.CONFINE, { pane: "tour", style: { color: "#facc15", weight: 8, fill: false, className: "tour-bordo" } }).addTo(tourLayer);
      if (t.confini) map.getContainer().classList.add("tour-confini");
      (t.luci || []).forEach((id, k) => dopo(k * 450, () => luce(LUOGHI.find(l => l.id === id))));
      (t.zone || []).forEach((z, k) => dopo(k * 2500, () => zona(z)));
      if (t.fiume === "disegna") disegnaFiume();
      else if (t.fiume === "luce") L.polyline(window.FIUMI.principale, { pane: "tour", color: "#06b6d4", weight: 8, opacity: 0.85, className: "tour-glow" }).addTo(tourLayer);
    });

    panel.innerHTML = `
      <div class="tour-testa"><h2>🧭 Visita guidata</h2><button class="btn btn-ghost btn-small" id="tour-esci">✕ Esci</button></div>
      <div class="tour-punti">${T.map((x, k) => `<button class="tour-punto${k === tour.i ? " attivo" : k < tour.i ? " fatto" : ""}" data-k="${k}" aria-label="Tappa ${k + 1}: ${esc(x.titolo)}" title="${esc(x.titolo)}"></button>`).join("")}</div>
      <p class="sub">Tappa ${tour.i + 1} di ${n}</p>
      <div class="tour-card">
        <h3>${esc(t.titolo)}</h3>
        <p>${esc(t.testo)}</p>
        ${t.fine ? `<div class="tour-fine"><button class="btn" id="tour-quiz">🎯 Esercitati</button><button class="btn btn-ghost" id="tour-ancora">↺ Rivedi la visita</button></div>` : ""}
      </div>
      <div class="tour-comandi">
        <button class="btn btn-ghost" id="tour-prima" ${tour.i ? "" : "disabled"} aria-label="Tappa precedente">⏮</button>
        <button class="btn" id="tour-play" ${t.fine ? "disabled" : ""}>${tour.play ? "⏸ Pausa" : "▶ Riprendi"}</button>
        <button class="btn btn-ghost" id="tour-dopo" ${tour.i < n - 1 ? "" : "disabled"} aria-label="Tappa successiva">⏭</button>
        <button class="btn btn-ghost" id="tour-voce" aria-pressed="${tour.voce}" title="La maestra legge la spiegazione">${tour.voce ? "🔊 Voce accesa" : "🔈 Ascolta la maestra"}</button>
      </div>
      <div class="tour-tempo"><span></span></div>`;
    const $ = sel => panel.querySelector(sel);
    $("#tour-esci").addEventListener("click", stopTour);
    $("#tour-prima").addEventListener("click", () => { tour.i--; renderTappa(); });
    $("#tour-dopo").addEventListener("click", avanti);
    panel.querySelectorAll(".tour-punto").forEach(b => b.addEventListener("click", () => { tour.i = +b.dataset.k; renderTappa(); }));
    $("#tour-play").addEventListener("click", () => {
      tour.play = !tour.play;
      $("#tour-play").textContent = tour.play ? "⏸ Pausa" : "▶ Riprendi";
      if (!tour.play) audioTour.pause();
      else if (tour.voce) parla();
      programma();
    });
    $("#tour-voce").addEventListener("click", () => {
      tour.voce = !tour.voce;
      const b = $("#tour-voce");
      b.setAttribute("aria-pressed", String(tour.voce));
      b.textContent = tour.voce ? "🔊 Voce accesa" : "🔈 Ascolta la maestra";
      if (tour.voce) { audioTour.src = fileAudio(tour.i); parla(); preparaProssimo(); } else audioTour.pause();
      programma();
    });
    if (t.fine) {
      $("#tour-quiz").addEventListener("click", () => { stopTour(); showQuizMenu(); });
      $("#tour-ancora").addEventListener("click", () => { tour.i = 0; tour.play = true; renderTappa(); });
    }
    if (tour.voce && tour.play) { audioTour.src = fileAudio(tour.i); parla(); preparaProssimo(); }
    programma();
    panel.scrollTop = 0;
  }

  /* ---------------- Pulsante A+ (testo più grande) ---------------- */
  const btnTesto = document.getElementById("btn-testo");
  function aggiornaBtnTesto() {
    const prossimo = (livelloTesto + 1) % SCALE.length;
    btnTesto.textContent = ["A+", "A++", "A"][livelloTesto];
    btnTesto.setAttribute("aria-label", prossimo ? "Ingrandisci il testo" : "Torna al testo normale");
    btnTesto.title = btnTesto.getAttribute("aria-label");
  }
  btnTesto.addEventListener("click", () => {
    livelloTesto = (livelloTesto + 1) % SCALE.length;
    document.documentElement.style.setProperty("--scala", SCALE[livelloTesto]);
    try { localStorage.setItem("testo", livelloTesto); } catch (e) { /* non importa */ }
    aggiornaBtnTesto();
    setTimeout(() => map.invalidateSize(), 60);
  });
  aggiornaBtnTesto();

  /* ---------------- Avvio ---------------- */
  showHome();
})();
