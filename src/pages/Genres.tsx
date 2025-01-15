import { useEffect, useState } from 'react';
import { fetchAlbums } from '../api/amplifyApi';
import { Link } from 'react-router-dom';
import darkStyles from '../styles/modules/Media-dark.module.css';
import lightStyles from '../styles/modules/Media-light.module.css';
import { AlbumData } from '../model';

const Genres = () => {
  const [genres, setGenres] = useState<string[]>([]);
  const [theme] = useState<'light' | 'dark'>(() => {
    // Load theme preference from localStorage or default to 'light'
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });

  // Use the appropriate styles based on the current theme
  const styles = theme === 'dark' ? darkStyles : lightStyles;
  useEffect(() => {
    const getGenres = async () => {
      try {
        const albums: AlbumData[] = await fetchAlbums();
        const uniqueGenres = Array.from(
          new Set(
            albums
              .flatMap((album) => album.genres || []) // Flatten all genres into one array
              .map((genre) => genre.trim()) // Normalize genres
          )
        ).sort();
        setGenres(uniqueGenres);
      } catch (error) {
        console.error('Error fetching genres', error);
      }
    };

    getGenres();
  }, []);

  return (
    <div className={styles['media-page']}>
      <h1>Genres</h1>
      {genres.length === 0 ? (
        <p>No genres found.</p>
      ) : (
        <ul className={styles['media-list']}>
          {genres.map((genre) => (
            <li key={genre} className={styles['media-item']}>
              <Link to={`/albums/genre/${encodeURIComponent(genre)}`}>{genre}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Genres;
