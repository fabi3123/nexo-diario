import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Noticia } from '../../../core/models/noticia.model';

/**
 * Tarjeta reutilizable de noticia (Inicio, Noticias y Favoritos).
 *
 * - Entrada `noticia`: la noticia a mostrar (property binding desde el padre).
 * - Entrada `mostrarRemover`: cambia "Ver más" por un botón "Remover".
 * - Salida `remover`: emite el id cuando se pulsa "Remover" (event binding).
 */
@Component({
  selector: 'app-noticia-card',
  imports: [RouterLink],
  templateUrl: './noticia-card.html',
})
export class NoticiaCard {
  readonly noticia = input.required<Noticia>();
  readonly mostrarRemover = input(false);

  readonly remover = output<string>();
}
