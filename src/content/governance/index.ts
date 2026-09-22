import type { Course } from '../types'
import { docs } from './01-docs'
import { persistDocsAndMeta } from './02-persist-docs-and-meta'
import { exposuresSection } from './03-exposures'
import { groupsAndOwners } from './04-groups-and-owners'
import { access } from './05-access'
import { modelVersionsSection } from './06-model-versions'
import { oneProjectToMany } from './07-one-project-to-many'
import { crossProjectRef } from './08-cross-project-ref'
import { theGovernanceChecklist } from './09-the-governance-checklist'

// governance — course 08 of the nine-course dbt spine. What a project needs before a second team is
// allowed in. Nine sections, nine scenes.
// The arc widens by audience: §01-§03 are for anyone reading the project, §04-§06 are for the team
// maintaining it, §07-§08 are for a second team. §05 and §06 are deliberately adjacent — `public`
// is a promise, and a contract plus a version is what keeping it looks like (the contract itself was
// taught in the testing course, where enforcement belongs).
// §08 is the ONE place in this concept where dbt Core has no answer, and the slide says so rather
// than implying the CLI can do it. The Core-only alternatives are named on the same slide.
export const governance: Course = {
  id: 'governance',
  title: 'Docs, Ownership & Mesh',
  sections: [
    docs,
    persistDocsAndMeta,
    exposuresSection,
    groupsAndOwners,
    access,
    modelVersionsSection,
    oneProjectToMany,
    crossProjectRef,
    theGovernanceChecklist,
  ],
}
