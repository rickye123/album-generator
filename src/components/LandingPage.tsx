import { useEffect, useState } from 'react';
import { fetchRandomAlbum } from '../api/amplifyApi';
import { Link } from 'react-router-dom';
import { AlbumData } from '../model';
import './LandingPage.css'; // Ensure the correct path to the CSS file

const LandingPage = () => {
  const [album, setAlbum] = useState<AlbumData | null>(null);

  useEffect(() => {
    const loadRandomAlbum = async () => {
      const randomAlbum = await fetchRandomAlbum();
      setAlbum(randomAlbum);
    };
    loadRandomAlbum();
  }, []);

  return (
    <div className="landing-page">
      <h1>Album Generator</h1>
      {album ? (
        <div className="album-details">
          <h2>{album.name}</h2>
          <p>{album.artist}</p>
          <a
            href={album.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
              alt="Spotify"
            />
            Listen on Spotify
          </a>
          <img
            src={
              album.imageUrl && album.imageUrl.startsWith('http')
                ? album.imageUrl
                : `${process.env.REACT_APP_IMAGE_BASE_URL || 'https://cybonyx-20241203172447-hostingbucket.s3.amazonaws.com/'}${album.imageUrl}`
            }
            alt={album.name}
          />
        </div>
      ) : (
        <p className="no-album">No albums available.</p>
      )}
    </div>
  );
};

export default LandingPage;
