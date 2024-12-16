import React, { useState } from 'react';
import { fetchAlbum, fetchAlbumBySpotifyUrl } from '../api/spotifyApi';
import { addAlbum } from '../api/amplifyApi';
import './AddAlbumPage.css';

const AddAlbumPage = () => {
  const [artist, setArtist] = useState('');
  const [name, setAlbumName] = useState('');
  const [spotifyUrl, setSpotifyUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const cleanAlbumName = (albumName: string): string => {
    const pattern = /\s*[\(\-\[]?(?:\d{4}\s+Remaster|Legacy Edition|Expanded Edition|Deluxe Edition|Special Edition|Anniversary Edition|Reissue|Remastered|Deluxe)[\)\]]?\s*$/i;
    return albumName.replace(pattern, '').trim();
  };

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

      const cleanedName = cleanAlbumName(album.name);
      const newAlbum = {
        id: album.id,
        name: cleanedName,
        artist: album.artists[0].name,
        release_date: album.release_date,
        spotifyUrl: album.external_urls.spotify,
        imageUrl: album.images[0]?.url || '',
      };

      await addAlbum(newAlbum);
      setSuccessMessage(`Album ${newAlbum.name} added successfully!`);
      setArtist('');
      setAlbumName('');
      setSpotifyUrl('');
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
        <button type="submit" disabled={loading}>
          {loading ? 'Adding Album...' : 'Add Album'}
        </button>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
};

export default AddAlbumPage;
