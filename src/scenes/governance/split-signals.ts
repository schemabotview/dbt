import type { Scene } from '@graphlearning/flow'

// §07. A judgement section, so the scene is symmetrical on purpose: the real signals on one side,
// the bad reasons on the other. Splitting is genuinely expensive and mostly irreversible, and the
// commonest mistake is splitting for tidiness rather than for ownership.
export const splitSignals: Scene = {
  id: 'split-signals',
  title: 'When one project should become two',
  nodes: [
    {
      id: 'real',
      label: 'Real signals',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'r-teams', label: 'Two teams, two clocks', sub: 'each wants its own release pace', pattern: 'service', icon: 'users' },
        { id: 'r-review', label: 'Reviews are a formality', sub: 'nobody understands the other half', pattern: 'service', icon: 'scroll' },
        { id: 'r-ci', label: 'CI is the bottleneck', sub: 'a one-line change waits on everything', pattern: 'service', icon: 'clock' },
        { id: 'r-perm', label: 'Permissions differ', sub: 'one half handles data the other may not see', pattern: 'service', icon: 'lock' },
      ],
    },
    {
      id: 'bad',
      label: 'Bad reasons',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'b-big', label: 'It feels big', sub: 'a folder fixes this; a split does not', pattern: 'warn', icon: 'ban' },
        { id: 'b-tidy', label: 'Tidiness', sub: 'groups and access are the cheap version', pattern: 'warn', icon: 'ban' },
        { id: 'b-new', label: 'A new team exists', sub: 'they can own a group first', pattern: 'warn', icon: 'ban' },
      ],
    },
    {
      id: 'cost',
      label: 'The cost is one-way',
      sub: 'two repos, two CI setups, two schedules',
      pattern: 'warn',
      icon: 'scale',
    },
  ],
  edges: [
    { source: 'real', target: 'bad', label: 'all four are about PEOPLE, not about size' },
    { source: 'bad', target: 'cost', label: 'and the reason to be sure before you do it' },
  ],
}
