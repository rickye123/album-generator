import React, { useEffect, useState } from 'react';
import { fetchRandomAlbum, addAlbum } from '../api/amplifyApi';
import { Link } from 'react-router-dom';
import { fetchAlbum } from '../api/spotifyApi';
import { AlbumData } from '../model';

const LandingPage = () => {
  const [album, setAlbum] = useState<AlbumData | null>(null);
  const [artist, setArtist] = useState('');
  const [name, setAlbumName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadRandomAlbum = async () => {
      const randomAlbum = await fetchRandomAlbum();
      setAlbum(randomAlbum);
    };
    loadRandomAlbum();
  }, []);

  const handleAddAlbum = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const newAlbum = await fetchAlbum(name, artist);
      if (!newAlbum) {
        setError('Album not found. Please check the artist and album name.');
        setLoading(false);
        return;
      }

      await addAlbum({
        id: newAlbum.id,
        name: newAlbum.name,
        artist: newAlbum.artists[0].name,
        spotifyUrl: newAlbum.external_urls.spotify,
        imageUrl: newAlbum.images[0]?.url || '',
      });

      setArtist('');
      setAlbumName('');
      alert('Album added successfully!');
    } catch (err) {
      console.error('Error adding album:', err);
      setError('Failed to add album. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Album Generator</h1>
      <nav>
        <Link to="/albums">View All Albums</Link>
        <Link to="/add-album" style={{ marginLeft: '10px' }}>Add a New Album</Link>
      </nav>
      {album ? (
        <div>
          <img
            src={
              album.imageUrl && album.imageUrl.startsWith('http')
                ? album.imageUrl
                : `${process.env.REACT_APP_IMAGE_BASE_URL || 'https://cybonyx-20241203172447-hostingbucket.s3.amazonaws.com/'}${album.imageUrl}`
            }
            alt={album.name}
            style={{ width: 200, height: 200 }}
          />
          <h2>{album.name}</h2>
          <p>{album.artist}</p>
        </div>
      ) : (
        <p>No albums available.</p>
      )}
      <div>
        <h2>Add a New Album</h2>
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
    </div>
  );
};

export default LandingPage;
