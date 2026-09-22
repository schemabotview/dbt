import type { Course } from '../types'
import { aTestIsASelect } from './01-a-test-is-a-select'
import { theFourGenericTests } from './02-the-four-generic-tests'
import { singularTests } from './03-singular-tests'
import { customGenericTests } from './04-custom-generic-tests'
import { severityAndThresholds } from './05-severity-and-thresholds'
import { storeFailuresSection } from './06-store-failures'
import { testPackagesSection } from './07-test-packages'
import { unitTests } from './08-unit-tests'
import { contractsSection } from './09-contracts'
import { build } from './10-build'

// testing — course 05 of the nine-course dbt spine, and the last of the shippable prefix. Ten
// sections, ten scenes.
// §01 is the whole mental model (a test is a SELECT that should return nothing) and §02-§07 are one
// widening spiral around it: built-ins, hand-written, reusable, tolerant, investigable, borrowed.
// §08 and §09 then break the frame deliberately — a unit test asks about LOGIC rather than data,
// and a contract fails at BUILD time rather than after — which is why they sit at the end rather
// than beside the data tests. §10 is the ordering argument that makes all of it actually protect
// something.
export const testing: Course = {
  id: 'testing',
  title: 'Tests & Contracts',
  sections: [
    aTestIsASelect,
    theFourGenericTests,
    singularTests,
    customGenericTests,
    severityAndThresholds,
    storeFailuresSection,
    testPackagesSection,
    unitTests,
    contractsSection,
    build,
  ],
}
