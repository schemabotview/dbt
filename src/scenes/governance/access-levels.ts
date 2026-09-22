import type { Scene } from '@graphlearning/flow'

// §05. Three levels, and the useful framing is "who may ref this", not the keyword itself. The
// default being `protected` matters: people assume everything is public and discover otherwise the
// first time they try a cross-project ref.
export const accessLevels: Scene = {
  id: 'access-levels',
  title: 'Who is allowed to ref this?',
  nodes: [
    {
      id: 'board',
      label: 'Three answers',
      kind: 'table',
      pattern: 'service',
      headers: ['access', 'Can be ref’d by', 'For'],
      values: [
        ['private', 'only its own group', 'an intermediate step, nobody else’s business'],
        ['protected', 'anything in this project', 'the default — internal, but shared'],
        ['public', 'any project, including others', 'a deliberate, supported interface'],
      ],
    },
    {
      id: 'code',
      kind: 'code',
      hug: true,
      filename: 'set it beside the group',
      label: [
        '  - name: int_orders_pivoted',
        '    config:',
        '      group: finance',
        '      access: private        # finance models only',
        '',
        '  - name: fct_orders',
        '    config:',
        '      access: public         # and it had better have a contract',
      ].join('\n'),
    },
    {
      id: 'pair',
      label: 'public is a promise',
      sub: 'so give it a contract and a version',
      pattern: 'warn',
      icon: 'shieldcheck',
    },
  ],
  edges: [
    { source: 'board', target: 'code', label: 'the default is protected, not public' },
    { source: 'code', target: 'pair', label: 'and marking something public is not a free label' },
  ],
}
