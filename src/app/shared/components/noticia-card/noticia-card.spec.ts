import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Noticia } from '../../../core/models/noticia.model';
import { NoticiaCard } from './noticia-card';

const NOTICIA: Noticia = {
  id: 'n-001',
  category: 'Turismo',
  title: 'Rutas sostenibles',
  summary: 'Viajar con menor impacto',
  image: 'https://example.com/foto.jpg',
  date: '2026-09-08',
  body: [],
};

describe('NoticiaCard', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [provideRouter([])] }));

  it('muestra los datos recibidos por property binding', async () => {
    const fixture = TestBed.createComponent(NoticiaCard);
    fixture.componentRef.setInput('noticia', NOTICIA);
    await fixture.whenStable();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.card-title')?.textContent).toContain('Rutas sostenibles');
    expect(el.querySelector('.card-category')?.textContent).toContain('Turismo');
    expect(el.querySelector('img')?.getAttribute('src')).toBe(NOTICIA.image);
    expect(el.querySelector('a.btn')?.getAttribute('href')).toBe('/noticias/n-001');
  });

  it('emite (remover) con el id al pulsar "Remover"', async () => {
    const fixture = TestBed.createComponent(NoticiaCard);
    fixture.componentRef.setInput('noticia', NOTICIA);
    fixture.componentRef.setInput('mostrarRemover', true);
    await fixture.whenStable();

    const emitidos: string[] = [];
    fixture.componentInstance.remover.subscribe((id) => emitidos.push(id));
    (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>('button')!.click();

    expect(emitidos).toEqual(['n-001']);
  });
});
