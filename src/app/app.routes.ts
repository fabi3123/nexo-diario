import { Routes } from '@angular/router';

import { Admin } from './pages/admin/admin';
import { Contacto } from './pages/contacto/contacto';
import { Detalle } from './pages/detalle/detalle';
import { Favoritos } from './pages/favoritos/favoritos';
import { Inicio } from './pages/inicio/inicio';
import { Noticias } from './pages/noticias/noticias';

export const routes: Routes = [
  { path: '', component: Inicio, title: 'Nexo Diario — Inicio' },
  { path: 'noticias', component: Noticias, title: 'Nexo Diario — Noticias' },
  { path: 'noticias/:id', component: Detalle, title: 'Nexo Diario — Detalle de noticia' },
  { path: 'favoritos', component: Favoritos, title: 'Nexo Diario — Favoritos' },
  { path: 'contacto', component: Contacto, title: 'Nexo Diario — Contacto' },
  { path: 'admin', component: Admin, title: 'Nexo Diario — Administración' },
  { path: '**', redirectTo: '' },
];
