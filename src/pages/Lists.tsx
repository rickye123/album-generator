import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAlbumListEntriesForListId, removeAlbumFromList } from '../api/amplifyApi';
import { ListData } from '../model';
import darkStyles from '../styles/modules/Lists-dark.module.css';
import lightStyles from '../styles/modules/Lists-light.module.css';
import Loader from '../components/Loader';
import { getCurrentUserId } from '../core/users';
import { createList, deleteList, getListsByUser } from '../service/dataAccessors/listDataAccessor';
const Lists: React.FC = () => {
    const [listName, setListName] = useState('');
    const [userId, setUserId] = useState('');
    const [loading, setLoading] = useState(true);
    const [lists, setLists] = useState<ListData[]>([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [theme] = useState<'light' | 'dark'>(() => {
        // Load theme preference from localStorage or default to 'light'
        return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    });

    // Use the appropriate styles based on the current theme
    const styles = theme === 'dark' ? darkStyles : lightStyles;
    useEffect(() => {
        const loadLists = async () => {
            try {
                setLoading(true);
                const userId = await getCurrentUserId();
                if (userId) {
                    setUserId(userId);
                    const result = await getListsByUser(userId);
                    const sortedLists = result
                        ? result.sort((a: ListData, b: ListData) => a.name.localeCompare(b.name))
                        : [];
                    setLists(sortedLists);
                } else {
                    setLists([]);
                }
            } catch (err) {
                console.error('Error fetching lists:', err);
                setError('Error loading lists.');
                setLists([]);
            } finally {
                setLoading(false);
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
            const newList = await createList(listName, userId);
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
            const confirmed = window.confirm('Are you sure you want to delete this Collection?');
            if (!confirmed) return;
            // get album list entry (if one exists) and delete it
            const results = await fetchAlbumListEntriesForListId(id);
            console.log('Result: ', results);
            if (results) {
                // delete each album list entry
                results.forEach(async (element: { id: string; }) => {
                    await removeAlbumFromList(element.id);
                });
            }

            await deleteList(id, userId);
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
        <div className={styles['lists-page']}>
            <div className={styles['container']}>
                <h1>My Collections</h1>
                <form onSubmit={handleCreateList}>
                    <div>
                        <label htmlFor={styles['listName']}>New Collection Name:</label>
                        <input
                            type="text"
                            id={styles['listName']}
                            value={listName}
                            onChange={(e) => setListName(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Create Collection</button>
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <h2>Existing Collections</h2>
                {loading ? <Loader /> : lists.length === 0 ? (
                    <p className={styles['no-lists']}>No Collections found.</p>
                ) : (
                    <ul>
                        {lists.map((list) => (
                            <li key={list.id}>
                                <div onClick={() => handleListClick(list.id)}>
                                    <h3>{list.name}</h3>
                                    <p>{list.albums?.length > 99 ? '> 100' : list.albums?.length || 0} Albums</p>
                                </div>
                                <button
                                    className={styles['delete-button']}
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
