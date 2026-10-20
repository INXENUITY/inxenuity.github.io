import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-wrap">
      <!-- HERO SECTION -->
      <section class="hero-section">
        <div class="container">
          <div class="hero-content">
            <div class="tag-eyebrow">DIRECT ENGINEERING ACCESS</div>
            <h1 class="hero-title">
              Connect with Our Systems Architects
            </h1>
            <p class="hero-subtitle">
              No forms, no ticket queues. Reach our engineering leadership directly via WhatsApp, phone, or enterprise email for immediate technical scoping and multimodal AI deployment.
            </p>
          </div>
        </div>
      </section>

      <!-- PRIMARY CONTACT HUBS GRID -->
      <section class="section-padding channels-section">
        <div class="container">
          <div class="channels-grid">
            <!-- 1. WHATSAPP CHAT -->
            <div class="channel-card wa-card google-card">
              <div class="card-header">
                <div class="icon-circle wa-circle">
                  <!-- WhatsApp SVG Icon -->
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.15C10.57 20.15 9.12 19.76 7.85 19L7.55 18.82L4.43 19.64L5.26 16.6L5.06 16.29C4.24 14.97 3.8 13.46 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.32 4.53 17.87 6.08C19.42 7.63 20.28 9.7 20.27 11.9C20.27 16.45 16.58 20.15 12.05 20.15ZM16.57 14.37C16.32 14.24 15.1 13.64 14.87 13.56C14.65 13.47 14.48 13.43 14.32 13.68C14.15 13.93 13.68 14.48 13.54 14.65C13.39 14.81 13.25 14.83 13 14.71C12.75 14.58 11.94 14.32 10.99 13.47C10.25 12.81 9.74 11.99 9.6 11.74C9.46 11.49 9.58 11.36 9.71 11.23C9.82 11.12 9.96 10.94 10.08 10.8C10.21 10.65 10.25 10.55 10.33 10.38C10.42 10.21 10.38 10.07 10.31 9.94C10.25 9.82 9.76 8.61 9.55 8.12C9.35 7.63 9.15 7.7 9 7.69C8.86 7.69 8.7 7.69 8.53 7.69C8.36 7.69 8.1 7.75 7.87 8C7.65 8.25 7 8.86 7 10.08C7 11.3 7.89 12.48 8.01 12.65C8.14 12.82 9.76 15.31 12.24 16.38C12.83 16.64 13.29 16.79 13.65 16.9C14.24 17.09 14.78 17.06 15.21 17C15.69 16.93 16.68 16.4 16.89 15.81C17.1 15.22 17.1 14.71 17.04 14.61C16.97 14.51 16.82 14.49 16.57 14.37Z"/>
                  </svg>
                </div>
                <span class="status-pill green-pill">
                  <span class="pulse-dot"></span>
                  ONLINE
                </span>
              </div>
              <h3 class="card-title">WhatsApp Technical Chat</h3>
              <p class="card-desc">
                Instant messaging with INXENUITY systems engineers for rapid scoping, questions, and architecture consultation.
              </p>
              <div class="card-val">+91 98480 16664</div>
              <div class="card-actions">
                <a 
                  href="https://wa.me/919848016664?text=Hello%20INXENUITY%20team,%20I%20would%20like%20to%20learn%20more%20about%20your%20multimodal%20AI%20solutions." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="btn-wa">
                  <span>Chat on WhatsApp</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
                <button (click)="copyText('+919848016664', 'wa')" class="btn-copy">
                  {{ copiedField() === 'wa' ? 'Copied!' : 'Copy' }}
                </button>
              </div>
            </div>

            <!-- 2. DIRECT PHONE CALL -->
            <div class="channel-card phone-card google-card">
              <div class="card-header">
                <div class="icon-circle phone-circle">
                  <!-- Phone SVG -->
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <span class="status-pill cyan-pill">DIRECT LINE</span>
              </div>
              <h3 class="card-title">Voice Consultation</h3>
              <p class="card-desc">
                Direct phone line to our technical leadership for immediate enterprise conversations and confidential workload reviews.
              </p>
              <div class="card-val">+91 98480 16664</div>
              <div class="card-actions">
                <a href="tel:+919848016664" class="btn-primary" style="flex: 1; justify-content: center;">
                  <span>Call +91 98480 16664</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
                <button (click)="copyText('+919848016664', 'phone')" class="btn-copy">
                  {{ copiedField() === 'phone' ? 'Copied!' : 'Copy' }}
                </button>
              </div>
            </div>

            <!-- 3. ENTERPRISE EMAIL -->
            <div class="channel-card email-card google-card">
              <div class="card-header">
                <div class="icon-circle email-circle">
                  <!-- Mail SVG -->
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <span class="status-pill blue-pill">SLA &lt; 24H</span>
              </div>
              <h3 class="card-title">Enterprise Email</h3>
              <p class="card-desc">
                Send formal RFP briefs, architecture schematics, NDA requests, or workload documentation.
              </p>
              <div class="card-val">hello&#64;inxenuity.com</div>
              <div class="card-actions">
                <a href="mailto:hello@inxenuity.com?subject=Enterprise%20Inquiry%20-%20INXENUITY" class="btn-secondary" style="flex: 1; justify-content: center;">
                  <span>Send Email</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
                <button (click)="copyText('hello@inxenuity.com', 'email')" class="btn-copy">
                  {{ copiedField() === 'email' ? 'Copied!' : 'Copy' }}
                </button>
              </div>
            </div>

            <!-- 4. HEADQUARTERS -->
            <div class="channel-card hq-card google-card">
              <div class="card-header">
                <div class="icon-circle hq-circle">
                  <!-- Map Pin SVG -->
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <span class="status-pill purple-pill">R&amp;D CENTER</span>
              </div>
              <h3 class="card-title">Global Headquarters</h3>
              <p class="card-desc">
                Primary engineering facility for multimodal perception models, edge runtime optimisation, and digital twin simulation.
              </p>
              <div class="card-val">HYDERABAD, IN</div>
              <div class="card-actions">
                <span class="hq-badge">Engineering &amp; Customer Deployments</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- GOOGLE-STYLE COMMITMENT STANDARDS -->
      <section class="section-padding commitments-section">
        <div class="container">
          <div class="section-header text-center">
            <div class="tag-eyebrow no-dot">— HOW WE WORK</div>
            <h2 class="section-title">The INXENUITY Technical Engagement Model</h2>
            <p class="section-subtitle">
              Engineered for enterprises requiring high reliability, mission-critical SLAs, and zero friction.
            </p>
          </div>

          <div class="commitments-grid">
            <div class="commit-card google-card">
              <div class="commit-num">01</div>
              <h4 class="commit-title">Direct Engineering Contact</h4>
              <p class="commit-desc">
                You converse exclusively with researchers and systems architects who write model runtimes and manage production deployments — never generic sales reps.
              </p>
            </div>

            <div class="commit-card google-card">
              <div class="commit-num">02</div>
              <h4 class="commit-title">Mutual NDA Prior to Scoping</h4>
              <p class="commit-desc">
                We execute mutual non-disclosure agreements prior to reviewing proprietary sensor feeds, manufacturing line schematics, or model weights.
              </p>
            </div>

            <div class="commit-card google-card">
              <div class="commit-num">03</div>
              <h4 class="commit-title">Guaranteed Response SLA</h4>
              <p class="commit-desc">
                Every verified technical inquiry on WhatsApp, phone, or email receives an actionable response with an engineering architect within one business day.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .hero-section {
      padding-top: 150px;
      padding-bottom: 70px;
      text-align: center;
    }

    .hero-content {
      max-width: 800px;
      margin: 0 auto;
    }

    .hero-title {
      font-size: clamp(2.4rem, 4.5vw, 3.4rem);
      font-weight: 800;
      letter-spacing: -0.03em;
      margin-bottom: 20px;
    }

    .hero-subtitle {
      font-size: 1.1rem;
      color: var(--color-text-secondary);
      line-height: 1.65;
    }

    /* Google Standard Card Surfaces */
    .google-card {
      border-radius: 16px;
      border: 1px solid var(--color-border);
      background: var(--color-surface);
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    :host-context([data-theme="light"]) .google-card {
      background: #ffffff;
      border-color: #e2e8f0;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
    }

    /* Channels Grid */
    .channels-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
    }

    .channel-card {
      padding: 36px;
      display: flex;
      flex-direction: column;
    }

    .channel-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
      border-color: var(--color-cyan);
    }

    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 22px;
    }

    .icon-circle {
      width: 52px;
      height: 52px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .wa-circle {
      background: rgba(37, 211, 102, 0.14);
      color: #25D366;
    }

    .phone-circle {
      background: rgba(0, 194, 255, 0.14);
      color: var(--color-cyan);
    }

    .email-circle {
      background: rgba(0, 128, 255, 0.14);
      color: var(--color-blue);
    }

    .hq-circle {
      background: rgba(168, 85, 247, 0.14);
      color: #a855f7;
    }

    .status-pill {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      padding: 4px 10px;
      border-radius: 9999px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .green-pill {
      background: rgba(37, 211, 102, 0.12);
      color: #25D366;
      border: 1px solid rgba(37, 211, 102, 0.3);
    }

    .cyan-pill {
      background: rgba(0, 194, 255, 0.12);
      color: var(--color-cyan);
      border: 1px solid rgba(0, 194, 255, 0.3);
    }

    .blue-pill {
      background: rgba(0, 128, 255, 0.12);
      color: #60a5fa;
      border: 1px solid rgba(0, 128, 255, 0.3);
    }

    .purple-pill {
      background: rgba(168, 85, 247, 0.12);
      color: #c084fc;
      border: 1px solid rgba(168, 85, 247, 0.3);
    }

    .card-title {
      font-size: 1.35rem;
      font-weight: 700;
      color: var(--color-text-heading);
      margin-bottom: 10px;
    }

    .card-desc {
      font-size: 0.95rem;
      color: var(--color-text-secondary);
      line-height: 1.6;
      margin-bottom: 20px;
      flex: 1;
    }

    .card-val {
      font-family: var(--font-mono);
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--color-text-heading);
      margin-bottom: 24px;
      padding: 12px 16px;
      background: var(--color-surface-hover);
      border-radius: 8px;
      border: 1px solid var(--color-border);
    }

    .card-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .btn-wa {
      flex: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      background: #25D366;
      color: #ffffff;
      font-family: var(--font-sans);
      font-size: 0.92rem;
      font-weight: 600;
      padding: 12px 20px;
      border-radius: 8px;
      text-decoration: none;
      transition: all 0.2s ease;
      box-shadow: 0 4px 16px rgba(37, 211, 102, 0.3);
    }

    .btn-wa:hover {
      background: #1ebc57;
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(37, 211, 102, 0.45);
    }

    .btn-copy {
      padding: 12px 16px;
      border-radius: 8px;
      border: 1px solid var(--color-border);
      background: var(--color-surface-hover);
      color: var(--color-text-secondary);
      font-family: var(--font-mono);
      font-size: 0.8rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-copy:hover {
      color: var(--color-text-heading);
      border-color: var(--color-cyan);
    }

    .hq-badge {
      display: inline-block;
      font-family: var(--font-mono);
      font-size: 0.82rem;
      color: var(--color-text-secondary);
      padding: 12px 0;
    }

    /* Commitments Section */
    .commitments-section {
      background: var(--color-bg-alt);
      border-top: 1px solid var(--color-border);
    }

    .text-center {
      text-align: center;
    }

    .section-header {
      max-width: 720px;
      margin: 0 auto 56px auto;
    }

    .section-subtitle {
      font-size: 1.05rem;
      color: var(--color-text-secondary);
      margin-top: 14px;
    }

    .commitments-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }

    .commit-card {
      padding: 36px 30px;
      display: flex;
      flex-direction: column;
    }

    .commit-num {
      font-family: var(--font-mono);
      font-size: 1.6rem;
      font-weight: 800;
      color: var(--color-cyan);
      margin-bottom: 16px;
    }

    .commit-title {
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--color-text-heading);
      margin-bottom: 12px;
    }

    .commit-desc {
      font-size: 0.92rem;
      color: var(--color-text-secondary);
      line-height: 1.65;
    }

    @media (max-width: 992px) {
      .channels-grid {
        grid-template-columns: 1fr;
      }
      .commitments-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 600px) {
      .channel-card {
        padding: 24px 20px;
      }
      .card-actions {
        flex-direction: column;
        align-items: stretch;
      }
      .btn-copy {
        text-align: center;
      }
    }
  `]
})
export class ContactComponent {
  copiedField = signal<string | null>(null);

  copyText(text: string, field: string): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      this.copiedField.set(field);
      setTimeout(() => {
        this.copiedField.set(null);
      }, 2000);
    }
  }
}
