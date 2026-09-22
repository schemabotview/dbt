# dbt — course plan

The full section plot for the nine-course spine. `CLAUDE.md` is the operational summary; this is the
detail.

**87 sections.** Courses 1-5 (49 sections) are the shippable prefix.

Two decisions, taken before a line was authored, run through every course below:

- **Snowflake is the worked warehouse.** Diagrams and SQL stay warehouse-neutral wherever the idea
  is neutral (a `ref`, a DAG, a test). Where one platform must be named — a merge statement, a
  connection profile, a cost claim — it is Snowflake, so this repo lines up with `../snowflake` and
  a learner can run what they see.
- **Core-first, the platform named where it genuinely differs.** Everything teachable on the dbt CLI
  is taught there. The hosted platform (jobs, environments, the Fusion engine, Copilot, the MCP
  server) appears only where Core has no answer: scheduling in `deployment`, cross-project refs in
  `governance`, the AI surface in `semantic`. No section assumes a paid account.

---

## 01 · `foundations` — What dbt Is (10)

1. `the-t-moved` — ETL became ELT when the warehouse got cheap, and what that left behind: transformation as SQL nobody owns
2. `what-dbt-is` — a compiler and a runner: SQL in, `CREATE` statements out; and the four things it adds (dependencies, tests, docs, environments)
3. `what-dbt-is-not` — not an orchestrator, not an ingestion tool, not a query engine; the warehouse does every bit of the work
4. `core-and-platform` — dbt Core on the CLI vs the hosted platform; what each is for, and what the Fusion engine changes
5. `adapters` — one project, many warehouses: the adapter is what turns a model into dialect
6. `project-anatomy` — the folders a project is made of, and `dbt_project.yml` as its single root
7. `profiles-and-targets` — connection lives OUTSIDE the project; `profiles.yml`, targets, and why dev and prod are one flag apart
8. `first-run` — `dbt run` end to end: parse → compile → execute → the object that appears in the warehouse
9. `compile-vs-run` — the `target/` directory, the compiled SQL, and reading it as the debugging habit
10. `the-command-set` — `run · test · build · seed · snapshot · docs`, and the map of the remaining eight courses

## 02 · `models` — Models, `ref` and the DAG (10)

1. `a-model-is-a-select` — one file, one `SELECT`, one object in the warehouse; no DDL written by hand
2. `ref` — the function the whole tool is built on: a dependency and a name resolution in one
3. `hardcoded-names` — what breaks when you write the table name yourself: no lineage, no environments, no ordering
4. `source` — declaring raw tables so the DAG starts at the edge of your control
5. `the-dag` — dbt does not read your mind or your folders: the graph is `ref` calls, and run order falls out of it
6. `compiled-sql` — what `ref` becomes in the executed statement, per environment
7. `configuring-a-model` — three places a config can live (in-file, `dbt_project.yml`, schema yml) and which one wins
8. `layers` — staging → intermediate → marts: what each layer is allowed to do
9. `naming-and-folders` — `stg_`/`int_`/`fct_`/`dim_`, one-to-one staging, and the conventions that make a project readable by a stranger
10. `custom-schemas` — where a model lands: target schema, custom schema, and the name dbt actually builds

## 03 · `materializations` — View, Table, Incremental & Beyond (10)

1. `the-four-builtins` — the same SELECT, four different objects; what each costs at build time and at query time
2. `view` — the default; cheap to build, pays on every read
3. `table` — rebuilt whole on every run; fast to read, and the honest default for a mart
4. `ephemeral` — no object at all: a CTE pasted into its children, and when that helps
5. `why-incremental` — the rebuild that stopped fitting in the window
6. `is-incremental` — the two-shape model: full on first build, filtered after, from one file
7. `append-and-merge` — the strategies: `append` for immutable events, `merge` + `unique_key` for changing rows
8. `delete-insert-and-overwrite` — partition-shaped rebuilds, and what each engine supports
9. `microbatch` — a model as a series of time slices: batch size, lookback, and reprocessing a bad day
10. `choosing` — the decision board, plus `--full-refresh`, `on_schema_change`, and materialized views

## 04 · `sources` — Sources, Seeds & Snapshots (9)

1. `declaring-sources` — the yml that names raw tables, and what you get back: lineage, docs, one place to rename
2. `source-freshness` — `loaded_at_field`, warn/error thresholds, and freshness as the first alarm in the pipeline
3. `seeds` — small CSVs versioned with the code; the legitimate uses, and the trap of using them as ingestion
4. `why-snapshots` — the raw table overwrote yesterday's value; nothing else in dbt can get it back
5. `timestamp-strategy` — an `updated_at` you trust, and the cheap correct path
6. `check-strategy` — no reliable timestamp: compare columns instead, and what that costs
7. `scd2-columns` — `dbt_valid_from` / `dbt_valid_to` / `dbt_scd_id`, and how to query a snapshot as of a date
8. `deletes-and-config` — vanished rows, and the yml-based snapshot config
9. `the-ingest-walk` — source → snapshot → staging → mart, one table followed the whole way

## 05 · `testing` — Tests, Unit Tests & Contracts (10)

1. `a-test-is-a-select` — a query that returns failing rows; zero rows is a pass, and that is the entire model
2. `the-four-generic-tests` — `unique · not_null · accepted_values · relationships`, and what each really catches
3. `singular-tests` — one hand-written assertion in `tests/`, for the rule that fits nowhere else
4. `custom-generic-tests` — turning that assertion into a reusable test with arguments
5. `severity-and-thresholds` — warn vs error, `error_if` / `warn_if`, and tests that tolerate a known level of mess
6. `store-failures` — keeping the failing rows in a table so a failure is investigable tomorrow
7. `test-packages` — `dbt_utils` and `dbt_expectations`: the tests you would otherwise write twice
8. `unit-tests` — mocked inputs, expected output: testing the LOGIC, not the data — and when each is the right one
9. `contracts` — enforcing a model's shape at build time: columns, types, constraints, and who they protect
10. `build` — `dbt build` as the interleaved order (model, then its tests, then its children) and why that beats run-then-test

## 06 · `jinja` — Jinja, Macros, Hooks & Packages (10)

1. `sql-that-writes-sql` — templating in five minutes: `{{ }}`, `{% %}`, and what the compiler does with them
2. `the-dbt-context` — `ref`, `source`, `this`, `target`, `model` — the variables dbt hands your template
3. `vars-and-env-vars` — `var()` and `env_var()`: configuration that changes per run, and where each belongs
4. `writing-a-macro` — a function that returns SQL; arguments, defaults, and the `macros/` folder
5. `control-flow` — `for` and `if` over a list of columns: the pivot/unpivot/coalesce class of repetition
6. `run-query` — reading from the warehouse at compile time, and why that makes a run non-deterministic
7. `hooks` — `pre-hook`/`post-hook` and `on-run-start`/`on-run-end`: grants, audit rows, and housekeeping
8. `overriding-dbt` — `generate_schema_name` and friends: changing dbt's own behaviour by name
9. `packages` — `packages.yml`, hub vs git vs local; what `dbt_utils` actually buys you
10. `too-much-jinja` — the unreadable model, and the rule for when the answer is plain SQL

## 07 · `deployment` — Running dbt in Production (10)

1. `dev-and-prod` — the same project, two targets; why a schema per developer is the whole isolation story
2. `a-job` — what "running dbt in production" actually means: a container, a clone, a command, a schedule
3. `selection-syntax` — `--select` and `--exclude`: paths, tags, and the `+` graph operators
4. `state` — `manifest.json` as the memory of the last run; `state:modified` and what counts as modified
5. `defer` — building only what changed by pointing the rest at prod
6. `slim-ci` — the pull-request run: build modified + downstream, test them, tear it down
7. `ci-with-actions` — the workflow file, end to end, on GitHub Actions
8. `artifacts` — `run_results.json`, `manifest.json`, `catalog.json`: what a run leaves behind and what to do with it
9. `failures` — reading a failed run, `dbt retry`, and the difference between a broken model and a failed test
10. `the-runbook` — a production checklist: freshness, build, test, alert, and who gets paged

## 08 · `governance` — Docs, Ownership & dbt Mesh (9)

1. `docs` — descriptions in yml, `dbt docs generate`, and the lineage graph as the artefact non-engineers actually use
2. `persist-docs-and-meta` — pushing descriptions into the warehouse; `meta` as the hook for owners, PII flags and tooling
3. `exposures` — declaring the dashboard at the end of the DAG so lineage does not stop at the warehouse
4. `groups-and-owners` — cutting a project into owned regions
5. `access` — `private · protected · public`: which models a neighbour is allowed to `ref`
6. `model-versions` — shipping a breaking change without breaking the consumer; deprecation dates
7. `one-project-to-many` — the signals that a monolith should split, and the cost of splitting early
8. `cross-project-ref` — project dependencies and `ref` across a boundary: dbt Mesh, and what it requires
9. `the-governance-checklist` — what a project needs before a second team is allowed in

## 09 · `semantic` — Semantic Layer, Cost & the AI Surface (9)

1. `why-a-metrics-layer` — the same "revenue" computed four ways in four dashboards, and what that costs the business
2. `semantic-models` — entities, dimensions and measures declared over a mart
3. `metrics` — simple, ratio, derived and cumulative; a metric as a definition, not a table
4. `saved-queries-and-consumption` — pre-declared question shapes, and how BI tools and notebooks pull them
5. `what-dbt-costs` — the bill is the warehouse's: where a project's spend actually goes
6. `tuning` — materialization choice, incremental sizing, and the cheap wins that are not clever
7. `the-fusion-engine` — a real SQL parser instead of string templating: what it makes possible
8. `dbt-and-ai` — the MCP server, Copilot, and why a governed DAG is what makes an LLM answer trustworthy
9. `where-this-goes` — the shape of a mature analytics-engineering practice, and what to learn next

---

## Judgment calls

Recorded so they can be argued with, not rediscovered.

| Call | Why | Cost of reversing |
|---|---|---|
| Snapshots sit in `sources` (04), not `materializations` (03) | A snapshot is ingestion-side history capture, not a choice about how a model is built. It belongs beside the raw tables it protects. | One folder move; nothing narrated points at it from 03. |
| Contracts + model versions sit in `testing` (05) and `governance` (08) respectively | Contracts are enforcement, and enforcement is taught where testing is. Versions are a *social* promise to a consumer, so they sit with access and mesh. | Low, until either course's wavs exist. |
| `microbatch` gets a section of its own (03·09) | It is the first incremental strategy that changes the mental model — a model as a series of slices, reprocessable per day — rather than adding an option. | Merge into 03·08 if it turns out thin. |
| Jinja is course 6, after testing | Jinja is the thing learners reach for too early. Everything in 1-5 is deliberately teachable without it, so the course arrives as a tool for repetition you have already felt. | High — the arc's main pedagogical bet. |
| `semantic` (09) is the trimmable tail | Nothing before it points forward, so the Semantic-Layer and AI halves can be cut, deferred or appended late without touching 1-8. | Zero. |

## House rules for this repo

1. **No volatile version numbers in narration.** A wav cannot be edited, and dbt ships fast. "Recent
   versions of dbt" is spoken; the version a feature landed in goes on the slide, which is editable.
2. **No course cross-references by number.** Neighbours are named ("when we built the DAG"), never
   numbered — that is what lets 1-5 ship as a prefix and keeps a later reorder free until the wavs
   exist.
3. **Every SQL snippet must be runnable** against a Snowflake target with `dbt_utils` installed. A
   snippet that only illustrates is a snippet that teaches a wrong habit.
