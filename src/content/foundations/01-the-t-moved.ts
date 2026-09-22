import type { Section } from '../types'

export const theTMoved: Section = {
  id: 'the-t-moved',
  title: 'The T moved',
  scene: 'elt-shift',
  slide: `## Transformation changed address

For twenty years data was cleaned **on the way in**: a dedicated server sat between the sources and the warehouse, and only tidy tables ever landed.

### Why that stopped making sense
- **Warehouse compute got cheap and elastic** — the box you were paying to avoid is now the cheapest one you own
- **Storage got cheaper still** — landing raw data costs almost nothing, so there is no reason to discard it
- **The transform server was a bottleneck** — one machine, one schedule, one team to wait for

### So the T moved to the end
Extract, **load**, then transform — in SQL, inside the warehouse, against data that is already sitting there.

### And that left a gap
The transformation layer became a pile of SQL: no version control, no tests, no idea what depends on what. **dbt is the tool for that gap.**`,
  narration:
    "Before we talk about dbt at all, we need the change that made it necessary — and it is not a technical change so much as a change of address. For about twenty years, the shape of a data pipeline was extract, transform, load. You pulled data out of the source systems, you cleaned it up on a dedicated machine in the middle, and only the finished, tidy tables ever reached the warehouse. There was a good reason for that. Warehouse storage was expensive, warehouse compute was a fixed box you had bought, and you did not want to waste either on messy data. Then three things changed at once. Warehouse compute became elastic and cheap — you rent it by the second and give it back. Storage became cheaper still, cheap enough that keeping the raw data forever costs less than the meeting about whether to keep it. And that transform server in the middle, which had once been the efficient choice, turned into the slowest part of the pipeline: one machine, one schedule, one team that everybody else queued behind. So the T moved. Extract, load, and then transform — in SQL, inside the warehouse, on data that has already landed. That is ELT, and today it is simply how this is done. But moving the T left a hole. The transformation logic used to live in a tool, with a graph and a runtime. Now it is SQL — often hundreds of files of it, written by several people, run in an order somebody remembers, tested by nobody, and with no way to answer the question which table feeds this number. Everything dbt does is aimed at exactly that hole.",
}
