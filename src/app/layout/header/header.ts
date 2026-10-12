import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { FavoritosService } from '../../core/services/favoritos.service';

interface EnlaceMenu {
  ruta: string;
  texto: string;
  exacto: boolean;
}

/** Encabezado común: logo, menú principal y menú responsive. */
@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
})
export class Header {
  protected readonly favoritos = inject(FavoritosService);

  protected readonly menuAbierto = signal(false);

  protected readonly enlaces: EnlaceMenu[] = [
    { ruta: '/', texto: 'Inicio', exacto: true },
    { ruta: '/noticias', texto: 'Noticias', exacto: false },
    { ruta: '/favoritos', texto: 'Favoritos', exacto: false },
    { ruta: '/contacto', texto: 'Contacto', exacto: false },
    { ruta: '/admin', texto: 'Administración', exacto: false },
  ];

  alternarMenu(): void {
    this.menuAbierto.update((abierto) => !abierto);
  }

  cerrarMenu(): void {
    this.menuAbierto.set(false);
  }
}
