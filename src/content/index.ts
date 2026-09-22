import { foundations } from './foundations'
import { models } from './models'
import { materializations } from './materializations'
import { sources } from './sources'
import { testing } from './testing'
import { jinja } from './jinja'
import { deployment } from './deployment'
import { governance } from './governance'
import { semantic } from './semantic'
import type { Course, Section } from './types'

// The course catalog, in syllabus order. → past a course's last section rolls into the next course's
// first. All nine courses are declared up front so the whole arc is visible in the app from day one;
// each fills with sections as its slice is authored.
//
// The nine-course spine (87 sections planned — see COURSE-PLAN.md):
//   1 foundations · 2 models · 3 materializations · 4 sources · 5 testing
//   6 jinja · 7 deployment · 8 governance · 9 semantic
//
// This narration is authored FRESH — there is no source deck for this concept — and the house rule
// is that NOTHING cross-references a neighbour by course number. That is what lets the repo ship as
// a PREFIX: courses 1-5 can go live while 6-9 are still being authored, and a later reorder costs
// nothing until the wavs exist. After a course's audio is generated, its section ORDER is frozen —
// the wav filenames are pinned to the section ids.
export const COURSES: Record<string, Course> = {
  [foundations.id]: foundations,
  [models.id]: models,
  [materializations.id]: materializations,
  [sources.id]: sources,
  [testing.id]: testing,
  [jinja.id]: jinja,
  [deployment.id]: deployment,
  [governance.id]: governance,
  [semantic.id]: semantic,
}

export type { Course, Section }

// slugOf / allSections are the shell's — the slug rule (`<courseId>-<sectionId>`) is part of the
// route contract the recorder drives, so it cannot be a per-repo decision. Re-exported here because
// this module is what the app and the scripts already import them from.
export { slugOf, allSections } from '@graphlearning/shell'

export function getCourse(id: string): Course | undefined {
  return COURSES[id]
}
