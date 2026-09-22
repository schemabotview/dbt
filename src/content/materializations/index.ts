import type { Course } from '../types'
import { theFourBuiltins } from './01-the-four-builtins'
import { view } from './02-view'
import { table } from './03-table'
import { ephemeral } from './04-ephemeral'
import { whyIncremental } from './05-why-incremental'
import { isIncremental } from './06-is-incremental'
import { appendAndMerge } from './07-append-and-merge'
import { deleteInsertAndOverwrite } from './08-delete-insert-and-overwrite'
import { microbatch } from './09-microbatch'
import { choosing } from './10-choosing'

// materializations — course 03 of the nine-course dbt spine. The same SELECT, built five ways, and
// how to pick. Ten sections, ten scenes.
// §02 and §03 are deliberately the same scene shape with opposite answers — the trade is where the
// cost lands, and the mirror makes that visible. §05 states the problem with no solution in it at
// all, because an incremental model adopted before the pain is just complexity; §06-§09 are then
// one long answer to the single question §05 ends on.
export const materializations: Course = {
  id: 'materializations',
  title: 'Materializations',
  sections: [
    theFourBuiltins,
    view,
    table,
    ephemeral,
    whyIncremental,
    isIncremental,
    appendAndMerge,
    deleteInsertAndOverwrite,
    microbatch,
    choosing,
  ],
}
