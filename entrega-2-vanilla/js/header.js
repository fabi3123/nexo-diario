/* =========================================================
   header.js
   Comportamiento del encabezado común a todas las páginas:
   - Marca como activo el enlace de la página actual.
   - Muestra/oculta el menú en pantallas pequeñas.
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  // 1) Marca el enlace activo comparando href con la ruta actual
  const current = (
    window.location.pathname.split("/").pop() || "index.html"
  ).toLowerCase();

  document.querySelectorAll(".site-nav a").forEach(function (a) {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === current) {
      a.classList.add("is-active");
    }
    // caso especial: raíz "/"
    if (current === "" && href === "index.html") {
      a.classList.add("is-active");
    }
  });

  // 2) Menú responsive
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("is-open");
    });
    // cerrar al hacer click en un enlace
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("is-open");
      });
    });
  }
});
