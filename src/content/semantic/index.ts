import type { Course } from '../types'
import { whyAMetricsLayer } from './01-why-a-metrics-layer'
import { semanticModels } from './02-semantic-models'
import { metricsSection } from './03-metrics'
import { savedQueriesAndConsumption } from './04-saved-queries-and-consumption'
import { whatDbtCosts } from './05-what-dbt-costs'
import { tuning } from './06-tuning'
import { theFusionEngine } from './07-the-fusion-engine'
import { dbtAndAi } from './08-dbt-and-ai'
import { whereThisGoes } from './09-where-this-goes'

// semantic — course 09 of the nine-course dbt spine, and the last one. Semantic Layer, cost and the
// AI surface. Nine sections, nine scenes.
// Three movements, deliberately in this order. §01-§04 are the metrics layer: the problem first
// (four numbers in one meeting), then the mechanism, then how a definition reaches a person — a
// definition nobody can consume is not worth declaring. §05-§06 are money, which is where a project
// stops being a prototype; both stay Core-only, because cost is a modelling question. §07-§09 are
// what is arriving: a compiler that parses SQL, an assistant that reads the project, and the habits
// the whole concept was really teaching.
// The platform is named in §02 and §04 (the hosted APIs) and §08 (the MCP server), because those are
// places Core genuinely has no answer — the slides say so rather than implying the CLI can do it.
// §07 carries no version number in its narration, per the house rule: engine maturity moves fast and
// a wav cannot be edited, so the slide points at the docs instead.
export const semantic: Course = {
  id: 'semantic',
  title: 'Semantic Layer & Beyond',
  sections: [
    whyAMetricsLayer,
    semanticModels,
    metricsSection,
    savedQueriesAndConsumption,
    whatDbtCosts,
    tuning,
    theFusionEngine,
    dbtAndAi,
    whereThisGoes,
  ],
}
