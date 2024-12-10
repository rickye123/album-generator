/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getList = /* GraphQL */ `query GetList($id: ID!) {
  getList(id: $id) {
    id
    name
    albums {
      id
      name
      artist
      spotifyUrl
      release_date
      imageUrl
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    albumListsId
    __typename
  }
}
` as GeneratedQuery<APITypes.GetListQueryVariables, APITypes.GetListQuery>;
export const listLists = /* GraphQL */ `query ListLists(
  $filter: ModelListFilterInput
  $limit: Int
  $nextToken: String
) {
  listLists(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      createdAt
      updatedAt
      albumListsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListListsQueryVariables, APITypes.ListListsQuery>;
export const getAlbum = /* GraphQL */ `query GetAlbum($id: ID!) {
  getAlbum(id: $id) {
    id
    name
    artist
    spotifyUrl
    release_date
    imageUrl
    lists {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetAlbumQueryVariables, APITypes.GetAlbumQuery>;
export const listAlbums = /* GraphQL */ `query ListAlbums(
  $filter: ModelAlbumFilterInput
  $limit: Int
  $nextToken: String
) {
  listAlbums(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      artist
      spotifyUrl
      release_date
      imageUrl
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListAlbumsQueryVariables,
  APITypes.ListAlbumsQuery
>;
