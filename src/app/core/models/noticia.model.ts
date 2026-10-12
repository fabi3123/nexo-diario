/**
 * Modelo de una noticia. Conserva los mismos nombres de campos que la
 * versión vanilla (Entrega 2) para que los datos guardados en
 * localStorage sigan siendo compatibles.
 */
export interface Noticia {
  id: string;
  category: Categoria;
  title: string;
  summary: string;
  image: string;
  /** Fecha en formato ISO `AAAA-MM-DD`. */
  date: string;
  lead?: string;
  body: string[];
}

export const CATEGORIAS = ['Educación', 'Tecnología', 'Turismo', 'Comercio'] as const;

export type Categoria = (typeof CATEGORIAS)[number];

/** Datos que el panel de administración envía para crear una noticia. */
export type NuevaNoticia = Omit<Noticia, 'id'>;
