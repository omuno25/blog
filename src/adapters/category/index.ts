import { RequestCache } from '@cache/request-cache';
import { getCacheTtlMs, getDataSource } from '@shared/config/data-source';
import { GraphqlCategoryAdapter } from './graphql-category.adapter';
import { MockCategoryAdapter } from './mock-category.adapter';
import type { CategoryAdapter } from './interfaces/category-adapter.interface';
import type { BlogPost, Category } from '@models';

class CachedCategoryAdapter implements CategoryAdapter {
  constructor(private readonly inner: CategoryAdapter, private readonly cache = new RequestCache(getCacheTtlMs())) {}

  private key(method: string, payload?: unknown): string {
    return `${method}:${JSON.stringify(payload ?? {})}`;
  }

  getCategories(): Promise<Category[]> {
    return this.cache.remember(this.key('getCategories'), () => this.inner.getCategories());
  }

  getCategoryBySlug(slug: string): Promise<Category | null> {
    return this.cache.remember(this.key('getCategoryBySlug', { slug }), () => this.inner.getCategoryBySlug(slug));
  }

  getPostsByCategory(slug: string, limit?: number): Promise<BlogPost[]> {
    return this.cache.remember(this.key('getPostsByCategory', { slug, limit }), () => this.inner.getPostsByCategory(slug, limit));
  }
}

function createBaseAdapter(): CategoryAdapter {
  const source = getDataSource();
  if (source === 'graphql') return new GraphqlCategoryAdapter();
  // Temporarily disable REST category adapter in runtime selection.
  // When needed again, re-enable the `rest` branch here.
  return new MockCategoryAdapter();
}

export const categoryAdapter: CategoryAdapter = new CachedCategoryAdapter(createBaseAdapter());
export type { CategoryAdapter } from './interfaces/category-adapter.interface';
