import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  signal,
  inject,
  PLATFORM_ID,
  HostListener
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

export type VisualizerMode = 'multimodal' | 'digital-twin' | 'robotics' | 'cloud-cluster' | 'edge-sync';

@Component({
  selector: 'app-video-visualizer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="video-container google-surface" [class.is-expanded]="isExpanded()">
      <!-- Top Video HUD Bar -->
      <div class="video-header">
        <div class="header-left">
          <span class="live-pill">
            <span class="pulse-indicator"></span>
            LIVE STREAM
          </span>
          <span class="stream-title">{{ title }}</span>
        </div>
        <div class="header-right">
          <span class="metric-chip">{{ resolution }}</span>
          <span class="metric-chip latency-chip">{{ latency() }}ms</span>
          <span class="metric-chip fps-chip">{{ currentFps() }} FPS</span>
        </div>
      </div>

      <!-- Canvas Video Stream Viewport -->
      <div class="canvas-viewport" #viewportRef>
        <canvas #canvasRef class="visualizer-canvas"></canvas>

        <!-- Watermark / Overlay Brand -->
        <div class="brand-watermark">
          <span class="watermark-logo">INXENUITY</span>
          <span class="watermark-sub">MULTIMODAL AI RUNTIME</span>
        </div>

        <!-- Mode Overlay Badge -->
        <div class="mode-badge">
          {{ getModeLabel() }}
        </div>

        <!-- Play/Pause Overlay indicator when paused -->
        <div *ngIf="!isPlaying()" class="paused-overlay" (click)="togglePlay()">
          <div class="play-circle">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          </div>
          <span>Stream Paused</span>
        </div>
      </div>

      <!-- Bottom Video Player Controls -->
      <div class="video-controls">
        <div class="controls-left">
          <button (click)="togglePlay()" class="btn-ctrl" [attr.aria-label]="isPlaying() ? 'Pause' : 'Play'">
            <svg *ngIf="isPlaying()" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16"/>
              <rect x="14" y="4" width="4" height="16"/>
            </svg>
            <svg *ngIf="!isPlaying()" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          </button>

          <span class="time-readout">{{ formattedTime() }}</span>
        </div>

        <!-- Video Scrubber Timeline -->
        <div class="scrubber-bar" (click)="onScrub($event)">
          <div class="scrubber-track">
            <div class="scrubber-progress" [style.width.%]="progress()"></div>
            <div class="scrubber-thumb" [style.left.%]="progress()"></div>
          </div>
        </div>

        <div class="controls-right">
          <!-- Active Mode Selector -->
          <div class="mode-switcher">
            <button 
              *ngFor="let m of availableModes" 
              (click)="setMode(m.id)"
              [class.active]="mode === m.id" 
              class="btn-mode-chip">
              {{ m.label }}
            </button>
          </div>

          <button (click)="toggleExpand()" class="btn-ctrl" [attr.aria-label]="isExpanded() ? 'Collapse' : 'Expand'">
            <svg *ngIf="!isExpanded()" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 3 21 3 21 9"/>
              <polyline points="9 21 3 21 3 15"/>
              <line x1="21" y1="3" x2="14" y2="10"/>
              <line x1="3" y1="21" x2="10" y2="14"/>
            </svg>
            <svg *ngIf="isExpanded()" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="4 14 10 14 10 20"/>
              <polyline points="20 10 14 10 14 4"/>
              <line x1="14" y1="10" x2="21" y2="3"/>
              <line x1="3" y1="21" x2="10" y2="14"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .video-container {
      position: relative;
      background: #090e18;
      border: 1px solid var(--color-border);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4), 0 0 24px rgba(0, 194, 255, 0.1);
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    :host-context([data-theme="light"]) .video-container {
      background: #ffffff;
      border-color: #e2e8f0;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.08), 0 0 20px rgba(2, 132, 199, 0.08);
    }

    .video-container.is-expanded {
      position: fixed;
      top: 24px;
      left: 24px;
      right: 24px;
      bottom: 24px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      border-radius: 12px;
    }

    .video-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 18px;
      background: rgba(10, 16, 28, 0.9);
      border-bottom: 1px solid var(--color-border);
      backdrop-filter: blur(8px);
      flex-wrap: wrap;
      gap: 10px;
    }

    :host-context([data-theme="light"]) .video-header {
      background: rgba(248, 250, 252, 0.95);
      border-color: #e2e8f0;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .live-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(239, 68, 68, 0.15);
      border: 1px solid rgba(239, 68, 68, 0.4);
      color: #f87171;
      font-family: var(--font-mono);
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      padding: 3px 8px;
      border-radius: 9999px;
    }

    .pulse-indicator {
      width: 6px;
      height: 6px;
      background-color: #ef4444;
      border-radius: 50%;
      animation: pulse-red 1.5s infinite;
    }

    @keyframes pulse-red {
      0% { transform: scale(0.9); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
      70% { transform: scale(1.1); box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); }
      100% { transform: scale(0.9); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
    }

    .stream-title {
      font-family: var(--font-mono);
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--color-text-heading);
      letter-spacing: 0.04em;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .metric-chip {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 600;
      padding: 3px 8px;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.05);
      color: var(--color-text-secondary);
      border: 1px solid var(--color-border);
    }

    :host-context([data-theme="light"]) .metric-chip {
      background: #ffffff;
      color: #475569;
      border-color: #cbd5e1;
    }

    .latency-chip {
      color: #34d399;
      border-color: rgba(52, 211, 153, 0.3);
    }

    .fps-chip {
      color: var(--color-cyan);
      border-color: rgba(0, 194, 255, 0.3);
    }

    .canvas-viewport {
      position: relative;
      width: 100%;
      height: 380px;
      background: #03060c;
      overflow: hidden;
      cursor: pointer;
    }

    .is-expanded .canvas-viewport {
      flex: 1;
      height: auto;
    }

    .visualizer-canvas {
      width: 100%;
      height: 100%;
      display: block;
    }

    .brand-watermark {
      position: absolute;
      top: 16px;
      left: 18px;
      pointer-events: none;
      display: flex;
      flex-direction: column;
      background: rgba(4, 7, 13, 0.65);
      backdrop-filter: blur(8px);
      padding: 6px 10px;
      border-radius: 4px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .watermark-logo {
      font-family: var(--font-mono);
      font-weight: 800;
      font-size: 0.8rem;
      color: #ffffff;
      letter-spacing: 0.14em;
    }

    .watermark-sub {
      font-family: var(--font-mono);
      font-size: 0.58rem;
      color: #38bdf8;
      letter-spacing: 0.1em;
    }

    .mode-badge {
      position: absolute;
      top: 16px;
      right: 18px;
      pointer-events: none;
      font-family: var(--font-mono);
      font-size: 0.68rem;
      font-weight: 700;
      color: #ffffff;
      background: rgba(0, 194, 255, 0.2);
      border: 1px solid rgba(0, 194, 255, 0.4);
      padding: 4px 10px;
      border-radius: 9999px;
      backdrop-filter: blur(8px);
    }

    .paused-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(4, 7, 12, 0.65);
      backdrop-filter: blur(4px);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      color: #ffffff;
      font-family: var(--font-mono);
      font-size: 0.85rem;
    }

    .play-circle {
      width: 54px;
      height: 54px;
      border-radius: 50%;
      background: rgba(0, 194, 255, 0.25);
      border: 2px solid var(--color-cyan);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      box-shadow: 0 0 20px rgba(0, 194, 255, 0.4);
      transition: transform 0.2s ease;
    }

    .paused-overlay:hover .play-circle {
      transform: scale(1.08);
    }

    .video-controls {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 10px 18px;
      background: rgba(10, 16, 28, 0.95);
      border-top: 1px solid var(--color-border);
      flex-wrap: wrap;
    }

    :host-context([data-theme="light"]) .video-controls {
      background: rgba(248, 250, 252, 0.95);
      border-color: #e2e8f0;
    }

    .controls-left, .controls-right {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .btn-ctrl {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 6px;
      background: transparent;
      border: 1px solid var(--color-border);
      color: var(--color-text-heading);
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-ctrl:hover {
      background: rgba(0, 194, 255, 0.1);
      border-color: var(--color-cyan);
      color: var(--color-cyan);
    }

    .time-readout {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--color-text-secondary);
      min-width: 60px;
    }

    .scrubber-bar {
      flex: 1;
      min-width: 120px;
      height: 24px;
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    .scrubber-track {
      position: relative;
      width: 100%;
      height: 5px;
      background: rgba(255, 255, 255, 0.15);
      border-radius: 9999px;
      overflow: visible;
    }

    :host-context([data-theme="light"]) .scrubber-track {
      background: #cbd5e1;
    }

    .scrubber-progress {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background: linear-gradient(90deg, #0080ff, #00c2ff);
      border-radius: 9999px;
    }

    .scrubber-thumb {
      position: absolute;
      top: 50%;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #ffffff;
      box-shadow: 0 0 8px rgba(0, 194, 255, 0.8);
      transform: translate(-50%, -50%);
      pointer-events: none;
    }

    .mode-switcher {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .btn-mode-chip {
      background: transparent;
      border: 1px solid var(--color-border);
      color: var(--color-text-secondary);
      font-family: var(--font-mono);
      font-size: 0.68rem;
      padding: 4px 8px;
      border-radius: 9999px;
      cursor: pointer;
      transition: all 0.15s ease;
      white-space: nowrap;
    }

    .btn-mode-chip:hover {
      color: var(--color-text-heading);
      border-color: var(--color-cyan);
    }

    .btn-mode-chip.active {
      background: rgba(0, 194, 255, 0.15);
      border-color: var(--color-cyan);
      color: var(--color-cyan);
      font-weight: 700;
    }

    @media (max-width: 768px) {
      .canvas-viewport {
        height: 260px;
      }
      .mode-switcher {
        display: none;
      }
      .metric-chip.fps-chip {
        display: none;
      }
    }
  `]
})
export class VideoVisualizerComponent implements OnInit, OnDestroy {
  @Input() mode: VisualizerMode = 'multimodal';
  @Input() title: string = 'MULTIMODAL SENSOR STREAM';
  @Input() resolution: string = '1080p60';

  @ViewChild('canvasRef', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('viewportRef', { static: true }) viewportRef!: ElementRef<HTMLDivElement>;

  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  isPlaying = signal(true);
  isExpanded = signal(false);
  progress = signal(35);
  latency = signal(4.2);
  currentFps = signal(60);
  formattedTime = signal('00:08:24');

  availableModes = [
    { id: 'multimodal' as VisualizerMode, label: 'Fusion' },
    { id: 'digital-twin' as VisualizerMode, label: 'Twin' },
    { id: 'robotics' as VisualizerMode, label: 'Robotics' },
    { id: 'cloud-cluster' as VisualizerMode, label: 'Cloud' }
  ];

  private animFrameId: number | null = null;
  private secondsElapsed = 504; // 8 mins 24s
  private frameCount = 0;
  private lastFpsCalc = Date.now();
  private isVisible = true;
  private observer: IntersectionObserver | null = null;

  // Visual simulation variables (clean, simpler industrial targets)
  private objects = [
    { x: 120, y: 70, w: 120, h: 75, dx: 0.45, dy: 0.22, label: 'ROBOTIC AGV', action: 'ACTION: TRACKING', conf: 0.992, isAnomaly: false },
    { x: 340, y: 95, w: 130, h: 80, dx: -0.38, dy: 0.25, label: 'MOTOR ROTOR', action: 'ACTION: 1800 RPM', conf: 0.987, isAnomaly: false }
  ];

  // Acoustic fault simulation state
  private acousticPeaks: number[] = Array.from({ length: 20 }, () => 15);
  private lastAnomalyToggle = 0;
  private isAcousticAnomaly = false;

  ngOnInit(): void {
    if (!this.isBrowser) return;

    this.setupResize();
    this.setupIntersectionObserver();
    this.startLoop();
  }

  ngOnDestroy(): void {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
    }
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.setupResize();
  }

  private setupResize(): void {
    if (!this.canvasRef || !this.viewportRef) return;
    const canvas = this.canvasRef.nativeElement;
    const viewport = this.viewportRef.nativeElement;
    const dpr = window.devicePixelRatio || 1;
    const rect = viewport.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
  }

  private setupIntersectionObserver(): void {
    if (!('IntersectionObserver' in window)) return;
    this.observer = new IntersectionObserver((entries) => {
      this.isVisible = entries[0]?.isIntersecting ?? true;
    }, { threshold: 0.1 });

    if (this.viewportRef?.nativeElement) {
      this.observer.observe(this.viewportRef.nativeElement);
    }
  }

  togglePlay(): void {
    this.isPlaying.update(v => !v);
  }

  toggleExpand(): void {
    this.isExpanded.update(v => !v);
    setTimeout(() => this.setupResize(), 50);
  }

  setMode(m: VisualizerMode): void {
    this.mode = m;
  }

  getModeLabel(): string {
    switch (this.mode) {
      case 'digital-twin': return 'DIGITAL TWIN // 3D TELEMETRY SYNC';
      case 'robotics': return 'ROBOTICS PERCEPTION // 8W TDP';
      case 'cloud-cluster': return 'CLOUD CLUSTER // 2400 FPS';
      case 'edge-sync': return 'EDGE-TO-CLOUD SYNC // SUB-10MS';
      default: return 'MULTIMODAL FUSION // VISION + AUDIO';
    }
  }

  onScrub(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
    this.progress.set(Math.round(pct));
  }

  private startLoop(): void {
    const render = () => {
      if (this.isPlaying() && this.isVisible) {
        this.updateData();
        this.drawScene();
      }
      this.animFrameId = requestAnimationFrame(render);
    };
    this.animFrameId = requestAnimationFrame(render);
  }

  private updateData(): void {
    this.frameCount++;
    const now = Date.now();
    if (now - this.lastFpsCalc >= 1000) {
      this.currentFps.set(this.frameCount);
      this.frameCount = 0;
      this.lastFpsCalc = now;
      this.secondsElapsed++;
      const mins = Math.floor(this.secondsElapsed / 60).toString().padStart(2, '0');
      const secs = (this.secondsElapsed % 60).toString().padStart(2, '0');
      this.formattedTime.set(`00:${mins}:${secs}`);
      this.progress.update(p => (p >= 100 ? 0 : p + 0.2));
      // subtle latency fluctuation
      this.latency.set(Number((3.8 + Math.random() * 0.8).toFixed(1)));
    }
  }

  private drawScene(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const dpr = window.devicePixelRatio || 1;

    // Clear background
    ctx.fillStyle = '#060a12';
    ctx.fillRect(0, 0, w, h);

    // Draw HUD background grid
    ctx.strokeStyle = 'rgba(0, 194, 255, 0.08)';
    ctx.lineWidth = 1 * dpr;
    const gridSize = 40 * dpr;
    for (let x = 0; x < w; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    const t = Date.now() * 0.002;

    switch (this.mode) {
      case 'digital-twin':
        this.drawDigitalTwin(ctx, w, h, dpr, t);
        break;
      case 'robotics':
        this.drawRoboticsPerception(ctx, w, h, dpr, t);
        break;
      case 'cloud-cluster':
        this.drawCloudCluster(ctx, w, h, dpr, t);
        break;
      case 'edge-sync':
        this.drawEdgeSync(ctx, w, h, dpr, t);
        break;
      default:
        this.drawMultimodalFusion(ctx, w, h, dpr, t);
        break;
    }
  }

  private drawMultimodalFusion(ctx: CanvasRenderingContext2D, w: number, h: number, dpr: number, t: number): void {
    // 1. Subtle Radar LiDAR radial sweep
    const cx = w * 0.5;
    const cy = h * 0.42;
    const radius = Math.min(w, h) * 0.32;

    ctx.save();
    ctx.strokeStyle = 'rgba(0, 194, 255, 0.18)';
    ctx.lineWidth = 1 * dpr;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 0.6, 0, Math.PI * 2);
    ctx.stroke();

    // Subtle Sweep Line
    const sweepAngle = (t * 1.2) % (Math.PI * 2);
    const grad = ctx.createLinearGradient(cx, cy, cx + Math.cos(sweepAngle) * radius, cy + Math.sin(sweepAngle) * radius);
    grad.addColorStop(0, 'rgba(0, 194, 255, 0.5)');
    grad.addColorStop(1, 'rgba(0, 194, 255, 0)');
    ctx.strokeStyle = grad;
    ctx.lineWidth = 1.5 * dpr;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(sweepAngle) * radius, cy + Math.sin(sweepAngle) * radius);
    ctx.stroke();
    ctx.restore();

    // 2. Simplified, Clean Object & Action Detection Bounding Boxes
    this.objects.forEach((obj, idx) => {
      obj.x += obj.dx * dpr;
      obj.y += obj.dy * dpr;
      if (obj.x < 24 * dpr || obj.x + obj.w * dpr > w - 24 * dpr) obj.dx *= -1;
      if (obj.y < 35 * dpr || obj.y + obj.h * dpr > h * 0.65) obj.dy *= -1;

      const ox = obj.x;
      const oy = obj.y;
      const ow = obj.w * dpr;
      const oh = obj.h * dpr;

      // Clean translucent box fill
      ctx.fillStyle = idx === 0 ? 'rgba(0, 194, 255, 0.05)' : 'rgba(56, 189, 248, 0.05)';
      ctx.fillRect(ox, oy, ow, oh);

      // Clean thin border
      ctx.strokeStyle = idx === 0 ? '#00c2ff' : '#38bdf8';
      ctx.lineWidth = 1.2 * dpr;
      ctx.strokeRect(ox, oy, ow, oh);

      // 4 Subtle corner brackets
      const bSize = 6 * dpr;
      ctx.strokeStyle = '#00e5ff';
      ctx.lineWidth = 2 * dpr;

      ctx.beginPath();
      ctx.moveTo(ox, oy + bSize); ctx.lineTo(ox, oy); ctx.lineTo(ox + bSize, oy);
      ctx.moveTo(ox + ow - bSize, oy); ctx.lineTo(ox + ow, oy); ctx.lineTo(ox + ow, oy + bSize);
      ctx.moveTo(ox, oy + oh - bSize); ctx.lineTo(ox, oy + oh); ctx.lineTo(ox + bSize, oy + oh);
      ctx.moveTo(ox + ow - bSize, oy + oh); ctx.lineTo(ox + ow, oy + oh); ctx.lineTo(ox + ow, oy + oh - bSize);
      ctx.stroke();

      // Optical center cross
      const midX = ox + ow / 2;
      const midY = oy + oh / 2;
      ctx.fillStyle = '#00e5ff';
      ctx.beginPath();
      ctx.arc(midX, midY, 2 * dpr, 0, Math.PI * 2);
      ctx.fill();

      // Clean single-line header tag badge
      ctx.fillStyle = 'rgba(7, 13, 24, 0.9)';
      const tagText = `${obj.label} [${(obj.conf * 100).toFixed(1)}%]`;
      ctx.font = `600 ${7.5 * dpr}px monospace`;
      const textW = ctx.measureText(tagText).width;
      ctx.fillRect(ox, oy - 14 * dpr, textW + 8 * dpr, 14 * dpr);
      ctx.strokeStyle = idx === 0 ? '#00c2ff' : '#38bdf8';
      ctx.lineWidth = 1 * dpr;
      ctx.strokeRect(ox, oy - 14 * dpr, textW + 8 * dpr, 14 * dpr);

      ctx.fillStyle = '#ffffff';
      ctx.fillText(tagText, ox + 4 * dpr, oy - 4 * dpr);

      // Minimal action detection chip below box
      ctx.fillStyle = 'rgba(0, 194, 255, 0.12)';
      const actText = obj.action;
      ctx.font = `600 ${6.5 * dpr}px monospace`;
      const actW = ctx.measureText(actText).width;
      ctx.fillRect(ox, oy + oh + 2 * dpr, actW + 6 * dpr, 12 * dpr);
      ctx.fillStyle = '#38bdf8';
      ctx.fillText(actText, ox + 3 * dpr, oy + oh + 11 * dpr);
    });

    // 3. Elevated, Clean Acoustic Frequency & Fault Detection Spectrogram (Bottom Left)
    const acousticX = 24 * dpr;
    const acousticY = h - 18 * dpr;
    const barCount = 18;
    const barWidth = 7 * dpr;
    const barGap = 4 * dpr;

    // Check simulated anomaly trigger
    const now = Date.now();
    if (now - this.lastAnomalyToggle > 5000) {
      this.lastAnomalyToggle = now;
      this.isAcousticAnomaly = !this.isAcousticAnomaly;
    }

    // Acoustic section label
    ctx.font = `700 ${7 * dpr}px monospace`;
    ctx.fillStyle = '#00c2ff';
    ctx.fillText('ACOUSTIC SPECTRUM // 0–24 kHz', acousticX, acousticY - 42 * dpr);

    ctx.font = `600 ${6.5 * dpr}px monospace`;
    if (this.isAcousticAnomaly) {
      ctx.fillStyle = '#f43f5e';
      ctx.fillText('FAULT DETECTED: BEARING WEAR RESONANCE @ 8.4 kHz', acousticX, acousticY - 32 * dpr);
    } else {
      ctx.fillStyle = '#10b981';
      ctx.fillText('FAULT DETECTION: NOMINAL // HARMONIC DISTORTION 0.02%', acousticX, acousticY - 32 * dpr);
    }

    // Render smooth rounded equalizer bars with floating peak caps
    for (let i = 0; i < barCount; i++) {
      const bx = acousticX + i * (barWidth + barGap);
      const isFaultBand = (i === 11) && this.isAcousticAnomaly; // 8.4 kHz band

      // Smooth harmonic calculation
      const wave = Math.sin(t * 2.8 + i * 0.4) * 0.35 + Math.sin(t * 1.5 + i * 0.8) * 0.25 + 0.4;
      let bh = Math.max(4 * dpr, wave * (24 * dpr));
      if (isFaultBand) {
        bh = Math.max(bh, 26 * dpr); // Peak spike on fault
      }

      // Smooth peak decay
      if (bh > (this.acousticPeaks[i] || 0)) {
        this.acousticPeaks[i] = bh;
      } else {
        this.acousticPeaks[i] = Math.max(bh, (this.acousticPeaks[i] || 0) - 0.3 * dpr);
      }

      // Gradient fill
      const barGrad = ctx.createLinearGradient(bx, acousticY, bx, acousticY - bh);
      if (isFaultBand) {
        barGrad.addColorStop(0, 'rgba(244, 63, 94, 0.3)');
        barGrad.addColorStop(1, '#f43f5e');
      } else {
        barGrad.addColorStop(0, 'rgba(0, 102, 204, 0.4)');
        barGrad.addColorStop(1, '#00c2ff');
      }

      ctx.fillStyle = barGrad;
      // Rounded bar
      const by = acousticY - bh;
      ctx.beginPath();
      ctx.roundRect ? ctx.roundRect(bx, by, barWidth, bh, [2 * dpr, 2 * dpr, 0, 0]) : ctx.rect(bx, by, barWidth, bh);
      ctx.fill();

      // Floating peak cap dot
      const peakY = acousticY - (this.acousticPeaks[i] || bh) - 2 * dpr;
      ctx.fillStyle = isFaultBand ? '#f43f5e' : '#ffffff';
      ctx.beginPath();
      ctx.arc(bx + barWidth / 2, peakY, 1.2 * dpr, 0, Math.PI * 2);
      ctx.fill();
    }

    // 4. Clean Sensor Telemetry Oscilloscope (Anomaly Pattern Detection) (Bottom Right)
    const telemW = Math.min(180 * dpr, w * 0.35);
    const telemX = w - telemW - 24 * dpr;
    const telemY = h - 42 * dpr;
    const telemH = 34 * dpr;

    ctx.font = `700 ${7 * dpr}px monospace`;
    ctx.fillStyle = '#00c2ff';
    ctx.fillText('SENSOR TELEMETRY // ANOMALY DETECTOR', telemX, telemY - 8 * dpr);

    // Oscilloscope background
    ctx.fillStyle = 'rgba(10, 16, 28, 0.6)';
    ctx.fillRect(telemX, telemY, telemW, telemH);
    ctx.strokeStyle = 'rgba(0, 194, 255, 0.2)';
    ctx.lineWidth = 1 * dpr;
    ctx.strokeRect(telemX, telemY, telemW, telemH);

    // Safe threshold dashed bounds
    ctx.strokeStyle = 'rgba(0, 194, 255, 0.25)';
    ctx.lineWidth = 0.8 * dpr;
    ctx.setLineDash([2 * dpr, 3 * dpr]);
    ctx.beginPath();
    ctx.moveTo(telemX, telemY + 6 * dpr); ctx.lineTo(telemX + telemW, telemY + 6 * dpr);
    ctx.moveTo(telemX, telemY + telemH - 6 * dpr); ctx.lineTo(telemX + telemW, telemY + telemH - 6 * dpr);
    ctx.stroke();
    ctx.setLineDash([]);

    // Live continuous sine-telemetry wave
    ctx.strokeStyle = this.isAcousticAnomaly ? '#f43f5e' : '#00e5ff';
    ctx.lineWidth = 1.2 * dpr;
    ctx.beginPath();
    const points = 32;
    const pStep = telemW / points;
    const midY = telemY + telemH / 2;

    for (let p = 0; p <= points; p++) {
      const px = telemX + p * pStep;
      const spike = (this.isAcousticAnomaly && p > 24) ? Math.sin((t * 8) + p) * 11 * dpr : 0;
      const py = midY + Math.sin(t * 4 + p * 0.4) * (8 * dpr) + spike;
      if (p === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Telemetry label
    ctx.font = `600 ${6.5 * dpr}px monospace`;
    ctx.fillStyle = this.isAcousticAnomaly ? '#f43f5e' : '#94a3b8';
    ctx.fillText(
      this.isAcousticAnomaly ? 'CH-1 VIBRATION EXCEEDS 2.5σ [SPIKE FLAGGED]' : 'CH-1 IMU: 0.82G [NOMINAL] &bull; 74.2°C',
      telemX,
      telemY + telemH + 11 * dpr
    );
  }

  private drawDigitalTwin(ctx: CanvasRenderingContext2D, w: number, h: number, dpr: number, t: number): void {
    const cx = w * 0.5;
    const cy = h * 0.45;
    const size = Math.min(w, h) * 0.28;

    // Isometric 3D wireframe cube rotating
    ctx.save();
    ctx.translate(cx, cy);

    const cosA = Math.cos(t * 0.8);
    const sinA = Math.sin(t * 0.8);

    const nodes = [
      { x: -size * cosA, y: -size * 0.5 },
      { x: size * cosA, y: -size * 0.5 },
      { x: size * cosA, y: size * 0.5 },
      { x: -size * cosA, y: size * 0.5 },
      { x: -size * 0.6 * sinA, y: -size * 0.9 },
      { x: size * 0.6 * sinA, y: -size * 0.9 },
      { x: size * 0.6 * sinA, y: size * 0.1 },
      { x: -size * 0.6 * sinA, y: size * 0.1 }
    ];

    ctx.strokeStyle = '#00c2ff';
    ctx.lineWidth = 1.5 * dpr;

    // Draw cube faces
    ctx.beginPath();
    ctx.moveTo(nodes[0].x, nodes[0].y);
    ctx.lineTo(nodes[1].x, nodes[1].y);
    ctx.lineTo(nodes[2].x, nodes[2].y);
    ctx.lineTo(nodes[3].x, nodes[3].y);
    ctx.closePath();
    ctx.stroke();

    ctx.strokeStyle = 'rgba(0, 144, 255, 0.7)';
    ctx.beginPath();
    ctx.moveTo(nodes[4].x, nodes[4].y);
    ctx.lineTo(nodes[5].x, nodes[5].y);
    ctx.lineTo(nodes[6].x, nodes[6].y);
    ctx.lineTo(nodes[7].x, nodes[7].y);
    ctx.closePath();
    ctx.stroke();

    // Connect edges
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(nodes[i].x, nodes[i].y);
      ctx.lineTo(nodes[i + 4].x, nodes[i + 4].y);
      ctx.stroke();
    }

    // Telemetry sensor pulses
    nodes.forEach((n, idx) => {
      const pulse = (Math.sin(t * 4 + idx) * 0.5 + 0.5) * 6 * dpr + 3 * dpr;
      ctx.fillStyle = idx % 2 === 0 ? '#00e5ff' : '#10b981';
      ctx.beginPath();
      ctx.arc(n.x, n.y, pulse, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.restore();

    // Data readouts
    ctx.fillStyle = '#ffffff';
    ctx.font = `${8 * dpr}px monospace`;
    ctx.fillText('PHYSICAL SENSORS: 256 ONLINE · REPLICATION LATENCY: 0.12s', 20 * dpr, h - 24 * dpr);
    ctx.fillStyle = '#34d399';
    ctx.fillText('SYNCHRONIZATION SLA: 99.999% · DIGITAL TWIN REPLICA VERIFIED', 20 * dpr, h - 10 * dpr);
  }

  private drawRoboticsPerception(ctx: CanvasRenderingContext2D, w: number, h: number, dpr: number, t: number): void {
    // Crosshair target
    const cx = w * 0.5;
    const cy = h * 0.45;

    ctx.strokeStyle = 'rgba(0, 194, 255, 0.6)';
    ctx.lineWidth = 1 * dpr;
    ctx.beginPath();
    ctx.arc(cx, cy, 30 * dpr, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx - 45 * dpr, cy); ctx.lineTo(cx + 45 * dpr, cy);
    ctx.moveTo(cx, cy - 45 * dpr); ctx.lineTo(cx, cy + 45 * dpr);
    ctx.stroke();

    // Trajectory arrows
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2 * dpr;
    ctx.setLineDash([6 * dpr, 4 * dpr]);
    ctx.beginPath();
    ctx.moveTo(cx, h * 0.85);
    ctx.quadraticCurveTo(cx + Math.sin(t * 2) * 80 * dpr, cy + 60 * dpr, cx + Math.sin(t) * 30 * dpr, cy);
    ctx.stroke();
    ctx.setLineDash([]);

    // Robot power monitor
    ctx.fillStyle = 'rgba(10, 16, 28, 0.85)';
    ctx.fillRect(20 * dpr, h - 50 * dpr, 200 * dpr, 36 * dpr);
    ctx.strokeStyle = 'rgba(0, 194, 255, 0.3)';
    ctx.strokeRect(20 * dpr, h - 50 * dpr, 200 * dpr, 36 * dpr);

    ctx.fillStyle = '#ffffff';
    ctx.font = `${8 * dpr}px monospace`;
    ctx.fillText('JETSON ORIN NX 16GB // 8W TDP', 28 * dpr, h - 35 * dpr);

    // Power bar
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(28 * dpr, h - 26 * dpr, 180 * dpr, 6 * dpr);
    ctx.fillStyle = '#34d399';
    ctx.fillRect(28 * dpr, h - 26 * dpr, 130 * dpr, 6 * dpr);
  }

  private drawCloudCluster(ctx: CanvasRenderingContext2D, w: number, h: number, dpr: number, t: number): void {
    // 4-camera grid
    const cols = 4;
    const rows = 2;
    const pad = 12 * dpr;
    const cellW = (w - (cols + 1) * pad) / cols;
    const cellH = (h * 0.7 - (rows + 1) * pad) / rows;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = pad + c * (cellW + pad);
        const y = pad + r * (cellH + pad);

        ctx.fillStyle = 'rgba(11, 18, 30, 0.85)';
        ctx.fillRect(x, y, cellW, cellH);
        ctx.strokeStyle = 'rgba(0, 194, 255, 0.25)';
        ctx.lineWidth = 1 * dpr;
        ctx.strokeRect(x, y, cellW, cellH);

        // simulated motion dots
        const dotX = x + cellW * 0.5 + Math.sin(t * 3 + c + r) * (cellW * 0.3);
        const dotY = y + cellH * 0.5 + Math.cos(t * 2 + c * 2) * (cellH * 0.25);
        ctx.fillStyle = '#00c2ff';
        ctx.beginPath();
        ctx.arc(dotX, dotY, 3 * dpr, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#64748b';
        ctx.font = `${6 * dpr}px monospace`;
        ctx.fillText(`STREAM ${r * cols + c + 1} · 60 FPS`, x + 6 * dpr, y + 12 * dpr);
      }
    }

    // Cluster load bar
    ctx.fillStyle = '#ffffff';
    ctx.font = `${8 * dpr}px monospace`;
    ctx.fillText('KUBERNETES AUTOSCALER: 12 NODES ACTIVE · 2,400 FPS INGESTION', 20 * dpr, h - 20 * dpr);
    ctx.fillStyle = 'rgba(0, 194, 255, 0.2)';
    ctx.fillRect(20 * dpr, h - 12 * dpr, w - 40 * dpr, 4 * dpr);
    ctx.fillStyle = '#00c2ff';
    ctx.fillRect(20 * dpr, h - 12 * dpr, (w - 40 * dpr) * 0.65, 4 * dpr);
  }

  private drawEdgeSync(ctx: CanvasRenderingContext2D, w: number, h: number, dpr: number, t: number): void {
    // Flowing packet rings
    const cx = w * 0.5;
    const cy = h * 0.45;

    ctx.strokeStyle = 'rgba(0, 194, 255, 0.4)';
    ctx.lineWidth = 1.5 * dpr;
    for (let r = 1; r <= 4; r++) {
      const radius = r * 35 * dpr + (t * 20 * dpr) % (35 * dpr);
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.fillStyle = '#ffffff';
    ctx.font = `${8 * dpr}px monospace`;
    ctx.fillText('EDGE OFFLINE BUFFER: 0% DROPPED · 5G SATELLITE UPLINK: 420 Mbps', 20 * dpr, h - 15 * dpr);
  }
}
