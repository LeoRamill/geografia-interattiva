#!/usr/bin/env node
/*
 * Prova automatica del sito nel browser (Playwright + Chromium), per una regione:
 * pagina iniziale, caricamento senza errori, pallini e schede, quiz "Dov'è?" completo (pallini,
 * fiume e zone), domande (tutte le sezioni), flashcard, interrogazione, visita guidata con audio,
 * telefono. Salva degli screenshot da guardare.
 *
 * Uso:  node tools/prova_sito.js valle-aosta [cartella-screenshot]
 * Le cartine online (satellite ecc.) sono bloccate: si prova il sito come se fosse offline.
 * Esce con codice 1 se qualcosa non va.
 */
"use strict";
const path = require("path");
const fs = require("fs");
const { chromium } = require("playwright");

const id = process.argv[2];
if (!id || !/^[a-z0-9-]+$/.test(id)) { console.error("Uso: node tools/prova_sito.js <id-regione> [cartella-screenshot]"); process.exit(2); }
const OUT = process.argv[3] || path.join(require("os").tmpdir(), `prova-${id}`);
fs.mkdirSync(OUT, { recursive: true });
const RADICE = "file://" + path.join(__dirname, "..");
const URL = `${RADICE}/regione.html?r=${id}`;
const problemi = [];
const ok = (cond, msg) => { console.log(`${cond ? "✅" : "❌"} ${msg}`); if (!cond) problemi.push(msg); };

async function pagina(browser, opzioni) {
  const ctx = await browser.newContext(opzioni);
  const p = await ctx.newPage();
  p.errori = [];
  p.on("pageerror", e => p.errori.push(e.message));
  // le tessere che la cartina smette di caricare mentre si muove sono "annullate" (ERR_ABORTED): non sono errori
  p.on("requestfailed", r => {
    if (r.url().startsWith("file:") && !/ABORTED/.test((r.failure() || {}).errorText || ""))
      p.errori.push("file mancante: " + r.url().replace(RADICE, ""));
  });
  await p.route(/arcgisonline|opentopomap/, r => r.abort());
  return p;
}
const centro = async (p, titolo) => {
  const bb = await p.locator(`.leaflet-marker-icon[title="${titolo.replace(/"/g, '\\"')}"]`).boundingBox();
  return bb && [bb.x + bb.width / 2, bb.y + bb.height / 2];
};

(async () => {
  const browser = await chromium.launch({ args: ["--autoplay-policy=no-user-gesture-required"] });
  const p = await pagina(browser, { viewport: { width: 1400, height: 900 } });

  // ---------- pagina iniziale ----------
  await p.goto(`${RADICE}/index.html`); await p.waitForTimeout(800);
  ok(await p.locator(`.elenco [data-id="${id}"] a`).count() === 1, "pagina iniziale: la regione è nell'elenco ed è apribile");
  await p.screenshot({ path: path.join(OUT, "home.png") });

  // ---------- regione ----------
  await p.goto(URL); await p.waitForTimeout(1500);
  const dati = await p.evaluate(() => ({
    nome: window.REGIONE.nome, luoghi: window.LUOGHI.map(l => ({ id: l.id, nome: l.nome, cat: l.cat })),
    spente: Object.keys(window.CATEGORIE).filter(k => window.CATEGORIE[k].spenta), tappe: window.TOUR.length,
    sezioni: window.SEZIONI_DOMANDE.length, zone: (window.REGIONE.zone || []).map(z => z.id)
  }));
  const visibili = dati.luoghi.filter(l => !dati.spente.includes(l.cat));
  ok((await p.textContent(".brand h1")) === dati.nome, `titolo: ${dati.nome}`);
  ok(await p.locator(".leaflet-marker-icon[title]").count() === visibili.length, `pallini visibili: ${visibili.length}`);
  await p.screenshot({ path: path.join(OUT, "regione.png") });
  const primo = visibili[0];
  let c = await centro(p, primo.nome);
  await p.mouse.click(c[0], c[1]); await p.waitForTimeout(1200);
  ok((await p.textContent("#panel h2")).trim() === primo.nome, `clic sul pallino "${primo.nome}" apre la scheda`);
  await p.screenshot({ path: path.join(OUT, "scheda.png") });
  await p.click("#btn-home"); await p.waitForTimeout(900);
  await p.click('.carta-switch button:has-text("Politica")'); await p.waitForTimeout(700);
  await p.screenshot({ path: path.join(OUT, "politica.png") });
  await p.click('.carta-switch button:has-text("Fisica")'); await p.waitForTimeout(500);

  // ---------- quiz "Dov'è?" ----------
  await p.click("#btn-quiz"); await p.click("#q-dove"); await p.waitForTimeout(1000);
  let giri = 0;
  while (giri < 200) {
    const nome = (await p.evaluate(() => document.querySelector("#quiz-target").firstChild.textContent)).trim();
    if (nome.startsWith("Finito")) break;
    const bersaglio = await p.evaluate(n => {
      const R = window.REGIONE, map = window.GEO.map;
      if (n === R.fiume.nome) {         // un punto del fiume che non sia sotto un pallino
        const pts = window.FIUMI.principale, box = map.getContainer().getBoundingClientRect();
        for (const f of [0.3, 0.4, 0.5, 0.2, 0.6, 0.35, 0.45, 0.25, 0.55]) {
          const pt = map.latLngToContainerPoint(pts[Math.floor(pts.length * f)]);
          const el = document.elementFromPoint(box.left + pt.x, box.top + pt.y);
          if (el && !el.closest(".leaflet-marker-icon")) return pt;
        }
      }
      const z = (R.zone || []).find(x => x.nome === n);
      if (z) {                          // un punto dentro la zona: si prova una griglia di punti
        const g = window.ZONE[z.id], pol = g.type === "Polygon" ? [g.coordinates] : g.coordinates;
        const dentro = (lat, lng, a) => { let c = false; for (let i = 0, j = a.length - 1; i < a.length; j = i++) { const [xi, yi] = a[i], [xj, yj] = a[j]; if ((yi > lat) !== (yj > lat) && lng < (xj - xi) * (lat - yi) / (yj - yi) + xi) c = !c; } return c; };
        const b = map.getBounds(), size = map.getSize();
        for (let k = 1; k < 40; k++) for (let h = 1; h < 40; h++) {
          const pt = L.point(size.x * k / 40, size.y * h / 40), ll = map.containerPointToLatLng(pt);
          if (pt.y > size.y - 120 || pt.x < 230) continue;    // non sotto la barra del quiz o la legenda
          if (!pol.some(pp => dentro(ll.lat, ll.lng, pp[0]) && !pp.slice(1).some(h => dentro(ll.lat, ll.lng, h))) || !b.contains(ll)) continue;
          const box = map.getContainer().getBoundingClientRect();
          const el = document.elementFromPoint(box.left + pt.x, box.top + pt.y);
          if (el && !el.closest(".leaflet-marker-icon")) return pt;      // non sotto un pallino
        }
      }
      return null;
    }, nome);
    if (bersaglio) {
      const box = await p.locator("#map").boundingBox();
      await p.mouse.click(box.x + bersaglio.x, box.y + bersaglio.y);
    } else {
      c = await centro(p, nome);
      if (!c) { ok(false, `quiz: non trovo "${nome}" sulla cartina`); await p.click("#quiz-skip"); giri++; continue; }
      await p.mouse.click(c[0], c[1]);
    }
    await p.waitForTimeout(150);
    const esito = await p.textContent("#quiz-feedback");
    if (esito.startsWith("✘")) console.log(`   ⚠️  quiz: al primo colpo "${nome}" non è riuscito (${esito.trim()})`);
    const dopo = (await p.evaluate(() => document.querySelector("#quiz-target").firstChild.textContent)).trim();
    if (dopo === nome && !esito.startsWith("✘")) {          // il clic non ha fatto niente: si salta, per non girare a vuoto
      ok(false, `quiz: il clic su "${nome}" non ha avuto effetto${bersaglio ? ` (punto ${Math.round(bersaglio.x)},${Math.round(bersaglio.y)})` : ""}`);
      await p.click("#quiz-skip");
    }
    giri++;
  }
  const fb = await p.textContent("#quiz-feedback");
  const m = fb.match(/indovinato (\d+) luoghi su (\d+)/);
  ok(m && m[1] === m[2], `quiz "Dov'è?": ${m ? `${m[1]} su ${m[2]} al primo colpo` : fb}`);
  await p.click("#quiz-stop"); await p.waitForTimeout(300);

  // ---------- domande ----------
  const sezDi = await p.evaluate(() => Object.fromEntries(window.DOMANDE.map(q => [q.d, q.sez])));
  let tutte = 0;
  for (let r = 0; r < 5; r++) {
    await p.click("#btn-quiz"); await p.click("#q-domande"); await p.waitForTimeout(100);
    const viste = new Set();
    while (await p.locator(".qtesto").count()) {
      viste.add(sezDi[(await p.textContent(".qtesto")).trim()]);
      await p.click(".qopt >> nth=0"); await p.click(".qnext");
    }
    if (viste.size === dati.sezioni) tutte++;
    await p.click("#q-home"); await p.waitForTimeout(100);
  }
  ok(tutte === 5, `domande: ${tutte}/5 partite con tutte le ${dati.sezioni} sezioni`);

  // ---------- flashcard ----------
  await p.click("#btn-quiz"); await p.click("#q-flash"); await p.waitForTimeout(200);
  let carte = 0;
  while (await p.locator(".flashcard").count() && carte < 300) { await p.click(".flashcard"); await p.click("#f-ok"); carte++; }
  ok(await p.locator(".qrisultato").count() === 1, `flashcard: mazzo di ${carte} carte finito`);
  await p.click("#f-home"); await p.waitForTimeout(300);

  // ---------- interrogazione ----------
  await p.click("#btn-quiz"); await p.click("#q-interr"); await p.waitForTimeout(200);
  ok(await p.locator(".discorso .kw").count() > 20, "interrogazione: discorso con le parole chiave");
  await p.click('.tab:has-text("Simulazione")');
  let sim = 0;
  while (await p.locator("#sim-mostra").count() && sim < 200) { await p.click("#sim-mostra"); await p.click("#sim-dopo"); sim++; }
  ok((await p.textContent("#interr-corpo")).includes("Hai fatto tutta"), `interrogazione: simulazione di ${sim} domande finita`);
  await p.click("#back"); await p.waitForTimeout(500);

  // ---------- visita guidata ----------
  await p.click(".tour-btn"); await p.waitForTimeout(300);
  for (let k = 1; k < dati.tappe; k++) { await p.click("#tour-dopo"); await p.waitForTimeout(120); }
  ok(await p.locator("#tour-quiz").count() === 1, `visita guidata: ${dati.tappe} tappe`);
  await p.click("#tour-ancora"); await p.click("#tour-voce"); await p.waitForTimeout(2500);
  const larg = await p.evaluate(() => parseFloat(document.querySelector(".tour-tempo span").style.width) || 0);
  ok(larg > 0, "visita guidata: l'audio della prima tappa parte");
  await p.screenshot({ path: path.join(OUT, "visita.png") });
  await p.click("#tour-esci"); await p.waitForTimeout(800);

  ok(!p.errori.length, "nessun errore nella pagina" + (p.errori.length ? ": " + p.errori.slice(0, 5).join(" · ") : ""));

  // ---------- telefono ----------
  const t = await pagina(browser, { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  await t.goto(URL); await t.waitForTimeout(1500);
  const larghezza = await t.evaluate(() => document.documentElement.scrollWidth);
  ok(larghezza <= 390, `telefono: niente scorrimento orizzontale (${larghezza}px)`);
  c = await centro(t, primo.nome);
  await t.mouse.click(c[0], c[1]); await t.waitForTimeout(1200);
  ok((await t.textContent("#panel h2")).trim() === primo.nome, "telefono: il pallino apre la scheda");
  await t.screenshot({ path: path.join(OUT, "telefono.png") });
  ok(!t.errori.length, "telefono: nessun errore" + (t.errori.length ? ": " + t.errori.slice(0, 5).join(" · ") : ""));

  await browser.close();
  console.log(`\nScreenshot in ${OUT}`);
  console.log(problemi.length ? `❌ ${problemi.length} problemi` : "✅ tutto a posto");
  process.exit(problemi.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
