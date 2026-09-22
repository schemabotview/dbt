import type { Section } from '../types'

export const metricsSection: Section = {
  id: 'metrics',
  title: 'Metrics',
  scene: 'metric-types',
  slide: `## Four kinds, each built on the last

| type | Built on |
|---|---|
| \`simple\` | one measure |
| \`ratio\` | two metrics |
| \`derived\` | metrics and arithmetic |
| \`cumulative\` | one metric over a window |

### A metric is a definition, not a table
Nothing is pre-computed. The metric is compiled into SQL **when somebody asks**, against whatever grouping they asked for.

### Why that matters
A pre-aggregated summary table answers one question at one grain. A metric answers the questions you have not thought of yet — by day, by channel, by both — from the same definition.

### The payoff
"Revenue is net of refunds" is now **one line in one file**, and every consumer inherits it.`,
  narration:
    "A semantic model gives you measures. A metric is what you build on top of them, and there are four kinds. A simple metric sits directly on one measure — revenue is the sum of order amount, and that is the whole definition. A ratio metric is built from two other metrics, a numerator and a denominator, which is how you get something like refund rate without anybody writing the division by hand. A derived metric is arithmetic over other metrics, so revenue net of cost is a subtraction that lives in one place. And a cumulative metric takes one metric and accumulates it over a window, which is your running total, your revenue to date, your trailing thirty days. Notice the shape there: only the simple one touches a measure. The other three are built out of metrics, so definitions compose, and a correction to revenue automatically flows into every metric derived from it. Here is the part that is genuinely different from what you may be used to. A metric is a definition, not a table. Nothing is pre-computed, nothing is materialised, there is no summary object sitting in the warehouse going stale. The metric is compiled into SQL at the moment somebody asks for it, grouped however they asked for it. Compare that to the pre-aggregated summary table, which is the traditional answer to this problem. A summary table answers exactly one question at exactly one grain, and the moment somebody wants it split by channel as well as by week, you are building a second one. A metric answers the questions nobody has thought of yet, from the same single definition. And that definition — revenue is net of refunds — is now one line in one file that every consumer inherits.",
}
