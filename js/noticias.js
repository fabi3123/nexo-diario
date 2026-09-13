/* =========================================================
   noticias.js
   Lista todas las noticias y permite filtrarlas por categoría.
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  const grid = document.getElementById("news-grid");
  const chips = document.querySelectorAll(".chip");
  if (!grid) return;

  const all = window.NexoStorage.getNews();
  let current = "Todas";

  function render() {
    const list =
      current === "Todas" ? all : all.filter((n) => n.category === current);
    if (list.length === 0) {
      grid.innerHTML =
        '<div class="empty-state" style="grid-column:1/-1"><h3>Sin resultados</h3><p>No hay noticias en esta categoría todavía.</p></div>';
      return;
    }
    window.NexoCards.renderCards(grid, list);
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      chips.forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      current = chip.getAttribute("data-cat");
      render();
    });
  });

  render();
});
