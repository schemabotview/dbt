import type { Section } from '../types'

export const sqlThatWritesSql: Section = {
  id: 'sql-that-writes-sql',
  title: 'SQL that writes SQL',
  scene: 'jinja-basics',
  slide: `## Jinja, in five minutes

You have been using it since your first \`ref()\`. Jinja is a templating language that runs **before** your SQL reaches the warehouse.

- **\`{{ ... }}\`** — evaluate this, and print the result
- **\`{% ... %}\`** — do something (a loop, an if, a variable), print nothing
- **\`{# ... #}\`** — a comment that never reaches the compiled file

### The one rule that explains everything
**It is string templating at compile time.** Jinja does not know SQL, does not know your schema, and cannot see your data. It builds a string; the warehouse runs it.

That is why Jinja errors happen before any query does — and why the compiled file is always the answer to "what did it actually do?"

### Why it arrives now
Everything in the last four courses was deliberately teachable without it. You reach for Jinja when you have felt the repetition — **not before.**`,
  narration:
    "You have been writing Jinja since your very first model. Every ref call, every source call, every config block — all of it is Jinja. This course is about what else it can do, and just as importantly, when to stop. Jinja is a templating language. It has three delimiters and you need all three. Double curly braces mean evaluate this expression and print the result — that is your refs and your variables. Curly-brace-percent means do something without printing: a loop, an if statement, setting a variable. And curly-brace-hash is a comment that disappears entirely; it never reaches the compiled file, which makes it the right way to leave a note for the next person without cluttering what the warehouse sees. Now the one rule that explains every surprise you will ever have with Jinja. It is string templating, and it runs at compile time. Jinja does not know SQL. It does not know your schema. It cannot see a single row of your data. All it does is build a string, and then dbt hands that string to the warehouse. Look at the example. A list, a loop, a ref — and by the time the warehouse sees anything, all of it is gone. There is just a select with three expressions in it. That rule is why Jinja errors always happen before any query runs, and it is why the compiled file, which you met in the very first course, is always the answer to what did it actually do. One note on why this course arrives here rather than earlier. Everything in the last four courses was deliberately teachable without Jinja, and that was on purpose. It is the thing people reach for far too early. You want it once you have actually felt the repetition — not before.",
}
