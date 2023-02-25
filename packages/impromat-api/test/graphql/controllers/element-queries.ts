import { graphql } from 'test/graphql-client/gql';

export const elementFieldsFragment = graphql(`
  fragment ElementFields on Element {
    id
    version
    createdAt
    updatedAt
    deleted

    name
    markdown

    tags {
      id
    }
    usedBy {
      id
    }
    owner {
      id
    }
  }
`);

export const userElementsQuery = graphql(`
  query UserElementsQuery {
    elements {
      ...ElementFields
    }
  }
`);

export const createElementMutation = graphql(`
  mutation AddElementQuery($input: CreateElementInput!) {
    createElement(input: $input) {
      ...ElementFields
    }
  }
`);

export const updateElementMutation = graphql(`
  mutation UpdateElement($input: UpdateWorkshopInput!) {
    updateWorkshop(input: $input) {
      ...WorkshopFields
    }
  }
`);