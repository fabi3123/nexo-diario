import { TestBed } from '@angular/core/testing';

import { Contacto } from './contacto';

async function escribir(el: HTMLElement, selector: string, valor: string): Promise<void> {
  const campo = el.querySelector<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
    selector,
  )!;
  campo.value = valor;
  campo.dispatchEvent(new Event(campo instanceof HTMLSelectElement ? 'change' : 'input'));
}

describe('Contacto', () => {
  it('muestra errores al enviar vacío y confirma cuando todo es válido', async () => {
    const fixture = TestBed.createComponent(Contacto);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const enviar = () => el.querySelector<HTMLButtonElement>('button[type=submit]')!.click();

    enviar();
    await fixture.whenStable();
    expect(el.querySelectorAll('.form-error.is-visible').length).toBe(4);

    await escribir(el, '#c-nombre', 'María López');
    await escribir(el, '#c-correo', 'maria@correo');
    await escribir(el, '#c-asunto', 'Otro');
    await escribir(el, '#c-mensaje', 'Hola, quiero sugerir una historia.');
    await fixture.whenStable();

    enviar();
    await fixture.whenStable();
    const errores = el.querySelectorAll('.form-error.is-visible');
    expect(errores.length).toBe(1);
    expect(errores[0].textContent).toContain('Ingresa un correo válido');

    await escribir(el, '#c-correo', 'maria@correo.com');
    enviar();
    await fixture.whenStable();
    expect(el.querySelectorAll('.form-error.is-visible').length).toBe(0);
    expect(el.querySelector('.form-success')?.classList).toContain('is-visible');
    expect(el.querySelector<HTMLInputElement>('#c-nombre')!.value).toBe('');
  });
});
