import React, { useState } from 'react';
import './AlbumDetails.css';

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
    <div className="album-details">
      <img className="album-cover" src={imageUrl} alt={name} />
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="edit-input"
          />
          <textarea
            value={editedGenres}
            onChange={(e) => setEditedGenres(e.target.value)}
            className="edit-input"
            placeholder="Enter genres, separated by commas"
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <h1 onClick={() => setIsEditing(true)}>{name}</h1>
      )}
      <p className="album-artist">{artist}</p>
      {releaseYear && <p className="release-date">{releaseYear}</p>}
      {genres.length > 0 && <p className="album-genres">Genres: {genres.join(', ')}</p>}
      {spotifyUrl && (
        <a href={spotifyUrl} target="_blank" rel="noopener noreferrer" className="spotify-link">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
            alt="Spotify"
            className="spotify-icon"
          />
        </a>
      )}
    </div>
  );
};

export default AlbumDetails;
