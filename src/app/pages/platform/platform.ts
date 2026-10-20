import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BriefingService } from '../../services/briefing.service';
import { HeroBackgroundVisualizerComponent } from '../../components/hero-background-visualizer/hero-background-visualizer';
import { TechLogosComponent } from '../../components/tech-logos/tech-logos';

@Component({
  selector: 'app-platform',
  standalone: true,
  imports: [RouterLink, HeroBackgroundVisualizerComponent, TechLogosComponent],
  template: `
    <div class="page-wrapper">
      <!-- HERO SECTION WITH HORIZONTALLY FILLING INFERENCE BACKGROUND EFFECT -->
      <section class="hero-section">
        <!-- Background Animation Horizontally Filling the Entire Hero Section -->
        <app-hero-background-visualizer></app-hero-background-visualizer>

        <div class="container hero-container">
          <div class="hero-content">
            <div class="hero-status-pill">
              <span class="live-pulse-dot"></span>
              MULTIMODAL AI RUNTIME &bull; COMPUTER VISION &bull; ACOUSTIC &bull; TELEMETRY
            </div>

            <h1 class="hero-title">
              Intelligence Engineered<br />
              for Every Industrial Layer
            </h1>

            <p class="hero-subtitle">
              Unified multimodal computer vision, acoustic system fault detection, and real-time sensor anomaly pattern recognition — containerised, deterministic at sub-5ms latency, and production-ready across industrial digital twins, autonomous robotics, edge nodes, and cloud infrastructure.
            </p>

            <div class="hero-cta-group">
              <a href="#four-pillars" class="btn-primary">
                Explore the Platform
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
              <a routerLink="/contact" class="btn-secondary">
                Contact Engineering
              </a>
              <button (click)="briefingService.open()" class="btn-secondary">
                Direct Connect Hub
              </button>
            </div>

            <!-- Hero Metrics Bar -->
            <div class="hero-metrics-bar">
              <div class="metric-item">
                <span class="metric-val">&lt; 5ms</span>
                <span class="metric-label">Inference Latency</span>
              </div>
              <div class="metric-divider"></div>
              <div class="metric-item">
                <span class="metric-val">60 FPS</span>
                <span class="metric-label">Real-time Vision</span>
              </div>
              <div class="metric-divider"></div>
              <div class="metric-item">
                <span class="metric-val">0–24 kHz</span>
                <span class="metric-label">Acoustic Fault AI</span>
              </div>
              <div class="metric-divider"></div>
              <div class="metric-item">
                <span class="metric-val">8W TDP</span>
                <span class="metric-label">Edge Constrained</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- TECH ECOSYSTEM & RUNTIMES RIBBON -->
      <app-tech-logos [mode]="'ribbon'"></app-tech-logos>

      <!-- FOUR PILLARS SECTION -->
      <section id="four-pillars" class="section-padding">
        <div class="container">
          <div class="section-header">
            <div class="tag-eyebrow no-dot">— CORE CAPABILITIES</div>
            <h2 class="section-title">Four Pillars of the INXENUITY Platform</h2>
          </div>

          <div class="grid-2 pillars-grid">
            <!-- Pillar 1 -->
            <div class="hud-card hud-bracket-tl-br" id="vision">
              <div class="card-eyebrow">VISION / PERCEPTION</div>
              <h3 class="card-title">Multimodal Vision Intelligence</h3>
              <p class="card-text">
                Real-time computer vision models engineered for high-throughput inference across cameras, LiDAR, and depth sensors. Deployable in containerised environments with sub-10ms latency.
              </p>
            </div>

            <!-- Pillar 2 -->
            <div class="hud-card hud-bracket-tl-br" id="audio">
              <div class="card-eyebrow">AUDIO / ACOUSTIC</div>
              <h3 class="card-title">Audio Intelligence Engine</h3>
              <p class="card-text">
                Unified audio processing stack — speech recognition, acoustic event detection, and environmental audio classification running as containerised microservices.
              </p>
            </div>

            <!-- Pillar 3 -->
            <div class="hud-card hud-bracket-tl-br" id="containerised">
              <div class="card-eyebrow">DEPLOYMENT / ORCHESTRATION</div>
              <h3 class="card-title">Containerised Deployment</h3>
              <p class="card-text">
                Docker and Kubernetes-native AI model serving. Orchestrate inference workloads across cloud, on-premise, and hybrid environments with zero-downtime rolling updates.
              </p>
            </div>

            <!-- Pillar 4 -->
            <div class="hud-card hud-bracket-tl-br" id="edge">
              <div class="card-eyebrow">EDGE / ROBOTICS</div>
              <h3 class="card-title">Edge & Robotics AI</h3>
              <p class="card-text">
                Optimised model runtimes for resource-constrained hardware — NVIDIA Jetson, ARM-based edge nodes, and ROS2-integrated robotic systems with real-time control loops.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- PLATFORM ARCHITECTURE SECTION -->
      <section id="architecture" class="section-padding architecture-section">
        <div class="container">
          <div class="architecture-grid">
            <!-- Left Diagram Box -->
            <div class="arch-diagram-col">
              <div class="stack-box-container hud-bracket-tl-br">
                <div class="stack-box active-layer">
                  <div class="stack-header">
                    <span class="mono-label">SENSOR INPUT LAYER</span>
                  </div>
                  <div class="stack-desc">Camera · LiDAR · Microphone · IMU · IoT Streams</div>
                </div>
                <div class="stack-connector">
                  <svg width="18" height="20" viewBox="0 0 20 20" fill="none">
                    <line x1="10" y1="20" x2="10" y2="0" stroke="#00C2FF" stroke-width="1.5" stroke-dasharray="3 3"/>
                    <polygon points="10,0 6,6 14,6" fill="#00C2FF" />
                  </svg>
                </div>
                <div class="stack-box">
                  <div class="stack-header">
                    <span class="mono-label">MULTIMODAL FUSION ENGINE</span>
                  </div>
                  <div class="stack-desc">Vision + Audio + Sensor Fusion · Feature Extraction</div>
                </div>
                <div class="stack-connector">
                  <svg width="18" height="20" viewBox="0 0 20 20" fill="none">
                    <line x1="10" y1="20" x2="10" y2="0" stroke="#00C2FF" stroke-width="1.5" stroke-dasharray="3 3"/>
                    <polygon points="10,0 6,6 14,6" fill="#00C2FF" />
                  </svg>
                </div>
                <div class="stack-box">
                  <div class="stack-header">
                    <span class="mono-label">INFERENCE ORCHESTRATOR</span>
                  </div>
                  <div class="stack-desc">Real-time Model Serving · Containerised Runtime</div>
                </div>
                <div class="stack-connector">
                  <svg width="18" height="20" viewBox="0 0 20 20" fill="none">
                    <line x1="10" y1="20" x2="10" y2="0" stroke="#00C2FF" stroke-width="1.5" stroke-dasharray="3 3"/>
                    <polygon points="10,0 6,6 14,6" fill="#00C2FF" />
                  </svg>
                </div>
                <div class="stack-box">
                  <div class="stack-header">
                    <span class="mono-label">DEPLOYMENT TARGETS</span>
                  </div>
                  <div class="stack-desc">Cloud · Edge · Robotics · Digital Twins · IoT</div>
                </div>
              </div>
            </div>

            <!-- Right Details Column -->
            <div class="arch-content-col">
              <div class="tag-eyebrow no-dot">— PLATFORM ARCHITECTURE</div>
              <h2 class="arch-title">One Unified AI Stack. Every Deployment Target.</h2>
              <p class="arch-desc">
                INXENUITY's platform abstracts the complexity of multimodal AI deployment into a single, coherent architecture — from raw sensor input through inference to action across any environment.
              </p>

              <div class="numbered-stack-list">
                <div class="num-item">
                  <div class="num-badge">1</div>
                  <div class="num-content">
                    <h4 class="num-title">Sensor Input Layer</h4>
                    <p class="num-text">Camera · LiDAR · Microphone · IMU · IoT Streams</p>
                  </div>
                </div>

                <div class="num-item">
                  <div class="num-badge">2</div>
                  <div class="num-content">
                    <h4 class="num-title">Multimodal Fusion Engine</h4>
                    <p class="num-text">Vision + Audio + Sensor Fusion · Feature Extraction</p>
                  </div>
                </div>

                <div class="num-item">
                  <div class="num-badge">3</div>
                  <div class="num-content">
                    <h4 class="num-title">Inference Orchestrator</h4>
                    <p class="num-text">Real-time Model Serving · Containerised Runtime · Auto-scaling</p>
                  </div>
                </div>

                <div class="num-item">
                  <div class="num-badge">4</div>
                  <div class="num-content">
                    <h4 class="num-title">Deployment Targets</h4>
                    <p class="num-text">Cloud · Edge · Robotics · Digital Twins · IoT</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- DEPLOYMENT TARGETS SECTION -->
      <section class="section-padding">
        <div class="container">
          <div class="section-header">
            <div class="tag-eyebrow no-dot">— DEPLOYMENT TARGETS</div>
            <h2 class="section-title">Built for the Environments That Matter</h2>
          </div>

          <div class="targets-container">
            <!-- Target 1: Digital Twins -->
            <div class="target-row">
              <div class="target-info hud-card">
                <div class="card-eyebrow">VIRTUAL / SIMULATION</div>
                <h3 class="card-title">Digital Twins & Virtual Environments</h3>
                <p class="card-text">
                  Deploy AI inference inside high-fidelity digital twin simulations. Validate model behaviour in virtual environments before physical deployment — reducing risk and accelerating iteration cycles.
                </p>
              </div>
              <div class="target-graphic hud-card">
                <!-- Monitor / Digital Screen Schematic SVG -->
                <svg viewBox="0 0 320 200" fill="none" class="blueprint-svg">
                  <!-- Monitor border -->
                  <rect x="70" y="30" width="180" height="110" rx="3" stroke="#1E293B" stroke-width="2"/>
                  <rect x="80" y="40" width="160" height="90" stroke="#00C2FF" stroke-width="1.2" stroke-opacity="0.8"/>
                  <!-- Stand -->
                  <line x1="160" y1="140" x2="160" y2="165" stroke="#1E293B" stroke-width="3"/>
                  <line x1="130" y1="165" x2="190" y2="165" stroke="#1E293B" stroke-width="3"/>
                  <!-- Data Node Network inside Screen -->
                  <circle cx="160" cy="85" r="4" fill="#00C2FF" />
                  <circle cx="110" cy="65" r="3" fill="#0080FF" />
                  <circle cx="210" cy="65" r="3" fill="#0080FF" />
                  <circle cx="120" cy="105" r="2.5" fill="#38BDF8" />
                  <circle cx="200" cy="105" r="2.5" fill="#38BDF8" />
                  <!-- Network lines -->
                  <line x1="160" y1="85" x2="110" y2="65" stroke="#00C2FF" stroke-width="0.8" stroke-dasharray="2 2" stroke-opacity="0.7"/>
                  <line x1="160" y1="85" x2="210" y2="65" stroke="#00C2FF" stroke-width="0.8" stroke-dasharray="2 2" stroke-opacity="0.7"/>
                  <line x1="160" y1="85" x2="120" y2="105" stroke="#00C2FF" stroke-width="0.8" stroke-dasharray="2 2" stroke-opacity="0.7"/>
                  <line x1="160" y1="85" x2="200" y2="105" stroke="#00C2FF" stroke-width="0.8" stroke-dasharray="2 2" stroke-opacity="0.7"/>
                  <!-- Floating Satellite Nodes -->
                  <circle cx="45" cy="85" r="2.5" fill="#00C2FF" />
                  <line x1="45" y1="85" x2="80" y2="85" stroke="#00C2FF" stroke-width="0.8" stroke-dasharray="2 2" stroke-opacity="0.4"/>
                  <circle cx="275" cy="85" r="2.5" fill="#00C2FF" />
                  <line x1="240" y1="85" x2="275" y2="85" stroke="#00C2FF" stroke-width="0.8" stroke-dasharray="2 2" stroke-opacity="0.4"/>
                </svg>
              </div>
            </div>

            <!-- Target 2: Robotics & Edge (Flipped layout) -->
            <div class="target-row reverse">
              <div class="target-graphic hud-card">
                <!-- Radial Sensor Hub Schematic SVG -->
                <svg viewBox="0 0 320 200" fill="none" class="blueprint-svg">
                  <!-- Orbital rings -->
                  <circle cx="160" cy="100" r="32" stroke="#00C2FF" stroke-width="1.2" stroke-opacity="0.6"/>
                  <circle cx="160" cy="100" r="60" stroke="#1E293B" stroke-width="1" stroke-dasharray="3 3"/>
                  <!-- Center Core -->
                  <circle cx="160" cy="100" r="8" fill="#00C2FF" />
                  <circle cx="160" cy="100" r="14" stroke="#00C2FF" stroke-width="0.8" stroke-opacity="0.3"/>
                  <!-- 6 Radiating Nodes -->
                  <!-- 0 deg -->
                  <line x1="192" y1="100" x2="220" y2="100" stroke="#00C2FF" stroke-width="1"/>
                  <circle cx="220" cy="100" r="3" fill="#FFFFFF"/>
                  <!-- 60 deg -->
                  <line x1="176" y1="72" x2="190" y2="48" stroke="#00C2FF" stroke-width="1"/>
                  <circle cx="190" cy="48" r="3" fill="#00C2FF"/>
                  <!-- 120 deg -->
                  <line x1="144" y1="72" x2="130" y2="48" stroke="#00C2FF" stroke-width="1"/>
                  <circle cx="130" cy="48" r="3" fill="#00C2FF"/>
                  <!-- 180 deg -->
                  <line x1="128" y1="100" x2="100" y2="100" stroke="#00C2FF" stroke-width="1"/>
                  <circle cx="100" cy="100" r="3" fill="#FFFFFF"/>
                  <!-- 240 deg -->
                  <line x1="144" y1="128" x2="130" y2="152" stroke="#00C2FF" stroke-width="1"/>
                  <circle cx="130" cy="152" r="3" fill="#00C2FF"/>
                  <!-- 300 deg -->
                  <line x1="176" y1="128" x2="190" y2="152" stroke="#00C2FF" stroke-width="1"/>
                  <circle cx="190" cy="152" r="3" fill="#00C2FF"/>
                </svg>
              </div>
              <div class="target-info hud-card">
                <div class="card-eyebrow">PHYSICAL / ROBOTICS</div>
                <h3 class="card-title">Physical AI Systems — Robotics & Edge</h3>
                <p class="card-text">
                  Run vision and audio intelligence directly on robotic platforms and edge hardware. INXENUITY's optimised runtimes deliver real-time perception and decision-making at the point of action.
                </p>
              </div>
            </div>

            <!-- Target 3: Cloud & Containerised -->
            <div class="target-row">
              <div class="target-info hud-card">
                <div class="card-eyebrow">CLOUD / INFRASTRUCTURE</div>
                <h3 class="card-title">Cloud & Containerised Infrastructure</h3>
                <p class="card-text">
                  Scale AI workloads elastically across cloud infrastructure. Kubernetes-native deployment with full observability, model versioning, and zero-downtime updates for enterprise-grade reliability.
                </p>
              </div>
              <div class="target-graphic hud-card">
                <!-- Isometric Cloud Server Blocks Schematic SVG -->
                <svg viewBox="0 0 320 200" fill="none" class="blueprint-svg">
                  <!-- Block 1 (Top Left) -->
                  <rect x="90" y="45" width="85" height="55" rx="2" stroke="#00C2FF" stroke-width="1.2" stroke-opacity="0.7"/>
                  <rect x="98" y="53" width="69" height="14" rx="1" stroke="#1E293B" stroke-width="0.8"/>
                  <circle cx="106" cy="60" r="2" fill="#00C2FF"/>
                  <circle cx="114" cy="60" r="2" fill="#10B981"/>
                  <!-- Block 2 (Overlapping Center) -->
                  <rect x="130" y="75" width="95" height="60" rx="2" stroke="#00C2FF" stroke-width="1.4" fill="#090E18" fill-opacity="0.9"/>
                  <rect x="140" y="85" width="75" height="16" rx="1" stroke="#1E293B" stroke-width="0.8"/>
                  <circle cx="150" cy="93" r="2" fill="#00C2FF"/>
                  <circle cx="158" cy="93" r="2" fill="#00C2FF"/>
                  <!-- Block 3 (Overlapping Right) -->
                  <rect x="180" y="105" width="80" height="50" rx="2" stroke="#00C2FF" stroke-width="1" stroke-opacity="0.5" fill="#090E18" fill-opacity="0.8"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CERTIFIED ENTERPRISE ECOSYSTEM GRID -->
      <app-tech-logos [mode]="'grid'"></app-tech-logos>

      <!-- CTA BANNER -->
      <section class="section-padding">
        <div class="container">
          <div class="cta-banner hud-bracket-tl-br">
            <div class="cta-content">
              <h2 class="cta-title">Deploy Intelligence at Every Layer</h2>
              <p class="cta-desc">
                INXENUITY is built for organisations that require AI infrastructure to perform at the edge of what's possible.
              </p>
            </div>
            <div class="cta-actions">
              <a routerLink="/contact" class="btn-primary">
                Contact Engineering
              </a>
              <a routerLink="/solutions" class="btn-secondary">
                Explore Enterprise Solutions
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .hero-section {
      position: relative;
      width: 100%;
      min-height: 85vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-top: 155px;
      padding-bottom: 90px;
      overflow: hidden;
    }

    .hero-container {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      width: 100%;
    }

    .hero-content {
      max-width: 900px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .hero-status-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--color-cyan);
      background: var(--color-surface-translucent);
      border: 1px solid var(--color-border);
      padding: 6px 16px;
      border-radius: 20px;
      margin-bottom: 24px;
      letter-spacing: 0.08em;
      backdrop-filter: blur(8px);
    }

    .live-pulse-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 10px #10b981;
      animation: pulse 1.5s infinite;
    }

    .hero-title {
      font-size: clamp(2.4rem, 5vw, 4.2rem);
      margin-bottom: 24px;
      font-weight: 800;
      letter-spacing: -0.03em;
      line-height: 1.12;
      color: var(--color-text-heading);
    }

    .hero-subtitle {
      font-size: clamp(1.05rem, 1.8vw, 1.25rem);
      line-height: 1.65;
      color: var(--color-text-secondary);
      max-width: 780px;
      margin-bottom: 40px;
    }

    .hero-cta-group {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      justify-content: center;
      margin-bottom: 44px;
    }

    .hero-metrics-bar {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 28px;
      padding: 16px 32px;
      background: var(--color-surface-translucent);
      border: 1px solid var(--color-border);
      border-radius: 12px;
      backdrop-filter: blur(12px);
      flex-wrap: wrap;
    }

    .metric-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
    }

    .metric-val {
      font-family: var(--font-mono);
      font-size: 1.25rem;
      font-weight: 800;
      color: var(--color-cyan);
    }

    .metric-label {
      font-family: var(--font-sans);
      font-size: 0.76rem;
      color: var(--color-text-secondary);
      letter-spacing: 0.02em;
    }

    .metric-divider {
      width: 1px;
      height: 28px;
      background: var(--color-border);
    }

    /* Stack Box Diagram Styles */
    .stack-box-container {
      position: relative;
      background: var(--color-wireframe-bg);
      border: 1px solid var(--color-border);
      padding: 32px 28px;
      display: flex;
      flex-direction: column;
      gap: 0;
      box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4);
    }

    .stack-box {
      border: 1px solid var(--color-hud-box-border);
      background: var(--color-hud-box);
      padding: 16px 20px;
      border-radius: 2px;
      transition: all 0.2s ease;
    }

    .stack-box.active-layer {
      border-color: var(--color-cyan);
      box-shadow: 0 0 16px rgba(0, 194, 255, 0.2);
    }

    .stack-box:hover {
      border-color: var(--color-cyan);
      background: rgba(16, 26, 46, 0.85);
    }

    .stack-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 4px;
    }

    .mono-label {
      font-family: var(--font-mono);
      font-size: 0.76rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      color: #38bdf8;
    }

    .indicator-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--color-cyan);
      box-shadow: 0 0 6px var(--color-cyan);
    }

    .stack-desc {
      font-size: 0.82rem;
      color: var(--color-text-secondary);
    }

    .stack-connector {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 20px;
    }

    /* Section Headers */
    .section-header {
      margin-bottom: 48px;
    }

    .section-title {
      font-size: clamp(2rem, 3.5vw, 2.5rem);
    }

    .card-eyebrow {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 0.14em;
      color: var(--color-cyan);
      margin-bottom: 12px;
    }

    .card-title {
      font-size: 1.3rem;
      margin-bottom: 12px;
      font-weight: 600;
    }

    .card-text {
      font-size: 0.92rem;
      color: var(--color-text-secondary);
      line-height: 1.6;
    }

    /* Architecture Section */
    .architecture-section {
      background: var(--color-bg-alt);
      border-top: 1px solid var(--color-border);
      border-bottom: 1px solid var(--color-border);
    }

    .architecture-grid {
      display: grid;
      grid-template-columns: 0.9fr 1.1fr;
      align-items: center;
      gap: 64px;
    }

    .arch-title {
      font-size: clamp(2rem, 3.5vw, 2.6rem);
      margin-bottom: 18px;
    }

    .arch-desc {
      font-size: 1.05rem;
      color: var(--color-text-secondary);
      line-height: 1.6;
      margin-bottom: 36px;
    }

    .numbered-stack-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .num-item {
      display: flex;
      align-items: flex-start;
      gap: 20px;
      padding: 16px 20px;
      background: var(--color-surface-translucent);
      border: 1px solid var(--color-border);
      border-radius: 2px;
      transition: border-color 0.2s ease;
    }

    .num-item:hover {
      border-color: rgba(0, 194, 255, 0.4);
    }

    .num-badge {
      width: 28px;
      height: 28px;
      background: rgba(0, 194, 255, 0.12);
      border: 1px solid rgba(0, 194, 255, 0.4);
      border-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-mono);
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--color-cyan);
      flex-shrink: 0;
    }

    .num-title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--color-text-heading);
      margin-bottom: 4px;
    }

    .num-text {
      font-size: 0.85rem;
      color: var(--color-text-secondary);
    }

    /* Targets alternating rows */
    .targets-container {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    .target-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
      align-items: stretch;
    }

    .target-graphic {
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--color-surface-hover);
      min-height: 220px;
    }

    .blueprint-svg {
      width: 100%;
      max-width: 280px;
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

    @media (max-width: 960px) {
      .hero-container, .architecture-grid {
        grid-template-columns: 1fr;
      }
      .target-row, .target-row.reverse {
        grid-template-columns: 1fr;
      }
      .cta-actions {
        flex-direction: column;
      }
    }
  `]
})
export class PlatformComponent {
  readonly briefingService = inject(BriefingService);
}
