# Content API Adapter (Scalable Source Strategy)

## Goal
Decouple UI/pages from data source so we can use:
- WPGraphQL now
- REST / Markdown / external CMS later
without rewriting page components.

## Current Architecture
- `src/lib/content/types.ts`
  - Domain models (`ContentPost`, `ContentCategory`, `ContentTag`)
  - Provider interface (`ContentProvider`)
- `src/lib/content/providers/wpgraphql.ts`
  - WPGraphQL implementation
  - Query + normalize + map to domain model
- `src/lib/content/providers/wp-rest.ts`
  - WordPress REST implementation
  - `_embed` + taxonomy mapping + normalize to same domain model
- `src/lib/content/providers/mock.ts`
  - Local mock implementation (same interface)
- `src/lib/content/providers/cached.ts`
  - Cache + request coalescing wrapper (TTL-based)
- `src/lib/content/index.ts`
  - Provider factory by env: `CONTENT_PROVIDER`

## How to Switch Source
Use env variable:

```bash
CONTENT_PROVIDER=mock
# or
CONTENT_PROVIDER=wpgraphql
WORDPRESS_GRAPHQL_ENDPOINT=https://your-site.com/graphql

# or
CONTENT_PROVIDER=wprest
WORDPRESS_REST_ENDPOINT=https://your-site.com/wp-json/wp/v2
# (or set WORDPRESS_SITE_URL and provider will append /wp-json/wp/v2)

# cache
CONTENT_CACHE_TTL_SEC=60
```

No page refactor needed because pages only call `contentProvider`.

## Provider Contract (Stable)
All pages depend on 4 methods only:
- `getPosts(query?)`
- `getPostBySlug(slug)`
- `getCategories()`
- `getTags()`

When adding new source, implement same contract and register in factory.

## Scale Strategy
- Keep normalization inside provider (not inside pages)
- Keep UI components on domain model only
- Add caching/coalescing wrapper around provider methods (memory/redis)
- Add optional feature flags per provider for SEO fields/extensions

## Next Recommended Step
- Add explicit cache invalidation hook (`invalidateBySlug`, `invalidateByTag`) for webhook revalidation
- Add source capability flags for optional fields (`seo`, `author`, `contentHtml`) if needed
