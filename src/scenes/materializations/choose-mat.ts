import type { Scene } from '@graphlearning/flow'

// §10. The closing decision board. Deliberately phrased as questions in the left column, because
// that is the order the decision actually gets made in — nobody starts from "should this be
// incremental", they start from "is this slow". The flags below are the two that change a run's
// behaviour rather than a model's shape.
export const chooseMat: Scene = {
  id: 'choose-mat',
  title: 'How to actually choose',
  nodes: [
    {
      id: 'board',
      label: 'Start at the top and stop at the first yes',
      kind: 'table',
      pattern: 'service',
      headers: ['Ask', 'If yes', 'Why'],
      values: [
        ['Is it a step nobody reads?', 'ephemeral', 'no object, no clutter'],
        ['Is it thin, over one table?', 'view', 'free to build, never stale'],
        ['Is the rebuild comfortable?', 'table', 'simplest thing that works'],
        ['Is the rebuild hurting?', 'incremental', 'only touch the new rows'],
        ['Is it time-sliced and big?', 'microbatch', 'one query per period'],
      ],
    },
    {
      id: 'flags',
      label: 'Two flags worth knowing now',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'fl-full', label: '--full-refresh', sub: 'rebuild an incremental from scratch', pattern: 'network', icon: 'repeat' },
        { id: 'fl-schema', label: 'Schema changes', sub: 'on_schema_change, when a column appears', pattern: 'network', icon: 'gitbranch' },
      ],
    },
    {
      id: 'more',
      label: 'One more option',
      sub: 'a materialized view — the warehouse refreshes it',
      pattern: 'storage',
      icon: 'database',
    },
    {
      id: 'rule',
      label: 'Start simple',
      sub: 'incremental is an optimisation, not a default',
      pattern: 'user',
      icon: 'scale',
    },
  ],
  edges: [
    { source: 'board', target: 'flags', label: 'the choice is a config; these two change how a run behaves' },
    { source: 'flags', target: 'more', label: 'plus one option that is not really dbt doing the work' },
    { source: 'more', target: 'rule', label: 'and the habit that keeps a project maintainable' },
  ],
}
