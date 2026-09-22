import type { Section } from '../types'

export const hooksSection: Section = {
  id: 'hooks',
  title: 'Hooks',
  scene: 'hooks',
  slide: `## Four places to run extra SQL

- **\`on-run-start\`** / **\`on-run-end\`** — once, either side of the whole run
- **\`pre-hook\`** / **\`post-hook\`** — either side of **one model**, with \`{{ this }}\` available

\`\`\`sql
{{ config(post_hook="insert into audit.runs
     values ('{{ this }}', '{{ run_started_at }}')") }}
\`\`\`

### What they are genuinely for
Anything the warehouse needs that is **not a model**: an audit trail, a \`vacuum\`, a session parameter, an external table refresh.

### Not for grants
Every older tutorial uses a post-hook to grant select. **Use the \`grants\` config instead** — it knows when grants changed, and skips them when nothing did.

### Hooks are easy to lose
They are not models: no lineage, no tests, no obvious place to look. A hook doing something important is a hook somebody will be surprised by.`,
  narration:
    "Hooks let you run extra SQL around a build, and there are four slots. On-run-start fires once, before any model is built — a natural place to set a session parameter or write the opening row of an audit record. Pre-hook and post-hook attach to a single model and fire immediately before and after it. Post-hook is the more useful of the two, partly because this is available inside it, so you can refer to the object that was just built. And on-run-end fires once at the very end of the run, for closing that audit record or sending a notification. What are they genuinely for? Anything the warehouse needs that is not itself a model. An audit trail of what ran and when. A vacuum or an analyze on a platform that wants one. Unsetting a session parameter you set at the start. Refreshing an external table definition. The common thread is a side effect, rather than a table of rows. Now, one correction that matters, because you will read the opposite in a lot of older material. Do not use a hook to grant select permissions. That was the standard advice for years, and it has been superseded: dbt has a grants config, which applies grants properly, knows when they have actually changed, and does not pointlessly re-run them on every build. If you find a post-hook granting select in a project you inherit, that is a good candidate for tidying up. Finally, a caution. Hooks are easy to lose track of. They are not models, so they have no lineage, no tests, and no obvious place a newcomer would look. A hook that does something important is a hook that somebody will eventually be surprised by — so keep them few, keep them boring, and if something deserves to be a model, make it a model.",
}
