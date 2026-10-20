import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BriefingService } from '../../services/briefing.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="page-wrapper">
      <!-- HERO SECTION -->
      <section class="hero-section">
        <div class="container">
          <div class="hero-content">
            <div class="tag-eyebrow">ABOUT</div>
            <h1 class="hero-title">
              Built by Engineers Who've<br />
              Shipped AI at Scale
            </h1>
            <p class="hero-subtitle">
              INXENUITY was founded to close the gap between AI research and production reality — delivering multimodal intelligence that operates reliably in the environments that matter most.
            </p>
          </div>
        </div>
      </section>

      <!-- OUR STORY & STATS SECTION -->
      <section class="section-padding story-section">
        <div class="container">
          <div class="story-grid">
            <!-- Left: Our Story Text -->
            <div class="story-text-col">
              <div class="tag-eyebrow no-dot">— OUR STORY</div>
              <h2 class="story-title">From Research Lab to Production Floor</h2>
              <p class="story-para">
                INXENUITY was founded in 2026 by a team of systems engineers and AI researchers with a clear mission: closing the gap between artificial intelligence research and reliable, real-world production systems.
              </p>
              <p class="story-para">
                We built INXENUITY to solve the core infrastructure challenges of deploying AI across physical and digital frontiers. Developing high-precision sensor fusion, acoustic reasoning, and low-latency inference orchestration primitives, we engineered a platform that operates seamlessly across constrained edge hardware and high-throughput cloud clusters.
              </p>
              <p class="story-para">
                Today, INXENUITY empowers modern enterprises with real-time digital twins, autonomous robotics perception, and industrial intelligence. Every capability we build is engineered for determinism, resilience, and scale.
              </p>
            </div>

            <!-- Right: 2x2 Stats Grid -->
            <div class="stats-grid">
              <div class="stat-card hud-card">
                <div class="stat-number">2026</div>
                <div class="stat-label">Founded</div>
              </div>

              <div class="stat-card hud-card">
                <div class="stat-number">4B+</div>
                <div class="stat-label">Monthly inferences</div>
              </div>

              <div class="stat-card hud-card">
                <div class="stat-number">38</div>
                <div class="stat-label">Enterprise deployments</div>
              </div>

              <div class="stat-card hud-card">
                <div class="stat-number">99.99%</div>
                <div class="stat-label">Platform uptime SLA</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- MISSION & PRINCIPLES SECTION -->
      <section class="section-padding">
        <div class="container">
          <div class="section-header">
            <div class="tag-eyebrow no-dot">— MISSION</div>
            <h2 class="section-title">Intelligence That Works in the Real World</h2>
            <p class="mission-subtitle">
              We believe the most important AI problems are not solved in benchmarks — they are solved on factory floors, in autonomous vehicles, and at the edge of industrial networks. Our mission is to make production-grade multimodal AI accessible to every engineering team that needs it.
            </p>
          </div>

          <div class="grid-2 principles-grid">
            <div class="hud-card hud-bracket-tl-br">
              <h3 class="principle-title">Production First</h3>
              <p class="principle-text">
                Every feature is validated in a live deployment before it ships. We do not release capabilities that only work in controlled conditions.
              </p>
            </div>

            <div class="hud-card hud-bracket-tl-br">
              <h3 class="principle-title">Deterministic by Design</h3>
              <p class="principle-text">
                Enterprise systems require predictable behaviour. We engineer for deterministic latency, reproducible outputs, and auditable inference pipelines.
              </p>
            </div>

            <div class="hud-card hud-bracket-tl-br">
              <h3 class="principle-title">Hardware Honest</h3>
              <p class="principle-text">
                We optimise for the hardware our customers actually run — not the latest cloud GPU. That means ARM edge devices, embedded controllers, and constrained industrial hardware.
              </p>
            </div>

            <div class="hud-card hud-bracket-tl-br">
              <h3 class="principle-title">Open Interfaces</h3>
              <p class="principle-text">
                We integrate with the tools your team already uses — ROS 2, Kubernetes, OpenTelemetry, ONNX — rather than locking you into a proprietary ecosystem.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- LEADERSHIP / TEAM SECTION -->
      <section class="section-padding team-section">
        <div class="container">
          <div class="section-header">
            <div class="tag-eyebrow no-dot">— LEADERSHIP</div>
            <h2 class="section-title">The Team</h2>
          </div>

          <div class="grid-2 team-grid">
            <!-- 1. SHIVA KARANTOTHU -->
            <div class="team-card hud-card">
              <div class="team-card-header">
                <div class="avatar-badge">SK</div>
                <div class="team-title-wrap">
                  <h3 class="member-name">SHIVA KARANTOTHU</h3>
                  <div class="member-role">Founder and CEO</div>
                </div>
              </div>
              <p class="member-bio">
                Founder and Chief Executive Officer driving INXENUITY's vision to pioneer multimodal AI systems and real-time intelligence. Leads strategic direction, core technology roadmap, and deployment of resilient AI solutions across enterprise operations.
              </p>
            </div>

            <!-- 2. VINOD KARANTOTHU -->
            <div class="team-card hud-card">
              <div class="team-card-header">
                <div class="avatar-badge">VK</div>
                <div class="team-title-wrap">
                  <h3 class="member-name">VINOD KARANTOTHU</h3>
                  <div class="member-role">Technology Consultant</div>
                </div>
              </div>
              <p class="member-bio">
                Technology Consultant advising on scalable cloud platforms, distributed model inference pipelines, and enterprise systems engineering. Guides architecture implementation for high-throughput multimodal workloads and edge deployments.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- ENGINEERING PHILOSOPHY SECTION -->
      <section class="section-padding philosophy-section">
        <div class="container">
          <div class="section-header">
            <div class="tag-eyebrow no-dot">— ENGINEERING PHILOSOPHY</div>
            <h2 class="section-title">How We Build</h2>
          </div>

          <div class="grid-2 philosophy-grid">
            <div class="hud-card">
              <div class="philosophy-header">
                <span class="step-num">01</span>
                <h3 class="philosophy-title">Measure Everything</h3>
              </div>
              <p class="philosophy-text">
                Every layer of the stack emits structured telemetry. We do not ship a feature without a latency budget, a drift detector, and a rollback path.
              </p>
            </div>

            <div class="hud-card">
              <div class="philosophy-header">
                <span class="step-num">02</span>
                <h3 class="philosophy-title">Fail Gracefully</h3>
              </div>
              <p class="philosophy-text">
                Production AI systems encounter distribution shift, hardware faults, and network partitions. We design for degraded-mode operation, not just the happy path.
              </p>
            </div>

            <div class="hud-card">
              <div class="philosophy-header">
                <span class="step-num">03</span>
                <h3 class="philosophy-title">Compose, Don't Monolith</h3>
              </div>
              <p class="philosophy-text">
                The platform is a set of independently deployable, observable services. Customers adopt the layers they need without taking on the layers they don't.
              </p>
            </div>

            <div class="hud-card">
              <div class="philosophy-header">
                <span class="step-num">04</span>
                <h3 class="philosophy-title">Security is Not a Layer</h3>
              </div>
              <p class="philosophy-text">
                mTLS, RBAC, encrypted artefacts, and audit trails are built into the core runtime — not bolted on after the fact. Air-gapped deployment is a first-class target.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA BANNER -->
      <section class="section-padding">
        <div class="container">
          <div class="cta-banner hud-bracket-tl-br">
            <div class="cta-content">
              <h2 class="cta-title">Work With the Team</h2>
              <p class="cta-desc">
                Whether you're evaluating the platform or exploring a partnership, our engineering team is the right starting point.
              </p>
            </div>
            <div class="cta-actions">
              <a routerLink="/contact" class="btn-primary">
                Contact Engineering
              </a>
              <button (click)="briefingService.open()" class="btn-secondary">
                Direct Connect Hub
              </button>
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

    /* Story Section */
    .story-grid {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 60px;
      align-items: center;
    }

    .story-title {
      font-size: clamp(1.8rem, 3vw, 2.3rem);
      margin-bottom: 24px;
    }

    .story-para {
      font-size: 0.96rem;
      color: var(--color-text-secondary);
      line-height: 1.7;
      margin-bottom: 18px;
    }

    /* Stats Grid */
    .stats-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .stat-card {
      padding: 32px 24px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .stat-number {
      font-size: 2.8rem;
      font-weight: 800;
      color: var(--color-cyan);
      letter-spacing: -0.03em;
      margin-bottom: 8px;
      line-height: 1;
    }

    .stat-label {
      font-family: var(--font-sans);
      font-size: 0.88rem;
      color: var(--color-text-secondary);
    }

    /* Mission */
    .mission-subtitle {
      font-size: 1.05rem;
      color: var(--color-text-secondary);
      max-width: 760px;
      line-height: 1.65;
      margin-top: 12px;
    }

    .principle-title {
      font-size: 1.25rem;
      margin-bottom: 12px;
      color: var(--color-text-heading);
    }

    .principle-text {
      font-size: 0.92rem;
      color: var(--color-text-secondary);
      line-height: 1.6;
    }

    /* Team */
    .team-card {
      padding: 32px 28px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      border-radius: 12px;
    }

    .team-card-header {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .avatar-badge {
      width: 48px;
      height: 48px;
      background: rgba(0, 194, 255, 0.12);
      border: 1px solid var(--color-cyan);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-mono);
      font-size: 1rem;
      font-weight: 700;
      color: var(--color-cyan);
      flex-shrink: 0;
    }

    .member-name {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--color-text-heading);
      letter-spacing: -0.01em;
    }

    .member-role {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--color-cyan);
      letter-spacing: 0.06em;
      text-transform: uppercase;
      margin-top: 4px;
    }

    .member-bio {
      font-size: 0.92rem;
      color: var(--color-text-secondary);
      line-height: 1.65;
    }

    /* Light Theme Contrast Protections */
    :host-context([data-theme="light"]) .member-name,
    :host-context(.light-theme) .member-name,
    [data-theme="light"] .member-name,
    .light-theme .member-name {
      color: #0f172a !important;
    }

    :host-context([data-theme="light"]) .principle-title,
    :host-context([data-theme="light"]) .philosophy-title,
    :host-context(.light-theme) .principle-title,
    :host-context(.light-theme) .philosophy-title {
      color: #0f172a !important;
    }

    :host-context([data-theme="light"]) .avatar-badge,
    :host-context(.light-theme) .avatar-badge {
      background: rgba(2, 132, 199, 0.08);
      border-color: #0284c7;
      color: #0284c7;
    }

    :host-context([data-theme="light"]) .member-role,
    :host-context(.light-theme) .member-role {
      color: #0284c7;
    }

    /* Philosophy */
    .philosophy-header {
      display: flex;
      align-items: baseline;
      gap: 16px;
      margin-bottom: 12px;
    }

    .step-num {
      font-family: var(--font-mono);
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--color-cyan);
      background: rgba(0, 194, 255, 0.1);
      padding: 2px 8px;
      border-radius: 2px;
      border: 1px solid rgba(0, 194, 255, 0.3);
    }

    .philosophy-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--color-text-heading);
    }

    .philosophy-text {
      font-size: 0.92rem;
      color: var(--color-text-secondary);
      line-height: 1.6;
    }

    /* CTA Section */
    .cta-title {
      font-size: 2rem;
      margin-bottom: 12px;
    }

    .cta-desc {
      font-size: 1rem;
      max-width: 580px;
    }

    .cta-actions {
      display: flex;
      gap: 16px;
      flex-shrink: 0;
    }

    @media (max-width: 900px) {
      .story-grid {
        grid-template-columns: 1fr;
      }
      .cta-actions {
        flex-direction: column;
      }
    }
  `]
})
export class AboutComponent {
  readonly briefingService = inject(BriefingService);
}
