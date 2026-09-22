import type { Scene } from '@graphlearning/flow'

// §08. The one place in this concept where dbt Core genuinely has no answer, so the scene says so
// plainly rather than burying it. The two-argument ref is the whole API; everything else is the
// conditions it depends on — a public model, with a contract, and a platform that brokers it.
export const crossProject: Scene = {
  id: 'cross-project',
  title: 'A ref that crosses a project boundary',
  nodes: [
    {
      id: 'two',
      label: 'Two projects, one reference',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'c-up', label: 'The producer', sub: 'jaffle_finance owns fct_orders', pattern: 'storage', icon: 'package' },
        { id: 'c-down', label: 'The consumer', sub: 'jaffle_marketing refs it, never builds it', pattern: 'service', icon: 'filecode' },
      ],
      edges: [{ source: 'c-up', target: 'c-down' }],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'the whole API',
      label: [
        '# dependencies.yml, in the downstream project',
        'projects:',
        '  - name: jaffle_finance',
        '',
        '-- and then, in a model',
        "select * from {{ ref('jaffle_finance', 'fct_orders') }}",
        '--                  ^ project          ^ model',
      ].join('\n'),
    },
    {
      id: 'needs',
      label: 'What it requires',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'n-pub', label: 'access: public', sub: 'protected models stay home', pattern: 'network', icon: 'dooropen' },
        { id: 'n-contract', label: 'A contract', sub: 'a shape the consumer can rely on', pattern: 'network', icon: 'shieldcheck' },
        { id: 'n-platform', label: 'The dbt platform', sub: 'Core alone cannot broker this', pattern: 'warn', icon: 'cloud' },
      ],
    },
  ],
  edges: [
    { source: 'two', target: 'code', label: 'the consumer reads the producer’s output; it does not run it' },
    { source: 'code', target: 'needs', label: 'two arguments instead of one — that is the entire difference' },
  ],
}
