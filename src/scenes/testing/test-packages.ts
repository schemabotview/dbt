import type { Scene } from '@graphlearning/flow'

// §07. A catalogue section, so a table is the right shape — and the choice of rows is the value:
// these are the tests people reinvent by hand as singular tests before discovering they already
// exist. `expression_is_true` is listed last because it subsumes half of what people hand-roll.
export const testPackages: Scene = {
  id: 'test-packages',
  title: 'The tests you would otherwise write twice',
  nodes: [
    {
      id: 'pkg',
      kind: 'code',
      hug: true,
      filename: 'packages.yml',
      label: [
        'packages:',
        '  - package: dbt-labs/dbt_utils',
        '    version: [">=1.3.0", "<2.0.0"]',
        '',
        '$ dbt deps',
      ].join('\n'),
    },
    {
      id: 'board',
      label: 'The ones worth knowing by name',
      kind: 'table',
      pattern: 'service',
      headers: ['Test', 'Asserts that'],
      values: [
        ['unique_combination_of_columns', 'two columns are unique TOGETHER'],
        ['accepted_range', 'a number stays inside sane bounds'],
        ['not_null_proportion', 'at least x% of rows have a value'],
        ['equal_rowcount', 'two models have the same row count'],
        ['recency', 'the newest row is not older than n days'],
        ['expression_is_true', 'any SQL expression holds, per row'],
      ],
    },
    {
      id: 'note',
      label: 'It is a dependency',
      sub: 'pin the range, run dbt deps in CI',
      pattern: 'network',
      icon: 'package',
    },
  ],
  edges: [
    { source: 'pkg', target: 'board', label: 'installed into dbt_packages/, gitignored like node_modules' },
    { source: 'board', target: 'note', label: 'and one operational point before you add three of them' },
  ],
}
