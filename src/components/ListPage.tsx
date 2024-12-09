import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchLists } from '../api/amplifyApi';
import './Lists.css'; // Ensure the correct path to the CSS file

const ListPage: React.FC = () => {
  const { listId } = useParams<{ listId: string }>();
  const [list, setList] = useState<any | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadLists = async () => {
      try {
        const result = await fetchLists();
        const foundList = result.data?.listLists?.items.find((l: any) => l.id === listId);
        setList(foundList || null);
      } catch (err) {
        console.error('Error fetching list:', err);
        setError('Error loading list');
      }
    };

    loadLists();
  }, [listId]);

  if (!list) return <div>Loading...</div>;

  return (
    <div>
      <h1>{list.name}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <ul>
        {list.albums.items.map((album: any) => (
          <li key={album.id}>
            <h3>{album.name}</h3>
            <p>{album.artist}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListPage;
