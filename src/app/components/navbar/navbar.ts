import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BriefingService } from '../../services/briefing.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="navbar-wrapper">
      <div class="container navbar-container">
        <!-- Logo -->
        <a routerLink="/" class="navbar-brand" aria-label="INXENUITY Home">
          <!-- IXY Short Form Vector Logo (ixy-logo-svg-2) -->
          <svg class="brand-ixy-svg" viewBox="0 0 410 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="ixyCyanGradNav" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#00E5FF" />
                <stop offset="100%" stop-color="#00B8D4" />
              </linearGradient>
              <linearGradient id="ixySilverGradNav" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#B8C4D0" />
                <stop offset="100%" stop-color="#90A0B0" />
              </linearGradient>
            </defs>
            <polygon points="68,10 96,10 38,150 10,150" fill="url(#ixyCyanGradNav)" />
            <polygon class="ixy-x-path" points="110,150 140,150 240,10 210,10" fill="var(--color-logo-white, #F5F7FA)" />
            <polygon class="ixy-x-path" points="110,10 140,10 173,56 158,77" fill="var(--color-logo-white, #F5F7FA)" />
            <polygon class="ixy-x-path" points="186,104 201,83 249,150 219,150" fill="var(--color-logo-white, #F5F7FA)" />
            <polygon class="ixy-y-path" points="261,10 291,10 330,68 369,10 399,10 344,90 344,150 316,150 316,90" fill="url(#ixySilverGradNav)" />
          </svg>
        </a>

        <!-- Desktop Navigation Links -->
        <nav class="desktop-nav">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-link">Platform</a>
          <a routerLink="/solutions" routerLinkActive="active" class="nav-link">Solutions</a>
          <a routerLink="/about" routerLinkActive="active" class="nav-link">About</a>
          <a routerLink="/contact" routerLinkActive="active" class="nav-link">Contact</a>
        </nav>

        <!-- Right Action Button & Theme Toggle -->
        <div class="nav-actions">
          <!-- Theme Switch Button -->
          <button 
            type="button"
            (click)="themeService.toggleTheme()" 
            class="btn-theme-toggle" 
            [attr.aria-label]="themeService.isLight() ? 'Switch to dark theme' : 'Switch to light theme'"
            [title]="themeService.isLight() ? 'Switch to dark theme' : 'Switch to light theme'">
            <!-- Sun icon in light mode -->
            <svg *ngIf="themeService.isLight()" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <!-- Moon icon in dark mode -->
            <svg *ngIf="!themeService.isLight()" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>

          <button (click)="briefingService.open()" class="btn-nav-briefing">Request a Briefing</button>

          <!-- Mobile Hamburger -->
          <button (click)="toggleMobileMenu()" class="mobile-toggle" aria-label="Toggle menu">
            <svg *ngIf="!isMobileMenuOpen()" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
            <svg *ngIf="isMobileMenuOpen()" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Dropdown Menu -->
      <div *ngIf="isMobileMenuOpen()" class="mobile-menu">
        <a routerLink="/" (click)="closeMobileMenu()" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="mobile-link">Platform</a>
        <a routerLink="/solutions" (click)="closeMobileMenu()" routerLinkActive="active" class="mobile-link">Solutions</a>
        <a routerLink="/about" (click)="closeMobileMenu()" routerLinkActive="active" class="mobile-link">About</a>
        <a routerLink="/contact" (click)="closeMobileMenu()" routerLinkActive="active" class="mobile-link">Contact</a>
        <button type="button" (click)="themeService.toggleTheme()" class="mobile-theme-row">
          <span class="theme-row-label">THEME</span>
          <span class="theme-row-val">
            <svg *ngIf="themeService.isLight()" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px;">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
            </svg>
            <svg *ngIf="!themeService.isLight()" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px;">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
            {{ themeService.isLight() ? 'LIGHT' : 'DARK' }}
          </span>
        </button>
        <button (click)="onMobileBriefing()" class="btn-nav-briefing w-full" style="justify-content: center; margin-top: 12px;">Request a Briefing</button>
      </div>
    </header>
  `,
  styles: [`
    .navbar-wrapper {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 72px;
      background: var(--color-nav-bg, rgba(7, 9, 14, 0.85));
      backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--color-border);
      z-index: 100;
      transition: background-color 0.25s ease, border-color 0.25s ease;
    }

    .navbar-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
    }

    .navbar-brand {
      display: inline-flex;
      align-items: center;
      text-decoration: none;
    }

    .brand-ixy-svg {
      height: 36px;
      width: auto;
      max-width: 95px;
      filter: drop-shadow(0 0 10px rgba(0, 229, 255, 0.45));
      transition: filter 0.25s ease, transform 0.25s ease;
      flex-shrink: 0;
    }

    .ixy-x-path {
      fill: var(--color-logo-white);
      transition: fill 0.2s ease;
    }

    .ixy-y-path {
      transition: fill 0.2s ease;
    }

    :host-context([data-theme="light"]) .ixy-y-path {
      fill: #64748b;
    }

    .navbar-brand:hover .brand-ixy-svg {
      filter: drop-shadow(0 0 18px rgba(0, 229, 255, 0.75));
      transform: translateY(-1px);
    }

    .desktop-nav {
      display: flex;
      align-items: center;
      gap: 36px;
    }

    .nav-link {
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--color-text-secondary);
      text-decoration: none;
      transition: color 0.2s ease;
      position: relative;
      padding: 6px 0;
    }

    .nav-link:hover {
      color: var(--color-text-heading);
    }

    .nav-link.active {
      color: var(--color-cyan);
    }

    .nav-link.active::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 2px;
      background: var(--color-cyan);
      box-shadow: 0 0 8px var(--color-cyan);
      border-radius: 1px;
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .btn-theme-toggle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      background: transparent;
      border: 1px solid var(--color-border);
      border-radius: 4px;
      color: var(--color-text-secondary);
      cursor: pointer;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }

    .btn-theme-toggle:hover {
      color: var(--color-cyan);
      border-color: var(--color-cyan);
      background: rgba(0, 194, 255, 0.08);
      box-shadow: 0 0 10px var(--color-border-glow);
    }

    .mobile-toggle {
      display: none;
      background: transparent;
      border: none;
      color: var(--color-text-secondary);
      cursor: pointer;
      padding: 6px;
    }

    .mobile-menu {
      display: none;
      flex-direction: column;
      gap: 12px;
      padding: 24px;
      background: var(--color-surface);
      border-bottom: 1px solid var(--color-border);
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
    }

    .mobile-link {
      color: var(--color-text-body);
      text-decoration: none;
      font-size: 1.05rem;
      padding: 10px 0;
      border-bottom: 1px solid var(--color-border);
    }

    .mobile-link.active {
      color: var(--color-cyan);
      font-weight: 600;
    }

    .mobile-theme-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 14px;
      margin-top: 6px;
      border: 1px solid var(--color-border);
      border-radius: 4px;
      background: var(--color-surface-hover);
      color: var(--color-text-body);
      font-family: var(--font-mono);
      font-size: 0.82rem;
      cursor: pointer;
    }

    .theme-row-label {
      color: var(--color-text-secondary);
      font-weight: 500;
      letter-spacing: 0.08em;
    }

    .theme-row-val {
      display: inline-flex;
      align-items: center;
      color: var(--color-cyan);
      font-weight: 700;
    }

    @media (max-width: 820px) {
      .desktop-nav {
        display: none;
      }

      .mobile-toggle {
        display: block;
      }

      .mobile-menu {
        display: flex;
      }
    }
  `]
})
export class NavbarComponent {
  readonly briefingService = inject(BriefingService);
  readonly themeService = inject(ThemeService);
  isMobileMenuOpen = signal(false);

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(v => !v);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  onMobileBriefing(): void {
    this.closeMobileMenu();
    this.briefingService.open();
  }
}
