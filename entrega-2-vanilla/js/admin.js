/* =========================================================
   admin.js
   Panel de Administración (mini CRUD):
   - Crear noticia con título, categoría, URL de imagen,
     descripción breve y contenido.
   - Listar noticias existentes con botón para eliminarlas.
   Los cambios persisten en localStorage.
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("admin-form");
  const list = document.getElementById("admin-list");
  const counter = document.getElementById("admin-counter");
  if (!form || !list) return;

  const esc = window.NexoCards.escapeHTML;

  function renderList() {
    const news = window.NexoStorage.getNews();
    if (counter) {
      counter.textContent = news.length + " publicada" + (news.length === 1 ? "" : "s");
    }

    if (news.length === 0) {
      list.innerHTML =
        '<div class="empty-state"><h3>No hay noticias publicadas</h3><p>Crea la primera desde el formulario de la izquierda.</p></div>';
      return;
    }

    list.innerHTML = news
      .map(function (n) {
        return (
          '<div class="list-row">' +
          '  <div class="list-row-thumb"><img src="' +
          esc(n.image) +
          '" alt=""></div>' +
          '  <div class="list-row-body">' +
          '    <div class="list-row-cat">' +
          esc(n.category) +
          "</div>" +
          '    <div class="list-row-title">' +
          esc(n.title) +
          "</div>" +
          "  </div>" +
          '  <button type="button" class="btn-ghost-danger" data-del="' +
          esc(n.id) +
          '" aria-label="Eliminar noticia">' +
          '    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m2 0v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6h12z"/></svg>' +
          "  </button>" +
          "</div>"
        );
      })
      .join("");

    list.querySelectorAll("[data-del]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const id = btn.getAttribute("data-del");
        if (confirm("¿Eliminar esta noticia? Esta acción no se puede deshacer.")) {
          window.NexoStorage.deleteNews(id);
          renderList();
        }
      });
    });
  }

  function showError(name, message) {
    const field = form.querySelector('[name="' + name + '"]');
    const errorEl = form.querySelector('[data-error-for="' + name + '"]');
    if (field) field.classList.add("is-invalid");
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add("is-visible");
    }
  }

  function clearError(name) {
    const field = form.querySelector('[name="' + name + '"]');
    const errorEl = form.querySelector('[data-error-for="' + name + '"]');
    if (field) field.classList.remove("is-invalid");
    if (errorEl) errorEl.classList.remove("is-visible");
  }

  ["titulo", "categoria", "imagen", "resumen", "contenido"].forEach(function (n) {
    const el = form.querySelector('[name="' + n + '"]');
    if (el) el.addEventListener("input", function () { clearError(n); });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const data = {
      titulo: form.titulo.value.trim(),
      categoria: form.categoria.value.trim(),
      imagen: form.imagen.value.trim(),
      resumen: form.resumen.value.trim(),
      contenido: form.contenido.value.trim(),
    };

    let valid = true;
    if (!data.titulo) { showError("titulo", "El título es obligatorio."); valid = false; }
    if (!data.categoria) { showError("categoria", "Selecciona una categoría."); valid = false; }
    if (!data.imagen) {
      showError("imagen", "Pega la URL de la imagen destacada.");
      valid = false;
    } else if (!/^https?:\/\//i.test(data.imagen)) {
      showError("imagen", "La URL debe empezar con http:// o https://.");
      valid = false;
    }
    if (!data.resumen) { showError("resumen", "Escribe una descripción breve."); valid = false; }
    if (!data.contenido) { showError("contenido", "Escribe el contenido de la noticia."); valid = false; }

    if (!valid) return;

    const today = new Date();
    const isoDate =
      today.getFullYear() +
      "-" +
      String(today.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(today.getDate()).padStart(2, "0");

    window.NexoStorage.createNews({
      category: data.categoria,
      title: data.titulo,
      summary: data.resumen,
      image: data.imagen,
      date: isoDate,
      lead: data.resumen,
      body: data.contenido.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean),
    });

    form.reset();
    renderList();
  });

  renderList();
});
