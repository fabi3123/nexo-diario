import { Component, input, model } from '@angular/core';

/**
 * Chips para filtrar por categoría.
 *
 * `seleccionada` es un `model()`: permite two-way binding desde el padre
 * con la sintaxis "banana in a box": `[(seleccionada)]="categoria"`.
 */
@Component({
  selector: 'app-filtro-categorias',
  templateUrl: './filtro-categorias.html',
})
export class FiltroCategorias {
  readonly categorias = input.required<readonly string[]>();
  readonly seleccionada = model('Todas');

  seleccionar(categoria: string): void {
    this.seleccionada.set(categoria);
  }
}
