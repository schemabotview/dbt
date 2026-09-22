import type { Section } from '../types'

export const varsAndEnvVars: Section = {
  id: 'vars-and-env-vars',
  title: 'var() and env_var()',
  scene: 'vars-envvars',
  slide: `## Two functions that look alike and are not

\`\`\`sql
{{ var('lookback_days', 7) }}
{{ env_var('DBT_ACCOUNT') }}
\`\`\`

### \`var()\` — project configuration
Defaults live in \`dbt_project.yml\`; any run can override with \`--vars\`. **Committed and reviewed**, so it is the same for everybody. For things the project decides: a lookback window, a feature flag.

### \`env_var()\` — deployment configuration
Read from the machine running dbt. **Not in git**, and different per environment by design. For credentials, and anything the deployment decides.

### The secret prefix
Name an environment variable \`DBT_ENV_SECRET_…\` and dbt scrubs its value from logs and artifacts. Worth using for anything you would mind seeing in CI output.

Both take a default as their second argument; a missing \`var\` with none is a parse-time error.`,
  narration:
    "Two functions that look interchangeable, and choosing wrongly causes real problems. Var reads a project variable. You declare defaults in dbt_project dot yml under a vars block, and any run can override them on the command line. The key property is that it is committed to git: it is reviewed, it is the same for everybody who checks out the project, and it is part of the project's definition. Use it for things the project decides. A lookback window. A feature flag while you migrate a model. The date your history starts. Env_var reads from the environment of whatever machine is running dbt. It is deliberately not in git, and it is expected to differ between your laptop, your CI runner and production. Use it for things the deployment decides — credentials above all, but also anything that legitimately varies per environment, like a warehouse size or a notification address. The clean way to think about it: var is about the project, env_var is about the deployment. If you find yourself putting a credential in a var, you are about to commit a secret. If you find yourself putting business logic in an env_var, you have made your project's behaviour depend on a machine, and nobody will be able to reproduce your run. One operational detail worth knowing. If you name an environment variable with the prefix DBT underscore ENV underscore SECRET, dbt scrubs its value out of logs and artifacts. That matters more than it sounds, because CI logs are often far more widely readable than the secret store the value came from. And both functions take a default as their second argument. A var with no default that nobody set is a hard error at parse time — which is usually exactly what you want, because it fails immediately rather than silently computing nothing.",
}
