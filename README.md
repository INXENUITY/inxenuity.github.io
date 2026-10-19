# InXenuity — Multimodal AI Architecture for Enterprise

Official website for **InXenuity** ([inxenuity.github.io](https://inxenuity.github.io)), built with modern Angular (standalone components, signals, and application builder).

## Built as per Designs

The website is constructed strictly in accordance with the technical design mockups in `/home/vinod/designs/`:
- **Platform (`/` and `/platform`)** — Multimodal AI Architecture hero, four pillars of the platform, unified architecture layer diagram, and deployment targets (Digital Twins, Robotics & Edge, Cloud & Containerised).
- **Solutions (`/solutions`)** — Enterprise deployment environments:
  - Real-Time Digital Twin Intelligence (with physical-to-digital sync schematic)
  - Perception for Autonomous Systems (8W TDP perception stack for robotics)
  - Scalable Multimodal AI at Cloud Scale (Kubernetes tree autoscaling)
  - Intelligence at the Network Edge (Offline-capable edge-to-cloud telemetry sync)
- **About (`/about`)** — Story from research lab to production floor, 4B+ inference metrics, company mission, core engineering principles, leadership profiles, and engineering philosophy.
- **Contact (`/contact`)** — Technical inquiry channels, response time SLA, and interactive Enterprise Inquiry form.
- **Technical Briefing Modal** — Universal interactive scheduling modal accessible across all pages.

## Tech Stack

- **Framework**: Angular 22 (Standalone Components, Signals, Application Builder)
- **Styling**: Cyber / Tactical HUD Design System with custom SVG technical wireframes and blueprint schematics
- **Typography**: Inter (UI) & JetBrains Mono (Technical code/metrics)
- **Deployment**: GitHub Pages compatible (`dist/inxenuity-site/browser/` with `404.html` and `CNAME`)

## Development

```bash
# Ensure Node.js LTS is loaded
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Run development server
npm start
# App will be available at http://localhost:4200/
```

## Production Build

```bash
npm run build
```

The production output will be generated in `dist/inxenuity-site/browser/`, complete with `CNAME` and `404.html` for GitHub Pages single-page routing.

## Testing

```bash
npm test -- --watch=false
```
