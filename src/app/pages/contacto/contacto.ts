import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

/** Mismo patrón de la Entrega 2: exige usuario, @, dominio y extensión. */
export const PATRON_CORREO = '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$';

/**
 * Formulario de contacto con validaciones (formularios por plantilla).
 * Cada campo está enlazado en doble vía con una señal: `[(ngModel)]="nombre"`.
 */
@Component({
  selector: 'app-contacto',
  imports: [FormsModule],
  templateUrl: './contacto.html',
})
export class Contacto {
  protected readonly asuntos = [
    'Sugerir una historia',
    'Consulta editorial',
    'Reportar un error',
    'Otro',
  ];
  protected readonly patronCorreo = PATRON_CORREO;

  protected readonly nombre = signal('');
  protected readonly correo = signal('');
  protected readonly asunto = signal('');
  protected readonly mensaje = signal('');

  protected readonly enviado = signal(false);

  enviar(formulario: NgForm): void {
    this.enviado.set(false);
    if (formulario.invalid) return;

    // Simulación de envío: no hay backend, así que confirmamos localmente.
    this.enviado.set(true);
    formulario.resetForm({ nombre: '', correo: '', asunto: '', mensaje: '' });
    this.nombre.set('');
    this.correo.set('');
    this.asunto.set('');
    this.mensaje.set('');
  }
}
