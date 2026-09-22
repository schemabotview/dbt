import type { Scene } from '@graphlearning/flow'

// §04. State is a comparison, so the scene shows the two manifests and the verdict. The subtlety
// worth drawing is that `state:modified+` includes DOWNSTREAM models that did not change — because
// their inputs did, which is the thing that makes the whole technique correct rather than merely fast.
export const stateCompare: Scene = {
  id: 'state-compare',
  title: 'Comparing this project to the last one',
  nodes: [
    {
      id: 'two',
      label: 'Two manifests, one comparison',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 's-prod', label: 'The last prod run', sub: 'its manifest.json, kept somewhere', pattern: 'external', icon: 'history' },
        { id: 's-now', label: 'This checkout', sub: 'parsed right now', pattern: 'service', icon: 'filecode' },
        { id: 's-diff', label: 'The difference', sub: 'which nodes actually changed', pattern: 'storage', icon: 'gitbranch' },
      ],
      edges: [
        { source: 's-prod', target: 's-diff' },
        { source: 's-now', target: 's-diff' },
      ],
    },
    {
      id: 'sel',
      label: 'What counts as modified',
      kind: 'table',
      pattern: 'service',
      headers: ['Selector', 'Matches'],
      values: [
        ['state:new', 'a node that did not exist before'],
        ['state:modified', 'changed SQL, config, tests or columns'],
        ['state:modified+', 'those, AND everything downstream'],
        ['result:error+', 'whatever failed last time, and its children'],
      ],
    },
    {
      id: 'why',
      label: 'The plus is not optional',
      sub: 'its input changed, so it must rebuild',
      pattern: 'warn',
      icon: 'gitbranch',
    },
  ],
  edges: [
    { source: 'two', target: 'sel', label: 'you point dbt at the old manifest with --state' },
    { source: 'sel', target: 'why', label: 'and one detail that makes the difference between fast and wrong' },
  ],
}
