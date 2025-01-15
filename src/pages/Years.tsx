import React, { useEffect, useState } from 'react';
import { fetchAlbums } from '../api/amplifyApi';
import { Link } from 'react-router-dom';
import '../styles/Media.css';
import darkStyles from '../styles/Media-dark.module.css';
import lightStyles from '../styles/Media-light.module.css';
import { AlbumData } from '../model';

const YearsPage = () => {
  const [years, setYears] = useState<string[]>([]);
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
        const uniqueYears = Array.from(new Set(albums.map(album => album.release_date.split('-')[0]))).sort();
        setYears(uniqueYears);
      } catch (error) {
        console.error('Error fetching artists', error);
      }
    };

    getArtists();
  }, []);

  return (
    <div className={styles['artists-page']}>
      <h1>Artists</h1>
      {years.length === 0 ? (
        <p>No years found.</p>
      ) : (
        <ul className={styles['artist-list']}>
          {years.map((year) => (
            <li key={year} className={styles['artist-item']}>
              <Link to={`/albums/year/${encodeURIComponent(year)}`}>{year}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default YearsPage;
