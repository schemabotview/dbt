import type { Section } from '../types'

export const theGovernanceChecklist: Section = {
  id: 'the-governance-checklist',
  title: 'The governance checklist',
  scene: 'gov-checklist',
  slide: `## Before a second team is allowed in

- **Describe every public model** — so a stranger knows what a row means
- **Put every model in a group** — so there is a person to ask
- **Set \`access\` deliberately** — so private stays private by design
- **Contract the public ones** — so the shape cannot drift under somebody
- **Declare your exposures** — so impact analysis reaches the dashboard
- **Agree a deprecation policy** — so a breaking change has a procedure

### Do it while the project is small
Today this is six yml edits and an afternoon. Once somebody depends on you, each one becomes a **negotiation with another team** — and the awkward ones get postponed forever.

### The whole course in one line
Answering three questions in writing, before anyone has to ask: **what is this · who owns it · who may build on it.**`,
  narration:
    "Let's close with a checklist, and the framing that makes it worth doing: this is what a project needs before a second team is allowed in. Six things. Describe every public model, so that a stranger reading the docs knows what one row means without asking you. Put every model in a group, so there is a person or team to ask. Set access deliberately, so that private is private by design rather than by nobody having noticed it yet. Put contracts on the public ones, so the shape cannot drift underneath somebody who depended on it. Declare your exposures, so impact analysis reaches all the way to the dashboard instead of stopping at the warehouse edge. And agree a deprecation policy — how much notice, and how it is communicated — so a breaking change has a procedure rather than an argument. Now the reason to do it now rather than later. Today, all six of those are yml edits. An afternoon's work, no negotiation, nobody else affected. Once another team is already depending on your models, every single one becomes a conversation with people who have their own quarter planned — and the awkward ones, the ones about who owns what and who is allowed to break what, get postponed indefinitely. That is how projects end up with four hundred models and no owners. And if you want the whole course in one line: governance is answering three questions in writing, before somebody has to ask. What is this. Who owns it. And who may build on it. Everything in the last nine sections — descriptions, groups, access, contracts, versions, exposures — is a mechanism for writing one of those answers down where a machine can also read it.",
}
