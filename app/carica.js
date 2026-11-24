/*
 * Carica una regione: regione.html?r=<id>
 * Controlla che <id> sia in regioni/regioni.js e sia pronta, poi carica in ordine i file della
 * regione e infine app/app.js. Il numero di versione (?v=) viene da come è stato incluso questo
 * file in regione.html: per far scaricare ai browser i file nuovi basta aumentarlo lì.
 */
(function () {
  "use strict";
  const v = (new URL(document.currentScript.src).searchParams.get("v")) || "1";
  const id = new URLSearchParams(location.search).get("r");
  const regione = (window.REGIONI || []).find(r => r.id === id && r.pronta);
  if (!regione) { location.replace("index.html"); return; }

  const FILE = ["regione.js", "confine.js", "fiumi.js", "politica.js", "zone.js", "dati.js"]
    .map(f => `regioni/${regione.id}/${f}`).concat("app/app.js");

  function errore(file) {
    document.getElementById("panel").innerHTML =
      `<h2>Ops!</h2><p>Non riesco a caricare <code>${file}</code>. Ricarica la pagina; se non va ancora, il file manca.</p>`;
  }
  FILE.forEach(f => {
    const s = document.createElement("script");
    s.src = `${f}?v=${v}`;
    s.async = false;                // eseguiti nell'ordine in cui sono aggiunti
    s.onerror = () => errore(f);
    document.body.appendChild(s);
  });
})();
