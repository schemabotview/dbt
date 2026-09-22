import type { Section } from '../types'

export const savedQueriesAndConsumption: Section = {
  id: 'saved-queries-and-consumption',
  title: 'Saved queries & consumption',
  scene: 'saved-queries',
  slide: `## A metric nobody can reach is worth nothing

A **saved query** is a question shape, declared once: these metrics, grouped these ways.

\`\`\`yaml
saved_queries:
  - name: weekly_revenue
    query_params:
      metrics: [revenue, refund_rate]
      group_by: ["metric_time__week"]
\`\`\`

### Three ways in, one definition
A BI tool treats the layer as a source. A notebook uses the Python or JDBC client. Anything else goes through the GraphQL API.

### All three compile to SQL
Against **your** warehouse, with **your** definition. No consumer re-implements the metric, and none of them caches a stale copy of it.

### The one that matters most
Whichever tool your analysts already open.`,
  narration:
    "A definition that only exists in a yml file has not helped anybody yet. It has to reach the person asking the question, and that is what this section is about. The first piece is a saved query, which is a question shape declared once: these metrics, grouped along these dimensions. Weekly revenue and refund rate, by week. It is the pre-agreed shape of a question that gets asked over and over, and putting it in the project means the shape gets reviewed like everything else. Then there are three ways that question actually gets asked. A business intelligence tool can treat the semantic layer as a source, so the metric shows up in the tool's own field picker and an analyst drags it onto a chart without knowing any of this exists. A notebook can use the Python client or connect over JDBC, which is the data scientist's path. And anything else at all can go through the GraphQL API — an internal app, a scheduled export, a script somebody wrote on a Friday. Now the crucial property, and it is the whole reason this is worth doing: all three of those compile down to one SQL query, run against your warehouse, using your definition. Not a copy of it, not an export of it, not a cached extract that was right last Tuesday. The BI tool does not re-implement revenue in its own formula language. The notebook does not paste in someone's SQL. They all ask the same layer the same question. And if you are deciding where to start, the answer is boring: whichever tool your analysts already open every morning.",
}
