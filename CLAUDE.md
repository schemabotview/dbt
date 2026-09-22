# CLAUDE.md — dbt (lean operational pointers)

The **dbt** concept app of GraphL. Workspace-wide invariants, content model, and working agreement
live in the workspace [`CLAUDE.md`](../CLAUDE.md) — read that first; this file is dbt-specific.

## Status

**ALL NINE COURSES AUTHORED (2026-09-22)** — **87 sections · 87 scenes**. The spine in
COURSE-PLAN.md is complete: every course declared is now authored, and no course is empty.
`npm run build`, `tsc --noEmit` and `npm run check` are clean, and **every one of the eighty-seven
sections has been reviewed as a rendered frame at 1920×1080** before being called done.

**Audio has started.** The first Colab pass ran on 2026-09-22 and pushed all ten `foundations`
wavs straight from the VM. Courses 2-9 have none yet.

⚠️ **`foundations` section order is now FROZEN** — its wav filenames are pinned to its section ids,
so reordering or renaming a section there orphans a wav. The other eight courses are still free to
change until their own Colab pass runs.

**Live at `graphl.in/dbt/`** — repo `schemabotview/dbt`, deployed by `.github/workflows/deploy.yml`
on push to `main`. The repo previously held this concept's notebook **quarry**; on 2026-09-22 the
owner chose to force-push the app over it, and Pages `build_type` was switched from `legacy` to
`workflow` so the Actions deploy is what serves. There is still **no catalog entry in
`../ui-graphl`** — add one now that this deploys.

**Audio is un-generated but wired up.** `scripts/audio-manifest.json` (87 entries) is committed, and
`scripts/colab_generate_audio.ipynb` has been retargeted from `../snowflake` to this repo. Re-run
`npm run gen:audio` and commit the json whenever narration changes — the notebook only sees
committed text.

## What this is

A standalone concept app: its own scenes + courses. The render engine is the **`@graphlearning/flow`**
package and the app shell is **`@graphlearning/shell`** — both pinned by version, so an engine change
never lands here until this repo upgrades and re-verifies.
Each **section** = `(scene, slide, narration)`; the left scene is a react-flow diagram or a code
snippet, the right slide is markdown. One section = one slide = one video segment.

This concept is **code-and-config heavy** — SQL *and* YAML carry the teaching — so most sections ride
`kind: 'code'` cards, often two of them (the file you wrote / the thing it became), the way
`../databricks-data-engineer` does. `kind: 'table'` carries the comparison boards (Core vs platform,
the materializations, the incremental strategies, test types).

## Course arc — the nine-course spine (87 sections planned)

| # | id | Title | Secs | State |
|--:|----|-------|-----:|-------|
| 1 | `foundations` | What dbt Is | 10 | **authored · audio done · ORDER FROZEN** |
| 2 | `models` | Models, ref and the DAG | 10 | **authored, no audio** |
| 3 | `materializations` | Materializations | 10 | **authored, no audio** |
| 4 | `sources` | Sources, Seeds & Snapshots | 9 | **authored, no audio** |
| 5 | `testing` | Tests & Contracts | 10 | **authored, no audio** |
| 6 | `jinja` | Jinja, Macros & Packages | 10 | **authored, no audio** |
| 7 | `deployment` | Running dbt in Production | 10 | **authored, no audio** |
| 8 | `governance` | Docs, Ownership & Mesh | 9 | **authored, no audio** |
| 9 | `semantic` | Semantic Layer & Beyond | 9 | **authored, no audio** |

The per-section plot, and the judgment calls behind the grouping, live in
[`COURSE-PLAN.md`](./COURSE-PLAN.md).

**Shipped as a prefix.** Courses 1-5 (49 sections) are the core skill and were authored so they
could go live before 6-9 existed. All nine now exist, but the rules below are what made that
possible — and they are what keeps a reorder cheap until the wavs land.

## Two decisions that run through every course

Taken before a line was authored, and re-stated here because every new section has to honour them:

1. **Snowflake is the worked warehouse.** Stay warehouse-neutral wherever the idea is neutral (a
   `ref`, a DAG, a test). Where one platform must be named — a merge, a profile, a cost claim — it is
   Snowflake, which lines this repo up with `../snowflake` and means a learner can run what they see.
2. **Core-first; the platform named only where Core has no answer.** Everything teachable on the CLI
   is taught there. The hosted platform appears in `deployment` (scheduling), `governance`
   (cross-project refs) and `semantic` (the AI surface). No section assumes a paid account.

## House rules

- **No volatile version numbers in narration.** A wav cannot be edited and dbt ships fast. Speak
  "recent versions of dbt"; put the version a feature landed in on the slide, which is editable.
- **No course cross-references by number.** Name the neighbour ("when we built the DAG"), never
  number it. This is what keeps 1-5 shippable as a prefix and a reorder free until the wavs exist.
  After a course's audio is generated its section order is frozen — wav filenames pin section ids.
- **Every SQL/YAML snippet must be runnable** against a Snowflake target with `dbt_utils` installed.
- **One spelling per concept across the repo.** The yml key is `data_tests:` everywhere (the newer
  name, taught in `testing/01`); course 4's source yml was corrected to match after the fact.

## Two authoring budgets the guard enforces (`npm run check`)

Both were hit repeatedly while authoring courses 1-7, so expect them:

- **Leaf cards are a fixed 210×96.** Keep a label under ~24 characters and a sub under ~45, and
  keep any single unbreakable token (no spaces or hyphens) to 14 in a label, 20 in a sub. Note that
  an underscore is NOT a break opportunity, so `on_schema_change` is a 16-character token — the
  guard used to strip underscores before measuring and let exactly that label through onto a frame
  where it overflowed its card; `scripts/check-content.mjs` no longer strips them. A hyphen IS a
  break opportunity, and the guard used to miss that too — `Non-deterministic SQL` renders as three
  lines in a 12-char column, not two. Both fixes are in `wrapLines`/`longestToken`; both were found
  on a frame, not by the guard.
- **Slides do not scale to fit** — they clip at the bottom past ~1100 modelled px. The model has
  been corrected twice against frames that clipped while passing: an **ordered** list indents ~43px
  further than a bulleted one (its number sits in a gutter), and `inline code` renders as a chip
  with padding, so a numbered list of commands is much taller than its character count suggests.

And two the guard **cannot** see, each of which cost a re-capture here:

- **A fenced code block inside a slide does not wrap.** Anything past ~52 characters runs off the
  right edge of the pane. Keep slide code lines short; the scene's code card is where a wide snippet
  belongs.
- **A scene's rendered type size is set by whichever axis binds.** fitView scales the whole scene
  into the pane, so an unusually WIDE scene (five cards across a row) or an unusually TALL one (a
  three-card ladder stacked vertically) comes out with visibly smaller text than its neighbours,
  even though every card is within budget. Both happened: `where-dbt-sits` went from five cards
  across to four, and `config-precedence`'s ladder went from `flow: 'BT'` to `'LR'`. Keep an LR row
  to four cards or fewer, and prefer a wide-ish composition — the pane is landscape.

## Verifying

No test runner. The bar is `npm run build` + `npx tsc --noEmit` + `npm run check` clean, **and every
new section seen as a rendered frame**. The dev server's window is rarely 16:9, and the slide pane
clips differently at other aspect ratios — so review at the real frame size (a puppeteer screenshot
at 1920×1080, or `?capture=1`), not at whatever shape the browser window happens to be.
