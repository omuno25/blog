import { getCacheTtlMs, getDataSource } from '@shared/config/data-source';
import { RequestCache } from '@cache/request-cache';
import { GraphqlPostAdapter } from './graphql-post.adapter';
import { RestPostAdapter } from './rest-post.adapter';
import { MockPostAdapter } from './mock-post.adapter';
import type { PostAdapter } from './post.adapter';
import type { BlogPost, Category, PostListResult, PostQuery, Tag } from '@models';

class CachedPostAdapter implements PostAdapter {
  constructor(private readonly inner: PostAdapter, private readonly cache = new RequestCache(getCacheTtlMs())) {}

  private key(method: string, payload?: unknown): string {
    return `${method}:${JSON.stringify(payload ?? {})}`;
  }

  getPosts(query?: PostQuery): Promise<PostListResult> {
    return this.cache.remember(this.key('getPosts', query), () => this.inner.getPosts(query));
  }

  getPostBySlug(slug: string): Promise<BlogPost | null> {
    return this.cache.remember(this.key('getPostBySlug', { slug }), () => this.inner.getPostBySlug(slug));
  }

  getCategories(): Promise<Category[]> {
    return this.cache.remember(this.key('getCategories'), () => this.inner.getCategories());
  }

  getTags(): Promise<Tag[]> {
    return this.cache.remember(this.key('getTags'), () => this.inner.getTags());
  }
}

function createBaseAdapter(): PostAdapter {
  const source = getDataSource();
  if (source === 'graphql') return new GraphqlPostAdapter();
  if (source === 'rest') return new RestPostAdapter();
  return new MockPostAdapter();
}

export const postAdapter: PostAdapter = new CachedPostAdapter(createBaseAdapter());
export type { PostAdapter } from './post.adapter';
