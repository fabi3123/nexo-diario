/**
 * Utilidades de lectura/escritura sobre localStorage.
 * Las claves son las mismas de la versión vanilla (Entrega 2).
 */
export const CLAVE_NOTICIAS = 'nexo:news';
export const CLAVE_FAVORITOS = 'nexo:favorites';

export function leerLista<T>(clave: string): T[] | null {
  try {
    const crudo = localStorage.getItem(clave);
    return crudo ? (JSON.parse(crudo) as T[]) : null;
  } catch (err) {
    console.error('Error leyendo', clave, err);
    return null;
  }
}

export function escribirLista<T>(clave: string, valor: readonly T[]): void {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
  } catch (err) {
    console.error('Error escribiendo', clave, err);
  }
}
