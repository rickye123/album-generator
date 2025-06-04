import { addAlbumToList, fetchAlbumListEntriesForAlbumId, fetchAlbumListEntry, fetchAlbumListsWithNames, fetchAlbumsByListId, getUnplayedAlbumsInList as fetchUnplayedAlbumsInList, toggleHideAlbum, togglePlayedAlbumList } from "../../api/amplifyApi";
import { albumListStore, albumListWithNamesStore, cacheData, clearAlbumCache, clearListCache, getCachedData, unplayedAlbumsStore } from "../../core/caching";
import { ListData } from "../../model";

export const getAlbumsByListId = async (listId: string): Promise<ListData> => {
    const cachedAlbums = await getCachedData(albumListStore, listId);
    if (cachedAlbums) {
        return cachedAlbums;
    }
    const albums = await fetchAlbumsByListId(listId);
    await cacheData(albumListStore, listId, albums);
    return albums;
}

export const getAlbumListsWithNames = async (albumId: string) => {
    const cachedAlbums = await getCachedData(albumListWithNamesStore, albumId);
    if (cachedAlbums) {
        return cachedAlbums;
    }
    const albumListsWithNames = await fetchAlbumListsWithNames(albumId);
    await cacheData(albumListWithNamesStore, albumId, albumListsWithNames);
    return albumListsWithNames;
}

export const getUnplayedAlbumsInList = async (listId: string) => {
    const cachedUnplayedAlbums = await getCachedData(unplayedAlbumsStore, listId);
    if (cachedUnplayedAlbums) {
        return cachedUnplayedAlbums;
    }
    const albumList = await fetchUnplayedAlbumsInList(listId);
    await cacheData(unplayedAlbumsStore, listId, albumList);
    return albumList;
}

export const getAlbumListEntry = async (listId: string, albumId: string) => {
    return await fetchAlbumListEntry(listId, albumId);
}

export const getAlbumListEntriesForAlbumId = async (albumId: string) => {
    return await fetchAlbumListEntriesForAlbumId(albumId);
}

export const togglePlayedAlbum = async (userId: string, listId: string, albumListId: string, played: boolean) => {
    clearListCache(userId, listId);
    return await togglePlayedAlbumList(albumListId, played);
}

export const toggleHideAlbumForUser = async (userId: string, albumId: string, hideAlbum: boolean) => {
    clearAlbumCache(userId, albumId);
    return await toggleHideAlbum(albumId, hideAlbum);
}

export const addAlbumToListForUser = async (albumId: string, listId: string, userId: string) => {
    clearListCache(userId, listId);
    return await addAlbumToList(albumId, listId, userId);
}