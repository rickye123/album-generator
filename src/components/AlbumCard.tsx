import React from 'react';

interface AlbumCardProps {
  name: string;
  artist: string;
  spotifyUrl: string;
  imageUrl?: string;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ name, artist, spotifyUrl, imageUrl }) => (
  <div className="album-card">
    <img src={imageUrl || '/placeholder.png'} alt={`${name} cover`} />
    <h3>{name}</h3>
    <p>{artist}</p>
    <a href={spotifyUrl} target="_blank" rel="noopener noreferrer">
      Listen on Spotify
    </a>
  </div>
);

export default AlbumCard;