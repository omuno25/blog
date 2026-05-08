import type { APIRoute } from 'astro';
import { runGraphql } from '../../server/graphql/gateway';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const query = body?.query;
    const variables = body?.variables;

    if (!query || typeof query !== 'string') {
      return new Response(JSON.stringify({ error: 'Missing GraphQL query' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await runGraphql(query, variables);

    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown proxy error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
