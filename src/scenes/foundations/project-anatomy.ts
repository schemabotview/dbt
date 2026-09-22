import type { Scene } from '@graphlearning/flow'

// §06. The tree and the root file side by side, because the folders mean nothing until you see
// dbt_project.yml pointing at them. `hug` on both: they are elements of a diagram, not the scene.
// The closing card is the one rule that makes the tree make sense — a folder is a config scope.
export const projectAnatomy: Scene = {
  id: 'project-anatomy',
  title: 'What a dbt project is made of',
  nodes: [
    {
      id: 'tree',
      kind: 'code',
      hug: true,
      filename: 'jaffle_shop/',
      label: [
        'dbt_project.yml      # the root — without it, no project',
        'profiles.yml         # (usually ~/.dbt) credentials, NOT here',
        'models/              # the SELECTs, and the yml describing them',
        '  staging/',
        '  marts/',
        'tests/               # singular assertions',
        'macros/              # reusable Jinja',
        'seeds/               # small CSVs, versioned with the code',
        'snapshots/           # slowly-changing history capture',
        'analyses/            # SQL you want compiled but never built',
        'target/              # dbt output — gitignored, always',
      ].join('\n'),
    },
    {
      id: 'yml',
      kind: 'code',
      hug: true,
      filename: 'dbt_project.yml',
      label: [
        'name: jaffle_shop',
        'profile: jaffle_shop        # which profiles.yml entry to use',
        '',
        'model-paths: ["models"]',
        'seed-paths: ["seeds"]',
        '',
        'models:',
        '  jaffle_shop:',
        '    staging:',
        '      +materialized: view   # applies to the whole folder',
        '    marts:',
        '      +materialized: table',
      ].join('\n'),
    },
    {
      id: 'rule',
      label: 'A folder is a scope',
      sub: 'set on a folder, applied inside',
      pattern: 'user',
      icon: 'layers',
    },
  ],
  edges: [
    { source: 'tree', target: 'yml', label: 'the folders are conventions; this file is what makes them real' },
    { source: 'yml', target: 'rule', label: 'and note what the nesting under `models:` is doing' },
  ],
}
