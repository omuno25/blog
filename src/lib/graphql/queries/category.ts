export const CATEGORIES_QUERY = /* GraphQL */ `
  query Categories {
    categories(first: 100, where: { orderby: TERM_ORDER, order: ASC }) {
      nodes {
        id
        parentId
        name
        slug
        description
        icon {
          fieldGroupName
          icon
        }
      }
    }
  }
`;
