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
      nextToken
      __typename
    }
    userId
    createdAt
    updatedAt
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
      userId
      createdAt
      updatedAt
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
    genres
    hideAlbum
    lists {
      nextToken
      __typename
    }
    ListeningPileEntry {
      id
      albumId
      order
      userId
      createdAt
      updatedAt
      __typename
    }
    userId
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
      genres
      hideAlbum
      userId
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
export const getAlbumList = /* GraphQL */ `query GetAlbumList($id: ID!) {
  getAlbumList(id: $id) {
    id
    albumId
    listId
    played
    album {
      id
      name
      artist
      spotifyUrl
      release_date
      imageUrl
      genres
      hideAlbum
      userId
      createdAt
      updatedAt
      __typename
    }
    list {
      id
      name
      userId
      createdAt
      updatedAt
      __typename
    }
    userId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetAlbumListQueryVariables,
  APITypes.GetAlbumListQuery
>;
export const listAlbumLists = /* GraphQL */ `query ListAlbumLists(
  $filter: ModelAlbumListFilterInput
  $limit: Int
  $nextToken: String
) {
  listAlbumLists(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      albumId
      listId
      played
      userId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListAlbumListsQueryVariables,
  APITypes.ListAlbumListsQuery
>;
export const getListeningPileEntry = /* GraphQL */ `query GetListeningPileEntry($id: ID!) {
  getListeningPileEntry(id: $id) {
    id
    albumId
    order
    album {
      id
      name
      artist
      spotifyUrl
      release_date
      imageUrl
      genres
      hideAlbum
      userId
      createdAt
      updatedAt
      __typename
    }
    userId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetListeningPileEntryQueryVariables,
  APITypes.GetListeningPileEntryQuery
>;
export const listListeningPileEntries = /* GraphQL */ `query ListListeningPileEntries(
  $filter: ModelListeningPileEntryFilterInput
  $limit: Int
  $nextToken: String
) {
  listListeningPileEntries(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      albumId
      order
      userId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListListeningPileEntriesQueryVariables,
  APITypes.ListListeningPileEntriesQuery
>;
export const listsByUser = /* GraphQL */ `query ListsByUser(
  $userId: String!
  $sortDirection: ModelSortDirection
  $filter: ModelListFilterInput
  $limit: Int
  $nextToken: String
) {
  listsByUser(
    userId: $userId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      userId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListsByUserQueryVariables,
  APITypes.ListsByUserQuery
>;
export const albumsByUser = /* GraphQL */ `query AlbumsByUser(
  $userId: String!
  $sortDirection: ModelSortDirection
  $filter: ModelAlbumFilterInput
  $limit: Int
  $nextToken: String
) {
  albumsByUser(
    userId: $userId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      artist
      spotifyUrl
      release_date
      imageUrl
      genres
      hideAlbum
      userId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.AlbumsByUserQueryVariables,
  APITypes.AlbumsByUserQuery
>;
export const albumListsByAlbumIdAndId = /* GraphQL */ `query AlbumListsByAlbumIdAndId(
  $albumId: ID!
  $id: ModelIDKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelAlbumListFilterInput
  $limit: Int
  $nextToken: String
) {
  albumListsByAlbumIdAndId(
    albumId: $albumId
    id: $id
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      albumId
      listId
      played
      userId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.AlbumListsByAlbumIdAndIdQueryVariables,
  APITypes.AlbumListsByAlbumIdAndIdQuery
>;
export const albumListsByListIdAndId = /* GraphQL */ `query AlbumListsByListIdAndId(
  $listId: ID!
  $id: ModelIDKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelAlbumListFilterInput
  $limit: Int
  $nextToken: String
) {
  albumListsByListIdAndId(
    listId: $listId
    id: $id
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      albumId
      listId
      played
      userId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.AlbumListsByListIdAndIdQueryVariables,
  APITypes.AlbumListsByListIdAndIdQuery
>;
export const albumListsByUser = /* GraphQL */ `query AlbumListsByUser(
  $userId: String!
  $sortDirection: ModelSortDirection
  $filter: ModelAlbumListFilterInput
  $limit: Int
  $nextToken: String
) {
  albumListsByUser(
    userId: $userId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      albumId
      listId
      played
      userId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.AlbumListsByUserQueryVariables,
  APITypes.AlbumListsByUserQuery
>;
export const listeningPileEntriesByAlbumIdAndId = /* GraphQL */ `query ListeningPileEntriesByAlbumIdAndId(
  $albumId: ID!
  $id: ModelIDKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelListeningPileEntryFilterInput
  $limit: Int
  $nextToken: String
) {
  listeningPileEntriesByAlbumIdAndId(
    albumId: $albumId
    id: $id
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      albumId
      order
      userId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListeningPileEntriesByAlbumIdAndIdQueryVariables,
  APITypes.ListeningPileEntriesByAlbumIdAndIdQuery
>;
export const listeningPileEntriesByUser = /* GraphQL */ `query ListeningPileEntriesByUser(
  $userId: String!
  $sortDirection: ModelSortDirection
  $filter: ModelListeningPileEntryFilterInput
  $limit: Int
  $nextToken: String
) {
  listeningPileEntriesByUser(
    userId: $userId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      albumId
      order
      userId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListeningPileEntriesByUserQueryVariables,
  APITypes.ListeningPileEntriesByUserQuery
>;
