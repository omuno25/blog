# FE Analysis Document (Astro Blog)

## 1. Mục tiêu FE

Xây dựng giao diện blog:

- Nhanh, sạch, dễ đọc (content-first UI)
- SEO-friendly cho toàn bộ trang list/detail
- Responsive tốt trên mobile trước
- Dễ mở rộng thêm search, related posts, newsletter, affiliate block

---

## 2. Phạm vi UI nên làm trước (MVP)

1. Trang chủ `/`
2. Trang bài viết `/blog/[slug]`
3. Trang category `/category/[slug]`
4. Trang tag `/tag/[slug]`
5. Header + Footer + SEO component dùng chung

Sau MVP mới làm:

1. Search `/search`
2. TOC nâng cao
3. Related posts thông minh
4. Draft preview cho admin

---

## 3. Cấu trúc thông tin (Information Architecture)

Luồng chính của user:

1. Vào trang chủ
2. Chọn bài từ danh sách
3. Đọc chi tiết + click tag/category
4. Khám phá bài liên quan
5. Quay lại list và đọc tiếp

Điểm cần tối ưu UX:

- Card bài viết phải rõ tiêu đề + mô tả + thời gian đọc
- Bài chi tiết có breadcrumb + TOC + progress cảm nhận
- Điều hướng giữa category/tag mượt, không rối

---

## 4. Định nghĩa từng trang

## 4.1 Trang chủ `/`

Sections:

1. Hero nhẹ (title blog + mô tả ngắn)
2. Danh sách bài mới nhất (ArticleCard grid/list)
3. Khối category/tag nổi bật
4. Pagination hoặc load more

Mục tiêu:

- Đưa user vào bài trong 1-2 click
- Tối ưu LCP: title + card đầu hiển thị nhanh

## 4.2 Trang bài viết `/blog/[slug]`

Sections:

1. Header bài: title, publish date, reading time, author
2. Breadcrumb
3. TOC (desktop sticky, mobile toggle)
4. Nội dung bài
5. Tags + Category link
6. Related posts

Mục tiêu:

- Tập trung khả năng đọc
- Dễ scan với heading spacing, code block, ảnh chuẩn

## 4.3 Trang category và tag

Sections:

1. Tiêu đề taxonomy + mô tả ngắn
2. Danh sách bài theo taxonomy
3. Pagination

Mục tiêu:

- Crawl tốt theo topic cluster
- Internal linking tự nhiên

---

## 5. Component Architecture

Core components:

1. `Header.astro`
2. `Footer.astro`
3. `ArticleCard.astro`
4. `ArticleContent.astro`
5. `SEO.astro`
6. `Breadcrumb.astro`
7. `TOC.astro`
8. `ReadingTime.astro`

Component contract tối thiểu:

- `ArticleCard`: `title`, `slug`, `excerpt`, `featuredImage`, `publishedAt`, `readingTime`, `tags`
- `SEO`: `title`, `description`, `canonical`, `ogImage`, `type`
- `TOC`: danh sách heading đã parse từ HTML content

---

## 6. Data Contract (từ WordPress/WPGraphQL)

Post list cần:

- `slug`
- `title`
- `excerpt`
- `date`
- `featuredImage.node.sourceUrl`
- `categories.nodes { name, slug }`
- `tags.nodes { name, slug }`

Post detail cần thêm:

- `content`
- `author.node.name`
- `seo` (title, metaDesc, opengraphImage, canonical)

Lưu ý FE:

- Chuẩn hóa dữ liệu ngay trong `lib/wordpress.ts`
- Tạo kiểu TypeScript để tránh lỗi runtime

---

## 7. Định hướng UI/Visual

Phong cách đề xuất:

- Tối giản, editorial, thiên về readability
- Typography rõ cấp bậc (H1/H2/H3), line-height thoáng
- Màu trung tính + 1 accent color cho link/button/tag

Design tokens nên có sớm:

- `--color-bg`, `--color-text`, `--color-muted`, `--color-accent`
- `--space-1` ... `--space-8`
- `--radius-sm`, `--radius-md`
- `--container-max`

---

## 8. SEO Requirements cho FE

Mỗi trang cần:

1. `title` duy nhất
2. `meta description`
3. `canonical`
4. Open Graph + Twitter Card
5. JSON-LD (`BlogPosting` cho trang bài)

Technical pages:

1. `sitemap.xml`
2. `rss.xml`
3. `robots.txt`

---

## 9. Performance Requirements cho FE

1. Ảnh dùng WebP, có `width/height`, `loading="lazy"` cho non-critical
2. Font strategy: self-host + preload font cần thiết
3. Giảm JS client, ưu tiên Astro islands tối thiểu
4. Cache đa lớp theo thiết kế hiện có (memory/redis/cdn/browser)
5. Áp dụng request coalescing cho query giống nhau

KPIs đề xuất:

- LCP < 2.5s
- CLS < 0.1
- INP < 200ms

---

## 10. Lộ trình triển khai FE (thực chiến)

## Sprint 1: Foundation UI

1. Setup layout gốc + header/footer
2. Build `ArticleCard`
3. Build trang chủ + fetch post list
4. Build trang detail bài viết

## Sprint 2: SEO + Navigation

1. `SEO.astro`
2. Category page + Tag page
3. Breadcrumb + TOC
4. Sitemap/RSS/Robots

## Sprint 3: Performance + Polish

1. Tối ưu ảnh và font
2. Coalescing + cache hooks
3. Related posts
4. Responsive polish + accessibility pass

---

## 11. Rủi ro chính và cách xử lý

1. Dữ liệu WP không đồng nhất  
Giải pháp: normalize data + fallback UI khi thiếu ảnh/description

2. SEO field từ plugin không ổn định  
Giải pháp: fallback sang title/excerpt mặc định

3. Over-fetch GraphQL làm chậm TTFB  
Giải pháp: tách query theo page type + cache key rõ ràng

---

## 12. Kết luận

Với kiến trúc bạn đang có, hướng FE phù hợp nhất là:

1. Content-first UI
2. Component rõ contract dữ liệu
3. SEO đầy đủ ngay từ sprint đầu
4. Performance tuning song song, không để dồn về cuối

Nếu bạn muốn, bước tiếp theo mình có thể viết luôn:

1. `wireframe dạng text` cho từng trang
2. `checklist implementation` theo từng file Astro cụ thể
3. `GraphQL query mẫu` cho home/detail/category/tag
