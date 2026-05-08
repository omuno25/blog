export function getGraphqlEndpoint(): string {
  return String(import.meta.env.WORDPRESS_GRAPHQL_ENDPOINT ?? 'https://layoffbyai.site/index.php?graphql');
}
