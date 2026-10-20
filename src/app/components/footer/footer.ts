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
          <a routerLink="/" class="footer-brand" aria-label="INXENUITY Home">
            <!-- Complete INXENUITY Vector Logo with Tagline (inxenuity-logo-svg-1) -->
            <svg class="brand-company-svg" viewBox="0 0 855 155" fill="none" xmlns="http://www.w3.org/2000/svg">
              <style>
                .foot-tagline {
                  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                  font-weight: 500;
                  font-size: 23px;
                  fill: var(--color-logo-tagline, #8C9BAE);
                  letter-spacing: 0.28em;
                }
              </style>
              <g class="brand-lettering" fill="var(--color-logo-white, #F5F7FA)">
                <polygon points="10,18 30,10 30,90 10,90" />
                <polygon points="56,10 75,10 116,60 116,10 136,10 136,90 117,90 76,40 76,90 56,90" />
                <polygon points="158,10 181,10 203,39 225,10 248,10 215,50 250,90 227,90 203,59 179,90 156,90 191,50" />
                <polygon points="272,10 344,10 344,27 292,27 292,41 338,41 338,58 292,58 292,73 346,73 346,90 272,90" />
                <polygon points="372,10 391,10 432,60 432,10 452,10 452,90 433,90 392,40 392,90 372,90" />
                <path d="M480,10 H500 V56 C500,68 508,74 521,74 C534,74 542,68 542,56 V10 H562 V57 C562,79 546,91 521,91 C496,91 480,79 480,57 Z" />
                <polygon points="590,18 610,10 610,90 590,90" />
                <polygon points="632,10 714,10 714,28 683,28 683,90 663,90 663,28 632,28" />
                <polygon points="730,10 753,10 781,46 809,10 832,10 791,62 791,90 771,90 771,62" />
              </g>
              <text x="427" y="142" class="foot-tagline" text-anchor="middle">TECHNOLOGY • SOFTWARE • AI</text>
            </svg>
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

          <!-- Direct Contact Column -->
          <div class="footer-col">
            <h4 class="col-title">DIRECT CONTACT</h4>
            <ul class="col-links">
              <li><a href="mailto:hello@inxenuity.com">hello&#64;inxenuity.com</a></li>
              <li><a href="tel:+919848016664">+91 98480 16664</a></li>
              <li>
                <a href="https://wa.me/919848016664?text=Hello%20INXENUITY%20team,%20I%20would%20like%20to%20learn%20more%20about%20your%20multimodal%20AI%20solutions." target="_blank" rel="noopener noreferrer" style="color: #25D366; font-weight: 500;">
                  WhatsApp Chat ↗
                </a>
              </li>
              <li><span style="color: var(--color-text-secondary); font-size: 0.85rem;">HYDERABAD, IN</span></li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="footer-bottom">
        <div class="container bottom-container">
          <p class="copyright">© 2026 INXENUITY. All rights reserved.</p>
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
      background: var(--color-bg-alt);
      border-top: 1px solid var(--color-border);
      margin-top: 80px;
      position: relative;
      z-index: 10;
      transition: background-color 0.25s ease, border-color 0.25s ease;
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
      text-decoration: none;
      margin-bottom: 22px;
    }

    .brand-company-svg {
      height: 38px;
      width: auto;
      max-width: 220px;
      flex-shrink: 0;
      transition: opacity 0.2s ease, transform 0.2s ease;
    }

    .footer-brand:hover .brand-company-svg {
      opacity: 0.9;
      transform: translateY(-1px);
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
      color: var(--color-text-heading);
      transform: translateX(2px);
    }

    .footer-bottom {
      border-top: 1px solid var(--color-border);
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
