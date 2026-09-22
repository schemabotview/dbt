import type { Section } from '../types'

export const theFusionEngine: Section = {
  id: 'the-fusion-engine',
  title: 'The Fusion engine',
  scene: 'fusion-engine',
  slide: `## The compiler never understood SQL

For most of dbt's life, compiling meant **string substitution**. \`ref\` became a table name, Jinja became text, and the result was handed to the warehouse unread.

That works. It also means dbt could not tell a valid query from a typo — **only the warehouse could**, mid-run, after you had paid for it.

### What a real parser changes
- **Errors while you type** — a misspelt column is caught before a credit is spent
- **Column-level lineage** — which field came from which field, not just which model
- **Faster parsing** — the difference is felt on projects with thousands of models

### What it does not change
Your models, your yml, your \`ref\` calls. Same project.

> Check the current engine docs for adapter support and maturity before you plan a migration.`,
  narration:
    "Here is something about dbt that surprises people when they first hear it: for most of the tool's life, the compiler did not understand SQL. Compiling a model meant string substitution. A ref call was replaced with a table name, the Jinja was evaluated into text, and the resulting block of characters was handed to the warehouse without dbt ever having parsed it as a query. And that works — it is how an enormous amount of production data engineering gets done. But it has one consequence that shapes the whole experience. If you misspell a column name, dbt cannot tell. It has no idea what a column is. It sends the text, the warehouse starts executing, and some number of seconds or minutes later the run fails with an error from the database. You found out after you had already paid for the compute. So what changes when the engine actually parses SQL and understands the schema underneath it? Three things. Errors move from run time to typing time — a misspelt column gets flagged in your editor before a single credit is spent. You get column-level lineage, which is to say not just that this model depends on that model, but that this field came from that field, which is what makes impact analysis genuinely precise. And parsing gets dramatically faster, which you feel most on large projects with thousands of models. What does not change is the part that matters for your anxiety: your models, your yml, and your ref calls are the same. It is the same project, read by a better reader. Engine support and maturity move quickly, so check the current documentation before you plan anything around it.",
}
