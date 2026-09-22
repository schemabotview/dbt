import type { Section } from '../types'

export const customGenericTests: Section = {
  id: 'custom-generic-tests',
  title: 'Custom generic tests',
  scene: 'custom-generic',
  slide: `## Promote an assertion to a reusable test

A generic test is a macro wrapped in \`{% test %}\`. dbt hands it \`model\` and \`column_name\`; you add your own arguments.

\`\`\`sql
{% test is_positive(model, column_name) %}
select {{ column_name }} from {{ model }}
where {{ column_name }} < 0
{% endtest %}
\`\`\`

### It is now a test like any other
Write \`is_positive\` in yml beside \`unique\`. Arguments go in a nested block, with defaults, exactly like the built-ins — because **the built-ins are written this way too.**

### When to bother
The first copy of an assertion is fine. **The second one is the signal.** Three columns needing the same check is a generic test; one column needing it is a singular test and you should stop there.`,
  narration:
    "Once you have written the same singular test twice, with two different tables pasted into it, you want a generic one. A generic test is a macro wrapped in a test block. Look at the shape. You name it, and dbt hands you two arguments for free: model, which is the relation the test is attached to, and column_name, which is set when the test sits on a column. After those, you add your own parameters with defaults, exactly like any function. The body returns SQL, and the same rule applies as everywhere else in this course: the rows it returns are the failures. Put that file in the tests slash generic folder, and the filename becomes the test's name. From that moment it behaves precisely like a built-in. You write is_positive in a yml file next to unique and not_null, and nothing distinguishes them. Pass an argument and you write it as a nested block, in the same shape as accepted_values. That is not a coincidence — the built-in tests are written exactly this way. Unique and not_null are macros in dbt's own codebase, with this same signature. So when should you bother? Here is a rule that keeps projects from drowning in abstraction. The first copy of an assertion is fine. The second copy is the signal. If one column in one model needs a particular check, write a singular test and stop; it is five lines, it is obvious, and generalising it costs you a layer of indirection that nobody asked for. When three different models need the same check with slightly different columns, that is when the macro earns its place — and at that point it also becomes the thing a new person on the team can apply without reading anything.",
}
