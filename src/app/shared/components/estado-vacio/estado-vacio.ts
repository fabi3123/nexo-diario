import { Component, input } from '@angular/core';

/**
 * Mensaje para listas vacías o recursos no encontrados.
 * Las acciones (botones/enlaces) se proyectan con `<ng-content>`.
 */
@Component({
  selector: 'app-estado-vacio',
  templateUrl: './estado-vacio.html',
  host: { class: 'empty-state' },
})
export class EstadoVacio {
  readonly titulo = input.required<string>();
  readonly mensaje = input('');
}
