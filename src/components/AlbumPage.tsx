import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAlbumById } from '../api/amplifyApi';
import { AlbumData } from '../model';
import './AlbumPage.css';

const AlbumPage = () => {
  const { id } = useParams<{ id: string }>();
  const [album, setAlbum] = useState<AlbumData | null>(null);

  useEffect(() => {
    const loadAlbum = async () => {
      if (id) {
        const fetchedAlbum = await fetchAlbumById(id);
        setAlbum(fetchedAlbum);
      }
    };
    loadAlbum();
  }, [id]);

  if (!album) {
    return <p>Loading album details...</p>;
  }

  return (
    <div className="album-page">
      {album ? (
        <>
          <div className="album-details">
            <img
              className="album-cover"
              src={album.imageUrl}
              alt={album.name}
            />
            <h1>{album.name}</h1>
            <p className="album-artist">{album.artist}</p>
            <a
              href={album.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="spotify-link"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
                alt="Spotify"
                className="spotify-icon"
              />
              Listen on Spotify
            </a>
          </div>
        </>
      ) : (
        <p>No album found.</p>
      )}
    </div>
  );
};

export default AlbumPage;
