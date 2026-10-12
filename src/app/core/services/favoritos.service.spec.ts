import { TestBed } from '@angular/core/testing';

import { CLAVE_FAVORITOS } from './almacenamiento';
import { FavoritosService } from './favoritos.service';

describe('FavoritosService', () => {
  beforeEach(() => localStorage.clear());

  it('agrega y quita favoritos, y los persiste en localStorage', () => {
    const service = TestBed.inject(FavoritosService);

    expect(service.alternar('n-001')).toBe(true);
    expect(service.esFavorito('n-001')).toBe(true);
    expect(service.total()).toBe(1);
    expect(JSON.parse(localStorage.getItem(CLAVE_FAVORITOS)!)).toEqual(['n-001']);

    expect(service.alternar('n-001')).toBe(false);
    expect(service.total()).toBe(0);
  });

  it('lee los favoritos guardados previamente', () => {
    localStorage.setItem(CLAVE_FAVORITOS, JSON.stringify(['n-002']));
    const service = TestBed.inject(FavoritosService);
    expect(service.ids()).toEqual(['n-002']);
  });
});
