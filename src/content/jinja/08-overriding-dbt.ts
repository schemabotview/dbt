import type { Section } from '../types'

export const overridingDbt: Section = {
  id: 'overriding-dbt',
  title: 'Overriding dbt’s own macros',
  scene: 'override-macro',
  slide: `## Define a macro with dbt's name, and yours wins

Nothing registers it. **The name is the registration.** The most common one, by far:

\`\`\`sql
{% macro generate_schema_name(custom, node) %}
  {% if target.name == 'prod' and custom %}
    {{ custom | trim }}
  {% else %}
    ...dbt's default...
  {% endif %}
{% endmacro %}
\`\`\`

Developers keep suffixed sandboxes; **production gets clean names**.

### Precedence
dbt's global macro → a package's override → **your project's**. Yours always wins, which is also how you patch a package without forking it.

### Handle with care
You have changed where every model lands, in a file nobody reads while debugging.`,
  narration:
    "Here is a genuinely surprising piece of dbt's design. If you define a macro with the same name as one of dbt's own, yours is used instead. There is no registration step, no configuration, no plugin system. The name is the registration. The most common example by far is the one we left unfinished back in the models course. You will remember that a custom schema is a suffix: set schema to marts, and in development you get dbt_alice_marts, which is what keeps developers isolated. But in production that gives you analytics_marts, and a lot of teams would rather production just had a schema called marts. Override generate_schema_name and you get both: keep dbt's suffixing behaviour whenever the target is not production, and use the bare custom name when it is. Developers stay isolated, production gets clean names, and no model changes. Precedence runs in three layers. dbt ships a global version of the macro. An installed package may override it. And your project overrides everything. That last rule is also how you patch a package's behaviour without forking it — copy the macro into your macros folder, change the one line you need, and you are done. Handle this with care, though. You have just changed where every model in the project lands, in a file that nobody looks at when they are debugging a missing table. It is absolutely the right tool for this specific problem. It is a bad habit if overriding dbt's internals becomes your first instinct rather than your last.",
}
