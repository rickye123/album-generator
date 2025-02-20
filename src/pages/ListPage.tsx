import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  addAlbumToList,
  fetchAlbumListEntry,
  fetchAlbums,
  fetchAlbumsByListId,
  getUnplayedAlbumsInList,
  removeAlbumFromList,
  togglePlayedAlbumList,
} from '../api/amplifyApi';
import darkStyles from '../styles/modules/AlbumList-dark.module.css';
import lightStyles from '../styles/modules/AlbumList-light.module.css';
import { AlbumData, ListData } from '../model';
import AlbumTable from '../components/AlbumTable';
import AlbumTableList from '../components/AlbumTableList';
import AlbumTableBlock from '../components/AlbumTableBlock';
import RandomAlbumOverlay from '../components/RandomAlbumOverlay';

const ListPage: React.FC = () => {
  const { listId } = useParams<{ listId: string }>();
  const [addedAlbums, setAddedAlbums] = useState<{ [key: string]: boolean }>({});
  const [list, setList] = useState<ListData | null>(null);
  const [allAlbums, setAllAlbums] = useState<AlbumData[]>([]);
  const [error, setError] = useState('');
  const [randomAlbum, setRandomAlbum] = useState<any | null>(null);
  const [menuOpen, setMenuOpen] = useState<{ [key: string]: boolean }>({});
  const [view, setView] = useState<'table' | 'list' | 'block'>('table'); // State to manage view
  const [theme] = useState<'light' | 'dark'>(() => {
    // Load theme preference from localStorage or default to 'light'
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });

  const [showAddAlbumOverlay, setShowAddAlbumOverlay] = useState(false);
  // Use the appropriate styles based on the current theme
  const styles = theme === 'dark' ? darkStyles : lightStyles;
  useEffect(() => {
    const loadLists = async () => {
      try {
        const foundList = await fetchAlbumsByListId(listId!);
        setList(foundList || null);
      } catch (err) {
        console.error('Error fetching collection:', err);
        setError('Error loading collection');
      }
    };

    loadLists();
  }, [listId]);

  if (!list) return <div>Loading...</div>;

  const handleRemoveFromList = async (albumId: string, listId: string) => {
    try {
      const albumListEntry = await fetchAlbumListEntry(listId, albumId);

      if (!albumListEntry?.id) {
        throw new Error('Failed to find AlbumList entry for removal.');
      }

      await removeAlbumFromList(albumListEntry.id);
      const foundList = await fetchAlbumsByListId(listId!);
      setList(foundList || null);
    } catch (err) {
      console.error('Error removing album:', err);
      setError('Failed to remove the album. Please try again.');
    }
  };

  const togglePlayed = async (listId: string, albumId: string, played: boolean) => {
    try {

      // Optimistically update the state
      setList((prevList) => {
        if (!prevList) {
          return prevList;
        }

        return {
          ...prevList,
          items: prevList.albums.map((album) =>
            album.album.id === albumId ? { ...album, played: !played } : album
          ),
        };
      });

      const albumListEntry = await fetchAlbumListEntry(listId, albumId);

      if (!albumListEntry?.id) {
        throw new Error('Failed to find AlbumList entry for toggle.');
      }
      await togglePlayedAlbumList(albumListEntry.id, !played);
      const foundList = await fetchAlbumsByListId(listId!);
      setList(foundList || null);
    } catch (err) {
      console.error('Error toggling played status:', err);
      // Revert the optimistic update by refetching the list
      const updatedList = await fetchAlbumsByListId(listId!);
      setList(updatedList || null);

      alert('Failed to update the played status.');
    }
  };

  const bulkSetUnplayed = async () => {
    const confirmed = window.confirm('Are you sure you want to mark all albums as unplayed?');
    if (!confirmed) return;

    try {
      for (const album of list!.albums) {
        const albumListEntry = await fetchAlbumListEntry(list!.id, album.album.id);
        if (albumListEntry?.id && albumListEntry.played) {
          await togglePlayedAlbumList(albumListEntry.id, false);
        }
      }
      const foundList = await fetchAlbumsByListId(listId!);
      setList(foundList || null);
    } catch (err) {
      console.error('Error marking albums as unplayed:', err);
      setError('Failed to update albums. Please try again.');
    }
  };

  const fetchAllAlbums = async () => {
    try {
      const albums = await fetchAlbums();
      // cycle through all albums and remove any that are already in the list
      const albumIds = list.albums.map((album) => album.album.id);
      const filteredAlbums = albums.filter((album) => !albumIds.includes(album.id));
      setAllAlbums(filteredAlbums);
      setShowAddAlbumOverlay(true);
    } catch (err) {
      console.error('Error fetching albums:', err);
    }
  };

  const randomizeAlbum = async () => {
    try {
      const unplayedAlbums = await getUnplayedAlbumsInList(listId!);

      if (unplayedAlbums.length === 0) {
        alert('No unplayed albums available.');
        return;
      }

      const randomAlbum = unplayedAlbums[Math.floor(Math.random() * unplayedAlbums.length)];
      setRandomAlbum(randomAlbum);
    } catch (err) {
      console.error('Error fetching unplayed albums:', err);
    }
  };

  const handleAddAlbumToList = async (albumId: string) => {
    try {
      await addAlbumToList(albumId, list.id);
      const updatedList = await fetchAlbumsByListId(listId!);
      setList(updatedList || null);
      setAddedAlbums((prev) => ({ ...prev, [albumId]: true }));
    } catch (err) {
      console.error('Error adding album to collection:', err);
      setError('Failed to add album. Please try again.');
      alert('Album failed to be added to collection');
    }
  };

  const closeOverlay = () => setRandomAlbum(null);

  const toggleMenu = (albumId: string) => {
    setMenuOpen((prev) => ({
      ...prev,
      [albumId]: !prev[albumId],
    }));
  };

  const renderAddButton = (albumId: string) => {
    return addedAlbums[albumId] ? (
      <span className={styles['added-tick']}>&#10003;</span>
    ) : (
      <button
        className={styles['custom-add-button']}
        onClick={() => handleAddAlbumToList(albumId)}
      >
        Add
      </button>
    );
  };

  const renderView = () => {
    switch (view) {
      case 'table':
        return (
          <AlbumTable
            albums={list.albums}
            listId={list.id}
            handleRemove={handleRemoveFromList}
            togglePlayed={togglePlayed}
            toggleMenu={toggleMenu}
            menuOpen={menuOpen}
          />
        );
      case 'list':
        return (
          <AlbumTableList
            albums={list.albums}
            listId={list.id}
            handleRemove={handleRemoveFromList}
            togglePlayed={togglePlayed}
            toggleMenu={toggleMenu}
            menuOpen={menuOpen}
          />
        );
      case 'block':
        return (
          <AlbumTableBlock albums={list.albums} />
        );
      default:
        return null;
    }
  };

  const renderAddAlbumOverlay = () => (
    <div className={styles['add-album-overlay']}>
      <div className={styles['add-album-overlay-content']}>
        <h2>Add Albums to {list.name}</h2>
        <button
          className={styles['list-page-close-button']}
          onClick={() => setShowAddAlbumOverlay(false)}
        >
          &times;
        </button>
        {allAlbums.length === 0 ? (
          <p>No albums to add</p>
        ) : (
            <AlbumTable
            albums={allAlbums.map((album) => ({ album, played: false }))}
            listId={listId!}
            handleAdd={handleAddAlbumToList} // Add album to list
            renderCustomButton={renderAddButton} // Custom button to add album
            />
        )}
      </div>
    </div>
  );

  return (
    <div className={styles['album-list-page']}>
      <h1 className={styles['list-page-title']}>{list.name}</h1>
      {error && <p className={styles['list-page-error']}>{error}</p>}

      <button className={styles['list-page-randomize-button']} onClick={randomizeAlbum}>
        Generate Unplayed Album
      </button>

      <button className={styles['list-page-unplayed-button']} onClick={bulkSetUnplayed}>
        Mark All as Unplayed
      </button>

      <button
        className={styles['list-page-randomize-button']}
        onClick={() => fetchAllAlbums()}
      >
        Add Albums to List
      </button>

      <div className={styles['view-toggle']}>
        <button onClick={() => setView('table')} className={view === 'table' ? styles['active'] : ''}>Table View</button>
        <button onClick={() => setView('list')} className={view === 'list' ? styles['active'] : ''}>List View</button>
        <button onClick={() => setView('block')} className={view === 'block' ? styles['active'] : ''}>Block View</button>
      </div>

      {list.albums?.length === 0 ? (
        <p className={styles['no-albums']}>No albums found.</p>
      ) : (
        renderView()
      )}

      {randomAlbum && (
        <RandomAlbumOverlay
          randomAlbum={randomAlbum}
          onClose={closeOverlay}
          togglePlayed={togglePlayed}
          listId={list.id}
        />
      )}
      {showAddAlbumOverlay && renderAddAlbumOverlay()}
    </div>
  );
};

export default ListPage;
