/* =========================================================
   storage.js
   Capa de acceso a datos sobre localStorage.
   - "nexo:news" guarda el arreglo de noticias (CRUD del admin).
   - "nexo:favorites" guarda solo los IDs marcados como favoritos.
   Se inicializa con NEXO_DATA en la primera visita.
   ========================================================= */

(function () {
  "use strict";

  const NEWS_KEY = "nexo:news";
  const FAV_KEY = "nexo:favorites";

  // ----- Utilidades internas -----
  function readList(key) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (err) {
      console.error("Error leyendo", key, err);
      return null;
    }
  }

  function writeList(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error("Error escribiendo", key, err);
    }
  }

  // ----- Noticias -----
  function initIfEmpty() {
    if (readList(NEWS_KEY) === null && Array.isArray(window.NEXO_DATA)) {
      writeList(NEWS_KEY, window.NEXO_DATA.slice());
    }
    if (readList(FAV_KEY) === null) {
      writeList(FAV_KEY, []);
    }
  }

  function getNews() {
    initIfEmpty();
    return readList(NEWS_KEY) || [];
  }

  function getNewsById(id) {
    return getNews().find((n) => n.id === id) || null;
  }

  function createNews(news) {
    const list = getNews();
    const item = Object.assign({ id: "n-" + Date.now() }, news);
    list.unshift(item); // agrega arriba
    writeList(NEWS_KEY, list);
    return item;
  }

  function deleteNews(id) {
    const list = getNews().filter((n) => n.id !== id);
    writeList(NEWS_KEY, list);
    // también limpia de favoritos si estaba
    const favs = getFavorites().filter((f) => f !== id);
    writeList(FAV_KEY, favs);
  }

  // ----- Favoritos -----
  function getFavorites() {
    initIfEmpty();
    return readList(FAV_KEY) || [];
  }

  function isFavorite(id) {
    return getFavorites().includes(id);
  }

  function toggleFavorite(id) {
    const favs = getFavorites();
    const idx = favs.indexOf(id);
    if (idx === -1) {
      favs.push(id);
    } else {
      favs.splice(idx, 1);
    }
    writeList(FAV_KEY, favs);
    return favs.includes(id);
  }

  function removeFavorite(id) {
    const favs = getFavorites().filter((f) => f !== id);
    writeList(FAV_KEY, favs);
  }

  // Exponer API pública
  window.NexoStorage = {
    getNews,
    getNewsById,
    createNews,
    deleteNews,
    getFavorites,
    isFavorite,
    toggleFavorite,
    removeFavorite,
  };

  // Inicializa al cargar
  initIfEmpty();
})();
