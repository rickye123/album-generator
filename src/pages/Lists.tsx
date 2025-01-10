import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchLists, addList, removeList, fetchAlbumListEntriesForListId, removeAlbumFromList } from '../api/amplifyApi';
import { ListData } from '../model';
import './Lists.css'; // Ensure this file is now only for Lists

const Lists: React.FC = () => {
  const [listName, setListName] = useState('');
  const [lists, setLists] = useState<ListData[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadLists = async () => {
      try {
        const result = await fetchLists();
        const sortedLists = result 
          ? result.sort((a: ListData, b: ListData) => a.name.localeCompare(b.name)) 
          : [];
        setLists(sortedLists);
      } catch (err) {
        console.error('Error fetching lists:', err);
        setError('Error loading lists.');
        setLists([]);
      }
    };

    loadLists();
  }, []);

  const handleCreateList = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!listName.trim()) {
      setError('List name cannot be empty.');
      return;
    }

    try {
      const newList = await addList(listName);
      if (newList) {
        setLists([...lists, newList]);
        setListName('');
        setError('');
      }
    } catch (err) {
      console.error('Error creating list:', err);
      setError('Failed to create list. Please try again.');
    }
  };

  const handleDeleteList = async (id: string) => {
    try {

      // get album list entry (if one exists) and delete it
      const results = await fetchAlbumListEntriesForListId(id);
      console.log('Result: ', results);
      if(results) {
        // delete each album list entry
        results.forEach(async (element: { id: string; }) => {
          await removeAlbumFromList(element.id);
        });
      }

      await removeList(id);
      setLists(lists.filter((list) => list.id !== id));
    } catch (error) {
      console.error('Error deleting list:', error);
      setError('Failed to delete the list. Please try again.');
    }
  };

  const handleListClick = (listId: string) => {
    navigate(`/list/${listId}`);
  };

  return (
    <div className="lists-page">
      <div className="container">
        <h1>My Lists</h1>
        <form onSubmit={handleCreateList}>
          <div>
            <label htmlFor="listName">New List Name:</label>
            <input
              type="text"
              id="listName"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              required
            />
          </div>
          <button type="submit">Create List</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <h2>Existing Lists</h2>
        {lists.length === 0 ? (
          <p className="no-lists">No Lists found.</p>
        ) : (
          <ul>
            {lists.map((list) => (
              <li key={list.id}>
                <div onClick={() => handleListClick(list.id)}>
                  <h3>{list.name}</h3>
                  <p>{list.albums?.length > 100 ? '>100' : list.albums?.length || 0} Albums</p>
                </div>
                <button
                  className="delete-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteList(list.id);
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Lists;
