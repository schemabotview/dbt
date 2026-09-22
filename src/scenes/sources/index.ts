import type { Scene } from '@graphlearning/flow'
import { sourceYml } from './source-yml'
import { freshness } from './freshness'
import { seeds } from './seeds'
import { snapshotWhy } from './snapshot-why'
import { timestampStrategy } from './timestamp-strategy'
import { checkStrategy } from './check-strategy'
import { scd2Columns } from './scd2-columns'
import { snapshotConfig } from './snapshot-config'
import { ingestWalk } from './ingest-walk'

export const sourcesScenes: Scene[] = [
  sourceYml,
  freshness,
  seeds,
  snapshotWhy,
  timestampStrategy,
  checkStrategy,
  scd2Columns,
  snapshotConfig,
  ingestWalk,
]
