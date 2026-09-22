import type { Course } from '../types'
import { aModelIsASelect } from './01-a-model-is-a-select'
import { refSection } from './02-ref'
import { hardcodedNames } from './03-hardcoded-names'
import { sourceSection } from './04-source'
import { theDagSection } from './05-the-dag'
import { compiledSql } from './06-compiled-sql'
import { configuringAModel } from './07-configuring-a-model'
import { layers } from './08-layers'
import { namingAndFolders } from './09-naming-and-folders'
import { customSchemas } from './10-custom-schemas'

// models — course 02 of the nine-course dbt spine. The DAG, and the conventions that keep it
// readable. Ten sections, ten scenes.
// §02 is the load-bearing one and §03 is it argued from the other side — the pair is the course.
// §06 deliberately does NOT re-teach where compiled SQL lives (foundations covers that as a
// debugging habit); it shows that the SAME ref resolves to two different names per target, which is
// the payoff of §02 and the thing that makes a sandbox a sandbox.
export const models: Course = {
  id: 'models',
  title: 'Models, ref and the DAG',
  sections: [
    aModelIsASelect,
    refSection,
    hardcodedNames,
    sourceSection,
    theDagSection,
    compiledSql,
    configuringAModel,
    layers,
    namingAndFolders,
    customSchemas,
  ],
}
