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
              <img src={album.imageUrl} alt={album.name} style={{ width: 100, height: 100 }} />
              <div>
                <h2>{album.name}</h2>
                <p>{album.artist}</p>
                <p>{album.imageUrl}</p>
                <p>{album.spotifyUrl}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AlbumList;
