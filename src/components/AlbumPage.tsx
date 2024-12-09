import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAlbumById, fetchWikipediaLink } from '../api/amplifyApi';
import { AlbumData } from '../model';
import './AlbumPage.css';

const AlbumPage = () => {
  const { id } = useParams<{ id: string }>();
  const [album, setAlbum] = useState<AlbumData | null>(null);
  const [wikipediaLink, setWikipediaLink] = useState<string | null>(null);

  // Fetch album details
  useEffect(() => {
    const loadAlbum = async () => {
      if (id) {
        try {
          const fetchedAlbum = await fetchAlbumById(id);
          setAlbum(fetchedAlbum);
        } catch (error) {
          console.error('Error fetching album:', error);
        }
      }
    };
    loadAlbum();
  }, [id]);

  // Fetch Wikipedia link after album is loaded
  useEffect(() => {
    const fetchLink = async () => {
      if (album) {
        try {
          const link = await fetchWikipediaLink(album.name, album.artist);
          setWikipediaLink(link);
        } catch (error) {
          console.error('Error fetching Wikipedia link:', error);
        }
      }
    };
    fetchLink();
  }, [album]);

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
            {/* Render Wikipedia logo only if a link is found */}
            {wikipediaLink && (
              <a
                href={wikipediaLink}
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
        </>
      ) : (
        <p>No album found.</p>
      )}
    </div>
  );
};

export default AlbumPage;
