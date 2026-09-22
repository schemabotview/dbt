import type { Course } from '../types'
import { theTMoved } from './01-the-t-moved'
import { whatDbtIs } from './02-what-dbt-is'
import { whatDbtIsNot } from './03-what-dbt-is-not'
import { coreAndPlatformSection } from './04-core-and-platform'
import { adaptersSection } from './05-adapters'
import { projectAnatomySection } from './06-project-anatomy'
import { profilesAndTargetsSection } from './07-profiles-and-targets'
import { firstRun } from './08-first-run'
import { compileVsRun } from './09-compile-vs-run'
import { theCommandSet } from './10-the-command-set'

// foundations — course 01 of the nine-course dbt spine. What dbt is, what it refuses to be, and
// what a project is made of. Ten sections, ten scenes.
// §01 states the problem (the T moved, and left no tooling behind) and §02 is the answer in one
// picture; everything after §02 is detail on that pair. §09 is a HABIT rather than a feature — it
// sits here, in the first course, because it is what makes the next eight survivable.
export const foundations: Course = {
  id: 'foundations',
  title: 'What dbt Is',
  sections: [
    theTMoved,
    whatDbtIs,
    whatDbtIsNot,
    coreAndPlatformSection,
    adaptersSection,
    projectAnatomySection,
    profilesAndTargetsSection,
    firstRun,
    compileVsRun,
    theCommandSet,
  ],
}
