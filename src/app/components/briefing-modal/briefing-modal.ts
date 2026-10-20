import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-briefing-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isOpen" class="modal-overlay" (click)="onBackdropClick($event)">
      <div class="modal-card hud-card hud-bracket-tl-br">
        <!-- Close Button -->
        <button class="modal-close" (click)="close.emit()" aria-label="Close modal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div class="tag-eyebrow">DIRECT ENGINEERING ENGAGEMENT</div>
        <h2 class="modal-title">Connect with INXENUITY</h2>
        <p class="modal-desc">
          No forms, no wait queues. Connect directly with our systems architects and technical leadership via your preferred channel for an immediate workload review.
        </p>

        <!-- Direct Channel Cards -->
        <div class="direct-channels-grid">
          <!-- 1. WhatsApp -->
          <a 
            href="https://wa.me/919848016664?text=Hello%20INXENUITY%20team,%20I%20would%20like%20to%20learn%20more%20about%20your%20multimodal%20AI%20solutions." 
            target="_blank" 
            rel="noopener noreferrer" 
            class="channel-box whatsapp-box">
            <div class="channel-top">
              <div class="channel-icon-wrap wa-icon-wrap">
                <!-- WhatsApp SVG Icon -->
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.15C10.57 20.15 9.12 19.76 7.85 19L7.55 18.82L4.43 19.64L5.26 16.6L5.06 16.29C4.24 14.97 3.8 13.46 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.32 4.53 17.87 6.08C19.42 7.63 20.28 9.7 20.27 11.9C20.27 16.45 16.58 20.15 12.05 20.15ZM16.57 14.37C16.32 14.24 15.1 13.64 14.87 13.56C14.65 13.47 14.48 13.43 14.32 13.68C14.15 13.93 13.68 14.48 13.54 14.65C13.39 14.81 13.25 14.83 13 14.71C12.75 14.58 11.94 14.32 10.99 13.47C10.25 12.81 9.74 11.99 9.6 11.74C9.46 11.49 9.58 11.36 9.71 11.23C9.82 11.12 9.96 10.94 10.08 10.8C10.21 10.65 10.25 10.55 10.33 10.38C10.42 10.21 10.38 10.07 10.31 9.94C10.25 9.82 9.76 8.61 9.55 8.12C9.35 7.63 9.15 7.7 9 7.69C8.86 7.69 8.7 7.69 8.53 7.69C8.36 7.69 8.1 7.75 7.87 8C7.65 8.25 7 8.86 7 10.08C7 11.3 7.89 12.48 8.01 12.65C8.14 12.82 9.76 15.31 12.24 16.38C12.83 16.64 13.29 16.79 13.65 16.9C14.24 17.09 14.78 17.06 15.21 17C15.69 16.93 16.68 16.4 16.89 15.81C17.1 15.22 17.1 14.71 17.04 14.61C16.97 14.51 16.82 14.49 16.57 14.37Z"/>
                </svg>
              </div>
              <span class="channel-badge green-badge">INSTANT CHAT</span>
            </div>
            <h3 class="channel-title">Chat on WhatsApp</h3>
            <p class="channel-detail">+91 98480 16664</p>
            <span class="channel-action-text">Open WhatsApp Chat ↗</span>
          </a>

          <!-- 2. Phone Call -->
          <a href="tel:+919848016664" class="channel-box phone-box">
            <div class="channel-top">
              <div class="channel-icon-wrap phone-icon-wrap">
                <!-- Phone Icon -->
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <span class="channel-badge cyan-badge">DIRECT LINE</span>
            </div>
            <h3 class="channel-title">Voice Consultation</h3>
            <p class="channel-detail">+91 98480 16664</p>
            <span class="channel-action-text">Call Now ↗</span>
          </a>

          <!-- 3. Email -->
          <a href="mailto:hello@inxenuity.com?subject=Briefing%20Inquiry%20-%20INXENUITY" class="channel-box email-box">
            <div class="channel-top">
              <div class="channel-icon-wrap email-icon-wrap">
                <!-- Mail Icon -->
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <span class="channel-badge blue-badge">ENTERPRISE EMAIL</span>
            </div>
            <h3 class="channel-title">Official Inquiry</h3>
            <p class="channel-detail">hello&#64;inxenuity.com</p>
            <span class="channel-action-text">Send Email ↗</span>
          </a>
        </div>

        <!-- Footer Info -->
        <div class="modal-footer-info">
          <div class="footer-meta-item">
            <span class="meta-label">HEADQUARTERS</span>
            <span class="meta-value">HYDERABAD, IN</span>
          </div>
          <div class="footer-meta-item">
            <span class="meta-label">RESPONSE SLA</span>
            <span class="meta-value">UNDER 1 BUSINESS DAY</span>
          </div>
          <div class="footer-meta-item">
            <span class="meta-label">ENGAGEMENT MODEL</span>
            <span class="meta-value">DIRECT ARCHITECT ACCESS</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: var(--color-modal-overlay, rgba(4, 7, 12, 0.85));
      backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 20px;
      animation: fadeIn 0.2s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .modal-card {
      width: 100%;
      max-width: 680px;
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: 16px;
      padding: 40px;
      position: relative;
      box-shadow: 0 24px 64px rgba(0, 0, 0, 0.5), 0 0 32px rgba(0, 194, 255, 0.15);
      animation: slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    .modal-close {
      position: absolute;
      top: 20px;
      right: 20px;
      background: transparent;
      border: none;
      color: var(--color-text-secondary);
      cursor: pointer;
      padding: 6px;
      transition: color 0.2s ease;
      border-radius: 50%;
    }

    .modal-close:hover {
      color: var(--color-text-heading);
      background: rgba(255, 255, 255, 0.05);
    }

    .modal-title {
      font-size: 1.85rem;
      margin-bottom: 12px;
      font-weight: 700;
    }

    .modal-desc {
      font-size: 0.95rem;
      color: var(--color-text-secondary);
      margin-bottom: 30px;
      line-height: 1.6;
    }

    .direct-channels-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-bottom: 32px;
    }

    .channel-box {
      display: flex;
      flex-direction: column;
      padding: 22px 18px;
      border-radius: 12px;
      border: 1px solid var(--color-border);
      background: var(--color-surface-hover);
      text-decoration: none;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
    }

    .channel-box:hover {
      transform: translateY(-2px);
      border-color: var(--color-cyan);
      box-shadow: 0 8px 24px rgba(0, 194, 255, 0.12);
    }

    .whatsapp-box:hover {
      border-color: #25D366;
      box-shadow: 0 8px 24px rgba(37, 211, 102, 0.15);
    }

    .channel-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
    }

    .channel-icon-wrap {
      width: 42px;
      height: 42px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .wa-icon-wrap {
      background: rgba(37, 211, 102, 0.12);
      color: #25D366;
    }

    .phone-icon-wrap {
      background: rgba(0, 194, 255, 0.12);
      color: var(--color-cyan);
    }

    .email-icon-wrap {
      background: rgba(0, 128, 255, 0.12);
      color: var(--color-blue);
    }

    .channel-badge {
      font-family: var(--font-mono);
      font-size: 0.62rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      padding: 2px 6px;
      border-radius: 4px;
    }

    .green-badge {
      background: rgba(37, 211, 102, 0.15);
      color: #25D366;
      border: 1px solid rgba(37, 211, 102, 0.3);
    }

    .cyan-badge {
      background: rgba(0, 194, 255, 0.15);
      color: var(--color-cyan);
      border: 1px solid rgba(0, 194, 255, 0.3);
    }

    .blue-badge {
      background: rgba(0, 128, 255, 0.15);
      color: #60a5fa;
      border: 1px solid rgba(0, 128, 255, 0.3);
    }

    .channel-title {
      font-size: 1.02rem;
      font-weight: 700;
      color: var(--color-text-heading);
      margin-bottom: 6px;
    }

    .channel-detail {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: var(--color-text-secondary);
      margin-bottom: 16px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .channel-action-text {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--color-cyan);
      margin-top: auto;
    }

    .whatsapp-box .channel-action-text {
      color: #25D366;
    }

    .modal-footer-info {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      padding-top: 20px;
      border-top: 1px solid var(--color-border);
    }

    .footer-meta-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .meta-label {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      font-weight: 600;
      color: var(--color-text-muted);
      letter-spacing: 0.1em;
    }

    .meta-value {
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--color-text-heading);
    }

    @media (max-width: 768px) {
      .direct-channels-grid {
        grid-template-columns: 1fr;
        gap: 12px;
      }

      .modal-card {
        padding: 28px 20px;
      }

      .modal-footer-info {
        grid-template-columns: 1fr;
        gap: 12px;
      }
    }
  `]
})
export class BriefingModalComponent {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.close.emit();
    }
  }
}
