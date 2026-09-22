import type { Scene } from '@graphlearning/flow'

// §05. The section exists because of one failure mode: a test that fails every day and is ignored
// every day, which is worse than no test. So the scene is about TOLERANCE — warn vs error, and the
// thresholds that let a test stay meaningful while a known level of mess is being cleaned up.
export const severity: Scene = {
  id: 'severity',
  title: 'Not every failure should stop the build',
  nodes: [
    {
      id: 'cfg',
      kind: 'code',
      filename: 'a test that tolerates a known level of mess',
      label: [
        'columns:',
        '  - name: customer_id',
        '    data_tests:',
        '      - not_null:',
        '          config:',
        '            severity: error      # error | warn',
        '            error_if: ">100"     # fail only past 100 bad rows',
        '            warn_if: ">0"        # but say something from the first',
      ].join('\n'),
    },
    {
      id: 'two',
      label: 'Two outcomes',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 's-warn', label: 'warn', sub: 'printed loudly, run continues, children build', pattern: 'service', icon: 'bell' },
        { id: 's-err', label: 'error', sub: 'the run fails, and children are skipped', pattern: 'warn', icon: 'skull' },
      ],
    },
    {
      id: 'use',
      label: 'What the thresholds are for',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'u-known', label: 'A known backlog', sub: '40 bad rows today, being cleaned up', pattern: 'service', icon: 'history' },
        { id: 'u-ratchet', label: 'A ratchet', sub: 'lower the number as it gets fixed', pattern: 'service', icon: 'sortarrows' },
        { id: 'u-new', label: 'A new test', sub: 'warn first, promote to error later', pattern: 'service', icon: 'bell' },
      ],
    },
    {
      id: 'trap',
      label: 'The failure mode',
      sub: 'a test that fails daily is never read',
      pattern: 'warn',
      icon: 'ban',
    },
  ],
  edges: [
    { source: 'cfg', target: 'two', label: 'severity decides what a failure does to the run' },
    { source: 'two', target: 'use', label: 'and the thresholds decide what counts as a failure' },
    { source: 'use', target: 'trap', label: 'all three exist to prevent one thing' },
  ],
}
