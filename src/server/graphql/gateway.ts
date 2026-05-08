import { getGraphqlEndpoint } from '../../lib/graphql/client';

export async function runGraphql<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const endpoint = getGraphqlEndpoint();

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.status}`);
  }

  const json = await response.json();
  if (json.errors?.length) {
    throw new Error(json.errors[0]?.message ?? 'GraphQL error');
  }

  return json.data as T;
}
