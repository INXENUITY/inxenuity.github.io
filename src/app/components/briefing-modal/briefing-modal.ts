import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-briefing-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

        <div *ngIf="!submitted(); else successView">
          <div class="tag-eyebrow">TECHNICAL ENGAGEMENT</div>
          <h2 class="modal-title">Request an Engineering Briefing</h2>
          <p class="modal-desc">
            Schedule a confidential 45-minute deep-dive with an InXenuity systems architect to review your multimodal AI workload, hardware constraints, and deployment targets.
          </p>

          <form (ngSubmit)="onSubmit()" class="modal-form">
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Full Name <span class="required">*</span></label>
                <input type="text" [(ngModel)]="formData.name" name="name" required class="form-input" placeholder="e.g. Dr. Alex Vance" />
              </div>
              <div class="form-group">
                <label class="form-label">Work Email <span class="required">*</span></label>
                <input type="email" [(ngModel)]="formData.email" name="email" required class="form-input" placeholder="alex@company.com" />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Organisation / Enterprise <span class="required">*</span></label>
                <input type="text" [(ngModel)]="formData.company" name="company" required class="form-input" placeholder="e.g. Industrial Automation Corp" />
              </div>
              <div class="form-group">
                <label class="form-label">Primary Interest</label>
                <select [(ngModel)]="formData.interest" name="interest" class="form-select">
                  <option value="Platform Architecture">Multimodal Architecture</option>
                  <option value="Digital Twins & Simulation">Digital Twins & Simulation</option>
                  <option value="Robotics & Autonomous Systems">Autonomous Robotics & Perception</option>
                  <option value="Cloud AI Infrastructure">Cloud & Containerised Inference</option>
                  <option value="Edge Hardware Integration">Edge & IoT (NVIDIA Jetson / ARM)</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Target Hardware / Deployment Details</label>
              <textarea [(ngModel)]="formData.details" name="details" class="form-textarea" placeholder="Briefly describe your sensors, latency requirements, or edge hardware..."></textarea>
            </div>

            <div class="modal-actions">
              <span class="required-note">* All briefing requests are scoped by technical staff within 1 business day.</span>
              <button type="submit" [disabled]="!isFormValid()" class="btn-primary">
                <span>Confirm Briefing Request</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </form>
        </div>

        <ng-template #successView>
          <div class="success-box">
            <div class="success-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00C2FF" stroke-width="2">
                <circle cx="12" cy="12" r="10" stroke="#00C2FF"/>
                <path d="M8 12l3 3 5-5" stroke="#00C2FF"/>
              </svg>
            </div>
            <div class="tag-eyebrow">BRIEFING CONFIRMED</div>
            <h3 class="success-title">Technical Briefing Logged</h3>
            <p class="success-desc">
              Thank you, <strong>{{ formData.name }}</strong>. Your request for <strong>{{ formData.company }}</strong> has been assigned to our systems engineering group. Reference: <span class="mono-code">INX-{{ refId }}</span>.
            </p>
            <p class="success-note">
              A calendar invite and preparation agenda will be sent to <strong>{{ formData.email }}</strong> within 24 hours.
            </p>
            <button (click)="resetAndClose()" class="btn-primary" style="margin-top: 24px;">Return to Site</button>
          </div>
        </ng-template>
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
      background: rgba(4, 7, 12, 0.85);
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
      max-width: 640px;
      background: #090e18;
      border: 1px solid var(--color-border);
      padding: 40px;
      position: relative;
      box-shadow: 0 24px 64px rgba(0, 0, 0, 0.8), 0 0 32px rgba(0, 194, 255, 0.15);
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
    }

    .modal-close:hover {
      color: #ffffff;
    }

    .modal-title {
      font-size: 1.8rem;
      margin-bottom: 12px;
    }

    .modal-desc {
      font-size: 0.9rem;
      color: var(--color-text-secondary);
      margin-bottom: 24px;
      line-height: 1.5;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    @media (max-width: 600px) {
      .form-row {
        grid-template-columns: 1fr;
      }
      .modal-card {
        padding: 28px 20px;
      }
    }

    .modal-actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-top: 20px;
      padding-top: 16px;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
    }

    @media (max-width: 600px) {
      .modal-actions {
        flex-direction: column-reverse;
        align-items: stretch;
      }
    }

    .required-note {
      font-size: 0.75rem;
      color: var(--color-text-muted);
    }

    .success-box {
      text-align: center;
      padding: 30px 10px;
    }

    .success-icon {
      margin-bottom: 16px;
    }

    .success-title {
      font-size: 1.5rem;
      margin-bottom: 12px;
    }

    .success-desc {
      font-size: 0.95rem;
      color: var(--color-text-secondary);
      line-height: 1.6;
      margin-bottom: 12px;
    }

    .success-note {
      font-size: 0.85rem;
      color: var(--color-cyan);
    }

    .mono-code {
      font-family: var(--font-mono);
      background: rgba(0, 194, 255, 0.1);
      padding: 2px 6px;
      border-radius: 2px;
      color: var(--color-cyan);
    }
  `]
})
export class BriefingModalComponent {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  submitted = signal(false);
  refId = Math.floor(10000 + Math.random() * 90000);

  formData = {
    name: '',
    email: '',
    company: '',
    interest: 'Platform Architecture',
    details: ''
  };

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.close.emit();
    }
  }

  isFormValid(): boolean {
    return Boolean(this.formData.name.trim() && this.formData.email.trim() && this.formData.company.trim());
  }

  onSubmit(): void {
    if (this.isFormValid()) {
      this.submitted.set(true);
    }
  }

  resetAndClose(): void {
    this.submitted.set(false);
    this.formData = {
      name: '',
      email: '',
      company: '',
      interest: 'Platform Architecture',
      details: ''
    };
    this.close.emit();
  }
}
