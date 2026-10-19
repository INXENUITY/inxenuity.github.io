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
              InXenuity was founded to close the gap between AI research and production reality — delivering multimodal intelligence that operates reliably in the environments that matter most.
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
                InXenuity was founded in 2019 by a team of computer vision researchers and systems engineers who had spent years watching promising AI models fail at the boundary between the lab and the real world. The problem was never the models — it was the infrastructure around them.
              </p>
              <p class="story-para">
                We built InXenuity to solve that infrastructure problem. Starting with a single use case — real-time defect detection on a semiconductor manufacturing line — we developed the sensor fusion and inference orchestration primitives that now underpin the entire platform.
              </p>
              <p class="story-para">
                Today, InXenuity's platform processes over 4 billion inference requests per month across digital twin environments, autonomous robotics fleets, and cloud-scale video analytics pipelines. Every capability we ship has been validated in production before it reaches a customer.
              </p>
            </div>

            <!-- Right: 2x2 Stats Grid -->
            <div class="stats-grid">
              <div class="stat-card hud-card">
                <div class="stat-number">2019</div>
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
            <!-- 1. Dr. Anika Reyes -->
            <div class="team-card hud-card">
              <div class="team-card-header">
                <div class="avatar-badge">AR</div>
                <div class="team-title-wrap">
                  <h3 class="member-name">Dr. Anika Reyes</h3>
                  <div class="member-role">Co-founder & CEO</div>
                </div>
              </div>
              <p class="member-bio">
                Former Principal Researcher, NVIDIA Research. PhD Computer Vision, MIT. Led the perception stack for NVIDIA's autonomous vehicle programme before founding InXenuity.
              </p>
            </div>

            <!-- 2. Marcus Osei -->
            <div class="team-card hud-card">
              <div class="team-card-header">
                <div class="avatar-badge">MO</div>
                <div class="team-title-wrap">
                  <h3 class="member-name">Marcus Osei</h3>
                  <div class="member-role">Co-founder & CTO</div>
                </div>
              </div>
              <p class="member-bio">
                Former Staff Engineer, Google DeepMind. Architected the distributed inference infrastructure serving 10B+ daily predictions. Holds 14 patents in real-time ML systems.
              </p>
            </div>

            <!-- 3. Dr. Yuki Tanaka -->
            <div class="team-card hud-card">
              <div class="team-card-header">
                <div class="avatar-badge">YT</div>
                <div class="team-title-wrap">
                  <h3 class="member-name">Dr. Yuki Tanaka</h3>
                  <div class="member-role">VP Engineering</div>
                </div>
              </div>
              <p class="member-bio">
                Former Engineering Director, Boston Dynamics. Led the perception and planning software teams for the Spot and Atlas platforms. Expert in constrained-environment robotics.
              </p>
            </div>

            <!-- 4. Priya Nair -->
            <div class="team-card hud-card">
              <div class="team-card-header">
                <div class="avatar-badge">PN</div>
                <div class="team-title-wrap">
                  <h3 class="member-name">Priya Nair</h3>
                  <div class="member-role">VP Product</div>
                </div>
              </div>
              <p class="member-bio">
                Former Product Lead, Palantir Foundry. Spent eight years translating complex AI infrastructure into enterprise workflows for defence, energy, and manufacturing clients.
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
              <button (click)="briefingService.open()" class="btn-primary">
                Request a Briefing
              </button>
              <a routerLink="/contact" class="btn-secondary">
                View Open Roles
              </a>
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
      color: #38bdf8;
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
      color: #ffffff;
    }

    .principle-text {
      font-size: 0.92rem;
      color: var(--color-text-secondary);
      line-height: 1.6;
    }

    /* Team */
    .team-card {
      padding: 28px;
    }

    .team-card-header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 16px;
    }

    .avatar-badge {
      width: 44px;
      height: 44px;
      background: rgba(0, 194, 255, 0.1);
      border: 1px solid var(--color-cyan);
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-mono);
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--color-cyan);
      flex-shrink: 0;
    }

    .member-name {
      font-size: 1.15rem;
      font-weight: 600;
      color: #ffffff;
    }

    .member-role {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      color: #38bdf8;
      letter-spacing: 0.05em;
    }

    .member-bio {
      font-size: 0.88rem;
      color: var(--color-text-secondary);
      line-height: 1.6;
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
      color: #ffffff;
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
