import type { Section } from '../types'

export const sourceSection: Section = {
  id: 'source',
  title: 'source() — where the graph starts',
  scene: 'source-declaration',
  slide: `## Declare the raw tables you did not build

\`ref()\` is for models. Raw tables — whatever your loader dropped into the warehouse — are declared in yml and reached with \`source()\`.

\`\`\`sql
from {{ source('raw', 'orders') }}
\`\`\`

### Two arguments
The **source name** (\`raw\`) and the **table name** (\`orders\`). The yml maps that pair to a real database and schema.

### What the declaration buys
- **Lineage that starts outside your project** — the graph reaches back to where data landed
- **One place to change** — the loader moves schema, you edit one file, not forty models
- **Freshness and tests on raw data** — checked before your models run

### The convention
Sources are read **exactly once**, by their staging model. Nothing else in the project calls \`source()\`.`,
  narration:
    "So ref is how you reach something this project built. But every project starts with tables it did not build — whatever your ingestion tool dropped into the warehouse. Those are sources, and they get declared in a yml file. The declaration is small: a source name, the database and schema it really lives in, and a list of tables. Then, in your model, you write source with two arguments — the source name and the table name — and dbt resolves it to the real location. Now, the honest question: why bother? You could type the raw table name directly. It is not built by this project, so none of the ref arguments apply. Three reasons. First, lineage. A declared source appears in the graph, which means your lineage reaches past your own models to where the data actually landed. When someone asks where does this number come from, the answer goes all the way back. Second, one place to change. Ingestion tools move things — a schema gets renamed, a database gets consolidated, you migrate loaders. If forty models have that location typed into them, that is forty edits. If they all call source, it is one file. Third, sources can be tested and checked for freshness, which means you can catch a broken pipeline before your models run on top of stale data and quietly publish yesterday's numbers. There is a proper course on that later. One convention to adopt now. A source should be read exactly once, by its staging model, and nowhere else. If two models both call source on the same table, you have two places where raw column names leak into your project — and the next rename breaks both of them.",
}
