import type { Scene } from '@graphlearning/flow'

// §05. The problem before the solution. The shape is a growth curve drawn as three stages, because
// the point is that nothing breaks — the run just gets slower every week until a threshold nobody
// set is crossed. The right-hand card is the asymmetry that makes incremental obvious: almost all
// of that work recomputes rows that did not change.
export const rebuildWall: Scene = {
  id: 'rebuild-wall',
  title: 'The rebuild that stopped fitting',
  nodes: [
    {
      id: 'growth',
      label: 'Same model, same code, three years apart',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'r-y1', label: 'Year one', sub: '4 minutes — nobody notices', pattern: 'service', icon: 'clock' },
        { id: 'r-y2', label: 'Year two', sub: '25 minutes — mildly annoying', pattern: 'service', icon: 'clock' },
        { id: 'r-y3', label: 'Year three', sub: 'two hours, and it missed the 7am SLA', pattern: 'warn', icon: 'skull' },
      ],
      edges: [
        { source: 'r-y1', target: 'r-y2' },
        { source: 'r-y2', target: 'r-y3' },
      ],
    },
    {
      id: 'why',
      label: 'Nothing broke',
      sub: 'a table rebuilds all of history, every run',
      pattern: 'warn',
      icon: 'repeat',
    },
    {
      id: 'ask',
      label: 'What actually changed',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'a-old', label: 'Three years of rows', sub: 'identical to yesterday', pattern: 'storage', icon: 'database' },
        { id: 'a-new', label: 'One day of rows', sub: 'the only new work there is', pattern: 'service', icon: 'zap' },
      ],
    },
  ],
  edges: [
    { source: 'growth', target: 'why', label: 'no alert fires — the run just takes longer every week' },
    { source: 'why', target: 'ask', label: 'so ask what the run is actually spending its time on' },
  ],
}
