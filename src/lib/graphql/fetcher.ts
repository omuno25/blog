import { runGraphql } from '../../server/graphql/gateway';

export async function graphqlFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  return runGraphql<T>(query, variables);
}
