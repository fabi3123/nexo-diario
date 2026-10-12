import { Component } from '@angular/core';

import { CATEGORIAS } from '../../core/models/noticia.model';

/** Pie de página común. */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
})
export class Footer {
  protected readonly categorias = CATEGORIAS;
  protected readonly anio = new Date().getFullYear();
}
