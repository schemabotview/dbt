import type { Section } from '../types'

export const dbtAndAi: Section = {
  id: 'dbt-and-ai',
  title: 'dbt and AI',
  scene: 'ai-surface',
  slide: `## Why a governed project is the moat

Point a language model at a raw warehouse and ask for revenue. It sees table names. It **guesses** a table, **guesses** a join, and returns a number that looks exactly as confident as a correct one.

### What your project adds
- **Descriptions** — what a column actually means
- **The lineage** — where a number came from
- **The tests** — whether it can be trusted
- **The metrics** — the definition, already agreed by humans

### Served over MCP
The dbt **MCP server** exposes that context to an assistant, so it queries your definitions instead of inventing its own.

### The honest version
This makes an assistant's answers **checkable**, not automatically correct. A governed project is what gives you something to check against.`,
  narration:
    "Everything in this concept has been pointed at humans so far — making the project legible to the analyst, the reviewer, the second team. There is now another consumer, and it changes the value of all that work. Picture pointing a language model straight at a raw warehouse and asking it what revenue was last quarter. What it sees is a list of table names and column names. So it guesses. It guesses which table holds orders, it guesses how to join it to customers, it guesses whether to subtract refunds — and it returns a number that looks exactly as confident as a correct one would. That is worse than no answer, because a wrong number with no uncertainty attached will end up in a board deck. Now ask the same question of a well-governed dbt project, and the situation is completely different, because four things are already there. Descriptions, so it knows what a column actually means rather than inferring from its name. The lineage, so it can say where a number came from. The tests, so there is a documented statement about whether the data can be trusted. And the metrics, so revenue is not something it has to derive at all — the definition already exists, agreed by humans, in version control. The dbt MCP server is what exposes that context to an assistant, so it queries your definitions instead of inventing its own. And here is the honest version of the claim, because this area attracts a lot of overselling: this does not make an assistant automatically correct. What it does is make the answers checkable. The assistant can tell you which metric it used and which models fed it, and you can go and look. A governed project is what gives you something to check against.",
}
