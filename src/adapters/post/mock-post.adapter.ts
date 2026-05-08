import { mockPostBodies, mockPostRecords } from '@lib/mock/post-data';
import { mapMockPost } from './post.mapper';
import type { PostAdapter } from './post.adapter';
import type { BlogPost, Category, PostListResult, PostQuery, Tag } from '@models';

export class MockPostAdapter implements PostAdapter {
  async getPosts(query: PostQuery = {}): Promise<PostListResult> {
    const search = query.search?.toLowerCase().trim();
    const category = query.categorySlug?.toLowerCase();
    const tag = query.tagSlug?.toLowerCase();

    let items: BlogPost[] = mockPostRecords.map((item) => mapMockPost(item, mockPostBodies));

    if (search) {
      items = items.filter((post) =>
        `${post.title} ${post.excerpt} ${post.tags.map((item) => item.slug).join(' ')}`
          .toLowerCase()
          .includes(search)
      );
    }

    if (category) {
      items = items.filter((post) => post.category?.slug.toLowerCase() === category);
    }

    if (tag) {
      items = items.filter((post) => post.tags.some((item) => item.slug.toLowerCase() === tag));
    }

    if (query.limit) items = items.slice(0, query.limit);

    return { items, pageInfo: { hasNextPage: false, endCursor: null } };
  }

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    const post = mockPostRecords.find((item) => item.slug === slug);
    return post ? mapMockPost(post, mockPostBodies) : null;
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(new Set(mockPostRecords.map((post) => post.category).filter(Boolean))).map((name) => ({
      name: String(name),
      slug: String(name).replaceAll(' ', '-'),
    }));
  }

  async getTags(): Promise<Tag[]> {
    return Array.from(new Set(mockPostRecords.flatMap((post) => post.tags))).map((name) => ({
      name,
      slug: name,
    }));
  }
}
