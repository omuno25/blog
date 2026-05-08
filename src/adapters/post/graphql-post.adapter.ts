import { graphqlFetch } from '@lib/graphql/fetcher';
import { CATEGORIES_QUERY } from '@lib/graphql/queries/category';
import { POST_BY_SLUG_QUERY, POST_LIST_QUERY } from '@lib/graphql/queries/posts';
import { TAGS_QUERY } from '@lib/graphql/queries/tags';
import { mapGraphqlPost } from './post.mapper';
import type { PostAdapter } from './post.adapter';
import type { BlogPost, Category, PostListResult, PostQuery, Tag } from '@models';

export class GraphqlPostAdapter implements PostAdapter {
  async getPosts(query: PostQuery = {}): Promise<PostListResult> {
    const data = await graphqlFetch<any>(POST_LIST_QUERY, {
      first: query.limit ?? 20,
      after: query.after ?? null,
      search: query.search ?? null,
    });

    let items: BlogPost[] = (data.posts?.nodes ?? []).map(mapGraphqlPost);

    if (query.categorySlug) {
      const slug = query.categorySlug.toLowerCase();
      items = items.filter((item) => item.category?.slug.toLowerCase() === slug);
    }

    if (query.tagSlug) {
      const slug = query.tagSlug.toLowerCase();
      items = items.filter((item) => item.tags.some((tag) => tag.slug.toLowerCase() === slug));
    }

    if (query.limit) items = items.slice(0, query.limit);

    return {
      items,
      pageInfo: data.posts?.pageInfo
        ? {
            hasNextPage: Boolean(data.posts.pageInfo.hasNextPage),
            endCursor: data.posts.pageInfo.endCursor ?? null,
          }
        : undefined,
    };
  }

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    const data = await graphqlFetch<any>(POST_BY_SLUG_QUERY, { slug });
    return data.post ? mapGraphqlPost(data.post) : null;
  }

  async getCategories(): Promise<Category[]> {
    const data = await graphqlFetch<any>(CATEGORIES_QUERY);
    return (data.categories?.nodes ?? [])
      .map((node: any) => ({
        id: node.id,
        name: node.name,
        slug: node.slug,
        description: node.description ?? undefined,
      }))
      .filter((category: Category) => category.slug.toLowerCase() !== 'uncategorized');
  }

  async getTags(): Promise<Tag[]> {
    const data = await graphqlFetch<any>(TAGS_QUERY);
    return (data.tags?.nodes ?? []).map((node: any) => ({
      id: node.id,
      name: node.name,
      slug: node.slug,
    }));
  }
}
