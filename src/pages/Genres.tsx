import { useEffect, useRef, useState } from 'react';
import { fetchAlbums } from '../api/amplifyApi';
import { Link } from 'react-router-dom';
import darkStyles from '../styles/modules/Media-dark.module.css';
import lightStyles from '../styles/modules/Media-light.module.css';
import { AlbumData } from '../model';
import Loader from '../components/Loader';
import { getCurrentUserId } from '../core/users';
import { getAlbumsByUser } from '../service/dataAccessors/albumDataAccesor';

const Genres = () => {
  const [genres, setGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [theme] = useState<'light' | 'dark'>(() => {
    // Load theme preference from localStorage or default to 'light'
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });
  const genreRefs = useRef<Record<string, HTMLDivElement>>({}); // References for each alphabet section
  const [selectedOverlay, setSelectedOverlay] = useState<string | null>(null); // State for overlay
  

  // Use the appropriate styles based on the current theme
  const styles = theme === 'dark' ? darkStyles : lightStyles;
  useEffect(() => {
    const getGenres = async () => {
      try {
        setLoading(true);
        const userId = (await getCurrentUserId()) || '';
        const albums: AlbumData[] = await getAlbumsByUser(userId);
        for (const album of albums) {
          if (album.genres === null || album.genres === undefined) {
            console.log('Album:', album);
          }
          console.log('Genre:', album.genres);
        }
        const uniqueGenres = Array.from(
          new Set(
            albums
              .flatMap((album) => album.genres || []) // Flatten all genres into one array, skipping null/undefined
              .filter((genre) => genre && genre.trim() !== '' || genre !== '') // Filter out invalid genres, including empty strings
              .map((genre) => genre.trim()) // Normalize genres
          )
        ).sort();
        console.log('Unique Genre', uniqueGenres);
        setGenres(uniqueGenres);
      } catch (error) {
        console.error('Error fetching genres', error);
      } finally {
        setLoading(false);
      }
    };

    getGenres();
  }, []);

  const groupedGenres = genres.reduce<Record<string, string[]>>((acc, genre) => {
    console.log('Genre:', genre);
    console.log('acc:', acc);
    const letter = genre[0].toUpperCase();
    if (!acc[letter]) {
      acc[letter] = [];
    }
    acc[letter].push(genre);
    return acc;
  }, {});

  const handleScrollTo = (letter: string) => {
    const ref = genreRefs.current[letter];
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Show the overlay when a letter/number is selected
    setSelectedOverlay(letter);

    // Hide the overlay after 1 second
    setTimeout(() => {
      setSelectedOverlay(null);
    }, 1000);
  };

  return (
    <div className={styles['media-page']}>
      <h1>Genres</h1>
      {loading ? <Loader /> : genres.length === 0 ? (
        <p>No genres found.</p>
      ) : (
        <div>
        <div className={styles['alphabet-bar']}>
          {/* Generate buttons for each unique decade */}
          {Object.keys(groupedGenres).sort().map((letter) => (
            <button
              key={letter}
              className={styles['alphabet-button']}
              onClick={() => handleScrollTo(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
        <div className={styles['media-list-container']}>
          {Object.keys(groupedGenres).map((letter) => (
            <div key={letter} ref={(el) => { if (el) genreRefs.current[letter] = el; }}>
              <h2 className={styles['media-section-header']}>{letter}</h2>
              <ul className={styles['media-list']}>
                {groupedGenres[letter].map((genre) => (
                  <li key={genre} className={styles['media-item']}>
                    <Link to={`/albums/genre/${encodeURIComponent(genre)}`}>{genre}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
  
      )}
      {/* Overlay */}
      {selectedOverlay && (
          <div className={styles['media-overlay']}>
            <span>{selectedOverlay}</span>
          </div>
        )}
    </div>
  );
};

export default Genres;
