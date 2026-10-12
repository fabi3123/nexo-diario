import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NoticiasService } from '../../core/services/noticias.service';
import { NoticiaCard } from '../../shared/components/noticia-card/noticia-card';

/** Home: hero + las 3 noticias más recientes como destacadas. */
@Component({
  selector: 'app-inicio',
  imports: [RouterLink, NoticiaCard],
  templateUrl: './inicio.html',
})
export class Inicio {
  private readonly noticiasService = inject(NoticiasService);

  protected readonly cargando = this.noticiasService.cargando;
  protected readonly destacadas = computed(() => this.noticiasService.noticias().slice(0, 3));

  protected readonly heroImagen =
    'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=70';
}
