# FFX Walkthrough Content Gap Audit

Audit of all 26 chapter JSONs against the BradyGames EPUB, monsters.json, and locations-poptracker.json.

## Structure

```
wave1/   — Source extraction (EPUB map, app inventory, game data reference, image audit)
wave2/   — Per-chapter comparisons across 7 quality dimensions
wave3/   — Synthesis (consolidated gap report) + QA verification
```

## Key Numbers

- **201 total findings**: 11 CRITICAL, 52 HIGH, 100 MEDIUM, 38 LOW
- **17/20 top findings independently confirmed** (0 false positives)
- **26 chapters scored** with letter grades per dimension

## Start Here

→ [`wave3/3a-consolidated-gap-report.md`](wave3/3a-consolidated-gap-report.md) — Executive summary, all findings by severity, per-chapter scorecards, fix priority list

→ [`wave3/3b-qa-spot-check.md`](wave3/3b-qa-spot-check.md) — Independent verification of top 20 findings + 7 bonus findings
