import type { Section } from '../types'

export const devAndProd: Section = {
  id: 'dev-and-prod',
  title: 'Dev, CI and prod',
  scene: 'environments',
  slide: `## Same project, three ways to run it

You already know the mechanism — one profile, several targets. What changes between environments is **operational, never logical.**

- **dev** — a person, ad hoc, into their own schema, with their own credentials
- **CI** — a pull request, into a throwaway schema, building only what changed
- **prod** — a schedule, into the schema everyone reads, on a service account

### What is identical
The same commit. The same models. The same tests. The same command. If any of those differ between environments, you are testing something other than what you ship.

### Nobody runs production as themselves
Production uses a **service account**. Audit trails stay meaningful, and **a leaver does not take the pipeline with them.**

### The practical shape
\`dbt build --target prod\` is the whole of "deploying dbt". Everything in this course is about the machinery around that one line.`,
  narration:
    "You met profiles and targets right at the start of this concept, as a file. This course is about what they mean operationally. Three environments. Development is a person, running ad hoc, into their own schema, with their own credentials, building whatever they happen to be working on. Continuous integration is triggered by a pull request, builds into a throwaway schema, and — as we will see — usually builds only what actually changed. Production is a schedule, building into the schema everybody reads, running as a service account. Here is the important part: the differences between those three are entirely operational. Who triggers it, where it lands, whose credentials, how much of the graph. What does not differ is the code. The same commit, the same models, the same tests, the same command. If any of those differ between environments, you have quietly arranged to test something other than the thing you ship — which is the failure mode we talked about when I warned you off branching on target dot name. And one rule worth enforcing early, because retrofitting it is miserable. Nobody runs production as themselves. Production uses a service account with its own credentials and its own permissions. Two reasons. The obvious one is auditing — when you look at query history you want to see which pipeline ran something, not which employee happened to set up the cron job. The one that actually bites is people leaving. If the nightly build runs under Alice's credentials and Alice leaves, the pipeline dies with her account, at three in the morning, and whoever is on call has to work out why. The practical shape of all this is a single command: dbt build, against the prod target. Everything else in this course is the machinery around that one line.",
}
