/* =========================================================
   favoritos.js
   Muestra las noticias que el usuario ha marcado como
   favoritas y permite removerlas una por una.
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  const grid = document.getElementById("fav-grid");
  const counter = document.getElementById("fav-counter");
  if (!grid) return;

  function render() {
    const favIds = window.NexoStorage.getFavorites();
    const news = favIds
      .map((id) => window.NexoStorage.getNewsById(id))
      .filter(Boolean);

    if (counter) {
      counter.textContent = news.length + " guardado" + (news.length === 1 ? "" : "s");
    }

    if (news.length === 0) {
      grid.innerHTML =
        '<div class="empty-state" style="grid-column:1/-1"><h3>Aún no has guardado favoritos</h3><p>Explora las noticias y guarda las que quieras leer después.</p><a class="btn btn-primary" href="noticias.html">Explorar noticias</a></div>';
      return;
    }

    window.NexoCards.renderCards(grid, news, { showRemove: true });

    grid.querySelectorAll("[data-remove-fav]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const id = btn.getAttribute("data-remove-fav");
        window.NexoStorage.removeFavorite(id);
        render();
      });
    });
  }

  render();
});
