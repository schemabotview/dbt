import type { Scene } from '@graphlearning/flow'

// §09. The closer. Not a feature list — the habits that separate a project that survives its author
// from one that does not, each one traceable to a course the learner has already done.
export const thePractice: Scene = {
  id: 'the-practice',
  title: 'What a mature practice looks like',
  nodes: [
    {
      id: 'board',
      label: 'The habits, not the features',
      kind: 'table',
      pattern: 'service',
      headers: ['The habit', 'What it prevents'],
      values: [
        ['Every model is ref’d, never named', 'a DAG that lies'],
        ['Tests on the grain and the keys', 'a silent duplicate'],
        ['One definition per metric', 'four numbers in one meeting'],
        ['CI builds only what changed', 'paying to rebuild the project'],
        ['Every public model is owned', 'the 3am question'],
      ],
    },
    {
      id: 'next',
      label: 'Where to go next',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'n-wh', label: 'The warehouse', sub: 'the engine actually doing the work', pattern: 'storage', icon: 'snowflake' },
        { id: 'n-orch', label: 'Orchestration', sub: 'what runs dbt, and what runs before it', pattern: 'user', icon: 'workflow' },
        { id: 'n-ing', label: 'Ingestion', sub: 'how the raw tables got there at all', pattern: 'external', icon: 'waves' },
      ],
    },
    {
      id: 'end',
      label: 'It was never about dbt',
      sub: 'a number somebody can defend',
      pattern: 'warn',
      icon: 'circlecheck',
    },
  ],
  edges: [
    { source: 'board', target: 'next', label: 'and dbt is one tool in a wider picture' },
    { source: 'next', target: 'end', label: 'all of it in service of one thing' },
  ],
}
