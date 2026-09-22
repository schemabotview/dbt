import type { Scene } from '@graphlearning/flow'

// §07. Hooks are about WHEN, so the scene is a timeline of one run with the four slots marked on
// it. The grants card is the important modern correction: the canonical hook example in every old
// tutorial has been replaced by a first-class config, and teaching the hook would be teaching debt.
export const hooks: Scene = {
  id: 'hooks',
  title: 'Four places to run something extra',
  nodes: [
    {
      id: 'timeline',
      label: 'One dbt run, left to right',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'h-start', label: 'on-run-start', sub: 'once, before any model', pattern: 'network', icon: 'power' },
        { id: 'h-pre', label: 'pre-hook', sub: 'before THIS model', pattern: 'service', icon: 'clock' },
        { id: 'h-model', label: 'The model builds', sub: 'the create statement', pattern: 'storage', icon: 'gears' },
        { id: 'h-post', label: 'post-hook', sub: 'after THIS model, with {{ this }}', pattern: 'service', icon: 'circlecheck' },
      ],
      edges: [
        { source: 'h-start', target: 'h-pre' },
        { source: 'h-pre', target: 'h-model' },
        { source: 'h-model', target: 'h-post' },
      ],
    },
    {
      id: 'code',
      kind: 'code',
      hug: true,
      filename: 'an audit row after every build',
      label: [
        '{{ config(',
        '    post_hook="insert into audit.model_runs',
        "             values ('{{ this }}', '{{ run_started_at }}')\"",
        ') }}',
      ].join('\n'),
    },
    {
      id: 'grants',
      label: 'Not for grants',
      sub: 'grants are a first-class config now',
      pattern: 'warn',
      icon: 'key',
    },
  ],
  edges: [
    { source: 'timeline', target: 'code', label: 'on-run-end also exists, once, at the very end' },
    { source: 'code', target: 'grants', label: 'and one thing hooks used to be for, and should not be' },
  ],
}
