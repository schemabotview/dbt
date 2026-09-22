import type { Section } from '../types'

export const theRunbook: Section = {
  id: 'the-runbook',
  title: 'The runbook',
  scene: 'runbook',
  slide: `## What a production job should do, in this order

1. **\`dbt source freshness\`** — stop if the loader is broken
2. **\`dbt snapshot\`** — capture today before anything transforms it
3. **\`dbt build\`** — seeds, models and tests, interleaved
4. **\`dbt docs generate\`** — and publish it somewhere
5. **Upload the artifacts** — tomorrow's CI needs them

### Each step exists because skipping it makes a later one lie
Skip freshness and you confidently republish yesterday. Skip the snapshot and a failed build costs you a day of history you cannot recover. Skip the upload and slim CI silently stops comparing against anything.

### And somebody has to be paged
An alert into a channel nobody reads makes **every step above it decorative.** Name an owner, and make sure 3am reaches a person.

### Where to go next
Everything so far assumes **one project, one team.** The next course is what changes when that stops being true.`,
  narration:
    "Let's close with the checklist, and notice that it is an order rather than a list of features. Step one: check source freshness, and stop if it errors. Step two: run your snapshots, capturing today's state before anything transforms it. Step three: build — models, seeds and tests interleaved, so a broken model stops its own branch. Step four: generate the docs and publish them somewhere people can actually reach. Step five: upload the artifacts, so tomorrow's CI has something to compare against. Each of those exists because skipping it makes a later step lie. Skip freshness, and step three cheerfully rebuilds everything from stale data and publishes yesterday's numbers with today's date on them. Skip the snapshot, and a build that fails halfway costs you a day of history that you cannot get back — history is the one thing in this whole system that is not recoverable. Skip the docs, and the lineage graph people rely on drifts away from what actually exists. Skip the upload, and slim CI carries on running while silently comparing against nothing. And the last one, which is not technical. Somebody has to be paged. An alert into a channel nobody reads makes every step above it decorative — you have built a careful, well-tested pipeline that fails silently, which is arguably worse than one that fails loudly, because everyone trusts it. Name an owner. Route the alert to a person. Make sure a failure at three in the morning reaches somebody who can act on it, or at least somebody who will see it before the executive dashboard does. One more thing before we move on. Everything in this course assumed one project and one team. The next course is about what changes when that stops being true.",
}
