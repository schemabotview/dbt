import type { Course } from '../types'
import { sqlThatWritesSql } from './01-sql-that-writes-sql'
import { theDbtContext } from './02-the-dbt-context'
import { varsAndEnvVars } from './03-vars-and-env-vars'
import { writingAMacro } from './04-writing-a-macro'
import { controlFlow } from './05-control-flow'
import { runQuerySection } from './06-run-query'
import { hooksSection } from './07-hooks'
import { overridingDbt } from './08-overriding-dbt'
import { packagesSection } from './09-packages'
import { tooMuchJinja } from './10-too-much-jinja'

// jinja — course 06 of the nine-course dbt spine. The templating layer, and when to stop using it.
// Ten sections, ten scenes.
// The arc is deliberately a rise and a correction: §01-§09 widen the toolkit, §10 argues for
// restraint — and §10 is not a postscript, it is the point the whole course builds toward, which is
// why the course opens by saying Jinja arrives here rather than earlier.
// §09 does NOT re-teach the packages that carry TESTS (the testing course covered those, plus the
// pin-and-deps operational point). This one is the package SYSTEM: hub vs git vs local, the lock
// file, the macros people actually use, and the fact that a package can ship models that build.
export const jinja: Course = {
  id: 'jinja',
  title: 'Jinja, Macros & Packages',
  sections: [
    sqlThatWritesSql,
    theDbtContext,
    varsAndEnvVars,
    writingAMacro,
    controlFlow,
    runQuerySection,
    hooksSection,
    overridingDbt,
    packagesSection,
    tooMuchJinja,
  ],
}
