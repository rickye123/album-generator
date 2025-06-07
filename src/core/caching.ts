import { openDB } from "idb";

// cache for albumLists by listId
// cache for albums by user
// cache for lists by user
// cache for listeningPile by user
// cache for albumListsWithNames by albumId
// cache for unplayedAlbums by listId
export const albumStore = 'albums';
export const listStore = 'lists';
export const albumListStore = 'albumLists';
export const albumListWithNamesStore = 'albumListsWithNames';
export const listeningPileStore = 'listeningPile';
export const unplayedAlbumsStore = 'unplayedAlbums';
export const albumListEntriesStore = 'albumListEntries';
export const albumListEntryStore = 'albumListEntry';

const dbPromise = openDB("user-cache", 1, {
    upgrade(db) {
        if (!db.objectStoreNames.contains(listStore)) db.createObjectStore(listStore);
        if (!db.objectStoreNames.contains(albumStore)) db.createObjectStore(albumStore);
        if (!db.objectStoreNames.contains(albumListStore)) db.createObjectStore(albumListStore);
        if (!db.objectStoreNames.contains(albumListWithNamesStore)) db.createObjectStore(albumListWithNamesStore);
        if (!db.objectStoreNames.contains(listeningPileStore)) db.createObjectStore(listeningPileStore);
        if (!db.objectStoreNames.contains(unplayedAlbumsStore)) db.createObjectStore(unplayedAlbumsStore);
        if (!db.objectStoreNames.contains(albumListEntriesStore)) db.createObjectStore(albumListEntriesStore);
        if (!db.objectStoreNames.contains(albumListEntryStore)) db.createObjectStore(albumListEntryStore);
    },
});

export const cacheData = async (store: string, userId: string, data: any) => {
    const db = await dbPromise;
    await db.put(store, { data, timestamp: Date.now() }, userId);
};

export const getCachedData = async (store: string, userId: string, cacheDuration = 7 * 1440 * 60 * 1000) => {
    const db = await dbPromise;
    try {
        const cachedData = await db.get(store, userId);

        if (cachedData && Date.now() - cachedData.timestamp < cacheDuration) {
            console.log(`Cache hit for ${store}!`);
            return cachedData.data;
        }

        console.log(`Cache miss or expired for ${store}.`);
        return null;
    } catch (error) {
        console.error(`Error getting cached data for ${store}:`, error);
        return null;
    }
};

export const clearCache = async (store: string, userId: string) => {
    const db = await dbPromise;
    await db.delete(store, userId);
    console.log(`Cache cleared for ${store} (user: ${userId})`);
};

export const clearAlbumCache = async (userId: string, albumId: string) => {
    clearCache(albumStore, userId);
    clearCache(albumListWithNamesStore, albumId);
}

export const clearListCache = async (userId: string, listId: string) => {
    clearCache(albumListStore, listId);
    clearCache(unplayedAlbumsStore, listId);
    clearCache(listStore, userId);
}

export const clearAllCache = async (userId: string, listId: string, albumId: string) => {
    clearListCache(userId, listId);
    clearAlbumCache(userId, albumId);
}

// Clear all caches for a user (remove all stores for the user)
export const clearAllCachesForUser = async (userId: string) => {
    const db = await dbPromise;

    // Iterate through all stores to clear data for the specific userId
    for (let store of [listStore, albumStore, albumListStore, listeningPileStore, unplayedAlbumsStore, albumListWithNamesStore, albumListEntriesStore, albumListEntryStore]) {
        await db.delete(store, userId);
        console.log(`Cache cleared for ${store} (user: ${userId})`);
    }
};