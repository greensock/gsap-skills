# Guidance for AI Agents Working in This Repo

This repository contains **GSAP (GreenSock Animation Platform) skills** for AI coding agents, in [Agent Skills](https://agentskills.io/specification.md) format. It is documentation, not an application: there is no build, lint, or test step at the root. When editing or adding skills, follow these rules.

## Repo structure

- **skills/** — Each subdirectory is one skill. The CLI and agents discover skills by scanning `skills/` for directories that contain `SKILL.md`.
- **Skill directory name** must exactly match the `name` in that skill’s frontmatter (e.g. `skills/gsap-core/` ↔ `name: gsap-core`).
- **skills/llms.txt** — Plain-text index of every skill (name, summary, trigger terms) that agents read to pick a skill.
- **.claude-plugin/** and **.cursor-plugin/** — Plugin and marketplace manifests (`plugin.json`, `marketplace.json`) that point at `skills/`. Keep their versions and descriptions in step with each other.
- **.github/copilot-instructions.md** and **.github/instructions/*.instructions.md** — A condensed version of the skill rules for Copilot, which does not load SKILL.md files. When a skill's guidance changes a rule summarized there, update it too.
- **examples/** — Minimal reference demos (vanilla, React, Vue, Nuxt) that follow the skills exactly.
- `GEMINI.md` is a symlink to this file, and `CLAUDE.md` imports it, so this is the one place to edit agent guidance.

## SKILL.md requirements

- **Frontmatter (YAML):**
  - `name` (required): lowercase, hyphens only, max 64 chars, must match parent directory name.
  - `description` (required): what the skill does and when to use it; include trigger terms so agents know when to apply it. Max 1024 chars.
  - `license` (optional): e.g. `MIT` if the skill is under the repo license.
- **Body:** Markdown instructions. Keep under ~500 lines; put long reference material in `references/` or `scripts/` and link from SKILL.md.

## Conventions

- Write descriptions in **third person** (e.g. "Use when…" not "You can use when…").
- Be concise; avoid restating general GSAP docs. Focus on correct API usage, pitfalls, and cleanup.
- GSAP and every plugin (SplitText, MorphSVG, etc.) are free and installed from the public `gsap` npm package. Do not describe any plugin as Club/paid-only or tell users to set up `.npmrc`, auth tokens, or a private registry.
- When adding a new skill: create `skills/<skill-name>/SKILL.md`, add an entry to `skills/llms.txt`, then update README.md "Skills" table and "Structure" section.

## Running the examples

Use the examples to check a pattern by hand after changing a skill:

```bash
npx serve examples/vanilla                         # vanilla: GSAP from CDN (ESM), needs a local server
cd examples/react && npm install && npm run dev    # Vite + React + @gsap/react
cd examples/vue && npm install && npm run dev      # Vite + Vue 3
cd examples/nuxt && npm install && npm run dev     # Nuxt 4 with a useGSAP composable
```

When bumping the GSAP version, update it in every `examples/*/package.json`.

## References

- [Agent Skills specification](https://agentskills.io/specification.md)
- [skills CLI (discovery, install)](https://github.com/vercel-labs/skills)
