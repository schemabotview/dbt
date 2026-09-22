import type { Scene } from '@graphlearning/flow'

// §08. Four files, and the scene's job is to make them feel like an interface rather than debris in
// a gitignored folder. The bottom card is the practical consequence: a project that uploads them
// gets state-aware CI and a metadata history for free; one that does not, cannot.
export const artifacts: Scene = {
  id: 'artifacts',
  title: 'What a run leaves behind',
  nodes: [
    {
      id: 'files',
      label: 'target/, after a run',
      kind: 'table',
      pattern: 'service',
      headers: ['File', 'Holds', 'Used for'],
      values: [
        ['manifest.json', 'every node, fully resolved', 'state comparison, defer'],
        ['run_results.json', 'status and timing per node', 'retry, alerting, dashboards'],
        ['catalog.json', 'columns and types, from the db', 'the docs site'],
        ['sources.json', 'the last freshness check', 'freshness reporting'],
      ],
    },
    {
      id: 'uses',
      label: 'What teams actually do with them',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'u-state', label: 'Upload the manifest', sub: 'so CI can compare against prod', pattern: 'storage', icon: 'history' },
        { id: 'u-slow', label: 'Load run_results', sub: 'a model of your own build times', pattern: 'storage', icon: 'clock' },
        { id: 'u-alert', label: 'Alert from it', sub: 'which node failed, and for how long', pattern: 'storage', icon: 'bell' },
      ],
    },
    {
      id: 'rule',
      label: 'Upload from prod',
      sub: 'unsaved, they are gone next run',
      pattern: 'warn',
      icon: 'power',
    },
  ],
  edges: [
    { source: 'files', target: 'uses', label: 'JSON, documented, and stable enough to build on' },
    { source: 'uses', target: 'rule', label: 'all three depend on one habit' },
  ],
}
