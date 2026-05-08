import { mapGraphqlPost, mapMockPost, mapRestPost } from '@adapters/post/post.mapper';
import type { BlogPost, Category, Tag } from '@models';

export function mapGraphqlCategory(node: any): Category {
  return {
    id: node.id,
    parentId: node.parentId ?? null,
    name: node.name,
    slug: node.slug,
    description: node.description ?? undefined,
    icon: node.icon?.icon ?? undefined,
  };
}

export function mapRestCategory(node: any): Category {
  return {
    id: String(node.id),
    parentId: node.parent ? String(node.parent) : null,
    name: node.name,
    slug: node.slug,
    description: node.description ?? undefined,
    icon: undefined,
  };
}

export function mapMockCategory(name: string): Category {
  return {
    id: String(name).toLowerCase().replaceAll(' ', '-'),
    parentId: null,
    name,
    slug: String(name).replaceAll(' ', '-'),
    icon: 'folder',
  };
}

export { mapGraphqlPost, mapRestPost, mapMockPost };

export function filterPostsByCategory(posts: BlogPost[], slug: string, limit?: number): BlogPost[] {
  const result = posts.filter((post) => post.category?.slug === slug);
  return typeof limit === 'number' ? result.slice(0, limit) : result;
}

export function buildTagMap(nodes: any[]): Map<number, Tag> {
  const map = new Map<number, Tag>();
  for (const node of nodes) {
    map.set(node.id, { id: String(node.id), name: node.name, slug: node.slug });
  }
  return map;
}

export function buildCategoryMap(nodes: any[]): { byId: Map<number, Category>; bySlug: Map<string, Category> } {
  const byId = new Map<number, Category>();
  const bySlug = new Map<string, Category>();

  for (const node of nodes) {
    const category = mapRestCategory(node);
    byId.set(node.id, category);
    bySlug.set(category.slug, category);
  }

  return { byId, bySlug };
}
