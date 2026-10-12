import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Noticia } from '../models/noticia.model';
import { CLAVE_NOTICIAS } from './almacenamiento';
import { FavoritosService } from './favoritos.service';
import { NoticiasService } from './noticias.service';

const NOTICIAS: Noticia[] = [
  {
    id: 'n-001',
    category: 'Educación',
    title: 'Primera',
    summary: 'Resumen',
    image: 'https://example.com/1.jpg',
    date: '2026-09-12',
    body: ['Párrafo'],
  },
];

describe('NoticiasService', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
  });

  afterEach(() => TestBed.inject(HttpTestingController).verify());

  it('carga el JSON inicial con HttpClient en la primera visita', () => {
    const service = TestBed.inject(NoticiasService);
    expect(service.cargando()).toBe(true);

    TestBed.inject(HttpTestingController).expectOne(NoticiasService.URL_DATOS).flush(NOTICIAS);

    expect(service.cargando()).toBe(false);
    expect(service.noticias()).toEqual(NOTICIAS);
    expect(JSON.parse(localStorage.getItem(CLAVE_NOTICIAS)!)).toEqual(NOTICIAS);
  });

  it('usa localStorage cuando ya hay noticias guardadas', () => {
    localStorage.setItem(CLAVE_NOTICIAS, JSON.stringify(NOTICIAS));
    const service = TestBed.inject(NoticiasService);

    TestBed.inject(HttpTestingController).expectNone(NoticiasService.URL_DATOS);
    expect(service.cargando()).toBe(false);
    expect(service.buscarPorId('n-001')?.title).toBe('Primera');
  });

  it('crea noticias al inicio y al eliminarlas las quita de favoritos', () => {
    localStorage.setItem(CLAVE_NOTICIAS, JSON.stringify(NOTICIAS));
    const service = TestBed.inject(NoticiasService);
    const favoritos = TestBed.inject(FavoritosService);

    const nueva = service.crear({ ...NOTICIAS[0], title: 'Nueva' });
    expect(service.noticias()[0]).toEqual(nueva);
    expect(service.noticias().length).toBe(2);

    favoritos.alternar(nueva.id);
    service.eliminar(nueva.id);

    expect(service.buscarPorId(nueva.id)).toBeUndefined();
    expect(favoritos.esFavorito(nueva.id)).toBe(false);
  });

  it('expone un mensaje de error si el JSON no se puede cargar', () => {
    const service = TestBed.inject(NoticiasService);
    TestBed.inject(HttpTestingController)
      .expectOne(NoticiasService.URL_DATOS)
      .flush('', { status: 404, statusText: 'Not Found' });

    expect(service.cargando()).toBe(false);
    expect(service.error()).toContain('No se pudieron cargar');
  });
});
