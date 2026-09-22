import type { Scene } from '@graphlearning/flow'

// §01. The unit is the FILE, so the scene is a file and the object it becomes — and the mapping
// (filename → object name) is drawn as the edge label rather than said in a card, because that is
// the one fact the whole section turns on. The warn band is the four things a model file may not
// contain; all four are mistakes people make in their first week coming from a SQL console.
export const modelFile: Scene = {
  id: 'model-file',
  title: 'One file, one SELECT, one object',
  nodes: [
    {
      id: 'file',
      kind: 'code',
      hug: true,
      filename: 'models/staging/stg_customers.sql',
      label: [
        'select',
        '    id            as customer_id,',
        '    first_name,',
        '    last_name,',
        '    lower(email)  as email,',
        '    created_at',
        "from {{ source('raw', 'customers') }}",
      ].join('\n'),
    },
    {
      id: 'obj',
      label: 'stg_customers',
      sub: 'a view in your target schema',
      pattern: 'storage',
      icon: 'table',
    },
    {
      id: 'no',
      label: 'What a model file may not contain',
      pattern: 'group',
      cols: 4,
      children: [
        { id: 'n-ddl', label: 'No DDL', sub: 'dbt writes the create', pattern: 'warn', icon: 'ban' },
        { id: 'n-semi', label: 'No semicolon', sub: 'the query gets wrapped', pattern: 'warn', icon: 'ban' },
        { id: 'n-two', label: 'One statement', sub: 'one file is one object', pattern: 'warn', icon: 'ban' },
        { id: 'n-txn', label: 'No transaction', sub: 'dbt owns the session', pattern: 'warn', icon: 'ban' },
      ],
    },
  ],
  edges: [
    { source: 'file', target: 'obj', label: 'the FILENAME becomes the object name — nothing inside the file names it' },
    { source: 'obj', target: 'no', label: 'which is why the file itself is so constrained' },
  ],
}
