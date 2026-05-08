import type { BlogPost, Category } from "@models";

export interface CategoryAdapter {
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | null>;
  getPostsByCategory(slug: string, limit?: number): Promise<BlogPost[]>;
}
