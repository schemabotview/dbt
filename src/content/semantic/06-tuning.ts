import type { Section } from '../types'

export const tuning: Section = {
  id: 'tuning',
  title: 'Tuning',
  scene: 'tuning-wins',
  slide: `## The cheap wins are not clever

### Look here first
- **The wrong materialization** — a table rebuilt nightly that nobody reads twice
- **The rebuild** — make it incremental, with a filter that is actually selective
- **Dead models** — built every night, read by no one. Delete them
- **CI on everything** — defer to prod and build only the changed slice

### Measure before you touch anything
Every run already writes timings for every model into the artifacts. Read them. The answer is usually three models, not three hundred.

### Slow and expensive are different questions
The slowest model may run on a small warehouse for four minutes. The dearest may finish in forty seconds on a huge one. **Optimise the bill, not the clock** — unless the clock is what is hurting.`,
  narration:
    "So you have decided the bill is too high. Where do you actually look? The honest answer is that the cheap wins are not clever, and almost none of them involve tuning SQL. Four places. First, the wrong materialization — a model configured as a table, rebuilt in full every night, that gets queried twice a week. That may well want to be a view, and the change is one line. Second, the rebuild itself: if a model genuinely does need to be a table over a lot of history, make it incremental, with a filter that is actually selective rather than one that technically compiles. Third, and this one is embarrassing every time: dead models. Things built faithfully every night that no dashboard, no export and no human has read in months. Exposures and query history will tell you which ones. The fix is deletion, and it is the single best return on effort in this entire section. Fourth, continuous integration running the whole project on every pull request, when deferring to production and building only the changed slice does the same job for a fraction of the compute. But before you touch any of it: measure. Every run already writes timings for every model into the artifacts, and reading those takes minutes. The answer is nearly always three models, not three hundred, and without the numbers you will confidently optimise something that was already cheap. And keep two questions apart, because they are not the same question. The slowest model might be running for four minutes on a small warehouse and costing almost nothing. The most expensive one might finish in forty seconds on an enormous one. Optimise the bill, or optimise the clock, but know which of the two you are doing.",
}
