import React, { useEffect, useState } from 'react';
import { fetchAlbums } from '../api/amplifyApi';
import { Link } from 'react-router-dom';
import './Artists.css';
import { AlbumData } from '../model';

const ArtistsPage = () => {
  const [artists, setArtists] = useState<string[]>([]);

  useEffect(() => {
    const getArtists = async () => {
      try {
        const albums: AlbumData[] = await fetchAlbums();
        const uniqueArtists = Array.from(new Set(albums.map(album => album.artist)));
        setArtists(uniqueArtists);
      } catch (error) {
        console.error('Error fetching artists', error);
      }
    };

    getArtists();
  }, []);

  return (
    <div className="artists-page">
      <h1>Artists</h1>
      {artists.length === 0 ? (
        <p>No artists found.</p>
      ) : (
        <ul className="artist-list">
          {artists.map((artist) => (
            <li key={artist} className="artist-item">
              <Link to={`/albums/artist/${encodeURIComponent(artist)}`}>{artist}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ArtistsPage;
