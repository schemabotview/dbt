import type { Section } from '../types'

export const contractsSection: Section = {
  id: 'contracts',
  title: 'Contracts',
  scene: 'contracts',
  slide: `## Promise a shape, and have it checked

\`\`\`yaml
config:
  contract: {enforced: true}
columns:
  - name: order_id
    data_type: integer
    constraints: [{type: not_null}]
\`\`\`

dbt checks the model's output against this declaration **before replacing the existing object**. A widened type, a dropped column, a rename — the build fails instead of shipping.

### They fail at different moments
A test runs **after** the build: the data is wrong. A contract fails **at build time**: the shape is wrong.

### Be precise
\`data_type\` is checked by dbt everywhere; \`not_null\` usually by the warehouse. **\`primary_key\` and \`unique\` are often declared and never enforced** — keep the \`unique\` test too.`,
  narration:
    "A contract is a different kind of guarantee from a test, and the difference is when it fails. Here is the situation it is for. Your mart is read by three dashboards and another team's dbt project. You change a column from an integer to a string, for a perfectly good reason. dbt builds it happily, because dbt does not care what type a column is. The object is replaced. And then three dashboards break, and you find out from a person rather than from a build. With a contract enforced, you declare every column and its type in yml, and dbt checks the model's actual output against that declaration before it replaces anything. Widen a type, drop a column, rename one, change the order — the build fails, and the existing object is untouched. The breakage happens in your pull request instead of in somebody's morning. Notice how that differs from a test. A test runs after the model is built and tells you the data is wrong. A contract fails at build time and tells you the shape is wrong. They protect against different things and neither replaces the other. Now the part to be precise about, because it is easy to believe you have guarantees you do not have. Data type is checked by dbt itself, on every platform — that one always works. Not_null is usually pushed down to the warehouse and genuinely enforced. But primary key and unique constraints are, on a lot of warehouses, accepted and then not enforced at all — the warehouse records the declaration and never checks it. Snowflake is a well-known example. So declare them, because they document intent and some tools read them, but keep the unique test as well. The declaration says what you meant. The test is what actually checks.",
}
