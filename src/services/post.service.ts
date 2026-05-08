import { postAdapter } from '@adapters/post';
import type { BlogPost, Category, PostListResult, PostQuery, Tag } from '@models';

export interface PostService {
  getPosts(query?: PostQuery): Promise<PostListResult>;
  getPostBySlug(slug: string): Promise<BlogPost | null>;
  getCategories(): Promise<Category[]>;
  getTags(): Promise<Tag[]>;
}

// Service boundary keeps pages/UI isolated from adapter implementation details.
export const postService: PostService = {
  getPosts: (query?: PostQuery) => postAdapter.getPosts(query),
  getPostBySlug: (slug: string) => postAdapter.getPostBySlug(slug),
  getCategories: () => postAdapter.getCategories(),
  getTags: () => postAdapter.getTags(),
};
