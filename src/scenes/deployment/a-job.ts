import type { Scene } from '@graphlearning/flow'

// §02. Demystifying "production". The whole point is that there is no dbt server — a job is five
// ordinary steps on a machine somebody else pays for. Drawn as a strip so it reads as a script,
// which is exactly what it is.
export const aJob: Scene = {
  id: 'a-job',
  title: 'What a production dbt job actually is',
  nodes: [
    {
      id: 'steps',
      label: 'Five steps on a machine, on a timer',
      pattern: 'group',
      cols: 5,
      children: [
        { id: 'j-1', label: '1 · Get a machine', sub: 'a container, empty', pattern: 'network', icon: 'server' },
        { id: 'j-2', label: '2 · Clone the repo', sub: 'one commit, usually main', pattern: 'network', icon: 'gitbranch' },
        { id: 'j-3', label: '3 · Install', sub: 'dbt, adapter, dbt deps', pattern: 'network', icon: 'package' },
        { id: 'j-4', label: '4 · Run it', sub: 'dbt build --target prod', pattern: 'service', icon: 'gears' },
        { id: 'j-5', label: '5 · Report', sub: 'exit code, logs, artifacts', pattern: 'storage', icon: 'scroll' },
      ],
    },
    {
      id: 'who',
      label: 'Who can be the machine',
      pattern: 'group',
      cols: 4,
      children: [
        { id: 'w-cron', label: 'cron', sub: 'a server you already own', pattern: 'external', icon: 'clock' },
        { id: 'w-actions', label: 'GitHub Actions', sub: 'free-ish, and already there', pattern: 'external', icon: 'repeat' },
        { id: 'w-orch', label: 'Airflow, Dagster', sub: 'when dbt is one step of many', pattern: 'external', icon: 'workflow' },
        { id: 'w-platform', label: 'dbt platform jobs', sub: 'the hosted answer', pattern: 'external', icon: 'cloud' },
      ],
    },
    {
      id: 'none',
      label: 'No dbt server',
      sub: 'a job is a command that ends',
      pattern: 'user',
      icon: 'power',
    },
  ],
  edges: [
    { source: 'steps', target: 'who', label: 'none of this is dbt-specific except step four' },
    { source: 'who', target: 'none', label: 'and the thing to be clear about before choosing one' },
  ],
}
