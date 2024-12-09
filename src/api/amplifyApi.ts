import { GraphQLAPI, graphqlOperation } from '@aws-amplify/api-graphql';
import { createAlbum, createList, deleteList, addAlbumToList as addAlbumToListMutation } from '../graphql/mutations';
import { getAlbum, listAlbums, listLists } from '../graphql/queries';
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

    console.log('Album added:', result);
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
      graphqlOperation(listLists),
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
      console.log(`typedResponse.data.listLists`);
      return typedResponse.data.listLists.items.map((item: List) => ({
        id: item.id,
        name: item.name,
        albums: item.albums
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

    console.log(`Result ${response}, data ${response.data}, createList ${response.data.createList}`);
    return response.data.createList;
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

export const addAlbumToList = async (albumId: string, listId: string) => {
  const response = await GraphQLAPI.graphql(Amplify as any, 
    graphqlOperation(addAlbumToListMutation, { albumId, listId }),
    {}
  );
  // Check if the result is a Promise or Observable
  if (response instanceof Observable) {
    throw new Error('Expected a non-subscription query/mutation but received a subscription.');
  }

  console.log(`Response ${response}`);
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
