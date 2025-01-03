/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query Me {\n    me {\n      id\n    }\n  }\n": types.MeDocument,
    "\n  fragment ElementFields on Element {\n    id\n    name\n    improbibIdentifier\n    markdown\n    tags {\n      id\n      name\n    }\n  }\n": types.ElementFieldsFragmentDoc,
    "\n  query Elements($skip: Int!, $take: Int!) {\n    searchElements(skip: $skip, take: $take) {\n      element {\n        ...ElementFields\n        snapshots {\n          id\n          user {\n            id\n          }\n          element {\n            ...ElementFields\n          }\n        }\n      }\n    }\n  }\n": types.ElementsDocument,
    "\n  mutation CreateElementMutation($input: CreateElementInput!) {\n    createElement(input: $input) {\n      id\n    }\n  }\n": types.CreateElementMutationDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Me {\n    me {\n      id\n    }\n  }\n"): (typeof documents)["\n  query Me {\n    me {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ElementFields on Element {\n    id\n    name\n    improbibIdentifier\n    markdown\n    tags {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  fragment ElementFields on Element {\n    id\n    name\n    improbibIdentifier\n    markdown\n    tags {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Elements($skip: Int!, $take: Int!) {\n    searchElements(skip: $skip, take: $take) {\n      element {\n        ...ElementFields\n        snapshots {\n          id\n          user {\n            id\n          }\n          element {\n            ...ElementFields\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Elements($skip: Int!, $take: Int!) {\n    searchElements(skip: $skip, take: $take) {\n      element {\n        ...ElementFields\n        snapshots {\n          id\n          user {\n            id\n          }\n          element {\n            ...ElementFields\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateElementMutation($input: CreateElementInput!) {\n    createElement(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateElementMutation($input: CreateElementInput!) {\n    createElement(input: $input) {\n      id\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;