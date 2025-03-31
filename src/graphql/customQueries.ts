export const listListsWithAlbums = /* GraphQL */ `
query ListListsWithAlbums($filter: ModelListFilterInput, $limit: Int, $nextToken: String, $albumLimit: Int, $albumNextToken: String) {
  listLists(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      albums(limit: $albumLimit, nextToken: $albumNextToken) {
        items {
          id
          played
          album {
            id
            name
            artist
            spotifyUrl
            release_date
            imageUrl
            userId
            createdAt
            updatedAt
          }
        }
        nextToken
      }
      createdAt
      updatedAt
    }
    nextToken
  }
}`;

export const customAlbumListsByUser = /* GraphQL */ `query AlbumListsByUser(
  $userId: String!
  $sortDirection: ModelSortDirection
  $filter: ModelListFilterInput
  $albumLimit: Int
  $albumNextToken: String
) {
  listsByUser(
    userId: $userId
    sortDirection: $sortDirection
    filter: $filter
    limit: $albumLimit
    nextToken: $albumNextToken
  ) {
    items {
      id
      name
      albums(limit: $albumLimit, nextToken: $albumNextToken) {
        items {
          id
          played
          album {
            id
            name
            artist
            spotifyUrl
            release_date
            imageUrl
            userId
            createdAt
            updatedAt
          }
        }
        nextToken
      }
      createdAt
      updatedAt
    }
    nextToken
    __typename
  }
}
`;

export const getUnplayedAlbums = /* GraphQL */ `
  query GetUnplayedAlbums($listId: ID!, $nextToken: String, $limit: Int) {
    listAlbumLists(
      filter: { listId: { eq: $listId }, played: { eq: false } }
      nextToken: $nextToken
      limit: $limit
    ) {
      items {
        id
        album {
          id
          name
          artist
          spotifyUrl
          release_date
          imageUrl
          userId
          createdAt 
          updatedAt 
        }
      }
      nextToken
    }
  }
`;

export const customListListeningPileEntries = /* GraphQL */ `query CustomListListeningPileEntries(
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
      album {  # This is the added field to get Album details
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
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
`;

export const customAlbumListsByAlbumIdAndId = /* GraphQL */ `query CustomAlbumListsByAlbumIdAndId(
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
      list {
        id
        name
      }
      __typename
    }
    nextToken
    __typename
  }
}`;

export const CustomAlbumListsByUserFiltered = /* GraphQL */ `query AlbumListsByUserFiltered(
  $userId: String!
  $albumId: ID
  $listId: ID
  $limit: Int
  $nextToken: String
) {
  albumListsByUser(userId: $userId, limit: $limit, nextToken: $nextToken, filter: {
    albumId: { eq: $albumId },
    listId: { eq: $listId }
  }) {
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
`;