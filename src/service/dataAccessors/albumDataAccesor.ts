import { GraphQLResult } from "@aws-amplify/api-graphql";
import { AlbumData } from "../../model";
import { addAlbum, fetchAlbums, removeAlbum, removeListeningPileEntry, updateAlbumDetails, getRecentAlbums } from "../../api/amplifyApi";
import { albumStore, cacheData, clearAlbumCache, getCachedData, recentAlbumsStore } from "../../core/caching";
import { getAlbumListEntriesForAlbumId } from "./albumListDataAccessor";
import { deleteAlbumFromList } from "./listDataAccessor";

export const createAlbum = async (albumData: AlbumData, userId: string): Promise<GraphQLResult<any>> => {
    clearAlbumCache(userId, albumData.id);
    return await addAlbum(albumData, userId);
}

export const getRandomAlbum = async (userId: string) => {
    const albums = await getAlbumsByUser(userId);
    if (albums.length > 0) {
        const hideAlbumsFlag = localStorage.getItem('hideAlbums') === 'true';

        const albumsToUse = hideAlbumsFlag
            ? albums.filter((album: AlbumData) => album.hideAlbum !== true)
            : albums;
        const randomIndex = Math.floor(Math.random() * albumsToUse.length);
        return albumsToUse[randomIndex];
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

export const getRecentAlbumsByUser = async (userId: string) => {
    const cachedAlbums = await getCachedData(recentAlbumsStore, userId);
    console.log('Cached recent albums:', cachedAlbums);
    if (cachedAlbums) {
        return cachedAlbums;
    }
    console.log('Fetching recent albums for user:', userId);
    const albums = await getRecentAlbums(userId);
    await cacheData(recentAlbumsStore, userId, albums);
    return albums;
};

export const deleteAlbum = async (albumId: string, userId: string) => {
    clearAlbumCache(userId, albumId);
    return await removeAlbum(albumId);
}

export const deleteAlbumByUser = async (albumId: string, userId: string) => {

    const results = await getAlbumListEntriesForAlbumId(albumId);
    if (results) {
        if (results) {
            for (const element of results) {
                await deleteAlbumFromList(element.id, userId);
            }
        }
    }

    await removeListeningPileEntry(albumId, userId);

    await deleteAlbum(albumId, userId);
}

export const updateAlbumDetailsByUser = async (albumData: AlbumData, userId: string): Promise<GraphQLResult<any>> => {
    clearAlbumCache(userId, albumData.id);
    return await updateAlbumDetails(albumData);
}