import type { ArticleCardData } from '@ui-types';

export const mockPostRecords: ArticleCardData[] = [
  {
    title: 'Designing Revalidation Pipelines for Headless CMS',
    excerpt:
      'A practical architecture for webhook-driven cache purges across memory, Redis, and CDN layers.',
    slug: 'revalidation-pipelines-headless-cms',
    date: 'May 6, 2026',
    readingTime: '8 min read',
    image:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
    tags: ['cache', 'astro', 'wordpress'],
    category: 'distributed systems',
  },
  {
    title: 'Prompt Contracts That Reduce LLM Hallucinations',
    excerpt:
      'How structured prompt inputs and deterministic output schemas improve production reliability.',
    slug: 'prompt-contracts-reduce-hallucinations',
    date: 'May 3, 2026',
    readingTime: '11 min read',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    tags: ['llm', 'prompting', 'quality'],
    category: 'ai engineering',
  },
  {
    title: 'Search UX Patterns for Technical Documentation',
    excerpt: 'Faceted results, relevance hints, and zero-result recovery patterns for developer docs.',
    slug: 'search-ux-patterns-technical-docs',
    date: 'April 29, 2026',
    readingTime: '6 min read',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    tags: ['search', 'ux', 'docs'],
    category: 'frontend',
  },
  {
    title: 'Operating Redis Cache at Medium Scale',
    excerpt:
      'Key strategy, eviction policy, and observability metrics that prevent noisy production incidents.',
    slug: 'operating-redis-cache-medium-scale',
    date: 'April 25, 2026',
    readingTime: '10 min read',
    image:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    tags: ['redis', 'performance', 'ops'],
    category: 'backend',
  },
  {
    title: 'Astro Islands for Performance-First Interfaces',
    excerpt:
      'A component strategy to keep interactivity where needed while preserving fast static output.',
    slug: 'astro-islands-performance-first-interfaces',
    date: 'April 21, 2026',
    readingTime: '7 min read',
    image:
      'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&w=1200&q=80',
    tags: ['astro', 'islands', 'frontend'],
    category: 'frontend',
  },
  {
    title: 'Webhook-Driven Rebuilds Without Over-Deploying',
    excerpt:
      'How to trigger targeted invalidation and safe rebuilds from CMS events in production.',
    slug: 'webhook-driven-rebuilds-without-overdeploying',
    date: 'April 18, 2026',
    readingTime: '9 min read',
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    tags: ['webhook', 'deploy', 'cache'],
    category: 'distributed systems',
  },
];

export const mockPostBodies: Record<string, string> = {
  'revalidation-pipelines-headless-cms':
    'Headless CMS revalidation works best when cache invalidation is event-driven. Start with webhook verification, map event types to cache keys, and apply bounded purge scopes. This keeps freshness high without purging the whole edge.',
  'prompt-contracts-reduce-hallucinations':
    "Prompt contracts define required inputs, output schema, and refusal rules. Combined with evaluator prompts and sampling checks, they reduce hallucinations by narrowing the model's response space.",
  'search-ux-patterns-technical-docs':
    'Developer search should optimize for intent completion, not just relevance ranking. Use query highlighting, synonym expansion, and zero-result recovery to keep users moving.',
  'operating-redis-cache-medium-scale':
    'At medium scale, Redis incidents often come from unbounded key cardinality and poor TTL policy. Instrument hit rate, memory fragmentation, and p95 latency to catch issues early.',
  'astro-islands-performance-first-interfaces':
    'Astro Islands let you ship static HTML by default and hydrate only interactive fragments. This helps preserve low JS cost while keeping critical UX responsive.',
  'webhook-driven-rebuilds-without-overdeploying':
    'Selective rebuild pipelines avoid wasted compute and noisy deploy logs. Trigger route-level invalidation first, then full rebuild only when schema-level changes are detected.',
};
