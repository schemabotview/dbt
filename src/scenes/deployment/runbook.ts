import type { Scene } from '@graphlearning/flow'

// §10. The closing checklist, and it is deliberately an ORDER rather than a list of features: each
// step exists because skipping it makes a later step lie. The ownership card is last because every
// item above it is worthless if the alert goes to a channel nobody reads.
export const runbook: Scene = {
  id: 'runbook',
  title: 'What a production job should do',
  nodes: [
    {
      id: 'order',
      label: 'In this order, every night',
      pattern: 'group',
      cols: 5,
      children: [
        { id: 'r-1', label: '1 · Freshness', sub: 'stop if the loader is broken', pattern: 'network', icon: 'clock' },
        { id: 'r-2', label: '2 · Snapshot', sub: 'capture today before transforming', pattern: 'network', icon: 'history' },
        { id: 'r-3', label: '3 · Build', sub: 'models, seeds and tests together', pattern: 'service', icon: 'gears' },
        { id: 'r-4', label: '4 · Docs', sub: 'generate, and publish somewhere', pattern: 'storage', icon: 'scroll' },
        { id: 'r-5', label: '5 · Upload', sub: 'the artifacts, for tomorrow', pattern: 'storage', icon: 'package' },
      ],
    },
    {
      id: 'why',
      label: 'Why the order matters',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'y-1', label: 'Freshness first', sub: 'otherwise you republish yesterday', pattern: 'user', icon: 'ban' },
        { id: 'y-2', label: 'Snapshot before build', sub: 'history survives a failed build', pattern: 'user', icon: 'shieldcheck' },
        { id: 'y-3', label: 'Upload last', sub: 'tomorrow’s CI depends on it', pattern: 'user', icon: 'repeat' },
      ],
    },
    {
      id: 'own',
      label: 'Somebody is paged',
      sub: 'or every step above is decorative',
      pattern: 'warn',
      icon: 'bell',
    },
  ],
  edges: [
    { source: 'order', target: 'why', label: 'five steps, and none of them is optional' },
    { source: 'why', target: 'own', label: 'each one exists because skipping it makes a later one lie' },
  ],
}
