import type { Scene } from '@graphlearning/flow'

// §09. Triage, and the teaching is that the four failures need four different responses — so the
// table is organised by what you DO, not by what the message says. `dbt retry` is drawn separately
// because resuming from the failure is the single biggest time-saver on a long run.
export const failureTriage: Scene = {
  id: 'failure-triage',
  title: 'Four kinds of red, four responses',
  nodes: [
    {
      id: 'kinds',
      label: 'Read what actually failed',
      kind: 'table',
      pattern: 'service',
      headers: ['What failed', 'Means', 'You do'],
      values: [
        ['A model errored', 'the warehouse rejected the SQL', 'read the compiled file'],
        ['A test failed', 'the SQL ran, the data is wrong', 'look at the failing rows'],
        ['A model is skipped', 'a parent failed — this never ran', 'fix the parent, ignore this'],
        ['Freshness errored', 'the loader broke, not dbt', 'go and find the loader'],
      ],
    },
    {
      id: 'retry',
      kind: 'code',
      hug: true,
      filename: 'resume instead of restarting',
      label: [
        '$ dbt retry        # re-runs from the point of failure,',
        '                   # using the last run_results.json',
        '',
        '$ dbt build --fail-fast    # stop at the first error',
      ].join('\n'),
    },
    {
      id: 'habit',
      label: 'Read the summary',
      sub: 'PASS=41 ERROR=1 SKIP=6, before any log',
      pattern: 'user',
      icon: 'search',
    },
  ],
  edges: [
    { source: 'kinds', target: 'retry', label: 'the same red output, four different problems' },
    { source: 'retry', target: 'habit', label: 'and one line of output worth looking at before scrolling' },
  ],
}
