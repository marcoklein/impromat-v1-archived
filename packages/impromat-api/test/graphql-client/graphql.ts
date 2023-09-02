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

export type BoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
};

export type CreateElementInput = {
  /** Set if the element was imported from improbib, a project that collects existing improv resources. */
  improbibIdentifier?: InputMaybe<Scalars['String']>;
  /** Language code (e.g. en, de) of the element. */
  languageCode: Scalars['String'];
  licenseName?: InputMaybe<Scalars['String']>;
  licenseUrl?: InputMaybe<Scalars['String']>;
  markdown?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  orderIndex?: InputMaybe<Scalars['Int']>;
  setPredictedLevelTags?: InputMaybe<Scalars['Boolean']>;
  sourceBaseUrl?: InputMaybe<Scalars['String']>;
  sourceName?: Scalars['String'];
  sourceUrl?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<ElementTagsInput>;
  visibility: ElementVisibility;
};

export type CreateWorkshopElementInput = {
  basedOn: BasedOnElementConnectInput;
  note?: InputMaybe<Scalars['String']>;
  orderIndex?: InputMaybe<Scalars['Float']>;
};

export type CreateWorkshopInput = {
  description?: InputMaybe<Scalars['String']>;
  /** Publicly list workshop within impromat. Worshop must be public in order to list it. */
  isListed?: InputMaybe<Scalars['Boolean']>;
  isPublic?: InputMaybe<Scalars['Boolean']>;
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

/** Duplicates a workshop to allow changes to the new workshop. */
export type DuplicateWorkshopInput = {
  name: Scalars['String'];
  workshopId: Scalars['ID'];
};

export type Element = {
  __typename?: 'Element';
  createdAt: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
  id: Scalars['ID'];
  /** Set if the element was imported from improbib, a project that collects existing improv resources. */
  improbibIdentifier?: Maybe<Scalars['String']>;
  /** Set if the element is called from a user context. */
  isFavorite?: Maybe<Scalars['Boolean']>;
  /** Convenience field to determine if the owner of the element is the logged in user. */
  isOwnerMe?: Maybe<Scalars['Boolean']>;
  languageCode?: Maybe<Scalars['String']>;
  licenseName?: Maybe<Scalars['String']>;
  licenseUrl?: Maybe<Scalars['String']>;
  markdown?: Maybe<Scalars['String']>;
  /** Shortened markdown text for preview purposes to avoid loading the whole content in a request. */
  markdownShort?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  owner?: Maybe<User>;
  /** Predicted level tags for the element. E.g. "beginner", "advanced", "expert". Is null, if the element cannot be processed. */
  predictedLevelTags?: Maybe<Array<ElementPredictedTag>>;
  recommendations: Array<Element>;
  /** Changes of the element. */
  snapshots: Array<ElementSnapshot>;
  sourceBaseUrl?: Maybe<Scalars['String']>;
  sourceName?: Maybe<Scalars['String']>;
  sourceUrl?: Maybe<Scalars['String']>;
  tags: Array<ElementTag>;
  updatedAt: Scalars['DateTime'];
  usedBy: Array<WorkshopElement>;
  version: Scalars['Int'];
  visibility: ElementVisibility;
};


export type ElementSnapshotsArgs = {
  skip?: Scalars['Int'];
  take?: Scalars['Int'];
};

/** Predicted tag for an element. */
export type ElementPredictedTag = {
  __typename?: 'ElementPredictedTag';
  /** Name of the predicted tag. */
  name: Scalars['String'];
  /** Reason for the predicted tag. */
  reason: Scalars['String'];
};

export type ElementQueryResult = {
  __typename?: 'ElementQueryResult';
  element: Element;
};

export type ElementSearchInput = {
  skip?: Scalars['Int'];
  tagNames?: InputMaybe<Array<Scalars['String']>>;
  take?: Scalars['Int'];
  text?: InputMaybe<Scalars['String']>;
};

export type ElementSearchMatch = {
  __typename?: 'ElementSearchMatch';
  indices: Array<Array<Scalars['Int']>>;
  /** Key of field where searched text was found. */
  key?: Maybe<Scalars['String']>;
  /** If the matching field is an array this field points to the index of the matching element in the source array. */
  refIndex?: Maybe<Scalars['Int']>;
  value: Scalars['String'];
};

export type ElementSearchResult = {
  __typename?: 'ElementSearchResult';
  element: Element;
  matches: Array<ElementSearchMatch>;
  score: Scalars['Float'];
};

export type ElementSnapshot = {
  __typename?: 'ElementSnapshot';
  createdAt: Scalars['DateTime'];
  /** Element of snapshot. */
  element: Element;
  id: Scalars['ID'];
  /** Element this snapshot was created of. */
  parent: Element;
  /** User that created the snapshot. */
  user?: Maybe<User>;
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

export type ElementTagSetInput = {
  name: Scalars['String'];
};

/** Filter tags of elements. */
export type ElementTagsFilterInput = {
  selectedTagNames?: InputMaybe<Array<Scalars['String']>>;
  text?: InputMaybe<Scalars['String']>;
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
  isOwnerMe?: InputMaybe<Scalars['Boolean']>;
  /** Include all elements that are publicly available to the logged-in user. */
  isPublic?: InputMaybe<Scalars['Boolean']>;
  nameSearch?: InputMaybe<Scalars['String']>;
};

export type ElementsOrderByInput = {
  notImplemented: Scalars['Boolean'];
};

export type IdInput = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Iterates over all elements and applies tag mappings. */
  applyAllTagMappings: Scalars['Float'];
  createElement: Element;
  createWorkshop: Workshop;
  deleteWorkshop?: Maybe<Workshop>;
  duplicateWorkshop: Workshop;
  logout: Scalars['Boolean'];
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
  id: Scalars['ID'];
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
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  element?: Maybe<Element>;
  elements: Array<ElementQueryResult>;
  googleAuthUrl: Scalars['String'];
  /** Get information about the current user. */
  me: User;
  searchElements: Array<ElementSearchResult>;
  tags: Array<ElementTag>;
  user: User;
  workshop?: Maybe<Workshop>;
  workshopElement: WorkshopElement;
  /** Find workshops. */
  workshops: Array<Workshop>;
};


export type QueryElementArgs = {
  id: Scalars['ID'];
};


export type QueryElementsArgs = {
  filter?: InputMaybe<ElementsFilterInput>;
  orderBy?: InputMaybe<ElementsOrderByInput>;
  skip?: Scalars['Int'];
  take?: Scalars['Int'];
};


export type QuerySearchElementsArgs = {
  input: ElementSearchInput;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryTagsArgs = {
  filter?: InputMaybe<ElementTagsFilterInput>;
  skip?: Scalars['Int'];
  take?: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryWorkshopArgs = {
  id: Scalars['ID'];
};


export type QueryWorkshopElementArgs = {
  id: Scalars['ID'];
};


export type QueryWorkshopsArgs = {
  orderBy?: InputMaybe<Array<WorkshopsOrderByInput>>;
  skip?: Scalars['Int'];
  take?: Scalars['Int'];
  where?: InputMaybe<WorkshopsWhereInput>;
};

export enum SortOrder {
  /** Ascending sort order. */
  Asc = 'asc',
  /** Descending sort order. */
  Desc = 'desc'
}

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type UpdateElementInput = {
  id: Scalars['ID'];
  /** Set if the element was imported from improbib, a project that collects existing improv resources. */
  improbibIdentifier?: InputMaybe<Scalars['String']>;
  /** Language code (e.g. en, de) of the element. */
  languageCode?: InputMaybe<Scalars['String']>;
  licenseName?: InputMaybe<Scalars['String']>;
  licenseUrl?: InputMaybe<Scalars['String']>;
  markdown?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  orderIndex?: InputMaybe<Scalars['Int']>;
  setPredictedLevelTags?: InputMaybe<Scalars['Boolean']>;
  sourceBaseUrl?: InputMaybe<Scalars['String']>;
  sourceName?: InputMaybe<Scalars['String']>;
  sourceUrl?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<ElementTagsInput>;
  visibility?: InputMaybe<ElementVisibility>;
};

export type UpdateUserFavoriteElementInput = {
  elementId: Scalars['ID'];
  isFavorite: Scalars['Boolean'];
};

export type UpdateUserInput = {
  id: Scalars['ID'];
  /** Preferred languages of the user. E.g. de or en. */
  languageCodes?: InputMaybe<Array<Scalars['String']>>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateUserLikedWorkshopInput = {
  isLiked: Scalars['Boolean'];
  workshopId: Scalars['ID'];
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
  /** Publicly list workshop within impromat. Worshop must be public in order to list it. */
  isListed?: InputMaybe<Scalars['Boolean']>;
  isPublic?: InputMaybe<Scalars['Boolean']>;
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
  /** Preferred language codes of the user. */
  languageCodes: Array<Scalars['String']>;
  likedWorkshops: Array<UserLikedWorkshop>;
  /** Public display name of the user. */
  name?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  version: Scalars['Int'];
  /** All workshops that this user has access to. */
  workshops: Array<Workshop>;
};


export type UserWorkshopsArgs = {
  input?: InputMaybe<UserWorkshopsFilterInput>;
  skip?: Scalars['Int'];
  take?: Scalars['Int'];
};

export type UserFavoriteElement = {
  __typename?: 'UserFavoriteElement';
  createdAt: Scalars['DateTime'];
  element: Element;
  updatedAt: Scalars['DateTime'];
};

export type UserLikedWorkshop = {
  __typename?: 'UserLikedWorkshop';
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
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
  isCommunity?: Scalars['Boolean'];
  /** Publicly or listed workshops of user. */
  isPublic?: Scalars['Boolean'];
  liked?: Scalars['Boolean'];
  /** Filter for workshops that are owned by the user. */
  owned?: Scalars['Boolean'];
};

export type Workshop = {
  __typename?: 'Workshop';
  /** If true, the client is authorized to edit the workshop. */
  canEdit?: Maybe<Scalars['Boolean']>;
  createdAt: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
  description?: Maybe<Scalars['String']>;
  elementRecommendations: Array<Element>;
  id: Scalars['ID'];
  /** True, if liked by the logged in user. Undefined, if there is no user logged in. */
  isLiked?: Maybe<Scalars['Boolean']>;
  /** True, if the workshop is listed publicly in the improv community. */
  isListed: Scalars['Boolean'];
  /** Convenience field to determine if the owner of the workshop is the logged in user. */
  isOwnerMe?: Maybe<Scalars['Boolean']>;
  /** Public users can view the workshop but they require the direct link to the workshop. The url of the workshop does not change. */
  isPublic?: Maybe<Scalars['Boolean']>;
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

export type ElementFieldsFragment = { __typename?: 'Element', id: string, version: number, createdAt: any, updatedAt: any, deleted: boolean, name: string, markdown?: string | null, markdownShort?: string | null, visibility: ElementVisibility, isOwnerMe?: boolean | null, tags: Array<{ __typename?: 'ElementTag', id: string }>, usedBy: Array<{ __typename?: 'WorkshopElement', id: string }>, owner?: { __typename?: 'User', id: string } | null };

export type ElementByIdQueryQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ElementByIdQueryQuery = { __typename?: 'Query', element?: { __typename?: 'Element', id: string, version: number, createdAt: any, updatedAt: any, deleted: boolean, name: string, markdown?: string | null, markdownShort?: string | null, visibility: ElementVisibility, isOwnerMe?: boolean | null, tags: Array<{ __typename?: 'ElementTag', id: string }>, usedBy: Array<{ __typename?: 'WorkshopElement', id: string }>, owner?: { __typename?: 'User', id: string } | null } | null };

export type ElementsQueryQueryVariables = Exact<{
  filter?: InputMaybe<ElementsFilterInput>;
  orderBy?: InputMaybe<ElementsOrderByInput>;
  skip?: Scalars['Int'];
  take?: Scalars['Int'];
}>;


export type ElementsQueryQuery = { __typename?: 'Query', elements: Array<{ __typename?: 'ElementQueryResult', element: { __typename?: 'Element', id: string, version: number, createdAt: any, updatedAt: any, deleted: boolean, name: string, markdown?: string | null, markdownShort?: string | null, visibility: ElementVisibility, isOwnerMe?: boolean | null, tags: Array<{ __typename?: 'ElementTag', id: string }>, usedBy: Array<{ __typename?: 'WorkshopElement', id: string }>, owner?: { __typename?: 'User', id: string } | null } }> };

export type SearchElementsQueryQueryVariables = Exact<{
  input: ElementSearchInput;
}>;


export type SearchElementsQueryQuery = { __typename?: 'Query', searchElements: Array<{ __typename?: 'ElementSearchResult', element: { __typename?: 'Element', id: string, version: number, createdAt: any, updatedAt: any, deleted: boolean, name: string, markdown?: string | null, markdownShort?: string | null, visibility: ElementVisibility, isOwnerMe?: boolean | null, tags: Array<{ __typename?: 'ElementTag', id: string }>, usedBy: Array<{ __typename?: 'WorkshopElement', id: string }>, owner?: { __typename?: 'User', id: string } | null } }> };

export type CreateElementMutationMutationVariables = Exact<{
  input: CreateElementInput;
}>;


export type CreateElementMutationMutation = { __typename?: 'Mutation', createElement: { __typename?: 'Element', id: string, version: number, createdAt: any, updatedAt: any, deleted: boolean, name: string, markdown?: string | null, markdownShort?: string | null, visibility: ElementVisibility, isOwnerMe?: boolean | null, tags: Array<{ __typename?: 'ElementTag', id: string }>, usedBy: Array<{ __typename?: 'WorkshopElement', id: string }>, owner?: { __typename?: 'User', id: string } | null } };

export type UpdateElementMutationMutationVariables = Exact<{
  input: UpdateElementInput;
}>;


export type UpdateElementMutationMutation = { __typename?: 'Mutation', updateElement: { __typename?: 'Element', id: string } };

export type MeQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQueryQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, workshops: Array<{ __typename?: 'Workshop', id: string }>, elements: Array<{ __typename?: 'Element', id: string }>, favoriteElements: Array<{ __typename?: 'UserFavoriteElement', element: { __typename?: 'Element', id: string } }> } };

export type UpdateUserMutationMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutationMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, name?: string | null } };

export type UpdateUserFavoriteElementMutationVariables = Exact<{
  input: UpdateUserFavoriteElementInput;
}>;


export type UpdateUserFavoriteElementMutation = { __typename?: 'Mutation', updateUserFavoriteElement?: { __typename?: 'Element', id: string } | null };

export type MeFavoriteElementsQueryVariables = Exact<{ [key: string]: never; }>;


export type MeFavoriteElementsQuery = { __typename?: 'Query', me: { __typename?: 'User', favoriteElements: Array<{ __typename?: 'UserFavoriteElement', element: { __typename?: 'Element', id: string } }> } };

export type ElementIsFavoriteQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ElementIsFavoriteQuery = { __typename?: 'Query', element?: { __typename?: 'Element', isFavorite?: boolean | null } | null };

export type UpdateUserFavoriteWorkshopMutationVariables = Exact<{
  input: UpdateUserLikedWorkshopInput;
}>;


export type UpdateUserFavoriteWorkshopMutation = { __typename?: 'Mutation', updateUserLikedWorkshop?: { __typename?: 'Workshop', id: string } | null };

export type MeFavoriteWorkshopsQueryVariables = Exact<{ [key: string]: never; }>;


export type MeFavoriteWorkshopsQuery = { __typename?: 'Query', me: { __typename?: 'User', likedWorkshops: Array<{ __typename?: 'UserLikedWorkshop', workshop: { __typename?: 'Workshop', id: string } }> } };

export type WorkshopIsFavoriteQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type WorkshopIsFavoriteQuery = { __typename?: 'Query', workshop?: { __typename?: 'Workshop', isLiked?: boolean | null } | null };

export type WorkshopIsLikedQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type WorkshopIsLikedQuery = { __typename?: 'Query', workshop?: { __typename?: 'Workshop', isLiked?: boolean | null } | null };

export type WorkshopElementFieldsFragment = { __typename?: 'WorkshopElement', id: string, version: number, note?: string | null };

export type WorkshopElementByIdQueryQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type WorkshopElementByIdQueryQuery = { __typename?: 'Query', workshopElement: { __typename?: 'WorkshopElement', id: string, version: number, note?: string | null } };

export type WorkshopFieldsFragment = { __typename?: 'Workshop', id: string, version: number, createdAt: any, updatedAt: any, deleted: boolean, name: string, description?: string | null, canEdit?: boolean | null, sections: Array<{ __typename?: 'WorkshopSection', id: string, version: number, createdAt: any, updatedAt: any, deleted: boolean, orderIndex: number, name?: string | null, color?: string | null, isCollapsed: boolean, elements: Array<{ __typename?: 'WorkshopElement', id: string, note?: string | null, basedOn: { __typename?: 'Element', id: string, name: string } }>, workshop: { __typename?: 'Workshop', id: string } }>, owner: { __typename?: 'User', id: string } };

export type UserWorkshopsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type UserWorkshopsQueryQuery = { __typename?: 'Query', workshops: Array<{ __typename?: 'Workshop', id: string, version: number, createdAt: any, updatedAt: any, deleted: boolean, name: string, description?: string | null, canEdit?: boolean | null, sections: Array<{ __typename?: 'WorkshopSection', id: string, version: number, createdAt: any, updatedAt: any, deleted: boolean, orderIndex: number, name?: string | null, color?: string | null, isCollapsed: boolean, elements: Array<{ __typename?: 'WorkshopElement', id: string, note?: string | null, basedOn: { __typename?: 'Element', id: string, name: string } }>, workshop: { __typename?: 'Workshop', id: string } }>, owner: { __typename?: 'User', id: string } }> };

export type WorkshopQueryQueryVariables = Exact<{
  workshopId: Scalars['ID'];
}>;


export type WorkshopQueryQuery = { __typename?: 'Query', workshop?: { __typename?: 'Workshop', id: string, version: number, createdAt: any, updatedAt: any, deleted: boolean, name: string, description?: string | null, canEdit?: boolean | null, sections: Array<{ __typename?: 'WorkshopSection', id: string, version: number, createdAt: any, updatedAt: any, deleted: boolean, orderIndex: number, name?: string | null, color?: string | null, isCollapsed: boolean, elements: Array<{ __typename?: 'WorkshopElement', id: string, note?: string | null, basedOn: { __typename?: 'Element', id: string, name: string } }>, workshop: { __typename?: 'Workshop', id: string } }>, owner: { __typename?: 'User', id: string } } | null };

export type DeleteWorkshopMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteWorkshopMutation = { __typename?: 'Mutation', deleteWorkshop?: { __typename?: 'Workshop', id: string } | null };

export type AddWorkshopWithEmptyNameMutationVariables = Exact<{ [key: string]: never; }>;


export type AddWorkshopWithEmptyNameMutation = { __typename?: 'Mutation', createWorkshop: { __typename?: 'Workshop', id: string, version: number, createdAt: any, updatedAt: any, deleted: boolean, name: string, description?: string | null, canEdit?: boolean | null, sections: Array<{ __typename?: 'WorkshopSection', id: string, version: number, createdAt: any, updatedAt: any, deleted: boolean, orderIndex: number, name?: string | null, color?: string | null, isCollapsed: boolean, elements: Array<{ __typename?: 'WorkshopElement', id: string, note?: string | null, basedOn: { __typename?: 'Element', id: string, name: string } }>, workshop: { __typename?: 'Workshop', id: string } }>, owner: { __typename?: 'User', id: string } } };

export type AddWorkshopByNameMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type AddWorkshopByNameMutation = { __typename?: 'Mutation', createWorkshop: { __typename?: 'Workshop', id: string, version: number, createdAt: any, updatedAt: any, deleted: boolean, name: string, description?: string | null, canEdit?: boolean | null, sections: Array<{ __typename?: 'WorkshopSection', id: string, version: number, createdAt: any, updatedAt: any, deleted: boolean, orderIndex: number, name?: string | null, color?: string | null, isCollapsed: boolean, elements: Array<{ __typename?: 'WorkshopElement', id: string, note?: string | null, basedOn: { __typename?: 'Element', id: string, name: string } }>, workshop: { __typename?: 'Workshop', id: string } }>, owner: { __typename?: 'User', id: string } } };

export type AddWorkshopMutationVariables = Exact<{
  input: CreateWorkshopInput;
}>;


export type AddWorkshopMutation = { __typename?: 'Mutation', createWorkshop: { __typename?: 'Workshop', id: string, version: number, createdAt: any, updatedAt: any, deleted: boolean, name: string, description?: string | null, canEdit?: boolean | null, sections: Array<{ __typename?: 'WorkshopSection', id: string, version: number, createdAt: any, updatedAt: any, deleted: boolean, orderIndex: number, name?: string | null, color?: string | null, isCollapsed: boolean, elements: Array<{ __typename?: 'WorkshopElement', id: string, note?: string | null, basedOn: { __typename?: 'Element', id: string, name: string } }>, workshop: { __typename?: 'Workshop', id: string } }>, owner: { __typename?: 'User', id: string } } };

export type AddTestWorkshopMutationVariables = Exact<{ [key: string]: never; }>;


export type AddTestWorkshopMutation = { __typename?: 'Mutation', createWorkshop: { __typename?: 'Workshop', id: string, version: number, createdAt: any, updatedAt: any, deleted: boolean, name: string, description?: string | null, canEdit?: boolean | null, sections: Array<{ __typename?: 'WorkshopSection', id: string, version: number, createdAt: any, updatedAt: any, deleted: boolean, orderIndex: number, name?: string | null, color?: string | null, isCollapsed: boolean, elements: Array<{ __typename?: 'WorkshopElement', id: string, note?: string | null, basedOn: { __typename?: 'Element', id: string, name: string } }>, workshop: { __typename?: 'Workshop', id: string } }>, owner: { __typename?: 'User', id: string } } };

export type UpdateWorkshopMutationVariables = Exact<{
  input: UpdateWorkshopInput;
}>;


export type UpdateWorkshopMutation = { __typename?: 'Mutation', updateWorkshop: { __typename?: 'Workshop', id: string, version: number, createdAt: any, updatedAt: any, deleted: boolean, name: string, description?: string | null, canEdit?: boolean | null, sections: Array<{ __typename?: 'WorkshopSection', id: string, version: number, createdAt: any, updatedAt: any, deleted: boolean, orderIndex: number, name?: string | null, color?: string | null, isCollapsed: boolean, elements: Array<{ __typename?: 'WorkshopElement', id: string, note?: string | null, basedOn: { __typename?: 'Element', id: string, name: string } }>, workshop: { __typename?: 'Workshop', id: string } }>, owner: { __typename?: 'User', id: string } } };

export const ElementFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"markdown"}},{"kind":"Field","name":{"kind":"Name","value":"markdownShort"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"usedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}}]}}]} as unknown as DocumentNode<ElementFieldsFragment, unknown>;
export const WorkshopElementFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopElementFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkshopElement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"note"}}]}}]} as unknown as DocumentNode<WorkshopElementFieldsFragment, unknown>;
export const WorkshopFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"canEdit"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"orderIndex"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"isCollapsed"}},{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"basedOn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"workshop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<WorkshopFieldsFragment, unknown>;
export const ElementByIdQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ElementByIdQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"element"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"markdown"}},{"kind":"Field","name":{"kind":"Name","value":"markdownShort"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"usedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}}]}}]} as unknown as DocumentNode<ElementByIdQueryQuery, ElementByIdQueryQueryVariables>;
export const ElementsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ElementsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ElementsFilterInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ElementsOrderByInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"defaultValue":{"kind":"IntValue","value":"0"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"defaultValue":{"kind":"IntValue","value":"20"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"elements"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"element"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"markdown"}},{"kind":"Field","name":{"kind":"Name","value":"markdownShort"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"usedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}}]}}]} as unknown as DocumentNode<ElementsQueryQuery, ElementsQueryQueryVariables>;
export const SearchElementsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchElementsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ElementSearchInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchElements"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"element"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"markdown"}},{"kind":"Field","name":{"kind":"Name","value":"markdownShort"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"usedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}}]}}]} as unknown as DocumentNode<SearchElementsQueryQuery, SearchElementsQueryQueryVariables>;
export const CreateElementMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateElementMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateElementInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createElement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ElementFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ElementFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Element"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"markdown"}},{"kind":"Field","name":{"kind":"Name","value":"markdownShort"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"usedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isOwnerMe"}}]}}]} as unknown as DocumentNode<CreateElementMutationMutation, CreateElementMutationMutationVariables>;
export const UpdateElementMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateElementMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateElementInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateElement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateElementMutationMutation, UpdateElementMutationMutationVariables>;
export const MeQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MeQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"workshops"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"favoriteElements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"element"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MeQueryQuery, MeQueryQueryVariables>;
export const UpdateUserMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutationMutation, UpdateUserMutationMutationVariables>;
export const UpdateUserFavoriteElementDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserFavoriteElement"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserFavoriteElementInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserFavoriteElement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateUserFavoriteElementMutation, UpdateUserFavoriteElementMutationVariables>;
export const MeFavoriteElementsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MeFavoriteElements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"favoriteElements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"element"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MeFavoriteElementsQuery, MeFavoriteElementsQueryVariables>;
export const ElementIsFavoriteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ElementIsFavorite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"element"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}}]}}]}}]} as unknown as DocumentNode<ElementIsFavoriteQuery, ElementIsFavoriteQueryVariables>;
export const UpdateUserFavoriteWorkshopDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserFavoriteWorkshop"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserLikedWorkshopInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserLikedWorkshop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateUserFavoriteWorkshopMutation, UpdateUserFavoriteWorkshopMutationVariables>;
export const MeFavoriteWorkshopsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MeFavoriteWorkshops"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likedWorkshops"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workshop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MeFavoriteWorkshopsQuery, MeFavoriteWorkshopsQueryVariables>;
export const WorkshopIsFavoriteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WorkshopIsFavorite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workshop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isLiked"}}]}}]}}]} as unknown as DocumentNode<WorkshopIsFavoriteQuery, WorkshopIsFavoriteQueryVariables>;
export const WorkshopIsLikedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WorkshopIsLiked"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workshop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isLiked"}}]}}]}}]} as unknown as DocumentNode<WorkshopIsLikedQuery, WorkshopIsLikedQueryVariables>;
export const WorkshopElementByIdQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WorkshopElementByIdQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workshopElement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopElementFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopElementFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkshopElement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"note"}}]}}]} as unknown as DocumentNode<WorkshopElementByIdQueryQuery, WorkshopElementByIdQueryQueryVariables>;
export const UserWorkshopsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserWorkshopsQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workshops"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"canEdit"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"orderIndex"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"isCollapsed"}},{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"basedOn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"workshop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UserWorkshopsQueryQuery, UserWorkshopsQueryQueryVariables>;
export const WorkshopQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WorkshopQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"workshopId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workshop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workshopId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"canEdit"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"orderIndex"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"isCollapsed"}},{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"basedOn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"workshop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<WorkshopQueryQuery, WorkshopQueryQueryVariables>;
export const DeleteWorkshopDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteWorkshop"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteWorkshop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteWorkshopMutation, DeleteWorkshopMutationVariables>;
export const AddWorkshopWithEmptyNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddWorkshopWithEmptyName"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createWorkshop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"canEdit"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"orderIndex"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"isCollapsed"}},{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"basedOn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"workshop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddWorkshopWithEmptyNameMutation, AddWorkshopWithEmptyNameMutationVariables>;
export const AddWorkshopByNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddWorkshopByName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createWorkshop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"canEdit"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"orderIndex"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"isCollapsed"}},{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"basedOn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"workshop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddWorkshopByNameMutation, AddWorkshopByNameMutationVariables>;
export const AddWorkshopDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddWorkshop"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateWorkshopInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createWorkshop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"canEdit"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"orderIndex"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"isCollapsed"}},{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"basedOn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"workshop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddWorkshopMutation, AddWorkshopMutationVariables>;
export const AddTestWorkshopDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddTestWorkshop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createWorkshop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"test-workshop","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"canEdit"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"orderIndex"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"isCollapsed"}},{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"basedOn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"workshop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddTestWorkshopMutation, AddTestWorkshopMutationVariables>;
export const UpdateWorkshopDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateWorkshop"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateWorkshopInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateWorkshop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkshopFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkshopFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Workshop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"canEdit"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"orderIndex"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"isCollapsed"}},{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"basedOn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"workshop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateWorkshopMutation, UpdateWorkshopMutationVariables>;