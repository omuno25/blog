export function getGraphqlEndpoint(): string {
  const endpoint = import.meta.env.WORDPRESS_GRAPHQL_ENDPOINT;
  if (!endpoint) {
    throw new Error('Missing WORDPRESS_GRAPHQL_ENDPOINT env for graphql adapter');
  }
  return endpoint;
}
