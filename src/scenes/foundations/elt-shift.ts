import type { Scene } from '@graphlearning/flow'

// §01. The argument is an address change, so the scene is the same three boxes twice with the
// middle one moved — not two unrelated pipelines. The transform box is `warn` in the top row and
// `service` in the bottom: the point is that it stopped being the bottleneck, not that it vanished.
// The third band is what the move LEFT BEHIND, which is the hole the rest of the concept fills.
export const eltShift: Scene = {
  id: 'elt-shift',
  title: 'The T moved to the end',
  nodes: [
    {
      id: 'etl',
      label: 'ETL — transform on the way in',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'etl-src', label: 'Sources', sub: 'apps, files, APIs', pattern: 'external', icon: 'cloud' },
        { id: 'etl-t', label: 'Transform server', sub: 'one box, one schedule, one team', pattern: 'warn', icon: 'cpu' },
        { id: 'etl-wh', label: 'Warehouse', sub: 'clean tables only', pattern: 'storage', icon: 'database' },
      ],
      edges: [
        { source: 'etl-src', target: 'etl-t' },
        { source: 'etl-t', target: 'etl-wh' },
      ],
    },
    {
      id: 'elt',
      label: 'ELT — load first, transform in place',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'elt-src', label: 'Sources', sub: 'the same ones', pattern: 'external', icon: 'cloud' },
        { id: 'elt-raw', label: 'Raw, as it arrived', sub: 'landed untouched, kept', pattern: 'storage', icon: 'database' },
        { id: 'elt-t', label: 'Transform', sub: 'SQL, on warehouse compute', pattern: 'service', icon: 'workflow' },
      ],
      edges: [
        { source: 'elt-src', target: 'elt-raw' },
        { source: 'elt-raw', target: 'elt-t' },
      ],
    },
    {
      id: 'gap',
      label: 'And that left a gap',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'g-ver', label: 'Nobody owns it', sub: 'SQL in a dozen places', pattern: 'warn', icon: 'ban' },
        { id: 'g-dep', label: 'No known order', sub: 'which table feeds which?', pattern: 'warn', icon: 'gitbranch' },
        { id: 'g-test', label: 'Nothing is checked', sub: 'wrong numbers ship quietly', pattern: 'warn', icon: 'circleslash' },
      ],
    },
  ],
  edges: [
    { source: 'etl', target: 'elt', label: 'cheap elastic compute made the middle box the expensive way to do it' },
    { source: 'elt', target: 'gap', label: 'the T is now SQL — and SQL alone has none of the habits of code' },
  ],
}
