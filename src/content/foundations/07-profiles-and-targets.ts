import type { Section } from '../types'

export const profilesAndTargetsSection: Section = {
  id: 'profiles-and-targets',
  title: 'Profiles and targets',
  scene: 'profiles-and-targets',
  slide: `## Credentials live outside the project

The project is committed and shared; it contains **no account, no user, no password.** Connection details live in \`profiles.yml\` — normally \`~/.dbt/\`, and in CI, environment variables.

### One profile, many targets
A profile is a named set of \`outputs\`. Each output is a **target**: a full connection, plus the database and schema to build into.

\`\`\`
dbt run                 # → analytics_dev.dbt_alice
dbt run --target prod   # → analytics.analytics
\`\`\`

### Why every developer gets their own schema
\`schema: dbt_alice\` is not a nicety. It is how ten people build the same models at the same time without overwriting each other — **the whole isolation story**, in one line.

### threads
How many models dbt builds in parallel. Raise it and the warehouse works harder — it is a **cost dial**, not a free speedup.`,
  narration:
    "Here is a separation that carries more weight than it first appears. Your project is committed to git and shared with your team, and it contains no credentials at all — no account identifier, no username, no password, no key. Connection details live somewhere else entirely: a file called profiles.yml, which normally sits in a dot-dbt folder in your home directory, and which in automation is assembled from environment variables instead. The project says which profile it wants by name; the profile says how to connect. A profile contains one or more outputs, and each output is called a target. A target is a complete connection — the account, the user, the role, the warehouse — plus two decisions that matter more than the rest: which database and which schema dbt should build into. Look at the dev target on screen and find the schema line: dbt_alice. That is not a cosmetic choice. It is how ten analytics engineers work on the same project at the same time without destroying each other's work — every person builds the whole project into their own private schema, and nothing they do touches anything anyone else can see. It is the entire isolation story, and it costs one line. Then the production target names the schema everybody actually reads from. And because both targets live in one profile, moving between them is a single flag: dbt run, versus dbt run dash dash target prod. Same models, same code, same commit — only the destination changes. One more field worth naming now: threads. That is how many models dbt will build at once. More threads means a shorter run and a busier warehouse, so treat it as a cost dial, not a free speed-up.",
}
