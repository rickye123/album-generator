import React, { useEffect, useState } from 'react';
import { fetchAlbums } from '../api/amplifyApi';
import { AlbumData } from '../model';
import './AlbumList.css'; // Ensure the correct path
import { Link } from 'react-router-dom';

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
    <div className="album-list-page">
      <h1>Albums</h1>
      {albums.length === 0 ? (
        <p className="no-albums">No albums found.</p>
      ) : (
        <table className="album-table">
          <thead>
            <tr>
              <th>Album Name</th>
              <th>Artist</th>
              <th>Spotify</th>
            </tr>
          </thead>
          <tbody>
            {albums.map((album: AlbumData) => (
              <tr key={album.id}>
                <td>
                  <Link to={`/albums/${album.id}`}>{album.name}</Link>
                </td>
                <td>{album.artist}</td>
                <td>
                  <a
                    href={album.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="spotify-link"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
                      alt="Spotify"
                    />
                    Listen on Spotify
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AlbumList;
