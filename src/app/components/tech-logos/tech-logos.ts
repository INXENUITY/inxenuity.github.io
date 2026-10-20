import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TechItem {
  id: string;
  name: string;
  category: string;
  badge?: string;
  description: string;
  color: string;
}

@Component({
  selector: 'app-tech-logos',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="tech-ecosystem-section" [class.mode-grid]="mode === 'grid'" [class.mode-ribbon]="mode === 'ribbon'">
      <div class="container">
        <!-- Section Header if grid mode -->
        <div class="ecosystem-header" *ngIf="mode === 'grid'">
          <div class="tag-eyebrow no-dot">— CERTIFIED RUNTIMES &amp; INFRASTRUCTURE</div>
          <h2 class="section-title">Engineered for the Enterprise Ecosystem</h2>
          <p class="section-subtitle">
            INXENUITY deploys natively across leading cloud hyperscalers, container orchestration engines, GPU runtimes, and industrial edge operating systems.
          </p>
        </div>

        <!-- Ribbon Header if ribbon mode -->
        <div class="ribbon-bar-header" *ngIf="mode === 'ribbon'">
          <div class="ribbon-pill">
            <span class="live-dot"></span>
            SUPPORTED RUNTIMES &amp; INFRASTRUCTURE ECOSYSTEM
          </div>
          <span class="ribbon-caption">Containerised &bull; GPU-Accelerated &bull; Cloud &bull; Edge</span>
        </div>

        <!-- Logos Container -->
        <div class="logos-wrap" [class.grid-layout]="mode === 'grid'" [class.ribbon-layout]="mode === 'ribbon'">
          <!-- 1. NVIDIA -->
          <div class="tech-badge" title="NVIDIA AI & Hardware Acceleration">
            <div class="icon-wrap nvidia-color">
              <svg viewBox="0 0 32 32" class="tech-svg" fill="none">
                <path d="M4 16c0-6.63 5.37-12 12-12 5.03 0 9.32 3.1 11.08 7.49-.66-.41-1.39-.72-2.18-.9-1.38-3.07-4.48-5.21-8.9-5.21-4.97 0-9 4.03-9 9s4.03 9 9 9c3.96 0 7.31-2.56 8.52-6.13.75.14 1.5.14 2.22 0C25.32 23.9 21.03 27 16 27c-6.63 0-12-5.37-12-12z" fill="#76B900"/>
                <path d="M16 9c-3.87 0-7 3.13-7 7s3.13 7 7 7c3.12 0 5.78-2.04 6.66-4.88-.73-.24-1.41-.63-2.01-1.13-.67 1.95-2.52 3.35-4.65 3.35-2.76 0-5-2.24-5-5s2.24-5 5-5c1.86 0 3.49 1.02 4.35 2.53.64-.32 1.35-.51 2.1-.56C21.36 10.45 18.9 9 16 9z" fill="#76B900"/>
                <path d="M16 13c-1.66 0-3 1.34-3 3s1.34 3 3 3c1.39 0 2.54-.95 2.89-2.25-.43-.3-.79-.69-1.07-1.14-.32.61-.95 1.03-1.82 1.03-1.1 0-2-.9-2-2s.9-2 2-2c.67 0 1.25.33 1.61.83.43-.17.9-.27 1.39-.31C18.45 13.84 17.32 13 16 13z" fill="#76B900"/>
              </svg>
            </div>
            <div class="tech-info">
              <span class="tech-name">NVIDIA</span>
              <span class="tech-meta">Orin / Jetson / TensorRT</span>
            </div>
          </div>

          <!-- 2. CUDA -->
          <div class="tech-badge" title="NVIDIA CUDA Compute Architecture">
            <div class="icon-wrap cuda-color">
              <svg viewBox="0 0 32 32" class="tech-svg" fill="none">
                <!-- Hexagon border -->
                <path d="M16 3l11.25 6.5v13L16 29 4.75 22.5v-13L16 3z" stroke="#76B900" stroke-width="2.2" fill="#76B900" fill-opacity="0.12"/>
                <!-- Inner circuit matrix -->
                <path d="M16 8v16M10 11.5l12 7M22 11.5l-12 7" stroke="#76B900" stroke-width="1.6" stroke-linecap="round"/>
                <circle cx="16" cy="16" r="3" fill="#76B900"/>
              </svg>
            </div>
            <div class="tech-info">
              <span class="tech-name">CUDA</span>
              <span class="tech-meta">GPU Acceleration</span>
            </div>
          </div>

          <!-- 3. AWS -->
          <div class="tech-badge" title="Amazon Web Services">
            <div class="icon-wrap aws-color">
              <svg viewBox="0 0 36 24" class="tech-svg" fill="none">
                <!-- AWS Text -->
                <path d="M8.8 12.8c-2 0-3.2-.9-3.2-2.3 0-1.6 1.3-2.3 3.5-2.5l2.6-.3v-.7c0-1-.6-1.5-1.9-1.5-1 0-2 .4-2.8.9l-.7-1.3c1-.7 2.4-1.2 3.9-1.2 2.4 0 3.7 1.2 3.7 3.3v5.9h-2v-1.2c-.8.8-1.9 1.3-3.1 1.3zm.5-1.5c1.2 0 2.1-.5 2.6-1.3v-1.2l-2.1.2c-1.3.2-2 .5-2 1.2 0 .8.7 1.1 1.5 1.1zm9.6 1.3l-2.5-8.2h2.4l1.7 6 1.6-6h2.3l1.6 6 1.7-6h2.3l-2.5 8.2h-2.3l-1.7-5.8-1.6 5.8h-2z" fill="currentColor"/>
                <!-- Smile Arrow -->
                <path d="M33 16c-4 3-10 4.6-15.2 4.6-7.2 0-13.7-2.7-18.6-7.4-.4-.3-.1-.8.4-.5 5.2 3 11.5 4.8 18 4.8 4.6 0 9.8-1.2 14.5-3.7.7-.4 1.3.4 1 1.1l-.1.1z" fill="#FF9900"/>
                <path d="M35 14.3c-.5-.6-3.5-.4-4.8-.1-.4.1-.5-.3-.2-.5 2.4-1.7 5.5-1.2 6-.7.4.5-.2 3.7-2.4 5.6-.4.3-.7.2-.5-.3.5-1.3 2.5-3.4 1.9-4z" fill="#FF9900"/>
              </svg>
            </div>
            <div class="tech-info">
              <span class="tech-name">AWS</span>
              <span class="tech-meta">EKS / Greengrass IoT</span>
            </div>
          </div>

          <!-- 4. GCP (Google Cloud) -->
          <div class="tech-badge" title="Google Cloud Platform">
            <div class="icon-wrap gcp-color">
              <svg viewBox="0 0 32 32" class="tech-svg" fill="none">
                <path d="M19.5 8a8.5 8.5 0 0 0-8.2 6.2 6.5 6.5 0 0 0-6.3 6.3c0 .3 0 .7.1 1L11 20l3.5-3.5L19.5 14l5-2.5L19.5 8z" fill="#EA4335"/>
                <path d="M27 21.5a5.5 5.5 0 0 0-4.9-5.4 8.5 8.5 0 0 0-2.6-4.6L14.5 17 21 21.5h6z" fill="#4285F4"/>
                <path d="M5.1 21.5A6.5 6.5 0 0 0 11.5 27h15a5.5 5.5 0 0 0 5.5-5.5h-5l-4.5 3-7.5-3H11.5z" fill="#34A853"/>
                <path d="M5 20.5c0-.4.1-.7.2-1.1L9 16l4 4-1.5 7A6.5 6.5 0 0 1 5 20.5z" fill="#FBBC05"/>
              </svg>
            </div>
            <div class="tech-info">
              <span class="tech-name">Google Cloud</span>
              <span class="tech-meta">GKE / Anthos / Vertex</span>
            </div>
          </div>

          <!-- 5. Azure -->
          <div class="tech-badge" title="Microsoft Azure">
            <div class="icon-wrap azure-color">
              <svg viewBox="0 0 32 32" class="tech-svg" fill="none">
                <path d="M19.5 4L7 24.5h6.5l3.2-5.5h6.1L19.5 4z" fill="#0078D4"/>
                <path d="M20.2 19L16.7 24.5H29L25.2 19h-5z" fill="#50E6FF"/>
                <path d="M19.5 4l-4.8 9.2 3.8 6.3h4.3L19.5 4z" fill="#00BCF2"/>
                <path d="M7 24.5l5.5-9.2 4.2 3.7-3.2 5.5H7z" fill="#005BA1"/>
              </svg>
            </div>
            <div class="tech-info">
              <span class="tech-name">Microsoft Azure</span>
              <span class="tech-meta">AKS / Azure IoT Edge</span>
            </div>
          </div>

          <!-- 6. Edge IoT -->
          <div class="tech-badge" title="Industrial Edge & IoT Mesh">
            <div class="icon-wrap edge-color">
              <svg viewBox="0 0 32 32" class="tech-svg" fill="none">
                <circle cx="16" cy="16" r="3.5" fill="#00C2FF"/>
                <circle cx="6" cy="10" r="2.5" stroke="#00C2FF" stroke-width="2"/>
                <circle cx="26" cy="10" r="2.5" stroke="#00C2FF" stroke-width="2"/>
                <circle cx="16" cy="27" r="2.5" stroke="#00C2FF" stroke-width="2"/>
                <line x1="8.5" y1="11.5" x2="13.5" y2="14.5" stroke="#00C2FF" stroke-width="1.8" stroke-dasharray="2 2"/>
                <line x1="23.5" y1="11.5" x2="18.5" y2="14.5" stroke="#00C2FF" stroke-width="1.8" stroke-dasharray="2 2"/>
                <line x1="16" y1="20" x2="16" y2="24" stroke="#00C2FF" stroke-width="1.8" stroke-dasharray="2 2"/>
                <circle cx="16" cy="16" r="8" stroke="#00C2FF" stroke-width="1" stroke-opacity="0.5"/>
              </svg>
            </div>
            <div class="tech-info">
              <span class="tech-name">Edge IoT</span>
              <span class="tech-meta">Embedded / MQTT Nodes</span>
            </div>
          </div>

          <!-- 7. Ubuntu -->
          <div class="tech-badge" title="Canonical Ubuntu Linux">
            <div class="icon-wrap ubuntu-color">
              <svg viewBox="0 0 32 32" class="tech-svg" fill="none">
                <circle cx="16" cy="16" r="14" fill="#E95420"/>
                <circle cx="16" cy="16" r="7.8" fill="none" stroke="#FFFFFF" stroke-width="2.6"/>
                <circle cx="7" cy="16" r="2" fill="#FFFFFF"/>
                <circle cx="20.5" cy="8.2" r="2" fill="#FFFFFF"/>
                <circle cx="20.5" cy="23.8" r="2" fill="#FFFFFF"/>
                <rect x="5.5" y="15" width="4.5" height="2" fill="#E95420"/>
                <rect x="17.8" y="7.8" width="4.5" height="2" fill="#E95420" transform="rotate(60 20 8.8)"/>
                <rect x="17.8" y="22.2" width="4.5" height="2" fill="#E95420" transform="rotate(-60 20 23.2)"/>
              </svg>
            </div>
            <div class="tech-info">
              <span class="tech-name">Ubuntu</span>
              <span class="tech-meta">Ubuntu Core / LTS</span>
            </div>
          </div>

          <!-- 8. RedHat -->
          <div class="tech-badge" title="Red Hat Enterprise Linux">
            <div class="icon-wrap redhat-color">
              <svg viewBox="0 0 32 32" class="tech-svg" fill="none">
                <path d="M28 17.5c-.8-.2-2.3-.5-4.2-.6-1.5-1.9-3.5-3.8-6.1-4.7 1.8-.7 3.5-.6 3.6-.6.5 0 .9-.3 1-.7.2-.6-.2-1.2-.7-1.4-1.2-.4-4.8-.9-8.4 1.2-1.9 1.1-3.4 2.8-4.4 4.8-1.5.2-2.8.5-3.5.8-.9.3-1.3.9-1.2 1.5.2.8 1.4 1.3 3.4 1.4.3.4.7.7 1.2 1.1 2.2 1.7 5.4 2.4 8.7 1.8 4.2-.7 7.7-3.4 9.8-5.3.6-.5.7-.9.8-1.2.1-.3 0-.6-.1-.7z" fill="#EE0000"/>
                <path d="M12.5 19.5c-.3.4-.6.8-.8 1.3 1.2.8 2.8 1.3 4.5 1.3 3.2 0 6.1-1.6 7.4-4-2.2 1.7-5.5 3-8.8 2.2-.8-.2-1.6-.5-2.3-.8z" fill="#1E1E1E"/>
              </svg>
            </div>
            <div class="tech-info">
              <span class="tech-name">Red Hat</span>
              <span class="tech-meta">RHEL / OpenShift</span>
            </div>
          </div>

          <!-- 9. Docker -->
          <div class="tech-badge" title="Docker Container Runtime">
            <div class="icon-wrap docker-color">
              <svg viewBox="0 0 32 32" class="tech-svg" fill="none">
                <rect x="7" y="11" width="3.2" height="2.8" rx="0.4" fill="#2496ED"/>
                <rect x="11.2" y="11" width="3.2" height="2.8" rx="0.4" fill="#2496ED"/>
                <rect x="15.4" y="11" width="3.2" height="2.8" rx="0.4" fill="#2496ED"/>
                <rect x="11.2" y="7.5" width="3.2" height="2.8" rx="0.4" fill="#2496ED"/>
                <rect x="15.4" y="7.5" width="3.2" height="2.8" rx="0.4" fill="#2496ED"/>
                <rect x="19.6" y="7.5" width="3.2" height="2.8" rx="0.4" fill="#2496ED"/>
                <rect x="15.4" y="4" width="3.2" height="2.8" rx="0.4" fill="#2496ED"/>
                <path d="M29 14.5c-.6-.4-1.8-.4-2.5-.2-.5-1.5-1.6-2.5-1.8-2.6l-.6.5c.2.2 1.2 1.2 1.3 2.6-.8.5-2.1.6-3.4.4H3v2.8c0 4.5 3.5 8.2 8.3 8.2 5.5 0 10.2-3.4 12.4-8.2 1.8.1 4.2-.6 4.8-2.8l-.8-.7z" fill="#2496ED"/>
                <circle cx="8" cy="18.5" r="0.7" fill="#FFFFFF"/>
              </svg>
            </div>
            <div class="tech-info">
              <span class="tech-name">Docker</span>
              <span class="tech-meta">Container Runtime</span>
            </div>
          </div>

          <!-- 10. Kubernetes -->
          <div class="tech-badge" title="Kubernetes Cluster Orchestration">
            <div class="icon-wrap k8s-color">
              <svg viewBox="0 0 32 32" class="tech-svg" fill="none">
                <path d="M16 3l10.8 5.2v11.6L16 29 5.2 19.8V8.2L16 3z" stroke="#326CE5" stroke-width="2" fill="#326CE5" fill-opacity="0.15"/>
                <circle cx="16" cy="16" r="3" fill="#326CE5"/>
                <path d="M16 7v6M16 19v6M7.8 12.1l5.2 2.5M19 17.4l5.2 2.5M24.2 12.1l-5.2 2.5M13 17.4l-5.2 2.5" stroke="#326CE5" stroke-width="1.8" stroke-linecap="round"/>
              </svg>
            </div>
            <div class="tech-info">
              <span class="tech-name">Kubernetes</span>
              <span class="tech-meta">K8s Orchestration</span>
            </div>
          </div>

          <!-- 11. GHCR (GitHub Container Registry) -->
          <div class="tech-badge" title="GitHub Container Registry (GHCR)">
            <div class="icon-wrap ghcr-color">
              <svg viewBox="0 0 32 32" class="tech-svg" fill="none">
                <path d="M16 4C9.37 4 4 9.37 4 16c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.16c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58C24.57 25.8 28 21.3 28 16c0-6.63-5.37-12-12-12z" fill="currentColor"/>
                <!-- Container package badge -->
                <path d="M21 17l4.5-2.2v4.4L21 21.5v-4.5z" fill="#00C2FF"/>
                <path d="M16.5 14.8l4.5-2.2 4.5 2.2-4.5 2.2-4.5-2.2z" fill="#38BDF8"/>
                <path d="M16.5 14.8v4.5l4.5 2.2v-4.4l-4.5-2.3z" fill="#0284C7"/>
              </svg>
            </div>
            <div class="tech-info">
              <span class="tech-name">GHCR</span>
              <span class="tech-meta">GitHub Registry</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .tech-ecosystem-section {
      width: 100%;
      position: relative;
      z-index: 2;
    }

    /* Ribbon Mode */
    .mode-ribbon {
      padding: 32px 0 40px;
      border-top: 1px solid var(--color-border);
      border-bottom: 1px solid var(--color-border);
      background: var(--color-surface-translucent);
      backdrop-filter: blur(16px);
    }

    .ribbon-bar-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
      flex-wrap: wrap;
      gap: 12px;
    }

    .ribbon-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: var(--font-mono);
      font-size: 0.74rem;
      font-weight: 700;
      color: var(--color-cyan);
      letter-spacing: 0.12em;
    }

    .live-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 8px #10b981;
    }

    .ribbon-caption {
      font-family: var(--font-sans);
      font-size: 0.8rem;
      color: var(--color-text-secondary);
      font-weight: 500;
    }

    /* Grid Mode */
    .mode-grid {
      padding: 80px 0;
    }

    .ecosystem-header {
      text-align: center;
      max-width: 720px;
      margin: 0 auto 48px;
    }

    /* Layouts */
    .logos-wrap.ribbon-layout {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
      gap: 14px;
      align-items: stretch;
    }

    .logos-wrap.grid-layout {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 20px;
    }

    /* Individual Tech Card Badge */
    .tech-badge {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 12px 16px;
      background: var(--color-card);
      border: 1px solid var(--color-border);
      border-radius: 10px;
      transition: all 0.25s cubic-bezier(0.2, 0, 0, 1);
      cursor: default;
      user-select: none;
    }

    .tech-badge:hover {
      transform: translateY(-2px);
      border-color: var(--color-cyan);
      box-shadow: 0 8px 24px rgba(0, 194, 255, 0.12);
      background: var(--color-surface-hover);
    }

    .icon-wrap {
      width: 38px;
      height: 38px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.04);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: transform 0.2s ease;
    }

    .tech-badge:hover .icon-wrap {
      transform: scale(1.08);
    }

    .tech-svg {
      width: 24px;
      height: 24px;
    }

    .tech-info {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .tech-name {
      font-family: var(--font-sans);
      font-size: 0.9rem;
      font-weight: 700;
      color: var(--color-text-heading);
      letter-spacing: -0.01em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .tech-meta {
      font-family: var(--font-mono);
      font-size: 0.68rem;
      color: var(--color-text-secondary);
      letter-spacing: 0.02em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-top: 2px;
    }

    /* Light Theme Protections */
    :host-context([data-theme="light"]) .tech-badge,
    :host-context(.light-theme) .tech-badge,
    [data-theme="light"] .tech-badge,
    .light-theme .tech-badge {
      background: #ffffff;
      border-color: #e2e8f0;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
    }

    :host-context([data-theme="light"]) .tech-badge:hover,
    :host-context(.light-theme) .tech-badge:hover,
    [data-theme="light"] .tech-badge:hover,
    .light-theme .tech-badge:hover {
      background: #f8fafc;
      border-color: #0284c7;
      box-shadow: 0 8px 24px rgba(2, 132, 199, 0.1);
    }

    :host-context([data-theme="light"]) .icon-wrap,
    :host-context(.light-theme) .icon-wrap,
    [data-theme="light"] .icon-wrap,
    .light-theme .icon-wrap {
      background: rgba(15, 23, 42, 0.04);
    }

    :host-context([data-theme="light"]) .tech-name,
    :host-context(.light-theme) .tech-name,
    [data-theme="light"] .tech-name,
    .light-theme .tech-name {
      color: #0f172a;
    }

    :host-context([data-theme="light"]) .tech-meta,
    :host-context(.light-theme) .tech-meta,
    [data-theme="light"] .tech-meta,
    .light-theme .tech-meta {
      color: #64748b;
    }

    @media (max-width: 768px) {
      .logos-wrap.ribbon-layout {
        grid-template-columns: repeat(2, 1fr);
      }
      .ribbon-bar-header {
        flex-direction: column;
        align-items: flex-start;
      }
    }

    @media (max-width: 480px) {
      .logos-wrap.ribbon-layout {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class TechLogosComponent {
  @Input() mode: 'ribbon' | 'grid' = 'ribbon';
}
