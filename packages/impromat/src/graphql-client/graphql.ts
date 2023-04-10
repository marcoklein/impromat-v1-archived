/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type BasedOnElementConnectInput = {
  connect: IdInput;
};

export type CreateElementInput = {
  markdown?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  orderIndex?: InputMaybe<Scalars['Int']>;
  visibility?: ElementVisibility;
};

export type CreateWorkshopElementInput = {
  basedOn: BasedOnElementConnectInput;
  note?: InputMaybe<Scalars['String']>;
  orderIndex?: InputMaybe<Scalars['Float']>;
};

export type CreateWorkshopInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  sections?: InputMaybe<WorkshopSectionListCreateInput>;
};

export type CreateWorkshopSectionInput = {
  isCollapsed?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
  orderIndex?: InputMaybe<Scalars['Float']>;
};

export type DeleteWorkshopElementInput = {
  id: Scalars['ID'];
};

export type DeleteWorkshopSectionInput = {
  id: Scalars['ID'];
};

export type Element = {
  __typename?: 'Element';
  createdAt: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
  id: Scalars['ID'];
  /** Set if the element is called from a user context. */
  isFavorite?: Maybe<Scalars['Boolean']>;
  /** Convenience field to determine if the owner of the element is the logged in user. */
  isOwnerMe?: Maybe<Scalars['Boolean']>;
  languageCode?: Maybe<Scalars['String']>;
  licenseName?: Maybe<Scalars['String']>;
  licenseUrl?: Maybe<Scalars['String']>;
  markdown?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  owner?: Maybe<User>;
  sourceBaseUrl?: Maybe<Scalars['String']>;
  sourceName?: Maybe<Scalars['String']>;
  sourceUrl?: Maybe<Scalars['String']>;
  tags: Array<ElementTag>;
  updatedAt: Scalars['DateTime'];
  usedBy: Array<WorkshopElement>;
  version: Scalars['Int'];
  visibility: ElementVisibility;
};

export type ElementSearchInput = {
  limit?: Scalars['Int'];
  text?: InputMaybe<Scalars['String']>;
};

export type ElementSearchResult = {
  __typename?: 'ElementSearchResult';
  element: Element;
  score: Scalars['Float'];
};

export type ElementTag = {
  __typename?: 'ElementTag';
  createdAt: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  version: Scalars['Int'];
};

export enum ElementVisibility {
  /** Element is only visible to its owning user. */
  Private = 'PRIVATE',
  /** Element is publicly shared with the whole community. */
  Public = 'PUBLIC'
}

export type IdInput = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createElement: Element;
  createWorkshop: Workshop;
  deleteWorkshop?: Maybe<Workshop>;
  logout: Scalars['Boolean'];
  updateElement: Element;
  /** Change the favorite state for element of the logged in user. */
  updateUserFavoriteElement?: Maybe<Element>;
  updateWorkshop: Workshop;
  updateWorkshopItemOrder: Workshop;
};


export type MutationCreateElementArgs = {
  input: CreateElementInput;
};


export type MutationCreateWorkshopArgs = {
  input: CreateWorkshopInput;
};


export type MutationDeleteWorkshopArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateElementArgs = {
  input: UpdateElementInput;
};


export type MutationUpdateUserFavoriteElementArgs = {
  input: UpdateUserFavoriteElementInput;
};


export type MutationUpdateWorkshopArgs = {
  input: UpdateWorkshopInput;
};


export type MutationUpdateWorkshopItemOrderArgs = {
  input: UpdateWorkshopItemOrder;
};

export type Query = {
  __typename?: 'Query';
  element?: Maybe<Element>;
  elements?: Maybe<Array<Element>>;
  googleAuthUrl: Scalars['String'];
  /** Get information about the current user. */
  me: User;
  searchElements: Array<ElementSearchResult>;
  workshop: Workshop;
  workshopElement: WorkshopElement;
  workshops: Array<Workshop>;
};


export type QueryElementArgs = {
  id: Scalars['ID'];
};


export type QuerySearchElementsArgs = {
  input: ElementSearchInput;
};


export type QueryWorkshopArgs = {
  id: Scalars['ID'];
};


export type QueryWorkshopElementArgs = {
  id: Scalars['ID'];
};

export type UpdateElementInput = {
  id: Scalars['ID'];
  markdown?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  orderIndex?: InputMaybe<Scalars['Int']>;
  visibility?: InputMaybe<ElementVisibility>;
};

export type UpdateUserFavoriteElementInput = {
  elementId: Scalars['ID'];
  isFavorite: Scalars['Boolean'];
};

export type UpdateWorkshopElementInput = {
  basedOn?: InputMaybe<BasedOnElementConnectInput>;
  id: Scalars['ID'];
  note?: InputMaybe<Scalars['String']>;
  orderIndex?: InputMaybe<Scalars['Float']>;
};

export type UpdateWorkshopInput = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  sections?: InputMaybe<WorkshopSectionListInput>;
};

/** Moves a workshop item (section or element) within a workshop considering collapsed sections. */
export type UpdateWorkshopItemOrder = {
  /** From position. */
  fromPosition: Scalars['Int'];
  /** To position. */
  toPosition: Scalars['Int'];
  workshopId: Scalars['ID'];
};

export type UpdateWorkshopSectionInput = {
  elements?: InputMaybe<WorkshopElementListInput>;
  id: Scalars['ID'];
  isCollapsed?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  orderIndex?: InputMaybe<Scalars['Float']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
  /** Elements owned by this user. */
  elements: Array<Element>;
  favoriteElements: Array<UserFavoriteElement>;
  id: Scalars['ID'];
  /** Public display name of the user. */
  name?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  version: Scalars['Int'];
  workshops: Array<Workshop>;
};

export type UserFavoriteElement = {
  __typename?: 'UserFavoriteElement';
  createdAt: Scalars['DateTime'];
  element: Element;
  updatedAt: Scalars['DateTime'];
};

export type Workshop = {
  __typename?: 'Workshop';
  createdAt: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  owner: User;
  sections: Array<WorkshopSection>;
  updatedAt: Scalars['DateTime'];
  version: Scalars['Int'];
};

export type WorkshopElement = {
  __typename?: 'WorkshopElement';
  basedOn: Element;
  createdAt: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
  id: Scalars['ID'];
  note?: Maybe<Scalars['String']>;
  section: WorkshopSection;
  updatedAt: Scalars['DateTime'];
  version: Scalars['Int'];
};

export type WorkshopElementListInput = {
  create?: InputMaybe<Array<CreateWorkshopElementInput>>;
  delete?: InputMaybe<Array<DeleteWorkshopElementInput>>;
  update?: InputMaybe<Array<UpdateWorkshopElementInput>>;
};

export type WorkshopSection = {
  __typename?: 'WorkshopSection';
  color?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
  elements: Array<WorkshopElement>;
  id: Scalars['ID'];
  isCollapsed: Scalars['Boolean'];
  name?: Maybe<Scalars['String']>;
  orderIndex: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  version: Scalars['Int'];
  workshop: Workshop;
};

export type WorkshopSectionListCreateInput = {
  create?: InputMaybe<Array<CreateWorkshopSectionInput>>;
};

export type WorkshopSectionListInput = {
  create?: InputMaybe<Array<CreateWorkshopSectionInput>>;
  delete?: InputMaybe<Array<DeleteWorkshopSectionInput>>;
  update?: InputMaybe<Array<UpdateWorkshopSectionInput>>;
};

export type CustomElement_ElementFragment = { __typename?: 'Element', id: string, name: string, visibility: ElementVisibility } & { ' $fragmentName'?: 'CustomElement_ElementFragment' };

export type Element_ElementFragment = (
  { __typename?: 'Element', id: string, createdAt: any, updatedAt: any, version: number, deleted: boolean, name: string, markdown?: string | null, languageCode?: string | null, sourceUrl?: string | null, sourceName?: string | null, sourceBaseUrl?: string | null, licenseName?: string | null, licenseUrl?: string | null, isOwnerMe?: boolean | null, tags: Array<{ __typename?: 'ElementTag', name: string }>, usedBy: Array<{ __typename?: 'WorkshopElement', id: string }>, owner?: { __typename?: 'User', id: string, name?: string | null } | null }
  & { ' $fragmentRefs'?: { 'CustomElement_ElementFragment': CustomElement_ElementFragment } }
) & { ' $fragmentName'?: 'Element_ElementFragment' };

export type ElementPreviewItem_ElementFragment = (
  { __typename?: 'Element', id: string, createdAt: any, updatedAt: any, version: number, deleted: boolean, name: string, markdown?: string | null, languageCode?: string | null, sourceUrl?: string | null, sourceName?: string | null, sourceBaseUrl?: string | null, licenseName?: string | null, licenseUrl?: string | null, visibility: ElementVisibility, tags: Array<{ __typename?: 'ElementTag', name: string }>, usedBy: Array<{ __typename?: 'WorkshopElement', id: string }>, owner?: { __typename?: 'User', id: string } | null }
  & { ' $fragmentRefs'?: { 'CustomElement_ElementFragment': CustomElement_ElementFragment } }
) & { ' $fragmentName'?: 'ElementPreviewItem_ElementFragment' };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, version: number, favoriteElements: Array<{ __typename?: 'UserFavoriteElement', element: { __typename?: 'Element', id: string } }> } };

export type DeleteWorkshopMutationMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteWorkshopMutationMutation = { __typename?: 'Mutation', deleteWorkshop?: { __typename?: 'Workshop', id: string } | null };

export type IsLoggedInQueryVariables = Exact<{ [key: string]: never; }>;


export type IsLoggedInQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string } };

export type LogoutMutationMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutationMutation = { __typename?: 'Mutation', logout: boolean };

export type UpdateWorkshopMutationMutationVariables = Exact<{
  input: UpdateWorkshopInput;
}>;


export type UpdateWorkshopMutationMutation = { __typename?: 'Mutation', updateWorkshop: { __typename?: 'Workshop', id: string } };

export type LibraryCreateCustomElement_QueryQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type LibraryCreateCustomElement_QueryQuery = { __typename?: 'Query', element?: { __typename?: 'Element', id: string, name: string, visibility: ElementVisibility, markdown?: string | null } | null };

export type UpdateElementMutationMutationVariables = Exact<{
  input: UpdateElementInput;
}>;


export type UpdateElementMutationMutation = { __typename?: 'Mutation', updateElement: { __typename?: 'Element', id: string } };

export type CreateElementMutationMutationVariables = Exact<{
  input: CreateElementInput;
}>;


export type CreateElementMutationMutation = { __typename?: 'Mutation', createElement: { __typename?: 'Element', id: string } };

export type LibraryCreateCustomElementWorkshopQueryQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type LibraryCreateCustomElementWorkshopQueryQuery = { __typename?: 'Query', workshop: { __typename?: 'Workshop', sections: Array<{ __typename?: 'WorkshopSection', id: string }> } };

export type LibraryElementQueryQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type LibraryElementQueryQuery = { __typename?: 'Query', element?: (
    { __typename?: 'Element', id: string, name: string, isFavorite?: boolean | null }
    & { ' $fragmentRefs'?: { 'Element_ElementFragment': Element_ElementFragment } }
  ) | null };

export type WorkshopSectionsQueryQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type WorkshopSectionsQueryQuery = { __typename?: 'Query', workshop: { __typename?: 'Workshop', sections: Array<{ __typename?: 'WorkshopSection', id: string }> } };

export type AddToWorkhopMutationMutationVariables = Exact<{
  input: UpdateWorkshopInput;
}>;


export type AddToWorkhopMutationMutation = { __typename?: 'Mutation', updateWorkshop: { __typename?: 'Workshop', id: string } };

export type UpdateUserFavoriteElementMutationVariables = Exact<{
  input: UpdateUserFavoriteElementInput;
}>;


export type UpdateUserFavoriteElementMutation = { __typename?: 'Mutation', updateUserFavoriteElement?: { __typename?: 'Element', id: string } | null };

export type CustomElementsTab_WorkshopFragmentFragment = { __typename?: 'User', elements: Array<(
    { __typename?: 'Element', id: string, name: string }
    & { ' $fragmentRefs'?: { 'ElementPreviewItem_ElementFragment': ElementPreviewItem_ElementFragment } }
  )> } & { ' $fragmentName'?: 'CustomElementsTab_WorkshopFragmentFragment' };

export type CustomElementsTab_QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type CustomElementsTab_QueryQuery = { __typename?: 'Query', me: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'CustomElementsTab_WorkshopFragmentFragment': CustomElementsTab_WorkshopFragmentFragment } }
  ) };

export type FavoriteElements_UserFragment = { __typename?: 'User', favoriteElements: Array<{ __typename?: 'UserFavoriteElement', element: (
      { __typename?: 'Element', id: string }
      & { ' $fragmentRefs'?: { 'ElementPreviewItem_ElementFragment': ElementPreviewItem_ElementFragment } }
    ) }> } & { ' $fragmentName'?: 'FavoriteElements_UserFragment' };

export type MyUser_QueryFragment = { __typename?: 'Query', me: (
    { __typename?: 'User', id: string, favoriteElements: Array<{ __typename?: 'UserFavoriteElement', element: { __typename?: 'Element', id: string } }> }
    & { ' $fragmentRefs'?: { 'FavoriteElements_UserFragment': FavoriteElements_UserFragment } }
  ) } & { ' $fragmentName'?: 'MyUser_QueryFragment' };

export type MyUserQueryVariables = Exact<{ [key: string]: never; }>;


export type MyUserQuery = (
  { __typename?: 'Query' }
  & { ' $fragmentRefs'?: { 'MyUser_QueryFragment': MyUser_QueryFragment } }
);

export type SearchElementsQueryVariables = Exact<{
  input: ElementSearchInput;
}>;


export type SearchElementsQuery = { __typename?: 'Query', searchElements: Array<{ __typename?: 'ElementSearchResult', element: (
      { __typename?: 'Element', id: string }
      & { ' $fragmentRefs'?: { 'ElementPreviewItem_ElementFragment': ElementPreviewItem_ElementFragment } }
    ) }> };

export type WorkshopElementPageQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type WorkshopElementPageQuery = { __typename?: 'Query', workshopElement: { __typename?: 'WorkshopElement', id: string, note?: string | null, basedOn: (
      { __typename?: 'Element', id: string, name: string, markdown?: string | null, sourceUrl?: string | null, sourceName?: string | null, sourceBaseUrl?: string | null, licenseName?: string | null, licenseUrl?: string | null, isOwnerMe?: boolean | null, owner?: { __typename?: 'User', id: string } | null }
      & { ' $fragmentRefs'?: { 'CustomElement_ElementFragment': CustomElement_ElementFragment;'Element_ElementFragment': Element_ElementFragment } }
    ), section: { __typename?: 'WorkshopSection', id: string } } };

export type UpdateWorkshopWithElementMutationVariables = Exact<{
  input: UpdateWorkshopInput;
}>;


export type UpdateWorkshopWithElementMutation = { __typename?: 'Mutation', updateWorkshop: { __typename?: 'Workshop', id: string, sections: Array<{ __typename?: 'WorkshopSection', elements: Array<{ __typename?: 'WorkshopElement', id: string }> }> } };

export type WorkshopPage_WorkshopFragment = (
  { __typename?: 'Workshop', id: string, version: number, createdAt: any, updatedAt: any, deleted: boolean, name: string, description?: string | null, sections: Array<(
    { __typename?: 'WorkshopSection', name?: string | null, elements: Array<{ __typename?: 'WorkshopElement', id: string }> }
    & { ' $fragmentRefs'?: { 'WorkshopElementsComponent_WorkshopSectionFragment': WorkshopElementsComponent_WorkshopSectionFragment } }
  )> }
  & { ' $fragmentRefs'?: { 'WorkshopActionSheet_WorkshopFragment': WorkshopActionSheet_WorkshopFragment } }
) & { ' $fragmentName'?: 'WorkshopPage_WorkshopFragment' };

export type WorkshopByIdQueryQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type WorkshopByIdQueryQuery = { __typename?: 'Query', workshop: (
    { __typename?: 'Workshop' }
    & { ' $fragmentRefs'?: { 'WorkshopPage_WorkshopFragment': WorkshopPage_WorkshopFragment } }
  ) };

export type UpdateWorkshopMutationVariables = Exact<{
  input: UpdateWorkshopInput;
}>;


export type UpdateWorkshopMutation = { __typename?: 'Mutation', updateWorkshop: { __typename?: 'Workshop', id: string } };

export type UpdateWorkshopItemOrderMutationVariables = Exact<{
  input: UpdateWorkshopItemOrder;
}>;


export type UpdateWorkshopItemOrderMutation = { __typename?: 'Mutation', updateWorkshopItemOrder: { __typename?: 'Workshop', id: string } };

export type WorkshopFields_WorkshopFragment = (
  { __typename?: 'Workshop', id: string }
  & { ' $fragmentRefs'?: { 'WorkshopPreviewItem_WorkshopFragment': WorkshopPreviewItem_WorkshopFragment } }
) & { ' $fragmentName'?: 'WorkshopFields_WorkshopFragment' };

export type WorkshopsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type WorkshopsQueryQuery = { __typename?: 'Query', workshops: Array<(
    { __typename?: 'Workshop' }
    & { ' $fragmentRefs'?: { 'WorkshopFields_WorkshopFragment': WorkshopFields_WorkshopFragment } }
  )> };

export type CreateWorkshopMutationMutationVariables = Exact<{
  input: CreateWorkshopInput;
}>;


export type CreateWorkshopMutationMutation = { __typename?: 'Mutation', createWorkshop: { __typename?: 'Workshop', id: string } };

export type SectionElementsComponent_WorkshopSectionFragment = { __typename?: 'WorkshopSection', id: string, name?: string | null, isCollapsed: boolean, orderIndex: number, elements: Array<(
    { __typename?: 'WorkshopElement', id: string }
    & { ' $fragmentRefs'?: { 'WorkshopElementItemComponent_WorkshopElementFragment': WorkshopElementItemComponent_WorkshopElementFragment } }
  )> } & { ' $fragmentName'?: 'SectionElementsComponent_WorkshopSectionFragment' };

export type WorkshopActionSheet_WorkshopFragment = { __typename?: 'Workshop', description?: string | null } & { ' $fragmentName'?: 'WorkshopActionSheet_WorkshopFragment' };

export type WorkshopElementItemComponent_WorkshopElementFragment = { __typename?: 'WorkshopElement', id: string, note?: string | null, basedOn: { __typename?: 'Element', id: string, name: string, markdown?: string | null } } & { ' $fragmentName'?: 'WorkshopElementItemComponent_WorkshopElementFragment' };

export type WorkshopElementsComponent_WorkshopSectionFragment = (
  { __typename?: 'WorkshopSection', id: string }
  & { ' $fragmentRefs'?: { 'SectionElementsComponent_WorkshopSectionFragment': SectionElementsComponent_WorkshopSectionFragment;'WorkshopSectionComponent_WorkshopSectionFragment': WorkshopSectionComponent_WorkshopSectionFragment } }
) & { ' $fragmentName'?: 'WorkshopElementsComponent_WorkshopSectionFragment' };

export type WorkshopPreviewItem_WorkshopFragment = { __typename?: 'Workshop', id: string, version: number, createdAt: any, updatedAt: any, deleted: boolean, name: string, description?: string | null } & { ' $fragmentName'?: 'WorkshopPreviewItem_WorkshopFragment' };

export type WorkshopSectionComponent_WorkshopSectionFragment = { __typename?: 'WorkshopSection', id: string, name?: string | null, color?: string | null, isCollapsed: boolean, elements: Array<{ __typename?: 'WorkshopElement', id: string }> } & { ' $fragmentName'?: 'WorkshopSectionComponent_WorkshopSectionFragment' };

export const CustomElement_ElementFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomElement_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}}]} as unknown as DocumentNode<CustomElement_ElementFragment, unknown>;
export const Element_ElementFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Element_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"markdown"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"usedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"sourceBaseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"licenseName"}},{"kind":"Field","name":{"kind":"Name","value":"licenseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CustomElement_Element"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomElement_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}}]} as unknown as DocumentNode<Element_ElementFragment, unknown>;
export const ElementPreviewItem_ElementFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementPreviewItem_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"markdown"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"usedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"sourceBaseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"licenseName"}},{"kind":"Field","name":{"kind":"Name","value":"licenseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CustomElement_Element"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomElement_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}}]} as unknown as DocumentNode<ElementPreviewItem_ElementFragment, unknown>;
export const CustomElementsTab_WorkshopFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomElementsTab_WorkshopFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementPreviewItem_Element"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomElement_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementPreviewItem_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"markdown"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"usedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"sourceBaseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"licenseName"}},{"kind":"Field","name":{"kind":"Name","value":"licenseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CustomElement_Element"}}]}}]} as unknown as DocumentNode<CustomElementsTab_WorkshopFragmentFragment, unknown>;
export const FavoriteElements_UserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FavoriteElements_User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"favoriteElements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"element"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementPreviewItem_Element"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomElement_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementPreviewItem_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"markdown"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"usedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"sourceBaseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"licenseName"}},{"kind":"Field","name":{"kind":"Name","value":"licenseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CustomElement_Element"}}]}}]} as unknown as DocumentNode<FavoriteElements_UserFragment, unknown>;
export const MyUser_QueryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MyUser_Query"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Query"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"favoriteElements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"element"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FavoriteElements_User"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomElement_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementPreviewItem_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"markdown"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"usedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"sourceBaseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"licenseName"}},{"kind":"Field","name":{"kind":"Name","value":"licenseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CustomElement_Element"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FavoriteElements_User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"favoriteElements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"element"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementPreviewItem_Element"}}]}}]}}]}}]} as unknown as DocumentNode<MyUser_QueryFragment, unknown>;
export const WorkshopElementItemComponent_WorkshopElementFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopElementItemComponent_WorkshopElement"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkshopElement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"basedOn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"markdown"}}]}}]}}]} as unknown as DocumentNode<WorkshopElementItemComponent_WorkshopElementFragment, unknown>;
export const SectionElementsComponent_WorkshopSectionFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SectionElementsComponent_WorkshopSection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkshopSection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isCollapsed"}},{"kind":"Field","name":{"kind":"Name","value":"orderIndex"}},{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopElementItemComponent_WorkshopElement"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopElementItemComponent_WorkshopElement"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkshopElement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"basedOn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"markdown"}}]}}]}}]} as unknown as DocumentNode<SectionElementsComponent_WorkshopSectionFragment, unknown>;
export const WorkshopSectionComponent_WorkshopSectionFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopSectionComponent_WorkshopSection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkshopSection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"isCollapsed"}},{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<WorkshopSectionComponent_WorkshopSectionFragment, unknown>;
export const WorkshopElementsComponent_WorkshopSectionFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopElementsComponent_WorkshopSection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkshopSection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SectionElementsComponent_WorkshopSection"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopSectionComponent_WorkshopSection"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopElementItemComponent_WorkshopElement"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkshopElement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"basedOn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"markdown"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SectionElementsComponent_WorkshopSection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkshopSection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isCollapsed"}},{"kind":"Field","name":{"kind":"Name","value":"orderIndex"}},{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopElementItemComponent_WorkshopElement"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopSectionComponent_WorkshopSection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkshopSection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"isCollapsed"}},{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<WorkshopElementsComponent_WorkshopSectionFragment, unknown>;
export const WorkshopActionSheet_WorkshopFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopActionSheet_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<WorkshopActionSheet_WorkshopFragment, unknown>;
export const WorkshopPage_WorkshopFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopPage_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopElementsComponent_WorkshopSection"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopActionSheet_Workshop"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopElementItemComponent_WorkshopElement"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkshopElement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"basedOn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"markdown"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SectionElementsComponent_WorkshopSection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkshopSection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isCollapsed"}},{"kind":"Field","name":{"kind":"Name","value":"orderIndex"}},{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopElementItemComponent_WorkshopElement"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopSectionComponent_WorkshopSection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkshopSection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"isCollapsed"}},{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopElementsComponent_WorkshopSection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkshopSection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SectionElementsComponent_WorkshopSection"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopSectionComponent_WorkshopSection"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopActionSheet_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<WorkshopPage_WorkshopFragment, unknown>;
export const WorkshopPreviewItem_WorkshopFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopPreviewItem_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<WorkshopPreviewItem_WorkshopFragment, unknown>;
export const WorkshopFields_WorkshopFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopFields_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopPreviewItem_Workshop"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopPreviewItem_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<WorkshopFields_WorkshopFragment, unknown>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"favoriteElements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"element"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const DeleteWorkshopMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteWorkshopMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteWorkshop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteWorkshopMutationMutation, DeleteWorkshopMutationMutationVariables>;
export const IsLoggedInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsLoggedIn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<IsLoggedInQuery, IsLoggedInQueryVariables>;
export const LogoutMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LogoutMutation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<LogoutMutationMutation, LogoutMutationMutationVariables>;
export const UpdateWorkshopMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateWorkshopMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateWorkshopInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateWorkshop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateWorkshopMutationMutation, UpdateWorkshopMutationMutationVariables>;
export const LibraryCreateCustomElement_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LibraryCreateCustomElement_Query"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"element"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"markdown"}}]}}]}}]} as unknown as DocumentNode<LibraryCreateCustomElement_QueryQuery, LibraryCreateCustomElement_QueryQueryVariables>;
export const UpdateElementMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateElementMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateElementInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateElement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateElementMutationMutation, UpdateElementMutationMutationVariables>;
export const CreateElementMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateElementMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateElementInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createElement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateElementMutationMutation, CreateElementMutationMutationVariables>;
export const LibraryCreateCustomElementWorkshopQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LibraryCreateCustomElementWorkshopQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workshop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<LibraryCreateCustomElementWorkshopQueryQuery, LibraryCreateCustomElementWorkshopQueryQueryVariables>;
export const LibraryElementQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LibraryElementQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"element"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Element_Element"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomElement_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Element_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"markdown"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"usedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"sourceBaseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"licenseName"}},{"kind":"Field","name":{"kind":"Name","value":"licenseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CustomElement_Element"}}]}}]} as unknown as DocumentNode<LibraryElementQueryQuery, LibraryElementQueryQueryVariables>;
export const WorkshopSectionsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WorkshopSectionsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workshop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<WorkshopSectionsQueryQuery, WorkshopSectionsQueryQueryVariables>;
export const AddToWorkhopMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddToWorkhopMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateWorkshopInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateWorkshop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddToWorkhopMutationMutation, AddToWorkhopMutationMutationVariables>;
export const UpdateUserFavoriteElementDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserFavoriteElement"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserFavoriteElementInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserFavoriteElement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateUserFavoriteElementMutation, UpdateUserFavoriteElementMutationVariables>;
export const CustomElementsTab_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CustomElementsTab_Query"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CustomElementsTab_WorkshopFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomElement_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementPreviewItem_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"markdown"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"usedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"sourceBaseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"licenseName"}},{"kind":"Field","name":{"kind":"Name","value":"licenseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CustomElement_Element"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomElementsTab_WorkshopFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementPreviewItem_Element"}}]}}]}}]} as unknown as DocumentNode<CustomElementsTab_QueryQuery, CustomElementsTab_QueryQueryVariables>;
export const MyUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MyUser_Query"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomElement_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementPreviewItem_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"markdown"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"usedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"sourceBaseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"licenseName"}},{"kind":"Field","name":{"kind":"Name","value":"licenseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CustomElement_Element"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FavoriteElements_User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"favoriteElements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"element"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementPreviewItem_Element"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MyUser_Query"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Query"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"favoriteElements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"element"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FavoriteElements_User"}}]}}]}}]} as unknown as DocumentNode<MyUserQuery, MyUserQueryVariables>;
export const SearchElementsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchElements"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ElementSearchInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchElements"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"element"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementPreviewItem_Element"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomElement_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementPreviewItem_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"markdown"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"usedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"sourceBaseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"licenseName"}},{"kind":"Field","name":{"kind":"Name","value":"licenseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CustomElement_Element"}}]}}]} as unknown as DocumentNode<SearchElementsQuery, SearchElementsQueryVariables>;
export const WorkshopElementPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WorkshopElementPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workshopElement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"basedOn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"markdown"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"sourceBaseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"licenseName"}},{"kind":"Field","name":{"kind":"Name","value":"licenseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CustomElement_Element"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Element_Element"}}]}},{"kind":"Field","name":{"kind":"Name","value":"section"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomElement_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Element_Element"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"markdown"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"usedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"sourceName"}},{"kind":"Field","name":{"kind":"Name","value":"sourceBaseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"licenseName"}},{"kind":"Field","name":{"kind":"Name","value":"licenseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CustomElement_Element"}}]}}]} as unknown as DocumentNode<WorkshopElementPageQuery, WorkshopElementPageQueryVariables>;
export const UpdateWorkshopWithElementDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateWorkshopWithElement"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateWorkshopInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateWorkshop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateWorkshopWithElementMutation, UpdateWorkshopWithElementMutationVariables>;
export const WorkshopByIdQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WorkshopByIdQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workshop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopPage_Workshop"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopElementItemComponent_WorkshopElement"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkshopElement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"basedOn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"markdown"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SectionElementsComponent_WorkshopSection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkshopSection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isCollapsed"}},{"kind":"Field","name":{"kind":"Name","value":"orderIndex"}},{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopElementItemComponent_WorkshopElement"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopSectionComponent_WorkshopSection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkshopSection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"isCollapsed"}},{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopElementsComponent_WorkshopSection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkshopSection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SectionElementsComponent_WorkshopSection"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopSectionComponent_WorkshopSection"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopActionSheet_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopPage_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopElementsComponent_WorkshopSection"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopActionSheet_Workshop"}}]}}]} as unknown as DocumentNode<WorkshopByIdQueryQuery, WorkshopByIdQueryQueryVariables>;
export const UpdateWorkshopDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateWorkshop"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateWorkshopInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateWorkshop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateWorkshopMutation, UpdateWorkshopMutationVariables>;
export const UpdateWorkshopItemOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateWorkshopItemOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateWorkshopItemOrder"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateWorkshopItemOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateWorkshopItemOrderMutation, UpdateWorkshopItemOrderMutationVariables>;
export const WorkshopsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WorkshopsQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workshops"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopFields_Workshop"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopPreviewItem_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopFields_Workshop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopPreviewItem_Workshop"}}]}}]} as unknown as DocumentNode<WorkshopsQueryQuery, WorkshopsQueryQueryVariables>;
export const CreateWorkshopMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateWorkshopMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateWorkshopInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createWorkshop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateWorkshopMutationMutation, CreateWorkshopMutationMutationVariables>;