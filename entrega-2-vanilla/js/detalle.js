/* =========================================================
   detalle.js
   Toma el ?id= de la URL, busca la noticia y la renderiza.
   Incluye botones para agregar/quitar de favoritos e ir a
   contacto.
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  const root = document.getElementById("detail-root");
  if (!root) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const news = id ? window.NexoStorage.getNewsById(id) : null;

  if (!news) {
    root.innerHTML =
      '<div class="empty-state"><h3>Noticia no encontrada</h3><p>La dirección puede estar mal escrita o la noticia se eliminó.</p><a class="btn btn-primary" href="noticias.html">Ver todas las noticias</a></div>';
    return;
  }

  const dateStr = formatDate(news.date);
  const isFav = window.NexoStorage.isFavorite(news.id);
  const esc = window.NexoCards.escapeHTML;

  root.innerHTML =
    '<article class="detail">' +
    '  <div class="detail-meta">' +
    esc(news.category) +
    " · " +
    esc(dateStr) +
    "</div>" +
    "  <h1>" +
    esc(news.title) +
    "</h1>" +
    '  <p class="detail-lead">' +
    esc(news.lead || news.summary) +
    "</p>" +
    '  <div class="detail-media"><img src="' +
    esc(news.image) +
    '" alt="' +
    esc(news.title) +
    '"></div>' +
    '  <div class="detail-actions">' +
    '    <button type="button" id="btn-fav" class="btn btn-primary">' +
    (isFav ? "Quitar de favoritos" : "Agregar a favoritos") +
    "    </button>" +
    '    <a class="btn btn-outline" href="contacto.html">Ir a contacto</a>' +
    "  </div>" +
    '  <div class="detail-body">' +
    (news.body || [])
      .map(function (p) {
        return "<p>" + esc(p) + "</p>";
      })
      .join("") +
    "  </div>" +
    "</article>";

  // Toggle favorito
  const btn = document.getElementById("btn-fav");
  btn.addEventListener("click", function () {
    const nowFav = window.NexoStorage.toggleFavorite(news.id);
    btn.textContent = nowFav ? "Quitar de favoritos" : "Agregar a favoritos";
  });
});

function formatDate(iso) {
  if (!iso) return "";
  const parts = iso.split("-");
  if (parts.length !== 3) return iso;
  const meses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];
  const y = parts[0];
  const m = parseInt(parts[1], 10) - 1;
  const d = parseInt(parts[2], 10);
  if (isNaN(m) || isNaN(d) || !meses[m]) return iso;
  return d + " de " + meses[m] + " de " + y;
}
