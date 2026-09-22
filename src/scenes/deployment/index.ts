import type { Scene } from '@graphlearning/flow'
import { environments } from './environments'
import { aJob } from './a-job'
import { selection } from './selection'
import { stateCompare } from './state-compare'
import { deferDiagram } from './defer-diagram'
import { slimCi } from './slim-ci'
import { actionsWorkflow } from './actions-workflow'
import { artifacts } from './artifacts'
import { failureTriage } from './failure-triage'
import { runbook } from './runbook'

export const deploymentScenes: Scene[] = [
  environments,
  aJob,
  selection,
  stateCompare,
  deferDiagram,
  slimCi,
  actionsWorkflow,
  artifacts,
  failureTriage,
  runbook,
]
