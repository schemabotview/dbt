import type { Section } from '../types'

export const groupsAndOwners: Section = {
  id: 'groups-and-owners',
  title: 'Groups and owners',
  scene: 'groups-owners',
  slide: `## Cutting a project into owned regions

A **group** is a named region of the project with a person or team attached.

Declared in yml with an \`owner\` (a name and an email); models join it with \`group: finance\` in their config. **A model belongs to at most one group.**

### What it gives you today
An owner in the docs and in the manifest — so "who owns this?" stops being a question you ask three people at 3am.

### Where the lines go
Group by **who maintains it**, not by what it looks like: \`finance\`, \`marketing\`, and a shared \`core\`. Two teams claiming the same models is a conversation worth having now, not during an incident.

### A group is only a label — so far
What a group actually **enforces** is access. That is next.`,
  narration:
    "So far this course has been about describing things. Groups are the first governance feature that is about people. A group is a named region of your project with an owner attached — a name and an email, a team or a person. You declare the group in yml, and models join it with one line of config. A model belongs to at most one group, which keeps the whole thing simple. What does that buy you today, before any enforcement? An owner, in the docs site and in the manifest. That sounds small. It is not. When a model fails at three in the morning, or an analyst asks why a number moved, who owns this stops being a question you have to ask three people in a chat channel. It is attached to the node, and it is in a machine-readable file, so your alerting can route by it. Where should the lines go? Group by who maintains it, not by what it looks like. Finance, marketing, and usually a shared core group holding the staging models that everybody depends on. Resist grouping by layer — a group called staging owned by everybody is a group owned by nobody. And if two teams both believe they own the same set of models, that is a genuinely valuable conversation to have now, in a quiet week, rather than during an incident at month end. One honest caveat before we move on. Everything I have just described is a label. It documents intent; it does not stop anybody doing anything. What a group actually enforces is access — and that is the next section.",
}
