import { Injectable, signal, computed } from '@angular/core';

export type Theme = 'dark' | 'light';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly storageKey = 'inx_theme';
  readonly currentTheme = signal<Theme>('dark');
  readonly isLight = computed(() => this.currentTheme() === 'light');

  constructor() {
    this.initTheme();
  }

  private initTheme(): void {
    if (typeof window === 'undefined') return;

    const saved = localStorage.getItem(this.storageKey) as Theme | null;
    if (saved === 'dark' || saved === 'light') {
      this.applyTheme(saved);
    } else {
      const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
      this.applyTheme(prefersLight ? 'light' : 'dark');
    }
  }

  toggleTheme(): void {
    const nextTheme: Theme = this.currentTheme() === 'dark' ? 'light' : 'dark';
    this.setTheme(nextTheme);
  }

  setTheme(theme: Theme): void {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(this.storageKey, theme);
      } catch (e) {
        console.warn('Unable to persist theme to localStorage', e);
      }
    }
    this.applyTheme(theme);
  }

  private applyTheme(theme: Theme): void {
    this.currentTheme.set(theme);
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    if (theme === 'light') {
      root.classList.add('light-theme');
      document.body?.classList.add('light-theme');
    } else {
      root.classList.remove('light-theme');
      document.body?.classList.remove('light-theme');
    }

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'light' ? '#f8fafc' : '#07090e');
    }
  }
}
