# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A single-page personal portfolio (Astro, static output) plus a `/blog` section for
technical publications. All resume/CV content is data-driven from `cv.json` at the
repo root, following the [JSON Resume](https://jsonresume.org/schema/) schema.

## Commands

Package manager is **Bun** (`bun.lock` is the lockfile of record; `package-lock.json`
also exists but CI uses `bun install --frozen-lockfile`).

- `bun install` — install dependencies
- `bun run dev` / `bun run start` — dev server (runs `astro dev` directly via node, not the `astro` CLI shim)
- `bun run build` — runs `astro check` (typecheck) **then** `astro build`; both must pass
- `bun run preview` — preview the production build
- `bun run astro -- <cmd>` — run arbitrary Astro CLI commands

There is no test suite and no linter configured in this repo. The build script's
`astro check` step is the only correctness gate — always run `bun run build` after
non-trivial changes.

CI (`.github/workflows/deploy.yml`) builds with **Node 24** and Bun, then deploys to
Vercel on push to `main`. Keep Node/Astro-version compatibility in mind (see recent
fix commits) if bumping the `astro` dependency.

## Architecture

**Everything renders from `cv.json`.** Section components under
`src/components/section/` (`About`, `Experience`, `Education`, `Certifications`,
`Projects`, `Skills`, `Publications`, `Hero`) each import the specific top-level key
they need — e.g. `import { work } from "cv.json"` — and are composed in
`src/pages/index.astro` inside `id`-anchored wrapper `<div>`s (`#about`,
`#experience`, etc.). `NavBar.astro` links to those anchors. To add/reorder a resume
section, edit both `cv.json` and `index.astro`/`NavBar.astro` together.

**`cv.json` is imported as a bare specifier** (`import { basics } from "cv.json"`),
not a relative path — this resolves because the package self-references itself
(`"extraterrestrial-group": "file:"` in `package.json`, symlinked into
`node_modules/`) combined with `tsconfig.json`'s `baseUrl: "."`. Keep new files that
need CV data importing it the same bare way rather than switching to `../../cv.json`.

**Publications are split across two independent systems**, both currently in use:
- `cv.json`'s `publications` array → rendered by `Section/Publications.astro` inline
  on the homepage.
- `src/content/publications/*.md` (Astro content collection defined in
  `src/content.config.ts`, schema: `title`, `type` (`article`|`paper`), `summary`,
  `publishedAt`, `tags`, `draft`) → rendered as full pages under `/blog` and
  `/blog/[slug]` (`src/pages/blog/`).

  These are not synced automatically — adding a publication to one does not add it
  to the other.

**Path alias**: `@/*` maps to `src/*` (see `tsconfig.json`). Use it for all
first-party imports outside of the `cv.json` bare-import exception above.

**Icons** live in `src/icons/*.astro` as thin wrapper components around inline SVG
(one icon per file, PascalCase except `icon-publication.astro`). `KeyboardManager.astro`
additionally inlines its own social-icon SVGs as raw strings (for the command palette),
duplicating some icons that also exist under `src/icons/` — this duplication is
intentional because `hotkeypad` consumes icons as HTML strings, not components.

**Command palette / hotkeys**: `KeyboardManager.astro` wires up `hotkeypad` with
dynamic commands built from `cv.json`'s `basics.profiles` (one hotkey per social
network, `ctrl+<first letter>`) plus a static "Imprimir" (print) command. The
`#footer-button` (mobile) synthesizes a `ctrl+K` keydown event to open the same
palette that `Cmd/Ctrl+K` opens on desktop.

**Print styles**: `Layout.astro` defines global `.no-print` / `.print` /
`@media print` rules used across components (e.g. `KeyboardManager`'s footer is
`.no-print`) to produce a clean printable CV from the same page.

**Styling**: component-scoped `<style>` blocks per `.astro` file (Astro's default
scoping), no global CSS framework. Global resets/typography live only in
`Layout.astro`'s `is:global` block.
