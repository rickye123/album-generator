import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  fetchAlbumListEntry,
  fetchAlbumsByListId,
  fetchLists,
  getUnplayedAlbumsInList,
  removeAlbumFromList,
  togglePlayedAlbumList,
} from '../api/amplifyApi';
import './AlbumList';
import { AlbumData, ListData } from '../model';

type SortKeys = 'artist' | 'name';
type SortDirection = 'asc' | 'desc';

const ListPage: React.FC = () => {
  const { listId } = useParams<{ listId: string }>();
  const [list, setList] = useState<ListData | null>(null);
  const [error, setError] = useState('');
  const [randomAlbum, setRandomAlbum] = useState<any | null>(null);

  const [menuOpen, setMenuOpen] = useState<{ [key: string]: boolean }>({});

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKeys>('artist');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const albumsPerPage = 10;


  useEffect(() => {
    const loadLists = async () => {
      try {
        const foundList = await fetchAlbumsByListId(listId!);
        console.log('FoundList', foundList);
        setList(foundList || null);
      } catch (err) {
        console.error('Error fetching list:', err);
        setError('Error loading list');
      }
    };

    loadLists();
  }, [listId]);

  if (!list) return <div>Loading...</div>;

  const handleRemoveFromList = async (listId: string, albumId: string) => {
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
      const albumListEntry = await fetchAlbumListEntry(listId, albumId);

      console.log('AlbumListEntry', albumListEntry);
      if (!albumListEntry?.id) {
        throw new Error('Failed to find AlbumList entry for toggle.');
      }
      await togglePlayedAlbumList(albumListEntry.id, !played);
      const foundList = await fetchAlbumsByListId(listId!);
      setList(foundList || null);
    } catch (err) {
      console.error('Error toggling played status:', err);
    }
  };

  const bulkSetUnplayed = async () => {
    const confirmed = window.confirm('Are you sure you want to mark all albums as unplayed?');
    if (!confirmed) return;

    try {
      for (const album of list!.albums) {
        const albumListEntry = await fetchAlbumListEntry(list!.id, album.id);
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
      console.log('Unplayed albums', unplayedAlbums);

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

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      setCurrentPage(1);
    };
  
    const handlePageChange = (direction: 'next' | 'prev') => {
      if (direction === 'next' && indexOfLastAlbum < list.albums.length) {
        setCurrentPage((prev) => prev + 1);
      } else if (direction === 'prev' && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }
    };
  
    const handleSortChange = (key: SortKeys) => {
      console.log(`Sorting ${key} ${sortKey}`);
      if (sortKey === key) {
        setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortKey(key);
        setSortDirection('asc');
      }
    };
  
    const indexOfLastAlbum = currentPage * albumsPerPage;
    const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;

    const filteredAlbums = list.albums
    .filter(
      (album) =>
        album.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        album.artist.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const comparison =
        sortKey === 'artist'
          ? a.artist.localeCompare(b.artist) || a.name.localeCompare(b.name)
          : a.name.localeCompare(b.name);

      return sortDirection === 'asc' ? comparison : -comparison;
    });

  const currentAlbums = filteredAlbums.slice(indexOfFirstAlbum, indexOfLastAlbum);
  const closeOverlay = () => setRandomAlbum(null);

  const toggleMenu = (albumId: string) => {
    setMenuOpen((prev) => ({
      ...prev,
      [albumId]: !prev[albumId],
    }));
  };

  return (
    <div className="list-page-wrapper">
      <div className="list-page-container">
        <h1 className="list-page-title">{list.name}</h1>
        {error && <p className="list-page-error">{error}</p>}

        <button className="list-page-randomize-button" onClick={randomizeAlbum}>
          Randomize Album
        </button>

        <button className="list-page-unplayed-button" onClick={bulkSetUnplayed}>
          Mark All as Unplayed
        </button>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search albums or artists..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        {list.albums?.length === 0 ? (
        <p className="no-albums">No albums found.</p>
      ) : (
        <>
          <table className="album-table">
            <thead>
              <tr>
                <th onClick={() => handleSortChange('name')}>
                  Album Name {sortKey === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSortChange('artist')}>
                  Artist {sortKey === 'artist' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentAlbums.map((album: any, index: number) => (
                <tr key={album.id}>
                  <td className="artist-album-cell">
                    <Link to={`/albums/${album.id}`}><img src={album.imageUrl} alt={album.name} className="list-page-album-image" /></Link>
                  </td>
                  <td>
                    <h3 className="list-page-album-name">{album.name}</h3>
                    <p className="list-page-album-artist">{album.artist}</p>
                    <label className="list-page-switch">
                      <input
                        type="checkbox"
                        checked={album.played}
                        onChange={() => togglePlayed(list.id, album.id, album.played)}
                      />
                      <span className="list-page-slider list-page-round"></span>
                    </label>
                  </td>
                  <td className="more-options-cell">
                    <div className="more-options-container">
                      <a
                        href={album.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="spotify-link"
                      >
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
                          alt="Spotify"
                          className="spotify-link"
                        />
                      </a>
                      <button
                        className="more-options-button"
                        onClick={() => toggleMenu(album.id)}
                      >
                        ⋮
                      </button>
                      {menuOpen[album.id] && (
                        <div className="dropdown-menu">
                          <button onClick={() => handleRemoveFromList(list.id, album.id)}>Remove</button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination-controls">
            <button onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>
              Previous
            </button>
            <span>
              Page {currentPage} of {Math.ceil(list.albums.length / albumsPerPage)}
            </span>
            <button
              onClick={() => handlePageChange('next')}
              disabled={indexOfLastAlbum >= list.albums.length}
            >
              Next
            </button>
          </div>
        </>
      )}
      </div>

      {randomAlbum && (
        <div className="list-page-overlay">
          <div className="list-page-overlay-content">
            <button className="list-page-close-button" onClick={closeOverlay}>
              &times;
            </button>
            <img src={randomAlbum.album.imageUrl} alt={randomAlbum.album.name} className="list-page-overlay-image" />
            <h2 className="list-page-overlay-title">{randomAlbum.album.name}</h2>
            <p className="list-page-overlay-artist">{randomAlbum.album.artist}</p>
            <p className="list-page-overlay-year">{randomAlbum.album.release_date.split('-')[0]}</p>
            <a
              href={randomAlbum.album.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="list-page-overlay-link"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
                alt="Spotify"
                className="spotify-icon"
              />
            </a>
            <label className="list-page-switch">
              <input
                type="checkbox"
                checked={randomAlbum.played}
                onChange={() => togglePlayed(list.id, randomAlbum.album.id, randomAlbum.played)}
              />
              <span className="list-page-slider list-page-round"></span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListPage;
