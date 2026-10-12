import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { FiltroCategorias } from './filtro-categorias';

@Component({
  imports: [FiltroCategorias],
  template: `<app-filtro-categorias [categorias]="categorias" [(seleccionada)]="actual" />`,
})
class Anfitrion {
  categorias = ['Todas', 'Educación', 'Turismo'];
  actual = signal('Todas');
}

describe('FiltroCategorias', () => {
  it('sincroniza la categoría con el padre en doble vía', async () => {
    const fixture = TestBed.createComponent(Anfitrion);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const chips = el.querySelectorAll<HTMLButtonElement>('.chip');

    expect(chips.length).toBe(3);
    expect(chips[0].classList).toContain('is-active');

    // Vista -> padre
    chips[2].click();
    await fixture.whenStable();
    expect(fixture.componentInstance.actual()).toBe('Turismo');
    expect(chips[2].classList).toContain('is-active');

    // Padre -> vista
    fixture.componentInstance.actual.set('Educación');
    await fixture.whenStable();
    expect(chips[1].classList).toContain('is-active');
    expect(chips[2].classList).not.toContain('is-active');
  });
});
