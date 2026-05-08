import type { Author } from './author';
import type { Category } from './category';
import type { Tag } from './tag';

export interface BlogPost {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  readingTime: string;
  image?: string;
  tags: Tag[];
  category?: Category;
  author?: Author;
  seo?: {
    title?: string;
    description?: string;
    canonical?: string;
    ogImage?: string;
  };
}

export interface PostQuery {
  search?: string;
  categorySlug?: string;
  tagSlug?: string;
  limit?: number;
  after?: string | null;
}

export interface PostListResult {
  items: BlogPost[];
  pageInfo?: {
    hasNextPage: boolean;
    endCursor?: string | null;
  };
}
