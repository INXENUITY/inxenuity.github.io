import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BriefingService } from '../../services/briefing.service';

@Component({
  selector: 'app-solutions',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="page-wrapper">
      <!-- HERO SECTION -->
      <section class="hero-section">
        <div class="container">
          <div class="hero-content">
            <div class="tag-eyebrow">SOLUTIONS</div>
            <h1 class="hero-title">
              AI Intelligence for Every<br />
              Deployment Environment
            </h1>
            <p class="hero-subtitle">
              From industrial digital twins to autonomous robotics, InXenuity delivers production-ready multimodal AI across the full spectrum of enterprise environments.
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
                Fuse live sensor streams, camera feeds, and operational data into a continuously updated digital replica of your physical environment. InXenuity's fusion engine synchronises vision and audio signals with IoT telemetry at sub-second latency, enabling predictive maintenance, anomaly detection, and simulation-driven optimisation.
              </p>
              <ul class="bullet-list">
                <li>Predictive maintenance with 94% fault detection accuracy</li>
                <li>Sub-second synchronisation between physical and digital state</li>
                <li>Anomaly detection across 200+ concurrent sensor streams</li>
                <li>Integration with Siemens, PTC, and AVEVA twin platforms</li>
              </ul>
            </div>

            <!-- Schematic Box -->
            <div class="schematic-card hud-bracket-tl-br">
              <svg viewBox="0 0 380 220" fill="none" class="schematic-svg">
                <!-- Physical World Box -->
                <rect x="25" y="35" width="120" height="70" rx="2" stroke="#1E293B" stroke-width="1.2" fill="#0B0F19"/>
                <text x="85" y="52" fill="#64748B" font-family="monospace" font-size="8" font-weight="bold" text-anchor="middle" letter-spacing="0.1em">PHYSICAL WORLD</text>
                <rect x="35" y="65" width="28" height="20" rx="1" stroke="#00C2FF" stroke-width="0.8" fill="#0E1726"/>
                <text x="49" y="78" fill="#00C2FF" font-family="monospace" font-size="7" text-anchor="middle">CAM</text>
                <rect x="71" y="65" width="30" height="20" rx="1" stroke="#00C2FF" stroke-width="0.8" fill="#0E1726"/>
                <text x="86" y="78" fill="#00C2FF" font-family="monospace" font-size="7" text-anchor="middle">LIDAR</text>
                <rect x="109" y="65" width="26" height="20" rx="1" stroke="#00C2FF" stroke-width="0.8" fill="#0E1726"/>
                <text x="122" y="78" fill="#00C2FF" font-family="monospace" font-size="7" text-anchor="middle">IMU</text>

                <!-- Sync Arrow Flow -->
                <line x1="145" y1="70" x2="235" y2="70" stroke="#00C2FF" stroke-width="1.2" stroke-dasharray="3 3"/>
                <polygon points="235,70 229,66 229,74" fill="#00C2FF"/>
                <rect x="175" y="60" width="32" height="18" rx="1" fill="#06090F" stroke="#1E293B" stroke-width="0.8"/>
                <text x="191" y="72" fill="#38BDF8" font-family="monospace" font-size="7" text-anchor="middle">SYNC</text>

                <!-- Digital Twin Box -->
                <rect x="235" y="35" width="120" height="70" rx="2" stroke="#00C2FF" stroke-width="1.2" stroke-opacity="0.8" fill="#0B0F19"/>
                <text x="295" y="52" fill="#38BDF8" font-family="monospace" font-size="8" font-weight="bold" text-anchor="middle" letter-spacing="0.1em">DIGITAL TWIN</text>
                <circle cx="265" cy="75" r="4" fill="#00C2FF"/>
                <circle cx="310" cy="70" r="3" fill="#FFFFFF"/>
                <circle cx="290" cy="85" r="3" fill="#0080FF"/>
                <line x1="265" y1="75" x2="310" y2="70" stroke="#00C2FF" stroke-width="0.8" stroke-dasharray="2 2"/>
                <line x1="265" y1="75" x2="290" y2="85" stroke="#00C2FF" stroke-width="0.8" stroke-dasharray="2 2"/>
                <line x1="290" y1="85" x2="310" y2="70" stroke="#00C2FF" stroke-width="0.8" stroke-dasharray="2 2"/>

                <!-- InXenuity Fusion Banner Below -->
                <rect x="100" y="140" width="180" height="46" rx="2" stroke="#00C2FF" stroke-width="1" fill="#0D1424"/>
                <text x="190" y="158" fill="#FFFFFF" font-family="monospace" font-size="9" font-weight="bold" text-anchor="middle" letter-spacing="0.08em">INXENUITY FUSION</text>
                <text x="190" y="174" fill="#94A3B8" font-family="sans-serif" font-size="8" text-anchor="middle">Multimodal · Real-time · Sub-second</text>

                <!-- Connecting lines to fusion -->
                <path d="M 85 105 L 85 163 L 100 163" stroke="#1E293B" stroke-width="1" stroke-dasharray="2 2"/>
                <path d="M 295 105 L 295 163 L 280 163" stroke="#00C2FF" stroke-width="1" stroke-dasharray="2 2"/>
              </svg>
            </div>
          </div>
        </section>

        <!-- 2. ROBOTICS & AUTOMATION (Flipped) -->
        <section id="robotics" class="solution-block">
          <div class="solution-grid reverse">
            <!-- Schematic Box: Robot Perception Wireframe -->
            <div class="schematic-card hud-bracket-tl-br">
              <svg viewBox="0 0 380 220" fill="none" class="schematic-svg">
                <!-- Head / Eyes Sensor -->
                <rect x="160" y="35" width="60" height="36" rx="4" stroke="#00C2FF" stroke-width="1.4" fill="#090E18"/>
                <circle cx="178" cy="53" r="5" fill="#00C2FF"/>
                <circle cx="202" cy="53" r="5" fill="#00C2FF"/>

                <!-- Neck -->
                <line x1="190" y1="71" x2="190" y2="82" stroke="#00C2FF" stroke-width="2"/>

                <!-- Body / Core (8W TDP) -->
                <rect x="145" y="82" width="90" height="65" rx="3" stroke="#00C2FF" stroke-width="1.4" fill="#0C1424"/>
                <rect x="165" y="96" width="50" height="22" rx="2" stroke="#1E293B" stroke-width="0.8" fill="#070A10"/>
                <text x="190" y="110" fill="#38BDF8" font-family="monospace" font-size="8" font-weight="bold" text-anchor="middle">8W TDP</text>

                <!-- Limbs wireframe -->
                <line x1="165" y1="147" x2="165" y2="185" stroke="#00C2FF" stroke-width="1.4"/>
                <line x1="215" y1="147" x2="215" y2="185" stroke="#00C2FF" stroke-width="1.4"/>
                <line x1="145" y1="92" x2="125" y2="135" stroke="#00C2FF" stroke-width="1.4"/>
                <line x1="235" y1="92" x2="255" y2="135" stroke="#00C2FF" stroke-width="1.4"/>

                <!-- Vision Input Tag Left -->
                <text x="90" y="95" fill="#94A3B8" font-family="monospace" font-size="8">VISION</text>
                <line x1="118" y1="92" x2="145" y2="92" stroke="#00C2FF" stroke-width="1" stroke-dasharray="2 2"/>

                <!-- Audio Input Tag Right -->
                <text x="270" y="95" fill="#94A3B8" font-family="monospace" font-size="8">AUDIO</text>
                <line x1="235" y1="92" x2="262" y2="92" stroke="#00C2FF" stroke-width="1" stroke-dasharray="2 2"/>
              </svg>
            </div>

            <div class="solution-info">
              <div class="tag-eyebrow no-dot">— ROBOTICS & AUTOMATION</div>
              <h2 class="solution-title">Perception for Autonomous Systems</h2>
              <p class="solution-desc">
                Give robots the ability to see, hear, and reason about their environment in real time. InXenuity's edge-optimised runtime runs full multimodal perception within an 8W power budget, enabling safe navigation, object manipulation, and human-robot collaboration in unstructured environments.
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
                Deploy the full InXenuity platform on Kubernetes with horizontal autoscaling, multi-tenant model serving, and enterprise observability. Process thousands of concurrent video and audio streams with deterministic SLAs, backed by a 99.99% uptime managed service.
              </p>
              <ul class="bullet-list">
                <li>2,400 fps multi-camera throughput on a single node</li>
                <li>Horizontal autoscaling with sub-100ms cold-start</li>
                <li>Multi-tenant model isolation with RBAC</li>
                <li>OpenTelemetry-compatible observability stack</li>
              </ul>
            </div>

            <!-- Schematic Box: Kubernetes Tree Cluster -->
            <div class="schematic-card hud-bracket-tl-br">
              <svg viewBox="0 0 380 220" fill="none" class="schematic-svg">
                <!-- Root Node (Ingress / Cluster Gateway) -->
                <circle cx="190" cy="40" r="14" stroke="#00C2FF" stroke-width="1.5" fill="#0C1527"/>
                <text x="190" y="43" fill="#00C2FF" font-family="monospace" font-size="7" font-weight="bold" text-anchor="middle">INGRESS</text>

                <!-- Branch lines -->
                <line x1="190" y1="54" x2="130" y2="100" stroke="#00C2FF" stroke-width="1" stroke-dasharray="2 2"/>
                <line x1="190" y1="54" x2="250" y2="100" stroke="#00C2FF" stroke-width="1" stroke-dasharray="2 2"/>

                <!-- Level 2 Nodes (Worker Nodes) -->
                <circle cx="130" cy="100" r="10" stroke="#0080FF" stroke-width="1.2" fill="#0B1220"/>
                <text x="130" y="103" fill="#38BDF8" font-family="monospace" font-size="7" text-anchor="middle">W1</text>
                <circle cx="250" cy="100" r="10" stroke="#0080FF" stroke-width="1.2" fill="#0B1220"/>
                <text x="250" y="103" fill="#38BDF8" font-family="monospace" font-size="7" text-anchor="middle">W2</text>

                <!-- Pod Branch Lines -->
                <line x1="130" y1="110" x2="95" y2="150" stroke="#1E293B" stroke-width="1"/>
                <line x1="130" y1="110" x2="130" y2="150" stroke="#1E293B" stroke-width="1"/>
                <line x1="130" y1="110" x2="165" y2="150" stroke="#1E293B" stroke-width="1"/>

                <line x1="250" y1="110" x2="215" y2="150" stroke="#1E293B" stroke-width="1"/>
                <line x1="250" y1="110" x2="250" y2="150" stroke="#1E293B" stroke-width="1"/>
                <line x1="250" y1="110" x2="285" y2="150" stroke="#1E293B" stroke-width="1"/>

                <!-- Level 3 Nodes (Pods) -->
                <circle cx="95" cy="150" r="6" fill="#00C2FF"/>
                <circle cx="130" cy="150" r="6" fill="#00C2FF"/>
                <circle cx="165" cy="150" r="6" fill="#00C2FF"/>
                <circle cx="215" cy="150" r="6" fill="#00C2FF"/>
                <circle cx="250" cy="150" r="6" fill="#00C2FF"/>
                <circle cx="285" cy="150" r="6" fill="#00C2FF"/>

                <!-- Footer label -->
                <text x="190" y="195" fill="#64748B" font-family="monospace" font-size="8" text-anchor="middle">Kubernetes · Autoscaling · 99.99% SLA</text>
              </svg>
            </div>
          </div>
        </section>

        <!-- 4. EDGE & IOT (Flipped) -->
        <section id="iot" class="solution-block">
          <div class="solution-grid reverse">
            <!-- Schematic Box: Edge Architecture -->
            <div class="schematic-card hud-bracket-tl-br">
              <svg viewBox="0 0 380 220" fill="none" class="schematic-svg">
                <!-- Top Cloud Box -->
                <rect x="135" y="25" width="110" height="42" rx="2" stroke="#00C2FF" stroke-width="1.2" fill="#0A101C"/>
                <text x="190" y="42" fill="#FFFFFF" font-family="monospace" font-size="8" font-weight="bold" text-anchor="middle">CLOUD</text>
                <text x="190" y="55" fill="#64748B" font-family="sans-serif" font-size="7" text-anchor="middle">Model Registry · OTA</text>

                <!-- Downward Arrow with Telemetry Label -->
                <line x1="190" y1="67" x2="190" y2="120" stroke="#00C2FF" stroke-width="1.2" stroke-dasharray="3 3"/>
                <polygon points="190,120 186,114 194,114" fill="#00C2FF"/>
                <text x="190" y="98" fill="#38BDF8" font-family="monospace" font-size="7" text-anchor="middle">Edge-to-Cloud Telemetry Sync</text>

                <!-- 3 Edge Devices Below -->
                <!-- 1: Jetson -->
                <rect x="40" y="122" width="85" height="42" rx="2" stroke="#1E293B" stroke-width="1" fill="#0B111D"/>
                <text x="82" y="140" fill="#E2E8F0" font-family="monospace" font-size="8" font-weight="bold" text-anchor="middle">JETSON</text>
                <text x="82" y="152" fill="#64748B" font-family="sans-serif" font-size="6.5" text-anchor="middle">OFFLINE-CAPABLE</text>

                <!-- 2: Gateway -->
                <rect x="147" y="122" width="85" height="42" rx="2" stroke="#00C2FF" stroke-width="1.2" fill="#0C1527"/>
                <text x="189" y="140" fill="#00C2FF" font-family="monospace" font-size="8" font-weight="bold" text-anchor="middle">GATEWAY</text>
                <text x="189" y="152" fill="#38BDF8" font-family="sans-serif" font-size="6.5" text-anchor="middle">OFFLINE-CAPABLE</text>

                <!-- 3: Embedded -->
                <rect x="255" y="122" width="85" height="42" rx="2" stroke="#1E293B" stroke-width="1" fill="#0B111D"/>
                <text x="297" y="140" fill="#E2E8F0" font-family="monospace" font-size="8" font-weight="bold" text-anchor="middle">EMBEDDED</text>
                <text x="297" y="152" fill="#64748B" font-family="sans-serif" font-size="6.5" text-anchor="middle">OFFLINE-CAPABLE</text>

                <!-- Branching Lines from arrow to 3 boxes -->
                <path d="M 190 110 L 82 110 L 82 122" stroke="#1E293B" stroke-width="0.8"/>
                <path d="M 190 110 L 297 110 L 297 122" stroke="#1E293B" stroke-width="0.8"/>
              </svg>
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
            </div>
          </div>
        </section>
      </div>

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
              <button (click)="briefingService.open()" class="btn-primary">
                Talk to an Engineer
              </button>
              <a routerLink="/" class="btn-secondary">
                View Platform Docs
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
      grid-template-columns: 1.1fr 0.9fr;
      align-items: center;
      gap: 60px;
    }

    .solution-grid.reverse {
      grid-template-columns: 0.9fr 1.1fr;
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

    .schematic-card {
      position: relative;
      background: rgba(10, 15, 25, 0.85);
      border: 1px solid var(--color-border);
      padding: 30px 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 280px;
      box-shadow: 0 16px 48px rgba(0, 0, 0, 0.6);
    }

    .schematic-svg {
      width: 100%;
      max-width: 380px;
      height: auto;
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
