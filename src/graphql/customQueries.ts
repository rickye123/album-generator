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
          createdAt 
          updatedAt 
        }
      }
      nextToken
    }
  }
`;