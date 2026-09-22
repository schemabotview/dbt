import type { Scene } from '@graphlearning/flow'

// §08. The honest framing: an LLM pointed at a raw warehouse guesses, and a guess that looks like a
// number is worse than no answer. Everything the earlier courses built — descriptions, tests,
// owners, metrics — is exactly the context that makes the answer checkable.
export const aiSurface: Scene = {
  id: 'ai-surface',
  title: 'Why a governed project is the moat',
  nodes: [
    {
      id: 'two',
      label: 'Ask a model “what was revenue?”',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'a-raw', label: 'Over a raw warehouse', sub: 'guesses a table, guesses a join', pattern: 'warn', icon: 'skull' },
        { id: 'a-dbt', label: 'Over your project', sub: 'reads the metric you defined', pattern: 'storage', icon: 'shieldcheck' },
      ],
    },
    {
      id: 'ctx',
      label: 'The context it reads',
      pattern: 'group',
      cols: 4,
      children: [
        { id: 'x-desc', label: 'Descriptions', sub: 'what a column means', pattern: 'service', icon: 'file' },
        { id: 'x-dag', label: 'The lineage', sub: 'where a number came from', pattern: 'service', icon: 'gitbranch' },
        { id: 'x-test', label: 'The tests', sub: 'whether it can be trusted', pattern: 'service', icon: 'shieldcheck' },
        { id: 'x-met', label: 'The metrics', sub: 'the agreed definition', pattern: 'service', icon: 'sigma' },
      ],
    },
    {
      id: 'mcp',
      label: 'Served over MCP',
      sub: 'so an assistant can query it directly',
      pattern: 'user',
      icon: 'plug',
    },
  ],
  edges: [
    { source: 'two', target: 'ctx', label: 'the difference is entirely the context' },
    { source: 'ctx', target: 'mcp', label: 'and the project already contains all four' },
  ],
}
