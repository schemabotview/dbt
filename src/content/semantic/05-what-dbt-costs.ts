import type { Section } from '../types'

export const whatDbtCosts: Section = {
  id: 'what-dbt-costs',
  title: 'What dbt costs',
  scene: 'cost-anatomy',
  slide: `## dbt has no compute of its own

It writes SQL and sends it. **Every cent of compute is the warehouse's**, spent running statements your project generated.

- **dbt Core** — free, open source, a CLI on your machine
- **The platform** — seats and runs, if you use it
- **The warehouse** — everything else, which is most of it

### Where a project's spend actually goes
| The spend | Why |
|---|---|
| Full rebuilds | a table model over long history |
| CI | every PR building the whole project |
| Over-scheduling | hourly for a report read daily |
| Idle warehouses | auto-suspend set too generously |

### The useful reframe
Cost is a **modelling** question, not a licensing one. You wrote the bill.`,
  narration:
    "Let's talk about money, because this comes up the moment a dbt project stops being a prototype. The first thing to understand is that dbt has no compute of its own. It is a compiler and a runner: it turns your models into SQL statements and sends them to the warehouse. It does not process a single row itself. Which means that essentially every cent of compute on your bill is the warehouse's, spent executing statements your project generated. Break the bill into three parts. dbt Core is free and open source — it is a command-line tool on your machine, and it costs nothing. The dbt platform charges for seats and for runs, if you choose to use it. And the warehouse charges for everything else, which in practice is the overwhelming majority of what you will pay. Now, where does a project's spend actually go? Four places, and they show up in roughly this order. Full rebuilds — a table model sitting on top of years of history, rebuilt from scratch every single night. Continuous integration, where every pull request builds the entire project instead of the handful of models that changed. Over-scheduling, which is running something hourly when the report is read once a day. And idle warehouses, where auto-suspend is set generously enough that you are paying for a machine that is doing nothing. The useful reframe is this: cost is a modelling question, not a licensing question. Nobody sold you an expensive tool. You wrote the bill, one model at a time, and that means you can also rewrite it.",
}
