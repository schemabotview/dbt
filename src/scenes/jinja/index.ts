import type { Scene } from '@graphlearning/flow'
import { jinjaBasics } from './jinja-basics'
import { dbtContext } from './dbt-context'
import { varsEnvvars } from './vars-envvars'
import { macroAnatomy } from './macro-anatomy'
import { loopColumns } from './loop-columns'
import { runQuery } from './run-query'
import { hooks } from './hooks'
import { overrideMacro } from './override-macro'
import { packages } from './packages'
import { jinjaLimit } from './jinja-limit'

export const jinjaScenes: Scene[] = [
  jinjaBasics,
  dbtContext,
  varsEnvvars,
  macroAnatomy,
  loopColumns,
  runQuery,
  hooks,
  overrideMacro,
  packages,
  jinjaLimit,
]
