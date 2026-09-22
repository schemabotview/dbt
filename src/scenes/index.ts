import type { Scene } from '@graphlearning/flow'
import { foundationsScenes } from './foundations'
import { modelsScenes } from './models'
import { materializationsScenes } from './materializations'
import { sourcesScenes } from './sources'
import { testingScenes } from './testing'
import { jinjaScenes } from './jinja'
import { deploymentScenes } from './deployment'
import { governanceScenes } from './governance'
import { semanticScenes } from './semantic'

// Scene registry. Sections reference scenes by id; scenes are grouped by course (one folder each,
// mirroring src/content). Ids are globally unique across courses, so the flat lookup below is
// unambiguous. Courses fill in as they're authored, one slice at a time.
const ALL: Scene[] = [
  ...foundationsScenes,
  ...modelsScenes,
  ...materializationsScenes,
  ...sourcesScenes,
  ...testingScenes,
  ...jinjaScenes,
  ...deploymentScenes,
  ...governanceScenes,
  ...semanticScenes,
]

export const SCENES: Record<string, Scene> = Object.fromEntries(ALL.map((s) => [s.id, s]))

export function getScene(id: string): Scene | undefined {
  return SCENES[id]
}
