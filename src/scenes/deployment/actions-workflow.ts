import type { Scene } from '@graphlearning/flow'

// §07. One real file, end to end, because every other treatment of CI skips the awkward parts —
// where the credentials come from and where last night's manifest comes from. Both are called out
// in the band below rather than hidden in the yaml.
export const actionsWorkflow: Scene = {
  id: 'actions-workflow',
  title: 'The whole workflow file',
  nodes: [
    {
      id: 'yml',
      kind: 'code',
      filename: '.github/workflows/ci.yml',
      label: [
        'on: [pull_request]',
        '',
        'jobs:',
        '  dbt:',
        '    runs-on: ubuntu-latest',
        '    env:',
        '      DBT_ACCOUNT: ${{ secrets.DBT_ACCOUNT }}',
        '      DBT_ENV_SECRET_KEY: ${{ secrets.DBT_KEY }}',
        '    steps:',
        '      - uses: actions/checkout@v4',
        '      - uses: actions/setup-python@v5',
        '      - run: pip install dbt-snowflake',
        '      - run: dbt deps',
        '',
        '      # last night’s manifest, from wherever you keep it',
        '      - run: aws s3 cp s3://dbt-artifacts/manifest.json ./prod-artifacts/',
        '',
        '      - run: dbt build --select state:modified+ --defer',
        '                       --state ./prod-artifacts --target ci',
      ].join('\n'),
    },
    {
      id: 'two',
      label: 'The two awkward parts',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'a-creds', label: 'Credentials', sub: 'repo secrets → env vars → profiles.yml', pattern: 'warn', icon: 'key' },
        { id: 'a-state', label: 'Last run’s manifest', sub: 'your prod job has to upload it first', pattern: 'warn', icon: 'history' },
      ],
    },
    {
      id: 'note',
      label: 'CI needs a warehouse',
      sub: 'it really builds — budget for it',
      pattern: 'user',
      icon: 'receipt',
    },
  ],
  edges: [
    { source: 'yml', target: 'two', label: 'nothing here is dbt-specific except the last two lines' },
    { source: 'two', target: 'note', label: 'and one cost people forget to plan for' },
  ],
}
