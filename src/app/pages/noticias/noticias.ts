import { Component, computed, inject, signal } from '@angular/core';

import { CATEGORIAS } from '../../core/models/noticia.model';
import { NoticiasService } from '../../core/services/noticias.service';
import { EstadoVacio } from '../../shared/components/estado-vacio/estado-vacio';
import { FiltroCategorias } from '../../shared/components/filtro-categorias/filtro-categorias';
import { NoticiaCard } from '../../shared/components/noticia-card/noticia-card';

/** Listado completo de noticias con filtro por categoría. */
@Component({
  selector: 'app-noticias',
  imports: [NoticiaCard, FiltroCategorias, EstadoVacio],
  templateUrl: './noticias.html',
})
export class Noticias {
  private readonly noticiasService = inject(NoticiasService);

  protected readonly categorias = ['Todas', ...CATEGORIAS];
  /** Enlazada en doble vía con <app-filtro-categorias [(seleccionada)]>. */
  protected readonly categoriaActual = signal('Todas');

  protected readonly cargando = this.noticiasService.cargando;
  protected readonly error = this.noticiasService.error;

  protected readonly filtradas = computed(() => {
    const todas = this.noticiasService.noticias();
    const categoria = this.categoriaActual();
    return categoria === 'Todas' ? todas : todas.filter((n) => n.category === categoria);
  });
}
