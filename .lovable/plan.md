## 1. Headline change

`src/pages/Index.tsx` — replace the current subtitle text with:

> "CS Online Class of '28 | California State University, Monterey Bay"

## 2. Node version

Bump `.github/workflows/deploy.yml` from Node 20 → **Node 22 (LTS)**.

Note on "Node 26": as of July 2026, Node 24 is Active LTS and Node 26 is Current (not LTS). Vercel's serverless runtime currently pins to Node 22.x for `@vercel/node` v5, so choosing 22 keeps GitHub Actions builds aligned with what Vercel actually runs. I recommend 22; say the word if you'd rather push to 24 or 26.

## 3. Dependency upgrades

Split into low-risk (do in one shot) and high-risk majors (each needs code changes).

### Low-risk — bump directly

Root `package.json`:
- `@types/node` 22 → 24 (match Node 22/24 runtime)
- `@vercel/blob` 1.1.1 → 2.6.1 (API is backward-compatible for `put`)
- `@vitejs/plugin-react-swc` 3 → 4
- `date-fns` 3 → 4 (only used transitively by `react-day-picker`; check)
- `eslint-plugin-react-refresh` 0.4 → 0.5
- `globals` 15 → 17
- `next-themes` 0.3 → 0.4
- `tailwind-merge` 2 → 3
- `vaul` 0.9 → 1.1
- `zod` 3 → 4 (only used via `@hookform/resolvers`; verify no direct schemas)

`vercel-api/package.json`:
- `@types/node` 20 → 22
- `@vercel/blob` 1.1.1 → 2.6.1

### High-risk majors — apply with code migrations

Each of these has real breaking changes. I'll upgrade and patch the fallout:

- **`react-router-dom` 6 → 7** — imports mostly compatible; verify `HashRouter` usage in `src/App.tsx` still works (it does in v7).
- **`@hookform/resolvers` 3 → 5** — new named-import shape (`zodResolver` → `standardSchemaResolver` or updated `zodResolver` path). Only relevant if any form uses it; audit.
- **`react-day-picker` 8 → 10** — prop renames (`selected`, `mode`, styling). Used by shadcn `calendar.tsx`; will re-sync that component.
- **`sonner` 1 → 2** — `<Toaster />` API tweaks; light audit.
- **`recharts` 2 → 3** — API changes; only touch if charts are used (search shows none in `src/`, safe to bump).
- **`@dnd-kit/sortable` 7 → 10** — used by `SortableAssignmentItem.tsx`; verify `useSortable` signature.
- **`eslint` 9 → 10 + `@eslint/js` 10 + `eslint-plugin-react-hooks` 7** — config shape unchanged for our flat config; bump together.
- **`lucide-react` 0.462 → 1.25** — icon names stable, just a versioning reset.
- **`react-resizable-panels` 2 → 4** — not used in `src/` (shadcn ships a wrapper); safe.

### Explicitly NOT upgrading (would be disruptive rewrites)

- **`tailwindcss` 3 → 4** — v4 replaces `tailwind.config.ts` with CSS-first config and changes `@tailwind` directives. Entire theme + shadcn tokens would need porting. Skip unless you want a dedicated pass.
- **`typescript` 5 → 7** — TS 7 is still very fresh; hold until the ecosystem catches up.
- **`vite` 7 → 8** — paired with the Tailwind v4 migration; skip for now.

## 4. Verification

- Run `npm install` in both root and `vercel-api/`.
- Run `npm run build` at the root; fix any type/import errors that surface (especially in `calendar.tsx`, `SortableAssignmentItem.tsx`, forms using `@hookform/resolvers`).
- Spot-check dev preview: dark mode toggle, courses dropdown, assignment drag-and-drop, admin login.

## 5. Deliverables

- Updated `src/pages/Index.tsx`, `.github/workflows/deploy.yml`, both `package.json` files, lockfiles.
- Any component patches required by the majors above.
- Short summary of what I bumped, what I skipped, and why.
