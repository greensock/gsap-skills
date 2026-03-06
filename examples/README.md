# GSAP skills — reference examples

Minimal demos that follow the skills exactly: transforms, autoAlpha, timelines, ScrollTrigger, and (in React) useGSAP with scope and cleanup.

## Vanilla (HTML + JS)

- **examples/vanilla/** — single HTML page + ES module.
- Uses GSAP from CDN (ESM). Open with a local server that supports ES modules (e.g. `npx serve examples/vanilla` from repo root).
- Patterns: `gsap.to()` with `x`/`autoAlpha`, `gsap.timeline()` with defaults and position parameter, ScrollTrigger on the timeline.

## React

- **examples/react/** — Vite + React + `@gsap/react`.
- From repo root: `cd examples/react && npm install && npm run dev`.
- Patterns: `useGSAP()` with `scope: containerRef`, refs for targets, no selectors without scope; cleanup is automatic on unmount.

These examples are intended as reference implementations for AI agents and for quick manual verification of the skill patterns.
