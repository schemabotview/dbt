import type { Section } from '../types'

export const unitTests: Section = {
  id: 'unit-tests',
  title: 'Unit tests',
  scene: 'unit-test',
  slide: `## Fixed inputs in, one expected output

A data test asks **is the data right?** A unit test asks **is the logic right?**

\`\`\`yaml
- name: refunds_are_negative
  model: fct_order_totals
  given:
    - input: ref('stg_payments')
      rows:
        - {kind: sale,   amount: 100}
        - {kind: refund, amount: 30}
  expect:
    rows: [{net_total: 70}]
\`\`\`

### What nothing else catches
A \`CASE\` that misclassifies a zero. A window frame that is wrong. **Every row is present, unique and not null — the answer is just wrong.**

### They miss different bugs
Unit tests need no warehouse data and run in CI; data tests need real rows and run in production.`,
  narration:
    "Everything so far tests data. A unit test tests logic, and the difference matters. Look at the example. You declare a model, you hand it rows you invented for its inputs, and you state the output you expect. dbt runs the model's SQL against those invented rows and compares. No real data is involved; the model does not even have to be built. Now, why would you want that? Because there is a whole class of bug that data tests structurally cannot catch. Imagine a case statement that classifies payments, and it handles positive and negative amounts but treats a zero as a sale rather than skipping it. Every row in the output is present. Every key is unique and not null. Every value is in its accepted list. The relationships all hold. And the number is wrong. There is nothing for a data test to grab onto, because the data is perfectly well-formed — it is just the wrong answer. The same is true of a window function with the wrong frame, or a date rule that is off by one at a month boundary. Those are logic bugs, and you catch them by stating what the logic should do. And because a unit test invents its inputs, you can test the case that never happens in your sample data. The refund larger than the order. The customer with no region. The order at exactly midnight on the last day of the month. You do not have to wait for reality to produce it. The two kinds are complements, not competitors. Unit tests need no warehouse data, run fast, and belong in continuous integration on every pull request. Data tests need real current rows, and belong in your production runs. Neither one finds the other's bugs. Reach for a unit test when the SQL is clever — a case with five branches, a window function, anything with an edge case you cannot produce on demand.",
}
