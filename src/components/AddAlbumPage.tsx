import React, { useState } from 'react';
import { fetchAlbum } from '../api/spotifyApi';
import { addAlbum } from '../api/amplifyApi';
import './AddAlbumPage.css'; // Ensure the correct path

const AddAlbumPage = () => {
  const [artist, setArtist] = useState('');
  const [name, setAlbumName] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const cleanAlbumName = (albumName: string): string => {
    // Regex pattern to match specific unwanted suffixes, with context of parentheses or dash
    const pattern = /\s*[\(\-\[]?(?:\d{4}\s+Remaster|Legacy Edition|Expanded Edition|Deluxe Edition|Special Edition|Anniversary Edition|Reissue)[\)\]]?\s*$/i;
  
    // If the pattern matches, remove it and trim any leftover whitespace
    if (pattern.test(albumName)) {
      return albumName.replace(pattern, '').trim();
    }
  
    return albumName.trim();
  };

  const handleAddAlbum = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      // Fetch album details from Spotify API
      const album = await fetchAlbum(name, artist);
      if (!album) {
        setError('Album not found. Please check the artist and album name.');
        setLoading(false);
        return;
      }

      // Add album to AppSync
      const cleanedName = cleanAlbumName(album.name);      
      console.log('Cleaned name: ', cleanedName);
      const newAlbum = {
        id: album.id,
        name: cleanedName,
        artist: album.artists[0].name,
        spotifyUrl: album.external_urls.spotify,
        imageUrl: album.images[0]?.url || '',
      };
      
      await addAlbum(newAlbum);

      setSuccessMessage('Album added successfully!');
      setArtist('');
      setAlbumName('');
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
          <label htmlFor="artist">Artist:</label>
          <input
            type="text"
            id="artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
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
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
};

export default AddAlbumPage;
