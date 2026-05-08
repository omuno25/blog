export const TAGS_QUERY = /* GraphQL */ `
  query Tags {
    tags(first: 200) {
      nodes {
        id
        name
        slug
      }
    }
  }
`;
