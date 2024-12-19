export const listListsWithAlbums = /* GraphQL */ `
query ListListsWithAlbums($filter: ModelListFilterInput, $limit: Int, $nextToken: String) { 
    listLists(filter: $filter, limit: $limit, nextToken: $nextToken) { 
      items { 
        id 
        name 
        albums { 
          items { 
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