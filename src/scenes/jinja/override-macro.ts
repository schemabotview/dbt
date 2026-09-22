import type { Scene } from '@graphlearning/flow'

// §08. The mechanism is one sentence — define a macro with dbt's name and yours wins — so the scene
// spends its space on the specific override people actually want (clean schema names in prod) and
// on the precedence order, which is the thing that explains surprises inside packages.
export const overrideMacro: Scene = {
  id: 'override-macro',
  title: 'Changing dbt by naming a macro',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'macros/generate_schema_name.sql',
      label: [
        '{% macro generate_schema_name(custom_schema_name, node) -%}',
        '',
        '    {%- if target.name == "prod" and custom_schema_name is not none -%}',
        '        {{ custom_schema_name | trim }}          {# marts, not analytics_marts #}',
        '    {%- elif custom_schema_name is none -%}',
        '        {{ target.schema }}',
        '    {%- else -%}',
        '        {{ target.schema }}_{{ custom_schema_name | trim }}',
        '    {%- endif -%}',
        '',
        '{%- endmacro %}',
      ].join('\n'),
    },
    {
      id: 'result',
      label: 'What that produces',
      kind: 'table',
      pattern: 'service',
      headers: ['Target', 'Config', 'Schema built'],
      values: [
        ['dev (dbt_alice)', 'schema: marts', 'dbt_alice_marts'],
        ['prod (analytics)', 'schema: marts', 'marts'],
      ],
    },
    {
      id: 'order',
      label: 'Who wins',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'o-dbt', label: 'dbt ships one', sub: 'the global default', pattern: 'external', icon: 'box' },
        { id: 'o-pkg', label: 'A package may override', sub: 'it beats the global', pattern: 'network', icon: 'package' },
        { id: 'o-you', label: 'Your project wins', sub: 'it beats everything', pattern: 'storage', icon: 'shieldcheck' },
      ],
      edges: [
        { source: 'o-dbt', target: 'o-pkg' },
        { source: 'o-pkg', target: 'o-you' },
      ],
    },
  ],
  edges: [
    { source: 'code', target: 'result', label: 'isolation in dev, clean names in prod' },
    { source: 'result', target: 'order', label: 'nothing registers it — the NAME is the registration' },
  ],
}
