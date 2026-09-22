import type { Section } from '../types'

export const seedsSection: Section = {
  id: 'seeds',
  title: 'Seeds — a CSV in the repo',
  scene: 'seeds',
  slide: `## Small, static, and version-controlled

Drop a CSV in \`seeds/\`, run \`dbt seed\`, and it becomes a table you can \`ref()\` like any model.

### Three questions. All three must be yes.
- **Is it small?** Hundreds of rows. It is loaded row by row from a text file
- **Does it rarely change?** Edited by a person, in a pull request
- **Is it safe to commit?** It is going into git history, permanently. No customer data, ever

### What seeds are genuinely for
Country and currency codes. A mapping from an account id to a sales region. Status-code lookups. The little tables that live in somebody's head, or worse, in a spreadsheet on their laptop.

### The trap
A seed is **not an ingestion path**. If the answer to "where does this data come from" is a system, it needs a loader and a source — not a CSV somebody re-exports by hand each month.`,
  narration:
    "Seeds are the simplest thing in dbt. Put a CSV file in the seeds folder, run dbt seed, and dbt creates a table from it. From then on it is a node in your project like any other — you ref it, it shows up in the lineage graph, you can test it and document it. Before you use one, three questions, and all three have to be yes. Is it small? Seeds are loaded by generating insert statements from a text file, so hundreds of rows is comfortable, thousands is pushing it, and a million rows is absolutely the wrong tool. Does it rarely change? The natural way to edit a seed is a pull request, so it suits data that a person changes deliberately, a few times a year. And is it safe to commit? This file is going into git history, permanently, on every laptop that clones the repo. No customer data, no anything you would mind seeing in a public repository by accident. What are they genuinely for? The little reference tables that otherwise live in somebody's head, or in a spreadsheet on their laptop. Country and currency codes. The mapping from account id to sales region. Status code lookups that translate a cryptic number into an English word. Putting those in the repo means they are reviewed, versioned, and available to every model — rather than being pasted into a case statement in four different places. And now the trap, because it is a common one. A seed is not an ingestion path. If the answer to where does this data come from is another system, then it needs a real loader and a source declaration. A seed that somebody re-exports by hand every month is a manual process wearing a dbt costume, and it will be stale at exactly the wrong moment.",
}
