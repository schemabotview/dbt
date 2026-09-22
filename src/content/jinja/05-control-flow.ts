import type { Section } from '../types'

export const controlFlow: Section = {
  id: 'control-flow',
  title: 'Loops and conditionals',
  scene: 'loop-columns',
  slide: `## Repetition the template can write

The honest use for a loop is **mechanical repetition over a list**: a pivot, a set of flags, the same expression applied to fifteen columns.

\`\`\`sql
{% for method in payment_methods %}
  sum(case when method = '{{ method }}'
           then amount end)
    as {{ method }}_amount
    {%- if not loop.last %},{% endif %}
{% endfor %}
\`\`\`

### \`loop.last\`
The trailing comma is the first thing everyone gets wrong. \`loop.last\` is true on the final iteration, and that one line fixes it. (\`loop.index\` and \`loop.first\` exist too.)

### The list does not have to be hardcoded
\`dbt_utils.get_column_values()\` reads the distinct values straight from the warehouse, so a new payment method appears in the model on its own — at the cost of a query at compile time, which is the next section.`,
  narration:
    "Loops and conditionals are where Jinja starts to feel powerful, and the honest use is narrower than it first appears: mechanical repetition over a list. A pivot is the perfect example. You have three payment methods and you want a column for each — the same case-when-sum expression, three times, with one word changing. Writing that by hand is fine for three and miserable for fifteen. So you set a list at the top, loop over it, and write the expression once. Look at the compiled result: nothing clever survives. It is just three sum expressions, exactly as you would have typed them. Notice the loop-dot-last on the comma line, because the trailing comma is the first thing everybody gets wrong. Your loop generates a comma after every column, including the last one, and then the query fails with a syntax error that points at the word from. Loop-dot-last is true only on the final iteration, so that one conditional fixes it. Jinja also gives you loop-dot-first and loop-dot-index, which are occasionally handy. Now, the list does not have to be hardcoded, and this is where it gets tempting. Dbt_utils has a macro that reads the distinct values of a column straight from your warehouse, so the loop can build itself from the data. Add a fourth payment method to the source, and the model grows a column without anybody editing it. That sounds wonderful — and it comes with a real cost, because it means your model's shape now depends on a query running at compile time. That is exactly what the next section is about.",
}
