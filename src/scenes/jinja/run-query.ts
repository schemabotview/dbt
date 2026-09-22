import type { Scene } from '@graphlearning/flow'

// §06. Power with a real cost, so the scene is honest about both. The `execute` guard is drawn as a
// gate rather than mentioned in passing, because a template that queries during PARSING is the bug
// this section exists to prevent — and its symptom (None) looks like nothing to do with parsing.
export const runQuery: Scene = {
  id: 'run-query',
  title: 'Asking the warehouse at compile time',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'the shape, including the guard',
      label: [
        '{% set sql %}',
        "    select distinct payment_method from {{ ref('stg_payments') }}",
        '{% endset %}',
        '',
        '{% set methods = [] %}',
        '{% if execute %}',
        '    {% set results = run_query(sql) %}',
        '    {% set methods = results.columns[0].values() %}',
        '{% endif %}',
      ].join('\n'),
    },
    {
      id: 'two',
      label: 'Every project is parsed twice-ish',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'q-parse', label: 'Parsing', sub: 'execute is FALSE — run_query returns nothing', pattern: 'warn', icon: 'ban' },
        { id: 'q-exec', label: 'Executing', sub: 'execute is TRUE — the query actually runs', pattern: 'storage', icon: 'database' },
      ],
    },
    {
      id: 'cost',
      label: 'What it costs you',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'c-slow', label: 'A query per parse', sub: 'every compile, not just every build', pattern: 'warn', icon: 'clock' },
        { id: 'c-nondet', label: 'Not deterministic', sub: 'the model changes when the data does', pattern: 'warn', icon: 'waves' },
        { id: 'c-ci', label: 'Awkward in CI', sub: 'it needs a warehouse just to compile', pattern: 'warn', icon: 'repeat' },
      ],
    },
  ],
  edges: [
    { source: 'code', target: 'two', label: 'without the guard, methods is empty and nothing explains why' },
    { source: 'two', target: 'cost', label: 'and before you reach for it, price it honestly' },
  ],
}
