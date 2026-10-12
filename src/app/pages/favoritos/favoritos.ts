import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Noticia } from '../../core/models/noticia.model';
import { FavoritosService } from '../../core/services/favoritos.service';
import { NoticiasService } from '../../core/services/noticias.service';
import { EstadoVacio } from '../../shared/components/estado-vacio/estado-vacio';
import { NoticiaCard } from '../../shared/components/noticia-card/noticia-card';

/** Noticias guardadas por el usuario en este navegador. */
@Component({
  selector: 'app-favoritos',
  imports: [RouterLink, NoticiaCard, EstadoVacio],
  templateUrl: './favoritos.html',
})
export class Favoritos {
  private readonly noticiasService = inject(NoticiasService);
  private readonly favoritosService = inject(FavoritosService);

  protected readonly guardadas = computed(() => {
    const noticias = this.noticiasService.noticias();
    return this.favoritosService
      .ids()
      .map((id) => noticias.find((n) => n.id === id))
      .filter((n): n is Noticia => n !== undefined);
  });

  protected readonly contador = computed(() => {
    const total = this.guardadas().length;
    return `${total} guardado${total === 1 ? '' : 's'}`;
  });

  /** Recibe el id emitido por (remover) de la tarjeta. */
  quitar(id: string): void {
    this.favoritosService.quitar(id);
  }
}
