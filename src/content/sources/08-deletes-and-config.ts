import type { Section } from '../types'

export const deletesAndConfig: Section = {
  id: 'deletes-and-config',
  title: 'Deletes, and the rules',
  scene: 'snapshot-config',
  slide: `## A row that simply vanishes

Neither strategy sees a deletion — nothing changed, the row just stopped arriving. \`hard_deletes\` decides what happens:

- **\`ignore\`** (the default) — the row stays open forever, as though it were still current
- **\`invalidate\`** — close it, stamped with now
- **\`new_record\`** — write a final row marked as deleted

Default behaviour is the surprising one: a deleted customer looks **current** in your snapshot indefinitely.

### Three rules that do not bend
- **Snapshot the source, not a model.** Logic can be rebuilt; captured history cannot
- **No transformation.** Renaming and casting belong in staging, downstream of this
- **Never drop it.** Not to fix it, not to refactor, not while tidying up

### Why all three
Every other object in your project can be rebuilt from source. **A snapshot is the source of its own history.** Back it up like a production database, because that is what it is.`,
  narration:
    "Two things to finish snapshots off. First, deletions — and they are genuinely awkward, because a deletion is not a change. Nothing in the row moved; the row simply stopped appearing in the source. So neither strategy notices it on its own. The hard deletes config decides what happens. The default is ignore, which means dbt leaves the last version open, with a null end date, forever. Read that again, because it is the surprising one: a customer deleted from your source system looks like a current, valid customer in your snapshot indefinitely. Invalidate closes the row, stamped with the time dbt noticed. New record goes further and writes a final version marked as deleted, so the disappearance itself becomes an event in the history. Which is right depends on whether a deletion in your source means this never existed or this ended. Then three rules, and none of them bend. Snapshot the source, not a model. If you snapshot a model, you have captured the output of logic that you will inevitably change — and then your history is a mixture of old logic and new logic, which is worse than no history. Model logic can be rewritten and rebuilt. History cannot. Second, no transformation inside a snapshot. Select the raw columns, as they are. Renaming, casting and cleaning belong in a staging model downstream of the snapshot, where you can change your mind. And third: never drop it. Not to fix it, not to refactor, not while tidying up a dev schema. All three rules come from one property. Every other object in your project can be rebuilt from the source. A snapshot is the source of its own history — so back it up like a production database, because that is exactly what it is.",
}
