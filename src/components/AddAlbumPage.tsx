import React, { useState } from 'react';
import { fetchAlbum } from '../api/spotifyApi';
import { addAlbum } from '../api/amplifyApi';
import { useNavigate } from 'react-router-dom';

const AddAlbumPage = () => {
  const [artist, setArtist] = useState('');
  const [name, setAlbumName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAddAlbum = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Fetch album details from Spotify API
      const album = await fetchAlbum(name, artist);
      if (!album) {
        setError('Album not found. Please check the artist and album name.');
        setLoading(false);
        return;
      }

      // Add album to AppSync
      const newAlbum = {
        id: album.id,
        name: album.name,
        artist: album.artists[0].name,
        spotifyUrl: album.external_urls.spotify,
        imageUrl: album.images[0]?.url || '',
      };

      await addAlbum(newAlbum);

      // Navigate back to the landing page
      navigate('/');
    } catch (err) {
      console.error('Error adding album:', err);
      setError('Failed to add album. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Add a New Album</h1>
      <form onSubmit={handleAddAlbum}>
        <div>
          <label htmlFor="artist">Artist:</label>
          <input
            type="text"
            id="artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="albumName">Album Name:</label>
          <input
            type="text"
            id="albumName"
            value={name}
            onChange={(e) => setAlbumName(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding Album...' : 'Add Album'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default AddAlbumPage;
