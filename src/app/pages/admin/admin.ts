import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { CATEGORIAS, Categoria, Noticia } from '../../core/models/noticia.model';
import { NoticiasService } from '../../core/services/noticias.service';
import { EstadoVacio } from '../../shared/components/estado-vacio/estado-vacio';
import { NoticiaCard } from '../../shared/components/noticia-card/noticia-card';

/** Fecha de hoy en formato ISO local (`AAAA-MM-DD`). */
function hoyIso(): string {
  const hoy = new Date();
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const dia = String(hoy.getDate()).padStart(2, '0');
  return `${hoy.getFullYear()}-${mes}-${dia}`;
}

/**
 * Panel de administración (mini CRUD): crear y eliminar noticias.
 * Mientras se escribe, la tarjeta de vista previa se actualiza sola porque
 * los campos están enlazados a señales y `vistaPrevia` es un `computed`.
 */
@Component({
  selector: 'app-admin',
  imports: [FormsModule, NoticiaCard, EstadoVacio],
  templateUrl: './admin.html',
})
export class Admin {
  private readonly noticiasService = inject(NoticiasService);

  protected readonly categorias = CATEGORIAS;
  protected readonly noticias = this.noticiasService.noticias;

  protected readonly titulo = signal('');
  protected readonly categoria = signal<Categoria | ''>('');
  protected readonly imagen = signal('');
  protected readonly resumen = signal('');
  protected readonly contenido = signal('');

  protected readonly contador = computed(() => {
    const total = this.noticias().length;
    return `${total} publicada${total === 1 ? '' : 's'}`;
  });

  protected readonly hayBorrador = computed(
    () => !!(this.titulo() || this.categoria() || this.imagen() || this.resumen()),
  );

  protected readonly vistaPrevia = computed<Noticia>(() => ({
    id: 'vista-previa',
    category: this.categoria() || 'Educación',
    title: this.titulo() || 'Título de la noticia',
    summary: this.resumen() || 'Aquí aparecerá la descripción breve.',
    image: this.imagen(),
    date: hoyIso(),
    body: [],
  }));

  publicar(formulario: NgForm): void {
    const categoria = this.categoria();
    if (formulario.invalid || !categoria) return;

    this.noticiasService.crear({
      category: categoria,
      title: this.titulo().trim(),
      summary: this.resumen().trim(),
      image: this.imagen().trim(),
      date: hoyIso(),
      lead: this.resumen().trim(),
      body: this.contenido()
        .split(/\n{2,}/)
        .map((p) => p.trim())
        .filter(Boolean),
    });

    formulario.resetForm({ titulo: '', categoria: '', imagen: '', resumen: '', contenido: '' });
    this.titulo.set('');
    this.categoria.set('');
    this.imagen.set('');
    this.resumen.set('');
    this.contenido.set('');
  }

  eliminar(noticia: Noticia): void {
    if (confirm(`¿Eliminar "${noticia.title}"? Esta acción no se puede deshacer.`)) {
      this.noticiasService.eliminar(noticia.id);
    }
  }
}
