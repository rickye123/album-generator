import React, { useState } from 'react';
import darkStyles from '../styles/modules/AlbumDetails-dark.module.css';
import lightStyles from '../styles/modules/AlbumDetails-light.module.css';
import { Link } from 'react-router-dom';

interface AlbumDetailsProps {
    imageUrl: string;
    name: string;
    artist: string;
    releaseDate?: string;
    spotifyUrl?: string;
    genres?: string[];
    onEdit?: (updatedName: string, updatedGenres: string[], updatedReleaseDate: string) => void;
}

const AlbumDetails: React.FC<AlbumDetailsProps> = ({
    imageUrl,
    name,
    artist,
    releaseDate,
    spotifyUrl,
    genres = [],
    onEdit,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(name);
    const [editedReleaseDate, setEditedReleaseDate] = useState(releaseDate || '');
    const [editedGenres, setEditedGenres] = useState(genres.join(', '));
    const [theme] = useState<'light' | 'dark'>(() => {
        // Load theme preference from localStorage or default to 'light'
        return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    });

    // Use the appropriate styles based on the current theme
    const styles = theme === 'dark' ? darkStyles : lightStyles;

    const handleSave = () => {
        if (onEdit) {
            const genreArray = editedGenres
                .split(',')
                .map((genre) => genre.trim())
                .filter((genre) => genre !== ''); // Ensure no empty strings
            onEdit(editedName, genreArray, editedReleaseDate);
        }
        setIsEditing(false);
    };

    return (
        <div className={styles['album-details']}>
            <img className={styles['album-cover']} src={imageUrl} alt={name} />
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className={styles['edit-input']}
                        placeholder="Enter album name"
                    />
                    <textarea
                        value={editedGenres}
                        onChange={(e) => setEditedGenres(e.target.value)}
                        className={styles['edit-input']}
                        placeholder="Enter genres, separated by commas"
                    />
                    <input
                        type="text"
                        value={editedReleaseDate}
                        onChange={(e) => setEditedReleaseDate(e.target.value)}
                        className={styles['edit-input']}
                        placeholder="Enter release date"
                    />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <h1 onClick={() => setIsEditing(true)}>{name}</h1>
            )}
            <p className={styles['album-artist']}>
                <Link to={`/albums/artist/${encodeURIComponent(artist)}`} className={styles['album-link']}>{artist}</Link>
            </p>
            {releaseDate &&
                <p className={styles['release-date']}>
                    <Link to={`/albums/year/${encodeURIComponent(releaseDate?.split('-')[0])}`} className={styles['album-link']}>{releaseDate?.split('-')[0]}</Link>
                </p>
            }
            {genres.length > 0 &&
                <p className={styles['album-genres']}>
                    Genres: {genres.map((genre, index) => (
                        <React.Fragment key={genre}>
                            <Link to={`/albums/genre/${encodeURIComponent(genre)}`} className={styles['album-link']}>
                                {genre}
                            </Link>
                            {index < genres.length - 1 && ', '}
                        </React.Fragment>
                    ))}
                </p>
            }
            {spotifyUrl && (
                <a href={spotifyUrl} target="_blank" rel="noopener noreferrer" className={styles['spotify-link']}>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
                        alt="Spotify"
                        className={styles['spotify-icon']}
                    />
                </a>
            )}
        </div>
    );
};

export default AlbumDetails;
