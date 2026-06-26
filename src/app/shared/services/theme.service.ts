import { Injectable, inject, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private rendererFactory = inject(RendererFactory2);

  private themeSubject = new BehaviorSubject<ThemeMode>(this.getInitialTheme());
  theme$ = this.themeSubject.asObservable();

  constructor() {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.applyTheme(this.themeSubject.value);
  }

  private getInitialTheme(): ThemeMode {
    // Check localStorage first
    const saved = localStorage.getItem('theme') as ThemeMode;
    if (saved) return saved;

    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  }

  toggleTheme() {
    const newTheme = this.themeSubject.value === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  setTheme(theme: ThemeMode) {
    this.themeSubject.next(theme);
    localStorage.setItem('theme', theme);
    this.applyTheme(theme);
  }

  private applyTheme(theme: ThemeMode) {
    const root = document.documentElement;

    if (theme === 'dark') {
      this.renderer.addClass(root, 'dark');
    } else {
      this.renderer.removeClass(root, 'dark');
    }
  }

  get isDark(): boolean {
    return this.themeSubject.value === 'dark';
  }
}
