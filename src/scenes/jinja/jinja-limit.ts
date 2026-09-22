import type { Scene } from '@graphlearning/flow'

// §10. The closing judgement, and it needs an honest example rather than a scolding: the card shows
// a template that is genuinely hard to read, and the test below is the one question worth asking.
// `target/compiled` returning as the answer closes the loop opened in the foundations course.
export const jinjaLimit: Scene = {
  id: 'jinja-limit',
  title: 'When the answer is plain SQL',
  nodes: [
    {
      id: 'bad',
      kind: 'code',
      filename: 'technically impressive, and nobody can debug it',
      label: [
        '{% set cols = dbt_utils.get_filtered_columns_in_relation(ref("stg_orders")) %}',
        '{% for c in cols %}',
        '  {% if c not in exclude and (c.endswith("_at") or c in date_overrides) %}',
        '    {{ tz_convert(c, var("tz", "UTC")) }} as {{ rename_map.get(c, c) }}',
        '    {%- if not loop.last %},{% endif %}',
        '  {% endif %}',
        '{% endfor %}',
      ].join('\n'),
    },
    {
      id: 'test',
      label: 'The question to ask',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 't-read', label: 'Readable as written?', sub: 'without compiling it first', pattern: 'user', icon: 'users' },
        { id: 't-debug', label: 'Debuggable at 2am?', sub: 'when the number is wrong', pattern: 'user', icon: 'bug' },
        { id: 't-worth', label: 'What did it save?', sub: 'often: twenty lines of obvious SQL', pattern: 'user', icon: 'scale' },
      ],
    },
    {
      id: 'rules',
      label: 'Two habits',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'r-read', label: 'Optimise for reading', sub: 'models are read far more than written', pattern: 'storage', icon: 'monitor' },
        { id: 'r-comp', label: 'Read the compiled', sub: 'if it surprises you, simplify', pattern: 'storage', icon: 'filecode' },
      ],
    },
  ],
  edges: [
    { source: 'bad', target: 'test', label: 'every line of this was a reasonable decision on its own' },
    { source: 'test', target: 'rules', label: 'three answers that usually point the same way' },
  ],
}
