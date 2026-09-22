import type { Scene } from '@graphlearning/flow'

// §05. The one-line answer is that dbt has no compute of its own — every cent is the warehouse's,
// spent by SQL dbt wrote. The board is where the money actually goes, in the order people find it.
export const costAnatomy: Scene = {
  id: 'cost-anatomy',
  title: 'dbt has no compute of its own',
  nodes: [
    {
      id: 'who',
      label: 'Who charges you for what',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'c-wh', label: 'The warehouse', sub: 'all of the compute, all of the bill', pattern: 'storage', icon: 'database' },
        { id: 'c-core', label: 'dbt Core', sub: 'free — it is a CLI on your laptop', pattern: 'service', icon: 'terminal' },
        { id: 'c-plat', label: 'The platform', sub: 'seats and runs, if you use it', pattern: 'user', icon: 'cloud' },
      ],
    },
    {
      id: 'board',
      label: 'Where a project’s spend goes',
      kind: 'table',
      pattern: 'warn',
      headers: ['The spend', 'Why it happens', 'The usual fix'],
      values: [
        ['Full rebuilds', 'a table model over big history', 'make it incremental'],
        ['CI', 'every PR builds the whole project', 'defer and build the slice'],
        ['Over-scheduling', 'hourly for a daily report', 'match the cadence to the need'],
        ['Idle warehouses', 'auto-suspend set too generously', 'suspend in a minute or two'],
      ],
    },
    {
      id: 'own',
      label: 'You wrote the bill',
      sub: 'every row of it is your SQL',
      pattern: 'external',
      icon: 'receipt',
    },
  ],
  edges: [
    { source: 'who', target: 'board', label: 'so cost is a modelling question, not a licence question' },
    { source: 'board', target: 'own', label: 'and all four are choices, not accidents' },
  ],
}
