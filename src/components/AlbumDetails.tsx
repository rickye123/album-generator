import React from 'react';
import './AlbumDetails.css';

interface AlbumDetailsProps {
  imageUrl: string;
  name: string;
  artist: string;
  releaseYear?: string;
  spotifyUrl?: string;
  wikipediaUrl?: string;
}

const AlbumDetails: React.FC<AlbumDetailsProps> = ({
  imageUrl,
  name,
  artist,
  releaseYear,
  spotifyUrl,
  wikipediaUrl,
}) => (
  <div className="album-details">
    <img className="album-cover" src={imageUrl} alt={name} />
    <h1>{name}</h1>
    <p className="album-artist">{artist}</p>
    {releaseYear && <p className="release-date">{releaseYear}</p>}
    {spotifyUrl && (
      <a href={spotifyUrl} target="_blank" rel="noopener noreferrer" className="spotify-link">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
          alt="Spotify"
          className="spotify-icon"
        />
        Listen on Spotify
      </a>
    )}
    {wikipediaUrl && (
      <a
        href={wikipediaUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="wikipedia-link"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/63/Wikipedia-logo.png"
          alt="Wikipedia"
          className="wikipedia-icon"
        />
      </a>
    )}
  </div>
);

export default AlbumDetails;
