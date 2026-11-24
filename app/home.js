/* Pagina iniziale: cartina d'Italia con le regioni; quelle pronte si aprono con un clic. */
(function () {
  "use strict";
  const perIstat = Object.fromEntries(window.REGIONI.map(r => [r.istat, r]));
  const url = r => `regione.html?r=${encodeURIComponent(r.id)}`;
  const esc = s => String(s).replace(/[&<>"]/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));

  const map = L.map("italia", { zoomControl: false, attributionControl: false, zoomSnap: 0.25,
                                 dragging: true, scrollWheelZoom: false, doubleClickZoom: false });
  const strati = {};
  const italia = L.geoJSON(window.ITALIA, {
    style: f => {
      const r = perIstat[f.properties.istat];
      return r && r.pronta
        ? { color: "#ffffff", weight: 1.5, fillColor: "#2e9d5b", fillOpacity: 0.9, className: "reg-pronta" }
        : { color: "#ffffff", weight: 1.2, fillColor: "#cfd6cf", fillOpacity: 1, className: "reg-arrivo" };
    },
    onEachFeature: (f, layer) => {
      const r = perIstat[f.properties.istat];
      if (!r) return;
      strati[r.id] = layer;
      layer.bindTooltip(r.pronta ? `${esc(r.nome)} · apri ➜` : `${esc(r.nome)} · in arrivo`, { sticky: true, className: "tip" });
      if (r.pronta) layer.on("click", () => { location.href = url(r); });
      layer.on("mouseover", () => evidenzia(r.id, true));
      layer.on("mouseout", () => evidenzia(r.id, false));
    }
  }).addTo(map);
  const fit = () => map.fitBounds(italia.getBounds(), { padding: [16, 16] });
  fit();
  window.addEventListener("resize", fit);

  function evidenzia(id, on) {
    const r = window.REGIONI.find(x => x.id === id), l = strati[id];
    if (l) l.setStyle(on ? { weight: 3, color: r.pronta ? "#14532d" : "#9ca3af" } : { weight: r.pronta ? 1.5 : 1.2, color: "#ffffff" });
    if (l && on) l.bringToFront();
    const li = document.querySelector(`[data-id="${id}"]`);
    if (li) li.classList.toggle("hover", on);
  }

  const elenco = document.getElementById("elenco");
  window.REGIONI.slice().sort((a, b) => (b.pronta - a.pronta) || a.nome.localeCompare(b.nome, "it")).forEach(r => {
    const li = document.createElement("li");
    li.dataset.id = r.id;
    li.className = r.pronta ? "pronta" : "arrivo";
    li.innerHTML = r.pronta
      ? `<a href="${url(r)}"><b>${esc(r.nome)}</b><span>Apri ➜</span></a>`
      : `<div><b>${esc(r.nome)}</b><span>in arrivo</span></div>`;
    li.addEventListener("mouseenter", () => evidenzia(r.id, true));
    li.addEventListener("mouseleave", () => evidenzia(r.id, false));
    elenco.appendChild(li);
  });
})();
