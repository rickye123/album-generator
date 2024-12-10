import React, { useEffect, useState } from 'react';
import { fetchAlbums, fetchLists, addAlbumToList, removeAlbum } from '../api/amplifyApi';
import { AlbumData, ListData } from '../model';
import './AlbumList.css';
import { Link } from 'react-router-dom';

type SortKeys = 'artist' | 'name';
type SortDirection = 'asc' | 'desc';

const AlbumList = () => {
  const [albums, setAlbums] = useState<AlbumData[]>([]);
  const [lists, setLists] = useState<ListData[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumData | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [error, setError] = useState('');
  
  // Search, Pagination, and Sorting
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKeys>('artist');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const albumsPerPage = 10;

  useEffect(() => {
    const loadAlbums = async () => {
      const albumList = await fetchAlbums();
      setAlbums(albumList);
    };
    loadAlbums();
  }, []);

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
      await removeAlbum(albumId);
      setAlbums((prevAlbums) => prevAlbums.filter((album) => album.id !== albumId));
    } catch (err) {
      console.error('Error deleting album:', err);
      setError('Failed to delete the album. Please try again.');
    }
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

  const filteredAlbums = albums
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

  return (
    <div className="album-list-page">
      <h1>Albums</h1>
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
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentAlbums.map((album: AlbumData) => (
                <tr key={album.id}>
                  <td>
                    <Link to={`/albums/${album.id}`}>{album.name}</Link>
                  </td>
                  <td>{album.artist}</td>
                  <td>
                    <a
                      href={album.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="spotify-link"
                    >
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
                        alt="Spotify"
                      />
                    </a>
                  </td>
                  <td>
                    <button
                      className="add-to-list-button"
                      onClick={() => openOverlay(album)}
                    >
                      Add to List
                    </button>
                    <button
                      className="delete-album-button"
                      onClick={() => handleDeleteAlbum(album.id)}
                    >
                      Delete
                    </button>
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
