import type { Section } from '../types'

export const oneProjectToMany: Section = {
  id: 'one-project-to-many',
  title: 'When one project becomes two',
  scene: 'split-signals',
  slide: `## Split for people, not for size

### Real signals
- **Two teams on two clocks** — each wants its own release pace and cannot get it
- **Reviews have become a formality** — nobody understands the other half well enough to object
- **CI is the bottleneck** — a one-line change waits on everybody else's models
- **Permissions genuinely differ** — one half handles data the other half may not see

All four are about **people**, not about model count.

### Bad reasons
"It feels big" — a folder fixes that. "Tidiness" — groups and access are the cheap version. "A new team exists" — let them own a group first and see how it goes.

### The cost is mostly one-way
Two repos. Two CI setups. Two schedules. And a **contract between them** that can no longer be refactored in an afternoon, because refactoring it is now a negotiation.

**Exhaust groups and access first.** They are reversible; a split, in practice, is not.`,
  narration:
    "At some point somebody will propose splitting the project in two, and this section is about when that is right. Four real signals. Two teams on two clocks: finance wants to ship daily, marketing ships monthly, and every release is a negotiation neither of them enjoys. Reviews have become a formality: pull requests get approved because nobody understands the other half well enough to object, which means review has stopped doing anything. CI is the bottleneck: a one-line change to a marketing model waits on the finance team's slowest tests, every time. And permissions genuinely differ: one half of the project handles data the other half is not allowed to see, which is a boundary you cannot enforce with folders. Notice that all four are about people and their working rhythms. None of them is about model count. A project with eight hundred models and one team is not a candidate; a project with sixty models and two teams with incompatible release cycles might be. Now the bad reasons, because they are more common. It feels big — a folder structure fixes that, and it is free. Tidiness — groups and access are the cheap version of what you actually want. A new team exists — let them own a group first, and see how that goes for a quarter. The cost is what makes this worth being careful about, because it is mostly one-way. Two repositories. Two CI setups. Two schedules to coordinate. And a contract between them that can no longer be refactored in an afternoon, because refactoring it is now a conversation with another team who have their own quarter planned. So exhaust groups and access first. Those are reversible in an afternoon. A split, in practice, is not.",
}
