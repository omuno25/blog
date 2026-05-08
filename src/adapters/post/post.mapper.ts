import { estimateReadingTime, stripHtml } from '../../shared/utils/text';
import type { BlogPost, Category, Tag } from '@models';

export function mapGraphqlPost(node: any): BlogPost {
  const tags: Tag[] = (node.tags?.nodes ?? []).map((tag: any) => ({
    id: tag.id,
    name: tag.name,
    slug: tag.slug,
  }));

  const categoryNode = node.categories?.nodes?.[0];
  const category: Category | undefined = categoryNode
    ? {
        id: categoryNode.id,
        name: categoryNode.name,
        slug: categoryNode.slug,
        description: categoryNode.description ?? undefined,
      }
    : undefined;

  const content = node.content ?? '';

  return {
    id: node.id,
    slug: node.slug,
    title: node.title ?? '',
    excerpt: stripHtml(node.excerpt ?? ''),
    content,
    date: node.date ?? '',
    readingTime: estimateReadingTime(content || node.excerpt || ''),
    image: node.featuredImage?.node?.sourceUrl ?? undefined,
    tags,
    category,
    author: node.author?.node?.name ? { name: node.author.node.name } : undefined,
    seo: {
      title: node.seo?.title ?? undefined,
      description: node.seo?.metaDesc ?? undefined,
      canonical: node.seo?.canonical ?? undefined,
      ogImage: node.seo?.opengraphImage?.sourceUrl ?? undefined,
    },
  };
}

export function mapRestPost(node: any, categoriesById: Map<number, Category>, tagsById: Map<number, Tag>): BlogPost {
  const category = (node.categories ?? []).map((id: number) => categoriesById.get(id)).find(Boolean);
  const tags = (node.tags ?? [])
    .map((id: number) => tagsById.get(id))
    .filter((item: Tag | undefined): item is Tag => Boolean(item));

  return {
    id: String(node.id),
    slug: node.slug,
    title: stripHtml(node.title?.rendered ?? ''),
    excerpt: stripHtml(node.excerpt?.rendered ?? ''),
    content: node.content?.rendered ?? '',
    date: node.date,
    readingTime: estimateReadingTime(node.content?.rendered ?? node.excerpt?.rendered ?? ''),
    image: node._embedded?.['wp:featuredmedia']?.[0]?.source_url,
    tags,
    category,
    author: node._embedded?.author?.[0]?.name ? { name: node._embedded.author[0].name } : undefined,
  };
}

export function mapMockPost(raw: any, bodyBySlug: Record<string, string>): BlogPost {
  const tags: Tag[] = (raw.tags ?? []).map((tag: string) => ({ name: tag, slug: tag }));
  const category: Category | undefined = raw.category
    ? { name: raw.category, slug: String(raw.category).replaceAll(' ', '-') }
    : undefined;

  return {
    slug: raw.slug,
    title: raw.title,
    excerpt: raw.excerpt,
    content: bodyBySlug[raw.slug] ?? raw.excerpt,
    date: raw.date,
    readingTime: raw.readingTime,
    image: raw.image,
    tags,
    category,
    author: { name: 'Alex Rivera' },
  };
}
