import React, { useEffect, useState } from 'react';
import { fetchAlbums, fetchLists, addAlbumToList, removeAlbum, fetchAlbumListEntriesForAlbumId, removeAlbumFromList } from '../api/amplifyApi';
import { AlbumData, ListData } from '../model';
import './AlbumList.css';
import { Link, useParams } from 'react-router-dom';

type SortKeys = 'artist' | 'name';
type SortDirection = 'asc' | 'desc';

const AlbumList = () => {
  const [albums, setAlbums] = useState<AlbumData[]>([]);
  const [lists, setLists] = useState<ListData[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumData | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [error, setError] = useState('');
  const [menuOpen, setMenuOpen] = useState<{ [key: string]: boolean }>({});
  const { artist } = useParams<{ artist: string }>();
  const { year } = useParams<{ year: string }>();

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKeys>('artist');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const albumsPerPage = 10;

  useEffect(() => {
    const loadAlbums = async () => {
      const albumList = await fetchAlbums();
      // think this is filtering out albums that contains ... in it for instance
      // needs fixing
      const filteredAlbums = artist
        ? albumList.filter((album: AlbumData) => album.artist === decodeURIComponent(artist))
        : albumList;
      const filteredByYear = year
        ? filteredAlbums.filter((album: AlbumData) => album.release_date.split('-')[0] === decodeURIComponent(year))
        : filteredAlbums;
      setAlbums(filteredByYear);
    };

    loadAlbums();
  }, [artist, year]);

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

  const handleDeleteAlbum = async (albumId: string) => {
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (direction: 'next' | 'prev') => {
    if (direction === 'next' && indexOfLastAlbum < filteredAlbums.length) {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleSortChange = (key: SortKeys) => {
    if (sortKey === key) {
      setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const indexOfLastAlbum = currentPage * albumsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;

  const stripThePrefix = (name: string) => {
    const lowerCaseName = name.toLowerCase();
    return lowerCaseName.startsWith("the ") ? name.slice(4) : name;
  };

  const filteredAlbums = albums
    .filter(
      (album) =>
        album.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        album.artist.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const aKey = sortKey === 'artist' ? stripThePrefix(a.artist) : a.name;
      const bKey = sortKey === 'artist' ? stripThePrefix(b.artist) : b.name;

      const comparison = aKey.localeCompare(bKey);

      return sortDirection === 'asc' ? comparison : -comparison;
    });

  const currentAlbums = filteredAlbums.slice(indexOfFirstAlbum, indexOfLastAlbum);

  return (
    <div className="album-list-page">
      <h1>
        {year
          ? `${year}'s Albums`
          : artist
          ? `${artist}'s Albums`
          : 'All Albums'}
      </h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search albums or artists..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {albums.length === 0 ? (
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
              {currentAlbums.map((album: AlbumData) => (
                <tr key={album.id}>
                  <td className="artist-album-cell">
                    <Link to={`/albums/${album.id}`}>{album.name}</Link>
                  </td>
                  <td className="artist-album-cell">{album.artist}</td>
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
                          <button onClick={() => openOverlay(album)}>Add to List</button>
                          <button onClick={() => handleDeleteAlbum(album.id)}>Delete</button>
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
              Page {currentPage} of {Math.ceil(filteredAlbums.length / albumsPerPage)}
            </span>
            <button
              onClick={() => handlePageChange('next')}
              disabled={indexOfLastAlbum >= filteredAlbums.length}
            >
              Next
            </button>
          </div>
        </>
      )}

      {showOverlay && selectedAlbum && (
        <div className="overlay">
          <div className="overlay-content">
            <h2>Add {selectedAlbum.name} to a List</h2>
            {error && <p className="error-message">{error}</p>}
            {lists.length === 0 ? (
              <p>No lists available. Please create one first.</p>
            ) : (
              <ul className="list-table">
                {lists.map((list) => (
                  <li key={list.id}>
                    <button
                      className="list-select-button"
                      onClick={() => handleAddAlbumToList(list.id)}
                    >
                      {list.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <button className="close-overlay-button" onClick={closeOverlay}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlbumList;
