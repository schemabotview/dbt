import type { Scene } from '@graphlearning/flow'
import { docsSite } from './docs-site'
import { persistMeta } from './persist-meta'
import { exposures } from './exposures'
import { groupsOwners } from './groups-owners'
import { accessLevels } from './access-levels'
import { modelVersions } from './model-versions'
import { splitSignals } from './split-signals'
import { crossProject } from './cross-project'
import { govChecklist } from './gov-checklist'

export const governanceScenes: Scene[] = [
  docsSite,
  persistMeta,
  exposures,
  groupsOwners,
  accessLevels,
  modelVersions,
  splitSignals,
  crossProject,
  govChecklist,
]
