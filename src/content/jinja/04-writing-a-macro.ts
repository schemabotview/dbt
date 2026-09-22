import type { Section } from '../types'

export const writingAMacro: Section = {
  id: 'writing-a-macro',
  title: 'Writing a macro',
  scene: 'macro-anatomy',
  slide: `## A function that returns SQL

\`\`\`sql
{% macro cents_to_pounds(column_name,
                         decimals=2) %}
  round( {{ column_name }} / 100.0,
         {{ decimals }} )
{% endmacro %}
\`\`\`

Call it with \`{{ cents_to_pounds('amount_cents') }}\` and the text it returns lands in your query.

### Three things to know
- It lives in \`macros/\`, and **one file can hold several**
- It returns **a fragment**, not a whole query — an expression, a join clause, a case statement
- If your project defines a macro with the same name as one in a package, **yours wins**

### Good macros are small
A rounding rule, a currency conversion, a tidy surrogate key. A macro that generates a **whole model** with holes in it is what everyone regrets.`,
  narration:
    "A macro is a function that returns SQL. You define it in a file under the macros folder, with a name and arguments that can have defaults, and its body is text that gets returned. Then you call it from a model with double braces, and whatever it returned lands in your query at that spot. Look at the example: a macro that converts an amount in pence to an amount in pounds, with a configurable number of decimal places. It is three lines, and it is used twice in the model beside it, with different arguments. That is the entire concept. Three practical things. First, macros live in the macros folder, and one file can hold as many as you like — so it is normal to have a file called something like conversions dot sql with five related macros in it, rather than five files. Second, a macro returns a fragment, not a whole query. An expression, a join clause, a case statement. It is designed to fill a hole in some SQL you are writing, not to be the SQL. Third, and this one matters when you start using packages: if your project defines a macro with the same name as one in an installed package, yours wins. That is deliberate and useful — it is how you patch somebody else's behaviour without forking their code — but it also means you can shadow a package macro by accident if you pick a common name. And here is the shape that stays maintainable, which is worth internalising now. Good macros are small. A rounding rule. A currency conversion. A standard way of writing a surrogate key. A macro that generates an entire model with holes punched in it is the thing that everybody writes once and then regrets for two years — and it is exactly where this course ends.",
}
