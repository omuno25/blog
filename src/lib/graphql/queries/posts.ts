export const POST_LIST_QUERY = /* GraphQL */ `
  query PostList($first: Int!, $after: String, $search: String) {
    posts(first: $first, after: $after, where: { search: $search, status: PUBLISH }) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        slug
        title
        excerpt
        date
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
        author {
          node {
            name
          }
        }
        categories {
          nodes {
            id
            name
            slug
            description
          }
        }
        tags {
          nodes {
            id
            name
            slug
          }
        }
        seo {
          title
          metaDesc
          canonical
          opengraphImage {
            sourceUrl
          }
        }
      }
    }
  }
`;

export const POST_BY_SLUG_QUERY = /* GraphQL */ `
  query PostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      slug
      title
      excerpt
      content
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
      author {
        node {
          name
        }
      }
      categories {
        nodes {
          id
          name
          slug
          description
        }
      }
      tags {
        nodes {
          id
          name
          slug
        }
      }
      seo {
        title
        metaDesc
        canonical
        opengraphImage {
          sourceUrl
        }
      }
    }
  }
`;
