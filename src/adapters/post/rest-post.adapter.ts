import { httpFetchJson } from '@lib/http/fetch';
import { mapRestPost } from './post.mapper';
import type { PostAdapter } from './post.adapter';
import type { BlogPost, Category, PostListResult, PostQuery, Tag } from '@models';

function getRestBase(): string {
  const endpoint = import.meta.env.WORDPRESS_REST_ENDPOINT;
  if (endpoint) return endpoint.replace(/\/$/, '');

  const site = import.meta.env.WORDPRESS_SITE_URL;
  if (!site) {
    throw new Error('Missing WORDPRESS_REST_ENDPOINT or WORDPRESS_SITE_URL env for rest adapter');
  }
  return `${String(site).replace(/\/$/, '')}/wp-json/wp/v2`;
}

export class RestPostAdapter implements PostAdapter {
  private categoriesById = new Map<number, Category>();
  private categoriesBySlug = new Map<string, Category>();
  private tagsById = new Map<number, Tag>();
  private tagsBySlug = new Map<string, Tag>();

  private async warmTaxonomies(): Promise<void> {
    if (this.categoriesById.size > 0 && this.tagsById.size > 0) return;

    const base = getRestBase();
    const [categories, tags] = await Promise.all([
      httpFetchJson<Array<any>>(`${base}/categories?per_page=100`),
      httpFetchJson<Array<any>>(`${base}/tags?per_page=200`),
    ]);

    for (const item of categories) {
      const category: Category = {
        id: String(item.id),
        name: item.name,
        slug: item.slug,
        description: item.description ?? undefined,
      };
      this.categoriesById.set(item.id, category);
      this.categoriesBySlug.set(item.slug, category);
    }

    for (const item of tags) {
      const tag: Tag = { id: String(item.id), name: item.name, slug: item.slug };
      this.tagsById.set(item.id, tag);
      this.tagsBySlug.set(item.slug, tag);
    }
  }

  async getPosts(query: PostQuery = {}): Promise<PostListResult> {
    await this.warmTaxonomies();

    const base = getRestBase();
    const params = new URLSearchParams();
    params.set('per_page', String(query.limit ?? 20));
    params.set('_embed', 'true');

    if (query.search) params.set('search', query.search);

    if (query.categorySlug) {
      const category = this.categoriesBySlug.get(query.categorySlug);
      if (!category?.id) return { items: [], pageInfo: { hasNextPage: false, endCursor: null } };
      params.set('categories', category.id);
    }

    if (query.tagSlug) {
      const tag = this.tagsBySlug.get(query.tagSlug);
      if (!tag?.id) return { items: [], pageInfo: { hasNextPage: false, endCursor: null } };
      params.set('tags', tag.id);
    }

    const posts = await httpFetchJson<any[]>(`${base}/posts?${params.toString()}`);
    return {
      items: posts.map((node) => mapRestPost(node, this.categoriesById, this.tagsById)),
      pageInfo: { hasNextPage: false, endCursor: null },
    };
  }

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    await this.warmTaxonomies();
    const base = getRestBase();
    const posts = await httpFetchJson<any[]>(`${base}/posts?slug=${encodeURIComponent(slug)}&_embed=true`);
    const item = posts[0];
    return item ? mapRestPost(item, this.categoriesById, this.tagsById) : null;
  }

  async getCategories(): Promise<Category[]> {
    await this.warmTaxonomies();
    return Array.from(this.categoriesById.values());
  }

  async getTags(): Promise<Tag[]> {
    await this.warmTaxonomies();
    return Array.from(this.tagsById.values());
  }
}
