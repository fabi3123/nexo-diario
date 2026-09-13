/* =========================================================
   home.js
   Muestra las 3 noticias más recientes como "Destacadas".
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  const grid = document.getElementById("featured-grid");
  if (!grid) return;

  const news = window.NexoStorage.getNews().slice(0, 3);
  window.NexoCards.renderCards(grid, news);
});
