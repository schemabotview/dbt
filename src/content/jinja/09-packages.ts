import type { Section } from '../types'

export const packagesSection: Section = {
  id: 'packages',
  title: 'Packages',
  scene: 'packages',
  slide: `## Somebody else's project, inside yours

\`\`\`yaml
packages:
  - package: dbt-labs/dbt_utils
    version: [">=1.3.0", "<2.0.0"]
  - git: "https://github.com/acme/internal.git"
    revision: v2.1.0
  - local: ../dbt-shared
\`\`\`

**The hub**, **a git URL** (pin a tag, never a branch), or **a local path**. \`dbt deps\` installs into \`dbt_packages/\` and writes a lock file worth committing.

### The macros you will actually use
\`generate_surrogate_key\` · \`star\` (select everything except…) · \`union_relations\` · \`date_spine\` · \`deduplicate\`. And \`codegen\`, which **writes your staging models and yml for you** from a source.

### A package is not just macros
It can contain models, and **those models build into your warehouse** alongside yours. If you only wanted the macros, disable them under the package's name in \`dbt_project.yml\`.`,
  narration:
    "You met packages as a source of tests. Here is the system itself. A package is another dbt project that becomes part of yours. You declare it in packages dot yml, run dbt deps, and its macros, models and tests are available as though you had written them. Three ways to name one. The hub, which is the registry most public packages live on, with a version range. A git URL, and here pin a tag rather than a branch — pointing at main means a stranger's commit can change your build without you doing anything. And a local path, which is how you develop a shared internal package against a project without publishing anything. Deps installs everything into a dbt_packages folder, which you gitignore, and it writes a lock file recording exactly what it resolved, which you do commit. Which macros will you actually use? Generate_surrogate_key, which hashes several columns into one key and is in almost every mart. Star, which selects every column except a list you name — useful when a table has forty columns and you want thirty-eight of them. Union_relations, which stacks tables that do not quite agree on their columns. Date_spine, which generates a row per day between two dates, which you need more often than you would think. And deduplicate. There is also a package called codegen, which is worth knowing about on day one rather than year two: it writes your staging models and your yml files for you, from a source. Now the thing that surprises people. A package is not only macros. It can contain models, and those models build into your warehouse right alongside your own, creating objects you did not write. That is sometimes exactly what you want. When it is not — you only wanted the macros — disable them under the package's name in your project file.",
}
