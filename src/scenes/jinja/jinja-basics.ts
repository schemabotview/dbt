import type { Scene } from '@graphlearning/flow'

// §01. Three delimiters and one sentence — Jinja runs BEFORE the warehouse sees anything. The
// before/after pair is the same device the models course used for ref, deliberately: by now the
// learner reads "you wrote / dbt sent" as the shape of every compile question.
export const jinjaBasics: Scene = {
  id: 'jinja-basics',
  title: 'Three delimiters, and one rule',
  nodes: [
    {
      id: 'pair',
      kind: 'code',
      filename: 'templating, before and after',
      label: [
        '-- you wrote:',
        '{% set statuses = ["pending", "shipped"] %}',
        'select',
        '{% for s in statuses %}',
        "    sum(case when status = '{{ s }}' then 1 end) as {{ s }}_count,",
        '{% endfor %}',
        '    count(*) as total',
        "from {{ ref('stg_orders') }}",
        '',
        '-- dbt sent:',
        'select',
        "    sum(case when status = 'pending' then 1 end) as pending_count,",
        "    sum(case when status = 'shipped' then 1 end) as shipped_count,",
        '    count(*) as total',
        'from analytics.dbt_alice.stg_orders',
      ].join('\n'),
    },
    {
      id: 'delims',
      label: 'The three you need',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'd-expr', label: '{{ ... }}', sub: 'evaluate, and print the result', pattern: 'service', icon: 'braces' },
        { id: 'd-stmt', label: '{% ... %}', sub: 'do something, print nothing', pattern: 'network', icon: 'workflow' },
        { id: 'd-cmt', label: '{# ... #}', sub: 'a comment that never compiles', pattern: 'external', icon: 'scissors' },
      ],
    },
    {
      id: 'rule',
      label: 'Before the warehouse',
      sub: 'it only ever sees the result',
      pattern: 'user',
      icon: 'zap',
    },
  ],
  edges: [
    { source: 'pair', target: 'delims', label: 'a loop, a variable and a ref — all gone by the time it runs' },
    { source: 'delims', target: 'rule', label: 'and the one sentence that explains every surprise later' },
  ],
}
