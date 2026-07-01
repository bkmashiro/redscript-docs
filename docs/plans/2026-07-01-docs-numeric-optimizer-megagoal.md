# RedScript Docs Numeric + Optimizer Refresh Megagoal

> **For Hermes/Spark:** Use this as the active goal prompt for the next RedScript documentation refresh. The controller owns final review, gates, commits, push, and CI status. Spark workers may edit only the bounded documentation slices below and must not commit.

**Goal:** Align `redscript-docs` with the current RedScript numeric scale policy and optimizer/CLI reality.

**Architecture:** This is a documentation-only refresh. Public docs should describe the stable user-facing contract: language `fixed` is canonical ×10000, stdlib helper families may use explicit scale-specific integer APIs, and optimizer docs should describe the current fixed optimizer pipeline plus manual experimental local-copy evidence rather than nonexistent `-O*`/`--stats` flags. Auto-generated stdlib pages should be regenerated from `redscript` source comments/generator, not hand-edited directly.

**Tech Stack:** VitePress docs in `/Users/yuzhe/projects/redscript-docs`; source-of-truth implementation and generated stdlib docs in `/Users/yuzhe/projects/redscript`.

---

## Current repo state

Docs repo: `/Users/yuzhe/projects/redscript-docs`

Current status at planning time:

- Branch: `main`
- Local commits ahead of `origin/main`:
  - `20e9069 docs: update math_hp double_mul docs`
  - `3e0844c docs: update math fx1000 aliases`
- Working tree was clean before this plan was written.

Source repo: `/Users/yuzhe/projects/redscript`

Primary source-of-truth files:

- `docs/plans/numeric-scale-policy.md`
- `docs/plans/redscript-typed-optimizer-opportunity-report.md`
- `docs/plans/redscript-vnext-roadmap.md`
- `src/cli/args.ts`
- `src/cli.ts`
- `src/emit/compile.ts`
- `src/optimizer/pipeline.ts`
- `src/optimizer/lir/pipeline.ts`
- `src/stdlib/math.mcrs`
- `src/stdlib/math_hp.mcrs`

## Non-negotiable facts to preserve

### Numeric facts

- Language-level `fixed` is canonical scoreboard `×10000`.
- Decimal literals such as `1.5` lower to `15000` when used as `fixed`.
- `fixed * fixed` must restore `×10000` scale by dividing by `10000` in compiler lowering.
- `fixed / fixed` must multiply the dividend by `10000` before division in compiler lowering.
- Mixed numeric arithmetic across `int` / `fixed` / `double` should fail loudly unless conversion is explicit and documented.
- `float` is legacy/deprecated; new examples should use `fixed`.
- Do not describe `math.mcrs` legacy helpers as language `fixed` just because their names contain `fixed`.
- `math.mcrs` legacy helpers are mostly explicit scale-specific integer APIs, especially `×1000` helpers such as `sqrt_fx1000`, `sin_fx1000`, `cos_fx1000`, `lerp_t1000`, `mul_fx1000`, and `div_fx1000`.
- `math_hp.mcrs` helpers are mostly `×10000` integer fixed-point or NBT double tricks.
- `double` is not “a bigger fixed”; it is an NBT-backed Java double with helper-specific precision and conversion boundaries.
- `double_mul` is currently the documented macro-scale double path. It avoids the old `×10000` int32 scoreboard product envelope, but rounds/truncates operands at a `1e-4` boundary and does not promise NaN/Infinity behavior.

### Optimizer/CLI facts

- Do not document `-O0`, `-O1`, `-O2`, `--stats`, or `--no-dce` as current public CLI optimizer flags unless source inspection proves they exist again.
- The current optimizer is a fixed compile pipeline, not a user-selected optimization-level pipeline.
- The manual experimental flag `--experimental-lir-local-copy-rewrite` exists and should be documented carefully as off-by-default/manual opt-in.
- Local-copy rewrite evidence currently supports `manual-experimental-opt-in-only`, with benchmark/offline evidence only. Do not describe it as default-ready or live Paper proof.
- Keep evidence labels explicit: static docs/build evidence is not live Minecraft/Paper runtime proof.

## Audit findings to fix

### Numeric stale content

Known stale patterns from the initial audit:

- `docs/en/guide/variables.md` / `docs/zh/guide/variables.md`
  - Old `fixed` multiplication guidance claims users must call `mulfix`/`divfix` for language `fixed` arithmetic.
  - Old `as fixed` examples and type inference text still mention `float` or old scale semantics.
- `docs/en/reference/types.md` / `docs/zh/reference/types.md`
  - Old “multiplication compensation” examples teach `mulfix` as mandatory for `fixed * fixed`.
  - Cast table and common mistakes need to align with actual current semantics.
- `docs/en/reference/expressions.md` / `docs/zh/reference/expressions.md`
  - Old fixed-multiplication warning and `as fixed` comments remain.
- `docs/en/reference/errors.md` / `docs/zh/reference/errors.md`
  - Error fixes still recommend `mulfix()` as the default solution for `fixed` math.
- `docs/en/reference/syntax.md` / `docs/zh/reference/syntax.md`
  - Old v2.5.0 note says fixed multiplication without `mulfix`/`divfix` warns.
- `docs/en/tutorials/09-precision-arithmetic.md` / `docs/zh/tutorials/09-precision-arithmetic.md`
  - The tutorial still teaches too much manual raw-int fixed arithmetic as the primary user model.
- `docs/zh/stdlib/math_hp.md`
  - The generated Chinese `double_mul` text is stale relative to the source/current English docs and should be regenerated from source comments rather than hand-edited.

### Optimizer stale content

Known stale patterns from the initial audit:

- `docs/en/advanced/optimization.md` / `docs/zh/advanced/optimization.md`
  - Built around `-O0` / `-O1` / `-O2`, `--stats`, and `--no-dce` as if they are current public flags.
- `docs/en/tutorials/03-optimization.md` / `docs/zh/tutorials/03-optimization.md`
  - Same stale optimization-level story and fake `--stats` output.
- `docs/en/tutorials/01-hello-world.md` / `docs/zh/tutorials/01-hello-world.md`
  - Compile examples still include `-O1`.
- `docs/en/reference/cli.md` / `docs/zh/reference/cli.md`
  - Missing `--experimental-lir-local-copy-rewrite` and should explicitly avoid implying `-O*`/`--stats` are current flags.

## Spark work plan

Run these as three file-disjoint Spark implementation slices. Spark must not commit. Controller reviews and gates after each slice.

### Slice A — Numeric core reference docs

**Allowed files:**

- `docs/en/guide/variables.md`
- `docs/zh/guide/variables.md`
- `docs/en/reference/types.md`
- `docs/zh/reference/types.md`
- `docs/en/reference/expressions.md`
- `docs/zh/reference/expressions.md`

**Forbidden:**

- Do not edit generated `docs/*/stdlib/*.md` in this slice.
- Do not edit optimizer docs in this slice.
- Do not edit config, package files, or source code.
- Do not commit.

**Acceptance:**

- Docs clearly distinguish language `fixed` `×10000` from legacy stdlib `×1000` helper APIs.
- Remove/replace claims that ordinary language `fixed * fixed` requires `mulfix` or produces a `10000²` user-visible bug.
- Keep explicit conversion guidance conservative and consistent with `numeric-scale-policy.md`.
- Update English and Chinese docs together.

### Slice B — Numeric errors/tutorials + generated stdlib note

**Allowed files:**

- `docs/en/reference/errors.md`
- `docs/zh/reference/errors.md`
- `docs/en/reference/syntax.md`
- `docs/zh/reference/syntax.md`
- `docs/en/tutorials/09-precision-arithmetic.md`
- `docs/zh/tutorials/09-precision-arithmetic.md`
- optionally a short note in this plan if generated stdlib docs need regeneration from `redscript`

**Forbidden:**

- Do not hand-edit `docs/en/stdlib/*.md` or `docs/zh/stdlib/*.md` unless the controller explicitly switches to a regeneration slice.
- Do not edit optimizer docs in this slice.
- Do not commit.

**Acceptance:**

- Error guidance no longer tells users to fix normal `fixed` arithmetic by importing `mulfix`.
- Precision tutorial teaches language `fixed` as the primary surface and raw scaled integers only as interop/lower-level explanation.
- The tutorial still documents that scale-specific stdlib helpers exist and may use explicit `fx1000`/`fx10000` naming.
- English and Chinese remain aligned.

### Slice C — Optimizer and CLI docs

**Allowed files:**

- `docs/en/advanced/optimization.md`
- `docs/zh/advanced/optimization.md`
- `docs/en/tutorials/03-optimization.md`
- `docs/zh/tutorials/03-optimization.md`
- `docs/en/tutorials/01-hello-world.md`
- `docs/zh/tutorials/01-hello-world.md`
- `docs/en/reference/cli.md`
- `docs/zh/reference/cli.md`

**Forbidden:**

- Do not edit numeric reference docs in this slice.
- Do not edit source code or package/config files.
- Do not commit.

**Acceptance:**

- Remove or rewrite stale `-O0` / `-O1` / `-O2`, `--stats`, and `--no-dce` public-flag documentation.
- Explain the current optimizer as a fixed pipeline of safe passes rather than a user-selected level system.
- Document `--experimental-lir-local-copy-rewrite` as manual/off-by-default and evidence-only, not production default.
- Use real current compile command/output patterns.
- English and Chinese remain aligned.

## Controller gates

Run in `/Users/yuzhe/projects/redscript-docs` after applying worker diffs:

```bash
set -euo pipefail
# Review stale optimizer flags. Any remaining hits must be deliberate historical notes, not commands to run.
rg -n "(-O0|-O1|-O2|--stats|--no-dce)" docs/en docs/zh || true

# Review stale numeric advice. Any remaining mulfix/divfix hits must be about explicit stdlib helper APIs, not mandatory language fixed arithmetic.
rg -n "mulfix|divfix|as fixed|推断为 float|inferred as float|除以 1000|divides by 1000" docs/en docs/zh || true

git diff --check
npm run build
npm run docs:verify
git status -sb
```

If generated stdlib docs need updates, switch to `/Users/yuzhe/projects/redscript`, update source comments/generator, run the project docs generation/check flow, then copy/regenerate through the intended pipeline. Do not silently hand-edit auto-generated stdlib markdown.

## Worker return format

Each Spark worker must return:

1. Changed files
2. Summary of what changed
3. Exact commands run and output summary
4. Remaining stale grep hits or blockers
5. Any source facts that were uncertain
