import { graphqlFetch } from '@lib/graphql/fetcher';
import { CATEGORIES_QUERY } from '@lib/graphql/queries/category';
import { POST_LIST_QUERY } from '@lib/graphql/queries/posts';
import { mapGraphqlCategory, mapGraphqlPost, filterPostsByCategory } from './mappers/category.mapper';
import type { BlogPost, Category } from '@models';
import type { CategoryAdapter } from './interfaces/category-adapter.interface';

export class GraphqlCategoryAdapter implements CategoryAdapter {
  async getCategories(): Promise<Category[]> {
    const data = await graphqlFetch<any>(CATEGORIES_QUERY);
    return (data.categories?.nodes ?? [])
      .map(mapGraphqlCategory)
      .filter((category) => category.slug.toLowerCase() !== 'uncategorized');
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    const categories = await this.getCategories();
    return categories.find((category) => category.slug === slug) ?? null;
  }

  async getPostsByCategory(slug: string, limit?: number): Promise<BlogPost[]> {
    const data = await graphqlFetch<any>(POST_LIST_QUERY, {
      first: Math.max(50, limit ?? 50),
      after: null,
      search: null,
    });

    const posts: BlogPost[] = (data.posts?.nodes ?? []).map(mapGraphqlPost);
    return filterPostsByCategory(posts, slug, limit);
  }
}
