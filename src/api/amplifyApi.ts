import { GraphQLAPI, graphqlOperation } from '@aws-amplify/api-graphql';
import { createAlbum, createList, deleteList, addAlbumToList as addAlbumToListMutation, deleteAlbum, createAlbumList, deleteAlbumList } from '../graphql/mutations';
import { albumListsByAlbumIdAndId, albumListsByListIdAndId, getAlbum, listAlbums, listLists, listListsWithAlbums } from '../graphql/queries';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { Amplify } from '@aws-amplify/core';
import { Observable } from 'rxjs';
import { AlbumData } from '../model';
import { List } from '../API';

export const addAlbum = async (albumData: AlbumData): Promise<GraphQLResult<any>> => {
  try {
    const graphqlParams = graphqlOperation(createAlbum, { input: albumData });

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
        spotifyUrl: album.spotifyUrl,
        imageUrl: album.imageUrl,
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching album by ID:', error);
    return null;
  }
}

export const fetchAlbums = async () => {
  try {
    const response = await GraphQLAPI.graphql(
      Amplify as any, 
      graphqlOperation(listAlbums),
      {}
    );

    // Check if the result is a Promise or Observable
    if (response instanceof Observable) {
      throw new Error('Expected a non-subscription query/mutation but received a subscription.');
    }

    // Ensure response is properly typed
    const typedResponse = response as GraphQLResult<any>;

    // Access the `data` field
    if (typedResponse.data && typedResponse.data.listAlbums) {
      return typedResponse.data.listAlbums.items.map((item: AlbumData) => ({
        id: item.id,
        name: item.name,
        artist: item.artist,
        release_date: item.release_date,
        spotifyUrl: item.spotifyUrl,
        imageUrl: item.imageUrl,
      }));
    }

    throw new Error('Unexpected response structure.');
  } catch (error) {
    console.error('Error fetching albums:', error);
    return [];
  }
};

export const fetchLists = async () => {

  try {
    const response = await GraphQLAPI.graphql(
      Amplify as any, 
      graphqlOperation(listListsWithAlbums),
      {}
    );

    // Check if the result is a Promise or Observable
    if (response instanceof Observable) {
      throw new Error('Expected a non-subscription query/mutation but received a subscription.');
    }

    // Ensure response is properly typed
    const typedResponse = response as GraphQLResult<any>;

    // Access the `data` field
    if (typedResponse.data && typedResponse.data.listLists) {
      return typedResponse.data.listLists.items.map((item: List) => ({
        id: item.id,
        name: item.name,
        albums: item.albums?.items.map((albumListItem: any) => ({
          id: albumListItem.album.id,
          name: albumListItem.album.name,
          artist: albumListItem.album.artist,
          spotifyUrl: albumListItem.album.spotifyUrl,
          releaseDate: albumListItem.album.release_date,
          imageUrl: albumListItem.album.imageUrl,
        })),
      }));
    }

    throw new Error('Unexpected response structure.');
  } catch (error) {
    console.error('Error fetching lists:', error);
    return [];
  }
};

export const addList = async (name: string) => {
    const response = await GraphQLAPI.graphql(Amplify as any, 
      graphqlOperation(createList, { input: { name } } ),
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


export const fetchAlbumListEntriesForAlbumId = async (albumId: string) => {
  try {
    const response = await GraphQLAPI.graphql(
      Amplify as any,
      graphqlOperation(albumListsByAlbumIdAndId, {
        albumId
      }),
      {}
    );

    const typedResponse = response as GraphQLResult<any>;
    if (typedResponse.data?.albumListsByAlbumIdAndId?.items?.length) {
      return typedResponse.data.albumListsByAlbumIdAndId.items;
    }
    console.debug('AlbumList entries not found for album with id: ', albumId);
    return undefined;
  } catch (error) {
    console.error('Error fetching AlbumList entries:', error);
    throw error;
  }
};

export const fetchAlbumListEntriesForListId = async (listId: string) => {
  try {
    const response = await GraphQLAPI.graphql(
      Amplify as any,
      graphqlOperation(albumListsByListIdAndId, {
        listId
      }),
      {}
    );

    const typedResponse = response as GraphQLResult<any>;
    if (typedResponse.data?.albumListsByListIdAndId?.items?.length) {
      return typedResponse.data.albumListsByListIdAndId.items;
    }
    console.debug('AlbumList entries not found for list with id: ', listId);
    return undefined;
  } catch (error) {
    console.error('Error fetching AlbumList entries:', error);
    throw error;
  }
};

export const fetchAlbumListEntry = async (listId: string, albumId: string) => {
  try {
    const response = await GraphQLAPI.graphql(
      Amplify as any,
      graphqlOperation(albumListsByListIdAndId, {
        listId,
        filter: { albumId: { eq: albumId } },
      }),
      {}
    );

    const typedResponse = response as GraphQLResult<any>;
    if (typedResponse.data?.albumListsByListIdAndId?.items?.length) {
      return typedResponse.data.albumListsByListIdAndId.items[0]; // Return the first match
    }
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

export const addAlbumToList = async (albumId: string, listId: string) => {
  const response = await GraphQLAPI.graphql(Amplify as any, 
    graphqlOperation(createAlbumList, { input: { albumId, listId } }),
    {}
  );
  // Check if the result is a Promise or Observable
  if (response instanceof Observable) {
    throw new Error('Expected a non-subscription query/mutation but received a subscription.');
  }

  return response;
};

export const fetchRandomAlbum = async () => {
  const albums = await fetchAlbums();
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

