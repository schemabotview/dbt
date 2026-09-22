import type { Section } from '../types'

export const slimCiSection: Section = {
  id: 'slim-ci',
  title: 'Slim CI',
  scene: 'slim-ci',
  slide: `## The whole technique in one command

\`\`\`
dbt build --select state:modified+ \\
          --defer --state ./prod-artifacts \\
          --target ci
\`\`\`

**State** picks what to build; **defer** supplies everything else. A forty-minute full build becomes a four-minute one that tests exactly what changed.

### The life of a pull request
Open it → build what changed and its children → run their tests → **drop the schema** when it closes.

### Why this beats a linter
It builds real objects and runs real tests against real data. The reviewer is not reading SQL and hoping — the evidence is attached to the PR.

### Two things to get right
A **fresh schema per PR** (\`ci_pr_142\`), so two branches cannot collide — and **drop it afterwards**, or the warehouse fills with debris.`,
  narration:
    "Put state and defer together and you get what everybody calls slim CI. It is one command. Build, selecting state colon modified plus, with defer, pointing at your saved production artifacts, against the CI target. State decides what to build — what changed, and everything downstream of it. Defer supplies everything else from production. Between them, a forty-minute full build becomes a four-minute one that tests precisely what the pull request touched, and nothing it did not. The life of a pull request then looks like this. Somebody opens it having changed two models. CI builds those two, plus whatever depends on them. It runs their tests. The pull request goes green or red on real evidence. And when the branch closes, the schema it built into gets dropped. Now, why is this so much better than the obvious alternative of linting the SQL? Because it actually builds. Real objects, in a real warehouse, with real tests running against real data. The reviewer is not reading a diff and hoping that a join does what it looks like it does — the evidence is attached to the pull request. That changes code review from an act of imagination into an act of reading results. Two details to get right, because they are the ones people get wrong. Use a fresh schema per pull request, named after the pull request number, so that two people with open branches cannot overwrite each other's test builds and confuse everybody. And drop it when the branch closes — otherwise, within a few months, your warehouse contains the debris of every branch anybody has ever opened, which is both expensive and genuinely confusing to anyone browsing schemas.",
}
