import type { Scene } from '@graphlearning/flow'

// §09. The closing checklist, phrased as what a SECOND team needs rather than as best practice —
// because every item is cheap while a project is small and expensive to retrofit once somebody is
// already depending on it. The last card is the honest summary of the whole course.
export const govChecklist: Scene = {
  id: 'gov-checklist',
  title: 'Before a second team is allowed in',
  nodes: [
    {
      id: 'list',
      label: 'Six things, and all six are cheap today',
      kind: 'table',
      pattern: 'service',
      headers: ['Do this', 'So that'],
      values: [
        ['Describe every public model', 'a stranger knows what a row means'],
        ['Put every model in a group', 'there is a person to ask'],
        ['Set access deliberately', 'private stays private by design'],
        ['Contract the public ones', 'the shape cannot drift silently'],
        ['Declare your exposures', 'impact analysis reaches the dashboard'],
        ['Agree a deprecation policy', 'a breaking change has a procedure'],
      ],
    },
    {
      id: 'when',
      label: 'Do it while it is small',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'w-now', label: 'Today', sub: 'six yml edits, one afternoon', pattern: 'storage', icon: 'circlecheck' },
        { id: 'w-later', label: 'Once depended on', sub: 'a negotiation with another team', pattern: 'warn', icon: 'users' },
      ],
    },
    {
      id: 'sum', 
      label: 'Three questions',
      sub: 'what is this · who owns it · who may use it',
      pattern: 'user',
      icon: 'scroll',
    },
  ],
  edges: [
    { source: 'list', target: 'when', label: 'none of it is hard; all of it is hard to retrofit' },
    { source: 'when', target: 'sum', label: 'and the whole course in one line' },
  ],
}
