import type { Section } from '../types'

export const whatDbtIsNot: Section = {
  id: 'what-dbt-is-not',
  title: 'What dbt is not',
  scene: 'where-dbt-sits',
  slide: `## A narrow box, on purpose

dbt owns exactly one step: **raw tables in your warehouse → modelled tables in your warehouse.** Everything either side belongs to another tool.

### Not an ingestion tool
It never connects to Stripe, Salesforce or your production Postgres. Getting data *in* is Fivetran, Airbyte, or a script you wrote — a separate job with separate credentials.

### Not an orchestrator
\`dbt run\` does not schedule itself. Something must invoke it: cron, GitHub Actions, Airflow, Dagster, or the dbt platform's own jobs.

### Not a query engine
dbt has no compute. It sends SQL to your warehouse and reads back the result — **every row of work happens there**, on your bill.

### Why that matters today
That last point is what makes dbt fast or slow, cheap or expensive. Tuning dbt is almost always **tuning the SQL the warehouse receives.**`,
  narration:
    "It is just as useful to know where dbt stops, because the three things people expect it to do are three things it deliberately refuses. First: dbt is not an ingestion tool. It will not connect to Stripe, or Salesforce, or your production Postgres, and it will not move a single row into your warehouse. Getting data in is somebody else's job — Fivetran, Airbyte, a Python script, your cloud provider's loader. By the time dbt is involved, the raw data is already sitting in the warehouse. Second: dbt is not an orchestrator. Typing dbt run runs it once, now. It has no scheduler, no retry policy, no alerting of its own. Something outside has to invoke it — cron, GitHub Actions, Airflow, Dagster, or the dbt platform's hosted jobs, which exist precisely because Core does not do this. Third, and this is the one worth carrying with you: dbt is not a query engine. It owns no compute whatsoever. When you run a project, dbt opens a connection, sends a SQL statement, waits, and reads the result. Every join, every aggregation, every byte scanned happens inside your warehouse, on your warehouse bill. That has a practical consequence you will meet in every course from here on. When a dbt project is slow, dbt is almost never the slow part — the SQL it sent is. When a dbt project is expensive, dbt costs you nothing; the warehouse compute it triggered is the entire bill. So tuning dbt means tuning what the warehouse receives, and that reframing will save you a lot of wasted effort.",
}
