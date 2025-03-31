import { GraphQLResult } from "@aws-amplify/api-graphql";
import { AlbumData } from "../../model";
import { addAlbum, fetchAlbums, removeAlbum, removeListeningPileEntry, updateAlbumDetails } from "../../api/amplifyApi";
import { albumListWithNamesStore, albumStore, cacheData, clearAlbumCache, getCachedData } from "../../core/caching";
import { getAlbumListEntriesForAlbumId } from "./albumListDataAccessor";
import { deleteAlbumFromList } from "./listDataAccessor";

export const createAlbum = async (albumData: AlbumData, userId: string): Promise<GraphQLResult<any>> => {
    clearAlbumCache(userId, albumData.id);
    return await addAlbum(albumData, userId);
}

export const getRandomAlbum = async (userId: string) => {
  const albums = await getAlbumsByUser(userId);
  if (albums.length > 0) {
    const randomIndex = Math.floor(Math.random() * albums.length);
    return albums[randomIndex];
  }
  return null;
};

export const getAlbumsByUser = async (userId: string) => {
    const cachedAlbums = await getCachedData(albumStore, userId);
    if (cachedAlbums) {
        return cachedAlbums;
    }
    const albums = await fetchAlbums(userId);
    await cacheData(albumStore, userId, albums);
    return albums;
}

export const deleteAlbum = async (albumId: string, userId: string) => {
    clearAlbumCache(userId, albumId);
    return await removeAlbum(albumId);
}

export const deleteAlbumByUser = async (albumId: string, userId: string) => {

    const results = await getAlbumListEntriesForAlbumId(albumId);
    if(results) {
        if (results) {
            for (const element of results) {
                console.log(`Deleting AlbumList entry ${element.id} for album ${albumId}`);
                await deleteAlbumFromList(element.id, userId);
            }
        }
    }
    
    console.log('Deleting ListeningPile entry for album:', albumId);
    await removeListeningPileEntry(albumId, userId);
    
    await deleteAlbum(albumId, userId);
}

export const updateAlbumDetailsByUser = async (albumData: AlbumData, userId: string): Promise<GraphQLResult<any>> => {
    clearAlbumCache(userId, albumData.id);
    return await updateAlbumDetails(albumData);
}