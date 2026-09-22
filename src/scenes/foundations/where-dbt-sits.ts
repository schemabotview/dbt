import type { Scene } from '@graphlearning/flow'

// §03. A boundary scene: the point is the size of dbt's box, so the neighbours must be drawn at the
// same weight. The three things dbt is NOT are the boxes either side of it, named with the tools
// people actually confuse it with. The bottom band answers "then what does it run on?".
// FOUR cards across, not five: the top row's width is what fitView scales the whole scene by, and at
// five the card labels came out visibly smaller than every other scene in the course. `Sources` was
// the one to drop — the previous section already established where the data comes from.
export const whereDbtSits: Scene = {
  id: 'where-dbt-sits',
  title: 'One box in the stack, and it is narrow',
  nodes: [
    {
      id: 'stack',
      label: 'The stack, left to right',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 's-ingest', label: 'Ingestion', sub: 'Fivetran, Airbyte, a script', pattern: 'network', icon: 'funnel' },
        { id: 's-raw', label: 'Raw schema', sub: 'in your warehouse', pattern: 'storage', icon: 'database' },
        { id: 's-dbt', label: 'dbt', sub: 'raw tables → modelled tables', pattern: 'service', icon: 'workflow' },
        { id: 's-bi', label: 'BI and beyond', sub: 'dashboards, ML, reverse ETL', pattern: 'user', icon: 'barchart' },
      ],
      edges: [
        { source: 's-ingest', target: 's-raw' },
        { source: 's-raw', target: 's-dbt' },
        { source: 's-dbt', target: 's-bi' },
      ],
    },
    {
      id: 'not',
      label: 'Three things it is not',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'n-ingest', label: 'Not an EL tool', sub: 'it never moves a row in', pattern: 'warn', icon: 'ban' },
        { id: 'n-orch', label: 'Not a scheduler', sub: 'something must invoke it', pattern: 'warn', icon: 'clock' },
        { id: 'n-engine', label: 'Not a query engine', sub: 'it owns no compute at all', pattern: 'warn', icon: 'ban' },
      ],
    },
    {
      id: 'work',
      label: 'It all runs there',
      sub: 'dbt sends SQL, reads the result',
      pattern: 'storage',
      icon: 'database',
    },
  ],
  edges: [
    { source: 'stack', target: 'not', label: 'everything either side of the dbt box belongs to something else' },
    { source: 'not', target: 'work', label: 'so what is dbt actually doing while a run is in progress?' },
  ],
}
