import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FavoritosService } from '../../core/services/favoritos.service';
import { NoticiasService } from '../../core/services/noticias.service';
import { EstadoVacio } from '../../shared/components/estado-vacio/estado-vacio';
import { FechaLargaPipe } from '../../shared/pipes/fecha-larga.pipe';

/**
 * Vista extendida de una noticia (`/noticias/:id`).
 * El parámetro `:id` de la ruta llega como input gracias a
 * `withComponentInputBinding()` en app.config.ts.
 */
@Component({
  selector: 'app-detalle',
  imports: [RouterLink, EstadoVacio, FechaLargaPipe],
  templateUrl: './detalle.html',
})
export class Detalle {
  private readonly noticiasService = inject(NoticiasService);
  private readonly favoritosService = inject(FavoritosService);

  readonly id = input.required<string>();

  protected readonly cargando = this.noticiasService.cargando;
  protected readonly noticia = computed(() =>
    this.noticiasService.noticias().find((n) => n.id === this.id()),
  );
  protected readonly esFavorito = computed(() => this.favoritosService.ids().includes(this.id()));

  alternarFavorito(): void {
    this.favoritosService.alternar(this.id());
  }
}
