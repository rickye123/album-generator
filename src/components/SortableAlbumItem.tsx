import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import { ListeningPileEntry } from '../model';
import lightStyles from '../styles/modules/ListeningPile-light.module.css';
import darkStyles from '../styles/modules/ListeningPile-dark.module.css';

const SortableAlbumItem = ({ entry }: { entry: ListeningPileEntry }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: entry.id, resizeObserverConfig: {} });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [theme] = useState<'light' | 'dark'>(() => {
      // Load theme preference from localStorage or default to 'light'
      return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });
  // Use the appropriate styles based on the current theme
  const styles = theme === 'dark' ? darkStyles : lightStyles;

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners} className={styles['album-item']}>
      <a href={entry.album.spotifyUrl} target="_blank" rel="noopener noreferrer" className={styles['album-link']}>
        <img src={entry.album.imageUrl} alt={entry.album.name} className={styles['album-image']} />
        <div>
          <h3>{entry.album.name}</h3>
          <p>{entry.album.artist}</p>
        </div>
      </a>
    </li>
  );
};

export default SortableAlbumItem;
