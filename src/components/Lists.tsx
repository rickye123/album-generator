import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchLists, addList, removeList } from '../api/amplifyApi';
import { GraphQLResult } from '@aws-amplify/api-graphql';

const Lists: React.FC = () => {
  const [listName, setListName] = useState('');
  const [lists, setLists] = useState<any[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch existing lists
    const loadLists = async () => {
      try {
        const result = await fetchLists();
        if (result?.length) {
          setLists(result);
        } else {
          setLists([]); // Ensure lists is always an array
        }
      } catch (err) {
        console.error('Error fetching lists:', err);
        setError('Error loading lists.');
        setLists([]); // Fallback to empty list
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
        setLists([...lists, newList]); // Add new list to the array
        setListName(''); // Reset the input field
        setError(''); // Clear any existing error
      }
    } catch (err) {
      console.error('Error creating list:', err);
      setError('Failed to create list. Please try again.');
    }
  };

  const handleDeleteList = async (id: string) => {
    try {
      await removeList(id); // Call the API to delete the list
      setLists(lists.filter((list) => list.id !== id)); // Update state to remove the deleted list
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

        {/* Form for creating a new list */}
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

        {/* Display existing lists */}
        <h2>Existing Lists</h2>
        {lists.length === 0 ? (
            <p className="no-lists">No Lists found.</p>
        ) : (
            <ul>
            {lists.map((list) => (
                <li key={list.id}>
                <div onClick={() => handleListClick(list.id)}>
                    <h3>{list.name}</h3>
                    <p>{list.albums?.items?.length || 0} Albums</p>
                </div>
                <button
                    className="delete-button"
                    onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the list click handler
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
