import type { Scene } from '@graphlearning/flow'

// §03. Seeds are easy to explain and easy to misuse, so the scene is a boundary: a good seed and a
// bad one, side by side, with the test in the middle. The three questions are the actual decision
// procedure — every legitimate seed answers yes to all three.
export const seeds: Scene = {
  id: 'seeds',
  title: 'A CSV that lives in the repo',
  nodes: [
    {
      id: 'csv',
      kind: 'code',
      hug: true,
      filename: 'seeds/country_codes.csv',
      label: [
        'code,name,region',
        'GB,United Kingdom,EMEA',
        'DE,Germany,EMEA',
        'SG,Singapore,APAC',
      ].join('\n'),
    },
    {
      id: 'ref',
      kind: 'code',
      hug: true,
      filename: 'and it is a node like any other',
      label: ['$ dbt seed', '', "select * from {{ ref('country_codes') }}"].join('\n'),
    },
    {
      id: 'test',
      label: 'Three questions. All three must be yes.',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 's-small', label: 'Is it small?', sub: 'hundreds of rows, not millions', pattern: 'service', icon: 'ruler' },
        { id: 's-stable', label: 'Rarely changes?', sub: 'edited by a person, not a system', pattern: 'service', icon: 'lock' },
        { id: 's-safe', label: 'Is it safe to commit?', sub: 'it is going into git, forever', pattern: 'service', icon: 'shieldcheck' },
      ],
    },
    {
      id: 'not',
      label: 'Not ingestion',
      sub: 'it loads row by row, from a text file',
      pattern: 'warn',
      icon: 'ban',
    },
  ],
  edges: [
    { source: 'csv', target: 'ref', label: 'built by its own command, then reachable with ref()' },
    { source: 'ref', target: 'test', label: 'which makes it tempting for things it is wrong for' },
    { source: 'test', target: 'not', label: 'and the one answer that is always no' },
  ],
}
