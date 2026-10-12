import { Pipe, PipeTransform } from '@angular/core';

const MESES = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
];

/**
 * Convierte una fecha ISO (`2026-09-12`) en texto largo en español
 * (`12 de septiembre de 2026`). Uso: `{{ noticia.date | fechaLarga }}`.
 */
@Pipe({ name: 'fechaLarga' })
export class FechaLargaPipe implements PipeTransform {
  transform(iso: string | null | undefined): string {
    if (!iso) return '';
    const partes = iso.split('-');
    if (partes.length !== 3) return iso;
    const [anio, mes, dia] = partes;
    const m = parseInt(mes, 10) - 1;
    const d = parseInt(dia, 10);
    if (isNaN(m) || isNaN(d) || !MESES[m]) return iso;
    return `${d} de ${MESES[m]} de ${anio}`;
  }
}
