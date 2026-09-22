import type { Scene } from '@graphlearning/flow'

// §10. The closing map. Nine flat cards would be a wall, so the courses are banded by the question
// each band answers, and the band titles are those questions. The first band is the one just
// finished plus the two that complete the core skill — which is also the shippable prefix.
export const theArc: Scene = {
  id: 'the-arc',
  title: 'Where the rest of this goes',
  nodes: [
    {
      id: 'b1',
      label: 'Building things',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'a-found', label: '1 · Foundations', sub: 'what dbt is — this course', pattern: 'user', icon: 'box' },
        { id: 'a-models', label: '2 · Models', sub: 'ref, the DAG, the layers', pattern: 'service', icon: 'gitbranch' },
        { id: 'a-mat', label: '3 · Build modes', sub: 'materializations: view → table', pattern: 'service', icon: 'layers' },
      ],
    },
    {
      id: 'b2',
      label: 'Making them trustworthy',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'a-src', label: '4 · Sources', sub: 'freshness, seeds, snapshots', pattern: 'storage', icon: 'funnel' },
        { id: 'a-test', label: '5 · Tests', sub: 'assertions and contracts', pattern: 'storage', icon: 'shieldcheck' },
        { id: 'a-jinja', label: '6 · Jinja', sub: 'macros, hooks, packages', pattern: 'storage', icon: 'braces' },
      ],
    },
    {
      id: 'b3',
      label: 'Running it with other people',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'a-dep', label: '7 · Deployment', sub: 'jobs, state, slim CI', pattern: 'network', icon: 'repeat' },
        { id: 'a-gov', label: '8 · Governance', sub: 'docs, access, mesh', pattern: 'network', icon: 'users' },
        { id: 'a-sem', label: '9 · Semantic layer', sub: 'metrics, cost, the AI surface', pattern: 'network', icon: 'sigma' },
      ],
    },
  ],
  edges: [
    { source: 'b1', target: 'b2', label: 'you can build a warehouse from these three alone' },
    { source: 'b2', target: 'b3', label: 'the rest is what a second person on the project needs' },
  ],
}
