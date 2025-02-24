import React, { useEffect, useState, useRef } from 'react';
import { fetchAlbums } from '../api/amplifyApi';
import { Link } from 'react-router-dom';
import darkStyles from '../styles/modules/Media-dark.module.css';
import lightStyles from '../styles/modules/Media-light.module.css';
import { AlbumData } from '../model';
import Loader from '../components/Loader';
import { getCurrentUserId } from '../core/users';

const ArtistsPage = () => {
  const [artists, setArtists] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [theme] = useState<'light' | 'dark'>(
    () => (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
  );
  const styles = theme === 'dark' ? darkStyles : lightStyles;
  
  const artistRefs = useRef<Record<string, HTMLDivElement>>({}); // References for each alphabet section
  const [selectedOverlay, setSelectedOverlay] = useState<string | null>(null); // State for overlay

  useEffect(() => {
    const getArtists = async () => {
      try {
        setLoading(true);
        const userId = (await getCurrentUserId()) || '';
        const albums: AlbumData[] = await fetchAlbums(userId);
        const uniqueArtists = Array.from(new Set(albums.map(album => album.artist))).sort((a, b) => {

          return stripThePrefix(a).localeCompare(stripThePrefix(b));
        });
        console.log('Unique artists:', uniqueArtists);
        setArtists(uniqueArtists);
      } catch (error) {
        console.error('Error fetching artists', error);
      } finally {
        setLoading(false);
      }
    };

    getArtists();
  }, []);

  const stripThePrefix = (name: string) => {
    const lowerCaseName = name.toLowerCase();
    return lowerCaseName.startsWith("the ") ? name.slice(4) : name;
  };

  const handleScrollTo = (letter: string) => {
    const ref = artistRefs.current[letter];
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

  const groupedArtists = artists.reduce<Record<string, string[]>>((acc, artist) => {
    const firstChar = stripThePrefix(artist)[0].toUpperCase();
  
    // Group numbers (0-9) under "0-9"
    const groupKey = /^[0-9]$/.test(firstChar) ? '0-9' : firstChar;
  
    if (!acc[groupKey]) acc[groupKey] = [];
    acc[groupKey].push(artist);
    return acc;
  }, {});

  return (
    <div className={styles['media-page']}>
      <h1>Artists</h1>
      {loading ? <Loader /> : artists.length === 0 ? (
        <p>No Artists found.</p>
      ) : (
      <div>
        <div className={styles['alphabet-bar']}>
          {/* Generate buttons for A-Z and 0-9 */}
          {['0-9', ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))].map((char) => (
          <button
            key={char}
            className={styles['alphabet-button']}
            onClick={() => handleScrollTo(char)}
          >
            {char}
          </button>
        ))}
        </div>
        <div className={styles['media-list-container']}>
          {Object.keys(groupedArtists).map((letter) => (
            <div key={letter} ref={(el) => { if (el) artistRefs.current[letter] = el; }}>
              <h2 className={styles['media-section-header']}>{letter}</h2>
              <ul className={styles['media-list']}>
                {groupedArtists[letter].map((artist) => (
                  <li key={artist} className={styles['media-item']}>
                    <Link to={`/albums/artist/${encodeURIComponent(artist)}`}>{artist}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Overlay */}
        {selectedOverlay && (
          <div className={styles['media-overlay']}>
            <span>{selectedOverlay}</span>
          </div>
        )}
      </div>
      )}
    </div>
  );
};

export default ArtistsPage;
