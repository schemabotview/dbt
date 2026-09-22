import type { Scene } from '@graphlearning/flow'

// §05. The genuinely useful case for control flow: a pivot, where the repetition is mechanical and
// the list is data. The trailing-comma problem is on screen because every learner hits it in their
// first loop, and the loop.last fix is one line.
export const loopColumns: Scene = {
  id: 'loop-columns',
  title: 'Repetition the template can write for you',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'a pivot, written once',
      label: [
        '{% set payment_methods = ["card", "bank_transfer", "coupon"] %}',
        '',
        'select',
        '    order_id,',
        '{% for method in payment_methods %}',
        "    sum(case when method = '{{ method }}' then amount end)",
        '        as {{ method }}_amount{% if not loop.last %},{% endif %}',
        '{% endfor %}',
        "from {{ ref('stg_payments') }}",
        'group by 1',
      ].join('\n'),
    },
    {
      id: 'bits',
      label: 'The three pieces',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'l-set', label: 'set', sub: 'a list, defined once at the top', pattern: 'service', icon: 'braces' },
        { id: 'l-for', label: 'for', sub: 'the body repeats per item', pattern: 'network', icon: 'repeat' },
        { id: 'l-last', label: 'loop.last', sub: 'the trailing-comma fix', pattern: 'storage', icon: 'scissors' },
      ],
    },
    {
      id: 'dynamic',
      label: 'Or read it live',
      sub: 'get_column_values, so new ones appear',
      pattern: 'user',
      icon: 'database',
    },
  ],
  edges: [
    { source: 'code', target: 'bits', label: 'three payment methods, one written expression' },
    { source: 'bits', target: 'dynamic', label: 'and the hardcoded list is not the only option' },
  ],
}
