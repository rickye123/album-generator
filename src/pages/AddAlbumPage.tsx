import React, { useState, useEffect } from 'react';
import {
  fetchAlbum,
  fetchAlbumBySpotifyUrl
} from '../api/spotifyApi';
import {
  addAlbum,
  fetchLists,
  addAlbumToList
} from '../api/amplifyApi';
import '../styles/AddAlbumPage.css';
import { ListData } from '../model';

const AddAlbumPage = () => {
  const [artist, setArtist] = useState('');
  const [name, setAlbumName] = useState('');
  const [spotifyUrl, setSpotifyUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [lists, setLists] = useState<ListData[]>([]); // Explicit type here
  const [selectedListId, setSelectedListId] = useState('');

  useEffect(() => {
    const loadLists = async () => {
      try {
        const result = await fetchLists();
        setLists(result || []);
      } catch (err) {
        console.error('Error fetching lists:', err);
        setError('Error loading lists.');
      }
    };

    loadLists();
  }, []);

  const handleAddAlbum = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      let album;
      if (spotifyUrl) {
        album = await fetchAlbumBySpotifyUrl(spotifyUrl);
      } else {
        album = await fetchAlbum(name, artist);
      }

      if (!album) {
        setError('Album not found. Please check the details.');
        setLoading(false);
        return;
      }

      const newAlbum = {
        id: album.id,
        name: album.name,
        artist: album.artists[0].name,
        release_date: album.release_date,
        spotifyUrl: album.external_urls.spotify,
        imageUrl: album.images[0]?.url || '',
      };

      await addAlbum(newAlbum);

      if (selectedListId) {
        await addAlbumToList(newAlbum.id, selectedListId);
        setSuccessMessage(
          `Album ${newAlbum.name} added successfully to the selected list!`
        );
      } else {
        setSuccessMessage(`Album ${newAlbum.name} added successfully!`);
      }

      setArtist('');
      setAlbumName('');
      setSpotifyUrl('');
      setSelectedListId('');
    } catch (err) {
      console.error('Error adding album:', err);
      setError('Failed to add album. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-album-page">
      <h1>Add a New Album</h1>
      <form onSubmit={handleAddAlbum} className="add-album-form">
        <div className="form-group">
          <label htmlFor="spotifyUrl">Spotify URL (Optional):</label>
          <input
            type="text"
            id="spotifyUrl"
            value={spotifyUrl}
            onChange={(e) => setSpotifyUrl(e.target.value)}
          />
        </div>
        <p>Or enter details below:</p>
        <div className="form-group">
          <label htmlFor="artist">Artist:</label>
          <input
            type="text"
            id="artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            required={!spotifyUrl}
            disabled={!!spotifyUrl}
          />
        </div>
        <div className="form-group">
          <label htmlFor="albumName">Album Name:</label>
          <input
            type="text"
            id="albumName"
            value={name}
            onChange={(e) => setAlbumName(e.target.value)}
            required={!spotifyUrl}
            disabled={!!spotifyUrl}
          />
        </div>
        <div className="form-group">
          <label htmlFor="list">Add to List (Optional):</label>
          <select
            id="list"
            value={selectedListId}
            onChange={(e) => setSelectedListId(e.target.value)}
          >
            <option value="">None</option>
            {lists.map((list: ListData) => (
              <option key={list.id} value={list.id}>
                {list.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding Album...' : 'Add Album'}
        </button>
        {error && <p className="error-message">{error}</p>}
        {successMessage && (
          <p className="success-message">{successMessage}</p>
        )}
      </form>
    </div>
  );
};

export default AddAlbumPage;
