import type { Scene } from '@graphlearning/flow'

// §05. A fan-out: one project, three dialects. The children name what actually DIFFERS per warehouse
// (the merge, the type names, the clustering hint) rather than repeating the vendor name — the
// vendor is on the card already, and the difference is the teaching.
export const adapters: Scene = {
  id: 'adapters',
  title: 'One project, whichever warehouse you own',
  nodes: [
    {
      id: 'project',
      label: 'Your project',
      sub: 'models, tests and yml — no vendor SQL in any of it',
      pattern: 'service',
      icon: 'folder',
    },
    {
      id: 'adapter',
      label: 'The adapter',
      sub: 'a Python package per warehouse: it opens the connection and emits the dialect',
      pattern: 'network',
      icon: 'plug',
    },
    {
      id: 'targets',
      label: 'The same model, built three ways',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 't-sf', label: 'Snowflake', sub: 'MERGE, VARIANT, cluster by', pattern: 'storage', icon: 'snowflake' },
        { id: 't-bq', label: 'BigQuery', sub: 'MERGE, STRUCT, partition by', pattern: 'storage', icon: 'database' },
        { id: 't-duck', label: 'DuckDB', sub: 'a file on your laptop', pattern: 'storage', icon: 'harddrive' },
      ],
    },
    {
      id: 'catch',
      label: 'Portable, not free',
      sub: 'types and costs still differ',
      pattern: 'warn',
      icon: 'scale',
    },
  ],
  edges: [
    { source: 'project', target: 'adapter', label: 'one line of profiles.yml picks which one' },
    { source: 'adapter', target: 'targets', label: 'same SELECT, three dialects of DDL' },
    { source: 'targets', target: 'catch', label: 'how far does that portability really go?' },
  ],
}
