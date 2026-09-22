import type { Course } from '../types'
import { devAndProd } from './01-dev-and-prod'
import { aJobSection } from './02-a-job'
import { selectionSyntax } from './03-selection-syntax'
import { state } from './04-state'
import { defer } from './05-defer'
import { slimCiSection } from './06-slim-ci'
import { ciWithActions } from './07-ci-with-actions'
import { artifactsSection } from './08-artifacts'
import { failures } from './09-failures'
import { theRunbook } from './10-the-runbook'

// deployment — course 07 of the nine-course dbt spine. Running the thing on a schedule, and the
// machinery that makes a pull request testable. Ten sections, ten scenes.
// §01 does NOT re-teach profiles and targets (foundations covered the file); it is the same idea as
// an OPERATIONAL fact — who runs each environment, on whose credentials, over how much of the graph.
// §03-§06 are one argument built in four moves: selection is the vocabulary, state is the memory,
// defer is the resolution rule, and slim CI is the three of them in one command. Splitting state and
// defer matters — they are routinely conflated, and each is useful without the other.
export const deployment: Course = {
  id: 'deployment',
  title: 'Running dbt in Production',
  sections: [
    devAndProd,
    aJobSection,
    selectionSyntax,
    state,
    defer,
    slimCiSection,
    ciWithActions,
    artifactsSection,
    failures,
    theRunbook,
  ],
}
