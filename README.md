# gsap-skills

Official AI skills for GSAP. These skills teach AI coding agents how to correctly use the GSAP (GreenSock Animation Platform), including best practices, common animation patterns, and plugin usage.

Skills follow the [Agent Skills](https://agentskills.io) format and work with the [skills](https://github.com/vercel-labs/skills) CLI (Cursor, Claude Code, Codex, Windsurf, GitHub Copilot, and others).

## Installing

These skills work with any agent that supports the Agent Skills standard, including Claude Code, Cursor, and others.

### Claude Code

Install using the [plugin marketplace](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/plugins#add-from-marketplace):

```
/plugin marketplace add greensock/gsap-skills
```

### Cursor

Install from the Cursor Marketplace or add manually via **Settings > Rules > Add Rule > Remote Rule (Github)** with `greensock/gsap-skills`.

### npx skills

Install using the [`npx skills`](https://skills.sh) CLI:

```
npx skills add https://github.com/greensock/gsap-skills
```

### Clone / Copy

Clone this repo and copy the skill folders into the appropriate directory for your agent:

| Agent | Skill Directory | Docs |
|-------|-----------------|------|
| Claude Code | `~/.claude/skills/` | [docs](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/skills) |
| Cursor | `~/.cursor/skills/` | [docs](https://docs.cursor.com/context/rules) |
| OpenCode | `~/.config/opencode/skills/` | [docs](https://opencode.ai/docs/skills/) |
| OpenAI Codex | `~/.codex/skills/` | [docs](https://developers.openai.com/codex/skills/) |
| Pi | `~/.pi/agent/skills/` | [docs](https://github.com/badlogic/pi-mono/tree/main/packages/coding-agent#skills) |

## Skills

| Skill | Description |
|-------|-------------|
| **gsap-core** | Core API: `gsap.to()` / `from()` / `fromTo()`, easing, duration, stagger, defaults |
| **gsap-timeline** | Timelines: sequencing, position parameter, labels, nesting, playback |
| **gsap-scrolltrigger** | ScrollTrigger: scroll-linked animations, pinning, scrub, triggers, refresh & cleanup |
| **gsap-plugins** | Plugins: ScrollToPlugin, ScrollSmoother, Flip, Draggable, Inertia, Observer, SplitText, ScrambleText, SVG & physics plugins, CustomEase, EasePack, GSDevTools, etc. |
| **gsap-utils** | gsap.utils: clamp, mapRange, normalize, interpolate, random, snap, toArray, selector, wrap, pipe, and other helpers |
| **gsap-react** | React: useGSAP hook, refs, `gsap.context()`, cleanup, SSR |
| **gsap-performance** | Performance: transforms over layout props, will-change, batching, ScrollTrigger tips |
| **gsap-frameworks** | Vue, Svelte, etc.: lifecycle, scoping selectors, cleanup on unmount |

## Quick reference — Canonical snippet for AI agents

When suggesting or generating GSAP code, use this pattern as the shared starting point:

```javascript
// 1. Imports and plugin registration (once per app)
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// 2. Single tween — prefer transform aliases and autoAlpha
gsap.to(".box", { x: 100, autoAlpha: 1, duration: 0.6, ease: "power2.inOut" });

// 3. Timeline for sequencing (prefer over chained delay)
const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "power2" } });
tl.to(".a", { x: 100 })
  .to(".b", { y: 50 }, "+=0.2")
  .to(".c", { opacity: 0 }, "-=0.1");

// 4. ScrollTrigger — attach to timeline or top-level tween; call refresh after layout changes
const tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".section",
    start: "top center",
    end: "bottom center",
    scrub: true
  }
});
tl2.to(".panel", { x: 100 })
   .to(".panel", { rotation: 5, duration: 0.7 });
// After DOM/layout changes: ScrollTrigger.refresh();

// 5. React: useGSAP + scope + cleanup (no selector without scope)
// import { useGSAP } from "@gsap/react";
// gsap.registerPlugin(useGSAP);
// useGSAP(() => { gsap.to(ref.current, { x: 100 }); }, { scope: containerRef });
// Or: useEffect(() => { const ctx = gsap.context(() => { ... }, containerRef); return () => ctx.revert(); }, []);
```

## Structure

```
gsap-skills/
  README.md
  AGENTS.md          # Guidance for agents editing this repo
  .github/
    copilot-instructions.md   # Repo-wide instructions for GitHub Copilot
    instructions/             # Path-specific Copilot instructions
      react.instructions.md
      scrolltrigger.instructions.md
  .claude-plugin/    # Claude Code plugin config (plugin.json, marketplace.json)
  .cursor-plugin/    # Cursor plugin config (plugin.json, marketplace.json)
  assets/            # Logo and icon assets (e.g. gsap-green.svg, gsap-icon-square.svg)
  skills/
    llms.txt         # Skill index for agents (names, summaries, trigger terms)
    gsap-core/       SKILL.md
    gsap-timeline/   SKILL.md
    gsap-scrolltrigger/ SKILL.md
    gsap-plugins/    SKILL.md
    gsap-utils/      SKILL.md
    gsap-react/      SKILL.md
    gsap-performance/  SKILL.md
    gsap-frameworks/ SKILL.md
  examples/         # Minimal reference demos (vanilla + React)
```

## GitHub Copilot

**Copilot does not automatically use Cursor/Claude skill files.** To give GitHub Copilot GSAP-aware guidance in a repo that uses this project (or in this repo), use Copilot’s own instruction files:

- **Repository-wide:** [`.github/copilot-instructions.md`](.github/copilot-instructions.md) — imports, timelines, transforms, from()/fromTo(), ScrollTrigger, React, cleanup.
- **Path-specific:** [`.github/instructions/`](.github/instructions/) — `react.instructions.md` (React/JSX/TSX), `scrolltrigger.instructions.md` (scroll-related files). These apply when the file path matches the configured globs.

The instruction files are kept **concise and actionable** (bullets, not full reference) so Copilot can use them reliably; GitHub’s code review feature only uses the first 4,000 characters of each file. For full guidance (config tables, examples, Do Not / Best practices), use the **skills** in `skills/` with an agent that supports the Agent Skills format (Cursor, Claude Code, etc.), or install this repo as a skill.

Copy or adapt the `.github/` files into your repository so Copilot uses them. See [GitHub’s custom instructions docs](https://docs.github.com/en/copilot/concepts/response-customization).

## Compatibility

- **[skills CLI](https://github.com/vercel-labs/skills)** — installs into Cursor, Claude Code, Codex, Windsurf, GitHub Copilot, and [40+ agents](https://github.com/vercel-labs/skills#supported-agents)
- **[Agent Skills spec](https://agentskills.io/specification.md)** — SKILL.md format and discovery
- **GitHub Copilot** — use `.github/copilot-instructions.md` and optional `.github/instructions/*.instructions.md` (included in this repo)

## Risk level

**LOW** — GSAP is an animation library with a minimal security surface.

## License

MIT