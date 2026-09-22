import type { Section } from '../types'

export const modelVersionsSection: Section = {
  id: 'model-versions',
  title: 'Model versions',
  scene: 'model-versions',
  slide: `## Breaking a contract without breaking people

A contract stops the shape drifting by accident. Versions are how you change it **on purpose.**

\`\`\`yaml
- name: fct_orders
  latest_version: 2
  versions:
    - v: 1
      deprecation_date: 2026-12-01
    - v: 2
\`\`\`

Both exist at once. Consumers pin with \`ref('fct_orders', v=1)\` and migrate **on their own schedule.**

### The deprecation date does the chasing
Until it arrives, every run referencing v1 warns — loudly, in somebody else's CI, with a date attached.

### An unpinned \`ref\` moves on its own
A ref with no version follows \`latest_version\`, so a consumer who never pinned is **upgraded the day you ship v2.** Tell people to pin.`,
  narration:
    "Contracts stop a model's shape from drifting by accident. Versions are how you change it on purpose, which is a different problem. Here is the situation. Your mart is public, three other teams build on it, and you need to remove a column. Without versions, your options are: break them and apologise, or never change anything. Neither is good. With versions, both shapes exist at the same time. You declare version one and version two in yml, say which is latest, and dbt builds both. Consumers pin to whichever they are ready for, with a version argument on their ref. They migrate on their own schedule, not on yours. Then the deprecation date does the chasing for you. Set a date on version one, and from then until the date, every run that references it prints a warning — loudly, in somebody else's continuous integration, with a specific date attached. That is a far better conversation than a surprise break: nobody has to remember to chase anyone, and the warning arrives where the work is, rather than in a message that gets scrolled past. Now the sharp edge, which is worth saying plainly. A ref with no version follows latest version. That is convenient, and it means a consumer who never bothered to pin gets upgraded the moment you ship version two. If your consumers are inside your own project, that may be exactly what you want. If they are another team, tell them to pin — or accept that they will move when you do, whether they were ready or not. And a pairing to remember: a public model wants a contract and versions together. The contract says what the shape is, and the version is how the shape is allowed to change.",
}
