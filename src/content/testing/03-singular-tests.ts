import type { Section } from '../types'

export const singularTests: Section = {
  id: 'singular-tests',
  title: 'Singular tests',
  scene: 'singular-test',
  slide: `## One assertion, written as SQL

Drop a \`.sql\` file in \`tests/\`. Whatever rows it returns are failures. That is the whole interface.

\`\`\`sql
-- tests/assert_no_refunds_exceed_order.sql
select o.order_id, o.amount, r.amount
from {{ ref('fct_orders') }} as o
join {{ ref('fct_refunds') }} as r
     using (order_id)
where r.amount > o.amount
\`\`\`

It spans **two models** and encodes a rule about your business, not about a column — no configuration on a column could express it.

### Where the line falls
**Generic tests describe columns. Singular tests describe your business.** A rule with "never" in it is usually a singular test.

### Name it as a claim
\`assert_no_refunds_exceed_order\`. The filename appears in the failure output, so it should read as the thing that is no longer true.`,
  narration:
    "Sometimes no generic test fits, and dbt has a deliberately unglamorous answer: write the SQL yourself. Put a dot-sql file in the tests folder. Whatever rows it returns are failures. That is the entire interface — no registration, no configuration, no macro. Look at the example. A refund should never be larger than the order it belongs to. That query joins orders to refunds and keeps only the rows where the refund is bigger. If the business is healthy, it returns nothing. If it returns four rows, you have four refunds that should not exist, and you are looking at them. Notice why this one could not be a generic test. It spans two models, and it encodes a rule that is true of your business rather than of a column. There is no configuration you could put on a column called amount that would express a refund is never larger than its order. This is the escape hatch, and the escape hatch is just SQL — it can join, aggregate, use window functions, whatever you need. That gives you the line between the two kinds. Generic tests describe columns: this one is unique, this one is never null, this one comes from that list. Singular tests describe your business. A useful heuristic: if you can state the rule as a sentence with the word never in it — a refund is never larger than its order, an order is never shipped before it is paid, a customer never appears in two regions — that is usually a singular test. One small thing that matters more than it sounds. Name the file as a claim: assert, then the thing that should be true. The filename appears in the failure output, so when it goes red at seven in the morning, the name alone should tell somebody what has stopped being true.",
}
