/* =========================================================
   contacto.js
   Valida el formulario de contacto en el cliente:
   - Nombre, asunto y mensaje: obligatorios.
   - Correo: obligatorio y con formato válido.
   Muestra errores por campo y un mensaje de éxito al final.
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const success = document.getElementById("form-success");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  // Al escribir, limpia el error del campo tocado
  ["nombre", "correo", "asunto", "mensaje"].forEach(function (n) {
    const el = form.querySelector('[name="' + n + '"]');
    if (el) {
      el.addEventListener("input", function () {
        clearError(n);
      });
    }
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    success.classList.remove("is-visible");

    const data = {
      nombre: form.nombre.value.trim(),
      correo: form.correo.value.trim(),
      asunto: form.asunto.value.trim(),
      mensaje: form.mensaje.value.trim(),
    };

    let valid = true;

    if (!data.nombre) {
      showError("nombre", "El nombre es obligatorio.");
      valid = false;
    }
    if (!data.correo) {
      showError("correo", "El correo es obligatorio.");
      valid = false;
    } else if (!emailRegex.test(data.correo)) {
      showError(
        "correo",
        "Ingresa un correo válido, por ejemplo nombre@dominio.com."
      );
      valid = false;
    }
    if (!data.asunto) {
      showError("asunto", "Selecciona un asunto.");
      valid = false;
    }
    if (!data.mensaje) {
      showError("mensaje", "Cuéntanos brevemente qué necesitas.");
      valid = false;
    } else if (data.mensaje.length < 10) {
      showError("mensaje", "Escribe un mensaje un poco más completo (mínimo 10 caracteres).");
      valid = false;
    }

    if (!valid) return;

    // Simulación de envío. En este prototipo no hay backend,
    // así que confirmamos localmente y limpiamos el formulario.
    success.classList.add("is-visible");
    form.reset();
  });
});
