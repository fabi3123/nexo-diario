import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withFetch()),
    provideRouter(
      routes,
      // Los parámetros de ruta (p. ej. :id) llegan como inputs del componente.
      withComponentInputBinding(),
      // Al navegar a otra página se vuelve al inicio del scroll.
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
    ),
  ],
};
