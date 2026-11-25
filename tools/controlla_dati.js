#!/usr/bin/env node
/*
 * Controlla i dati di una regione (senza browser): riferimenti, coordinate, domande, segni [[ ]] e ** **,
 * file generati e audio della visita.
 *
 * Uso:  node tools/controlla_dati.js valle-aosta
 * Esce con codice 1 se trova errori; gli "avvisi" vanno guardati ma non bloccano.
 */
"use strict";
const fs = require("fs");
const path = require("path");

const id = process.argv[2];
if (!id || !/^[a-z0-9-]+$/.test(id)) { console.error("Uso: node tools/controlla_dati.js <id-regione>"); process.exit(2); }
const RADICE = path.join(__dirname, "..");
const DIR = path.join(RADICE, "regioni", id);
const errori = [], avvisi = [];
const err = m => errori.push(m), avv = m => avvisi.push(m);

global.window = {};
for (const f of ["regione.js", "confine.js", "fiumi.js", "politica.js", "zone.js", "dati.js"]) {
  const p = path.join(DIR, f);
  if (!fs.existsSync(p)) { err(`manca regioni/${id}/${f}`); continue; }
  try { require(p); } catch (e) { err(`${f}: ${e.message}`); }
}
global.window.REGIONI = undefined;
require(path.join(RADICE, "regioni", "regioni.js"));
const W = global.window, R = W.REGIONE || {};

// ---------- regione.js ----------
for (const k of ["id", "nome", "con_articolo", "istat", "sottotitolo", "bandiera", "area_larga", "area_regione", "fiume"]) {
  if (R[k] === undefined) err(`regione.js: manca "${k}"`);
}
if (R.id !== id) err(`regione.js: id "${R.id}" diverso dalla cartella "${id}"`);
const voce = (W.REGIONI || []).find(r => r.id === id);
if (!voce) err(`regioni/regioni.js: manca la regione "${id}"`);
else if (voce.istat !== R.istat) err(`regioni.js e regione.js hanno codici ISTAT diversi (${voce.istat} / ${R.istat})`);
const A = R.area_larga || [0, 0, 0, 0];
const dentroArea = (lat, lng) => lng >= A[0] && lng <= A[2] && lat >= A[1] && lat <= A[3];

// punto dentro il confine della regione (anche con isole)
const geom = W.CONFINE && W.CONFINE.geometry;
const poligoni = !geom ? [] : geom.type === "Polygon" ? [geom.coordinates] : geom.coordinates;
function dentroAnello(lat, lng, anello) {
  let c = false;
  for (let a = 0, b = anello.length - 1; a < anello.length; b = a++) {
    const [xa, ya] = anello[a], [xb, yb] = anello[b];
    if ((ya > lat) !== (yb > lat) && lng < (xb - xa) * (lat - ya) / (yb - ya) + xa) c = !c;
  }
  return c;
}
const dentroRegione = (lat, lng) => poligoni.some(p => dentroAnello(lat, lng, p[0]));
const dentroGeom = (lat, lng, g) => (g.type === "Polygon" ? [g.coordinates] : g.coordinates)
  .some(p => dentroAnello(lat, lng, p[0]) && !p.slice(1).some(h => dentroAnello(lat, lng, h)));

// ---------- file generati ----------
if (!W.FIUMI || !Array.isArray(W.FIUMI.principale) || W.FIUMI.principale.length < 2) err("fiumi.js: manca il tracciato del fiume principale (tools/genera_fiumi.py)");
for (const z of R.zone || []) {
  if (!W.ZONE || !W.ZONE[z.id]) err(`zone.js: manca la zona "${z.id}" (tools/genera_zone.py)`);
  if (!z.poligono && !z.resto && !z.altimetria && !z.costa) err(`regione.js: la zona "${z.id}" non ha né poligono, né altimetria, né costa, né resto: true`);
  if (z.costa && !(z.costa.km > 0 && z.costa.ovest < z.costa.est)) err(`regione.js: la zona "${z.id}" ha una "costa" non valida`);
  if (z.cat && !(W.CATEGORIE || {})[z.cat]) err(`regione.js: la zona "${z.id}" ha la categoria "${z.cat}" che non c'è in CATEGORIE`);
  if (z.altimetria && !["montagna", "collina", "pianura"].includes(z.altimetria)) err(`regione.js: altimetria "${z.altimetria}" non valida`);
  if (W.ZONE && W.ZONE[z.id] && z.etichetta && !dentroGeom(z.etichetta[0], z.etichetta[1], W.ZONE[z.id])) avv(`zona "${z.id}": l'etichetta è fuori dalla zona`);
}
if (!W.POLITICA || !W.POLITICA.aree) err("politica.js: dati mancanti (tools/genera_politica.py)");
const tiles = path.join(DIR, "tiles", "rilievo");
if (!fs.existsSync(tiles)) err("manca il rilievo: tiles/rilievo (tools/genera_rilievo.py)");

// ---------- dati.js ----------
const CAT = W.CATEGORIE || {}, LUOGHI = W.LUOGHI || [];
if (!Object.keys(CAT).length) err("dati.js: CATEGORIE vuote");
const ids = new Set();
for (const l of LUOGHI) {
  const dove = `luogo "${l.id}"`;
  if (ids.has(l.id)) err(`${dove}: id ripetuto`);
  ids.add(l.id);
  if (!CAT[l.cat]) err(`${dove}: categoria "${l.cat}" inesistente`);
  for (const k of ["nome", "sottotitolo", "testo", "ricorda"]) if (!l[k]) err(`${dove}: manca "${k}"`);
  if (!Array.isArray(l.punti) || !l.punti.length) err(`${dove}: mancano i punti`);
  if (!dentroArea(l.lat, l.lng)) err(`${dove}: coordinate fuori dall'area della cartina`);
  else if (poligoni.length && !dentroRegione(l.lat, l.lng)) avv(`${dove}: è fuori dal confine della regione (va bene solo per cime e passi sul confine)`);
}
if (!W.FIUME_INFO) err("dati.js: manca FIUME_INFO (la scheda del fiume principale)");
if (!Array.isArray(W.SCHEDA) || W.SCHEDA.length < 5) err("dati.js: SCHEDA mancante o troppo corta");
for (const e of W.ETICHETTE_FISICHE || []) {
  if (!["catena", "pianura", "regione", "valle", "cima", "fiume", "lago"].includes(e.tipo)) err(`etichetta "${e.t}": tipo "${e.tipo}" sconosciuto`);
  if (!dentroArea(e.lat, e.lng)) avv(`etichetta "${e.t}": fuori dall'area della cartina`);
}
for (const c of W.CITTA || []) if (!dentroArea(c.lat, c.lng)) avv(`città "${c.nome}": fuori dall'area della cartina`);

// domande del quiz
const SEZ = W.SEZIONI_DOMANDE || [];
const perSez = {};
for (const q of W.DOMANDE || []) {
  if (!SEZ.includes(q.sez)) err(`domanda "${q.d}": sezione "${q.sez}" non è in SEZIONI_DOMANDE`);
  perSez[q.sez] = (perSez[q.sez] || 0) + 1;
  if (q.tipo === "scelta" && !(Number.isInteger(q.giusta) && q.giusta >= 0 && q.giusta < (q.opzioni || []).length)) err(`domanda "${q.d}": "giusta" non valida`);
  if (q.tipo === "vf" && typeof q.vero !== "boolean") err(`domanda "${q.d}": "vero" deve essere true o false`);
  if (!["scelta", "vf"].includes(q.tipo)) err(`domanda "${q.d}": tipo "${q.tipo}" sconosciuto`);
  if (!q.spiega) err(`domanda "${q.d}": manca la spiegazione`);
}
for (const s of SEZ) if ((perSez[s] || 0) < 2) avv(`sezione "${s}": solo ${perSez[s] || 0} domande (meglio almeno 3)`);
if ((W.DOMANDE || []).length < 30) avv(`solo ${(W.DOMANDE || []).length} domande nel quiz (meglio 40 o più)`);

// interrogazione e visita guidata
const zoneIds = new Set((R.zone || []).map(z => z.id));
for (const f of W.FLUSSO || []) for (const q of f.domande) {
  const m = q.mappa;
  if (!m) continue;
  if (m.tipo === "luogo" && !ids.has(m.id)) err(`interrogazione "${q.d}": luogo "${m.id}" inesistente`);
  if (m.tipo === "zona" && !zoneIds.has(m.id)) err(`interrogazione "${q.d}": zona "${m.id}" inesistente`);
  if (!["regione", "fiume", "zona", "luogo"].includes(m.tipo)) err(`interrogazione "${q.d}": mappa.tipo "${m.tipo}" sconosciuto`);
}
const TOUR = W.TOUR || [];
if (!TOUR.length) err("dati.js: TOUR (visita guidata) vuoto");
TOUR.forEach((t, k) => {
  const dove = `tappa ${k + 1} "${t.titolo}"`;
  if (Array.isArray(t.vista)) t.vista.forEach(v => { if (!ids.has(v)) err(`${dove}: vista su luogo "${v}" inesistente`); });
  else if (!["larga", "regione"].includes(t.vista)) err(`${dove}: vista "${t.vista}" non valida`);
  (t.luci || []).forEach(v => { if (!ids.has(v)) err(`${dove}: luce su luogo "${v}" inesistente`); });
  (t.zone || []).forEach(v => { if (!zoneIds.has(v)) err(`${dove}: zona "${v}" inesistente`); });
  if (t.carta && !["fisica", "politica"].includes(t.carta)) err(`${dove}: carta "${t.carta}" non valida`);
  if (t.fiume && !["disegna", "luce"].includes(t.fiume)) err(`${dove}: fiume "${t.fiume}" non valido`);
});
if (TOUR.length && !TOUR[TOUR.length - 1].fine) avv("l'ultima tappa della visita dovrebbe avere fine: true");
const audioDir = path.join(DIR, "audio", "tour");
const audio = fs.existsSync(audioDir) ? fs.readdirSync(audioDir).filter(f => f.endsWith(".mp3")) : [];
if (audio.length !== TOUR.length) err(`audio della visita: ${audio.length} file per ${TOUR.length} tappe (tools/genera_audio.py)`);
const registrati = path.join(audioDir, "testi.json");
if (!fs.existsSync(registrati)) avv("manca audio/tour/testi.json: non so se l'audio corrisponde ai testi (rigenera l'audio)");
else {
  const vecchi = JSON.parse(fs.readFileSync(registrati, "utf8"));
  TOUR.forEach((t, k) => {
    const v = vecchi[k];
    if (!v || v.titolo !== t.titolo || v.testo !== t.testo) err(`tappa ${k + 1}: il testo è cambiato dopo la registrazione: rigenera l'audio (tools/genera_audio.py)`);
  });
}

// segni [[ ]] e ** ** bilanciati in tutti i testi
function testi(v, dove, out) {
  if (typeof v === "string") out.push([dove, v]);
  else if (Array.isArray(v)) v.forEach((x, i) => testi(x, `${dove}[${i}]`, out));
  else if (v && typeof v === "object") for (const k of Object.keys(v)) testi(v[k], `${dove}.${k}`, out);
  return out;
}
for (const nome of ["LUOGHI", "SCHEDA", "FIUME_INFO", "DOMANDE", "DOMANDE_RISPOSTE", "FLASHCARD", "DISCORSO", "FLUSSO", "TOUR"]) {
  for (const [dove, t] of testi(W[nome], nome, [])) {
    if ((t.match(/\[\[/g) || []).length !== (t.match(/\]\]/g) || []).length) err(`${dove}: [[ ]] non bilanciati`);
    if ((t.match(/\*\*/g) || []).length % 2) err(`${dove}: ** non bilanciati`);
  }
}
if (!(W.DISCORSO || []).length) err("dati.js: DISCORSO vuoto");
if (!(W.FLASHCARD || []).length) err("dati.js: FLASHCARD vuote");
if (!(W.DOMANDE_RISPOSTE || []).length) err("dati.js: DOMANDE_RISPOSTE vuote");

// ---------- risultato ----------
console.log(`Regione: ${R.nome || id} · ${LUOGHI.length} luoghi · ${(W.DOMANDE || []).length} domande · ` +
  `${(W.FLASHCARD || []).reduce((n, g) => n + g.carte.length, 0)} flashcard · ${TOUR.length} tappe`);
avvisi.forEach(m => console.log("  ⚠️  " + m));
errori.forEach(m => console.log("  ❌ " + m));
console.log(errori.length ? `${errori.length} errori` : "✅ nessun errore");
process.exit(errori.length ? 1 : 0);
