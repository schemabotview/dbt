import type { Section } from '../types'

export const testPackagesSection: Section = {
  id: 'test-packages',
  title: 'Test packages',
  scene: 'test-packages',
  slide: `## The tests you would otherwise write twice

\`\`\`yaml
packages:
  - package: dbt-labs/dbt_utils
    version: [">=1.3.0", "<2.0.0"]
\`\`\`
\`dbt deps\` installs it. Its tests are then usable as \`dbt_utils.<name>\`.

### Worth knowing by name
- **\`unique_combination_of_columns\`** — two columns unique **together**, which \`unique\` cannot express
- **\`accepted_range\`** — a number inside sane bounds
- **\`not_null_proportion\`** — at least x% populated, for columns that are legitimately sparse
- **\`equal_rowcount\`** — two models agree on row count: the cheapest refactor check
- **\`recency\`** — the newest row is not older than n days
- **\`expression_is_true\`** — any SQL expression, per row

### And a second package
\`dbt_expectations\` ports the Great Expectations vocabulary — distributions, string patterns, column types. Reach for it when \`dbt_utils\` runs out.`,
  narration:
    "Before you write another custom test, check whether somebody has already written it. Dbt_utils is a package maintained by dbt Labs, it is in almost every real project, and a good half of it is tests. Installing is two things: a block in packages dot yml naming the package and a version range, then dbt deps to fetch it. After that its tests are available with a package prefix, and you use them exactly like the built-ins. Six worth knowing by name. Unique_combination_of_columns asserts that two or more columns are unique together — order id plus line number, say. Plain unique cannot express that, and this is the single most common reason people write a custom test that already exists. Accepted_range keeps a number inside sane bounds, which catches the negative quantity and the order for eleven million pounds. Not_null_proportion asserts that at least some percentage of rows have a value, which is the right test for a column that is legitimately sparse — you do not want not_null, you want most of them. Equal_rowcount compares two models, and it is the cheapest possible did-my-refactor-change-anything check: build the new model beside the old one and assert they have the same number of rows. Recency asserts that the newest row is not older than some number of days, which is a freshness check on a model rather than a source. And expression_is_true takes any SQL expression and asserts it per row, which honestly replaces about half the singular tests people write by hand. There is a second package worth knowing, dbt_expectations, which ports the vocabulary from Great Expectations — distributions, string patterns, column types. Reach for it when dbt_utils runs out. One operational point, though: a package is a dependency like any other. Pin the version range, commit the file, and make sure your CI runs dbt deps, or the build fails on a machine that has never fetched it.",
}
