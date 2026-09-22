import type { Section } from '../types'

export const aTestIsASelect: Section = {
  id: 'a-test-is-a-select',
  title: 'A test is a SELECT',
  scene: 'test-select',
  slide: `## Zero rows is a pass

There is no assertion language in dbt and no second runtime. **A test is a query that should return nothing.**

\`\`\`sql
select order_id from stg_orders
where order_id is null
\`\`\`

Return zero rows and the test passes. Return any rows, and **those rows are the failure** — not a count, not a boolean, the actual offending records.

### Why that design pays off
When a test fails you are not told "something is wrong with order_id". You are handed the exact rows, in SQL you can copy into a console and investigate immediately.

### \`data_tests:\` and \`tests:\`
Recent dbt spells the yml key \`data_tests:\`, to distinguish data tests from the unit tests later in this course. Older projects say \`tests:\` — still accepted, and the same thing.`,
  narration:
    "Testing in dbt is smaller than you expect, and that is the good news. There is no assertion language, no expect-dot-to-dot-equal, and no second runtime. A test is a query that should return nothing. Look at the two cards. On the left is what you write: a model name, a column, and the word not_null. On the right is what dbt actually compiles and runs: select order_id from the table, where order_id is null. That is the entire test. If the query returns zero rows, everything is fine and the test passes. If it returns rows, the test fails — and here is the part that makes this design worth having. The rows it returned are the failure. Not a count, not a true-or-false, not a message. The actual offending records. So when a test fails, you are not told that something is wrong with order_id somewhere. You are handed the twelve rows where it is null, in a query you can paste straight into a warehouse console and dig into. That shortens the distance between a red build and an actual answer more than any amount of tooling. It also means a test is inspectable. Every built-in test is just a macro that returns SQL, and you can read that SQL — in the compiled output, exactly where we found compiled models earlier. Nothing here is magic. One vocabulary note before we go on. Recent versions of dbt spell the yml key data_tests, to keep data tests distinct from the unit tests we will meet later in this course. Plenty of projects and tutorials still say tests, which is accepted and means the same thing. You will see both.",
}
