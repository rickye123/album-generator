import { addList, fetchLists, removeAlbumFromList, removeList } from "../../api/amplifyApi";
import { cacheData, clearCache, clearListCache, getCachedData, listStore, unplayedAlbumsStore } from "../../core/caching";

export const deleteList = async (listId: string, userId: string) => {
    clearListCache(userId, listId);
    return await removeList(listId);
}

export const createList = async (name: string, userId: string) => {
    clearCache(listStore, userId);
    return await addList(name, userId);
}

export const getListsByUser = async (userId: string) => {

    const cachedLists = await getCachedData(listStore, userId);
    if (cachedLists) {
        return cachedLists;
    }
    const lists = await fetchLists(userId);
    await cacheData(listStore, userId, lists);
    return lists;
}

export const deleteAlbumFromList = async (albumListEntryId: string, userId: string) => {
    return removeAlbumFromList(albumListEntryId);
}

export const deleteAlbumFromListForUser = async (albumListEntryId: string, listId: string, userId: string) => {
    clearListCache(userId, listId);
    return removeAlbumFromList(albumListEntryId);
}