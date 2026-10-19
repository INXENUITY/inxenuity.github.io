import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.classList.remove('light-theme');
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.classList.remove('light-theme');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle theme between dark and light', () => {
    service.setTheme('dark');
    expect(service.currentTheme()).toBe('dark');
    expect(service.isLight()).toBe(false);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

    service.toggleTheme();
    expect(service.currentTheme()).toBe('light');
    expect(service.isLight()).toBe(true);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(document.documentElement.classList.contains('light-theme')).toBe(true);
    expect(localStorage.getItem('inx_theme')).toBe('light');

    service.toggleTheme();
    expect(service.currentTheme()).toBe('dark');
    expect(service.isLight()).toBe(false);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(document.documentElement.classList.contains('light-theme')).toBe(false);
    expect(localStorage.getItem('inx_theme')).toBe('dark');
  });
});
