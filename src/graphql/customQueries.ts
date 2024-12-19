export const listListsWithAlbums = /* GraphQL */ `
query ListListsWithAlbums($filter: ModelListFilterInput, $limit: Int, $nextToken: String) { 
    listLists(filter: $filter, limit: $limit, nextToken: $nextToken) { 
      items { 
        id 
        name 
        albums { 
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
        } 
        createdAt 
        updatedAt 
      } 
      nextToken 
    } 
  } 
`;

export const getUnplayedAlbums = /* GraphQL */ `
query GetUnplayedAlbums($listId: ID!) {
    listAlbumLists(filter: { listId: { eq: $listId }, played: { eq: false } }) {
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
    }
  }
`;