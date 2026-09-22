import type { Section } from '../types'

export const exposuresSection: Section = {
  id: 'exposures',
  title: 'Exposures',
  scene: 'exposures',
  slide: `## The DAG usually stops too early

dbt knows every model and source, and **nothing** about the dashboard the CFO opens every morning — in practice the most important node in the graph. An **exposure** declares it.

\`\`\`yaml
exposures:
  - name: exec_revenue
    type: dashboard
    url: https://bi.acme.com/d/17
    owner: {name: Priya Nair}
    depends_on: [ref('fct_orders')]
\`\`\`

### It builds nothing
It creates no object and runs no SQL — it records **a dependency and an owner**. That is enough to change three things.

- **Impact analysis reaches the end** — "what breaks if I change this?" gets a complete answer
- **It becomes selectable** — build everything that dashboard needs
- **There is a person to ask**, named, in the docs`,
  narration:
    "Your dbt project knows about every model and every source. It knows absolutely nothing about the dashboard the chief financial officer opens every morning — which is, in practice, the most important node in the entire graph. That gap has consequences. Somebody asks what breaks if I drop this column, and your lineage graph confidently shows you three downstream models and stops at the warehouse edge. It cannot tell you that the answer is also the executive revenue dashboard, and that is exactly the answer they needed. An exposure closes that gap. You declare it in yml: a name, a type — dashboard, notebook, machine learning model, application — a URL, an owner with an email, and what it depends on. And that is all. Now here is the thing to be clear about: an exposure builds nothing. It creates no object, runs no SQL, and costs nothing at build time. It records a dependency and an owner. But recording that changes three things. Impact analysis reaches the end of the line — the lineage graph now shows the dashboard, so the answer to what breaks is complete rather than nearly complete. It becomes selectable, so you can build everything that dashboard depends on with one flag, which is a rather good way to say make sure the CFO's report is fresh before the board meeting. And there is a named person with an email attached to it, which means when something upstream has to change, you know who to warn — rather than finding out who cared about it by breaking their morning.",
}
