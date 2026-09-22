import type { Scene } from '@graphlearning/flow'

// §10. The closing argument, and it is an ORDERING argument, so the scene is two sequences side by
// side — run-then-test lets a bad model's children build on top of it; build stops at the failure.
// Skipped is drawn as its own state because it is the thing that makes the difference visible.
export const buildOrder: Scene = {
  id: 'build-order',
  title: 'Why `dbt build` beats run-then-test',
  nodes: [
    {
      id: 'runtest',
      label: 'dbt run, then dbt test',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'rt-1', label: 'Build everything', sub: 'including on top of bad data', pattern: 'service', icon: 'gears' },
        { id: 'rt-2', label: 'Then test it', sub: 'a failure found at the end', pattern: 'warn', icon: 'bug' },
        { id: 'rt-3', label: 'Marts are wrong', sub: 'and already being queried', pattern: 'warn', icon: 'skull' },
      ],
      edges: [
        { source: 'rt-1', target: 'rt-2' },
        { source: 'rt-2', target: 'rt-3' },
      ],
    },
    {
      id: 'build',
      label: 'dbt build — interleaved, in DAG order',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'b-1', label: 'Build stg_orders', sub: 'one model', pattern: 'service', icon: 'filecode' },
        { id: 'b-2', label: 'Test it, now', sub: 'before anything reads it', pattern: 'network', icon: 'shieldcheck' },
        { id: 'b-3', label: 'It fails', sub: 'the run stops here for this branch', pattern: 'warn', icon: 'bug' },
        { id: 'b-4', label: 'Children SKIPPED', sub: 'not failed — never built at all', pattern: 'external', icon: 'circleslash' },
      ],
      edges: [
        { source: 'b-1', target: 'b-2' },
        { source: 'b-2', target: 'b-3' },
        { source: 'b-3', target: 'b-4' },
      ],
    },
    {
      id: 'covers',
      label: 'It covers everything',
      sub: 'seeds, snapshots, models, both kinds of test',
      pattern: 'user',
      icon: 'circlecheck',
    },
  ],
  edges: [
    { source: 'runtest', target: 'build', label: 'the tests were right — they just ran too late to protect anything' },
    { source: 'build', target: 'covers', label: 'a bad model stops its own branch, and only its branch' },
  ],
}
