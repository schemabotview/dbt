import type { Scene } from '@graphlearning/flow'

// §01. The opening board. Four columns rather than four cards, because every question a learner has
// here is a COMPARISON — what does it cost to build, what does it cost to read — and a table is the
// only honest shape for that. `Rebuilt` is the row the rest of the course hangs off: three of the
// four rebuild from scratch every run, and the fourth is the whole reason incremental exists.
export const fourBuiltins: Scene = {
  id: 'four-builtins',
  title: 'One SELECT, four different objects',
  nodes: [
    {
      id: 'board',
      label: 'The four built-in materializations',
      kind: 'table',
      pattern: 'service',
      headers: ['', 'view', 'table', 'ephemeral', 'incremental'],
      values: [
        ['Object built', 'a view', 'a table', 'nothing', 'a table'],
        ['Build cost', 'near zero', 'full scan', 'none', 'new rows only'],
        ['Query cost', 'runs the SQL', 'reads rows', 'inlined', 'reads rows'],
        ['On each run', 'redefined', 'rebuilt whole', 'pasted in', 'added to'],
        ['Can be queried', 'yes', 'yes', 'no', 'yes'],
        ['Reach for it', 'by default', 'when read often', 'to hide a step', 'when rebuild hurts'],
      ],
    },
    {
      id: 'cfg',
      kind: 'code',
      hug: true,
      filename: 'how you choose',
      label: [
        '# a whole folder, in dbt_project.yml',
        '+materialized: table',
        '',
        '-- or one model, at the top of its file',
        "{{ config(materialized='incremental') }}",
      ].join('\n'),
    },
    {
      id: 'default',
      label: 'The default is view',
      sub: 'say nothing anywhere, and you get a view',
      pattern: 'user',
      icon: 'circlecheck',
    },
  ],
  edges: [
    { source: 'board', target: 'cfg', label: 'the same SELECT, and one line decides which column you are in' },
    { source: 'cfg', target: 'default', label: 'and if you never set it at all' },
  ],
}
