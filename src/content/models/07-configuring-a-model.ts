import type { Section } from '../types'

export const configuringAModel: Section = {
  id: 'configuring-a-model',
  title: 'Three places to configure a model',
  scene: 'config-precedence',
  slide: `## Same setting, three homes

### 1 · \`dbt_project.yml\`
Applies to a **whole folder**. Keys are prefixed with \`+\`. This is where defaults belong.

### 2 · The model's yml
Under \`config:\` on a named model. Sits beside that model's description and tests.

### 3 · A \`config()\` block in the \`.sql\` file
Right at the top of the model itself.

### Which wins
**The most specific one.** File beats model yml, model yml beats project yml. dbt does not warn you that three of them disagreed — it just applies the winner.

### Where to actually put things
Defaults in \`dbt_project.yml\`, **exceptions in the model**. A \`config()\` block that only repeats the folder default is noise that will go stale.`,
  narration:
    "Configuration — materialization, schema, tags, and a long list of other settings — can be written in three different places, and knowing which one wins saves a genuinely baffling afternoon. Place one is dbt_project dot yml, where a setting applies to a whole folder of models. You saw this earlier: the staging folder gets materialized as view, the marts folder as table. Keys here are prefixed with a plus sign, which is how dbt distinguishes a config from a folder name. Place two is the model's own yml file — the one that also carries its description and its tests. You name the model, and put a config block under it. Place three is a config block at the top of the model's sql file itself. Now, which wins? The most specific one. The config block in the file beats the model's yml, and the model's yml beats the project file. And here is the part to be careful about: dbt does not warn you when all three disagree. There is no conflict error. It quietly applies the winner, and if you are staring at a model that keeps materializing as a table when the project file clearly says view, the answer is almost always that something more specific is overriding it. So where should things actually go? Defaults in the project file, exceptions in the model. If a whole folder should be tables, say that once at the folder level. Put a config block on a model only when that model genuinely differs — when it is the one incremental model in a folder of tables, for instance. A config block that just repeats the folder default is noise, and worse, it is noise that will not update when somebody changes the default.",
}
