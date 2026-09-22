import type { Section } from '../types'

export const state: Section = {
  id: 'state',
  title: 'state — what changed',
  scene: 'state-compare',
  slide: `## Comparing this project to the last one

\`manifest.json\` describes every node, fully resolved. Point dbt at an old one with \`--state\`, and it can tell you **what differs now.**

- \`state:new\` — a node that did not exist before
- \`state:modified\` — changed SQL, config, tests, or declared columns
- \`state:modified+\` — those, **and everything downstream of them**
- \`result:error+\` — whatever failed last time, and its children

### The plus is not optional
A model you did not touch still has to rebuild if **its input changed.** \`state:modified\` alone builds your two edited models and leaves everything below them stale and inconsistent. The plus is what makes this correct rather than merely fast.

### Where the old manifest comes from
Your production job has to **upload it somewhere** — S3, an Actions artifact, wherever. This is the one piece of plumbing the whole technique depends on.`,
  narration:
    "Here is the idea that makes production dbt fast. Every run writes a manifest — a complete, resolved description of every node in your project: its SQL, its config, its tests, its columns. If you keep the manifest from your last production run, dbt can parse your current checkout, compare the two, and tell you exactly what is different. You point it at the old one with the state flag, and then you get a family of selectors. State colon new picks up nodes that did not exist before. State colon modified picks up nodes whose SQL, config, tests or declared columns have changed. Result colon error selects whatever failed last time, which is a lovely way to re-run only the broken parts of a big job. Now, the detail that matters more than any other in this section: the plus sign. A model you did not touch still has to be rebuilt if its input changed. If you edit two staging models and select state colon modified on its own, dbt builds those two and stops — and every mart underneath them is now sitting on the old logic, inconsistent with what you just changed. It is not just less thorough, it is actively wrong. State colon modified plus is what makes the technique correct, and you should treat the plus as part of the selector rather than as an option. One piece of plumbing to be aware of. That old manifest has to come from somewhere, which means your production job has to upload it — to S3, to an Actions artifact store, to a bucket, wherever. If nothing saves it, none of this works, because the target directory is gitignored and overwritten on every run. We will come back to that when we talk about artifacts.",
}
