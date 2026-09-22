# dbt — a GraphL concept app

Nine courses on dbt, taught as short sections: a diagram or a code card on the left, a slide on the
right, and a narrated script that ties them together.

```
npm install
npm run dev      # http://localhost:5173
```

The app opens on the catalog. A section lives at `#/<course>-<section>`, e.g.
`#/foundations-what-dbt-is`.

## The model

- **concept ⊃ course ⊃ section.** A **section** is the atomic unit: `(scene, slide, narration)` —
  one section is one slide and one video segment.
- **Left is the scene, right is the slide.** The scene is a react-flow diagram or a code snippet,
  both rendered by `@graphlearning/flow`. The slide is markdown.
- **Scenes are declarative.** You list nodes and edges; the engine computes every position and size.
  Never write coordinates.

## Layout

```
src/content/<course>/   one file per section (id, title, scene, slide, narration) + index.ts
src/scenes/<course>/    one file per scene + index.ts
src/main.tsx            mounts <ConceptApp> from @graphlearning/shell
src/theme.css           --brand / --brand-hover / --accent-2 — this repo's whole design surface
public/audio/<course>/  narration wavs, named <section-id>.wav
```

The router, the composited section view, the slide panel, the catalog and narration all live in
`@graphlearning/shell`; the render engine is `@graphlearning/flow`. Both are consumed as published
packages, pinned by version.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | dev server |
| `npm run build` | production build (base `/dbt/`) |
| `npm run check` | content budgets — card text, slide height, focus ids, missing wavs |
| `npm run record` | screen-record a course at 3840×2160 |
| `npm run thumb` / `gen:desc` | publish assets: thumbnails and descriptions |

## Where things are written down

- [`COURSE-PLAN.md`](./COURSE-PLAN.md) — the full nine-course, 87-section plot and the judgment calls
- [`CLAUDE.md`](./CLAUDE.md) — operational state: what is authored, what is not, and the house rules
