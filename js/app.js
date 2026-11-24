(function () {
  "use strict";

  const CAT = window.CATEGORIE;
  const LUOGHI = window.LUOGHI;
  const panel = document.getElementById("panel");

  /* ---------------- Mappa ---------------- */
  const confine = L.geoJSON(window.CONFINE_VDA);
  const bounds = confine.getBounds();

  const small = window.matchMedia("(max-width: 820px)").matches;
  const PIN = small ? 26 : 34;
  const FIT = { paddingTopLeft: [16, small ? 70 : 100], paddingBottomRight: [16, 16] };

  const map = L.map("map", {
    zoomControl: false,
    zoomSnap: 0.25,
    minZoom: 8,
    maxZoom: 16,
    maxBounds: bounds.pad(0.8),
    maxBoundsViscosity: 0.8
  });
  L.control.zoom({ position: "bottomright" }).addTo(map);

  const topo = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
    maxZoom: 17,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> · stile &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)'
  });
  const osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });
  topo.addTo(map);

  // Ombra fuori dalla regione: un grande rettangolo con un "buco" a forma di Valle d'Aosta.
  const ring = window.CONFINE_VDA.geometry.coordinates[0].map(([lng, lat]) => [lat, lng]);
  const world = [[44.5, 5.5], [44.5, 9.2], [47, 9.2], [47, 5.5]];
  L.polygon([world, ring], {
    stroke: false, fillColor: "#0b1220", fillOpacity: 0.35, interactive: false
  }).addTo(map);

  const bordo = L.polygon(ring, {
    color: "#b91c1c", weight: 3, fill: false, interactive: false
  }).addTo(map);

  // Dora Baltea (tracciato semplificato, cliccabile)
  const dora = L.polyline(window.DORA_BALTEA, {
    color: "#1d4ed8", weight: 5, opacity: 0.75, lineCap: "round", lineJoin: "round"
  }).addTo(map);
  dora.bindTooltip("Dora Baltea", { sticky: true, className: "tip" });
  dora.on("click", () => { if (!quiz.on) showPlace(window.DORA_INFO, null); });

  // Etichette dei territori confinanti
  window.CONFINANTI.forEach(c => {
    L.marker([c.lat, c.lng], {
      interactive: false,
      icon: L.divIcon({ className: "", html: `<div class="country-label">${c.nome}</div>`, iconSize: [120, 20], iconAnchor: [60, 10] })
    }).addTo(map);
  });

  L.control.layers(
    { "Rilievo (topografica)": topo, "Stradale (OpenStreetMap)": osm },
    { "Confine regionale": bordo, "Dora Baltea": dora },
    { position: "bottomright", collapsed: true }
  ).addTo(map);
  L.control.scale({ imperial: false, position: "bottomleft" }).addTo(map);

  map.fitBounds(bounds, FIT);

  /* ---------------- Marker ---------------- */
  const markers = {};      // id -> L.marker
  const visibili = new Set(Object.keys(CAT));
  let attivo = null;

  function pinIcon(l, extra) {
    const c = CAT[l.cat];
    return L.divIcon({
      className: "",
      html: `<div class="pin ${extra || ""}" style="--c:${c.colore}"><span>${c.icona}</span></div>`,
      iconSize: [PIN, PIN],
      iconAnchor: [PIN / 2, PIN],
      tooltipAnchor: [0, -PIN + 4]
    });
  }

  LUOGHI.forEach(l => {
    const m = L.marker([l.lat, l.lng], { icon: pinIcon(l), title: l.nome, riseOnHover: true });
    m.bindTooltip(l.nome, { direction: "top", className: "tip" });
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

  function applyFilters() {
    LUOGHI.forEach(l => {
      const show = quiz.on || visibili.has(l.cat);
      const m = markers[l.id];
      if (show && !map.hasLayer(m)) m.addTo(map);
      if (!show && map.hasLayer(m)) map.removeLayer(m);
    });
  }

  /* ---------------- Filtri ---------------- */
  const filters = document.getElementById("filters");
  Object.entries(CAT).forEach(([key, c]) => {
    const b = document.createElement("button");
    b.className = "chip";
    b.style.setProperty("--c", c.colore);
    b.setAttribute("aria-pressed", "true");
    b.title = c.nome;
    b.innerHTML = `<span class="dot"></span><span class="emoji">${c.icona}</span><span class="label">${c.nome}</span>`;
    b.addEventListener("click", () => {
      if (visibili.has(key)) visibili.delete(key); else visibili.add(key);
      b.setAttribute("aria-pressed", visibili.has(key));
      applyFilters();
    });
    filters.appendChild(b);
  });
  L.DomEvent.disableClickPropagation(filters);

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
      <p class="hint">👆 Clicca un segnaposto sulla mappa (o un nome qui sotto) per leggere la sua scheda. Clicca anche la linea blu del fiume!</p>
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
    const idx = LUOGHI.findIndex(l => l.id === id);
    if (idx < 0) return;
    const l = LUOGHI[idx];
    if (!visibili.has(l.cat)) {               // se la categoria era nascosta, la riattiva
      visibili.add(l.cat);
      filters.children[Object.keys(CAT).indexOf(l.cat)].setAttribute("aria-pressed", "true");
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

  document.getElementById("btn-home").addEventListener("click", () => { if (quiz.on) stopQuiz(); goHome(); });

  /* ---------------- Quiz ---------------- */
  const quiz = { on: false, order: [], i: 0, ok: 0, done: 0, marks: {}, tries: 0 };
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
    Object.assign(quiz, { on: true, order: shuffle(LUOGHI.slice()), i: 0, ok: 0, done: 0, marks: {}, tries: 0 });
    document.body.classList.add("quiz-on");
    qbar.hidden = false;
    applyFilters();
    refreshIcons();
    map.flyToBounds(bounds, Object.assign({ duration: 0.6 }, FIT));
    panel.innerHTML = `
      <h2>🎯 Quiz: dov'è?</h2>
      <p class="sub">Esercitati per l'interrogazione.</p>
      <p>In basso sulla mappa compare il nome di un luogo: clicca il segnaposto giusto. Hai <b>due tentativi</b> per ogni luogo.</p>
      <p class="hint">I segnaposto sono tutti grigi e senza icona, così non puoi barare! 😉</p>`;
    nextQuestion();
  }

  function nextQuestion() {
    if (quiz.i >= quiz.order.length) return endQuiz();
    quiz.tries = 0;
    qTarget.textContent = quiz.order[quiz.i].nome;
    qScore.textContent = `${quiz.ok} / ${quiz.done}`;
  }

  function quizAnswer(l) {
    const target = quiz.order[quiz.i];
    if (!target || quiz.marks[l.id] === "correct") return;
    if (l.id === target.id) {
      quiz.marks[l.id] = "correct";
      if (quiz.tries === 0) quiz.ok++;
      quiz.done++;
      qFb.className = "quiz-feedback ok";
      qFb.textContent = `✔ Giusto! ${target.nome}: ${target.ricorda}`;
      advance();
    } else {
      quiz.tries++;
      quiz.marks[l.id] = "wrong";
      refreshIcons();
      setTimeout(() => { if (quiz.marks[l.id] === "wrong") { delete quiz.marks[l.id]; refreshIcons(); } }, 700);
      if (quiz.tries >= 2) {
        quiz.done++;
        quiz.marks[target.id] = "correct";
        qFb.className = "quiz-feedback ko";
        qFb.textContent = `✘ No: quello era ${l.nome}. ${target.nome} è il segnaposto verde.`;
        map.panTo([target.lat, target.lng]);
        advance();
      } else {
        qFb.className = "quiz-feedback ko";
        qFb.textContent = `✘ Quello è ${l.nome}. Riprova!`;
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
    document.body.classList.remove("quiz-on");
    qbar.hidden = true;
    qFb.textContent = "";
    applyFilters();
    showHome();
  }

  document.getElementById("btn-quiz").addEventListener("click", () => (quiz.on ? stopQuiz() : startQuiz()));
  document.getElementById("quiz-stop").addEventListener("click", stopQuiz);
  document.getElementById("quiz-skip").addEventListener("click", () => {
    if (!quiz.on || quiz.i >= quiz.order.length) return;
    const t = quiz.order[quiz.i];
    quiz.done++;
    quiz.marks[t.id] = "correct";
    qFb.className = "quiz-feedback ko";
    qFb.textContent = `Saltato: ${t.nome} è il segnaposto verde.`;
    map.panTo([t.lat, t.lng]);
    advance();
  });

  /* ---------------- Avvio ---------------- */
  showHome();
})();
