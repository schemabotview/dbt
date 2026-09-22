import type { Scene } from '@graphlearning/flow'

// §06. Versions exist to make a breaking change survivable, so the scene is a timeline: two versions
// live at once, consumers move on their own schedule, and a deprecation date does the chasing. The
// unpinned-ref warning is the sharp edge — it is a feature and a foot-gun at the same time.
export const modelVersions: Scene = {
  id: 'model-versions',
  title: 'Breaking a contract without breaking people',
  nodes: [
    {
      id: 'yml',
      kind: 'code',
      filename: 'both versions exist, on purpose',
      label: [
        'models:',
        '  - name: fct_orders',
        '    latest_version: 2',
        '    config: {contract: {enforced: true}}',
        '    versions:',
        '      - v: 1',
        '        deprecation_date: 2026-12-01',
        '      - v: 2',
        '        columns: [{include: all, exclude: [legacy_status]}]',
        '',
        "-- consumers choose:  {{ ref('fct_orders', v=1) }}",
        "--                    {{ ref('fct_orders') }}   -- = latest",
      ].join('\n'),
    },
    {
      id: 'time',
      label: 'How a breaking change actually lands',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'v-ship', label: 'Ship v2', sub: 'v1 keeps working, untouched', pattern: 'service', icon: 'package' },
        { id: 'v-date', label: 'Set a date', sub: 'v1 warns, loudly, until then', pattern: 'warn', icon: 'calendar' },
        { id: 'v-move', label: 'Consumers move', sub: 'on their own schedule, not yours', pattern: 'user', icon: 'users' },
        { id: 'v-drop', label: 'Drop v1', sub: 'when the date arrives', pattern: 'storage', icon: 'trash' },
      ],
      edges: [
        { source: 'v-ship', target: 'v-date' },
        { source: 'v-date', target: 'v-move' },
        { source: 'v-move', target: 'v-drop' },
      ],
    },
    {
      id: 'trap',
      label: 'Unpinned refs move',
      sub: 'no version means latest — a surprise upgrade',
      pattern: 'warn',
      icon: 'swap',
    },
  ],
  edges: [
    { source: 'yml', target: 'time', label: 'one model, two live versions, one deprecation date' },
    { source: 'time', target: 'trap', label: 'and the detail that decides who gets surprised' },
  ],
}
