import { gql } from "apollo-boost";

export const searchProducts = gql`
  query searchProducts($name: String!, $skip: Int, $take: Int) {
    searchProducts(
      data: { name: $name }
      pagination: { take: $take, skip: $skip }
    ) {
      count
      items {
        id
        name
        createdAt
        createdBy {
          id
          displayName
        }
        updatedAt
        updatedBy {
          id
          displayName
        }
        reports {
          count
        }
      }
    }
  }
`;