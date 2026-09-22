import type { Section } from '../types'

export const whyAMetricsLayer: Section = {
  id: 'why-a-metrics-layer',
  title: 'Why a metrics layer',
  scene: 'metric-drift',
  slide: `## The same word, four numbers

Finance nets off refunds and tax. Sales reports gross. The board deck strips intercompany. The app returns whatever the API said.

**Every one of those queries is correct.** They encode four different definitions of one word.

### Where the definition actually lives
In four dashboards, four notebooks and somebody's saved SQL — copied, edited, and never reconciled. The warehouse has no opinion about which is right.

### What a metrics layer changes
The definition moves **into the project**, beside the model it reads, in version control, reviewed like code. Dashboards stop holding definitions and start **asking for one**.

### The test of whether you need this
Ask two teams for last quarter's revenue. If the numbers differ, this course is the fix.`,
  narration:
    "Here is a meeting that happens in every company that has ever had more than one dashboard. Four people bring a number for last quarter's revenue, and no two of them match. Finance has netted off refunds and tax, because that is what revenue means in a set of accounts. Sales is reporting gross, because that is what a sales target is measured against. The board deck has stripped out intercompany transactions. And the product app is showing whatever the API happened to return. Now, the thing to understand is that nobody in that meeting is wrong. Every one of those four numbers is the output of a query that is perfectly correct SQL. What differs is the definition, and the definition is not written down anywhere that anyone can point at. It is buried in four dashboards, a couple of notebooks, and somebody's saved query from two years ago. The warehouse has no opinion about which one is right. It will compute whichever one you ask for, instantly and accurately, which is precisely the problem. So the fix is not a better dashboard, and it is not a longer meeting. The fix is to move the definition into the project, right beside the model it reads from, in version control, reviewed like any other code. Once revenue is defined once, dashboards stop each holding their own idea of it and start asking for the one that exists. If you want to know whether your organisation needs this, the test takes about a day: ask two different teams for the same number and see whether they agree.",
}
