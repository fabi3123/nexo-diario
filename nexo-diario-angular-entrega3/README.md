# Nexo Diario Angular

Entrega 3 del proyecto Nexo Diario para el módulo Front End.

## Requisitos cumplidos

- Aplicación funcional completa.
- Implementación básica en Angular con componentes, rutas y data binding.
- Componentes para Inicio, Noticias, Detalle, Favoritos, Contacto y Administración.
- Servicio `NewsService` para lectura, creación, eliminación y favoritos.
- Persistencia local con `localStorage`.
- Formulario de contacto con validación básica mediante Angular Forms.
- Código organizado y comentado de forma breve.
- Configuración lista para desplegar en GitHub Pages, Netlify o Vercel.

## Ejecutar en local

```bash
npm install
npm start
```

Luego abrir:

```text
http://localhost:4200
```

## Generar versión de producción

```bash
npm run build
```

La carpeta publicada queda en:

```text
dist/nexo-diario-angular/browser
```

## Despliegue sugerido

Para Vercel o Netlify:

- Build command: `npm run build`
- Publish directory: `dist/nexo-diario-angular/browser`

Para GitHub Pages, usar hash routing ya configurado con `withHashLocation()`.

## Guion sugerido para video de máximo 3 minutos

1. Presentar Nexo Diario y explicar que es una plataforma web de noticias.
2. Mostrar la página de inicio y las noticias destacadas.
3. Entrar a Noticias y explicar el filtro por categoría con data binding.
4. Abrir el detalle de una noticia y agregarla a favoritos.
5. Mostrar Favoritos y eliminar la noticia guardada.
6. Mostrar Contacto y la validación del formulario.
7. Mostrar Administración, crear una noticia y confirmar que aparece en el listado.
8. Cerrar explicando que la app fue migrada a Angular con componentes, rutas, servicios y persistencia local.
