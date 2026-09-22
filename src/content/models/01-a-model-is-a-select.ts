import type { Section } from '../types'

export const aModelIsASelect: Section = {
  id: 'a-model-is-a-select',
  title: 'A model is a SELECT',
  scene: 'model-file',
  slide: `## The file is the unit

One \`.sql\` file in \`models/\` is one model, and one model is one object in your warehouse. **The filename becomes the object name** — nothing inside the file names it.

### What goes in the file
Exactly one \`SELECT\`. Not a script, not a batch, not a procedure — a single query describing the rows you want.

### What must not
- **No \`CREATE\` / \`DROP\` / \`INSERT\`** — dbt writes the DDL around your query
- **No trailing semicolon** — your SQL gets wrapped in \`create … as (…)\`, and the semicolon lands in the middle of it
- **No \`BEGIN\` / \`COMMIT\`** — dbt owns the session and the transaction

### The habit this forces
A model file is always runnable on its own. Paste it into a console, and it returns the rows the table will contain.`,
  narration:
    "Now that you know what dbt is, let's build with it. The unit of work in dbt is a file. One dot-sql file inside the models folder is one model, and one model becomes one object in your warehouse — a table or a view. And here is the first thing to internalise: the filename becomes the object name. A file called stg_customers dot sql builds an object called stg_customers. Nothing inside the file names it. That is why renaming a model is renaming a file, and why two models can never share a name anywhere in the project. What goes in the file is exactly one SELECT statement. Not a script, not a sequence of statements, not a procedure — one query, describing the rows you want the object to contain. Three things must not go in. No create, drop or insert: dbt writes all of that around your query, and if you write it yourself you will end up with a create inside a create. No trailing semicolon, and this one catches nearly everybody — your SQL gets wrapped in create-or-replace-table-as-open-bracket, your query, close bracket. A semicolon in the middle of that is a syntax error, and the message you get back will not obviously point at it. And no begin or commit: dbt owns the connection and the transaction. Notice the habit this forces on you, because it is the good part. A model file is always independently runnable. You can copy any model out of your project, paste it into a warehouse console, and it will return exactly the rows that model builds. There is no surrounding context you need to reconstruct — which is what makes debugging a dbt project so much more pleasant than debugging a pile of stored procedures.",
}
