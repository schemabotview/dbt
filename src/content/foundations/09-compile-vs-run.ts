import type { Section } from '../types'

export const compileVsRun: Section = {
  id: 'compile-vs-run',
  title: 'Compiled SQL — the debugging habit',
  scene: 'compiled-output',
  slide: `## The file you wrote is not the file that ran

Every compile writes the real SQL to disk. Opening it is the single most useful habit in your first month with dbt.

### Where to look
- \`target/compiled/…\` — your SELECT, Jinja resolved
- \`target/run/…\` — the same, inside its \`create\` wrapper
- \`logs/dbt.log\` — every statement as sent

### Render without building
\`dbt compile\` renders the whole project and builds **nothing**. Safe to run against production, any time.

### The trap
A warehouse error reports a line number in the **compiled** SQL. Your model has different lines — Jinja expands and contracts. Count lines in \`target/\`, never in your model.

### The habit
Something looks wrong? **Read the compiled file, then run that SQL in a warehouse console by hand.** It is either dbt's fault or your SQL's, and this tells you which in thirty seconds.`,
  narration:
    "This section is a habit rather than a feature, and it is the habit that separates people who enjoy dbt from people who fight it. The file you write is not the file that runs. Your model contains Jinja — ref calls, config blocks, maybe a loop — and none of that is SQL. Before anything reaches the warehouse, dbt renders all of it away, and the result is written to disk, in the target directory, whether or not the run succeeded. There are two versions there and both are useful. Under target slash compiled is your SELECT with the Jinja resolved — the clean, readable version of what you meant. Under target slash run is the same query wrapped in the actual create statement dbt executed. And the log file holds every statement as sent, with timing attached. You can produce all of that without building anything by running dbt compile, which renders the project and stops. It is completely safe, even against production. Now the trap, and it catches everyone exactly once. When your warehouse rejects a query, it reports a line number — and that line number refers to the compiled SQL, not to the file you were editing. Jinja expands and contracts, so the line numbers do not line up, sometimes by a lot. Counting lines in your model file to find the error is a genuinely wasted afternoon. So here is the habit. Something looks wrong — wrong numbers, a strange error, a model that builds but is empty. Open the compiled file. Read it as SQL, because that is now all it is. Then copy it into a warehouse console and run it by hand. Within thirty seconds you will know whether the problem is your SQL or the way dbt assembled it, and those are two very different fixes.",
}
