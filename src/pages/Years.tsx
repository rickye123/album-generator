import { useEffect, useState } from 'react';
import { fetchAlbums } from '../api/amplifyApi';
import { Link } from 'react-router-dom';
import darkStyles from '../styles/modules/Media-dark.module.css';
import lightStyles from '../styles/modules/Media-light.module.css';
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
    <div className={styles['media-page']}>
      <h1>Years</h1>
      {years.length === 0 ? (
        <p>No years found.</p>
      ) : (
        <ul className={styles['media-list']}>
          {years.map((year) => (
            <li key={year} className={styles['media-item']}>
              <Link to={`/albums/year/${encodeURIComponent(year)}`}>{year}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default YearsPage;
