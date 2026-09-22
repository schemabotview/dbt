import type { Scene } from '@graphlearning/flow'

// §08. Two things that are genuinely awkward: a row that VANISHES (deletion is not a value change,
// so neither strategy sees it) and the fact that a snapshot cannot be rebuilt. The three hard_deletes
// modes are drawn as a row because the choice is a three-way one, not a boolean.
export const snapshotConfig: Scene = {
  id: 'snapshot-config',
  title: 'When a row simply disappears',
  nodes: [
    {
      id: 'modes',
      label: 'hard_deletes — the row is gone from the source',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'h-ignore', label: 'ignore', sub: 'the default: it stays open forever', pattern: 'warn', icon: 'ban' },
        { id: 'h-inval', label: 'invalidate', sub: 'close the row, dated now', pattern: 'service', icon: 'circleslash' },
        { id: 'h-new', label: 'new_record', sub: 'write a row marked deleted', pattern: 'storage', icon: 'scroll' },
      ],
    },
    {
      id: 'rules',
      label: 'Three rules that do not bend',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'r-src', label: 'Snapshot the source', sub: 'not a model — logic can be redone', pattern: 'user', icon: 'database' },
        { id: 'r-plain', label: 'No transformation', sub: 'select the raw columns, nothing else', pattern: 'user', icon: 'filecode' },
        { id: 'r-never', label: 'Never drop it', sub: 'a snapshot cannot be rebuilt', pattern: 'warn', icon: 'skull' },
      ],
    },
    {
      id: 'sacred',
      label: 'Cannot be rebuilt',
      sub: 'it IS the source of its own history',
      pattern: 'warn',
      icon: 'lock',
    },
  ],
  edges: [
    { source: 'modes', target: 'rules', label: 'a deletion is not a value change, so it needs its own answer' },
    { source: 'rules', target: 'sacred', label: 'and all three rules come from one property' },
  ],
}
