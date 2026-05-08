import { httpFetchJson } from '@lib/http/fetch';
import { buildCategoryMap, buildTagMap, mapRestPost } from './mappers/category.mapper';
import type { BlogPost, Category, Tag } from '@models';
import type { CategoryAdapter } from './interfaces/category-adapter.interface';

function getRestBase(): string {
  const endpoint = import.meta.env.WORDPRESS_REST_ENDPOINT;
  if (endpoint) return endpoint.replace(/\/$/, '');

  const site = import.meta.env.WORDPRESS_SITE_URL;
  if (!site) {
    throw new Error('Missing WORDPRESS_REST_ENDPOINT or WORDPRESS_SITE_URL env for rest category adapter');
  }
  return `${String(site).replace(/\/$/, '')}/wp-json/wp/v2`;
}

export class RestCategoryAdapter implements CategoryAdapter {
  private categoriesById = new Map<number, Category>();
  private categoriesBySlug = new Map<string, Category>();
  private tagsById = new Map<number, Tag>();

  private async warmTaxonomies(): Promise<void> {
    if (this.categoriesById.size > 0 && this.tagsById.size > 0) return;

    const base = getRestBase();
    const [categories, tags] = await Promise.all([
      httpFetchJson<any[]>(`${base}/categories?per_page=100`),
      httpFetchJson<any[]>(`${base}/tags?per_page=200`),
    ]);

    const categoryMap = buildCategoryMap(categories);
    this.categoriesById = categoryMap.byId;
    this.categoriesBySlug = categoryMap.bySlug;
    this.tagsById = buildTagMap(tags);
  }

  async getCategories(): Promise<Category[]> {
    await this.warmTaxonomies();
    return Array.from(this.categoriesById.values());
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    await this.warmTaxonomies();
    return this.categoriesBySlug.get(slug) ?? null;
  }

  async getPostsByCategory(slug: string, limit?: number): Promise<BlogPost[]> {
    await this.warmTaxonomies();

    const category = this.categoriesBySlug.get(slug);
    if (!category?.id) return [];

    const base = getRestBase();
    const params = new URLSearchParams();
    params.set('categories', category.id);
    params.set('per_page', String(limit ?? 20));
    params.set('_embed', 'true');

    const posts = await httpFetchJson<any[]>(`${base}/posts?${params.toString()}`);
    return posts.map((node) => mapRestPost(node, this.categoriesById, this.tagsById));
  }
}
