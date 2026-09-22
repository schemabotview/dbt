import type { Scene } from '@graphlearning/flow'
import { metricDrift } from './metric-drift'
import { semanticModelAnatomy } from './semantic-model-anatomy'
import { metricTypes } from './metric-types'
import { savedQueries } from './saved-queries'
import { costAnatomy } from './cost-anatomy'
import { tuningWins } from './tuning-wins'
import { fusionEngine } from './fusion-engine'
import { aiSurface } from './ai-surface'
import { thePractice } from './the-practice'

export const semanticScenes: Scene[] = [
  metricDrift,
  semanticModelAnatomy,
  metricTypes,
  savedQueries,
  costAnatomy,
  tuningWins,
  fusionEngine,
  aiSurface,
  thePractice,
]
