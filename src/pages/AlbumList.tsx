import { useEffect, useState } from 'react';
import { fetchAlbums, fetchLists, addAlbumToList, removeAlbum, fetchAlbumListEntriesForAlbumId, removeAlbumFromList } from '../api/amplifyApi';
import { AlbumData, AlbumListData, ListData } from '../model';
import '../styles/AlbumList.css'; // Update the import statement
import darkStyles from '../styles/AlbumList-dark.module.css';
import lightStyles from '../styles/AlbumList-light.module.css';
import { useParams } from 'react-router-dom';
import AlbumTable from '../components/AlbumTable';
import AlbumTableList from '../components/AlbumTableList';
import AlbumTableBlock from '../components/AlbumTableBlock'; // Import the new component

const AlbumList = () => {
  const [albums, setAlbums] = useState<AlbumData[]>([]);
  const [lists, setLists] = useState<ListData[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumData | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [error, setError] = useState('');
  const [menuOpen, setMenuOpen] = useState<{ [key: string]: boolean }>({});
  const { artist } = useParams<{ artist: string }>();
  const { year } = useParams<{ year: string }>();
  const { genre } = useParams<{ genre: string }>();
  const [view, setView] = useState<'table' | 'list' | 'block'>('table'); // State to manage view
  const [theme] = useState<'light' | 'dark'>(() => {
    // Load theme preference from localStorage or default to 'light'
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });

  // Use the appropriate styles based on the current theme
  const styles = theme === 'dark' ? darkStyles : lightStyles;

  useEffect(() => {
    const loadAlbums = async () => {
      const albumList = await fetchAlbums();

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
    };

    loadAlbums();
  }, [artist, year, genre]);

  const openOverlay = async (album: AlbumData) => {
    try {
      const listData = await fetchLists();
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
      await addAlbumToList(selectedAlbum.id, listId);
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
      const results = await fetchAlbumListEntriesForAlbumId(albumId);
      console.log('Result: ', results);
      if(results) {
        // delete each album list entry
        results.forEach(async (element: { id: string; }) => {
          await removeAlbumFromList(element.id);
        });
      }

      await removeAlbum(albumId);
      setAlbums((prevAlbums) => prevAlbums.filter((album) => album.id !== albumId));
    } catch (err) {
      console.error('Error deleting album:', err);
      setError('Failed to delete the album. Please try again.');
    }
  };

  const toggleMenu = (albumId: string) => {
    setMenuOpen((prev) => ({
      ...prev,
      [albumId]: !prev[albumId],
    }));
  };

  const albumListData: AlbumListData[] = albums.map(album => ({
    album,
    played: false,
  }));

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
      <h1>
        {genre 
          ? `${genre} Albums`
          : year
          ? `${year}'s Albums`
          : artist
          ? `${artist}'s Albums`
          : 'All Albums'}
      </h1>
      <div className={styles['view-toggle']}>
        <button onClick={() => setView('table')} className={view === 'table' ? 'active' : ''}>Table View</button>
        <button onClick={() => setView('list')} className={view === 'list' ? 'active' : ''}>List View</button>
        <button onClick={() => setView('block')} className={view === 'block' ? 'active' : ''}>Block View</button>
      </div>
      {albums.length === 0 ? (
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
              <ul className={styles['list-table']}>
                {lists.map((list) => (
                  <li key={list.id}>
                    <button
                      className={styles['list-select-button']}
                      onClick={() => handleAddAlbumToList(list.id)}
                    >
                      {list.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <button className={styles['close-overlay-button']} onClick={closeOverlay}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlbumList;
