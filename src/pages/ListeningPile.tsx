import { useEffect, useState } from 'react';
import { fetchListeningPile, reorderListeningPile, removeFromListeningPile } from '../api/amplifyApi';
import { ListeningPileEntry } from '../model';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import Loader from '../components/Loader';
import darkStyles from '../styles/modules/ListeningPile-dark.module.css';
import lightStyles from '../styles/modules/ListeningPile-light.module.css';
import SortableAlbumItem from '../components/SortableAlbumItem';
import { getCurrentUserId } from '../core/users';

const ListeningPile = () => {
  const [listeningPile, setListeningPile] = useState<ListeningPileEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [theme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });

  // Use the appropriate styles based on the current theme
  const styles = theme === 'dark' ? darkStyles : lightStyles;

  useEffect(() => {
    const loadListeningPile = async () => {
      setLoading(true);
      const userId = await getCurrentUserId();
      if (userId) {
        const pile = await fetchListeningPile(userId);
        setListeningPile(pile);
      } else {
        console.error('User ID is undefined');
      }
      setLoading(false);
    };

    loadListeningPile();

    // Detect if the user is on mobile
    const checkMobile = () => window.innerWidth < 768;
    setIsMobile(checkMobile);
    window.addEventListener('resize', () => setIsMobile(checkMobile()));

    return () => window.removeEventListener('resize', () => setIsMobile(checkMobile()));
  }, []);

  // Drag handler (Desktop)
  const handleDragEnd = async (event: any) => {
    if (isMobile) return; // Prevent drag on mobile

    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = listeningPile.findIndex((item) => item.id === active.id);
    const newIndex = listeningPile.findIndex((item) => item.id === over.id);

    const updatedPile = arrayMove(listeningPile, oldIndex, newIndex);
    setListeningPile(updatedPile);

    await reorderListeningPile(active.id, newIndex);
  };

  // Swipe handlers (Mobile)
const handleSwipeUp = async (id: string) => {
  const index = listeningPile.findIndex((item) => item.id === id);
  if (index <= 0) return; // Already at the top

  const updatedPile = arrayMove(listeningPile, index, index - 1);
  setListeningPile(updatedPile);

  console.log(`Reordering ${id} to index ${index - 1}`);
  try {
    await reorderListeningPile(id, index - 1);
  } catch (error) {
    console.error("Error in reorderListeningPile:", error);
  }
};

const handleSwipeDown = async (id: string) => {
  const index = listeningPile.findIndex((item) => item.id === id);
  if (index >= listeningPile.length - 1) return; // Already at the bottom

  const updatedPile = arrayMove(listeningPile, index, index + 1);
  setListeningPile(updatedPile);

  console.log(`Reordering ${id} to index ${index + 1}`);
  try {
    await reorderListeningPile(id, index + 1);
  } catch (error) {
    console.error("Error in reorderListeningPile:", error);
  }
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

      {loading ? (
        <Loader />
      ) : (
        <>
          {listeningPile.length === 0 ? (
            <p>No albums in the pile.</p>
          ) : (
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={listeningPile.map((item) => item.id)} strategy={verticalListSortingStrategy}>
                <ul className={styles['pile-list']}>
                  {listeningPile.map((entry) => (
                    <SortableAlbumItem
                      key={entry.id}
                      entry={entry}
                      onSwipeUp={() => handleSwipeUp(entry.id)}
                      onSwipeDown={() => handleSwipeDown(entry.id)}
                    />
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
