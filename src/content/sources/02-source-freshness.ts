import type { Section } from '../types'

export const sourceFreshness: Section = {
  id: 'source-freshness',
  title: 'Freshness — the first alarm',
  scene: 'freshness',
  slide: `## Is the raw data even current?

\`\`\`yaml
freshness:
  warn_after:  {count: 6,  period: hour}
  error_after: {count: 24, period: hour}
loaded_at_field: _synced_at
\`\`\`

dbt takes \`max(_synced_at)\`, compares it to now, and reports **pass**, **warn** or **error**.

### It is its own command
\`dbt source freshness\`. It builds nothing and is not part of \`dbt build\` — so if nothing runs it, nothing checks.

### Run it first, and act on it
A freshness error means **the loader is broken**, not your models. Building on top of stale data publishes yesterday's numbers a second time, with today's date on them — which is worse than an empty dashboard, because nobody notices.

### Where the column comes from
Most loaders write one. If yours does not, some adapters can answer from warehouse metadata instead.`,
  narration:
    "Here is a question every pipeline should ask before it does anything else: is the raw data actually current? Freshness answers it. You name the column that records when a row was loaded, and you set two thresholds. dbt takes the maximum value of that column, compares it against now, and tells you which band you are in. Under the warning threshold, it passes quietly. Between warn and error, it warns — loud in the output, but the command still succeeds. Past the error threshold, it fails. Two things about how this fits into a project. First, it is its own command: dbt source freshness. It builds nothing, and it is not part of dbt build, which means if nothing in your schedule runs it, nothing is checking. That is the single most common way this feature ends up configured and useless. Second, and more important — act on the result. A freshness failure is a different kind of problem from a test failure. A test failing says your data is wrong. Freshness failing says the loader is broken and there is no new data at all, so whatever you build now will just be yesterday. And that is genuinely worse than a failed run, because a stale dashboard with today's date on it looks fine. Nobody investigates a number that looks plausible. So the shape of a good job is: check freshness first, and stop if it errors. As for the column itself — most loading tools write one, whether it is called synced at or loaded at or something else. If yours genuinely does not, some adapters can answer the question from warehouse metadata instead of from a column, so it is worth checking before you decide you cannot use this.",
}
