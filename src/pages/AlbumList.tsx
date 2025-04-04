import { useEffect, useState } from 'react';
import { addAlbumToListeningPile, fetchAlbums } from '../api/amplifyApi';
import { AlbumData, AlbumListData, ListData } from '../model';
import darkStyles from '../styles/modules/AlbumList-dark.module.css';
import lightStyles from '../styles/modules/AlbumList-light.module.css';
import { useParams } from 'react-router-dom';
import AlbumTable from '../components/AlbumTable';
import AlbumTableList from '../components/AlbumTableList';
import AlbumTableBlock from '../components/AlbumTableBlock'; // Import the new component
import RandomAlbumOverlay from '../components/RandomAlbumOverlay';
import Loader from '../components/Loader';
import { getCurrentUserId } from '../core/users';
import { deleteAlbumByUser, getAlbumsByUser } from '../service/dataAccessors/albumDataAccesor';
import { getListsByUser } from '../service/dataAccessors/listDataAccessor';
import { addAlbumToListForUser, toggleHideAlbumForUser } from '../service/dataAccessors/albumListDataAccessor';

const AlbumList = () => {
  const [albums, setAlbums] = useState<AlbumData[]>([]);
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);
  const [lists, setLists] = useState<ListData[]>([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [touchTimer, setTouchTimer] = useState<number | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumData | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [error, setError] = useState('');
  const [menuOpen, setMenuOpen] = useState<{ [key: string]: boolean }>({});
  const { artist } = useParams<{ artist: string }>();
  const { year } = useParams<{ year: string }>();
  const { genre } = useParams<{ genre: string }>();
  const [randomAlbum, setRandomAlbum] = useState<any | null>(null);
  const [view, setView] = useState<'table' | 'list' | 'block'>('table'); // State to manage view
  const [theme] = useState<'light' | 'dark'>(() => {
    // Load theme preference from localStorage or default to 'light'
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });
  const [showHidden, setShowHidden] = useState(false)

  // Use the appropriate styles based on the current theme
  const styles = theme === 'dark' ? darkStyles : lightStyles;

  const getStats = () => {
    const totalAlbums = albums.length || 0;
    const hiddenAlbums = albums.filter((album) => album.hideAlbum).length || 0;
    return { totalAlbums,hiddenAlbums };
  };

  // Tooltip event handlers
  const handleMouseEnter = () => setShowTooltip(true);
  const handleMouseLeave = () => setShowTooltip(false);

  const handleTouchStart = () => {
    const timer = window.setTimeout(() => setShowTooltip(true), 500); // Show after holding for 500ms
    setTouchTimer(timer);
  };

  const handleTouchEnd = () => {
    if (touchTimer) {
      clearTimeout(touchTimer);
      setTouchTimer(null);
    }
    setShowTooltip(false);
  };

  useEffect(() => {
    const loadAlbums = async () => {
      setLoading(true);
      const userId = await getCurrentUserId();
      if (!userId) {
        throw new Error('User ID is undefined');
      }
      setUserId(userId)
      const albumList = await getAlbumsByUser(userId);
      albumList.filter((album: AlbumData) => album.hideAlbum === false);
      const filteredAlbums = artist
        ? albumList.filter((album: AlbumData) => album.artist === decodeURIComponent(artist))
        : albumList;
      const filteredByYear = year
        ? filteredAlbums.filter((album: AlbumData) => album.release_date.split('-')[0] === decodeURIComponent(year))
        : filteredAlbums;
        console.log('filteredByYear', filteredByYear);
        console.log('decodeURIComponent', decodeURIComponent(genre!));
      const filteredByGenre = genre
        ? filteredByYear.filter((album: AlbumData) => album.genres?.includes(decodeURIComponent(genre)))
        : filteredByYear;
      setAlbums(filteredByGenre);
      setLoading(false);
    };

    loadAlbums();
  }, [artist, year, genre]);

  const toggleShowHidden = () => {
    setShowHidden((prev) => !prev);
  };

  const openOverlay = async (album: AlbumData) => {
    try {
      const listData = await getListsByUser(userId);
      setLists(listData);
      setSelectedAlbum(album);
      setShowOverlay(true);
      setError('');
    } catch (err) {
      console.error('Error loading lists:', err);
      setError('Failed to load lists. Please try again.');
    }
  };

  const closeOverlay = () => {
    setShowOverlay(false);
    setSelectedAlbum(null);
  };

  const handleAddAlbumToList = async (listId: string) => {
    if (!selectedAlbum) return;

    try {
      await addAlbumToListForUser(selectedAlbum.id, listId, userId);
      alert(`${selectedAlbum.name} added to the list successfully!`);
      closeOverlay();
    } catch (err) {
      console.error('Error adding album to list:', err);
      setError('Failed to add album to the list. Please try again.');
    }
  };

  const handleDeleteAlbum = async (albumId: string, listId: string) => {
    try {
      // get album list entry (if one exists) and delete it
      deleteAlbumByUser(albumId, userId);
      setAlbums((prevAlbums) => prevAlbums.filter((album) => album.id !== albumId));
    } catch (err) {
      console.error('Error deleting album:', err);
      setError('Failed to delete the album. Please try again.');
    }
  };

  const handleHideAlbum = async (albumId: string, hidden: boolean) => {
    try {
      // Optimistically update the state
      setAlbums((prevAlbums) =>
        prevAlbums.map((album) =>
          album.id === albumId ? { ...album, hideAlbum: !hidden } : album
        )
      );
      await toggleHideAlbumForUser(userId, albumId, !hidden); // Toggle the current state
      console.log(`Album ${hidden ? 'unhidden' : 'hidden'} successfully!`);
    } catch (error) {
      console.error('Error hiding album:', error);
      alert('Failed to update album visibility.');

      // Optionally, refetch the albums to revert optimistic updates
      const updatedAlbums = await fetchAlbums(userId);
      setAlbums(updatedAlbums);
    }
  };

  const toggleMenu = (albumId: string) => {
    setMenuOpen((prev) => ({
      ...prev,
      [albumId]: !prev[albumId],
    }));
  };

  const filteredAlbums = showHidden ? albums : albums.filter((album) => !album.hideAlbum);

  const albumListData: AlbumListData[] = filteredAlbums.map(album => ({
    album,
    played: false,
  }));

  const randomizeAlbum = async () => {
    try {
      const randomised = filteredAlbums[Math.floor(Math.random() * filteredAlbums.length)];

      if (!randomised) {
        alert('No albums available to generate.');
        return;
      }
      const randomAlbum = {
        album: randomised,
        played: false,
      }
      setRandomAlbum(randomAlbum);
    } catch (err) {
      console.error('Error fetching random album:', err);
    }
  };

  const handleAddToListeningPile = async (albumId: string, userId: string) => {
    try {
      const response = await addAlbumToListeningPile(albumId, userId);
      console.log('Album added to listening pile:', response);
      alert('Album added to listening pile successfully!');
    } catch (error) {
      console.error('Error adding album to listening pile:', error);
      alert('Failed to add album to listening pile. Please try again.');
    }
  };

  const closeAlbumOverlay = () => setRandomAlbum(null);

  const renderView = () => {
    switch (view) {
      case 'table':
        return (
          <AlbumTable
            albums={albumListData}
            handleRemove={handleDeleteAlbum}
            toggleMenu={toggleMenu}
            menuOpen={menuOpen}
            openOverlay={openOverlay}
            hideAlbum={handleHideAlbum}
            handleAddToListeningPile={handleAddToListeningPile}
            userId={userId}
          />
        );
      case 'list':
        return (
          <AlbumTableList
            albums={albumListData}
            handleRemove={handleDeleteAlbum}
            toggleMenu={toggleMenu}
            menuOpen={menuOpen}
            openOverlay={openOverlay}
            hideAlbum={handleHideAlbum}
            userId={userId}
          />
        );
      case 'block':
        return <AlbumTableBlock albums={albumListData} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles['album-list-page']}>
      <h1
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {genre 
          ? `${genre} Albums`
          : year
          ? `${year}'s Albums`
          : artist
          ? `${artist}'s Albums`
          : 'All Albums'}
      </h1>
      {!loading && showTooltip && (
        <div className={styles['tooltip']}>
          <p>Total Albums: {getStats().totalAlbums}</p>
          <p>Hidden Albums: {getStats().hiddenAlbums}</p>
        </div>
      )}

      <button className={styles['list-page-randomize-button']} onClick={randomizeAlbum}>
        Generate Random Album
      </button>

      <div className={styles['view-toggle']}>
        <button onClick={() => setView('table')} className={view === 'table' ? styles['active'] : ''}>Table View</button>
        <button onClick={() => setView('list')} className={view === 'list' ? styles['active'] : ''}>List View</button>
        <button onClick={() => setView('block')} className={view === 'block' ? styles['active'] : ''}>Block View</button>
      </div>
      <div className={styles['list-page-switch']}>
        <label>
          <input type="checkbox" checked={showHidden} onChange={toggleShowHidden} />
          <span className={styles['list-page-slider']}></span>
        </label>
      </div>
      {loading ? <Loader /> : albums.length === 0 ? (
        <p className={styles['no-albums']}>No albums found.</p>
      ) : (
        renderView()
      )}
      {showOverlay && selectedAlbum && (
        <div className={styles['overlay']}>
          <div className={styles['overlay-content']}>
            <h2>Add {selectedAlbum.name} to a List</h2>
            {error && <p className={styles['error-message']}>{error}</p>}
            {lists.length === 0 ? (
              <p>No lists available. Please create one first.</p>
            ) : (
              <select
                  className={styles['list-select-dropdown']}
                  onChange={(e) => handleAddAlbumToList(e.target.value)}
                >
                  <option value="" disabled selected>
                    Select a list
                  </option>
                  {lists.map((list) => (
                    <option key={list.id} value={list.id}>
                      {list.name}
                    </option>
                  ))}
              </select>
            )}
            <button className={styles['close-overlay-button']} onClick={closeOverlay}>
              Close
            </button>
          </div>
        </div>
      )}
      {randomAlbum && (
        <RandomAlbumOverlay
          randomAlbum={randomAlbum}
          onClose={closeAlbumOverlay}
          generateNext={randomizeAlbum}
        />
      )}
    </div>
  );
};

export default AlbumList;
