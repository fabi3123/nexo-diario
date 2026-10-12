/* =========================================================
   cards.js
   Genera el HTML de una tarjeta de noticia. Se usa desde la
   página de inicio, el listado de Noticias y Favoritos.
   ========================================================= */

(function () {
  "use strict";

  // Escapa texto para evitar inyección al armar strings de HTML
  function escapeHTML(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // Construye una tarjeta a partir de una noticia
  function cardHTML(news, options) {
    options = options || {};
    const showRemove = options.showRemove === true;
    const linkUrl = "detalle.html?id=" + encodeURIComponent(news.id);

    return (
      '<article class="card">' +
      '  <a class="card-media" href="' +
      linkUrl +
      '" aria-label="Ver detalle de ' +
      escapeHTML(news.title) +
      '">' +
      '    <img src="' +
      escapeHTML(news.image) +
      '" alt="' +
      escapeHTML(news.title) +
      '" loading="lazy">' +
      "  </a>" +
      '  <div class="card-body">' +
      '    <span class="card-category">' +
      escapeHTML(news.category) +
      "</span>" +
      '    <h3 class="card-title">' +
      escapeHTML(news.title) +
      "</h3>" +
      '    <p class="card-summary">' +
      escapeHTML(news.summary) +
      "</p>" +
      '    <div class="card-actions">' +
      (showRemove
        ? '      <button type="button" class="btn btn-danger" data-remove-fav="' +
          escapeHTML(news.id) +
          '">Remover</button>'
        : '      <a class="btn btn-outline" href="' +
          linkUrl +
          '">Ver más</a>') +
      "    </div>" +
      "  </div>" +
      "</article>"
    );
  }

  // Renderiza una lista de tarjetas dentro de un contenedor
  function renderCards(container, list, options) {
    if (!container) return;
    if (!list || list.length === 0) {
      container.innerHTML = "";
      return;
    }
    container.innerHTML = list.map((n) => cardHTML(n, options)).join("");
  }

  window.NexoCards = { cardHTML, renderCards, escapeHTML };
})();
