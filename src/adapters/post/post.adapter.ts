import type { BlogPost, Category, PostListResult, PostQuery, Tag } from '@models';

export interface PostAdapter {
  getPosts(query?: PostQuery): Promise<PostListResult>;
  getPostBySlug(slug: string): Promise<BlogPost | null>;
  getCategories(): Promise<Category[]>;
  getTags(): Promise<Tag[]>;
}
