import type { Section } from '../types'

export const tooMuchJinja: Section = {
  id: 'too-much-jinja',
  title: 'Too much Jinja',
  scene: 'jinja-limit',
  slide: `## The model nobody can read

Every line of the example on the left was a reasonable decision. Together they are a model whose output you cannot predict without compiling it — and whose bug, when it comes, is in a macro three files away.

### Three questions
- **Can a colleague read it** without compiling it first?
- **Can you debug it at 2am**, when the number is wrong?
- **What did it actually save** — often, twenty lines of obvious SQL

### Two habits
**Optimise for reading.** A model is read far more often than it is written, usually by somebody with less context than you had.

**Read your own compiled output.** If what comes out surprises you, that is the signal — not a reason to add another conditional.

### The rule of thumb
Jinja is for **mechanical** repetition, where the output is obvious. When it starts encoding decisions, the decisions belong in SQL, where they can be read.`,
  narration:
    "Let's end the course with the judgement, because everything in it can be overdone, and Jinja is the part of dbt where clever goes wrong most often. Look at the example. It reads the columns of a relation, filters them against an exclusion list, applies a timezone conversion using a variable, renames them through a lookup map, and handles the trailing comma. Every single line of that was a reasonable decision at the moment somebody made it. Together, they are a model whose output nobody can predict without compiling it — and when the number comes out wrong, the bug is in a macro three files away, in a branch that only fires for certain column names. Three questions, and they usually all point the same direction. Can a colleague read this without compiling it first? Can you debug it at two in the morning, when a dashboard is wrong and you did not write it? And what did it actually save — because very often the honest answer is twenty lines of extremely obvious SQL, which is not a good trade. Two habits, then. Optimise for reading. A model is read far more often than it is written, usually by somebody with less context than you had when you wrote it, and often under time pressure. Repetition is cheap; confusion is not. And read your own compiled output. If what comes out surprises you — if you have to think about why there are four columns and not five — that is the signal. It is not a reason to add another conditional to handle the case. Here is the rule of thumb to carry. Jinja is for mechanical repetition, where the output is obvious and only the number of copies varies. The moment it starts encoding decisions — which columns matter, what counts as a refund, when a rule applies — those decisions belong in SQL, written out, where somebody can read them.",
}
