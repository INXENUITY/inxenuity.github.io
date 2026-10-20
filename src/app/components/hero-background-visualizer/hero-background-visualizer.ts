import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
  PLATFORM_ID,
  HostListener
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

interface BoundingBox {
  id: string;
  label: string;
  action: string;
  confidence: number;
  x: number;
  y: number;
  w: number;
  h: number;
  vx: number;
  vy: number;
  color: string;
  isAnomaly: boolean;
  history: { x: number; y: number }[];
}

interface AudioBand {
  freq: string;
  val: number;
  peak: number;
  targetVal: number;
  isFaultZone: boolean;
}

@Component({
  selector: 'app-hero-background-visualizer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="hero-bg-visualizer" #containerRef>
      <canvas #canvasRef class="visualizer-canvas"></canvas>
      
      <!-- Ambient Vignette & Mask so text stays 100% readable -->
      <div class="hero-gradient-overlay"></div>

      <!-- Real-Time HUD Status Overlay Pill in Top Right -->
      <div class="hud-floating-pills">
        <div class="hud-pill">
          <span class="live-pulse"></span>
          <span class="hud-label">CV &bull; ACOUSTIC &bull; TELEMETRY INFERENCE</span>
        </div>
        <div class="hud-chip">
          <span class="chip-val">LATENCY: 2.1ms</span>
          <span class="chip-sub">CUDA 12.2 // 60 FPS</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
      overflow: hidden;
    }

    .hero-bg-visualizer {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .visualizer-canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: block;
    }

    /* Radial and linear vignette masks to keep foreground hero content crisp */
    .hero-gradient-overlay {
      position: absolute;
      inset: 0;
      pointer-events: none;
      background: radial-gradient(
        circle at 50% 48%, 
        rgba(7, 9, 14, 0.72) 0%, 
        rgba(7, 9, 14, 0.45) 55%, 
        rgba(7, 9, 14, 0.85) 100%
      );
      mix-blend-mode: normal;
    }

    [data-theme="light"] .hero-gradient-overlay,
    html.light-theme .hero-gradient-overlay {
      background: radial-gradient(
        circle at 50% 48%, 
        rgba(248, 250, 252, 0.78) 0%, 
        rgba(248, 250, 252, 0.5) 55%, 
        rgba(248, 250, 252, 0.9) 100%
      );
    }

    .hud-floating-pills {
      position: absolute;
      top: 130px;
      right: 32px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 8px;
      pointer-events: none;
      z-index: 2;
      opacity: 0.85;
    }

    .hud-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(13, 18, 29, 0.75);
      border: 1px solid rgba(0, 194, 255, 0.3);
      padding: 5px 12px;
      border-radius: 20px;
      backdrop-filter: blur(8px);
    }

    .live-pulse {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #00c2ff;
      box-shadow: 0 0 8px #00c2ff;
      animation: pulse 1.5s infinite;
    }

    .hud-label {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      color: #38bdf8;
    }

    .hud-chip {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      background: rgba(13, 18, 29, 0.6);
      border: 1px solid var(--color-border);
      padding: 4px 10px;
      border-radius: 6px;
    }

    .chip-val {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      font-weight: 700;
      color: #10b981;
    }

    .chip-sub {
      font-family: var(--font-mono);
      font-size: 0.6rem;
      color: var(--color-text-secondary);
    }

    /* Light Theme HUD */
    [data-theme="light"] .hud-pill,
    html.light-theme .hud-pill {
      background: rgba(255, 255, 255, 0.85);
      border-color: rgba(2, 132, 199, 0.35);
    }

    [data-theme="light"] .hud-label,
    html.light-theme .hud-label {
      color: #0284c7;
    }

    [data-theme="light"] .hud-chip,
    html.light-theme .hud-chip {
      background: rgba(255, 255, 255, 0.8);
      border-color: #cbd5e1;
    }

    [data-theme="light"] .chip-val,
    html.light-theme .chip-val {
      color: #059669;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.85); }
    }

    @media (max-width: 768px) {
      .hud-floating-pills {
        display: none;
      }
    }
  `]
})
export class HeroBackgroundVisualizerComponent implements OnInit, OnDestroy {
  @ViewChild('canvasRef', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('containerRef', { static: true }) containerRef!: ElementRef<HTMLDivElement>;

  private readonly platformId = inject(PLATFORM_ID);
  readonly themeService = inject(ThemeService);

  private ctx: CanvasRenderingContext2D | null = null;
  private animFrameId: number | null = null;
  private isVisible = true;
  private observer: IntersectionObserver | null = null;

  private width = 0;
  private height = 0;
  private time = 0;

  // 1. OBJECT & ACTION DETECTION TARGETS
  private boxes: BoundingBox[] = [];

  // 2. AUDIO INFERENCE FREQUENCY BANDS
  private audioBands: AudioBand[] = [];
  private acousticFaultTimer = 0;
  private acousticFaultActive = false;

  // 3. SENSOR TELEMETRY OSCILLOSCOPE CHANNELS
  private sensorPointsCh1: number[] = [];
  private sensorPointsCh2: number[] = [];
  private sensorPointsCh3: number[] = [];
  private anomalyTriggerTimer = 0;
  private anomalySpikeActive = false;

  // Radar sweep angle
  private radarAngle = 0;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.initCanvas();
    this.initDataStructures();
    this.setupIntersectionObserver();
    this.startAnimation();
  }

  ngOnDestroy(): void {
    this.stopAnimation();
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.resizeCanvas();
  }

  private initCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d', { alpha: true });
    this.resizeCanvas();
  }

  private resizeCanvas(): void {
    const container = this.containerRef.nativeElement;
    const canvas = this.canvasRef.nativeElement;
    const rect = container.getBoundingClientRect();

    this.width = rect.width || window.innerWidth;
    this.height = rect.height || 680;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(this.width * dpr);
    canvas.height = Math.floor(this.height * dpr);

    if (this.ctx) {
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  }

  private initDataStructures(): void {
    const w = this.width || 1200;
    const h = this.height || 600;

    // Initialize 4 dynamic industrial bounding boxes with action detection
    this.boxes = [
      {
        id: 'OBJ-401',
        label: 'TURBINE ROTOR // AXIS-1',
        action: 'HIGH_RPM_ROTATION [NOMINAL]',
        confidence: 99.4,
        x: w * 0.15,
        y: h * 0.22,
        w: 180,
        h: 120,
        vx: 0.5,
        vy: 0.3,
        color: '#00C2FF',
        isAnomaly: false,
        history: []
      },
      {
        id: 'OBJ-208',
        label: 'ROBOT ARM JOINT // 6-DOF',
        action: 'TRAJECTORY_SYNC [OPTIMAL]',
        confidence: 98.7,
        x: w * 0.68,
        y: h * 0.18,
        w: 210,
        h: 140,
        vx: -0.4,
        vy: 0.35,
        color: '#00E5FF',
        isAnomaly: false,
        history: []
      },
      {
        id: 'OBJ-512',
        label: 'INSPECTION OPTIC // LINE-B',
        action: 'SURFACE_SCAN [0 DEFECTS]',
        confidence: 99.1,
        x: w * 0.12,
        y: h * 0.65,
        w: 190,
        h: 110,
        vx: 0.45,
        vy: -0.3,
        color: '#38BDF8',
        isAnomaly: false,
        history: []
      },
      {
        id: 'OBJ-109',
        label: 'BEARING HOUSING #4',
        action: 'ACOUSTIC_VIBRATION_MONITOR',
        confidence: 96.8,
        x: w * 0.72,
        y: h * 0.62,
        w: 195,
        h: 130,
        vx: -0.35,
        vy: -0.4,
        color: '#00C2FF',
        isAnomaly: false,
        history: []
      }
    ];

    // Audio Frequency Bands (from 20Hz up to 24kHz)
    const freqs = ['63Hz', '125Hz', '250Hz', '500Hz', '1kHz', '2kHz', '4kHz', '8.4kHz', '12kHz', '16kHz', '20kHz', '24kHz'];
    this.audioBands = freqs.map((f, i) => ({
      freq: f,
      val: 20 + Math.random() * 50,
      peak: 40 + Math.random() * 40,
      targetVal: 30 + Math.random() * 40,
      isFaultZone: f === '8.4kHz'
    }));

    // Multi-channel sensor points (60 data points each for 3 channels)
    const count = 70;
    this.sensorPointsCh1 = Array.from({ length: count }, (_, i) => Math.sin(i * 0.15) * 12);
    this.sensorPointsCh2 = Array.from({ length: count }, (_, i) => Math.cos(i * 0.2) * 10);
    this.sensorPointsCh3 = Array.from({ length: count }, (_, i) => Math.sin(i * 0.25) * 8);
  }

  private setupIntersectionObserver(): void {
    if (typeof IntersectionObserver === 'undefined') return;

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        this.isVisible = entry.isIntersecting;
        if (this.isVisible && !this.animFrameId) {
          this.startAnimation();
        }
      });
    }, { threshold: 0.05 });

    this.observer.observe(this.containerRef.nativeElement);
  }

  private startAnimation(): void {
    const loop = () => {
      if (!this.isVisible) {
        this.animFrameId = null;
        return;
      }

      this.render();
      this.time += 0.016;
      this.animFrameId = requestAnimationFrame(loop);
    };

    this.animFrameId = requestAnimationFrame(loop);
  }

  private stopAnimation(): void {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }

  private render(): void {
    if (!this.ctx || this.width === 0 || this.height === 0) return;
    const ctx = this.ctx;
    const isLight = this.themeService.isLight();

    // 1. Clear Canvas
    ctx.clearRect(0, 0, this.width, this.height);

    // Color definitions based on theme
    const gridColor = isLight ? 'rgba(2, 132, 199, 0.04)' : 'rgba(0, 194, 255, 0.04)';
    const dotColor = isLight ? 'rgba(15, 23, 42, 0.06)' : 'rgba(0, 194, 255, 0.12)';
    const primaryCyan = isLight ? '#0284c7' : '#00c2ff';
    const secondaryBlue = isLight ? '#0369a1' : '#38bdf8';
    const accentGreen = isLight ? '#059669' : '#10b981';
    const alertRed = isLight ? '#e11d48' : '#f43f5e';
    const textColor = isLight ? '#334155' : '#94a3b8';

    // 2. Render Blueprint Spatial Grid
    this.drawBlueprintGrid(ctx, gridColor, dotColor);

    // 3. Render Scanning Radar Sweep
    this.drawRadarSweep(ctx, primaryCyan);

    // 4. Render Object Detection & Action Detection Bounding Boxes
    this.drawObjectDetections(ctx, primaryCyan, secondaryBlue, accentGreen, alertRed, isLight);

    // 5. Render Industrial Audio Inference Spectrogram (System Fault Detection)
    this.drawAudioSpectrogram(ctx, primaryCyan, alertRed, textColor, isLight);

    // 6. Render Sensor Telemetry Oscilloscope (Anomaly Pattern Detection)
    this.drawSensorTelemetry(ctx, primaryCyan, secondaryBlue, alertRed, textColor, isLight);

    // 7. Render Floating Crosshairs & Corner Data
    this.drawHudReticles(ctx, primaryCyan, isLight);
  }

  // --- 1. SPATIAL BLUEPRINT GRID ---
  private drawBlueprintGrid(ctx: CanvasRenderingContext2D, gridColor: string, dotColor: string): void {
    const gridSize = 48;
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;

    // Horizontal & vertical grid lines
    ctx.beginPath();
    for (let x = 0; x <= this.width; x += gridSize) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.height);
    }
    for (let y = 0; y <= this.height; y += gridSize) {
      ctx.moveTo(0, y);
      ctx.lineTo(this.width, y);
    }
    ctx.stroke();

    // Intersection dots
    ctx.fillStyle = dotColor;
    for (let x = 0; x <= this.width; x += gridSize * 2) {
      for (let y = 0; y <= this.height; y += gridSize * 2) {
        ctx.beginPath();
        ctx.arc(x, y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  // --- 2. RADAR SWEEP LINE ---
  private drawRadarSweep(ctx: CanvasRenderingContext2D, color: string): void {
    this.radarAngle += 0.008;
    const cx = this.width * 0.5;
    const cy = this.height * 0.5;
    const maxR = Math.sqrt(cx * cx + cy * cy);

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, maxR, this.radarAngle - 0.25, this.radarAngle);
    ctx.lineTo(cx, cy);
    ctx.closePath();

    const sweepGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
    sweepGrad.addColorStop(0, 'rgba(0, 194, 255, 0.0)');
    sweepGrad.addColorStop(1, 'rgba(0, 194, 255, 0.035)');
    ctx.fillStyle = sweepGrad;
    ctx.fill();
    ctx.restore();
  }

  // --- 3. OBJECT DETECTION & ACTION DETECTION ---
  private drawObjectDetections(
    ctx: CanvasRenderingContext2D,
    cyan: string,
    blue: string,
    green: string,
    red: string,
    isLight: boolean
  ): void {
    // Periodically toggle anomaly on the bearing box
    this.anomalyTriggerTimer += 0.016;
    if (this.anomalyTriggerTimer > 6.0) {
      this.anomalyTriggerTimer = 0;
      this.anomalySpikeActive = !this.anomalySpikeActive;
      const b = this.boxes[3];
      if (b) {
        b.isAnomaly = this.anomalySpikeActive;
        b.action = this.anomalySpikeActive 
          ? 'ANOMALY DETECTED: EXCESSIVE VIBRATION > 3.2G' 
          : 'ACOUSTIC_VIBRATION_MONITOR [NOMINAL]';
      }
    }

    this.boxes.forEach((box, i) => {
      // Update position smoothly
      box.x += box.vx;
      box.y += box.vy;

      // Bound checking with soft padding
      const pad = 30;
      if (box.x < pad || box.x + box.w > this.width - pad) box.vx *= -1;
      if (box.y < 80 || box.y + box.h > this.height - 80) box.vy *= -1;

      // Track history tail
      if (Math.floor(this.time * 60) % 4 === 0) {
        box.history.push({ x: box.x + box.w / 2, y: box.y + box.h / 2 });
        if (box.history.length > 8) box.history.shift();
      }

      // Draw trajectory tail
      if (box.history.length > 1) {
        ctx.beginPath();
        ctx.strokeStyle = box.isAnomaly ? 'rgba(244, 63, 94, 0.25)' : 'rgba(0, 194, 255, 0.15)';
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 4]);
        ctx.moveTo(box.history[0].x, box.history[0].y);
        for (let j = 1; j < box.history.length; j++) {
          ctx.lineTo(box.history[j].x, box.history[j].y);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      }

      const activeColor = box.isAnomaly ? red : cyan;

      // Bounding box fill
      ctx.fillStyle = box.isAnomaly 
        ? (isLight ? 'rgba(225, 29, 72, 0.05)' : 'rgba(244, 63, 94, 0.06)')
        : (isLight ? 'rgba(2, 132, 199, 0.04)' : 'rgba(0, 194, 255, 0.04)');
      ctx.fillRect(box.x, box.y, box.w, box.h);

      // Bounding box dashed border
      ctx.strokeStyle = activeColor;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(box.x, box.y, box.w, box.h);
      ctx.setLineDash([]);

      // 4 Precision Corner Brackets
      const cLen = 14;
      ctx.lineWidth = 2;
      ctx.strokeStyle = activeColor;

      // Top-Left
      ctx.beginPath();
      ctx.moveTo(box.x, box.y + cLen);
      ctx.lineTo(box.x, box.y);
      ctx.lineTo(box.x + cLen, box.y);
      ctx.stroke();

      // Top-Right
      ctx.beginPath();
      ctx.moveTo(box.x + box.w - cLen, box.y);
      ctx.lineTo(box.x + box.w, box.y);
      ctx.lineTo(box.x + box.w, box.y + cLen);
      ctx.stroke();

      // Bottom-Left
      ctx.beginPath();
      ctx.moveTo(box.x, box.y + box.h - cLen);
      ctx.lineTo(box.x, box.y + box.h);
      ctx.lineTo(box.x + cLen, box.y + box.h);
      ctx.stroke();

      // Bottom-Right
      ctx.beginPath();
      ctx.moveTo(box.x + box.w - cLen, box.y + box.h);
      ctx.lineTo(box.x + box.w, box.y + box.h);
      ctx.lineTo(box.x + box.w, box.y + box.h - cLen);
      ctx.stroke();

      // Motion Velocity Vector
      const cx = box.x + box.w / 2;
      const cy = box.y + box.h / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + box.vx * 35, cy + box.vy * 35);
      ctx.strokeStyle = activeColor;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Optical Target Center Crosshair
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fillStyle = activeColor;
      ctx.fill();

      // Top Tag Badge: Object ID + Confidence
      const tagText = `${box.label} [${(box.confidence + Math.sin(this.time * 2 + i) * 0.4).toFixed(1)}%]`;
      ctx.font = '700 9px monospace';
      const tagWidth = ctx.measureText(tagText).width + 12;

      ctx.fillStyle = isLight ? '#ffffff' : '#0B1220';
      ctx.fillRect(box.x, box.y - 18, tagWidth, 18);
      ctx.strokeStyle = activeColor;
      ctx.lineWidth = 1;
      ctx.strokeRect(box.x, box.y - 18, tagWidth, 18);

      ctx.fillStyle = activeColor;
      ctx.fillText(tagText, box.x + 6, box.y - 6);

      // Bottom Tag Badge: Action Detection Classification
      const actionText = box.action;
      ctx.font = '600 8.5px monospace';
      const actionWidth = ctx.measureText(actionText).width + 12;

      ctx.fillStyle = box.isAnomaly 
        ? (isLight ? '#ffe4e6' : '#2A0B12')
        : (isLight ? '#f0f9ff' : '#071828');
      ctx.fillRect(box.x, box.y + box.h + 2, actionWidth, 16);
      ctx.strokeStyle = box.isAnomaly ? red : blue;
      ctx.lineWidth = 1;
      ctx.strokeRect(box.x, box.y + box.h + 2, actionWidth, 16);

      ctx.fillStyle = box.isAnomaly ? red : (isLight ? '#0369a1' : '#38bdf8');
      ctx.fillText(actionText, box.x + 6, box.y + box.h + 13);
    });
  }

  // --- 4. INDUSTRIAL AUDIO INFERENCE (SYSTEM FAULT DETECTION) ---
  private drawAudioSpectrogram(
    ctx: CanvasRenderingContext2D,
    cyan: string,
    red: string,
    textColor: string,
    isLight: boolean
  ): void {
    const startX = 36;
    const startY = this.height - 110;
    const barWidth = Math.min(18, (this.width * 0.28) / this.audioBands.length);
    const gap = 5;

    // Section title
    ctx.font = '700 8.5px monospace';
    ctx.fillStyle = cyan;
    ctx.fillText('ACOUSTIC SPECTRUM // INDUSTRIAL FAULT DETECTION (0–24 kHz)', startX, startY - 24);

    // Subtitle indicator
    this.acousticFaultTimer += 0.016;
    if (this.acousticFaultTimer > 5.0) {
      this.acousticFaultTimer = 0;
      this.acousticFaultActive = !this.acousticFaultActive;
    }

    const statusMsg = this.acousticFaultActive 
      ? 'FAULT DETECTED: BEARING WEAR RESONANCE @ 8.4 kHz'
      : 'HARMONIC DISTORTION: 0.02% [NOMINAL]';
    ctx.font = '600 8px monospace';
    ctx.fillStyle = this.acousticFaultActive ? red : textColor;
    ctx.fillText(statusMsg, startX, startY - 12);

    // Draw bars
    this.audioBands.forEach((band, idx) => {
      // Dynamic random pulse
      if (Math.random() < 0.2) {
        band.targetVal = 15 + Math.random() * 55;
        if (band.isFaultZone && this.acousticFaultActive) {
          band.targetVal = 65 + Math.random() * 20; // Peak in fault zone
        }
      }
      band.val += (band.targetVal - band.val) * 0.15;
      if (band.val > band.peak) band.peak = band.val;
      else band.peak = Math.max(band.peak - 0.4, band.val);

      const x = startX + idx * (barWidth + gap);
      const h = band.val;
      const y = startY + 60 - h;

      const isAlert = band.isFaultZone && this.acousticFaultActive;
      const barColor = isAlert ? red : cyan;

      // Gradient bar fill
      const grad = ctx.createLinearGradient(x, y + h, x, y);
      grad.addColorStop(0, isAlert ? 'rgba(244, 63, 94, 0.2)' : 'rgba(0, 194, 255, 0.2)');
      grad.addColorStop(1, isAlert ? red : barColor);

      ctx.fillStyle = grad;
      ctx.fillRect(x, y, barWidth, h);

      // Peak hold indicator line
      const peakY = startY + 60 - band.peak;
      ctx.strokeStyle = isAlert ? red : '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x, peakY);
      ctx.lineTo(x + barWidth, peakY);
      ctx.stroke();

      // Frequency label
      if (idx % 2 === 0 || isAlert) {
        ctx.font = '600 7px monospace';
        ctx.fillStyle = isAlert ? red : textColor;
        ctx.fillText(band.freq, x - 2, startY + 72);
      }
    });
  }

  // --- 5. SENSOR TELEMETRY OSCILLOSCOPE (ANOMALY PATTERN DETECTION) ---
  private drawSensorTelemetry(
    ctx: CanvasRenderingContext2D,
    cyan: string,
    blue: string,
    red: string,
    textColor: string,
    isLight: boolean
  ): void {
    const graphWidth = Math.min(340, this.width * 0.35);
    const startX = this.width - graphWidth - 36;
    const startY = this.height - 100;
    const graphHeight = 65;

    // Header label
    ctx.font = '700 8.5px monospace';
    ctx.fillStyle = cyan;
    ctx.fillText('MULTI-SENSOR TELEMETRY // REAL-TIME ANOMALY DETECTOR', startX, startY - 24);

    const alertStatus = this.anomalySpikeActive 
      ? 'CH-1 VIBRATION EXCEEDS 2.8σ [ANOMALY FLAGGED]'
      : 'CH-1: 1.2G | CH-2: 74.2°C | CH-3: 2150 PSI';
    ctx.font = '600 8px monospace';
    ctx.fillStyle = this.anomalySpikeActive ? red : textColor;
    ctx.fillText(alertStatus, startX, startY - 12);

    // Telemetry border background box
    ctx.fillStyle = isLight ? 'rgba(255, 255, 255, 0.4)' : 'rgba(11, 18, 32, 0.4)';
    ctx.fillRect(startX, startY, graphWidth, graphHeight);
    ctx.strokeStyle = isLight ? '#cbd5e1' : 'rgba(0, 194, 255, 0.2)';
    ctx.lineWidth = 1;
    ctx.strokeRect(startX, startY, graphWidth, graphHeight);

    // Anomaly safe threshold lines (dashed)
    const upperLimitY = startY + 12;
    const lowerLimitY = startY + graphHeight - 12;

    ctx.strokeStyle = this.anomalySpikeActive ? 'rgba(244, 63, 94, 0.5)' : 'rgba(0, 194, 255, 0.3)';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(startX, upperLimitY);
    ctx.lineTo(startX + graphWidth, upperLimitY);
    ctx.moveTo(startX, lowerLimitY);
    ctx.lineTo(startX + graphWidth, lowerLimitY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Update telemetry points
    const stepX = graphWidth / (this.sensorPointsCh1.length - 1);

    // Cycle points forward
    this.sensorPointsCh1.shift();
    const noiseCh1 = (Math.random() - 0.5) * 4;
    const baseCh1 = Math.sin(this.time * 6) * 14;
    // Anomaly spike injection when active
    const spike = (this.anomalySpikeActive && Math.random() < 0.35) ? (Math.random() > 0.5 ? 26 : -26) : 0;
    this.sensorPointsCh1.push(baseCh1 + noiseCh1 + spike);

    this.sensorPointsCh2.shift();
    this.sensorPointsCh2.push(Math.cos(this.time * 4) * 8 + (Math.random() - 0.5) * 3);

    this.sensorPointsCh3.shift();
    this.sensorPointsCh3.push(Math.sin(this.time * 3) * 6 + (Math.random() - 0.5) * 2);

    // Draw Channel 2 (Thermal) in Blue
    this.drawChannelLine(ctx, this.sensorPointsCh2, startX, startY + graphHeight / 2, stepX, blue, 1);

    // Draw Channel 3 (Pressure) in Cyan translucent
    this.drawChannelLine(ctx, this.sensorPointsCh3, startX, startY + graphHeight / 2, stepX, 'rgba(0, 194, 255, 0.5)', 1);

    // Draw Channel 1 (Vibration) - Primary Wave with Anomaly Warning
    const ch1Color = this.anomalySpikeActive ? red : (isLight ? '#0284c7' : '#00e5ff');
    this.drawChannelLine(ctx, this.sensorPointsCh1, startX, startY + graphHeight / 2, stepX, ch1Color, 1.8);

    // If anomaly, draw alert pulse beacon at latest point
    if (this.anomalySpikeActive) {
      const lastX = startX + graphWidth;
      const lastY = startY + graphHeight / 2 + this.sensorPointsCh1[this.sensorPointsCh1.length - 1];
      ctx.beginPath();
      ctx.arc(lastX - 4, lastY, 4, 0, Math.PI * 2);
      ctx.fillStyle = red;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(lastX - 4, lastY, 8 + Math.sin(this.time * 12) * 4, 0, Math.PI * 2);
      ctx.strokeStyle = red;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }
  }

  private drawChannelLine(
    ctx: CanvasRenderingContext2D,
    points: number[],
    startX: number,
    midY: number,
    stepX: number,
    strokeColor: string,
    lineWidth: number
  ): void {
    ctx.beginPath();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = lineWidth;

    for (let i = 0; i < points.length; i++) {
      const x = startX + i * stepX;
      const y = midY + points[i];
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  // --- 6. FLOATING HUD RETICLES & CROSSHAIRS ---
  private drawHudReticles(ctx: CanvasRenderingContext2D, cyan: string, isLight: boolean): void {
    const crossX = this.width * 0.5;
    const crossY = 160;

    ctx.strokeStyle = isLight ? 'rgba(2, 132, 199, 0.25)' : 'rgba(0, 194, 255, 0.25)';
    ctx.lineWidth = 1;

    // Small ambient center cross
    ctx.beginPath();
    ctx.moveTo(crossX - 10, crossY);
    ctx.lineTo(crossX + 10, crossY);
    ctx.moveTo(crossX, crossY - 10);
    ctx.lineTo(crossX, crossY + 10);
    ctx.stroke();

    ctx.font = '600 7px monospace';
    ctx.fillStyle = isLight ? '#64748b' : '#38bdf8';
    ctx.fillText('INX-CORE // SENSOR FUSION BUS', crossX + 14, crossY + 3);
  }
}
