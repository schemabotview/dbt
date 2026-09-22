import type { Section } from '../types'

export const theFourGenericTests: Section = {
  id: 'the-four-generic-tests',
  title: 'The four built-in tests',
  scene: 'four-tests',
  slide: `## What each one really catches

- **\`unique\`** — a value appears twice. Catches **a join that fans out** and silently doubles your revenue number
- **\`not_null\`** — a value is missing. Catches rows that a later inner join will quietly drop
- **\`accepted_values\`** — a value is off the list. Catches **a new status nobody told you about**, before your \`CASE\` statement lumps it into "other"
- **\`relationships\`** — a key has no matching parent. Catches orphans: the classic silent row loss

### Two take arguments
\`accepted_values\` needs a list; \`relationships\` needs a model and a field. Both are written as a nested block rather than a bare name.

### The starting set
**\`unique\` and \`not_null\` on every primary key, in every model, from day one.** It costs two lines per model and catches the two most common ways a warehouse goes quietly wrong.`,
  narration:
    "Four tests ship with dbt, and the useful way to learn them is not by name but by the bug each one catches. Unique fails when a value appears more than once. The bug it catches is a join that fans out. You join orders to a customer table that has two rows for a customer, and now every order appears twice, and your revenue number is double. Nothing errors. The query is valid. A unique test on that customer key is what tells you. Not_null fails when a value is missing. The bug there is subtler: a null key does not cause an error, it causes rows to vanish at the next inner join. You lose four percent of your orders and the dashboard just shows a slightly smaller number than it should. Accepted_values fails when a value is outside a list you provide. This catches the day somebody adds a new status in the source system and does not tell you. Your case statement has branches for pending, shipped and returned, and everything else falls into an else. So the new status silently becomes other, and the numbers are wrong in a way that looks plausible. Relationships fails when a key has no matching parent — orphans. It is the most skipped of the four and one of the most valuable, because orphan rows are exactly what a join drops without complaint. Two of them take arguments: accepted_values needs its list, relationships needs a model and a field, and both are written as a nested block instead of a bare name. And if you take one habit from this whole course, take this one. Unique and not_null on every primary key, in every model, from day one. Two lines per model, and they catch the two most common ways a warehouse goes quietly wrong.",
}
