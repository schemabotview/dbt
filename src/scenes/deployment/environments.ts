import type { Scene } from '@graphlearning/flow'

// §01. The foundations course covered profiles and targets as a FILE; this is the same idea as an
// operational fact — three environments that differ in who runs them and what they are allowed to
// touch. The credentials row is the one that matters: a person's key running production is the
// single most common audit finding in a young dbt project.
export const environments: Scene = {
  id: 'environments',
  title: 'One project, three environments',
  nodes: [
    {
      id: 'board',
      label: 'The same models, three ways to run them',
      kind: 'table',
      pattern: 'service',
      headers: ['', 'dev', 'CI', 'prod'],
      values: [
        ['Run by', 'a person, ad hoc', 'a pull request', 'a schedule'],
        ['Builds into', 'dbt_alice', 'a throwaway schema', 'analytics'],
        ['Credentials', "the person's own", 'a CI service account', 'a prod service account'],
        ['Scope', 'what you are working on', 'what changed', 'everything'],
        ['On failure', 'you notice', 'the PR goes red', 'somebody is paged'],
      ],
    },
    {
      id: 'same',
      label: 'What is identical',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'e-code', label: 'The models', sub: 'the same commit, the same SQL', pattern: 'storage', icon: 'filecode' },
        { id: 'e-tests', label: 'The tests', sub: 'the same assertions, everywhere', pattern: 'storage', icon: 'shieldcheck' },
        { id: 'e-cmd', label: 'The command', sub: 'dbt build, with a different target', pattern: 'storage', icon: 'terminal' },
      ],
    },
    {
      id: 'creds',
      label: 'Not as yourself',
      sub: 'prod runs as a service account',
      pattern: 'warn',
      icon: 'key',
    },
  ],
  edges: [
    { source: 'board', target: 'same', label: 'the differences are all operational, not logical' },
    { source: 'same', target: 'creds', label: 'and one rule that is worth enforcing early' },
  ],
}
