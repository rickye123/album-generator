import React, { useEffect, useState } from 'react';
import { fetchAlbums } from '../api/amplifyApi';
import { Link } from 'react-router-dom';
import '../styles/Media.css';
import darkStyles from '../styles/Media-dark.module.css';
import lightStyles from '../styles/Media-light.module.css';
import { AlbumData } from '../model';

const ArtistsPage = () => {
  const [artists, setArtists] = useState<string[]>([]);
  const [theme] = useState<'light' | 'dark'>(() => {
    // Load theme preference from localStorage or default to 'light'
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });

  // Use the appropriate styles based on the current theme
  const styles = theme === 'dark' ? darkStyles : lightStyles;
  useEffect(() => {
    const getArtists = async () => {
      try {
        const albums: AlbumData[] = await fetchAlbums();
        const uniqueArtists = Array.from(new Set(albums.map(album => album.artist))).sort();
        setArtists(uniqueArtists);
      } catch (error) {
        console.error('Error fetching artists', error);
      }
    };

    getArtists();
  }, []);

  return (
    <div className={styles['artists-page']}>
      <h1>Artists</h1>
      {artists.length === 0 ? (
        <p>No artists found.</p>
      ) : (
        <ul className={styles['artist-list']}>
          {artists.map((artist) => (
            <li key={artist} className={styles['artist-item']}>
              <Link to={`/albums/artist/${encodeURIComponent(artist)}`}>{artist}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ArtistsPage;
