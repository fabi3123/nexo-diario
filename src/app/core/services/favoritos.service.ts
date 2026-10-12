import { Injectable, computed, signal } from '@angular/core';

import { CLAVE_FAVORITOS, escribirLista, leerLista } from './almacenamiento';

/**
 * Guarda los IDs de las noticias favoritas en localStorage y los expone
 * como una señal para que la interfaz se actualice sola al cambiar.
 */
@Injectable({ providedIn: 'root' })
export class FavoritosService {
  private readonly _ids = signal<string[]>(leerLista<string>(CLAVE_FAVORITOS) ?? []);

  readonly ids = this._ids.asReadonly();
  readonly total = computed(() => this._ids().length);

  esFavorito(id: string): boolean {
    return this._ids().includes(id);
  }

  /** Agrega o quita la noticia de favoritos. Devuelve el nuevo estado. */
  alternar(id: string): boolean {
    if (this.esFavorito(id)) {
      this.quitar(id);
      return false;
    }
    this.guardar([...this._ids(), id]);
    return true;
  }

  quitar(id: string): void {
    this.guardar(this._ids().filter((f) => f !== id));
  }

  private guardar(ids: string[]): void {
    this._ids.set(ids);
    escribirLista(CLAVE_FAVORITOS, ids);
  }
}
