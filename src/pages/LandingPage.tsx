import { useEffect, useState } from 'react';
import { fetchRandomAlbum } from '../api/amplifyApi';
import { AlbumData } from '../model';
import darkStyles from '../styles/modules/LandingPage-dark.module.css';
import lightStyles from '../styles/modules/LandingPage-light.module.css';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [album, setAlbum] = useState<AlbumData | null>(null);
  const [theme] = useState<'light' | 'dark'>(() => {
    // Load theme preference from localStorage or default to 'light'
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    const loadRandomAlbum = async () => {
      const randomAlbum = await fetchRandomAlbum();
      setAlbum(randomAlbum);
    };
    loadRandomAlbum();
  }, []);

  // Use the appropriate styles based on the current theme
  const styles = theme === 'dark' ? darkStyles : lightStyles;

  return (
    <div className={styles['landing-page']}>
      <h1 className={styles['title']}>Album Generator</h1>
      {album ? (
        <div className={styles['album-details']}>
          <h2>
            <Link to={`/albums/${album.id}`} className={styles['album-link']}>{album.name}</Link>
          </h2>
          <p>
            <Link to={`/albums/artist/${encodeURIComponent(album.artist)}`} className={styles['album-link']}>{album.artist}</Link>
          </p>
          <a
            href={album.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles['spotify-link']}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
              alt="Spotify"
              className={styles['spotify-icon']}
            />
            Listen on Spotify
          </a>
          <img
            src={
              album.imageUrl && album.imageUrl.startsWith('http')
                ? album.imageUrl
                : `${
                    process.env.REACT_APP_IMAGE_BASE_URL ||
                    'https://albumgenerator-20241217153103-hostingbucket.s3.amazonaws.com/'
                  }${album.imageUrl}`
            }
            alt={album.name}
            className={styles['album-image']}
          />
        </div>
      ) : (
        <p className={styles['no-album']}>No albums available.</p>
      )}
    </div>
  );
};

export default LandingPage;
