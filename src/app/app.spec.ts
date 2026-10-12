import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { App } from './app';

describe('App', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }),
  );

  it('renderiza el header con los 5 enlaces y el footer', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelectorAll('.site-nav a').length).toBe(5);
    expect(el.querySelector('.site-footer')?.textContent).toContain('Nexo Diario');
  });

  it('abre y cierra el menú responsive', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    el.querySelector<HTMLButtonElement>('.nav-toggle')!.click();
    await fixture.whenStable();
    expect(el.querySelector('.site-nav')?.classList).toContain('is-open');

    el.querySelector<HTMLButtonElement>('.nav-toggle')!.click();
    await fixture.whenStable();
    expect(el.querySelector('.site-nav')?.classList).not.toContain('is-open');
  });
});
