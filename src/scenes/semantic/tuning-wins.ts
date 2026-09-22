import type { Scene } from '@graphlearning/flow'

// §06. Deliberately unglamorous. Every win here is a config change or a deletion — nothing clever,
// because the clever tuning is almost never where the money is. The trap card is the point: measure
// before you tune, or you will optimise the model that was already cheap.
export const tuningWins: Scene = {
  id: 'tuning-wins',
  title: 'The cheap wins, in order',
  nodes: [
    {
      id: 'first',
      label: 'Look here first',
      pattern: 'group',
      cols: 4,
      children: [
        { id: 't-mat', label: 'Table vs view', sub: 'a table nobody reads twice', pattern: 'service', icon: 'layers' },
        { id: 't-inc', label: 'The rebuild', sub: 'incremental with a tight filter', pattern: 'storage', icon: 'repeat' },
        { id: 't-dead', label: 'Dead models', sub: 'built nightly, read by nobody', pattern: 'warn', icon: 'trash' },
        { id: 't-ci', label: 'CI on everything', sub: 'defer to prod, build the slice', pattern: 'user', icon: 'gitbranch' },
      ],
    },
    {
      id: 'measure',
      label: 'Read the run first',
      sub: 'the artifacts already time every model',
      pattern: 'external',
      icon: 'clock',
    },
    {
      id: 'trap',
      label: 'Do not tune blind',
      sub: 'the slowest model is rarely the dearest',
      pattern: 'warn',
      icon: 'search',
    },
  ],
  edges: [
    { source: 'first', target: 'measure', label: 'but none of it before you have numbers' },
    { source: 'measure', target: 'trap', label: 'because slow and expensive are different questions' },
  ],
}
