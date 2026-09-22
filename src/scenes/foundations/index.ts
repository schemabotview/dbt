import type { Scene } from '@graphlearning/flow'
import { eltShift } from './elt-shift'
import { sqlInDdlOut } from './sql-in-ddl-out'
import { whereDbtSits } from './where-dbt-sits'
import { coreAndPlatform } from './core-and-platform'
import { adapters } from './adapters'
import { projectAnatomy } from './project-anatomy'
import { profilesAndTargets } from './profiles-and-targets'
import { runLifecycle } from './run-lifecycle'
import { compiledOutput } from './compiled-output'
import { theArc } from './the-arc'

export const foundationsScenes: Scene[] = [
  eltShift,
  sqlInDdlOut,
  whereDbtSits,
  coreAndPlatform,
  adapters,
  projectAnatomy,
  profilesAndTargets,
  runLifecycle,
  compiledOutput,
  theArc,
]
