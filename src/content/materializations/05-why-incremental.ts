import type { Section } from '../types'

export const whyIncremental: Section = {
  id: 'why-incremental',
  title: 'The rebuild that stopped fitting',
  scene: 'rebuild-wall',
  slide: `## Nothing broke. The table grew.

A \`table\` model recomputes **all of history, every run**. In year one that is four minutes. In year three it is two hours, and it missed the morning deadline.

### Why you do not see it coming
There is no error and no alert. The run simply takes a little longer each week, and the threshold that matters — somebody's 7am dashboard — is not written down anywhere.

### What the run is actually doing
- **Three years of rows** that are byte-for-byte identical to yesterday's — recomputed
- **One day of rows** that are genuinely new — the only real work in the job

### The idea
Compute the new rows. Add them to what is already there. **That is all incremental is** — everything after this is detail about what "add" means when a row you already loaded has changed.`,
  narration:
    "Before the mechanics, the problem — because incremental models are an optimisation, and an optimisation you adopt without feeling the pain first is usually just complexity. Here is how it actually arrives. You build a fact table. It is materialized as a table, so every run recomputes it from scratch. In the first year that takes four minutes and nobody thinks about it. A year later it is twenty-five minutes, which is mildly annoying but fine. And a year after that it is two hours, the pipeline finishes at half past eight, and somebody's seven o'clock dashboard was empty when they opened it. Notice what did not happen. Nothing broke. No error, no alert, no failure. The model's code never changed. The run just got a little slower every single week, and the threshold that actually mattered — one person's morning routine — was not written down anywhere for anything to check against. That is why this particular problem is nearly always discovered by a complaint rather than by monitoring. Now look at what the run is spending its time on. Three years of historical rows, which are byte for byte identical to what they were yesterday, being recomputed. And one day of genuinely new rows, which is the only real work in the entire job. The ratio is absurd, and it gets worse every day. So the idea is exactly as simple as it sounds. Compute the new rows. Add them to what is already there. That is all an incremental model is. Everything in the next few sections is detail about one question: what does add mean, when a row you already loaded has since changed?",
}
