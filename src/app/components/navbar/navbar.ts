import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BriefingService } from '../../services/briefing.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="navbar-wrapper">
      <div class="container navbar-container">
        <!-- Logo -->
        <a routerLink="/" class="navbar-brand">
          <svg class="brand-logo-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="3.5" fill="#00C2FF" />
            <line x1="20" y1="20" x2="11" y2="11" stroke="#00C2FF" stroke-width="1.2" stroke-opacity="0.7"/>
            <line x1="20" y1="20" x2="29" y2="11" stroke="#00C2FF" stroke-width="1.2" stroke-opacity="0.7"/>
            <line x1="20" y1="20" x2="11" y2="29" stroke="#00C2FF" stroke-width="1.2" stroke-opacity="0.7"/>
            <line x1="20" y1="20" x2="29" y2="29" stroke="#00C2FF" stroke-width="1.2" stroke-opacity="0.7"/>
            <line x1="20" y1="20" x2="20" y2="7" stroke="#0080FF" stroke-width="1" stroke-opacity="0.6"/>
            <line x1="20" y1="20" x2="20" y2="33" stroke="#0080FF" stroke-width="1" stroke-opacity="0.6"/>
            <line x1="20" y1="20" x2="7" y2="20" stroke="#0080FF" stroke-width="1" stroke-opacity="0.6"/>
            <line x1="20" y1="20" x2="33" y2="20" stroke="#0080FF" stroke-width="1" stroke-opacity="0.6"/>
            <circle cx="11" cy="11" r="2.5" fill="#FFFFFF" />
            <circle cx="29" cy="11" r="2.5" fill="#00C2FF" />
            <circle cx="11" cy="29" r="2.5" fill="#00C2FF" />
            <circle cx="29" cy="29" r="2.5" fill="#FFFFFF" />
            <circle cx="20" cy="7" r="1.5" fill="#0080FF" />
            <circle cx="20" cy="33" r="1.5" fill="#0080FF" />
            <circle cx="7" cy="20" r="1.5" fill="#0080FF" />
            <circle cx="33" cy="20" r="1.5" fill="#0080FF" />
            <path d="M 20 7 L 33 20 L 20 33 L 7 20 Z" stroke="#00C2FF" stroke-width="0.8" stroke-dasharray="2 2" stroke-opacity="0.4"/>
          </svg>
          <span class="brand-text">In<span class="brand-gradient">Xenuity</span></span>
        </a>

        <!-- Desktop Navigation Links -->
        <nav class="desktop-nav">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-link">Platform</a>
          <a routerLink="/solutions" routerLinkActive="active" class="nav-link">Solutions</a>
          <a routerLink="/about" routerLinkActive="active" class="nav-link">About</a>
          <a routerLink="/contact" routerLinkActive="active" class="nav-link">Contact</a>
        </nav>

        <!-- Right Action Button -->
        <div class="nav-actions">
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
      background: rgba(7, 9, 14, 0.85);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(24, 35, 55, 0.6);
      z-index: 100;
    }

    .navbar-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
    }

    .navbar-brand {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
    }

    .brand-logo-icon {
      width: 32px;
      height: 32px;
    }

    .brand-text {
      font-size: 1.25rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: #ffffff;
    }

    .brand-gradient {
      color: #ffffff;
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
      color: #ffffff;
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
      gap: 16px;
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
      background: #090e18;
      border-bottom: 1px solid var(--color-border);
    }

    .mobile-link {
      color: var(--color-text-secondary);
      text-decoration: none;
      font-size: 1.05rem;
      padding: 8px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    .mobile-link.active {
      color: var(--color-cyan);
      font-weight: 600;
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
