import { useEffect, useRef, useState } from 'react';
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
  const yearRefs = useRef<Record<string, HTMLDivElement>>({}); // References for each alphabet section
  const [selectedOverlay, setSelectedOverlay] = useState<string | null>(null); // State for overlay

  // Use the appropriate styles based on the current theme
  const styles = theme === 'dark' ? darkStyles : lightStyles;
  useEffect(() => {
    const getYears = async () => {
      try {
        const albums: AlbumData[] = await fetchAlbums();
        const uniqueYears = Array.from(new Set(albums.map(album => album.release_date.split('-')[0]))).sort();
        setYears(uniqueYears);
      } catch (error) {
        console.error('Error fetching artists', error);
      }
    };

    getYears();
  }, []);

  const handleScrollTo = (letter: string) => {
    const ref = yearRefs.current[letter];
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

  const groupedYears = years.reduce<Record<string, number[]>>((acc, year) => {
    // Calculate the decade (e.g., 1953 -> 1950s)
    const decade = `${Math.floor(parseInt(year) / 10) * 10}s`;
  
    if (!acc[decade]) {
      acc[decade] = [];
    }
    acc[decade].push(parseInt(year));
    return acc;
  }, {});

  return (
    <div className={styles['media-page']}>
      <h1>Years</h1>
      {years.length === 0 ? (
        <p>No years found.</p>
      ) : (
      <div>
        <div className={styles['alphabet-bar']}>
          {/* Generate buttons for each unique decade */}
          {Object.keys(groupedYears).sort().map((decade) => (
            <button
              key={decade}
              className={styles['alphabet-button']}
              onClick={() => handleScrollTo(decade)}
            >
              {decade}
            </button>
          ))}
        </div>
        <div className={styles['media-list-container']}>
          {Object.keys(groupedYears).map((decade) => (
            <div key={decade} ref={(el) => { if (el) yearRefs.current[decade] = el; }}>
              <h2 className={styles['media-section-header']}>{decade}</h2>
              <ul className={styles['media-list']}>
                {groupedYears[decade].map((year) => (
                  <li key={year} className={styles['media-item']}>
                    <Link to={`/albums/year/${encodeURIComponent(year)}`}>{year}</Link>
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

export default YearsPage;
