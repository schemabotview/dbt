import type { Section } from '../types'

export const choosing: Section = {
  id: 'choosing',
  title: 'Choosing, and two flags',
  scene: 'choose-mat',
  slide: `## Start at the top, stop at the first yes

- **A step nobody reads?** → \`ephemeral\`
- **Thin, over one table?** → \`view\`
- **Rebuild still comfortable?** → \`table\`
- **Rebuild hurting?** → \`incremental\`
- **Big and time-sliced?** → \`microbatch\`

### \`--full-refresh\`
Rebuilds an incremental model from scratch — the escape hatch for when the logic changed and the history is now wrong. Guard the ones that must never be rebuilt with \`full_refresh: false\`.

### \`on_schema_change\`
A new column appears upstream. By default dbt **ignores** it and the incremental table keeps its old shape. \`append_new_columns\` or \`sync_all_columns\` if you want it to follow.

### Materialized views
Hand the refresh to the warehouse instead of to dbt. Powerful, and a different operational model — you no longer control when it runs.`,
  narration:
    "Let's close by putting it together. Work down this list and stop at the first yes. Is this a step nobody reads directly, that exists only to keep a mart readable? Ephemeral. Is it thin — a rename and a cast over a single table? A view. Is it something people query a lot, where the rebuild is still comfortable? A table, and be honest about comfortable: if it takes four minutes, that is comfortable. Is the rebuild actually hurting — missing deadlines, costing real money? Now incremental. And is it big and naturally organised by time? Microbatch. Notice the direction of travel: you start at the simplest thing and move only when something hurts. An incremental model is more code, more failure modes, and more things to reason about at two in the morning. It buys you time and money, and you should buy it when you need it. Two flags to carry with you. Full refresh rebuilds an incremental model from scratch, and it is the escape hatch for the day you change the model's logic and realise all the history in it was computed by the old code. Some models must never be casually rebuilt — one built on a source with a short retention window, for instance — and you can protect those with full refresh false in their config. And on schema change: when a new column shows up upstream, by default dbt ignores it, and your incremental table quietly keeps its old shape forever. If you want it to follow, set append new columns, or sync all columns. Finally, worth knowing that materialized views exist as a materialization too. That hands the refresh to the warehouse rather than to dbt, which is powerful — and a genuinely different operational model, because you no longer decide when it runs.",
}
