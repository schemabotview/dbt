import type { Scene } from '@graphlearning/flow'

// §04. The promotion: the same assertion, written once and applied many times. Two cards, because
// the point is the pair — a macro that takes `model` and `column_name` for free, and the yml that
// now reads like a built-in. The third card is the trigger: write it the second time, not the first.
export const customGeneric: Scene = {
  id: 'custom-generic',
  title: 'Write it once, use it everywhere',
  nodes: [
    {
      id: 'macro',
      kind: 'code',
      hug: true,
      filename: 'tests/generic/is_positive.sql',
      label: [
        '{% test is_positive(model, column_name, allow_zero=false) %}',
        '',
        'select {{ column_name }}',
        'from {{ model }}',
        'where {{ column_name }} <{% if not allow_zero %}={% endif %} 0',
        '',
        '{% endtest %}',
      ].join('\n'),
    },
    {
      id: 'use',
      kind: 'code',
      hug: true,
      filename: 'and now it is a test like any other',
      label: [
        'columns:',
        '  - name: amount',
        '    data_tests:',
        '      - is_positive',
        '',
        '  - name: discount',
        '    data_tests:',
        '      - is_positive:',
        '          allow_zero: true',
      ].join('\n'),
    },
    {
      id: 'free',
      label: 'What dbt hands the macro',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'f-model', label: 'model', sub: 'the relation it is attached to', pattern: 'service', icon: 'table' },
        { id: 'f-col', label: 'column_name', sub: 'set when it sits on a column', pattern: 'service', icon: 'tag' },
        { id: 'f-args', label: 'Your own arguments', sub: 'with defaults, like any function', pattern: 'network', icon: 'braces' },
      ],
    },
    {
      id: 'when',
      label: 'Write it the second time',
      sub: 'the first copy is fine; the second one is the signal',
      pattern: 'user',
      icon: 'copy',
    },
  ],
  edges: [
    { source: 'macro', target: 'use', label: 'the filename is the test name' },
    { source: 'use', target: 'free', label: 'the same shape as the built-ins, because they are built this way too' },
    { source: 'free', target: 'when', label: 'and the honest rule for when to bother' },
  ],
}
