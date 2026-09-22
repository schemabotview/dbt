import type { Section } from '../types'

export const storeFailuresSection: Section = {
  id: 'store-failures',
  title: 'store_failures',
  scene: 'store-failures',
  slide: `## Keep the rows, not just the count

By default a failure is a number in a log: \`FAIL 43\`. The log scrolls, the run ends, and the 43 rows are gone.

\`\`\`yaml
config:
  store_failures: true
\`\`\`

With it on, each failing test writes its rows to **a real table** in a \`dbt_test__audit\` schema. You can query it, join it back to the model for context, and it is still there tomorrow morning when somebody finally looks.

### Why this matters more than it sounds
The gap between "a test failed overnight" and "here are the twelve customers with no region" is usually **the whole investigation**. This closes it.

### Switch it on deliberately
It writes a table per failing test, and those tables are overwritten on the next run. Turn it on for the tests you genuinely investigate — not for all four hundred.`,
  narration:
    "A small feature with a disproportionate effect on how much testing actually helps you. By default, when a test fails, what you get is a number: FAIL, forty-three. The run ends, the log scrolls away, and those forty-three rows are gone. Tomorrow morning somebody reads the alert and the only way to see what was wrong is to run the test again and hope the data still looks the same — which, for anything involving a nightly load, it often does not. Store failures changes that. Switch it on, and every failing test writes its failing rows into a real table, in a dedicated audit schema. Now you can query them. You can join them back to the model to get context — not just the twelve null customer ids, but who those customers are and when they were created. And the rows are still there when somebody actually gets to it, rather than only during the minute the test ran. The reason this matters more than it sounds is that the gap between a test failed overnight and here are the twelve customers with no region is usually the entire investigation. Everything else — noticing, triaging, deciding whether it is urgent — depends on being able to look at the rows. Two practical notes. Switch it on deliberately rather than everywhere. It writes a table for every failing test, so a project with four hundred tests having a bad day creates a lot of small tables. Put it on the tests you genuinely investigate. And know that those tables are overwritten on the next run, so they are a debugging aid, not a history. If you need a record over time, that is a model reading from them, not this feature.",
}
