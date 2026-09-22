import type { Section } from '../types'

export const table: Section = {
  id: 'table',
  title: 'table — pay once, at build time',
  scene: 'table-mat',
  slide: `## Rows on disk, rebuilt every run

\`\`\`sql
create or replace table … as ( your model );
\`\`\`

The whole query runs at build time and the rows are written down. Every read after that is just reading rows.

### Two things that follow
- **The swap is atomic.** \`create or replace\` means readers never see a half-built table — they see the old one, then the new one
- **It is exactly as fresh as the last run.** Built at 6am, it is six hours old by noon, however busy the source has been

### The honest default for a mart
Marts are read constantly, by people and dashboards that will not wait. Paying once, in a run nobody is watching, beats paying on every query.

### And this is where the trouble starts
**Rebuilt whole. Every run.** That is fine until the table is big — which is the rest of this course.`,
  narration:
    "The mirror image. Materialize a model as a table and dbt sends create-or-replace-table-as, with your query inside it. The whole thing runs at build time, every row is computed, and the results are written to disk. Every read afterwards is just reading rows — no computation at all. Two details worth having. First, the swap is atomic. Create-or-replace does not empty the table and then slowly fill it; the warehouse builds the new version and swaps it in. So a reader querying during a rebuild sees the old table, and then the new one, and never a half-built one. That matters more than it sounds like, because it means you can rebuild a mart in the middle of the working day without anybody seeing a broken number. Second, a table is exactly as fresh as the last run and no fresher. Built at six in the morning, it is six hours stale by lunchtime, no matter how much has happened in the source since. If that is not acceptable, the answer is a more frequent run, or a view. This is the honest default for a mart. Marts are read constantly, by people and dashboards that will not wait, so paying the cost once, in a scheduled run that nobody is watching, is a much better deal than paying it on every query. And now the sentence that sets up the whole rest of this course. Rebuilt whole. Every run. Your model recomputes all of history, every single time, including the three years of rows that are identical to what they were yesterday. That is completely fine, right up until it is not.",
}
