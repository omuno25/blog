## 1. Mục tiêu

Xây dựng blog cá nhân đơn giản, hiện đại, tối ưu SEO và performance, kết hợp AI để hỗ trợ tạo nội dung.

Mục tiêu chính:

- SEO tốt
- Tốc độ tải nhanh
- Dễ viết bài
- Dễ scale
- Dễ maintain
- Tận dụng AI để hỗ trợ content workflow

---

# 2. Kiến trúc tổng thể

```
WordPress CMS  
↓  
WPGraphQL / REST API  
↓  
Astro Frontend  
↓  
Cache Layer  
↓  
CDN  
↓  
SEO + Analytics
```

---

# 3. Tech Stack

|Layer|Công nghệ|
|---|---|
|CMS|WordPress|
|API|WPGraphQL / REST API|
|Frontend|Astro|
|Styling|Tailwind / UnoCSS (optional)|
|Cache|Redis + Astro Cache|
|CDN|Cloudflare|
|Deploy Frontend|Cloudflare Pages / Vercel|
|Deploy CMS|VPS / Shared Hosting|
|Database|MySQL / MariaDB|
|Analytics|Google Analytics / Plausible|
|SEO|Yoast SEO / Rank Math|

---

# 4. MVP Scope

## CMS

- WordPress
- WPGraphQL
- SEO plugin
- Redis cache

## Frontend

- Astro
- SSR / Hybrid Rendering
- Blog pages
- Category / Tag
- SEO metadata

## Content

- WordPress posts
- Optional Markdown content

---

# 5. Astro Project Structure

```
blog-frontend/
├── src/
│
├── pages/
│   ├── index.astro
│   ├── blog/[slug].astro
│   ├── category/[slug].astro
│   ├── tag/[slug].astro
│   ├── search.astro
│   ├── rss.xml.ts
│   ├── sitemap.xml.ts
│   └── robots.txt.ts
│
├── components/
│   ├── ArticleCard.astro
│   ├── ArticleContent.astro
│   ├── Header.astro
│   ├── Footer.astro
│   ├── SEO.astro
│   ├── TOC.astro
│   ├── Breadcrumb.astro
│   └── ReadingTime.astro
│
├── layouts/
│   └── BlogLayout.astro
│
├── lib/
│   ├── wordpress.ts
│   ├── cache.ts
│   ├── seo.ts
│   ├── graphql.ts
│   └── coalescing.ts
│
├── content/
│   ├── docs/
│   └── markdown/
│
├── styles/
│
├── public/
│
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

---

# 6. WordPress Plugins

## Required

```
- WPGraphQL  
- Yoast SEO hoặc Rank Math  
- WPGraphQL Yoast SEO  
- Redis Object Cache  
- WebP / Image Optimization Plugin
```

## Optional

```
- Advanced Custom Fields  
- WPGraphQL for ACF  
- JWT/Auth Plugin  
- Table of Contents Plugin
```

---

# 7. Routing Structure

|Route|Mô tả|
|---|---|
|`/`|Trang chủ|
|`/blog/[slug]`|Chi tiết bài viết|
|`/category/[slug]`|Trang category|
|`/tag/[slug]`|Trang tag|
|`/search`|Search|
|`/rss.xml`|RSS feed|
|`/sitemap.xml`|Sitemap|
|`/robots.txt`|SEO crawler config|

---

# 8. Core Features

## Blog Features

```
- Danh sách bài viết  
- Chi tiết bài viết  
- Category / Tag  
- Related posts  
- Search  
- Table of contents  
- Reading time  
- Author box  
- Breadcrumb
```

## SEO Features

```
- SEO metadata  
- Open Graph image  
- Twitter Card  
- Sitemap  
- RSS feed  
- Structured data (JSON-LD)  
- Canonical URL
```

## Performance Features

```
- Lazy loading images  
- Request coalescing  
- API response cache  
- CDN cache  
- Revalidation webhook  
- HTML compression  
- WebP images
```

## Admin Features

```
- WordPress content editor  
- Draft preview  
- Auto cache clear  
- Auto revalidate  
- Auto deploy webhook
```

---

# 9. Cache Strategy

## Multi-layer Cache

```
Level 1 → Memory Cache  
Level 2 → Redis Cache  
Level 3 → CDN Cache  
Level 4 → Browser Cache
```

---

## Cache Keys

```
post:{slug}  
  
category:{slug}:page:{page}  
  
home:page:{page}  
  
search:{keyword}:page:{page}
```

---

## Revalidation Flow

```
WordPress Publish  
↓  
Webhook Trigger  
↓  
Astro /api/revalidate  
↓  
Clear Related Cache  
↓  
CDN Purge
```

---

# 10. Request Coalescing

## Mục tiêu

Tránh:

```
1000 requests  
→ 1000 API calls  
→ WordPress overload
```

## Solution

```
const pendingRequests = new Map<string, Promise<any>>();

export async function withCoalescing<T>(
  key: string,
  fetcher: () => Promise<T>
): Promise<T> {
  if (pendingRequests.has(key)) {
    return pendingRequests.get(key) as Promise<T>;
  }

  const promise = fetcher().finally(() => {
    pendingRequests.delete(key);
  });

  pendingRequests.set(key, promise);

  return promise;
}
```

---

# 11. WordPress GraphQL Client

```
const WORDPRESS_API_URL =
  import.meta.env.WORDPRESS_API_URL;

export async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, any>
): Promise<T> {
  const response = await fetch(
    WORDPRESS_API_URL,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch WordPress data");
  }

  const json = await response.json();

  if (json.errors) {
    throw new Error(
      json.errors[0]?.message ?? "GraphQL error"
    );
  }

  return json.data;
}
```

---

# 12. Deploy Architecture

## Recommended Setup

```
Frontend:
- Cloudflare Pages
- hoặc Vercel

CMS:
- VPS riêng
- hoặc WordPress Hosting

Database:
- MySQL / MariaDB

Cache:
- Redis

CDN:
- Cloudflare
```

---

## Production Flow

```
GitHub Push
        ↓
Build Astro
        ↓
Deploy Frontend
        ↓
Cloudflare CDN Cache
        ↓
Users
```

WordPress chỉ đóng vai trò CMS backend.

---

# 13. AI Integration Ideas

## AI Content Workflow

```
Keyword Research  
↓  
AI Generate Draft  
↓  
Human Review  
↓  
Publish to WordPress
```

---

## AI Features

```
- Generate article draft  
- Generate SEO title  
- Generate meta description  
- Generate tags/category  
- Auto summarize article  
- Generate OpenGraph content  
- Related article recommendation
```

---

# 14. Development Phases

## Phase 1 — Foundation

```
- Setup WordPress  
- Setup WPGraphQL  
- Setup Astro  
- Homepage  
- Post detail page
```

---

## Phase 2 — SEO & Navigation

```
- Category  
- Tag  
- Search  
- SEO component  
- Sitemap  
- RSS
```

---

## Phase 3 — Performance

```
- Redis cache  
- Request coalescing  
- CDN cache  
- Revalidation webhook
```

---

## Phase 4 — UX/UI

```
- Related posts  
- TOC  
- Reading time  
- Responsive UI  
- Image optimization
```

---

## Phase 5 — Growth

```
- Analytics  
- Newsletter  
- Affiliate block  
- AI content workflow  
- Admin preview
```

---

# 15. Recommended Naming

## Project Names

```
seedai-blog  
devseed-blog  
astro-headless-blog  
headless-content-platform  
seed-content-engine
```

## Domain Ideas

```
seedai.dev  
seedlog.dev  
buildwithseed.dev  
devseed.io
```

---

# 16. Final Recommendation

## Recommended Architecture

```
WordPress Headless  
+  
Astro SSR / Hybrid  
+  
WPGraphQL  
+  
Redis  
+  
Cloudflare CDN
```

---

# 17. Expected Benefits

```
✅ SEO mạnh  
✅ Performance tốt  
✅ Core Web Vitals đẹp  
✅ Dễ viết bài  
✅ Scale tốt  
✅ Frontend hiện đại  
✅ CMS quen thuộc  
✅ AI-friendly workflow
```