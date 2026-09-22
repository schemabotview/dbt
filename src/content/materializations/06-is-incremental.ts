import type { Section } from '../types'

export const isIncremental: Section = {
  id: 'is-incremental',
  title: 'is_incremental() — one file, two shapes',
  scene: 'is-incremental-shape',
  slide: `## The model has a first run and a normal run

\`\`\`sql
{% if is_incremental() %}
  where loaded_at >
      (select max(loaded_at) from {{ this }})
{% endif %}
\`\`\`

On the **first** build the table does not exist, so the block is skipped and everything is built. On **every run after**, the filter applies and only new rows are computed.

### True when all three hold
\`incremental\` in the config · the target table **already exists** · no \`--full-refresh\`

### \`{{ this }}\`
The model's own relation. Filtering against \`max()\` of itself is what makes the model **restartable** — miss a run, and the next one picks up from wherever it got to.

### The rule
The filter goes **inside** the block — everything outside it must be true of a full rebuild too.`,
  narration:
    "Here is the mechanism, and it is one file that behaves two different ways. Look at the model on the left. Most of it is an ordinary select. Then there is a Jinja block: if is_incremental, add a where clause that keeps only rows newer than the newest row already in this table. On the very first run, the target table does not exist yet, so is_incremental returns false, the block is skipped, and the model builds every row it can find — a full build. On every run after that, the table does exist, the block applies, and the model computes only the new rows. Same file. Two shapes. Is_incremental returns true when three things are all true: the model is configured as incremental, the target table already exists, and you did not pass the full-refresh flag. Any one of those failing gives you the full build, which is exactly what you want — full refresh should behave identically to a first run. Now, the piece worth dwelling on is the double-curly this. That is the model's own relation — the table it is building into. Filtering against the max of a column in itself, rather than against something like today's date, is what makes the model restartable. Miss a run over the weekend, and Monday's run does not need to know it missed anything; it just asks the table what the newest row is, and picks up from there. Hardcode a date and you have a model that silently loses a day whenever the schedule hiccups. One rule to end on. The filter goes inside the block, and only the filter. Everything outside that block has to be true of a full rebuild as well, because on a full refresh, that is exactly what runs.",
}
