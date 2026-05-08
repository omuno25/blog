export type DataSource = 'graphql' | 'rest' | 'mock';

const FALLBACK_PROVIDER = 'wpgraphql';
const FALLBACK_CACHE_TTL_SEC = 5;

export function getDataSource(): DataSource {
  const raw = String(import.meta.env.DATA_SOURCE ?? import.meta.env.CONTENT_PROVIDER ?? FALLBACK_PROVIDER).toLowerCase();

  if (raw === 'wpgraphql' || raw === 'graphql') return 'graphql';
  if (raw === 'wprest' || raw === 'rest' || raw === 'api') return 'rest';
  return 'mock';
}

export function getCacheTtlMs(): number {
  const sec = Number(import.meta.env.CONTENT_CACHE_TTL_SEC ?? FALLBACK_CACHE_TTL_SEC);
  return Math.max(1, sec) * 1000;
}
