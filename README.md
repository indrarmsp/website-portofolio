# ~/indrarmsp - Developer Portfolio

A modern, minimalist, and responsive monochrome personal portfolio website designed for **Indra Ramdani Saputra** (`indrarmsp`), Backend & Cloud Engineer.

Built using native web standards with zero compilation or build tooling required.

---

## Key Features

- **Dynamic GitHub REST API Integration:** Automatically retrieves and displays public repositories (excluding forks) with language badges, stars, and forks, along with live profile statistics.
- **Honest & Resilient Fallbacks:** In the event of GitHub API rate limits (60 req/hr unauthenticated) or offline access, honest status indicators (`—`) with informative tooltips are presented instead of misleading hardcoded statistics.
- **Dual Monochrome Theme:** Instant Dark & Light mode toggle with `localStorage` persistence, OS system theme sync (`prefers-color-scheme`), and inline script anti-FOUC prevention.
- **Native Scroll Reveal (IntersectionObserver):** Smooth scroll-triggered fade and rise transitions powered entirely by the browser's native `IntersectionObserver` API and CSS transitions—no external animation libraries, fully resilient against adblockers and Brave Shields, with complete `prefers-reduced-motion` support.
- **Cross-Platform & Browser Polished:** Responsive across mobile, tablet, and desktop viewports, with cross-browser custom scrollbars (WebKit + Firefox standard `scrollbar-width` and `scrollbar-color`).
- **Accessible & Semantic:** Semantic HTML5 markup, ARIA attributes, keyboard accessibility (`focus-visible`), and secure DOM manipulation (`textContent` & `createElement` to prevent XSS).

---

## Technology Stack

| Layer | Technologies |
|---|---|
| **Structure & Content** | Semantic HTML5, OpenGraph metadata |
| **Styling & Design System** | Tailwind CSS (CDN), Custom CSS Variables (Monochrome palette) |
| **Logic & Data Fetching** | Vanilla JavaScript (ES6+ Fetch API, DOM API) |
| **Animations & Transitions** | Native `IntersectionObserver` & CSS Transitions (Progressive Enhancement) |
| **Typography & Icons** | Inter, JetBrains Mono, Lucide Icons & Custom SVG |

---

## Project Structure

```text
website-portofolio/
├── assets/
│   ├── favicon.ico       # Legacy browser favicon
│   ├── favicon.png       # Modern raster & Apple touch icon
│   └── favicon.svg       # Vector terminal prompt ( >_ ) icon
├── index.html            # Main semantic markup, sections, and navigation layout
├── styles.css            # Custom CSS variables, scrollbars, micro-interactions & transitions
├── script.js             # GitHub REST API client, theme toggle, mobile menu & scroll animations
├── .gitignore            # Git ignore configuration
├── .nojekyll             # Prevents GitHub Pages from ignoring hidden files
└── README.md             # Project documentation
```

---

## Deployment (GitHub Pages)

This project is hosted on **GitHub Pages**:

1. Open repository on GitHub: [indrarmsp/website-portofolio](https://github.com/indrarmsp/website-portofolio).
2. Navigate to **Settings** > **Pages**.
3. Under **Build and deployment**:
   - **Source:** Select `Deploy from a branch`.
   - **Branch:** Select `main` and folder `/ (root)`.
   - Click **Save**.
4. Access the live portfolio at:
   ```text
   https://indrarmsp.github.io/website-portofolio/
   ```
