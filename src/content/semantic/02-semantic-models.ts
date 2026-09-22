import type { Section } from '../types'

export const semanticModels: Section = {
  id: 'semantic-models',
  title: 'Semantic models',
  scene: 'semantic-model-anatomy',
  slide: `## A layer of meaning over a mart

A semantic model points at a model you already built and says what its columns **mean**.

- **Entities** — the join keys. \`primary\`, \`foreign\`, and how two models meet
- **Dimensions** — what you group by. \`time\` and \`categorical\`
- **Measures** — what you aggregate. A column plus an \`agg\`

### It builds nothing
No table, no view, no SQL at run time. \`dbt run\` is unaffected — this is metadata, and the mart underneath it is doing all the real work.

### Which marts deserve one
The ones people ask questions of. A staging model has no business here; \`fct_orders\` does.

### Where it runs
The definitions are open source and live in your project. The **hosted APIs** that serve them to BI tools are the dbt platform.`,
  narration:
    "So how do you write a definition down? You start with a semantic model, and the important thing about it is that it is a layer of meaning over a mart you have already built. It does not replace your models and it does not build anything. It points at an existing model and describes what its columns mean. There are three parts, and between them they are the whole idea. Entities are the join keys — which column is this model's primary key, and which columns are foreign keys pointing at other models. That is what lets the layer join across models without anybody hand-writing the join. Dimensions are the things you group by: time dimensions like the date an order was placed, and categorical ones like the channel it came through. And measures are the things you aggregate — a column, plus how to aggregate it, usually a sum or a count or an average. Declare those three things over a mart and you have told the system enough for it to answer questions you never explicitly wrote a query for. Now the part people get wrong on first contact: a semantic model builds nothing. There is no object in the warehouse afterwards. Running your project is completely unaffected by it, because this is metadata — the mart underneath is still doing every bit of the actual work. And you do not need one for every model. Staging models have no business here. The marts that people ask questions of are the ones that earn a semantic model. One last thing worth being straight about: the definitions themselves are open source and live in your project, but the hosted APIs that serve them out to BI tools are part of the dbt platform.",
}
