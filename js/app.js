(function () {
  "use strict";

  const CAT = window.CATEGORIE;
  const LUOGHI = window.LUOGHI;
  const panel = document.getElementById("panel");
  const quiz = { on: false, order: [], i: 0, ok: 0, done: 0, marks: {}, tries: 0 };
  const domande = { on: false, elenco: [], i: 0, ok: 0, risposto: false };

  /* ---------------- Mappa ---------------- */
  const confine = L.geoJSON(window.CONFINE_VDA);
  const bounds = confine.getBounds();

  // Area coperta dallo sfondo "Atlante" (vedi tools/genera_rilievo.py)
  const AREA_LARGA = L.latLngBounds([45.10, 6.00], [46.35, 8.75]);
  const AREA_REGIONE = L.latLngBounds([45.39, 6.63], [46.07, 8.11]);

  const small = window.matchMedia("(max-width: 820px)").matches;
  const FIT = small
    ? { padding: [12, 12] }
    : { paddingTopLeft: [215, 20], paddingBottomRight: [20, 20] };   // spazio per la legenda
  const NOMI_ZOOM = 10.5;   // da questo zoom in su compaiono i nomi dei luoghi

  const map = L.map("map", {
    zoomControl: false,
    zoomSnap: 0.25,
    minZoom: 8,
    maxZoom: 16,
    maxBounds: AREA_LARGA,
    maxBoundsViscosity: 0.8
  });
  L.control.zoom({ position: "bottomright" }).addTo(map);

  // Livelli della mappa, dal basso verso l'alto
  map.createPane("politica").style.zIndex = 250;   // aree colorate della carta politica
  map.createPane("fiumi").style.zIndex = 380;      // fiumi, confini, strade
  map.createPane("scritte").style.zIndex = 450;    // nomi (sopra la velatura bianca)
  map.getPane("scritte").style.pointerEvents = "none";

  /* ---------- Carta FISICA: rilievo a colori + fiumi + nomi ---------- */
  // Rilievo creato da noi con i dati di altitudine (Terrain Tiles, AWS Open Data).
  // Le tessere sono nella cartella tiles/rilievo: niente chiavi, funziona anche offline.
  const ATTR_RILIEVO = 'rilievo: <a href="https://registry.opendata.aws/terrain-tiles/">Terrain Tiles</a> (SRTM, EU-DEM &copy; Copernicus)';
  const rilievo = [
    L.tileLayer("tiles/rilievo/{z}/{x}/{y}.jpg?v=5", {
      minZoom: 8, maxNativeZoom: 11, maxZoom: 19, bounds: AREA_LARGA, className: "atlante", attribution: ATTR_RILIEVO
    }),
    L.tileLayer("tiles/rilievo/{z}/{x}/{y}.jpg?v=5", {
      minZoom: 12, minNativeZoom: 12, maxNativeZoom: 12, maxZoom: 19, bounds: AREA_REGIONE, className: "atlante"
    })
  ];

  // Fiumi ricavati dai dati di altitudine (tools/genera_fiumi.py)
  function stileFiume(km2, sottile) {
    const w = km2 < 100 ? 1 : km2 < 500 ? 1.6 : km2 < 2000 ? 2.4 : 3.2;
    return { color: "#2f7fc8", weight: sottile ? w * 0.7 : w, opacity: 0.9, lineCap: "round", lineJoin: "round",
             className: km2 < 150 ? "fiume-piccolo" : "", interactive: false, pane: "fiumi" };
  }
  const fiumi = sottile => L.geoJSON(window.FIUMI.fiumi, { style: f => stileFiume(f.properties.km2, sottile) });

  // Confine di Stato tratteggiato (come negli atlanti)
  const P = window.POLITICA;
  const confineStato = () => L.geoJSON({ type: "FeatureCollection", features: [
      { type: "Feature", properties: {}, geometry: P.confini.stato },
      { type: "Feature", properties: {}, geometry: P.confini.fr_ch }] }, {
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
    L.geoJSON(P.aree, { style: f => ({ pane: "politica", fillColor: f.properties.colore, fillOpacity: 1,
                                       color: "#8a8190", weight: 1, interactive: false }) }),
    L.geoJSON(P.comuni, { style: f => ({ pane: "politica", fillColor: f.properties.colore, fillOpacity: 1,
                                         color: "#8fa58a", weight: 0.7, dashArray: "3 3", interactive: false }) }),
    L.geoJSON(P.laghi, { style: { pane: "politica", fillColor: "#a9d0ef", fillOpacity: 1, color: "#6aa6d6", weight: 1, interactive: false } }),
    fiumi(true),
    L.geoJSON({ type: "Feature", properties: {}, geometry: P.confini.regioni },
              { style: { pane: "fiumi", color: "#6b6170", weight: 2.2, opacity: 0.9, interactive: false } }),
    L.geoJSON(P.strade, { style: f => ({ pane: "fiumi", color: "#d23c2f", opacity: 0.85, interactive: false, className: "strada",
                                         weight: f.properties.tipo === "Major Highway" ? 2.4 : 1.4 }) }),
    confineStato()
  ]);
  P.aree.features.forEach(f => {
    const [lat, lng] = f.properties.etichetta;
    scritta(lat, lng, f.properties.nome, "lbl-area", 8, politica);
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

  // Velatura bianca fuori dalla regione: un grande rettangolo con un "buco" a forma di Valle d'Aosta.
  const ring = window.CONFINE_VDA.geometry.coordinates[0].map(([lng, lat]) => [lat, lng]);
  const world = [[44.5, 5.5], [44.5, 9.2], [47, 9.2], [47, 5.5]];
  const velo = L.polygon([world, ring], {
    stroke: false, fillColor: "#ffffff", fillOpacity: 0.45, interactive: false
  }).addTo(map);

  L.featureGroup([
    L.polygon(ring, { color: "#ffffff", weight: 7, opacity: 0.9, fill: false, interactive: false }),
    L.polygon(ring, { color: "#c8102e", weight: 3, fill: false, interactive: false })
  ]).addTo(map);

  // Dora Baltea: tracciato calcolato dai dati di altitudine, cliccabile
  const dora = L.polyline(window.FIUMI.dora, {
    color: "#1f63b5", weight: 5, opacity: 0.9, lineCap: "round", lineJoin: "round", interactive: false
  }).addTo(map);
  // linea invisibile più larga sopra il fiume, così è facile cliccarlo (anche con il dito)
  const doraClic = L.polyline(window.FIUMI.dora, { color: "#000", opacity: 0, weight: 22, bubblingMouseEvents: false }).addTo(map);
  doraClic.bindTooltip("Dora Baltea", { sticky: true, className: "tip" });
  doraClic.on("click", e => {
    if (quiz.on) return quizClicMappa(e.latlng, true);
    if (!domande.on) showPlace(window.DORA_INFO, null);
  });

  // Etichette dei territori confinanti
  window.CONFINANTI.forEach(c => {
    L.marker([c.lat, c.lng], {
      pane: "scritte", interactive: false, keyboard: false,
      icon: L.divIcon({ className: "", html: `<div class="country-label">${c.nome}</div>`, iconSize: [120, 20], iconAnchor: [60, 10] })
    }).addTo(map);
  });

  /* ---------- Paralleli e meridiani (reticolato geografico) ---------- */
  const PARALLELI = [45, 45.5, 46, 46.5], MERIDIANI = [6, 6.5, 7, 7.5, 8, 8.5, 9];
  const gradi = (v, dir) => Math.floor(v) + "°" + (v % 1 ? "30′" : "") + " " + dir;
  map.createPane("reticolo").style.zIndex = 420;   // sopra la velatura bianca
  const stileReticolo = { color: "#1d4f86", weight: 1.3, opacity: 0.7, dashArray: "6 4", interactive: false, pane: "reticolo" };
  const reticolato = L.layerGroup();
  const scritteReticolo = [];
  PARALLELI.forEach(lat => {
    L.polyline([[lat, 5.5], [lat, 9.2]], stileReticolo).addTo(reticolato);
    scritteReticolo.push({ tipo: "lat", v: lat, m: L.marker([lat, 7], { pane: "scritte", interactive: false, keyboard: false,
      icon: L.divIcon({ className: "lbl-wrap", iconSize: [0, 0], html: `<div class="lbl lbl-grid">${gradi(lat, "N")}</div>` }) }) });
  });
  MERIDIANI.forEach(lng => {
    L.polyline([[44.5, lng], [47, lng]], stileReticolo).addTo(reticolato);
    scritteReticolo.push({ tipo: "lng", v: lng, m: L.marker([45.5, lng], { pane: "scritte", interactive: false, keyboard: false,
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
  // "prova": una tessera di esempio; se si carica, c'è internet e la cartina è disponibile
  const CARTE = {
    fisica:    { nome: "Fisica",    icona: "⛰️", gruppo: fisica,    velo: 0.45 },
    politica:  { nome: "Politica",  icona: "🗺️", gruppo: politica,  velo: 0.12 },
    satellite: { nome: "Satellite", icona: "🛰️", gruppo: satellite, velo: 0.30,
                 prova: ESRI + "World_Imagery/MapServer/tile/8/91/133" },
    escursionistica: { nome: "Escursionistica", icona: "🥾", gruppo: escursionistica, velo: 0.35, altre: true,
                 prova: "https://a.tile.opentopomap.org/8/133/91.png" },
    semplice:  { nome: "Semplice",  icona: "🏔️", gruppo: semplice,  velo: 0.45, altre: true,
                 prova: ESRI + "World_Shaded_Relief/MapServer/tile/8/91/133" }
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
  }

  /* ---------------- Legenda (filtra per categoria) ---------------- */
  const legendBtns = {};
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

  function showHome() {
    attivo = null;
    refreshIcons();
    const sezioni = window.SCHEDA.map((s, i) =>
      `<details class="sec"${i === 0 ? " open" : ""}><summary>${s.titolo}</summary><div class="body">${s.html}</div></details>`
    ).join("");

    const gruppi = Object.entries(CAT).map(([key, c]) => {
      const items = LUOGHI.filter(l => l.cat === key)
        .map(l => `<button class="place-btn" style="--c:${c.colore}" data-id="${l.id}">${esc(l.nome)}</button>`).join("");
      return `<div class="place-group"><h4>${c.icona} ${c.nome}</h4><div class="place-list">${items}</div></div>`;
    }).join("");

    panel.innerHTML = `
      <h2>La Valle d'Aosta</h2>
      <p class="sub">La regione più piccola d'Italia, tra Francia, Svizzera e Piemonte.</p>
      <p class="hint">👆 Clicca un pallino sulla mappa (o un nome qui sotto) per leggere la sua scheda. Avvicinati con lo zoom per vedere i nomi. Clicca anche la linea blu del fiume!</p>
      ${sezioni}
      <div class="places"><h3>Tutti i luoghi della mappa</h3>${gruppi}</div>`;
    panel.querySelectorAll(".place-btn").forEach(b => b.addEventListener("click", () => select(b.dataset.id)));
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
      <p class="sub">${esc(l.sottotitolo)}</p>
      <p>${esc(l.testo)}</p>
      <div class="facts"><h3>Informazioni principali</h3><ul>${l.punti.map(p => `<li>${esc(p)}</li>`).join("")}</ul></div>
      <div class="remember"><small>Da ricordare</small>${esc(l.ricorda)}</div>
      ${nav}`;
    panel.querySelector("#back").addEventListener("click", goHome);
    panel.querySelectorAll("[data-go]").forEach(b => b.addEventListener("click", () => select(LUOGHI[+b.dataset.go].id)));
    panel.scrollTop = 0;
  }

  function select(id) {
    if (domande.on) return;       // durante le domande la scheda non si apre (sarebbe un aiutino!)
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

  document.getElementById("btn-home").addEventListener("click", () => { if (quiz.on) stopQuiz(); domande.on = false; goHome(); });

  /* ---------------- Quiz ---------------- */
  // Bersagli del quiz che non sono pallini: il fiume e le due catene montuose (data/zone.js)
  const EXTRA = [
    { id: "dora", nome: "Dora Baltea", cat: "natura", tipo: "fiume", lat: 45.737, lng: 7.47,
      aiuto: "clicca sul fiume", ricorda: "nasce ai piedi del Monte Bianco, attraversa la regione da ovest a est e si getta nel Po." },
    { id: "pennine", nome: "Alpi Pennine", cat: "montagne", tipo: "zona", lat: 45.93, lng: 7.55,
      aiuto: "clicca sulla zona della cartina", ricorda: "a nord, al confine con la Svizzera: Grand Combin, Cervino, Monte Rosa." },
    { id: "graie", nome: "Alpi Graie", cat: "montagne", tipo: "zona", lat: 45.58, lng: 7.15,
      aiuto: "clicca sulla zona della cartina", ricorda: "a ovest e a sud: Monte Bianco e Gran Paradiso." }
  ];

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
  const zonaDi = ll => ["pennine", "graie"].find(id => dentroGeom(ll, window.ZONE[id])) || null;

  // mostra per un attimo in verde la zona o il fiume
  let evidenziato = null;
  function evidenzia(t) {
    if (evidenziato) map.removeLayer(evidenziato);
    evidenziato = t.tipo === "zona"
      ? L.geoJSON(window.ZONE[t.id], { style: { color: "#15803d", weight: 2, fillColor: "#22c55e", fillOpacity: 0.35, interactive: false } })
      : L.polyline(window.FIUMI.dora, { color: "#22c55e", weight: 10, opacity: 0.85, interactive: false });
    const questo = evidenziato.addTo(map);
    setTimeout(() => { if (evidenziato === questo) { map.removeLayer(questo); evidenziato = null; } }, 2500);
  }
  const descrivi = l => (l.tipo === "zona" ? "le " : l.tipo === "fiume" ? "la " : "") + l.nome;
  const dovEra = t => markers[t.id] ? `${t.nome} è il pallino verde.`
    : t.tipo === "zona" ? `Le ${t.nome} sono la zona verde.` : `La ${t.nome} è la linea verde.`;
  function rivela(t) {
    if (markers[t.id]) quiz.marks[t.id] = "correct"; else evidenzia(t);
    map.panTo([t.lat, t.lng]);
  }

  // clic sulla cartina (non su un pallino) durante il quiz
  function quizClicMappa(ll, sulFiume) {
    const t = quiz.order[quiz.i];
    if (!t) return;
    if (t.tipo === "zona") {
      const z = zonaDi(ll);
      if (!z) { qFb.className = "quiz-feedback ko"; qFb.textContent = "Clicca dentro la Valle d'Aosta."; return; }
      return quizAnswer(EXTRA.find(x => x.id === z));
    }
    if (sulFiume) quizAnswer(EXTRA[0]);   // ha cliccato la Dora Baltea
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
    Object.assign(quiz, { on: true, order: shuffle([...LUOGHI, ...EXTRA].filter(l => visibili.has(l.cat))), i: 0, ok: 0, done: 0, marks: {}, tries: 0 });
    document.body.classList.add("quiz-on");
    qbar.hidden = false;
    applyFilters();
    refreshIcons();
    map.flyToBounds(bounds, Object.assign({ duration: 0.6 }, FIT));
    panel.innerHTML = `
      <h2>🎯 Quiz: dov'è?</h2>
      <p class="sub">Esercitati per l'interrogazione.</p>
      <p>In basso sulla mappa compare il nome di un luogo: clicca il pallino giusto. Hai <b>due tentativi</b> per ogni luogo.</p>
      <p>Ci sono anche la <b>Dora Baltea</b> (clicca sul fiume) e le catene montuose, <b>Alpi Pennine</b> e <b>Alpi Graie</b> (clicca sulla zona della cartina dove si trovano).</p>
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
  function showQuizMenu() {
    attivo = null;
    refreshIcons();
    panel.innerHTML = `
      <button class="btn btn-ghost btn-small back" id="back">← Torna alla regione</button>
      <h2>🎯 Esercitati</h2>
      <p class="sub">Scegli come vuoi ripassare.</p>
      <button class="quiz-card" id="q-dove"><span>🗺️</span><b>Dov'è?</b><small>Compare il nome di un luogo: trovalo sulla cartina.</small></button>
      <button class="quiz-card" id="q-domande"><span>❓</span><b>Domande e vero/falso</b><small>Come gli esercizi del libro: "Osserva la carta e rispondi".</small></button>`;
    panel.querySelector("#back").addEventListener("click", goHome);
    panel.querySelector("#q-dove").addEventListener("click", startQuiz);
    panel.querySelector("#q-domande").addEventListener("click", startDomande);
    panel.scrollTop = 0;
  }

  const QUANTE = 12;   // domande per partita
  function startDomande() {
    // almeno una domanda per ogni sezione della scheda, poi le altre a caso
    const perSezione = {};
    window.DOMANDE.forEach(q => (perSezione[q.sez] = perSezione[q.sez] || []).push(q));
    const una = window.SEZIONI_DOMANDE.map(sz => perSezione[sz] && shuffle(perSezione[sz].slice())[0]).filter(Boolean);
    const altre = shuffle(window.DOMANDE.filter(q => !una.includes(q))).slice(0, Math.max(0, QUANTE - una.length));
    Object.assign(domande, { on: true, elenco: shuffle(una.concat(altre)), i: 0, ok: 0, risposto: false });
    attivo = null;
    refreshIcons();
    renderDomanda();
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
      fb.innerHTML = `<b>${bene ? "✔ Giusto!" : "✘ Non è giusto."}</b> ${esc(q.spiega)}`;
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

  document.getElementById("btn-quiz").addEventListener("click", () => {
    if (quiz.on) stopQuiz();
    else if (domande.on) { domande.on = false; goHome(); }
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

  /* ---------------- Avvio ---------------- */
  showHome();
})();
