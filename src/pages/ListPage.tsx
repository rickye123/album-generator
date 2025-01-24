import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  fetchAlbumListEntry,
  fetchAlbumsByListId,
  getUnplayedAlbumsInList,
  removeAlbumFromList,
  togglePlayedAlbumList,
} from '../api/amplifyApi';
import darkStyles from '../styles/modules/AlbumList-dark.module.css';
import lightStyles from '../styles/modules/AlbumList-light.module.css';
import { ListData } from '../model';
import AlbumTable from '../components/AlbumTable';
import AlbumTableList from '../components/AlbumTableList';
import AlbumTableBlock from '../components/AlbumTableBlock';
import RandomAlbumOverlay from '../components/RandomAlbumOverlay';

const ListPage: React.FC = () => {
  const { listId } = useParams<{ listId: string }>();
  const [list, setList] = useState<ListData | null>(null);
  const [error, setError] = useState('');
  const [randomAlbum, setRandomAlbum] = useState<any | null>(null);
  const [menuOpen, setMenuOpen] = useState<{ [key: string]: boolean }>({});
  const [view, setView] = useState<'table' | 'list' | 'block'>('table'); // State to manage view
  const [theme] = useState<'light' | 'dark'>(() => {
    // Load theme preference from localStorage or default to 'light'
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });

  // Use the appropriate styles based on the current theme
  const styles = theme === 'dark' ? darkStyles : lightStyles;
  useEffect(() => {
    const loadLists = async () => {
      try {
        const foundList = await fetchAlbumsByListId(listId!);
        setList(foundList || null);
      } catch (err) {
        console.error('Error fetching list:', err);
        setError('Error loading list');
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

  const closeOverlay = () => setRandomAlbum(null);

  const toggleMenu = (albumId: string) => {
    setMenuOpen((prev) => ({
      ...prev,
      [albumId]: !prev[albumId],
    }));
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
    </div>
  );
};

export default ListPage;
