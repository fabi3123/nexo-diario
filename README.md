# Nexo Diario

Aplicación web tipo periódico digital desarrollada para el módulo Front-end del Politécnico Grancolombiano. Esta versión migra el prototipo en HTML, CSS y JavaScript de la **Entrega 2** al framework **Angular**, usando **componentes** y **data binding**.

**Autores:** Omar Fabián Vega Ariza · Diana Carolina Sotelo Huertas
**Tutor:** John Olarte Ramos
**Materia:** Diseño de Interfaces Web — Front-end

---

## Qué hace la aplicación

Nexo Diario ofrece noticias organizadas en cuatro categorías: **Educación, Tecnología, Turismo y Comercio**. El usuario puede explorar el catálogo, filtrarlo, leer el detalle de cada nota, guardarla como favorita, contactar al equipo editorial y —desde el panel de administración— crear o eliminar noticias.

| Página | Ruta | Componente | Funcionalidad |
| --- | --- | --- | --- |
| Inicio | `/` | `Inicio` | Hero + 3 noticias destacadas |
| Noticias | `/noticias` | `Noticias` | Listado completo con filtros por categoría |
| Detalle | `/noticias/:id` | `Detalle` | Vista extendida + agregar/quitar de favoritos |
| Favoritos | `/favoritos` | `Favoritos` | Noticias guardadas en el navegador |
| Contacto | `/contacto` | `Contacto` | Formulario con validaciones y confirmación |
| Administración | `/admin` | `Admin` | Mini-CRUD con vista previa en vivo |

## Tecnologías

- **Angular 21** (componentes standalone, señales, nuevo control de flujo `@if` / `@for`)
- **TypeScript** en modo estricto
- **Angular Router** para la navegación entre páginas (SPA)
- **HttpClient** para cargar las noticias iniciales desde `public/data/noticias.json`
- **Formularios por plantilla** (`FormsModule` + `ngModel`) con validadores de Angular
- **localStorage** para persistir favoritos y noticias del CRUD
- **Vitest** para las pruebas unitarias
- CSS3 con variables (`:root`) y diseño responsive (la misma hoja de estilos de la Entrega 2)

## Arquitectura de componentes

```
App (app-root)
├── Header (app-header)            menú, enlace activo, menú móvil, contador de favoritos
├── <router-outlet>
│   ├── Inicio                     → NoticiaCard ×3
│   ├── Noticias                   → FiltroCategorias, NoticiaCard, EstadoVacio
│   ├── Detalle                    → EstadoVacio, pipe fechaLarga
│   ├── Favoritos                  → NoticiaCard (modo "Remover"), EstadoVacio
│   ├── Contacto                   formulario con ngModel
│   └── Admin                      formulario con ngModel, NoticiaCard (vista previa), EstadoVacio
└── Footer (app-footer)
```

Los datos viven en dos **servicios** inyectables que exponen **señales** de solo lectura; cualquier cambio (crear, eliminar, marcar favorito) se refleja automáticamente en todas las vistas que los usan:

- `NoticiasService`: carga `data/noticias.json` con `HttpClient` la primera vez, luego trabaja contra `localStorage` (crear / eliminar).
- `FavoritosService`: IDs favoritos en `localStorage` (`alternar`, `quitar`, `total`).

Las claves de `localStorage` (`nexo:news`, `nexo:favorites`) son las mismas de la Entrega 2, así que los datos guardados con la versión anterior siguen funcionando.

## Data binding: dónde se usa cada tipo

| Tipo | Sintaxis | Ejemplo en el proyecto |
| --- | --- | --- |
| Interpolación | `{{ valor }}` | `noticia-card.html`: `{{ noticia().title }}`; `favoritos.html`: `{{ contador() }}` |
| Property binding | `[propiedad]="expr"` | `noticia-card.html`: `[src]="noticia().image"`, `[routerLink]="['/noticias', noticia().id]"` |
| Class / attribute binding | `[class.x]`, `[attr.x]` | `header.html`: `[class.is-open]="menuAbierto()"`; `filtro-categorias.html`: `[attr.aria-selected]` |
| Event binding | `(evento)="metodo()"` | `header.html`: `(click)="alternarMenu()"`; `detalle.html`: `(click)="alternarFavorito()"` |
| Two-way binding (formularios) | `[(ngModel)]="senal"` | `contacto.html` y `admin.html`: cada campo enlazado a una señal |
| Two-way binding (componente propio) | `[(seleccionada)]="senal"` | `noticias.html` ↔ `FiltroCategorias` mediante `model()` |
| Input de componente | `input()` | `NoticiaCard.noticia`, `NoticiaCard.mostrarRemover`, `EstadoVacio.titulo` |
| Output de componente | `output()` | `NoticiaCard.remover` → `(remover)="quitar($event)"` en `favoritos.html` |
| Parámetro de ruta como input | `withComponentInputBinding()` | `Detalle.id` recibe el `:id` de `/noticias/:id` |
| Proyección de contenido | `<ng-content />` | `EstadoVacio` recibe los botones de acción desde el padre |
| Pipe | `{{ valor \| pipe }}` | `detalle.html`: `{{ n.date \| fechaLarga }}` |

Un ejemplo que combina varios: en **Administración**, mientras escribes en el formulario, la tarjeta de *Vista previa* se actualiza sola porque cada campo está enlazado en doble vía a una señal y la tarjeta recibe un `computed()` por property binding.

## Estructura del proyecto

```
nexo-diario/
├── public/
│   ├── data/noticias.json         Datos iniciales (consumidos con HttpClient)
│   ├── _redirects                 Fallback SPA para Netlify
│   └── favicon.ico
├── src/
│   ├── index.html
│   ├── main.ts                    Arranque de la aplicación
│   ├── styles.css                 Estilos globales (de la Entrega 2)
│   └── app/
│       ├── app.ts / app.html      Componente raíz
│       ├── app.config.ts          Router, HttpClient
│       ├── app.routes.ts          Rutas
│       ├── core/
│       │   ├── models/noticia.model.ts
│       │   └── services/          NoticiasService, FavoritosService, almacenamiento
│       ├── layout/                Header, Footer
│       ├── pages/                 Inicio, Noticias, Detalle, Favoritos, Contacto, Admin
│       └── shared/
│           ├── components/        NoticiaCard, FiltroCategorias, EstadoVacio
│           └── pipes/             FechaLargaPipe
├── entrega-2-vanilla/             Versión anterior en HTML/CSS/JS puro (referencia)
├── angular.json
├── package.json
├── netlify.toml
└── vercel.json
```

Cada componente tiene su clase (`.ts`) y su plantilla (`.html`); las pruebas están al lado (`.spec.ts`).

## Cómo ejecutar el proyecto en local

Requisitos: **Node.js 20.19+ o 22.12+** y npm.

```bash
npm install
npm start
```

Luego visita <http://localhost:4200>. La aplicación se recarga sola al guardar cambios.

Otros comandos:

```bash
npm test          # pruebas unitarias (Vitest)
npm run build     # build de producción en dist/nexo-diario/browser
```

> La versión anterior (Entrega 2) sigue disponible en `entrega-2-vanilla/`: abre `entrega-2-vanilla/index.html` o sírvela con `npx http-server entrega-2-vanilla -p 8000`.

## Cómo probar la aplicación

1. En **Inicio** pulsa *Explorar noticias* para ir al listado.
2. Prueba los **filtros por categoría** (Todas, Educación, Tecnología, Turismo, Comercio).
3. Entra a una noticia y usa **Agregar a favoritos**: el contador del menú se actualiza al instante. Ve a **Favoritos** y verás la noticia; pulsa *Remover* para quitarla.
4. En **Contacto** intenta enviar un correo mal formado (`maria@correo`) para ver la validación; corrige y envía para ver la confirmación.
5. En **Administración** escribe una noticia y mira la **vista previa en vivo**; publícala y elimínala del listado lateral. Los cambios persisten al recargar.

## Despliegue

### Vercel

<https://vercel.com/new> → *Import Git Repository* → selecciona `nexo-diario`. Vercel detecta Angular automáticamente (build `npm run build`, salida `dist/nexo-diario/browser`). `vercel.json` redirige todas las rutas a `index.html` para que funcionen los enlaces directos como `/noticias/n-001`.

### Netlify

<https://app.netlify.com/start> → *Import from Git* → selecciona `nexo-diario`. La configuración ya está en `netlify.toml`, y `public/_redirects` hace el fallback de rutas.

### GitHub Pages

```bash
npm run build:gh-pages
```

Genera `dist/nexo-diario/browser` con `base-href` `/nexo-diario/` y una copia de `index.html` como `404.html` (fallback de rutas). Publica el contenido de esa carpeta en la rama `gh-pages`, por ejemplo con `npx angular-cli-ghpages --dir=dist/nexo-diario/browser`, y en **Settings → Pages** elige esa rama.

## Roadmap

- [x] Migrar las páginas a **componentes de Angular** con *data binding*.
- [x] Servicio de noticias que consume `data/noticias.json` con `HttpClient`.
- [ ] Despliegue automatizado en Vercel o Netlify a partir de la rama `main`.
- [ ] Video corto (máx. 3 min) explicando el flujo del aplicativo.
