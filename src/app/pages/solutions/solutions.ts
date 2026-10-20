import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BriefingService } from '../../services/briefing.service';
import { VideoVisualizerComponent } from '../../components/video-visualizer/video-visualizer';
import { TechLogosComponent } from '../../components/tech-logos/tech-logos';

@Component({
  selector: 'app-solutions',
  standalone: true,
  imports: [RouterLink, VideoVisualizerComponent, TechLogosComponent],
  template: `
    <div class="page-wrapper">
      <!-- HERO SECTION -->
      <section class="hero-section">
        <div class="container">
          <div class="hero-content">
            <div class="tag-eyebrow">SOLUTIONS & DEPLOYMENTS</div>
            <h1 class="hero-title">
              Multimodal AI Intelligence<br />
              for Every Deployment Environment
            </h1>
            <p class="hero-subtitle">
              From real-time digital twins to autonomous robotics and distributed cloud clusters, INXENUITY delivers production-grade multimodal perception and audio AI across enterprise systems.
            </p>
          </div>
        </div>
      </section>

      <!-- SOLUTIONS DEEP DIVE SECTIONS -->
      <div class="container solutions-list">
        <!-- 1. DIGITAL TWINS -->
        <section id="digital-twins" class="solution-block">
          <div class="solution-grid">
            <div class="solution-info">
              <div class="tag-eyebrow no-dot">— DIGITAL TWINS</div>
              <h2 class="solution-title">Real-Time Digital Twin Intelligence</h2>
              <p class="solution-desc">
                Fuse live sensor streams, camera feeds, and operational data into a continuously updated digital replica of your physical environment. INXENUITY's fusion engine synchronises vision and audio signals with IoT telemetry at sub-second latency, enabling predictive maintenance, anomaly detection, and simulation-driven optimisation.
              </p>
              <ul class="bullet-list">
                <li>Predictive maintenance with 94% fault detection accuracy</li>
                <li>Sub-second synchronisation between physical and digital state</li>
                <li>Anomaly detection across 200+ concurrent sensor streams</li>
                <li>Integration with Siemens, PTC, and AVEVA twin platforms</li>
              </ul>
            </div>

            <!-- Interactive Video Stream Visualizer -->
            <div class="visualizer-card-wrap">
              <app-video-visualizer 
                [mode]="'digital-twin'" 
                [title]="'DIGITAL TWIN REPLICA // LIVE TELEMETRY'"
                [resolution]="'1080p60'">
              </app-video-visualizer>
            </div>
          </div>
        </section>

        <!-- 2. ROBOTICS & AUTOMATION (Flipped) -->
        <section id="robotics" class="solution-block">
          <div class="solution-grid reverse">
            <!-- Interactive Video Stream Visualizer -->
            <div class="visualizer-card-wrap">
              <app-video-visualizer 
                [mode]="'robotics'" 
                [title]="'AUTONOMOUS AGV PERCEPTION // 6-DOF POSE'"
                [resolution]="'720p60'">
              </app-video-visualizer>
            </div>

            <div class="solution-info">
              <div class="tag-eyebrow no-dot">— ROBOTICS & AUTOMATION</div>
              <h2 class="solution-title">Perception for Autonomous Systems</h2>
              <p class="solution-desc">
                Give robots the ability to see, hear, and reason about their environment in real time. INXENUITY's edge-optimised runtime runs full multimodal perception within an 8W power budget, enabling safe navigation, object manipulation, and human-robot collaboration in unstructured environments.
              </p>
              <ul class="bullet-list">
                <li>Full perception stack within 8W TDP on Jetson Orin NX</li>
                <li>Object detection and 6-DOF pose estimation at 60fps</li>
                <li>Human presence detection with intent classification</li>
                <li>ROS 2 and Isaac SDK compatible inference nodes</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 3. CLOUD AI INFRASTRUCTURE -->
        <section id="cloud" class="solution-block">
          <div class="solution-grid">
            <div class="solution-info">
              <div class="tag-eyebrow no-dot">— CLOUD AI INFRASTRUCTURE</div>
              <h2 class="solution-title">Scalable Multimodal AI at Cloud Scale</h2>
              <p class="solution-desc">
                Deploy the full INXENUITY platform on Kubernetes with horizontal autoscaling, multi-tenant model serving, and enterprise observability. Process thousands of concurrent video and audio streams with deterministic SLAs, backed by a 99.99% uptime managed service.
              </p>
              <ul class="bullet-list">
                <li>2,400 fps multi-camera throughput on a single node</li>
                <li>Horizontal autoscaling with sub-100ms cold-start</li>
                <li>Multi-tenant model isolation with RBAC</li>
                <li>OpenTelemetry-compatible observability stack</li>
              </ul>
              <div class="tech-stack-row">
                <span class="tech-badge-chip">Kubernetes</span>
                <span class="tech-badge-chip">Docker</span>
                <span class="tech-badge-chip">AWS</span>
                <span class="tech-badge-chip">Google Cloud</span>
                <span class="tech-badge-chip">Azure</span>
                <span class="tech-badge-chip">GHCR</span>
              </div>
            </div>

            <!-- Interactive Video Stream Visualizer -->
            <div class="visualizer-card-wrap">
              <app-video-visualizer 
                [mode]="'cloud-cluster'" 
                [title]="'K8S CLUSTER TOPOLOGY // INFERENCE INGRESS'"
                [resolution]="'1440p60'">
              </app-video-visualizer>
            </div>
          </div>
        </section>

        <!-- 4. EDGE & IOT (Flipped) -->
        <section id="iot" class="solution-block">
          <div class="solution-grid reverse">
            <!-- Interactive Video Stream Visualizer -->
            <div class="visualizer-card-wrap">
              <app-video-visualizer 
                [mode]="'edge-sync'" 
                [title]="'EDGE NODE MESH // OTA TELEMETRY SYNC'"
                [resolution]="'1080p30'">
              </app-video-visualizer>
            </div>

            <div class="solution-info">
              <div class="tag-eyebrow no-dot">— EDGE & IoT</div>
              <h2 class="solution-title">Intelligence at the Network Edge</h2>
              <p class="solution-desc">
                Deploy containerised AI inference directly on edge hardware — from industrial gateways to embedded controllers. Offline-capable with local model caching, OTA updates, and edge-to-cloud sync. Supports ARM, x86, and NVIDIA embedded platforms with hardware-specific kernel optimisations.
              </p>
              <ul class="bullet-list">
                <li>Offline inference with local model caching</li>
                <li>OTA model updates with rollback guarantees</li>
                <li>ARM, x86, and NVIDIA embedded platform support</li>
                <li>Edge-to-cloud telemetry sync with configurable bandwidth caps</li>
              </ul>
              <div class="tech-stack-row">
                <span class="tech-badge-chip">NVIDIA Orin</span>
                <span class="tech-badge-chip">CUDA 12</span>
                <span class="tech-badge-chip">Edge IoT</span>
                <span class="tech-badge-chip">Ubuntu Core</span>
                <span class="tech-badge-chip">Red Hat RHEL</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- ENTERPRISE ECOSYSTEM LOGO SHOWCASE -->
      <app-tech-logos [mode]="'grid'"></app-tech-logos>

      <!-- CTA BANNER -->
      <section class="section-padding">
        <div class="container">
          <div class="cta-banner hud-bracket-tl-br">
            <div class="cta-content">
              <h2 class="cta-title">Find the Right Deployment for Your Use Case</h2>
              <p class="cta-desc">
                Our engineering team will scope the right architecture for your environment — cloud, edge, or hybrid.
              </p>
            </div>
            <div class="cta-actions">
              <a routerLink="/contact" class="btn-primary">
                Contact Engineering
              </a>
              <a routerLink="/platform" class="btn-secondary">
                View Platform Architecture
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

    .solutions-list {
      display: flex;
      flex-direction: column;
      gap: 90px;
      padding-top: 30px;
      padding-bottom: 60px;
    }

    .solution-block {
      scroll-margin-top: 100px;
    }

    .solution-grid {
      display: grid;
      grid-template-columns: 1.05fr 0.95fr;
      align-items: center;
      gap: 60px;
    }

    .solution-grid.reverse {
      grid-template-columns: 0.95fr 1.05fr;
    }

    .solution-title {
      font-size: clamp(1.8rem, 3vw, 2.3rem);
      margin-bottom: 18px;
    }

    .solution-desc {
      font-size: 0.98rem;
      color: var(--color-text-secondary);
      line-height: 1.65;
    }

    .tech-stack-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 24px;
    }

    .tech-badge-chip {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.04em;
      color: var(--color-cyan);
      background: rgba(0, 194, 255, 0.08);
      border: 1px solid rgba(0, 194, 255, 0.25);
      padding: 4px 10px;
      border-radius: 4px;
    }

    :host-context([data-theme="light"]) .tech-badge-chip,
    :host-context(.light-theme) .tech-badge-chip,
    [data-theme="light"] .tech-badge-chip,
    .light-theme .tech-badge-chip {
      background: rgba(2, 132, 199, 0.08);
      border-color: rgba(2, 132, 199, 0.3);
      color: #0284c7;
    }

    .visualizer-card-wrap {
      width: 100%;
      min-width: 0;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
      border: 1px solid var(--color-border);
      transition: transform 0.3s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.3s cubic-bezier(0.2, 0, 0, 1);
    }

    .visualizer-card-wrap:hover {
      transform: translateY(-2px);
      box-shadow: 0 20px 48px rgba(0, 194, 255, 0.12);
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
      .solution-grid, .solution-grid.reverse {
        grid-template-columns: 1fr;
        gap: 36px;
      }
      .cta-actions {
        flex-direction: column;
      }
    }
  `]
})
export class SolutionsComponent {
  readonly briefingService = inject(BriefingService);
}
