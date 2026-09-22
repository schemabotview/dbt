import type { Scene } from '@graphlearning/flow'

// §02. A reference board, and the rows are chosen for what people actually reach for. `execute` is
// last and flagged, because it is the one whose absence produces a genuinely baffling bug — code
// that works at runtime and returns None during parsing.
export const dbtContext: Scene = {
  id: 'dbt-context',
  title: 'What dbt hands every template',
  nodes: [
    {
      id: 'board',
      label: 'The context, in practice',
      kind: 'table',
      pattern: 'service',
      headers: ['Name', 'Is', 'Reach for it when'],
      values: [
        ['ref / source', 'a resolved relation', 'always — never type a name'],
        ['this', 'the model being built', 'incremental filters, post-hooks'],
        ['target', 'the active connection', 'behave differently in prod'],
        ['model', 'this node, as a dict', 'reading tags, config, columns'],
        ['run_started_at', 'the run timestamp', 'stamping an audit column'],
        ['execute', 'false while parsing', 'guarding anything that queries'],
      ],
    },
    {
      id: 'target',
      kind: 'code',
      hug: true,
      filename: 'the two you will use first',
      label: [
        '-- limit the dev build, but never production',
        '{% if target.name == "dev" %}',
        "  where created_at >= dateadd('day', -7, current_date)",
        '{% endif %}',
        '',
        '-- and stamp the row with when it was built',
        "'{{ run_started_at }}' as dbt_loaded_at",
      ].join('\n'),
    },
    {
      id: 'warn',
      label: 'A tempting trap',
      sub: 'use target for cost, not for logic',
      pattern: 'warn',
      icon: 'skull',
    },
  ],
  edges: [
    { source: 'board', target: 'target', label: 'all of it is available in any model, macro or test' },
    { source: 'target', target: 'warn', label: 'and one caution about the second most popular one' },
  ],
}
