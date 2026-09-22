import type { Scene } from '@graphlearning/flow'

// §04. A macro is a function that returns SQL — so the scene shows the definition and two different
// call sites, because "reusable" is only convincing when you see it used twice. The dispatch rule is
// the part people meet later and confusedly: your project's macro wins over a package's.
export const macroAnatomy: Scene = {
  id: 'macro-anatomy',
  title: 'A function that returns SQL',
  nodes: [
    {
      id: 'def',
      kind: 'code',
      hug: true,
      filename: 'macros/cents_to_pounds.sql',
      label: [
        '{% macro cents_to_pounds(column_name, decimals=2) %}',
        '    round( {{ column_name }} / 100.0, {{ decimals }} )',
        '{% endmacro %}',
      ].join('\n'),
    },
    {
      id: 'use',
      kind: 'code',
      hug: true,
      filename: 'used in two different models',
      label: [
        'select',
        '    order_id,',
        '    {{ cents_to_pounds("amount_cents") }} as amount,',
        '    {{ cents_to_pounds("tax_cents", 4) }} as tax',
        "from {{ ref('stg_orders') }}",
      ].join('\n'),
    },
    {
      id: 'rules',
      label: 'Three things to know',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'm-where', label: 'Lives in macros/', sub: 'one file can hold several', pattern: 'service', icon: 'folder' },
        { id: 'm-ret', label: 'It returns text', sub: 'a fragment, not a whole query', pattern: 'network', icon: 'braces' },
        { id: 'm-win', label: 'Yours wins', sub: 'your macro beats a package of the same name', pattern: 'storage', icon: 'shieldcheck' },
      ],
    },
    {
      id: 'good',
      label: 'Good macros are small',
      sub: 'a fragment, not a model with holes',
      pattern: 'user',
      icon: 'ruler',
    },
  ],
  edges: [
    { source: 'def', target: 'use', label: 'arguments with defaults, exactly like any function' },
    { source: 'use', target: 'rules', label: 'called with double braces, because it prints its result' },
    { source: 'rules', target: 'good', label: 'and the shape that stays maintainable' },
  ],
}
