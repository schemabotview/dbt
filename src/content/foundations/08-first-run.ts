import type { Section } from '../types'

export const firstRun: Section = {
  id: 'first-run',
  title: 'Your first run, end to end',
  scene: 'run-lifecycle',
  slide: `## What happens between Enter and a table

### 1 · Parse
Every file in the project is read — models, yml, macros — into one object graph: **\`manifest.json\`**. Bad Jinja or a missing \`ref\` target fails here, before anything is sent.

### 2 · Graph
\`ref()\` calls become edges. dbt now knows every model's parents, and therefore a legal build order.

### 3 · Compile
Jinja is rendered away. \`ref()\` becomes a real \`database.schema.table\` **for this target**, and the result is written to \`target/compiled/\`.

### 4 · Execute
The statements go to the warehouse, in dependency order, \`threads\` at a time. A model waits only for its own parents — not for everything ahead of it.

### The output you read
\`\`\`
1 of 4 OK created view model stg_orders [0.63s]
\`\`\``,
  narration:
    "Let's follow a single dbt run from the moment you press Enter. Phase one is parse. dbt reads every file in the project — every model, every yml file, every macro — and builds one big object graph out of them, which it writes to disk as manifest dot json. A lot can fail here, and failing here is good news: broken Jinja, a ref pointing at a model that does not exist, a yml file describing a column on a model that never declares it. None of that has touched your warehouse yet. Phase two is graph construction. dbt walks every ref call it found and turns them into edges. Now it knows each model's parents, and therefore a legal order to build them in — and, just as importantly, which models have nothing to do with each other and can be built at the same time. Phase three is compile. Every piece of Jinja is rendered away until what remains is plain SQL your warehouse would accept. The ref calls become real, fully-qualified table names, resolved for the target you are running against — which is exactly why the same file can build into your sandbox or into production. The compiled SQL is written into the target directory, and we will come straight back to that in the next section. Phase four is execute. dbt opens its connections and sends the statements, in dependency order, as many at a time as your threads setting allows. Each model waits only for its own parents, not for everything ahead of it in the list. As it goes, it prints a line per model — one of four, OK, created, and the time it took — and when it finishes, it leaves behind the objects in your warehouse, a full log of every statement it sent, and a machine-readable record of the run called run underscore results dot json.",
}
