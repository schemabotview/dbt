import type { Section } from '../types'

export const whereThisGoes: Section = {
  id: 'where-this-goes',
  title: 'Where this goes',
  scene: 'the-practice',
  slide: `## The habits, not the features

| The habit | What it prevents |
|---|---|
| Every dependency is a \`ref\` | a DAG that lies |
| Tests on the grain and the keys | a silent duplicate |
| One definition per metric | four numbers in one meeting |
| CI builds only what changed | paying to rebuild the project |
| Every public model is owned | the 3am question |

### What to learn next
- **The warehouse** — the engine doing all the actual work
- **Orchestration** — what runs dbt, and what has to run before it
- **Ingestion** — how the raw tables got there at all

### It was never about dbt
The job is a number somebody can **defend**: where it came from, what it excludes, who owns it. dbt is the most practical way anyone has found to make that ordinary.`,
  narration:
    "Let's finish by pulling the whole thing together, because the features were never really the point. What separates a project that survives its author from one that does not is a handful of habits. Every dependency goes through a ref, so the graph is the truth rather than a diagram somebody drew once. Tests on the grain and on the keys, so a silent duplicate becomes a failed build instead of a slowly wrong dashboard. One definition per metric, so the meeting where four people bring four numbers stops happening. Continuous integration that builds only what changed, so quality does not cost you the entire project's compute on every pull request. And an owner on every model anyone else can touch, so the question at three in the morning has somebody to go to. None of those is difficult. All of them are hard to retrofit, which is the argument for doing them while the project is small. Where should you go next? Three directions. The warehouse itself, because it is doing every bit of the actual work and understanding how it executes a query is what makes tuning something other than guesswork. Orchestration, because something has to run dbt, and something has to run before it. And ingestion, because those raw tables got there somehow, and that pipeline is now upstream of everything you have built. And the last thing, which is really the point of all nine of these courses. It was never about dbt. The job is to produce a number that somebody can defend — where it came from, what it excludes, who owns it, and what would have to be true for it to be wrong. dbt happens to be the most practical way anyone has found to make that ordinary rather than heroic.",
}
