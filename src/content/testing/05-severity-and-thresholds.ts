import type { Section } from '../types'

export const severityAndThresholds: Section = {
  id: 'severity-and-thresholds',
  title: 'Severity and thresholds',
  scene: 'severity',
  slide: `## Not every failure should stop the build

\`\`\`yaml
config:
  severity: error     # error | warn
  error_if: ">100"    # fail past 100 bad rows
  warn_if: ">0"       # but speak up from the first
\`\`\`

**\`warn\`** prints loudly and the run continues. **\`error\`** fails the run and skips everything downstream.

### Thresholds buy you honesty
A new test on old data usually fails on day one. Rather than skipping it, **say what the current level of mess is** and fail only past that.

### The ratchet
Set \`error_if\` just above today's count, then lower it as you clean up. The test stops you getting worse while you get better.

### The failure mode to avoid
**A test that fails every day is a test nobody reads** — worse than no test, because it trains a team to ignore red.`,
  narration:
    "Here is a situation everyone hits in their first month. You add a not_null test to a column in a real project, and it fails immediately — because there are forty bad rows that have been there for two years. You now have three options. Do not add the test, which means never catching a forty-first. Hurriedly delete or patch the rows, which is a data change made under pressure to get a build green. Or say out loud what the current level of mess is, and fail only when it gets worse. Severity and thresholds are how you do the third one. Severity is warn or error. A warn is printed loudly in the output and the run carries on, children and all. An error fails the run, and everything downstream of that model is skipped — nothing gets built on top of data you have just declared wrong. Then the thresholds. Error_if and warn_if take an expression against the number of failing rows. So you can say: warn me from the very first bad row, but only actually fail the build past a hundred. That turns an unusable test into a useful one immediately. And it gives you a technique worth knowing by name — the ratchet. Set error_if just above today's count. Nothing fails, but the test is now protecting you: any new bad rows push you over the line and the build goes red. Then, as you clean up, lower the number. The test stops you getting worse while you get better, and the config file becomes an honest record of where the data quality actually stands. All of this exists to prevent one thing, so let me say it plainly. A test that fails every day is a test nobody reads. At that point it is worse than not having it, because it teaches an entire team that red is normal — and then the day something genuinely breaks, nobody looks.",
}
