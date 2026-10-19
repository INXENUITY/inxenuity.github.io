import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-wrapper">
      <!-- HERO SECTION -->
      <section class="hero-section">
        <div class="container">
          <div class="hero-content">
            <div class="tag-eyebrow">CONTACT</div>
            <h1 class="hero-title">Start a Technical Conversation</h1>
            <p class="hero-subtitle">
              Whether you're evaluating the platform, scoping an integration, or exploring a partnership — our engineering team responds to every qualified inquiry within one business day.
            </p>
          </div>
        </div>
      </section>

      <!-- CONTACT MAIN SECTION -->
      <section class="section-padding contact-main">
        <div class="container">
          <div class="contact-grid">
            <!-- Left Column: Get In Touch -->
            <div class="get-in-touch-col">
              <div class="tag-eyebrow no-dot">— GET IN TOUCH</div>

              <div class="contact-channels">
                <div class="channel-item">
                  <div class="channel-label">GENERAL INQUIRIES</div>
                  <a href="mailto:hello@inxenuity.com" class="channel-link">hello&#64;inxenuity.com</a>
                </div>

                <div class="channel-item">
                  <div class="channel-label">TECHNICAL PARTNERSHIPS</div>
                  <a href="mailto:partners@inxenuity.com" class="channel-link">partners&#64;inxenuity.com</a>
                </div>

                <div class="channel-item">
                  <div class="channel-label">PRESS & ANALYST RELATIONS</div>
                  <a href="mailto:press@inxenuity.com" class="channel-link">press&#64;inxenuity.com</a>
                </div>

                <div class="channel-item">
                  <div class="channel-label">HEADQUARTERS</div>
                  <div class="channel-text">San Francisco, CA</div>
                </div>
              </div>

              <!-- Response Time Card -->
              <div class="response-time-card hud-card hud-bracket-tl-br">
                <div class="response-eyebrow">RESPONSE TIME</div>
                <p class="response-text">
                  We respond to all qualified enterprise inquiries within one business day. For urgent technical issues, include your deployment environment in the message.
                </p>
              </div>
            </div>

            <!-- Right Column: Enterprise Inquiry Form -->
            <div class="form-col">
              <div class="tag-eyebrow no-dot">— ENTERPRISE INQUIRY</div>
              <h2 class="form-heading">Tell Us About Your Use Case</h2>
              <p class="form-subheading">
                The more context you provide, the better we can prepare for the conversation.
              </p>

              <!-- Form Box -->
              <div class="form-card hud-card">
                <form *ngIf="!submitted(); else successView" (ngSubmit)="onSubmit()" class="inquiry-form">
                  <div class="form-row">
                    <div class="form-group">
                      <label class="form-label">Full Name <span class="required">*</span></label>
                      <input type="text" [(ngModel)]="form.name" name="name" required class="form-input" placeholder="e.g. Dr. Jane Doe" />
                    </div>
                    <div class="form-group">
                      <label class="form-label">Work Email <span class="required">*</span></label>
                      <input type="email" [(ngModel)]="form.email" name="email" required class="form-input" placeholder="jane@enterprise.com" />
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group">
                      <label class="form-label">Company <span class="required">*</span></label>
                      <input type="text" [(ngModel)]="form.company" name="company" required class="form-input" placeholder="e.g. Acme Robotics Inc." />
                    </div>
                    <div class="form-group">
                      <label class="form-label">Your Role</label>
                      <input type="text" [(ngModel)]="form.role" name="role" class="form-input" placeholder="e.g. VP Engineering, Systems Architect" />
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="form-label">Primary Use Case</label>
                    <select [(ngModel)]="form.useCase" name="useCase" class="form-select">
                      <option value="" disabled selected>Select a use case...</option>
                      <option value="Digital Twins">Digital Twins & Virtual Environments</option>
                      <option value="Autonomous Robotics">Autonomous Robotics & Perception</option>
                      <option value="Cloud AI">Cloud-Scale Multimodal Inference</option>
                      <option value="Edge & IoT">Edge & Embedded AI Deployment</option>
                      <option value="Custom Hardware">Custom Hardware Integration</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label class="form-label">Describe your deployment environment and requirements <span class="required">*</span></label>
                    <textarea [(ngModel)]="form.message" name="message" required class="form-textarea" placeholder="Include target hardware, sensor types (camera, LiDAR, audio), throughput or latency targets..."></textarea>
                  </div>

                  <div class="form-footer">
                    <span class="required-note">Fields marked <span class="required">*</span> are required.</span>
                    <button type="submit" [disabled]="!isFormValid()" class="btn-primary">
                      <span>Send Inquiry</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </button>
                  </div>
                </form>

                <ng-template #successView>
                  <div class="form-success">
                    <div class="success-icon-wrap">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#00C2FF" stroke-width="2">
                        <circle cx="12" cy="12" r="10" stroke="#00C2FF"/>
                        <path d="M8 12l3 3 5-5" stroke="#00C2FF"/>
                      </svg>
                    </div>
                    <div class="tag-eyebrow">INQUIRY RECEIVED</div>
                    <h3 class="success-title">Thank You, {{ form.name }}</h3>
                    <p class="success-message">
                      Your technical inquiry has been submitted directly to our systems engineering group. Reference: <span class="mono-badge">REF-{{ caseNumber }}</span>.
                    </p>
                    <p class="success-followup">
                      A systems architect will review your deployment requirements and get back to <strong>{{ form.email }}</strong> within one business day.
                    </p>
                    <button (click)="resetForm()" class="btn-secondary" style="margin-top: 24px;">
                      Send Another Inquiry
                    </button>
                  </div>
                </ng-template>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .hero-section {
      padding-top: 150px;
      padding-bottom: 50px;
    }

    .hero-title {
      font-size: clamp(2.4rem, 4.5vw, 3.6rem);
      margin-bottom: 20px;
      font-weight: 800;
      letter-spacing: -0.03em;
    }

    .hero-subtitle {
      font-size: 1.15rem;
      color: var(--color-text-secondary);
      max-width: 680px;
      line-height: 1.6;
    }

    .contact-main {
      padding-top: 40px;
    }

    .contact-grid {
      display: grid;
      grid-template-columns: 0.85fr 1.15fr;
      gap: 60px;
      align-items: start;
    }

    /* Channels */
    .contact-channels {
      display: flex;
      flex-direction: column;
      border: 1px solid var(--color-border);
      border-radius: 2px;
      background: rgba(12, 17, 28, 0.7);
      margin-top: 18px;
      margin-bottom: 32px;
    }

    .channel-item {
      padding: 20px 24px;
      border-bottom: 1px solid rgba(24, 35, 55, 0.6);
    }

    .channel-item:last-child {
      border-bottom: none;
    }

    .channel-label {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 0.12em;
      color: var(--color-cyan);
      margin-bottom: 6px;
    }

    .channel-link {
      font-family: var(--font-mono);
      font-size: 0.95rem;
      color: #ffffff;
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .channel-link:hover {
      color: var(--color-cyan);
    }

    .channel-text {
      font-family: var(--font-sans);
      font-size: 0.95rem;
      color: #ffffff;
    }

    /* Response Time Card */
    .response-time-card {
      padding: 24px;
      background: rgba(10, 16, 27, 0.75);
    }

    .response-eyebrow {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.14em;
      color: var(--color-cyan);
      margin-bottom: 10px;
    }

    .response-text {
      font-size: 0.88rem;
      color: var(--color-text-secondary);
      line-height: 1.6;
    }

    /* Right Form Column */
    .form-heading {
      font-size: 1.8rem;
      margin-top: 12px;
      margin-bottom: 8px;
    }

    .form-subheading {
      font-size: 0.95rem;
      color: var(--color-text-secondary);
      margin-bottom: 28px;
    }

    .form-card {
      padding: 36px;
      background: rgba(10, 15, 25, 0.8);
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .form-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 24px;
      padding-top: 16px;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
    }

    .required-note {
      font-size: 0.78rem;
      color: var(--color-text-muted);
    }

    /* Success State */
    .form-success {
      text-align: center;
      padding: 30px 10px;
    }

    .success-icon-wrap {
      margin-bottom: 18px;
    }

    .success-title {
      font-size: 1.6rem;
      margin-bottom: 12px;
    }

    .success-message {
      font-size: 0.95rem;
      color: var(--color-text-secondary);
      line-height: 1.6;
      margin-bottom: 10px;
    }

    .success-followup {
      font-size: 0.88rem;
      color: var(--color-cyan);
    }

    .mono-badge {
      font-family: var(--font-mono);
      background: rgba(0, 194, 255, 0.12);
      border: 1px solid rgba(0, 194, 255, 0.3);
      padding: 2px 8px;
      border-radius: 2px;
      color: var(--color-cyan);
    }

    @media (max-width: 900px) {
      .contact-grid {
        grid-template-columns: 1fr;
      }
      .form-row {
        grid-template-columns: 1fr;
        gap: 0;
      }
      .form-footer {
        flex-direction: column-reverse;
        gap: 16px;
        align-items: stretch;
      }
    }
  `]
})
export class ContactComponent {
  submitted = signal(false);
  caseNumber = Math.floor(100000 + Math.random() * 900000);

  form = {
    name: '',
    email: '',
    company: '',
    role: '',
    useCase: '',
    message: ''
  };

  isFormValid(): boolean {
    return Boolean(
      this.form.name.trim() &&
      this.form.email.trim() &&
      this.form.company.trim() &&
      this.form.message.trim()
    );
  }

  onSubmit(): void {
    if (this.isFormValid()) {
      this.submitted.set(true);
    }
  }

  resetForm(): void {
    this.submitted.set(false);
    this.form = {
      name: '',
      email: '',
      company: '',
      role: '',
      useCase: '',
      message: ''
    };
  }
}
