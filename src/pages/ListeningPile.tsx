import { useEffect, useState } from 'react';
import { fetchListeningPile, reorderListeningPile, removeFromListeningPile } from '../api/amplifyApi';
import { ListeningPileEntry } from '../model';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import Loader from '../components/Loader';
import darkStyles from '../styles/modules/ListeningPile-dark.module.css';
import lightStyles from '../styles/modules/ListeningPile-light.module.css';
import SortableAlbumItem from '../components/SortableAlbumItem';

const ListeningPile = () => {
  const [listeningPile, setListeningPile] = useState<ListeningPileEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [theme] = useState<'light' | 'dark'>(() => {
    // Load theme preference from localStorage or default to 'light'
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });

  // Use the appropriate styles based on the current theme
  const styles = theme === 'dark' ? darkStyles : lightStyles;

  useEffect(() => {
    const loadListeningPile = async () => {
      setLoading(true);
      const pile = await fetchListeningPile();
      console.log('Pile:', pile);
      setListeningPile(pile);
      setLoading(false);
    };

    loadListeningPile();
  }, []);

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = listeningPile.findIndex((item) => item.id === active.id);
    const newIndex = listeningPile.findIndex((item) => item.id === over.id);

    const updatedPile = arrayMove(listeningPile, oldIndex, newIndex);
    setListeningPile(updatedPile);

    // Persist the new order
    await reorderListeningPile(active.id, newIndex);
  };

  const handleRemoveFromPile = async () => {
    if (listeningPile.length === 0) return;
    
    const topEntry = listeningPile[0];
    await removeFromListeningPile(topEntry.id);

    setListeningPile((prevPile) => prevPile.slice(1)); // Remove the first entry
  };

  return (
    <div className={styles['listening-pile-page']}>
      <h1>Listening Pile</h1>

      {loading ? <Loader /> : (
        <>
          {listeningPile.length === 0 ? (
            <p>No albums in the pile.</p>
          ) : (
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={listeningPile.map((item) => item.id)} strategy={verticalListSortingStrategy}>
                <ul className={styles['pile-list']}>
                  {listeningPile.map((entry) => (
                    <SortableAlbumItem key={entry.id} entry={entry} />
                  ))}
                </ul>
              </SortableContext>
            </DndContext>
          )}
        </>
      )}

      {listeningPile.length > 0 && (
        <button className={styles['remove-top-button']} onClick={handleRemoveFromPile}>
          Remove from Top
        </button>
      )}
    </div>
  );
};

export default ListeningPile;
