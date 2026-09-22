import type { Section } from '../types'

export const ciWithActions: Section = {
  id: 'ci-with-actions',
  title: 'CI with GitHub Actions',
  scene: 'actions-workflow',
  slide: `## The whole file, and the two awkward parts

Checkout, install Python, install dbt, \`dbt deps\`, fetch the manifest, run the build. **Only the last line is dbt-specific.**

### Credentials
Repo secrets become **environment variables**, which \`profiles.yml\` reads with \`env_var()\`. Nothing is committed. Name anything sensitive \`DBT_ENV_SECRET_…\` so dbt keeps it out of the logs — CI logs are usually far more widely readable than the secret store the value came from.

### Last night's manifest
\`--state\` needs the previous production manifest, so **your production job has to upload it first.** Almost every broken slim-CI setup is broken here: the workflow is right, and there is no manifest to compare against.

### CI is not free
It really builds and really queries. Budget for it, keep the CI warehouse small, and drop the schema when the branch closes.`,
  narration:
    "Let's look at a real workflow file, because most explanations of dbt in CI skip the two parts that actually cause trouble. The file is unremarkable. On pull request, get a machine, check out the code, install Python, install dbt and the adapter, run dbt deps. Then fetch the production manifest from wherever you keep it. Then run the slim build. Genuinely, only the last line has anything to do with dbt. Now the first awkward part: credentials. Your repository secrets become environment variables on the runner, and your profiles file reads them with env_var. Nothing sensitive is ever committed. And this is where that secret prefix from the Jinja course earns its keep — name anything sensitive with the DBT underscore ENV underscore SECRET prefix and dbt scrubs it from the logs. That matters here specifically, because CI logs are very often readable by far more people than the secret store the value came from. The second awkward part is the state. The build compares against last night's manifest, so something has to have put last night's manifest somewhere this job can read. Your production job uploads it — to S3, to an artifact store, to a bucket. I will say this plainly because it is the single most common way a slim CI setup is quietly broken: the workflow is correct, and there is simply no manifest to compare against, so state colon modified matches everything or nothing, and nobody notices for weeks. And one cost to plan for. CI is not free. It really builds and really queries your warehouse, on every pull request and every push to one. Keep the CI warehouse small, build only what changed, and drop the schema when the branch closes.",
}
