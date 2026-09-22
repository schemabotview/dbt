import type { Course } from '../types'
import { declaringSources } from './01-declaring-sources'
import { sourceFreshness } from './02-source-freshness'
import { seedsSection } from './03-seeds'
import { whySnapshots } from './04-why-snapshots'
import { timestampStrategySection } from './05-timestamp-strategy'
import { checkStrategySection } from './06-check-strategy'
import { scd2ColumnsSection } from './07-scd2-columns'
import { deletesAndConfig } from './08-deletes-and-config'
import { theIngestWalk } from './09-the-ingest-walk'

// sources — course 04 of the nine-course dbt spine. Everything at the edge of the project: the raw
// tables, the CSVs, and the history capture that nothing else can do. Nine sections, nine scenes.
// §01 deliberately does NOT re-teach source() as a function — the models course did that. This one
// is the FILE: identifier, inherited config, and tests on raw data. §04 is the hinge of the course:
// it states a loss that no model, test or rebuild can recover, and §05-§08 are the answer to it.
export const sources: Course = {
  id: 'sources',
  title: 'Sources, Seeds & Snapshots',
  sections: [
    declaringSources,
    sourceFreshness,
    seedsSection,
    whySnapshots,
    timestampStrategySection,
    checkStrategySection,
    scd2ColumnsSection,
    deletesAndConfig,
    theIngestWalk,
  ],
}
