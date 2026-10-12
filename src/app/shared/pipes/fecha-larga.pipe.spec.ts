import { FechaLargaPipe } from './fecha-larga.pipe';

describe('FechaLargaPipe', () => {
  const pipe = new FechaLargaPipe();

  it('convierte una fecha ISO en texto largo en español', () => {
    expect(pipe.transform('2026-09-12')).toBe('12 de septiembre de 2026');
    expect(pipe.transform('2026-01-05')).toBe('5 de enero de 2026');
  });

  it('devuelve el valor original si no es una fecha ISO', () => {
    expect(pipe.transform('ayer')).toBe('ayer');
    expect(pipe.transform('2026-13-01')).toBe('2026-13-01');
    expect(pipe.transform(undefined)).toBe('');
  });
});
