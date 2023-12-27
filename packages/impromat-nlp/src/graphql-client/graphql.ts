/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type BasedOnElementConnectInput = {
  connect: IdInput;
};

export type BoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CreateElementInput = {
  /** Set if the element was imported from improbib, a project that collects existing improv resources. */
  improbibIdentifier?: InputMaybe<Scalars['String']['input']>;
  /** Language code (e.g. en, de) of the element. */
  languageCode: Scalars['String']['input'];
  licenseName?: InputMaybe<Scalars['String']['input']>;
  licenseUrl?: InputMaybe<Scalars['String']['input']>;
  markdown?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  orderIndex?: InputMaybe<Scalars['Int']['input']>;
  setPredictedLevelTags?: InputMaybe<Scalars['Boolean']['input']>;
  sourceBaseUrl?: InputMaybe<Scalars['String']['input']>;
  sourceName?: Scalars['String']['input'];
  sourceUrl?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<ElementTagsInput>;
  visibility: ElementVisibility;
};

export type CreateWorkshopElementInput = {
  basedOn: BasedOnElementConnectInput;
  note?: InputMaybe<Scalars['String']['input']>;
  orderIndex?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateWorkshopInput = {
  /** Date for which workshop is planned or was held. */
  dateOfWorkshop?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  /** Publicly list workshop within impromat. Worshop must be public in order to list it. */
  isListed?: InputMaybe<Scalars['Boolean']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  sections?: InputMaybe<WorkshopSectionListCreateInput>;
};

export type CreateWorkshopSectionInput = {
  isCollapsed?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  orderIndex?: InputMaybe<Scalars['Float']['input']>;
};

export type DeleteWorkshopElementInput = {
  id: Scalars['ID']['input'];
};

export type DeleteWorkshopSectionInput = {
  id: Scalars['ID']['input'];
};

/** Duplicates a workshop to allow changes to the new workshop. */
export type DuplicateWorkshopInput = {
  name: Scalars['String']['input'];
  workshopId: Scalars['ID']['input'];
};

export type Element = {
  __typename?: 'Element';
  createdAt: Scalars['DateTime']['output'];
  deleted?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  /** Set if the element was imported from improbib, a project that collects existing improv resources. */
  improbibIdentifier?: Maybe<Scalars['String']['output']>;
  /** Set if the element is called from a user context. */
  isFavorite?: Maybe<Scalars['Boolean']['output']>;
  /** Convenience field to determine if the owner of the element is the logged in user. */
  isOwnerMe?: Maybe<Scalars['Boolean']['output']>;
  /** The keywords of the element. This is generated asynchronously and might not be available immediately. */
  keywords?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  languageCode?: Maybe<Scalars['String']['output']>;
  licenseName?: Maybe<Scalars['String']['output']>;
  licenseUrl?: Maybe<Scalars['String']['output']>;
  markdown?: Maybe<Scalars['String']['output']>;
  /** Shortened markdown text for preview purposes to avoid loading the whole content in a request. */
  markdownShort?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  owner?: Maybe<User>;
  /** Predicted level tags for the element. E.g. "beginner", "advanced", "expert". Is null, if the element cannot be processed. */
  predictedLevelTags?: Maybe<Array<ElementPredictedTag>>;
  recommendations: Array<Element>;
  /** Changes of the element. */
  snapshots: Array<ElementSnapshot>;
  sourceBaseUrl?: Maybe<Scalars['String']['output']>;
  sourceName?: Maybe<Scalars['String']['output']>;
  sourceUrl?: Maybe<Scalars['String']['output']>;
  /** The summary of the element. This is generated asynchronously and might not be available immediately. */
  summary?: Maybe<Scalars['String']['output']>;
  tags: Array<ElementTag>;
  updatedAt: Scalars['DateTime']['output'];
  usedBy: Array<WorkshopElement>;
  /** The summary of the element. This is generated asynchronously and might not be available immediately. */
  variations?: Maybe<Array<Maybe<Variation>>>;
  version: Scalars['Int']['output'];
  visibility: ElementVisibility;
};


export type ElementKeywordsArgs = {
  forceRefresh?: Scalars['Boolean']['input'];
};


export type ElementSnapshotsArgs = {
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};


export type ElementSummaryArgs = {
  forceRefresh?: Scalars['Boolean']['input'];
};


export type ElementVariationsArgs = {
  forceRefresh?: Scalars['Boolean']['input'];
};

/** Predicted tag for an element. */
export type ElementPredictedTag = {
  __typename?: 'ElementPredictedTag';
  /** Name of the predicted tag. */
  name: Scalars['String']['output'];
  /** Reason for the predicted tag. */
  reason: Scalars['String']['output'];
};

export type ElementQueryResult = {
  __typename?: 'ElementQueryResult';
  element: Element;
};

export type ElementSearchInput = {
  /** Filter for liked elements of the user. */
  isLiked?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter for elements of the user. */
  isOwned?: InputMaybe<Scalars['Boolean']['input']>;
  /** Language code (e.g. en, de) for results. */
  languageCode?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  tagNames?: InputMaybe<Array<Scalars['String']['input']>>;
  take?: Scalars['Int']['input'];
  text?: InputMaybe<Scalars['String']['input']>;
};

export type ElementSearchMatch = {
  __typename?: 'ElementSearchMatch';
  indices: Array<Array<Scalars['Int']['output']>>;
  /** Key of field where searched text was found. */
  key?: Maybe<Scalars['String']['output']>;
  /** If the matching field is an array this field points to the index of the matching element in the source array. */
  refIndex?: Maybe<Scalars['Int']['output']>;
  value: Scalars['String']['output'];
};

export type ElementSearchResult = {
  __typename?: 'ElementSearchResult';
  element: Element;
  matches: Array<ElementSearchMatch>;
  score: Scalars['Float']['output'];
};

export type ElementSnapshot = {
  __typename?: 'ElementSnapshot';
  createdAt: Scalars['DateTime']['output'];
  /** Element of snapshot. */
  element: Element;
  id: Scalars['ID']['output'];
  /** Element this snapshot was created of. */
  parent: Element;
  /** User that created the snapshot. */
  user?: Maybe<User>;
};

export type ElementTag = {
  __typename?: 'ElementTag';
  /** Number of elements that have this tag. If used as part of a filter query the number of elements that would match the filter. */
  count: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  deleted?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  version: Scalars['Int']['output'];
};

export type ElementTagSetInput = {
  name: Scalars['String']['input'];
};

/** Filter tags of elements. */
export type ElementTagsFilterInput = {
  /** Language code (e.g. en, de) for results. */
  languageCode?: InputMaybe<Scalars['String']['input']>;
  selectedTagNames?: InputMaybe<Array<Scalars['String']['input']>>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export type ElementTagsInput = {
  /** Defines all tags of the element. */
  set: Array<ElementTagSetInput>;
};

export enum ElementVisibility {
  /** Element is only visible to its owning user. */
  Private = 'PRIVATE',
  /** Element is publicly shared with the whole community. */
  Public = 'PUBLIC'
}

/** Filter for elements */
export type ElementsFilterInput = {
  /** Include all elements of the currently active user. */
  isOwnerMe?: InputMaybe<Scalars['Boolean']['input']>;
  /** Include all elements that are publicly available to the logged-in user. */
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  nameSearch?: InputMaybe<Scalars['String']['input']>;
};

export type ElementsOrderByInput = {
  notImplemented: Scalars['Boolean']['input'];
};

export type IdInput = {
  id: Scalars['ID']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Iterates over all elements and applies tag mappings. */
  applyAllTagMappings: Scalars['Float']['output'];
  /** Iterates over all elements and creates summaries. */
  createAllSummaries: Scalars['Float']['output'];
  createElement: Element;
  createWorkshop: Workshop;
  deleteWorkshop?: Maybe<Workshop>;
  duplicateWorkshop: Workshop;
  logout: Scalars['Boolean']['output'];
  updateElement: Element;
  updateUser: User;
  /** Change the favorite state for element of the logged in user. */
  updateUserFavoriteElement?: Maybe<Element>;
  /** Change the liked state for workshop of the logged in user. */
  updateUserLikedWorkshop?: Maybe<Workshop>;
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
  id: Scalars['ID']['input'];
};


export type MutationDuplicateWorkshopArgs = {
  input: DuplicateWorkshopInput;
};


export type MutationUpdateElementArgs = {
  input: UpdateElementInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationUpdateUserFavoriteElementArgs = {
  input: UpdateUserFavoriteElementInput;
};


export type MutationUpdateUserLikedWorkshopArgs = {
  input: UpdateUserLikedWorkshopInput;
};


export type MutationUpdateWorkshopArgs = {
  input: UpdateWorkshopInput;
};


export type MutationUpdateWorkshopItemOrderArgs = {
  input: UpdateWorkshopItemOrder;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  element?: Maybe<Element>;
  elements: Array<ElementQueryResult>;
  googleAuthUrl: Scalars['String']['output'];
  /** Get information about the current user. Returns null if not logged in. */
  me?: Maybe<User>;
  searchElements: Array<ElementSearchResult>;
  tags: Array<ElementTag>;
  /** Get information about a user. Returns null if not found or not logged in. */
  user?: Maybe<User>;
  workshop?: Maybe<Workshop>;
  workshopElement: WorkshopElement;
  /** Find workshops. */
  workshops: Array<Workshop>;
};


export type QueryElementArgs = {
  id: Scalars['ID']['input'];
};


export type QueryElementsArgs = {
  filter?: InputMaybe<ElementsFilterInput>;
  orderBy?: InputMaybe<ElementsOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};


export type QuerySearchElementsArgs = {
  input: ElementSearchInput;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTagsArgs = {
  filter?: InputMaybe<ElementTagsFilterInput>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};


export type QueryUserArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryWorkshopArgs = {
  id: Scalars['ID']['input'];
};


export type QueryWorkshopElementArgs = {
  id: Scalars['ID']['input'];
};


export type QueryWorkshopsArgs = {
  orderBy?: InputMaybe<Array<WorkshopsOrderByInput>>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: InputMaybe<WorkshopsWhereInput>;
};

export enum SortOrder {
  /** Ascending sort order. */
  Asc = 'asc',
  /** Descending sort order. */
  Desc = 'desc'
}

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateElementInput = {
  id: Scalars['ID']['input'];
  /** Set if the element was imported from improbib, a project that collects existing improv resources. */
  improbibIdentifier?: InputMaybe<Scalars['String']['input']>;
  /** Language code (e.g. en, de) of the element. */
  languageCode?: InputMaybe<Scalars['String']['input']>;
  licenseName?: InputMaybe<Scalars['String']['input']>;
  licenseUrl?: InputMaybe<Scalars['String']['input']>;
  markdown?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  orderIndex?: InputMaybe<Scalars['Int']['input']>;
  setPredictedLevelTags?: InputMaybe<Scalars['Boolean']['input']>;
  sourceBaseUrl?: InputMaybe<Scalars['String']['input']>;
  sourceName?: InputMaybe<Scalars['String']['input']>;
  sourceUrl?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<ElementTagsInput>;
  visibility?: InputMaybe<ElementVisibility>;
};

export type UpdateUserFavoriteElementInput = {
  elementId: Scalars['ID']['input'];
  isFavorite: Scalars['Boolean']['input'];
};

export type UpdateUserInput = {
  id: Scalars['ID']['input'];
  /** Preferred languages of the user. E.g. de or en. */
  languageCodes?: InputMaybe<Array<Scalars['String']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserLikedWorkshopInput = {
  isLiked: Scalars['Boolean']['input'];
  workshopId: Scalars['ID']['input'];
};

export type UpdateWorkshopElementInput = {
  basedOn?: InputMaybe<BasedOnElementConnectInput>;
  id: Scalars['ID']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  orderIndex?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateWorkshopInput = {
  /** Date for which workshop is planned or was held. */
  dateOfWorkshop?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  /** Publicly list workshop within impromat. Worshop must be public in order to list it. */
  isListed?: InputMaybe<Scalars['Boolean']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  sections?: InputMaybe<WorkshopSectionListInput>;
};

/** Moves a workshop item (section or element) within a workshop considering collapsed sections. */
export type UpdateWorkshopItemOrder = {
  /** From position. */
  fromPosition: Scalars['Int']['input'];
  /** To position. */
  toPosition: Scalars['Int']['input'];
  workshopId: Scalars['ID']['input'];
};

export type UpdateWorkshopSectionInput = {
  elements?: InputMaybe<WorkshopElementListInput>;
  id: Scalars['ID']['input'];
  isCollapsed?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  orderIndex?: InputMaybe<Scalars['Float']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  deleted?: Maybe<Scalars['Boolean']['output']>;
  favoriteElements: Array<UserFavoriteElement>;
  id: Scalars['ID']['output'];
  /** Preferred language codes of the user. */
  languageCodes: Array<Scalars['String']['output']>;
  likedWorkshops: Array<UserLikedWorkshop>;
  /** Public display name of the user. */
  name?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  version: Scalars['Int']['output'];
  /** All workshops that this user has access to. */
  workshops: Array<Workshop>;
};


export type UserWorkshopsArgs = {
  input?: InputMaybe<UserWorkshopsFilterInput>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};

export type UserFavoriteElement = {
  __typename?: 'UserFavoriteElement';
  createdAt: Scalars['DateTime']['output'];
  element: Element;
  updatedAt: Scalars['DateTime']['output'];
};

export type UserLikedWorkshop = {
  __typename?: 'UserLikedWorkshop';
  createdAt: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
  workshop: Workshop;
};

export type UserLikedWorkshopListRelationFilter = {
  every?: InputMaybe<UserLikedWorkshopWhereInput>;
  none?: InputMaybe<UserLikedWorkshopWhereInput>;
  some?: InputMaybe<UserLikedWorkshopWhereInput>;
};

export type UserLikedWorkshopWhereInput = {
  userId?: InputMaybe<StringFilter>;
};

/** Filter workshops of user. */
export type UserWorkshopsFilterInput = {
  /** Publicly accessible community workshop. */
  isCommunity?: Scalars['Boolean']['input'];
  /** Publicly or listed workshops of user. */
  isPublic?: Scalars['Boolean']['input'];
  liked?: Scalars['Boolean']['input'];
  /** Filter for workshops that are owned by the user. */
  owned?: Scalars['Boolean']['input'];
};

export type Variation = {
  __typename?: 'Variation';
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type Workshop = {
  __typename?: 'Workshop';
  /** If true, the client is authorized to edit the workshop. */
  canEdit?: Maybe<Scalars['Boolean']['output']>;
  createdAt: Scalars['DateTime']['output'];
  /** Optional metadata date when this workshop was planned (or held). */
  dateOfWorkshop?: Maybe<Scalars['DateTime']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  elementRecommendations: Array<Element>;
  id: Scalars['ID']['output'];
  /** True, if liked by the logged in user. Undefined, if there is no user logged in. */
  isLiked?: Maybe<Scalars['Boolean']['output']>;
  /** True, if the workshop is listed publicly in the improv community. */
  isListed: Scalars['Boolean']['output'];
  /** Convenience field to determine if the owner of the workshop is the logged in user. */
  isOwnerMe?: Maybe<Scalars['Boolean']['output']>;
  /** Public users can view the workshop but they require the direct link to the workshop. The url of the workshop does not change. */
  isPublic?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  owner: User;
  sections: Array<WorkshopSection>;
  updatedAt: Scalars['DateTime']['output'];
  version: Scalars['Int']['output'];
};

export type WorkshopElement = {
  __typename?: 'WorkshopElement';
  basedOn: Element;
  createdAt: Scalars['DateTime']['output'];
  deleted?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  note?: Maybe<Scalars['String']['output']>;
  section: WorkshopSection;
  updatedAt: Scalars['DateTime']['output'];
  version: Scalars['Int']['output'];
};

export type WorkshopElementListInput = {
  create?: InputMaybe<Array<CreateWorkshopElementInput>>;
  delete?: InputMaybe<Array<DeleteWorkshopElementInput>>;
  update?: InputMaybe<Array<UpdateWorkshopElementInput>>;
};

export type WorkshopSection = {
  __typename?: 'WorkshopSection';
  color?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deleted?: Maybe<Scalars['Boolean']['output']>;
  elements: Array<WorkshopElement>;
  id: Scalars['ID']['output'];
  isCollapsed: Scalars['Boolean']['output'];
  name?: Maybe<Scalars['String']['output']>;
  orderIndex: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
  version: Scalars['Int']['output'];
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

export type WorkshopsOrderByInput = {
  createdAt?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type WorkshopsWhereInput = {
  AND?: InputMaybe<Array<WorkshopsWhereInput>>;
  NOT?: InputMaybe<Array<WorkshopsWhereInput>>;
  OR?: InputMaybe<Array<WorkshopsWhereInput>>;
  id?: InputMaybe<StringFilter>;
  isListed?: InputMaybe<BoolFilter>;
  isPublic?: InputMaybe<BoolFilter>;
  ownerId?: InputMaybe<StringFilter>;
  userLikedWorkshops?: InputMaybe<UserLikedWorkshopListRelationFilter>;
};

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string } | null };

export type ElementFieldsFragment = { __typename?: 'Element', id: string, name: string, improbibIdentifier?: string | null, markdown?: string | null, tags: Array<{ __typename?: 'ElementTag', id: string, name: string }> };

export type ElementsQueryVariables = Exact<{
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
  input: ElementSearchInput;
}>;


export type ElementsQuery = { __typename?: 'Query', searchElements: Array<{ __typename?: 'ElementSearchResult', element: { __typename?: 'Element', id: string, name: string, improbibIdentifier?: string | null, markdown?: string | null, tags: Array<{ __typename?: 'ElementTag', id: string, name: string }> } }> };

export const ElementFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"improbibIdentifier"}},{"kind":"Field","name":{"kind":"Name","value":"markdown"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ElementFieldsFragment, unknown>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const ElementsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Elements"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ElementSearchInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchElements"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"element"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"improbibIdentifier"}},{"kind":"Field","name":{"kind":"Name","value":"markdown"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ElementsQuery, ElementsQueryVariables>;