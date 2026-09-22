import type { Scene } from '@graphlearning/flow'

// §07. The distinction that makes the rest make sense: for most of dbt's life the compiler never
// understood SQL — it pasted strings and let the warehouse find the mistakes. A real parser moves
// whole classes of error from "after the run" to "while you type".
export const fusionEngine: Scene = {
  id: 'fusion-engine',
  title: 'From pasting strings to reading SQL',
  nodes: [
    {
      id: 'board',
      label: 'The same typo, two eras',
      kind: 'table',
      pattern: 'service',
      headers: ['', 'Templating only', 'With a SQL parser'],
      values: [
        ['A misspelt column', 'the warehouse errors, mid-run', 'flagged before you run'],
        ['Knows your columns', 'no — it sees text', 'yes — it resolves them'],
        ['Cost of finding out', 'a failed run, and the credits', 'a red squiggle'],
      ],
    },
    {
      id: 'gets',
      label: 'What understanding SQL buys',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'f-err', label: 'Errors while typing', sub: 'before a credit is spent', pattern: 'storage', icon: 'zap' },
        { id: 'f-lin', label: 'Column lineage', sub: 'which field came from where', pattern: 'user', icon: 'gitbranch' },
        { id: 'f-fast', label: 'Faster parsing', sub: 'on projects with thousands of models', pattern: 'external', icon: 'cpu' },
      ],
    },
    {
      id: 'same',
      label: 'The project is the same',
      sub: 'same models, same yml, same refs',
      pattern: 'warn',
      icon: 'circlecheck',
    },
  ],
  edges: [
    { source: 'board', target: 'gets', label: 'a parser knows what a column is' },
    { source: 'gets', target: 'same', label: 'and the part that reassures everyone' },
  ],
}
