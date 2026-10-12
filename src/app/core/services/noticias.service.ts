import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';

import { Noticia, NuevaNoticia } from '../models/noticia.model';
import { CLAVE_NOTICIAS, escribirLista, leerLista } from './almacenamiento';
import { FavoritosService } from './favoritos.service';

/**
 * Fuente única de verdad de las noticias.
 *
 * - En la primera visita carga `data/noticias.json` con HttpClient y lo
 *   copia a localStorage.
 * - Desde entonces el CRUD del administrador trabaja contra localStorage.
 */
@Injectable({ providedIn: 'root' })
export class NoticiasService {
  static readonly URL_DATOS = 'data/noticias.json';

  private readonly http = inject(HttpClient);
  private readonly favoritos = inject(FavoritosService);

  private readonly _noticias = signal<Noticia[]>([]);
  private readonly _cargando = signal(true);
  private readonly _error = signal<string | null>(null);

  readonly noticias = this._noticias.asReadonly();
  readonly cargando = this._cargando.asReadonly();
  readonly error = this._error.asReadonly();

  constructor() {
    const guardadas = leerLista<Noticia>(CLAVE_NOTICIAS);
    if (guardadas) {
      this._noticias.set(guardadas);
      this._cargando.set(false);
      return;
    }

    this.http.get<Noticia[]>(NoticiasService.URL_DATOS).subscribe({
      next: (datos) => {
        this.guardar(datos);
        this._cargando.set(false);
      },
      error: (err) => {
        console.error('No se pudieron cargar las noticias', err);
        this._error.set('No se pudieron cargar las noticias. Intenta recargar la página.');
        this._cargando.set(false);
      },
    });
  }

  buscarPorId(id: string): Noticia | undefined {
    return this._noticias().find((n) => n.id === id);
  }

  crear(datos: NuevaNoticia): Noticia {
    const noticia: Noticia = { id: 'n-' + Date.now(), ...datos };
    this.guardar([noticia, ...this._noticias()]);
    return noticia;
  }

  eliminar(id: string): void {
    this.guardar(this._noticias().filter((n) => n.id !== id));
    this.favoritos.quitar(id);
  }

  private guardar(lista: Noticia[]): void {
    this._noticias.set(lista);
    escribirLista(CLAVE_NOTICIAS, lista);
  }
}
