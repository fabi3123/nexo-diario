# Nexo Diario Angular

Entrega 3 del proyecto Nexo Diario - Front End.

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
