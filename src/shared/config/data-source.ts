export type DataSource = 'graphql' | 'rest' | 'mock';

export function getDataSource(): DataSource {
  const raw = String(import.meta.env.DATA_SOURCE ?? import.meta.env.CONTENT_PROVIDER ?? 'mock').toLowerCase();

  if (raw === 'wpgraphql' || raw === 'graphql') return 'graphql';
  if (raw === 'wprest' || raw === 'rest' || raw === 'api') return 'rest';
  return 'mock';
}

export function getCacheTtlMs(): number {
  const sec = Number(import.meta.env.CONTENT_CACHE_TTL_SEC ?? 60);
  return Math.max(1, sec) * 1000;
}
