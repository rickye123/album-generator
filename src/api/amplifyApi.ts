import { GraphQLAPI, graphqlOperation } from '@aws-amplify/api-graphql';
import { createAlbum, createList, deleteList, addAlbumToList as addAlbumToListMutation, deleteAlbum, createAlbumList, deleteAlbumList, updateAlbum, deleteListeningPileEntry, createListeningPileEntry } from '../graphql/mutations';
import { albumListsByAlbumIdAndId, albumListsByListIdAndId, getAlbum, getList, listAlbumLists, listAlbums, listLists } from '../graphql/queries';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { Amplify } from '@aws-amplify/core';
import { Observable } from 'rxjs';
import { AlbumData, AlbumListData, ListData, ListeningPileEntry } from '../model';
import { List } from '../API';
import { getUnplayedAlbums, customListListeningPileEntries as listListeningPileEntries, listListsWithAlbums } from '../graphql/customQueries';
import { toggleHidden, togglePlayed } from '../graphql/customMutations';

export const updateAlbumDetails = async (albumData: AlbumData): Promise<GraphQLResult<any>> => {
  try {
    const graphqlParams = graphqlOperation(updateAlbum, { input: albumData });

    const response = await GraphQLAPI.graphql(
      Amplify as any, // Pass the Amplify class instance
      graphqlParams,  // GraphQL options
      {}              // Additional headers
    );

    // Check if the result is a Promise or Observable
    if (response instanceof Observable) {
      throw new Error('Expected a non-subscription query/mutation but received a subscription.');
    }

    const typedResponse = response as GraphQLResult<any>;

    if (typedResponse.data?.updateAlbum) {
      return typedResponse.data.updateAlbum;
    } else {
      throw new Error('Unexpected response structure.');
    }
  } catch (error) {
    console.error('Error updating album:', error);
    throw new Error('Error updating album');
  }
};


export const addAlbum = async (albumData: AlbumData, userId: string): Promise<GraphQLResult<any>> => {
  try {
    const graphqlParams = graphqlOperation(createAlbum, { input: albumData, userId });

    const result = await GraphQLAPI.graphql(
      Amplify as any, // Pass the Amplify class instance
      graphqlParams,  // GraphQL options
      {}              // Additional headers
    );

    // Check if the result is a Promise or Observable
    if (result instanceof Observable) {
      throw new Error('Expected a non-subscription query/mutation but received a subscription.');
    }

    return result;
  } catch (error) {
    console.error('Error adding album:', error);
    throw new Error('Error adding album');
  }
};

export const fetchAlbumById = async(albumId: string): Promise<AlbumData | null> => {
  try {
    const response = await GraphQLAPI.graphql(
      Amplify as any, 
      graphqlOperation(getAlbum, { id : albumId }),
      {}
    );

    // Check if the result is a Promise or Observable
    if (response instanceof Observable) {
      throw new Error('Expected a non-subscription query/mutation but received a subscription.');
    }

    // Ensure response is properly typed
    const typedResponse = response as GraphQLResult<any>;

    // Access the `data` field
    if (typedResponse.data && typedResponse.data.getAlbum) {
      const album = typedResponse.data.getAlbum;
      return {
        id: album.id,
        name: album.name,
        artist: album.artist,
        release_date: album.release_date,
        genres: album.genres,
        spotifyUrl: album.spotifyUrl,
        imageUrl: album.imageUrl,
        hideAlbum: album.hideAlbum,
        userId: album.userId
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching album by ID:', error);
    return null;
  }
}

export const fetchAlbums = async (userId: string) => {
  let allAlbums: AlbumData[] = [];
  let nextToken: string | null = null;

  do {
    try {
      const response = await GraphQLAPI.graphql(
        Amplify as any,
        graphqlOperation(listAlbums, { 
          filter: { userId: { eq: userId } }, limit: 100, nextToken }),
        {}
      );

      if (response instanceof Observable) {
        throw new Error('Expected a non-subscription query/mutation but received a subscription.');
      }

      const typedResponse = response as GraphQLResult<any>;
      if (typedResponse.data?.listAlbums) {
        allAlbums = allAlbums.concat(
          typedResponse.data.listAlbums.items.map((item: AlbumData) => ({
            id: item.id,
            name: item.name,
            artist: item.artist,
            release_date: item.release_date,
            genres: item.genres,
            spotifyUrl: item.spotifyUrl,
            imageUrl: item.imageUrl,
            hideAlbum: item.hideAlbum
          }))
        );
        nextToken = typedResponse.data.listAlbums.nextToken;
      } else {
        throw new Error('Unexpected response structure.');
      }
    } catch (error) {
      console.error('Error fetching albums:', error);
      break;
    }
  } while (nextToken);

  return allAlbums;
};

export const fetchLists = async (userId: string) => {
  let allLists: any[] = [];
  let nextToken: string | null = null;

  do {
    try {
      const response = await GraphQLAPI.graphql(
        Amplify as any,
        graphqlOperation(listListsWithAlbums, { filter: { userId: { eq: userId } }, limit: 100, nextToken }),
        {}
      );

      if (response instanceof Observable) {
        throw new Error('Expected a non-subscription query/mutation but received a subscription.');
      }

      const typedResponse = response as GraphQLResult<any>;
      if (typedResponse.data?.listLists) {
        allLists = allLists.concat(
          typedResponse.data.listLists.items.map((item: List) => ({
            id: item.id,
            name: item.name,
            albums: item.albums?.items.map((albumListItem: any) => ({
              id: albumListItem.album.id,
              name: albumListItem.album.name,
              artist: albumListItem.album.artist,
              spotifyUrl: albumListItem.album.spotifyUrl,
              releaseDate: albumListItem.album.release_date,
              genres: albumListItem.album.genres,
              imageUrl: albumListItem.album.imageUrl,
              played: albumListItem.played,
              hideAlbum: albumListItem.album.hideAlbum,
            })),
          }))
        );
        nextToken = typedResponse.data.listLists.nextToken;
      } else {
        throw new Error('Unexpected response structure.');
      }
    } catch (error) {
      console.error('Error fetching lists:', error);
      break;
    }
  } while (nextToken);

  return allLists;
};

export const fetchAlbumsByListId = async (listId: string): Promise<ListData> => {
  let allAlbums: any[] = [];
  let albumNextToken: string | null = null;

  const fetchAlbumsForList = async () => {
    let albumName = null;
    do {
      try {
        const response = await GraphQLAPI.graphql(
          Amplify as any,
          graphqlOperation(listListsWithAlbums, {
            filter: { id: { eq: listId } },
            albumLimit: 100,
            albumNextToken,
          })
        );

        if (response instanceof Observable) {
          throw new Error('Expected a query but received a subscription.');
        }

        const typedResponse = response as GraphQLResult<any>;
        const listData = typedResponse.data?.listLists?.items[0];

        if (listData?.albums) {
          albumName = listData.name;
          allAlbums = allAlbums.concat(
            listData.albums.items.map((albumListItem: AlbumListData) => ({
              album: {
                id: albumListItem.album.id,
                name: albumListItem.album.name,
                artist: albumListItem.album.artist,
                spotifyUrl: albumListItem.album.spotifyUrl,
                releaseDate: albumListItem.album.release_date,
                genres: albumListItem.album.genres,
                hideAlbum: albumListItem.album.hideAlbum,
                imageUrl: albumListItem.album.imageUrl,
              },
              played: albumListItem.played,
            }))
          );
          albumNextToken = listData.albums.nextToken;
        } else {
          throw new Error('Unexpected response structure for albums.');
        }
      } catch (error) {
        console.error(`Error fetching albums for list ${listId}:`, error);
        throw error;
      }
    } while (albumNextToken);

    return {
        id: listId,
        name: albumName,
        albums: allAlbums
    };
  };

  try {
    const albums = await fetchAlbumsForList();
    return {
      id: albums.id,
      name: albums.name,
      albums: albums.albums
    };
  } catch (error) {
    console.error('Error fetching list and albums:', error);
    throw error;
  }
};


export const addList = async (name: string, userId: string) => {
    const response = await GraphQLAPI.graphql(Amplify as any, 
      graphqlOperation(createList, { input: { name, userId } } ),
      {}
    );
    // Check if the result is a Promise or Observable
    if (response instanceof Observable) {
      throw new Error('Expected a non-subscription query/mutation but received a subscription.');
    }

    return response.data.createList;
};

export const removeAlbum = async (id: string) => {
  try {
    const response = await GraphQLAPI.graphql(
      Amplify as any,
      graphqlOperation(deleteAlbum, { input: { id } }),
      {}
    );

    if (response instanceof Observable) {
      throw new Error('Expected a non-subscription query/mutation but received a subscription.');
    }

    const typedResponse = response as GraphQLResult<any>;

    if (typedResponse.data?.deleteAlbum) {
      return typedResponse.data.deleteAlbum;
    } else {
      throw new Error('Unexpected response structure.');
    }
  } catch (error) {
    console.error('Error deleting album:', error);
    throw error;
  }
};

export const removeList = async (id: string) => {
  try {
    const response = await GraphQLAPI.graphql(
      Amplify as any,
      graphqlOperation(deleteList, { input: { id } }),
      {}
    );

    if (response instanceof Observable) {
      throw new Error('Expected a non-subscription query/mutation but received a subscription.');
    }

    const typedResponse = response as GraphQLResult<any>;

    if (typedResponse.data?.deleteList) {
      return typedResponse.data.deleteList;
    } else {
      throw new Error('Unexpected response structure.');
    }
  } catch (error) {
    console.error('Error deleting list:', error);
    throw error;
  }
};

export const fetchAlbumListEntriesForAlbumId = async (albumId: string, userId: string) => {
  let allEntries: any[] = [];
  let nextToken: string | null = null;

  do {
    try {
      const response = await GraphQLAPI.graphql(
        Amplify as any,
        graphqlOperation(albumListsByAlbumIdAndId, { filter: {
          albumId: { eq: albumId },
          userId: { eq: userId },
        }, 
        limit: 100, nextToken }),
        {}
      );

      if (response instanceof Observable) {
        throw new Error('Expected a non-subscription query/mutation but received a subscription.');
      }

      const typedResponse = response as GraphQLResult<any>;
      if (typedResponse.data?.albumListsByAlbumIdAndId?.items?.length) {
        allEntries = allEntries.concat(typedResponse.data.albumListsByAlbumIdAndId.items);
        nextToken = typedResponse.data.albumListsByAlbumIdAndId.nextToken;
      } else {
        nextToken = null;
      }
    } catch (error) {
      console.error('Error fetching AlbumList entries:', error);
      break;
    }
  } while (nextToken);

  return allEntries;
};

export const fetchAlbumListEntriesForListId = async (listId: string) => {
  let allEntries: any[] = [];
  let nextToken: string | null = null;

  do {
    try {
      const response = await GraphQLAPI.graphql(
        Amplify as any,
        graphqlOperation(albumListsByListIdAndId, { listId, limit: 100, nextToken }),
        {}
      );

      if (response instanceof Observable) {
        throw new Error('Expected a non-subscription query/mutation but received a subscription.');
      }

      const typedResponse = response as GraphQLResult<any>;
      if (typedResponse.data?.albumListsByListIdAndId?.items?.length) {
        allEntries = allEntries.concat(typedResponse.data.albumListsByListIdAndId.items);
        nextToken = typedResponse.data.albumListsByListIdAndId.nextToken;
      } else {
        nextToken = null;
      }
    } catch (error) {
      console.error('Error fetching AlbumList entries:', error);
      break;
    }
  } while (nextToken);

  return allEntries;
};

export const fetchAlbumListEntry = async (listId: string, albumId: string) => {
  try {
    let nextToken = null;
    do {
      const response = await GraphQLAPI.graphql(
        Amplify as any,
        graphqlOperation(albumListsByListIdAndId, {
          listId,
          filter: { albumId: { eq: albumId } },
          nextToken,
        }),
        {}
      );

      const typedResponse = response as GraphQLResult<any>;
      if (typedResponse.data?.albumListsByListIdAndId?.items?.length) {
        return typedResponse.data.albumListsByListIdAndId.items[0]; // Return the first match
      }
      nextToken = typedResponse.data?.albumListsByListIdAndId?.nextToken;
    } while (nextToken);
    throw new Error('AlbumList entry not found');
  } catch (error) {
    console.error('Error fetching AlbumList entry:', error);
    throw error;
  }
};

export const removeAlbumFromList = async (id: string) => {

  try {
    const response = await GraphQLAPI.graphql(
      Amplify as any,
      graphqlOperation(deleteAlbumList, { input: { id } }),
      {}
    );

    if (response instanceof Observable) {
      throw new Error('Expected a non-subscription query/mutation but received a subscription.');
    }

    const typedResponse = response as GraphQLResult<any>;
    if (typedResponse.data?.deleteAlbumList) {
      return typedResponse.data.deleteAlbumList;
    } else {
      throw new Error('Unexpected response structure.');
    }
  } catch (error) {
    console.error('Error removing album from list:', error);
    throw error;
  }

};

async function fetchAllAlbumListEntriesByAlbumIdAndListId(albumId: string, listId: string) {
  const allEntries = [];
  let nextToken: string | null = null;

  do {

    const response = await GraphQLAPI.graphql(Amplify as any, 
      graphqlOperation(listAlbumLists, {
        filter: {
          albumId: { eq: albumId },
          listId: { eq: listId },
        },
        nextToken, // Pass the current token to fetch the next page
      }),
      {}
    );

    if (response instanceof Observable) {
      throw new Error('Expected a non-subscription query/mutation but received a subscription.');
    }

    const existingEntries = response as GraphQLResult<any>;

    if (!existingEntries || !existingEntries.data?.listAlbumLists) {
      throw new Error('Failed to fetch album list entries.');
    }

    // Collect items from the current page
    const currentItems = existingEntries.data.listAlbumLists.items || [];
    allEntries.push(...currentItems);

    // Update the token for the next page
    nextToken = existingEntries.data.listAlbumLists.nextToken;

  } while (nextToken); // Continue until there's no next page

  return allEntries;
}

export const addAlbumToList = async (albumId: string, listId: string) => {

  const existingEntries = await fetchAllAlbumListEntriesByAlbumIdAndListId(albumId, listId);

  if (existingEntries.length > 0) {
    throw new Error('This album is already in the list.');
  }

  const response = await GraphQLAPI.graphql(Amplify as any, 
    graphqlOperation(createAlbumList, { input: { albumId, listId, played: false } }),
    {}
  );
  // Check if the result is a Promise or Observable
  if (response instanceof Observable) {
    throw new Error('Expected a non-subscription query/mutation but received a subscription.');
  }

  return response;
};

export const fetchRandomAlbum = async (userId: string) => {
  const albums = await fetchAlbums(userId);
  if (albums.length > 0) {
    const randomIndex = Math.floor(Math.random() * albums.length);
    return albums[randomIndex];
  }
  return null;
};

export { listLists };

export const fetchWikipediaLink = async (albumName: string, artistName: string): Promise<string | null> => {
  const queries = [
    `${albumName}`,                // Search for album name first
    `${albumName} ${artistName}`,  // Album and artist name combined
    `${artistName}`                // Artist name as fallback
  ];

  const wikipediaApiUrl = (query: string) =>
    `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=${encodeURIComponent(query)}`;

  try {
    for (const query of queries) {
      const response = await fetch(wikipediaApiUrl(query));
      const data = await response.json();

      if (data.query && data.query.search && data.query.search.length > 0) {
        // Search results found
        const searchResults = data.query.search;

        // Attempt to find the most relevant page
        for (const result of searchResults) {
          const pageTitle = result.title;

          // Check if the page title matches closely with the album name
          if (
            pageTitle.toLowerCase().includes(albumName.toLowerCase()) ||
            pageTitle.toLowerCase().includes(artistName.toLowerCase())
          ) {
            return `https://en.wikipedia.org/wiki/${encodeURIComponent(pageTitle)}`;
          }
        }
      }
    }

    return null; // No relevant Wikipedia page found
  } catch (error) {
    console.error('Error fetching Wikipedia link:', error);
    return null;
  }
};

export const togglePlayedAlbumList = async (albumListId: string, played: boolean) => {
  try {
    const response = await GraphQLAPI.graphql(
      Amplify as any,
      graphqlOperation(togglePlayed, { id: albumListId, played }), // Use `id` as expected by the mutation
      {}
    );

    if (response instanceof Observable) {
      throw new Error('Expected a non-subscription query/mutation but received a subscription.');
    }

    return response;
  } catch (error) {
    console.error('Error toggling played album list:', error);
    return null;
  }
};

export const toggleHideAlbum = async (albumId: string, hideAlbum: boolean) => {
  try {
    const response = await GraphQLAPI.graphql(
      Amplify as any,
      graphqlOperation(toggleHidden, { id: albumId, hideAlbum }), // Use `id` as expected by the mutation
      {}
    );

    if (response instanceof Observable) {
      throw new Error('Expected a non-subscription query/mutation but received a subscription.');
    }

    return response;
  } catch (error) {
    console.error('Error toggling hide album:', error);
    return null;
  }
};


export const getUnplayedAlbumsInList = async (listId: string) => {
  let allUnplayedAlbums: any[] = [];
  let nextToken: string | null = null;

  do {
    try {
      const response = await GraphQLAPI.graphql(
        Amplify as any,
        graphqlOperation(getUnplayedAlbums, { listId, nextToken, limit: 10000 }),
        {}
      );

      if (response instanceof Observable) {
        throw new Error('Expected a non-subscription query/mutation but received a subscription.');
      }

      const typedResponse = response as GraphQLResult<any>;
      const items = typedResponse.data?.listAlbumLists?.items || [];
      nextToken = typedResponse.data.listAlbumLists?.nextToken || null;

      allUnplayedAlbums = allUnplayedAlbums.concat(items);

    } catch (err) {
      console.error('Error fetching unplayed albums:', err);
      break;
    }
  } while (nextToken);

  return allUnplayedAlbums;
};

export async function fetchListeningPile(userId: string) {
  const allEntries: ListeningPileEntry[] = [];
  let nextToken: string | null = null;

  do {
    const response = await GraphQLAPI.graphql(
      Amplify as any,
      graphqlOperation(listListeningPileEntries, {
        filter: { userId: { eq: userId } },
        limit: 50, // Adjust limit as needed
        nextToken,
      }),
      {}
    );

    if (response instanceof Observable) {
      throw new Error('Expected a non-subscription query/mutation but received a subscription.');
    }

    const existingEntries = response as GraphQLResult<any>;

    if (!existingEntries || !existingEntries.data?.listListeningPileEntries) {
      throw new Error('Failed to fetch listening pile.');
    }

    const currentItems = existingEntries.data.listListeningPileEntries.items || [];
    allEntries.push(...currentItems);

    nextToken = existingEntries.data.listListeningPileEntries.nextToken;
  } while (nextToken);

  return allEntries.sort((a, b) => a.order - b.order); // Ensure sorting
}

export async function reorderListeningPile(entryId: string, newOrder: number) {
  const response = await GraphQLAPI.graphql(
    Amplify as any,
    graphqlOperation(reorderListeningPile, {
      input: {
        id: entryId,
        order: newOrder,
      },
    }),
    {}
  );

  if (response instanceof Observable) {
    throw new Error('Expected a non-subscription query/mutation but received a subscription.');
  }

  return response as GraphQLResult<any>;
}

export async function removeFromListeningPile(entryId: string) {
  const response = await GraphQLAPI.graphql(
    Amplify as any,
    graphqlOperation(deleteListeningPileEntry, {
      input: { id: entryId },
    }),
    {}
  );

  if (response instanceof Observable) {
    throw new Error('Expected a non-subscription query/mutation but received a subscription.');
  }

  return response as GraphQLResult<any>;
}

async function fetchAllListeningPileEntriesByAlbumId(albumId: string, userId: string) {
  const allEntries: any[] = [];
  let nextToken: string | null = null;

  do {
    const response = await GraphQLAPI.graphql(
      Amplify as any,
      graphqlOperation(listListeningPileEntries, {
        filter: { albumId: { eq: albumId }, userId: { eq: userId} },
        nextToken,
      }),
      {}
    );

    if (response instanceof Observable) {
      throw new Error('Expected a non-subscription query/mutation but received a subscription.');
    }

    const existingEntries = response as GraphQLResult<any>;

    if (!existingEntries || !existingEntries.data?.listListeningPileEntries) {
      throw new Error('Failed to fetch listening pile entries.');
    }

    const currentItems = existingEntries.data.listListeningPileEntries.items || [];
    allEntries.push(...currentItems);

    nextToken = existingEntries.data.listListeningPileEntries.nextToken;
  } while (nextToken);

  return allEntries;
}

async function getHighestListeningPileOrder(userId: string): Promise<number> {
  const response = await GraphQLAPI.graphql(
    Amplify as any,
    graphqlOperation(listListeningPileEntries, {
      filter: { userId: { eq: userId } },
      limit: 1,  // Only fetch one item, sorted by order in descending order to get the highest one
      sortDirection: 'DESC',
    }),
    {}
  );

  if (response instanceof Observable) {
    throw new Error('Expected a non-subscription query/mutation but received a subscription.');
  }

  const result = response as GraphQLResult<any>;

  if (!result || !result.data || !result.data.listListeningPileEntries) {
    throw new Error('Failed to fetch listening pile entries.');
  }

  // If no entries exist, return 0 (start at the first position)
  const highestOrder = result.data.listListeningPileEntries.items.length > 0
    ? result.data.listListeningPileEntries.items[0].order
    : 0;

  return highestOrder;
}

export async function addAlbumToListeningPile(albumId: string, userId: string): Promise<GraphQLResult<any>> {

  const highestOrder = await getHighestListeningPileOrder(userId);  // Get the highest order value

  console.log('Highest order in pile is:', highestOrder);
  // Check if the album is already in the listening pile
  const existingEntries = await fetchAllListeningPileEntriesByAlbumId(albumId, userId);

  if (existingEntries.length > 0) {
    throw new Error('This album is already in the listening pile.');
  }

  const newOrder = highestOrder + 1;
  console.log(`Adding album to listening pile with order ${newOrder} and albumId ${albumId}`);
  const response = await GraphQLAPI.graphql(
    Amplify as any,
    graphqlOperation(createListeningPileEntry, {
      input: { 
        albumId: albumId, 
        userId: userId,
        order: newOrder 
      },
    }),
    {}
  );

  if (response instanceof Observable) {
    throw new Error('Expected a non-subscription query/mutation but received a subscription.');
  }

  const result = response as GraphQLResult<any>;

  if (!result || !result.data || !result.data.createListeningPileEntry) {
    throw new Error('Failed to add album to listening pile.');
  }

  return result;
}

