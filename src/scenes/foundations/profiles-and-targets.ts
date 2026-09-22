import type { Scene } from '@graphlearning/flow'

// §07. The teaching is a boundary: the repo is public-ish and holds no secret, the profile is local
// and holds every secret. So the scene is drawn as two containers with the line between them
// labelled — and the code card shows one profile with TWO targets, which is the whole dev/prod story.
export const profilesAndTargets: Scene = {
  id: 'profiles-and-targets',
  title: 'Where the credentials are not',
  nodes: [
    {
      id: 'split',
      label: 'Two files, deliberately far apart',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'p-repo', label: 'The project', sub: 'committed, shared, no secrets', pattern: 'service', icon: 'gitbranch' },
        { id: 'p-prof', label: 'The profile', sub: '~/.dbt, or env vars in CI', pattern: 'warn', icon: 'key' },
      ],
    },
    {
      id: 'yml',
      kind: 'code',
      filename: '~/.dbt/profiles.yml',
      label: [
        'jaffle_shop:              # matches `profile:` in dbt_project.yml',
        '  target: dev             # the default when you type `dbt run`',
        '  outputs:',
        '    dev:',
        '      type: snowflake',
        '      account: ab12345.eu-west-1',
        '      user: alice',
        '      role: transformer',
        '      warehouse: dev_wh',
        '      database: analytics_dev',
        '      schema: dbt_alice   # your own sandbox, nobody else builds here',
        '      threads: 4',
        '    prod:',
        '      type: snowflake',
        "      account: \"{{ env_var('DBT_ACCOUNT') }}\"",
        '      schema: analytics   # the one everyone reads',
        '      threads: 8',
      ].join('\n'),
    },
    {
      id: 'flag',
      label: 'One flag apart',
      sub: 'dbt run --target prod',
      pattern: 'user',
      icon: 'swap',
    },
  ],
  edges: [
    { source: 'split', target: 'yml', label: 'the profile names the warehouse; the project never does' },
    { source: 'yml', target: 'flag', label: 'and one profile can hold as many targets as you need' },
  ],
}
