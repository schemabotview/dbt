import type { Scene } from '@graphlearning/flow'

// §08. Four phases, left to right, each with what it PRODUCES rather than what it does — because
// the artefacts are how you debug a run later. The failure card under each phase was tempting and
// dropped: it doubles the scene for a point §09 makes better with the actual file on screen.
export const runLifecycle: Scene = {
  id: 'run-lifecycle',
  title: 'What happens between Enter and a table',
  nodes: [
    {
      id: 'phases',
      label: 'One `dbt run`, four phases',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'r-parse', label: '1 · Parse', sub: 'read every file → manifest.json', pattern: 'service', icon: 'filecode' },
        { id: 'r-graph', label: '2 · Graph', sub: 'refs become a DAG, and an order', pattern: 'service', icon: 'gitbranch' },
        { id: 'r-compile', label: '3 · Compile', sub: 'Jinja out, real table names in', pattern: 'service', icon: 'braces' },
        { id: 'r-exec', label: '4 · Execute', sub: 'send DDL, in dependency order', pattern: 'storage', icon: 'database' },
      ],
      edges: [
        { source: 'r-parse', target: 'r-graph' },
        { source: 'r-graph', target: 'r-compile' },
        { source: 'r-compile', target: 'r-exec' },
      ],
    },
    {
      id: 'threads',
      label: 'threads: 4',
      sub: 'independent models run at once; a model waits only for its own parents',
      pattern: 'network',
      icon: 'workflow',
    },
    {
      id: 'left',
      label: 'What a run leaves behind',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'l-obj', label: 'The objects', sub: 'tables and views, in the warehouse', pattern: 'storage', icon: 'table' },
        { id: 'l-logs', label: 'logs/dbt.log', sub: 'every statement it sent', pattern: 'external', icon: 'scroll' },
        { id: 'l-res', label: 'Run results', sub: 'run_results.json — per model', pattern: 'external', icon: 'clock' },
      ],
    },
  ],
  edges: [
    { source: 'phases', target: 'threads', label: 'phase four is the only one that touches the warehouse' },
    { source: 'threads', target: 'left', label: 'and every run writes its own record to disk' },
  ],
}
