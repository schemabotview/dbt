import type { Section } from '../types'

export const projectAnatomySection: Section = {
  id: 'project-anatomy',
  title: 'The anatomy of a project',
  scene: 'project-anatomy',
  slide: `## A folder with one file that matters

A dbt project is an ordinary \`git\` repository. What makes it a project is **\`dbt_project.yml\`** at its root.

### The folders
- \`models/\` — the \`SELECT\`s, plus the \`.yml\` that describes and tests them
- \`tests/\` · \`macros/\` · \`seeds/\` · \`snapshots/\` — one concern each, each its own course
- \`analyses/\` — SQL you want compiled and kept, but never built
- \`target/\` — dbt's own output. **Gitignore it**, always

### The idea worth taking away
Config set on a **folder** applies to every model inside it, and any model can override it — which is what the nesting under \`models:\` on the left is doing.

The folder tree is not decoration. **It is the configuration.**`,
  narration:
    "Let's open a project up. A dbt project is an ordinary git repository — nothing exotic, a folder of text files you commit like any other code. What makes it a dbt project is one file at the root: dbt_project.yml. No such file, no project; dbt will refuse to run. That file names the project, says which profile to use for credentials, tells dbt where each kind of file lives, and — the interesting part — carries configuration for whole groups of models at once. Around it sit the folders. Models is where almost all your work happens: the SELECT statements, and the yml files that describe and test them. Tests holds hand-written assertions that do not fit the reusable kind. Macros holds reusable Jinja. Seeds holds small CSV files you want version-controlled alongside the code. Snapshots holds history capture. Analyses is a nice one people miss — SQL you want compiled and reviewed and kept in the repo, but never built into a table, like an ad-hoc investigation worth keeping. And target is dbt's own output directory. Gitignore it, always; it is generated, and it is large. Now look at the right-hand file, at the nesting under models. Staging gets materialized as view, marts gets materialized as table — and those settings apply to every model in those folders. Any individual model can override them, but the default comes from where the file sits. That is the idea to take away from this section. Your folder tree is not decoration and it is not just tidiness. In dbt, a folder is a configuration scope, which is why project structure is a design decision worth taking seriously on day one.",
}
