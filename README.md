# Antigravity: Parent Math Teaching Cockpit (PWA)

A scripted, step-by-step mathematical teaching field guide designed **specifically for parents and educators** teaching children aged 3–10 at home.

The parent holds the device while sitting beside the child. The app provides **word-for-word spoken scripts**, **physical prop instructions**, **real-time diagnostic interventions ("what to do when your child stumbles")**, and a **mastery progress tracker**.

Synthesizes the **Soviet Kiselev axiomatic foundation**, **Chinese spatial/mental array mastery**, and **Oxford algorithmic logic**. Full support for **English, Русский, and 中文**. Zero build steps, zero external dependencies, 100% offline-first.

## Run the App (Normal Dev Runner)

You have multiple easy ways to start the app. The runner automatically serves with correct MIME types and **opens your browser automatically** to `http://localhost:3000`:

### Option A: Standard npm command (Recommended)
```bash
npm start
# or:
npm run dev
```

### Option B: Double-click (Windows)
Double-click `start.bat` (or `serve.cmd`) in the folder. It will start the server and automatically open the app in your default browser.

### Option C: Direct Node.js command
```bash
node server.js
```

### Option D: Python runner (if Node is not available)
```bash
python server.py
```

> **Live Reload Enabled**: Editing any HTML, CSS, JS, or lesson JSON will automatically refresh connected browser tabs!
> **Note**: Do not open `index.html` directly via `file://` because modern browsers block ES modules, `fetch()`, and Service Workers under file URLs. Use any of the runners above.

## Structure

| Path | Purpose |
|---|---|
| `TEACHER_GUIDE.md` | Master pedagogical handbook for parents/teachers: 5-phase lesson architecture, grade-by-grade blueprints (Pre-K to Grade 4), tiered practice banks, and diagnostic interventions. |
| `data/curriculum_prek.json` | Pre-K stage database (Ages 3–4, **72 complete lessons across 36 weeks**: sensory sets, pairwise bijection, transitivity, Jordan loops, subitizing, probability). |
| `data/curriculum.json` | Kindergarten stage database (Ages 5–6, **72 complete lessons across 36 weeks**: axiomatic set theory, ten-frames, Kiselev curves, early CS algorithms). |
| `data/curriculum_elementary.json` | Elementary School Grades 1–4 database (**288 complete lessons — 72 lessons per grade across 36 weeks each**: balance algebra, array multiplication, systems of equations, Archimedean exhaustion). |
| `data/index.json` | Catalog registry loading all **432 scripted lessons** across 36-week academic syllabi and 4 Terms for all 6 grades. |
| `js/app.js` | Core UI engine: Sticky top Grade Bar, Academic Term filters, parent teleprompter player, diagnostic speaker cards, and timers. |
| `js/store.js` | Persistent localStorage state: child profiles with grade assignment, active grade selector, session logs, and streaks. |
| `js/i18n.js` | Trilingual localization dictionary (`en`, `ru`, `zh`) for all UI, grades, terms, and pedagogical labels. |
| `sw.js`, `manifest.webmanifest`, `icons/` | PWA offline caching shell and home-screen install metadata. |
| `tools/validate.js` | Automated schema and domain validator: `npm test` checks all 432 lessons across all 9 subjects and 3 languages (`en`, `ru`, `zh`). |

## Grades & Full School Year Architecture (36 Weeks · 2 Lessons/Week)

### Where to Choose the Grade
Parents can choose and switch grades at any time in three intuitive ways:
1. **Top Sticky Grade Bar**: A floating, glassmorphic pill carousel at the top of every view (`🧸 Pre-K 3–4`, `🎨 Kindergarten 5–6`, `🎒 Grade 1 6–7`, `🚀 Grade 2 7–8`, `💡 Grade 3 8–9`, `🏛️ Grade 4 9–10`). Tapping any grade immediately shifts the entire app to that grade's roadmap.
2. **Home Screen Grade Hub**: A prominent stage card showing the active grade's milestones, 36-week annual pacing, completion progress, and a `[🔄 Switch Grade]` button that reveals a comparative grid of all 6 grades.
3. **Child Profile Setup**: When adding or editing a child profile, parents select the child's grade stage, and the app automatically defaults to it.

### Academic Pacing: 2 Lessons Per Week Across 36 Weeks
Each academic school year is divided into **4 Terms (Quarters)**:
- **Term 1 (Weeks 1–9)**: *Foundations & Axiomatic Primitives* (Kiselev sets, point/line axioms, subitizing)
- **Term 2 (Weeks 10–18)**: *Mental Arithmetic & Spatial Geometry* (Chinese array models, decompositions, polygons)
- **Term 3 (Weeks 19–27)**: *Algorithmic Logic & Applied Problem Solving* (Oxford CS, decision trees, balance equations)
- **Term 4 (Weeks 28–36)**: *Mathematical Analysis & Olympiad Capstones* (limits, probability spaces, Dirichlet / Pigeonhole principle, comprehensive review)

Every week delivers two complementary lessons:
- **Lesson A (Mid-Week)**: `📘 Core Concept Discovery & Axiomatic Exposition` (Theory, spoken script, tactile props)
- **Lesson B (Weekend)**: `🧩 Mental Arithmetic & Socratic Logic Capstone` (Hands-on practice, deep-thinking puzzle, proof)

## Progressive Design System

- **Glassmorphism & High-Contrast Visuals**: Frosted glass surfaces (`backdrop-filter: blur(16px)`), modern typography (Inter/system stack), vibrant glowing accents, and elegant dark/light theme adaptation.
- **Parent Teleprompter Cockpit**: Large, readable typography designed for a parent sitting beside the child, featuring color-coded speaker cards:
  - `🗣️ READ ALOUD TO YOUR CHILD` (Word-for-word spoken dialogue)
  - `✋ YOUR ACTIONS (PROPS & HANDS)` (Tactile prop manipulation)
  - `⚠️ IF YOUR CHILD HESITATES OR STUMBLES` (Real-time diagnostic intervention)
  - `💬 SOCRATIC PROMPT` (Guiding questions instead of giving away answers)

## Progress tracker

- Multiple child profiles with avatars.
- Lesson player: guided steps (theory → practice → puzzle → finish), per-step countdown timer, practice checklist, hidden puzzle solution, screen stays awake.
- Each completed lesson records: date, minutes, how it felt (hard/okay/great), puzzle result (alone/hint/not yet), parent notes.
- Dashboard: overall ring, weekly goal (2 or 3), week streak (≥ 2 lessons per week), 8-week chart, progress by week / subject / methodology, badges, full history.
- Export / import progress as JSON (backup, or moving to another device).

## Deploy to Vercel

The application is pre-configured for one-click deployment to **Vercel** with complete PWA, Service Worker, and offline caching support.

### Option 1: Automatic Deployment via Git (Recommended)
1. Push this repository to GitHub, GitLab, or Bitbucket.
2. In your [Vercel Dashboard](https://vercel.com/new), click **"Add New... -> Project"** and import this repository.
3. Vercel will automatically detect `vercel.json` and `package.json`:
   - **Framework Preset**: `Other`
   - **Build Command**: `npm run build` (runs `node tools/validate.js` to verify all 432 lessons)
   - **Output Directory**: `.` (serves the root directory)
4. Click **Deploy**. Your PWA is live in seconds with global edge CDN caching!

### Option 2: Deploy via Vercel CLI
If you have the Vercel CLI installed:
```bash
# Preview deployment:
vercel

# Production deployment:
vercel --prod
```

### Vercel Production Configurations (`vercel.json`)
The included `vercel.json` applies production-grade headers and routing:
- **Zero-Stale Service Worker**: `sw.js` is served with `Cache-Control: public, max-age=0, must-revalidate` and `Service-Worker-Allowed: /`, guaranteeing that browser PWAs update immediately when new curriculum lessons are deployed.
- **PWA Manifest MIME Type**: `manifest.webmanifest` is served with `Content-Type: application/manifest+json; charset=utf-8` to ensure seamless mobile and desktop install banners.
- **Curriculum & Data Revalidation**: Lesson JSON files in `data/` are served with instant revalidation headers.
- **Security Headers**: Automatic protection via `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Permissions-Policy`.
- **SPA Fallback Routing**: Clean client-side routing fallback so deep links and refreshes never return 404s.

