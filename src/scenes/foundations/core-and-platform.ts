import type { Scene } from '@graphlearning/flow'

// §04. A table, because the honest answer is a row-by-row comparison and a diagram would fake a
// relationship that is not there. The last row is deliberately the one people get wrong: the SQL
// and the project are IDENTICAL either way, so nothing in this concept is platform-only.
export const coreAndPlatform: Scene = {
  id: 'core-and-platform',
  title: 'Same project, two ways to run it',
  nodes: [
    {
      id: 'cmp',
      label: 'dbt Core against the dbt platform',
      kind: 'table',
      pattern: 'service',
      headers: ['', 'dbt Core', 'dbt platform'],
      values: [
        ['What it is', 'an open-source CLI', 'a hosted service around it'],
        ['Runs where', 'your laptop, your CI, your server', 'their infrastructure'],
        ['Scheduling', 'none — Airflow, cron, Actions', 'built-in jobs and alerts'],
        ['Editing', 'your editor', 'browser IDE, or your editor'],
        ['Costs', 'nothing', 'per developer seat'],
        ['The project', 'identical', 'identical'],
      ],
    },
    {
      id: 'fusion',
      label: 'The Fusion engine',
      sub: 'it parses SQL, not just text',
      pattern: 'service',
      icon: 'zap',
    },
    {
      id: 'here',
      label: 'Core-first here',
      sub: 'the platform, where Core cannot',
      pattern: 'user',
      icon: 'terminal',
    },
  ],
  edges: [
    { source: 'cmp', target: 'fusion', label: 'and the engine underneath both is being replaced' },
    { source: 'fusion', target: 'here', label: 'which changes speed and safety, not what a project is' },
  ],
}
