import type { Scene } from '@graphlearning/flow'

// §09. The testing course used packages as a source of TESTS; this is the package system. The
// gotcha card carries the section: a package's models are real models and they build into your
// warehouse, which surprises people the first time an install adds objects they did not write.
export const packages: Scene = {
  id: 'packages',
  title: 'Somebody else’s macros, inside your project',
  nodes: [
    {
      id: 'yml',
      kind: 'code',
      filename: 'packages.yml — three ways to name a source',
      label: [
        'packages:',
        '  - package: dbt-labs/dbt_utils        # the hub',
        '    version: [">=1.3.0", "<2.0.0"]',
        '',
        '  - git: "https://github.com/acme/dbt-internal.git"',
        '    revision: v2.1.0                   # a tag, never a branch',
        '',
        '  - local: ../dbt-shared               # a sibling checkout',
      ].join('\n'),
    },
    {
      id: 'useful',
      label: 'dbt_utils macros worth knowing',
      kind: 'table',
      pattern: 'service',
      headers: ['Macro', 'Does'],
      values: [
        ['generate_surrogate_key', 'a hash key from several columns'],
        ['star', 'select every column except these'],
        ['union_relations', 'stack tables with differing columns'],
        ['date_spine', 'a row per day between two dates'],
        ['deduplicate', 'the newest row per key'],
      ],
    },
    {
      id: 'gotcha',
      label: 'Packages add MODELS',
      sub: 'they build in your warehouse',
      pattern: 'warn',
      icon: 'skull',
    },
  ],
  edges: [
    { source: 'yml', target: 'useful', label: 'dbt deps installs them, and writes a lock file to commit' },
    { source: 'useful', target: 'gotcha', label: 'but a package is not only macros' },
  ],
}
