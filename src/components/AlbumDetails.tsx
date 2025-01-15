import React, { useState } from 'react';
import darkStyles from '../styles/modules/AlbumDetails-dark.module.css';
import lightStyles from '../styles/modules/AlbumDetails-light.module.css';

interface AlbumDetailsProps {
  imageUrl: string;
  name: string;
  artist: string;
  releaseYear?: string;
  spotifyUrl?: string;
  genres?: string[];
  onEdit?: (updatedName: string, updatedGenres: string[]) => void;
}

const AlbumDetails: React.FC<AlbumDetailsProps> = ({
  imageUrl,
  name,
  artist,
  releaseYear,
  spotifyUrl,
  genres = [],
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
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
      onEdit(editedName, genreArray);
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
          />
          <textarea
            value={editedGenres}
            onChange={(e) => setEditedGenres(e.target.value)}
            className={styles['edit-input']}
            placeholder="Enter genres, separated by commas"
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <h1 onClick={() => setIsEditing(true)}>{name}</h1>
      )}
      <p className={styles['album-artist']}>{artist}</p>
      {releaseYear && <p className={styles['release-date']}>{releaseYear}</p>}
      {genres.length > 0 && <p className={styles['album-genres']}>Genres: {genres.join(', ')}</p>}
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
