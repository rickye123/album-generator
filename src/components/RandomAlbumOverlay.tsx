import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import darkStyles from '../styles/modules/AlbumList-dark.module.css';
import lightStyles from '../styles/modules/AlbumList-light.module.css';
import Loader from './Loader';

interface RandomAlbumOverlayProps {
  randomAlbum: any; // Replace with a proper type if available
  onClose: () => void;
  togglePlayed?: (listId: string, albumId: string, played: boolean) => void;
  listId?: string; // Optional for AlbumList where lists are not used
  generateNext: () => void;
}

const RandomAlbumOverlay: React.FC<RandomAlbumOverlayProps> = ({
  randomAlbum,
  onClose,
  togglePlayed,
  listId,
  generateNext
}) => {

    const [theme] = useState<'light' | 'dark'>(() => {
        // Load theme preference from localStorage or default to 'light'
        return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    });

    const [loading, setLoading] = useState(false);

    const handleGenerateNext = async () => {
        setLoading(true);
        // Wait for the generateNext function to complete
        await new Promise((resolve) => setTimeout(resolve, 100)); // Small delay to ensure re-render
        await generateNext(); 
        setLoading(false);
    };  

    // Use the appropriate styles based on the current theme
    const styles = theme === 'dark' ? darkStyles : lightStyles;
    if (!randomAlbum) {
        return null;
    }

    return (
        <div className={styles['list-page-overlay']}>
            {loading ? <Loader /> : (
            <div className={styles['list-page-overlay-content']}>
            <button className={styles['list-page-close-button']} onClick={onClose}>
                &times;
            </button>
            <img src={randomAlbum.album.imageUrl} alt={randomAlbum.album.name} className={styles['list-page-overlay-image']} />
            <h2 className={styles['list-page-overlay-title']}><Link to={`/albums/${randomAlbum.album.id}`} className={styles['album-link']}>{randomAlbum.album.name}</Link></h2>
            <p className={styles['list-page-overlay-artist']}><Link to={`/albums/artist/${encodeURIComponent(randomAlbum.album.artist)}`} className={styles['album-link']}>{randomAlbum.album.artist}</Link></p>
            <p className={styles['list-page-overlay-year']}> <Link to={`/albums/year/${encodeURIComponent(randomAlbum.album.release_date.split('-')[0])}`} className={styles['album-link']}>{randomAlbum.album.release_date.split('-')[0]}</Link></p>
            {randomAlbum.album.spotifyUrl ? (<a
                href={randomAlbum.album.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles['list-page-overlay-link']}
            >
                <img
                src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
                alt="Spotify"
                className={styles['spotify-icon']}
                />
            </a>
            ) : (
                <p className={styles['no-spotify']}>No Spotify link available.</p>
            )}
            {listId && togglePlayed && (
                <label className={styles['list-page-switch']}>
                    <input
                        type="checkbox"
                        checked={randomAlbum.played}
                        onChange={() => togglePlayed(listId || '', randomAlbum.album.id, randomAlbum.played)}
                    />
                    <span className={styles['list-page-slider']}></span>
                </label>
            )}
            <button className={styles['custom-add-button']} onClick={handleGenerateNext}>
                Generate Next
            </button>
            </div>
            )}
        </div>
        
    );
};

export default RandomAlbumOverlay;
