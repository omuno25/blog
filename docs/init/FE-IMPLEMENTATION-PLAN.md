# FE Implementation Plan (Executed)

## Objective
Implement high-fidelity responsive Astro screens based on `design/` references, with `system_design_modern_v1` as the baseline direction, using reusable components and local Tailwind integration.

## Implemented Scope
- Shared design tokens and global style layer
- Reusable component primitives for navigation, hero, cards, chips, CTA, search, and stats
- App shell with top nav + left sidebar + optional right rail
- Design demo route namespace:
  - `/design/devdocs/v1`
  - `/design/devdocs/v2`
  - `/design/devdocs/v3`
  - `/design/search/v1`
  - `/design/system-design/v1`
  - `/design/llm-orchestration/v1`
  - `/design/llm-orchestration/v2`
  - `/design/llm-orchestration/v3`
- Production-like routes:
  - `/`
  - `/blog/[slug]`
  - `/category/[slug]`
  - `/tag/[slug]`
  - `/search`

## Contracts and Compatibility
- Data contracts defined in `src/lib/types.ts`
- Mock content layer in `src/lib/mock-data.ts`
- Contracts designed to be replaceable by WordPress/WPGraphQL payload mapping later

## Notes
- External image URLs are used directly in HTML and include lightweight error fallback (`onerror` hide pattern).
- Styling uses local Tailwind setup (not CDN runtime).

## Run and Verification Checklist
- [x] Install dependencies and local Tailwind integration
- [x] `npm run build` succeeds without route generation errors
- [x] `npm run dev -- --host 127.0.0.1 --port 4321` starts successfully
- [x] Smoke test `GET /` returns `200`
- [x] Smoke test `GET /design` returns `200`
- [x] Smoke test `GET /design/devdocs/v1` returns `200`
- [x] Smoke test `GET /search?q=astro` returns `200`
- [ ] Visual parity pass vs `design/*/screen.png` on desktop
- [ ] Visual parity pass vs `design/*/screen.png` on mobile
- [ ] Accessibility pass (focus order, heading landmarks, color contrast)
- [ ] Replace mock data with WPGraphQL mapping layer
