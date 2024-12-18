import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAlbumListEntry, fetchLists, removeAlbumFromList } from '../api/amplifyApi';
import './ListPage.css';
import { ListData } from '../model';

const ListPage: React.FC = () => {
  const { listId } = useParams<{ listId: string }>();
  const [list, setList] = useState<ListData | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadLists = async () => {
      try {
        const results = await fetchLists();
        const foundList = results.find((l: ListData) => l.id === listId);
        console.log('Found list: ', foundList);
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

      // Fetch the AlbumList entry
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

  return (
    <div className="list-page">
      <div className="container">
        <h1>{list.name}</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {list.albums?.length === 0 ? (
          <p className="no-albums">No albums found.</p>
          ) : (
        <table className="album-table">
          <thead>
            <tr>
              <th>Album</th>
              <th>Details</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.albums.map((album: any, index: number) => (
              <tr key={album.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                <td>
                  <img
                    src={album.imageUrl}
                    alt={album.name}
                    className="album-image"
                  />
                </td>
                <td>
                  <h3>{album.name}</h3>
                  <p>{album.artist}</p>
                </td>
                <td>
                  <button
                    className="remove-button"
                    onClick={() => handleRemoveFromList(list.id, album.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>)}
      </div>
    </div>
  );
};

export default ListPage;
