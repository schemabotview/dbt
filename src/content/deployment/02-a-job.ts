import type { Section } from '../types'

export const aJobSection: Section = {
  id: 'a-job',
  title: 'What a job actually is',
  scene: 'a-job',
  slide: `## Five ordinary steps on a timer

1. **Get a machine** — a container, empty
2. **Clone the repo** — one commit, usually \`main\`
3. **Install** — dbt, the adapter, then \`dbt deps\`
4. **Run it** — \`dbt build --target prod\`
5. **Report** — an exit code, the logs, the artifacts

Only step four is dbt-specific. Everything else is ordinary automation.

### There is no dbt server
Nothing is listening. Nothing runs between jobs. dbt is a command-line program that starts, does work, and exits — which is why **anything that can run a command on a schedule can run dbt.**

### Who plays the machine
\`cron\` on a box you already own · **GitHub Actions**, which is already there · **Airflow or Dagster**, when dbt is one step in a larger pipeline · **the dbt platform**, which is the hosted answer to exactly this.

### Choosing
If dbt is your whole pipeline, Actions or the platform. If dbt is one step among ingestion, ML and reverse ETL, use the orchestrator you already have.`,
  narration:
    "Running dbt in production sounds like infrastructure, and it is worth demystifying, because it is smaller than people expect. A production dbt job is five steps. Get a machine — a container, empty, from whatever runner you use. Clone the repository at one commit, usually the tip of main. Install dbt and your adapter, then run dbt deps to fetch packages. Run the thing: dbt build, against the production target. And report: an exit code so the runner knows whether it worked, the logs, and the artifacts. Notice that only step four has anything to do with dbt. The rest is ordinary automation that you or somebody near you already does for something else. And here is the thing to be clear about. There is no dbt server. Nothing is listening on a port. Nothing is running between jobs, waiting. dbt Core is a command-line program that starts, does work, and exits. That is why the answer to how do I schedule dbt is simply: anything that can run a command on a schedule. So who plays the machine? Cron on a server you already own — unglamorous, and completely fine for a small project. GitHub Actions, which is already sitting next to your repository and is what most small teams reach for. Airflow or Dagster, when dbt is one step inside a bigger pipeline with ingestion before it and machine learning after it. Or the dbt platform's own jobs, which is the hosted answer to precisely this problem and the main thing you are paying for. How to choose? If dbt is essentially your whole pipeline, use Actions or the platform and keep it simple. If dbt is one step among many, use the orchestrator your team already runs — because the hard part of orchestration is not running dbt, it is knowing what should happen before and after it.",
}
