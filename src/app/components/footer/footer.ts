import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="footer-wrapper">
      <div class="container footer-container">
        <!-- Brand & Description -->
        <div class="footer-brand-col">
          <a routerLink="/" class="footer-brand">
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
            <span class="brand-text">In<span class="brand-white">Xenuity</span></span>
          </a>
          <p class="footer-desc">
            Enterprise-grade multimodal AI architectures engineered for real-time deployment across cloud, edge, and physical AI systems.
          </p>
          <div class="system-status">
            <span class="pulse-dot"></span>
            <span class="status-text">SYSTEMS ONLINE</span>
          </div>
        </div>

        <!-- Links Columns -->
        <div class="footer-links-grid">
          <!-- Platform Column -->
          <div class="footer-col">
            <h4 class="col-title">PLATFORM</h4>
            <ul class="col-links">
              <li><a routerLink="/" fragment="vision">Vision Intelligence</a></li>
              <li><a routerLink="/" fragment="audio">Audio Intelligence</a></li>
              <li><a routerLink="/" fragment="containerised">Containerised Deployment</a></li>
              <li><a routerLink="/" fragment="edge">Edge & Robotics AI</a></li>
            </ul>
          </div>

          <!-- Solutions Column -->
          <div class="footer-col">
            <h4 class="col-title">SOLUTIONS</h4>
            <ul class="col-links">
              <li><a routerLink="/solutions" fragment="digital-twins">Digital Twins</a></li>
              <li><a routerLink="/solutions" fragment="robotics">Physical AI Systems</a></li>
              <li><a routerLink="/solutions" fragment="cloud">Cloud Infrastructure</a></li>
              <li><a routerLink="/solutions" fragment="iot">IoT Integration</a></li>
            </ul>
          </div>

          <!-- Company Column -->
          <div class="footer-col">
            <h4 class="col-title">COMPANY</h4>
            <ul class="col-links">
              <li><a routerLink="/about">About</a></li>
              <li><a routerLink="/contact">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="footer-bottom">
        <div class="container bottom-container">
          <p class="copyright">© 2026 InXenuity. All rights reserved.</p>
          <div class="legal-links">
            <a href="#privacy" (click)="$event.preventDefault()">Privacy Policy</a>
            <a href="#terms" (click)="$event.preventDefault()">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer-wrapper {
      background: #05070a;
      border-top: 1px solid rgba(24, 35, 55, 0.7);
      margin-top: 80px;
      position: relative;
      z-index: 10;
    }

    .footer-container {
      display: flex;
      justify-content: space-between;
      gap: 60px;
      padding-top: 64px;
      padding-bottom: 64px;
    }

    .footer-brand-col {
      max-width: 380px;
    }

    .footer-brand {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      margin-bottom: 20px;
    }

    .brand-logo-icon {
      width: 28px;
      height: 28px;
    }

    .brand-text {
      font-size: 1.25rem;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: -0.02em;
    }

    .brand-white {
      color: #ffffff;
    }

    .footer-desc {
      font-size: 0.88rem;
      line-height: 1.6;
      color: var(--color-text-secondary);
      margin-bottom: 28px;
    }

    .system-status {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 6px 12px;
      background: rgba(16, 185, 129, 0.08);
      border: 1px solid rgba(16, 185, 129, 0.25);
      border-radius: 2px;
    }

    .status-text {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 0.12em;
      color: #34d399;
    }

    .footer-links-grid {
      display: flex;
      gap: 64px;
    }

    .footer-col {
      min-width: 150px;
    }

    .col-title {
      font-family: var(--font-mono);
      font-size: 0.76rem;
      font-weight: 600;
      letter-spacing: 0.14em;
      color: var(--color-cyan);
      margin-bottom: 20px;
      text-transform: uppercase;
    }

    .col-links {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .col-links a {
      color: var(--color-text-secondary);
      text-decoration: none;
      font-size: 0.88rem;
      transition: color 0.2s ease, transform 0.2s ease;
      display: inline-block;
    }

    .col-links a:hover {
      color: #ffffff;
      transform: translateX(2px);
    }

    .footer-bottom {
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      padding: 24px 0;
    }

    .bottom-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .copyright {
      font-size: 0.8rem;
      color: var(--color-text-muted);
    }

    .legal-links {
      display: flex;
      gap: 24px;
    }

    .legal-links a {
      font-size: 0.8rem;
      color: var(--color-text-muted);
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .legal-links a:hover {
      color: var(--color-text-secondary);
    }

    @media (max-width: 900px) {
      .footer-container {
        flex-direction: column;
        gap: 40px;
      }

      .footer-links-grid {
        flex-wrap: wrap;
        gap: 40px;
      }
    }

    @media (max-width: 600px) {
      .bottom-container {
        flex-direction: column;
        gap: 12px;
        text-align: center;
      }
    }
  `]
})
export class FooterComponent {}
