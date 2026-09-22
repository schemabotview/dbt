import type { Section } from '../types'

export const build: Section = {
  id: 'build',
  title: 'dbt build',
  scene: 'build-order',
  slide: `## Test each model the moment it is built

\`dbt run\` then \`dbt test\` builds **everything**, including marts sitting on top of a broken staging model, and finds out at the end. By then the wrong numbers are already queryable.

\`dbt build\` interleaves, in DAG order:

1. Build \`stg_orders\`
2. Run its tests **immediately**
3. They fail → its children are **skipped**

### Skipped, not failed
A skipped model was never built, so yesterday's version is still there — **stale, but correct**. That is almost always the better failure: a number that is a day old beats a number that is wrong.

### And it covers everything
Seeds, snapshots, models, data tests and unit tests, in one command, in one order. It is what a production job should run.

### Selection still applies
\`dbt build --select stg_orders+\` builds that model, its children, and all of their tests.`,
  narration:
    "Let's close the course on a command you have seen mentioned and now have the context for. The obvious way to run a project is dbt run, then dbt test. Build everything, then check everything. And the tests in that arrangement are perfectly good tests — they just run too late to protect anything. Think about what happens when a staging model is broken. Dbt run builds it, then builds the intermediate model on top of it, then the mart on top of that, then finishes. Now dbt test runs, and tells you the staging model is wrong. But the mart has already been replaced. It is already sitting in production, already being queried, already wrong. The test found the problem and prevented nothing. Dbt build interleaves instead. It walks the graph and, for each node, builds it and then immediately runs the tests that belong to it, before anything downstream is touched. So staging is built, its tests run right there, they fail — and its children are skipped. And that word matters. Skipped is not failed. A skipped model was never built, which means yesterday's version of it is still sitting in the warehouse. Stale, but correct. That is nearly always the better failure: a number that is a day old is recoverable, and a number that is confidently wrong is not. Build also covers everything in one command and one order — seeds, snapshots, models, data tests and unit tests, all interleaved by the graph. It is what a production job should run, rather than a sequence of four commands with their own failure modes. And selection works exactly as before: build with a select of stg_orders plus gives you that model, everything downstream of it, and all of their tests.",
}
