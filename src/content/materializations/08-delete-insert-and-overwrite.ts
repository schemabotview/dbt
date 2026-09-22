import type { Section } from '../types'

export const deleteInsertAndOverwrite: Section = {
  id: 'delete-insert-and-overwrite',
  title: 'delete+insert and insert_overwrite',
  scene: 'overwrite-strategies',
  slide: `## Replace a slice, not a row

Both of these strategies throw away a **region** of the table and rewrite it, rather than matching row by row.

### \`delete+insert\`
Delete every row whose \`unique_key\` appears in the incoming batch, then insert the batch. Same end state as \`merge\`, different mechanics — sometimes faster, and available where merge is awkward.

### \`insert_overwrite\`
Replace whole **partitions**. dbt works out which partitions the incoming rows belong to, drops those, and writes the new ones. Requires a partitioned table; the natural fit on BigQuery and Spark.

### Why you would want this
Late-arriving rows and corrections. **A day is only correct once it is complete** — so rebuilding Thursday in full is more obviously right than patching individual rows in it.

### The catch
The unit of rewrite is yours to choose, and choosing badly is expensive. Too coarse and you rewrite last year every night.`,
  narration:
    "Two more strategies, and they share an idea: instead of matching row by row, throw away a region of the table and rewrite it. Delete-plus-insert is the simpler one. Delete every row whose unique key appears in the incoming batch, then insert the batch. The end state is the same as a merge — updated rows updated, new rows added — but the mechanics are different, and on some warehouses and some shapes of data it is meaningfully faster. It is also useful where a merge is awkward or unsupported. Insert-overwrite works at a coarser grain: whole partitions. dbt looks at which partitions the incoming rows belong to, drops those partitions entirely, and writes the new ones in their place. It needs a partitioned table, which makes it the natural fit on BigQuery and on Spark, where partitioning is how everything is organised anyway. So why would you want to replace a whole day rather than update the rows that changed? Late-arriving data, mostly. Events turn up hours after they happened. Corrections get issued. A refund modifies an order from last Tuesday. If your source can amend the past, then a day is only correct once it is complete — and rebuilding Thursday in full, from scratch, is much more obviously right than trying to patch individual rows inside it and hoping you caught them all. The catch is that the unit of rewrite is yours to choose, and choosing badly is expensive. Partition by day and reprocess a week: fine. Partition by year, and every nightly run rewrites the entire current year, which is most of your table — you have reinvented the full rebuild with extra steps.",
}
