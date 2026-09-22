import type { Section } from '../types'

export const coreAndPlatformSection: Section = {
  id: 'core-and-platform',
  title: 'dbt Core and the dbt platform',
  scene: 'core-and-platform',
  slide: `## Two ways to run the same project

**dbt Core** is the open-source command-line tool. **The dbt platform** is a hosted service built around it.

### What the platform adds
- **Jobs** — the scheduler Core does not have, with logs and notifications
- **A browser IDE** — no local install, which matters for analysts
- **Permissions and a metadata API** — team-shaped things

### The part people get wrong
The **project is identical** either way — same models, same yml, same repo. Choosing between them is a deployment decision, not a rewrite.

### The Fusion engine
dbt's engine is being replaced by one that truly *parses* SQL rather than templating strings — so it catches a wrong column name before the warehouse is asked. Faster, and stricter.

### This concept is Core-first
Everything teachable on the CLI is taught there; the platform appears where Core has no answer.`,
  narration:
    "A fork in the road you should take deliberately rather than by accident. dbt comes in two forms. dbt Core is the open-source command-line tool — you install it, you point it at a warehouse, you type dbt run. It is free, it runs anywhere you can run Python, and it is what the overwhelming majority of learning material assumes. The dbt platform is a commercial hosted service wrapped around that same tool. It gives you a browser-based development environment, so an analyst does not have to install anything. It gives you scheduled jobs with logging and alerting, which is the single biggest gap in Core. It adds permissions, a metadata API, and the team-shaped features that matter once more than a couple of people share a project. Here is the part people consistently get wrong: the project itself is identical. The same models, the same yml files, the same git repository. Nothing you learn on the CLI has to be unlearned on the platform, and moving from one to the other is a deployment decision, not a rewrite. One more thing worth knowing, because it is changing underneath both. The engine that parses and compiles your project is being replaced by a new one, Fusion, which genuinely understands SQL rather than treating it as text to template. That means it can tell you a column does not exist before it sends anything to your warehouse — which is both much faster and noticeably stricter about projects that were quietly sloppy. In this concept we work Core-first. Everything that can be taught on the command line is taught there, and the platform shows up only where Core has no answer at all.",
}
