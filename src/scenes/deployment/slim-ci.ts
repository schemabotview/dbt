import type { Scene } from '@graphlearning/flow'

// §06. The payoff section: state + defer combined into the thing teams actually run. Drawn as the
// life of one pull request, because the value is the WALL-CLOCK difference — four minutes versus
// forty — and that only lands if you can see where the time went.
export const slimCi: Scene = {
  id: 'slim-ci',
  title: 'The pull-request run',
  nodes: [
    {
      id: 'cmd',
      kind: 'code',
      filename: 'the command the whole technique reduces to',
      label: [
        'dbt build \\',
        '  --select state:modified+ \\',
        '  --defer \\',
        '  --state ./prod-artifacts \\',
        '  --target ci',
      ].join('\n'),
    },
    {
      id: 'life',
      label: 'The life of one pull request',
      pattern: 'group',
      cols: 4,
      children: [
        { id: 'p-open', label: '1 · Open the PR', sub: 'two models changed', pattern: 'network', icon: 'gitbranch' },
        { id: 'p-build', label: '2 · Build those', sub: 'plus what is downstream', pattern: 'service', icon: 'gears' },
        { id: 'p-test', label: '3 · Test them', sub: 'the PR goes green or red', pattern: 'storage', icon: 'shieldcheck' },
        { id: 'p-drop', label: '4 · Drop the schema', sub: 'nothing is left behind', pattern: 'external', icon: 'trash' },
      ],
    },
    {
      id: 'diff',
      label: 'Minutes, not hours',
      sub: 'on real data, before it merges',
      pattern: 'user',
      icon: 'clock',
    },
  ],
  edges: [
    { source: 'cmd', target: 'life', label: 'state picks what to build, defer supplies everything else' },
    { source: 'life', target: 'diff', label: 'a fresh schema per pull request, dropped when it closes' },
  ],
}
