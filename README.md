# Nexo Diario

Aplicación web tipo periódico digital desarrollada como **Entrega Previa 2 (Semana 5)** del módulo Front-end del Politécnico Grancolombiano. Es la implementación funcional en HTML, CSS y JavaScript de los mockups aprobados en la Entrega 1.

**Autores:** Omar Fabián Vega Ariza · Diana Carolina Sotelo Huertas
**Tutor:** John Olarte Ramos
**Materia:** Diseño de Interfaces Web — Front-end

---

## Qué hace la aplicación

Nexo Diario ofrece noticias organizadas en cuatro categorías: **Educación, Tecnología, Turismo y Comercio**. El usuario puede explorar el catálogo, filtrarlo, leer el detalle de cada nota, guardarla como favorita, contactar al equipo editorial y —desde el panel de administración— crear o eliminar noticias.

Las páginas del aplicativo son:

| Página | Ruta | Funcionalidad |
| --- | --- | --- |
| Inicio | `index.html` | Hero + 3 noticias destacadas |
| Noticias | `noticias.html` | Listado completo con filtros por categoría |
| Detalle | `detalle.html?id=<id>` | Vista extendida + agregar/quitar de favoritos |
| Favoritos | `favoritos.html` | Noticias guardadas en el navegador |
| Contacto | `contacto.html` | Formulario con validaciones y confirmación |
| Administración | `admin.html` | Mini-CRUD para publicar y eliminar noticias |

## Cumplimiento de los requisitos de la Entrega 2

- [x] Desarrollo en **HTML, CSS y JavaScript** puros
- [x] Renderizado **dinámico** de las noticias a partir de un JSON local (`js/data.js`)
- [x] **Favoritos** persistidos con `localStorage`
- [x] **Formulario de contacto** con validaciones (campos obligatorios y correo válido)
- [x] **Mini-CRUD** de noticias (crear y eliminar) desde el panel de administración
- [x] Menú de navegación de 5 páginas
- [x] Header, hero, listado dinámico, footer y llamados a la acción en la Home
- [x] Código **estructurado**: separación clara de HTML, CSS y JS por módulo
- [x] Diseño **responsive** (escritorio, tablet, móvil)

## Estructura del proyecto

```
nexo-diario/
├── index.html          Home
├── noticias.html       Listado
├── detalle.html        Vista de detalle
├── favoritos.html      Favoritos guardados
├── contacto.html       Formulario de contacto
├── admin.html          Panel de administración (CRUD)
├── css/
│   └── styles.css      Estilos globales
├── js/
│   ├── data.js         Base de datos inicial (JSON)
│   ├── storage.js      Capa de acceso a localStorage
│   ├── header.js       Comportamiento del header y menú
│   ├── cards.js        Componente reutilizable de tarjeta
│   ├── home.js         Lógica de la Home
│   ├── noticias.js     Filtro por categoría
│   ├── detalle.js      Render de la vista de detalle
│   ├── favoritos.js    Gestión de favoritos
│   ├── contacto.js     Validaciones del formulario
│   └── admin.js        CRUD de noticias
├── README.md
└── .gitignore
```

## Tecnologías

- **HTML5** semántico
- **CSS3** con variables (`:root`) y layout responsive con Grid/Flex
- **JavaScript vanilla** (ES6+)
- **localStorage** para persistir favoritos y noticias del CRUD
- **Google Fonts** (Inter) para tipografía
- **Unsplash** para imágenes de referencia (URLs públicas)

## Cómo ejecutar el proyecto en local

El proyecto funciona sin instalación de dependencias. Basta con abrir `index.html` en un navegador moderno.

**Opción A — Doble clic:** abrir `index.html`. Nota: al usar `file://` algunos navegadores restringen `localStorage`; si notas comportamiento raro, usa la opción B.

**Opción B — Servidor local (recomendado):**

```bash
# Python 3
python3 -m http.server 8000

# o Node.js con npx
npx http-server -p 8000
```

Luego visita <http://localhost:8000>.

## Cómo probar la aplicación

1. En **Inicio** pulsa *Explorar noticias* para ir al listado.
2. Prueba los **filtros por categoría** (Todas, Educación, Tecnología, Turismo, Comercio).
3. Entra a una noticia y usa **Agregar a favoritos**. Ve a **Favoritos** y verás que aparece.
4. En **Contacto** intenta enviar un correo mal formado (`maria@correo`) para ver la validación; corrige y envía para ver la confirmación.
5. En **Administración** crea una noticia nueva y elimínala del listado lateral. Los cambios persisten al recargar.

## Cómo publicar en GitHub y desplegar

Ver la sección **[Guía de publicación en GitHub](#guía-de-publicación-en-github)** más abajo.

## Roadmap hacia la Entrega Final (Semana 7)

- Migrar la vista de detalle y el listado a **componentes de Angular** con *data binding*.
- Servicio de noticias que consuma `data/noticias.json` con `HttpClient`.
- Despliegue automatizado en Vercel o Netlify a partir de la rama `main`.
- Video corto (máx. 3 min) explicando el flujo del aplicativo.

---

## Guía de publicación en GitHub

### 1. Requisitos

- Tener [Git](https://git-scm.com/) instalado (comprueba con `git --version`).
- Tener una cuenta en <https://github.com>.

### 2. Inicializar el repositorio local

Desde la carpeta `nexo-diario/`:

```bash
git init
git add .
git commit -m "Entrega 2: prototipo funcional Nexo Diario (HTML, CSS, JS)"
git branch -M main
```

### 3. Crear el repositorio remoto en GitHub

1. Entra a <https://github.com/new>.
2. Repository name: `nexo-diario` (o el que prefieras).
3. Deja el repo **público** para que el tutor y los pares puedan revisarlo.
4. **No** marques "Add README" ni "Add .gitignore" (ya vienen en el proyecto).
5. Pulsa **Create repository**.

### 4. Conectar y subir

GitHub te muestra dos URLs (HTTPS o SSH). Con HTTPS es lo más simple:

```bash
git remote add origin https://github.com/<TU-USUARIO>/nexo-diario.git
git push -u origin main
```

Si es la primera vez, GitHub te pedirá autenticación. Recomendado usar un **Personal Access Token** (Settings → Developer settings → Personal access tokens → *Tokens (classic)* → Generate new token con scope `repo`).

### 5. Desplegar con GitHub Pages (gratis)

1. En el repo entra en **Settings → Pages**.
2. En *Source* elige **Deploy from a branch**.
3. Selecciona la rama `main` y la carpeta `/ (root)`. Guarda.
4. En un par de minutos, GitHub Pages te dará la URL, del tipo `https://<TU-USUARIO>.github.io/nexo-diario/`.

### 6. Actualizar cambios más adelante

```bash
git add .
git commit -m "Descripción breve del cambio"
git push
```

### 7. (Opcional) Desplegar en Netlify o Vercel

Ambos permiten conectar el repositorio y desplegar automáticamente en cada `push`:

- **Netlify:** <https://app.netlify.com/start> → *Import from Git* → autoriza y selecciona `nexo-diario`. Build command: *(vacío)*. Publish directory: *(vacío / raíz)*.
- **Vercel:** <https://vercel.com/new> → *Import Git Repository* → selecciona `nexo-diario`. Framework preset: **Other**. Mantén los defaults.

En ambos servicios, cada `git push` a `main` publica automáticamente la nueva versión.
