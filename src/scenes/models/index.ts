import type { Scene } from '@graphlearning/flow'
import { modelFile } from './model-file'
import { refResolution } from './ref-resolution'
import { hardcodedTrap } from './hardcoded-trap'
import { sourceDeclaration } from './source-declaration'
import { theDag } from './the-dag'
import { twoTargets } from './two-targets'
import { configPrecedence } from './config-precedence'
import { theLayers } from './the-layers'
import { naming } from './naming'
import { schemaResolution } from './schema-resolution'

export const modelsScenes: Scene[] = [
  modelFile,
  refResolution,
  hardcodedTrap,
  sourceDeclaration,
  theDag,
  twoTargets,
  configPrecedence,
  theLayers,
  naming,
  schemaResolution,
]
