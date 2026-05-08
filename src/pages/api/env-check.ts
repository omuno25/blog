import type { APIContext } from 'astro';

const KEYS = ['CONTENT_PROVIDER', 'DATA_SOURCE', 'CONTENT_CACHE_TTL_SEC', 'WORDPRESS_GRAPHQL_ENDPOINT'] as const;

function readFromImportMetaEnv(): Record<string, string | null> {
  const out: Record<string, string | null> = {};
  for (const key of KEYS) {
    const value = (import.meta.env as Record<string, unknown>)[key];
    out[key] = typeof value === 'string' ? value : value == null ? null : String(value);
  }
  return out;
}

function readFromRuntimeEnv(context: APIContext): Record<string, string | null> {
  const out: Record<string, string | null> = {};
  const runtimeEnv = (context.locals as any)?.runtime?.env as Record<string, unknown> | undefined;

  for (const key of KEYS) {
    const value = runtimeEnv?.[key];
    out[key] = typeof value === 'string' ? value : value == null ? null : String(value);
  }
  return out;
}

export const GET = async (context: APIContext) => {
  const payload = {
    now: new Date().toISOString(),
    importMetaEnv: readFromImportMetaEnv(),
    cloudflareRuntimeEnv: readFromRuntimeEnv(context),
    note: 'If importMetaEnv is null but cloudflareRuntimeEnv has value, variables were set only at runtime.',
  };

  return new Response(JSON.stringify(payload, null, 2), {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
};
