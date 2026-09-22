import type { Section } from '../types'

export const artifactsSection: Section = {
  id: 'artifacts',
  title: 'Artifacts',
  scene: 'artifacts',
  slide: `## Four JSON files, and what they are for

- **\`manifest.json\`** — every node, fully resolved. Powers \`--state\` and \`--defer\`
- **\`run_results.json\`** — status and timing, per node. Powers \`dbt retry\`, alerting, and build-time dashboards
- **\`catalog.json\`** — columns and types, read from the warehouse by \`dbt docs generate\`
- **\`sources.json\`** — the last freshness check

### They are an interface, not debris
They are documented and stable enough to build on. Teams load \`run_results\` into a table and end up with **a model of their own pipeline** — which node is getting slower, which test fails most often, what the build cost last month.

### Upload them from the production job
\`target/\` is gitignored and overwritten on every run. **If the job does not save them, they are gone** — and with them, slim CI, retry, and any history of how the pipeline behaves.`,
  narration:
    "Every dbt run writes JSON into the target directory, and it is worth treating those files as an interface rather than as debris. Four of them matter. Manifest dot json is the big one: every node in your project, fully resolved — the compiled SQL, the config, the dependencies, the tests, the descriptions. It is what powers state comparison and defer, and it is what the docs site is built from. Run_results dot json records what happened in this run: every node, its status, and how long it took. That is what dbt retry reads to know where to resume, and it is what most alerting is built on. Catalog dot json holds columns and types read from the warehouse itself, produced by dbt docs generate. And sources dot json records the last freshness check. Here is the thing worth doing that most teams get to late. Load run_results into a table, every run, and you have a model of your own pipeline. Which model is getting slower month over month. Which test fails most often — and therefore which one everybody has learned to ignore. What the nightly build actually costs. That is data about your data platform, and it is sitting on the floor of every run you have ever done. There is a package called dbt_artifacts that does exactly this if you would rather not build it. And the operational rule that everything above depends on: upload them from the production job. The target directory is gitignored and overwritten on the next run. If your job does not save those files somewhere, they are gone — and with them go slim CI, retry, and any history of how your pipeline behaves over time.",
}
