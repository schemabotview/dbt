import type { Section } from '../types'

export const access: Section = {
  id: 'access',
  title: 'access — who may ref this',
  scene: 'access-levels',
  slide: `## Three answers to one question

- **\`private\`** — only its **own group**. An intermediate step, nobody else's business
- **\`protected\`** — anything in **this project**. The default
- **\`public\`** — **any project**. A deliberate, supported interface

### The default is \`protected\`, not \`public\`
Which matters the first time you try a cross-project reference and dbt refuses. Public is something you **opt into**, deliberately.

### \`public\` is a promise, not a label
It invites other people to build on it, so it needs what makes that safe: **a contract**, so the shape cannot drift, and **a version**, so a breaking change has a procedure.

### Where private earns its keep
It stops an intermediate model somebody found in the docs from quietly becoming load-bearing.`,
  narration:
    "Access answers one question: who is allowed to ref this model? There are three answers. Private means only models in its own group. That is for the intermediate step that exists to keep a mart readable and is nobody else's business. Protected means anything in this project, and it is the default — internal, but shared freely within the team. And public means any project, including somebody else's, which makes it a deliberate, supported interface. Two things worth knowing. First, the default is protected, not public. That matters the first time you try a cross-project reference and dbt refuses — the model has to be explicitly marked public before anything outside its own project can touch it. Public is something you opt into. Second, and more important: public is a promise, not a label. Marking a model public is an invitation for other people to build on it, and that invitation comes with obligations. It needs a contract, so the shape cannot drift underneath its consumers. It needs a version, so that when you eventually do need to break it, there is a procedure rather than an incident. Both of those are coming up in the next section. If you mark something public without them, you have made a promise you have no way to keep. And where does private actually earn its keep? It stops the accident. Somebody finds an intermediate model in the docs, notices it has exactly the columns they need, refs it, and now a step you wrote as scaffolding is load-bearing for a dashboard you have never seen. Private makes that impossible rather than discouraged.",
}
