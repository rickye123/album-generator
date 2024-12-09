import React, { useEffect, useState } from 'react';
import { fetchAlbums, fetchLists, addAlbumToList, removeAlbum } from '../api/amplifyApi';
import { AlbumData, ListData } from '../model';
import './AlbumList.css'; // Ensure the correct path
import { Link } from 'react-router-dom';

const AlbumList = () => {
  const [albums, setAlbums] = useState<AlbumData[]>([]);
  const [lists, setLists] = useState<ListData[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumData | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [error, setError] = useState('');

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
      setError('Failed to delete the list. Please try again.');
    }
  };

  return (
    <div className="album-list-page">
      <h1>Albums</h1>
      {albums.length === 0 ? (
        <p className="no-albums">No albums found.</p>
      ) : (
        <table className="album-table">
          <thead>
            <tr>
              <th>Album Name</th>
              <th>Artist</th>
              <th>Spotify</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {albums.map((album: AlbumData) => (
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
                    Listen on Spotify
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
