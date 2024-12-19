import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  fetchAlbumListEntry,
  fetchLists,
  getUnplayedAlbumsInList,
  removeAlbumFromList,
  togglePlayedAlbumList,
} from '../api/amplifyApi';
import './ListPage.css';
import { ListData } from '../model';

const ListPage: React.FC = () => {
  const { listId } = useParams<{ listId: string }>();
  const [list, setList] = useState<ListData | null>(null);
  const [error, setError] = useState('');
  const [randomAlbum, setRandomAlbum] = useState<any | null>(null);

  useEffect(() => {
    const loadLists = async () => {
      try {
        const results = await fetchLists();
        const foundList = results.find((l: ListData) => l.id === listId);
        console.log('FoundList', foundList);
        setList(foundList || null);
      } catch (err) {
        console.error('Error fetching list:', err);
        setError('Error loading list');
      }
    };

    loadLists();
  }, [listId]);

  if (!list) return <div>Loading...</div>;

  const handleRemoveFromList = async (listId: string, albumId: string) => {
    try {
      const albumListEntry = await fetchAlbumListEntry(listId, albumId);

      if (!albumListEntry?.id) {
        throw new Error('Failed to find AlbumList entry for removal.');
      }

      await removeAlbumFromList(albumListEntry.id);
      const results = await fetchLists();
      const foundList = results.find((l: ListData) => l.id === listId);
      setList(foundList || null);
    } catch (err) {
      console.error('Error removing album:', err);
      setError('Failed to remove the album. Please try again.');
    }
  };

  const togglePlayed = async (listId: string, albumId: string, played: boolean) => {
    try {
      const albumListEntry = await fetchAlbumListEntry(listId, albumId);

      console.log('AlbumListEntry', albumListEntry);
      if (!albumListEntry?.id) {
        throw new Error('Failed to find AlbumList entry for toggle.');
      }
      await togglePlayedAlbumList(albumListEntry.id, !played);
      const results = await fetchLists();
      const foundList = results.find((l: ListData) => l.id === listId);
      setList(foundList || null);
    } catch (err) {
      console.error('Error toggling played status:', err);
    }
  };

  const randomizeAlbum = async () => {
    try {
      const unplayedAlbums = await getUnplayedAlbumsInList(listId!);
      console.log('Unplayed albums', unplayedAlbums);

      if (unplayedAlbums.length === 0) {
        alert('No unplayed albums available.');
        return;
      }

      const randomAlbum = unplayedAlbums[Math.floor(Math.random() * unplayedAlbums.length)];
      setRandomAlbum(randomAlbum);
    } catch (err) {
      console.error('Error fetching unplayed albums:', err);
    }
  };

  const closeOverlay = () => setRandomAlbum(null);

  return (
    <div className="list-page-wrapper">
      <div className="list-page-container">
        <h1 className="list-page-title">{list.name}</h1>
        {error && <p className="list-page-error">{error}</p>}

        <button className="list-page-randomize-button" onClick={randomizeAlbum}>
          Randomize Album
        </button>

        {list.albums?.length === 0 ? (
          <p className="list-page-no-albums">No albums found.</p>
        ) : (
          <table className="list-page-album-table">
            <thead>
              <tr>
                <th>Album</th>
                <th>Details</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.albums.map((album: any, index: number) => (
                <tr key={album.id} className={index % 2 === 0 ? 'list-page-even-row' : 'list-page-odd-row'}>
                  <td>
                    <img src={album.imageUrl} alt={album.name} className="list-page-album-image" />
                  </td>
                  <td>
                    <h3 className="list-page-album-name">{album.name}</h3>
                    <p className="list-page-album-artist">{album.artist}</p>
                    <label className="list-page-switch">
                      <input
                        type="checkbox"
                        checked={album.played}
                        onChange={() => togglePlayed(list.id, album.id, album.played)}
                      />
                      <span className="list-page-slider list-page-round"></span>
                    </label>
                  </td>
                  <td>
                    <button
                      className="list-page-remove-button"
                      onClick={() => handleRemoveFromList(list.id, album.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {randomAlbum && (
        <div className="list-page-overlay">
          <div className="list-page-overlay-content">
            <button className="list-page-close-button" onClick={closeOverlay}>
              &times;
            </button>
            <img src={randomAlbum.album.imageUrl} alt={randomAlbum.album.name} className="list-page-overlay-image" />
            <h2 className="list-page-overlay-title">{randomAlbum.album.name}</h2>
            <p className="list-page-overlay-artist">{randomAlbum.album.artist}</p>
            <p className="list-page-overlay-year">{randomAlbum.album.release_date}</p>
            <a
              href={randomAlbum.album.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="list-page-overlay-link"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
                alt="Spotify"
                className="spotify-icon"
              />
            </a>
            <label className="list-page-switch">
              <input
                type="checkbox"
                checked={randomAlbum.played}
                onChange={() => togglePlayed(list.id, randomAlbum.album.id, randomAlbum.played)}
              />
              <span className="list-page-slider list-page-round"></span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListPage;
