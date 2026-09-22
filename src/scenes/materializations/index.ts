import type { Scene } from '@graphlearning/flow'
import { fourBuiltins } from './four-builtins'
import { viewMat } from './view-mat'
import { tableMat } from './table-mat'
import { ephemeralMat } from './ephemeral-mat'
import { rebuildWall } from './rebuild-wall'
import { isIncrementalShape } from './is-incremental-shape'
import { appendVsMerge } from './append-vs-merge'
import { overwriteStrategies } from './overwrite-strategies'
import { microbatchSlices } from './microbatch-slices'
import { chooseMat } from './choose-mat'

export const materializationsScenes: Scene[] = [
  fourBuiltins,
  viewMat,
  tableMat,
  ephemeralMat,
  rebuildWall,
  isIncrementalShape,
  appendVsMerge,
  overwriteStrategies,
  microbatchSlices,
  chooseMat,
]
