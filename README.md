# INXENUITY — Multimodal AI Architecture for Enterprise

Official website for **INXENUITY** ([inxenuity.com](https://inxenuity.com)), engineered with modern Angular (standalone components, signals, and application builder).

---

## Toolchain & Environment Versions

The project is built and verified with the following toolchain versions:

| Tool | Version | Notes |
| :--- | :--- | :--- |
| **NVM** | `0.39.7` | Node Version Manager |
| **Node.js** | `v22.23.3` | Node 22 LTS |
| **NPM** | `10.9.9` | Package Manager |
| **Angular CLI (`@angular/cli`)** | `22.2.3` | Angular Command Line Interface |
| **Angular Core (`@angular/core`)** | `22.2.3` | Standalone components & Signals |
| **TypeScript** | `6.0.3` | Type system |
| **Vitest** | `5.0.5` | Unit testing engine |
| **OS** | Linux x64 / macOS / Windows | Cross-platform |

---

## Repository Branch Architecture

The repository uses a dual-branch workflow:

- **`dev` branch**: Active development branch containing all Angular source code (`src/`), configurations (`angular.json`, `package.json`, `tsconfig.json`), tests, and documentation. All feature work, fixes, and commits are made here.
- **`main` branch**: GitHub Pages deployment branch. It contains exclusively the compiled static production build files (`index.html`, `404.html`, `CNAME`, `.nojekyll`, bundles, and assets) at the root level, served live by GitHub Pages at [https://inxenuity.com](https://inxenuity.com).

---

## Prerequisites & Initial Setup

Ensure `nvm` is loaded in your shell:

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

Install and use the matching Node.js version:

```bash
nvm install 22.23.3
nvm use 22.23.3
```

Verify your environment:

```bash
node -v   # Should output v22.23.3
npm -v    # Should output 10.9.9
```

Install project dependencies:

```bash
npm install
```

---

## Detailed Step-by-Step Instructions

### 1. Serve (Local Development)

Start the local Angular development server with live reload:

```bash
# Ensure NVM is active
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Launch dev server
npm start
# or: npx ng serve --host 0.0.0.0 --port 4200
```

Open your browser at:
`http://localhost:4200/`

---

### 2. Run Tests

Run unit test suites via Vitest:

```bash
# Single test run (CI / verification mode)
npm test -- --watch=false

# Interactive watch mode
npm test
```

---

### 3. Build (Production Bundle)

Compile the application for production:

```bash
# Ensure NVM is active
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Build production bundle
npm run build
```

This command:
1. Runs `ng build` with production optimizations (tree-shaking, minification, hashing).
2. Copies `public/` assets (`CNAME`, `.nojekyll`, `favicon.ico`, `assets/`) to the output folder.
3. Automatically duplicates `index.html` as `404.html` so that GitHub Pages correctly handles client-side Angular routing for deep links (e.g. `/platform`, `/solutions`, `/about`, `/contact`).

Output directory:
`dist/inxenuity-site/browser/`

---

### 4. Deploy to GitHub Pages (Deploy `dist` to `main`)

Follow these exact steps to commit source changes to `dev` and push production build files to `main`.

#### Step 4.1: Commit & Push Source Changes to `dev`

```bash
# 1. Switch to dev branch and check status
git checkout dev
git status

# 2. Stage and commit source changes
git add .
git commit -m "feat/fix: describe your changes"

# 3. Push source to dev branch
git push origin dev
```

#### Step 4.2: Build the Production Artifacts

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

npm run build
```

#### Step 4.3: Deploy Build Files to `main` via Git Worktree (Recommended)

Using a temporary Git worktree is the cleanest and fastest deployment method because it never dirties your working tree or requires branch switching:

```bash
# 1. Remove any stale temporary worktree if one exists
git worktree remove --force /tmp/inxenuity-deploy 2>/dev/null || true

# 2. Create a clean worktree checked out to the main branch
git worktree add /tmp/inxenuity-deploy main

# 3. Clean existing files from the main branch (preserves .git)
rm -rf /tmp/inxenuity-deploy/*

# 4. Copy the new build files into the worktree root
cp -r dist/inxenuity-site/browser/* /tmp/inxenuity-deploy/

# 5. Ensure 404.html, CNAME, and .nojekyll are present at root
cp dist/inxenuity-site/browser/index.html /tmp/inxenuity-deploy/404.html
echo "inxenuity.com" > /tmp/inxenuity-deploy/CNAME
touch /tmp/inxenuity-deploy/.nojekyll

# 6. Commit and push the build files to main
cd /tmp/inxenuity-deploy
git add -A
git commit -m "Deploy: Update site build for GitHub Pages"
git push origin main

# 7. Return to project directory and remove the temporary worktree
cd -
git worktree remove --force /tmp/inxenuity-deploy
```

Your changes will be live at [https://inxenuity.com](https://inxenuity.com) within 1–2 minutes via GitHub Pages.

---

## Configuration & Customization Notes

### Updating the Hero Video Link

The platform hero section features a borderless autoplay YouTube video player. To replace the video:

1. Open [`src/app/pages/platform/platform.ts`](file:///home/vinod/inxenuity.github.io/src/app/pages/platform/platform.ts).
2. Locate the `youtubeVideoUrl` property in `PlatformComponent`:
   ```typescript
   // Replace this URL with your actual YouTube video link when ready:
   youtubeVideoUrl = 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID';
   ```
3. The component automatically extracts the video ID and configures borderless autoplay (`autoplay=1&mute=1&loop=1`).
4. Re-run `npm run build` and deploy to `main`.

---

## License

Copyright © 2026 INXENUITY. All rights reserved.
