import type { Scene } from '@graphlearning/flow'

// §03. Two functions that look interchangeable and are not: one is project configuration, the other
// is deployment configuration. The table is the fastest way to make that stick, and the secret
// prefix is on it because it is the one operational detail with a real consequence.
export const varsEnvvars: Scene = {
  id: 'vars-envvars',
  title: 'Two ways to parameterise a run',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'both, side by side',
      label: [
        '# dbt_project.yml — a project-level default',
        'vars:',
        '  lookback_days: 30',
        '',
        '-- in a model',
        "where created_at >= dateadd('day', -{{ var('lookback_days', 7) }}, current_date)",
        '',
        '# overridden per run',
        "$ dbt run --vars '{lookback_days: 365}'",
        '',
        '# and in profiles.yml, where the value is a SECRET',
        "account: \"{{ env_var('DBT_ACCOUNT') }}\"",
      ].join('\n'),
    },
    {
      id: 'diff',
      label: 'They answer different questions',
      kind: 'table',
      pattern: 'service',
      headers: ['', 'var()', 'env_var()'],
      values: [
        ['Set in', 'dbt_project.yml, or --vars', 'the machine running dbt'],
        ['Is about', 'the project', 'the deployment'],
        ['In git?', 'yes — it is project config', 'never, if it is a secret'],
        ['Default', 'second argument', 'second argument'],
      ],
    },
    {
      id: 'secret',
      label: 'A prefix for secrets',
      sub: 'DBT_ENV_SECRET_ is scrubbed from logs',
      pattern: 'storage',
      icon: 'key',
    },
  ],
  edges: [
    { source: 'code', target: 'diff', label: 'both take a default as their second argument' },
    { source: 'diff', target: 'secret', label: 'and one naming convention worth knowing' },
  ],
}
