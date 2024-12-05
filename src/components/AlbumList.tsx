import React, { useEffect, useState } from 'react';
import { fetchAlbums } from '../api/amplifyApi';
import { AlbumData } from '../model';

const AlbumList = () => {
  const [albums, setAlbums] = useState<AlbumData[]>([]);

  useEffect(() => {
    const loadAlbums = async () => {
      const albumList = await fetchAlbums();
      setAlbums(albumList);
    };
    loadAlbums();
  }, []);

  return (
    <div>
      <h1>Albums</h1>
      {albums.length === 0 ? (
        <p>No albums found.</p>
      ) : (
        <ul>
          {albums.map((album: AlbumData) => (
            <li key={album.id}>
              <div>
                <h2>{album.name}</h2>
                <p>{album.artist}</p>
                <a
                  href={album.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    color: '#1DB954',
                    fontWeight: 'bold',
                  }}
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
                    alt="Spotify"
                    style={{ width: 24, height: 24, marginRight: '8px' }}
                  />
                  Listen on Spotify
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AlbumList;
