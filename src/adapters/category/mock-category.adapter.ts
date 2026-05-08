import { mockPostBodies, mockPostRecords } from '@lib/mock/post-data';
import { filterPostsByCategory, mapMockCategory, mapMockPost } from './mappers/category.mapper';
import type { BlogPost, Category } from '@models';
import type { CategoryAdapter } from './interfaces/category-adapter.interface';

export class MockCategoryAdapter implements CategoryAdapter {
  async getCategories(): Promise<Category[]> {
    const names = Array.from(new Set(mockPostRecords.map((post) => post.category).filter(Boolean))) as string[];
    return names.map(mapMockCategory);
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    const categories = await this.getCategories();
    return categories.find((category) => category.slug === slug) ?? null;
  }

  async getPostsByCategory(slug: string, limit?: number): Promise<BlogPost[]> {
    const posts = mockPostRecords.map((item) => mapMockPost(item, mockPostBodies));
    return filterPostsByCategory(posts, slug, limit);
  }
}
