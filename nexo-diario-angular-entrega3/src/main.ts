import { Component, EventEmitter, Injectable, Input, Output, inject } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet, provideRouter, withHashLocation } from '@angular/router';

type Category = 'Educación' | 'Tecnología' | 'Turismo' | 'Comercio';

interface News {
  id: string;
  category: Category;
  title: string;
  summary: string;
  image: string;
  date: string;
  lead: string;
  body: string[];
}

const INITIAL_NEWS: News[] = [
  {
    id: 'n-001',
    category: 'Educación',
    title: 'Aulas que inspiran: aprender más allá de las pantallas',
    summary: 'Nuevos modelos pedagógicos combinan creatividad, comunidad y herramientas digitales.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=70',
    date: '2026-09-12',
    lead: 'Docentes y estudiantes están rediseñando la experiencia educativa con espacios flexibles, proyectos reales y tecnología usada con propósito.',
    body: [
      'La transformación educativa no depende únicamente de incorporar dispositivos. En distintos centros, las clases comienzan con una pregunta concreta y avanzan mediante investigación, conversación y trabajo colaborativo.',
      'Las herramientas digitales ayudan a documentar procesos, conectar expertos y ofrecer retroalimentación oportuna. El verdadero cambio aparece cuando cada recurso responde a una necesidad pedagógica clara.'
    ]
  },
  {
    id: 'n-002',
    category: 'Tecnología',
    title: 'La inteligencia artificial llega a las pequeñas empresas',
    summary: 'Soluciones accesibles están transformando tareas cotidianas y decisiones de negocio.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=70',
    date: '2026-09-10',
    lead: 'Herramientas antes exclusivas de grandes corporaciones ya son asequibles para negocios pequeños que buscan escalar sin perder cercanía.',
    body: [
      'Automatizaciones sencillas permiten liberar tiempo del equipo en tareas repetitivas: respuesta a clientes, reportes básicos y clasificación de correos.',
      'La adopción exitosa combina formación breve, procesos claros y una cultura abierta a experimentar sin miedo a los errores tempranos.'
    ]
  },
  {
    id: 'n-003',
    category: 'Turismo',
    title: 'Rutas sostenibles para descubrir destinos cercanos',
    summary: 'Viajar con menor impacto impulsa economías locales y experiencias auténticas.',
    image: 'assets/turismo.jpg',
    date: '2026-09-08',
    lead: 'El turismo cercano está en auge: menos horas de traslado, más contacto con las comunidades y una huella ambiental más contenida.',
    body: [
      'Muchos viajeros priorizan hospedajes de propietarios locales, transporte compartido y recorridos guiados por habitantes del lugar.',
      'La sostenibilidad no se limita al entorno natural: también implica pagar precios justos, respetar tradiciones y volver a casa con historias, no con excesos.'
    ]
  },
  {
    id: 'n-004',
    category: 'Comercio',
    title: 'Mercados locales se conectan con nuevos compradores',
    summary: 'Emprendedores adoptan vitrinas digitales sin perder la cercanía de sus comunidades.',
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1200&q=70',
    date: '2026-09-05',
    lead: 'Plazas de mercado y tiendas de barrio se abren a canales digitales que amplían su alcance manteniendo el trato directo con el cliente.',
    body: [
      'Catálogos en línea, pedidos por mensajería y pagos electrónicos permiten crecer sin sacrificar la personalidad del negocio.',
      'El reto es sostener la calidad del producto y la promesa de servicio a medida que llegan más pedidos desde nuevos vecindarios.'
    ]
  },
  {
    id: 'n-005',
    category: 'Educación',
    title: 'Bibliotecas comunitarias reinventan la lectura pública',
    summary: 'Nuevos espacios integran clubes de lectura, talleres y recursos digitales gratuitos.',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=70',
    date: '2026-09-02',
    lead: 'Las bibliotecas dejaron de ser solo salas silenciosas: hoy son puntos de encuentro donde convergen lectura, cultura y aprendizaje.',
    body: [
      'Programaciones semanales acercan a niños, jóvenes y adultos mayores a la lectura crítica y a la producción de contenido propio.',
      'El acceso a computadores, wifi y clubes temáticos permite ampliar oportunidades sin renunciar al placer de un libro impreso.'
    ]
  },
  {
    id: 'n-006',
    category: 'Tecnología',
    title: 'Ciberseguridad: hábitos simples que evitan grandes pérdidas',
    summary: 'Contraseñas robustas, doble factor y respaldos periódicos siguen siendo la mejor defensa.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=70',
    date: '2026-08-30',
    lead: 'La mayoría de incidentes digitales se previenen con prácticas básicas y consistentes en el día a día, tanto en casa como en el trabajo.',
    body: [
      'El factor humano sigue siendo el eslabón más frágil: un correo bien redactado puede engañar a cualquiera que esté distraído.',
      'Activar autenticación en dos pasos, actualizar el sistema operativo y respaldar la información son los tres pasos que más impacto tienen.'
    ]
  }
];

@Injectable({ providedIn: 'root' })
class NewsService {
  private readonly newsKey = 'nexo-angular:news';
  private readonly favKey = 'nexo-angular:favorites';

  getNews(): News[] {
    const stored = this.read<News[]>(this.newsKey);
        if (stored) {
      const turismo = stored.find(item => item.id === 'n-003');
      if (turismo && turismo.image !== 'assets/turismo.jpg') {
        turismo.image = 'assets/turismo.jpg';
        this.write(this.newsKey, stored);
      }
      return stored;
    }
    this.write(this.newsKey, INITIAL_NEWS);
    return INITIAL_NEWS;
  }

  getById(id: string | null): News | undefined {
    return this.getNews().find((item) => item.id === id);
  }

  create(news: Omit<News, 'id' | 'date'>): void {
    const item: News = { ...news, id: `n-${Date.now()}`, date: new Date().toISOString().slice(0, 10) };
    this.write(this.newsKey, [item, ...this.getNews()]);
  }

  delete(id: string): void {
    this.write(this.newsKey, this.getNews().filter((item) => item.id !== id));
    this.write(this.favKey, this.getFavorites().filter((favId) => favId !== id));
  }

  getFavorites(): string[] {
    return this.read<string[]>(this.favKey) ?? [];
  }

  isFavorite(id: string): boolean {
    return this.getFavorites().includes(id);
  }

  toggleFavorite(id: string): void {
    const favs = this.getFavorites();
    const next = favs.includes(id) ? favs.filter((favId) => favId !== id) : [...favs, id];
    this.write(this.favKey, next);
  }

  private read<T>(key: string): T | null {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) as T : null;
    } catch {
      return null;
    }
  }

  private write<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  template: `
    <article class="card">
      <img [src]="news.image" [alt]="news.title">
      <div class="card-body">
        <span class="tag">{{ news.category }}</span>
        <h3>{{ news.title }}</h3>
        <p>{{ news.summary }}</p>
        <div class="card-actions">
          <a class="btn btn-outline" [routerLink]="['/detalle', news.id]">Ver más</a>
          <button *ngIf="showRemove" class="btn btn-danger" type="button" (click)="remove.emit(news.id)">Eliminar</button>
        </div>
      </div>
    </article>
  `
})
class NewsCardComponent {
  @Input({ required: true }) 
  news!: News;

  @Input()
  showRemove = false;

  @Output()
  remove = new EventEmitter<string>();
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NewsCardComponent, RouterLink],
  template: `
    <section class="hero">
      <div>
        <p class="eyebrow">Nexo Diario</p>
        <h1>Historias que explican el mundo que compartimos</h1>
        <p>Noticias de educación, tecnología, turismo y comercio con una experiencia clara, rápida y cercana.</p>
        <a class="btn btn-primary" routerLink="/noticias">Explorar noticias</a>
      </div>
      <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=70" alt="Periódicos impresos">
    </section>
    <section class="section">
      <div class="section-head">
        <div>
          <h2>Noticias destacadas</h2>
          <p>Contenido reciente renderizado con Angular.</p>
        </div>
        <a class="btn btn-outline" routerLink="/noticias">Ver todas</a>
      </div>
      <div class="grid">
        <app-news-card *ngFor="let item of featured" [news]="item"></app-news-card>
      </div>
    </section>
  `
})
class HomeComponent {
  featured = inject(NewsService).getNews().slice(0, 3);
}

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [CommonModule, NewsCardComponent],
  template: `
    <section class="section">
      <div class="section-head">
        <div>
          <h1>Todas las noticias</h1>
          <p>Filtra el contenido por categoría usando data binding.</p>
        </div>
      </div>
      <div class="chips">
        <button *ngFor="let item of categories" type="button" [class.active]="selected === item" (click)="selected = item">{{ item }}</button>
      </div>
      <div class="grid">
        <app-news-card *ngFor="let item of filteredNews" [news]="item"></app-news-card>
      </div>
    </section>
  `
})
class NewsListComponent {
  private service = inject(NewsService);
  categories = ['Todas', 'Educación', 'Tecnología', 'Turismo', 'Comercio'];
  selected = 'Todas';
  news = this.service.getNews();

  get filteredNews(): News[] {
    return this.selected === 'Todas' ? this.news : this.news.filter((item) => item.category === this.selected);
  }
}

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  template: `
    <article *ngIf="news; else empty" class="detail">
      <p class="eyebrow">{{ news.category }} · {{ news.date | date:'dd/MM/yyyy' }}</p>
      <h1>{{ news.title }}</h1>
      <p class="lead">{{ news.lead }}</p>
      <img [src]="news.image" [alt]="news.title">
      <div class="detail-actions">
        <button class="btn btn-primary" type="button" (click)="toggleFavorite()">{{ isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos' }}</button>
        <a class="btn btn-outline" routerLink="/contacto">Ir a contacto</a>
      </div>
      <p *ngFor="let paragraph of news.body">{{ paragraph }}</p>
    </article>
    <ng-template #empty>
      <div class="empty">
        <h1>Noticia no encontrada</h1>
        <a class="btn btn-primary" routerLink="/noticias">Volver a noticias</a>
      </div>
    </ng-template>
  `
})
class DetailComponent {
  private service = inject(NewsService);
  private route = inject(ActivatedRoute);
  news = this.service.getById(this.route.snapshot.paramMap.get('id'));

  get isFavorite(): boolean {
    return this.news ? this.service.isFavorite(this.news.id) : false;
  }

  toggleFavorite(): void {
    if (this.news) {
      this.service.toggleFavorite(this.news.id);
    }
  }
}

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, NewsCardComponent, RouterLink],
  template: `
    <section class="section">
      <div class="section-head">
        <div>
          <h1>Tus favoritos</h1>
          <p>{{ favorites.length }} guardado{{ favorites.length === 1 ? '' : 's' }}</p>
        </div>
      </div>
      <div *ngIf="favorites.length; else empty" class="grid">
        <app-news-card *ngFor="let item of favorites" [news]="item" [showRemove]="true" (remove)="removeFavorite($event)"></app-news-card>
      </div>
      <ng-template #empty>
        <div class="empty">
          <h2>Aún no has guardado favoritos</h2>
          <p>Explora las noticias y guarda las que quieras leer después.</p>
          <a class="btn btn-primary" routerLink="/noticias">Explorar noticias</a>
        </div>
      </ng-template>
    </section>
  `
})
class FavoritesComponent {
  private service = inject(NewsService);
  favorites = this.load();

  removeFavorite(id: string): void {
    this.service.toggleFavorite(id);
    this.favorites = this.load();
  }

  private load(): News[] {
    return this.service.getFavorites()
      .map((id) => this.service.getById(id))
      .filter((item): item is News => Boolean(item));
  }
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <section class="two-col">
      <div>
        <p class="eyebrow">Contacto</p>
        <h1>Tu mensaje también es noticia</h1>
        <p>Envíanos comentarios, sugerencias o propuestas para mejorar Nexo Diario.</p>
      </div>
      <form class="panel" #formRef="ngForm" (ngSubmit)="submit(formRef.valid ?? false)">
        <label>Nombre<input name="nombre" [(ngModel)]="form.nombre" required></label>
        <label>Correo<input name="correo" [(ngModel)]="form.correo" required email></label>
        <label>Asunto<input name="asunto" [(ngModel)]="form.asunto" required></label>
        <label>Mensaje<textarea name="mensaje" [(ngModel)]="form.mensaje" required></textarea></label>
        <button class="btn btn-primary" type="submit">Enviar mensaje</button>
        <p *ngIf="sent" class="success">Mensaje enviado correctamente.</p>
        <p *ngIf="attempted && !sent" class="error">Revisa los campos obligatorios y el formato del correo.</p>
      </form>
    </section>
  `
})
class ContactComponent {
  form = { nombre: '', correo: '', asunto: '', mensaje: '' };
  sent = false;
  attempted = false;

  submit(valid: boolean): void {
    this.attempted = true;
    this.sent = valid;
  }
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <section class="admin">
      <form class="panel" (ngSubmit)="create()">
        <h1>Administrar noticias</h1>
        <label>Título<input name="title" [(ngModel)]="draft.title" required></label>
        <label>Categoría
          <select name="category" [(ngModel)]="draft.category">
            <option>Educación</option>
            <option>Tecnología</option>
            <option>Turismo</option>
            <option>Comercio</option>
          </select>
        </label>
        <label>URL de imagen<input name="image" [(ngModel)]="draft.image" required></label>
        <label>Resumen<textarea name="summary" [(ngModel)]="draft.summary" required></textarea></label>
        <label>Contenido<textarea name="body" [(ngModel)]="draft.body" required></textarea></label>
        <button class="btn btn-primary" type="submit">Publicar noticia</button>
      </form>
      <div class="panel">
        <h2>Noticias publicadas</h2>
        <p>{{ news.length }} publicada{{ news.length === 1 ? '' : 's' }}</p>
        <div *ngFor="let item of news" class="row">
          <img [src]="item.image" [alt]="item.title">
          <div>
            <strong>{{ item.title }}</strong>
            <small>{{ item.category }}</small>
          </div>
          <button type="button" class="delete" (click)="delete(item.id)">Eliminar</button>
        </div>
      </div>
    </section>
  `
})
class AdminComponent {
  private service = inject(NewsService);
  news = this.service.getNews();
  draft = {
    title: '',
    category: 'Educación' as Category,
    image: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1200&q=70',
    summary: '',
    body: ''
  };

  create(): void {
    if (!this.draft.title || !this.draft.summary || !this.draft.body || !this.draft.image) {
      return;
    }
    this.service.create({
      category: this.draft.category,
      title: this.draft.title,
      image: this.draft.image,
      summary: this.draft.summary,
      lead: this.draft.summary,
      body: this.draft.body.split('\n').filter(Boolean)
    });
    this.news = this.service.getNews();
    this.draft = { ...this.draft, title: '', summary: '', body: '' };
  }

  delete(id: string): void {
    this.service.delete(id);
    this.news = this.service.getNews();
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <header class="site-header">
      <div class="container nav">
        <a class="brand" routerLink="/"><span>ND</span>Nexo Diario</a>
        <nav>
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Inicio</a>
          <a routerLink="/noticias" routerLinkActive="active">Noticias</a>
          <a routerLink="/favoritos" routerLinkActive="active">Favoritos</a>
          <a routerLink="/contacto" routerLinkActive="active">Contacto</a>
          <a routerLink="/admin" routerLinkActive="active">Administración</a>
        </nav>
      </div>
    </header>
    <main class="container main">
      <router-outlet></router-outlet>
    </main>
    <footer class="site-footer">
      <div class="container footer">Nexo Diario · Educación · Tecnología · Turismo · Comercio</div>
    </footer>
  `
})
class AppComponent {}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', component: HomeComponent },
      { path: 'noticias', component: NewsListComponent },
      { path: 'detalle/:id', component: DetailComponent },
      { path: 'favoritos', component: FavoritesComponent },
      { path: 'contacto', component: ContactComponent },
      { path: 'admin', component: AdminComponent },
      { path: '**', redirectTo: '' }
    ], withHashLocation())
  ]
}).catch((error) => console.error(error));
