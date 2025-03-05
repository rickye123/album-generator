import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useSwipeable } from 'react-swipeable';
import { useEffect, useState } from 'react';
import { ListeningPileEntry } from '../model';
import lightStyles from '../styles/modules/ListeningPile-light.module.css';
import darkStyles from '../styles/modules/ListeningPile-dark.module.css';

const SortableAlbumItem = ({
  entry,
  onSwipeUp,
  onSwipeDown,
}: {
  entry: ListeningPileEntry;
  onSwipeUp: () => void;
  onSwipeDown: () => void;
}) => {
  // Detect if the user is on a mobile device
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => window.innerWidth < 768;
    setIsMobile(checkMobile);
    window.addEventListener('resize', () => setIsMobile(checkMobile()));

    return () => window.removeEventListener('resize', () => setIsMobile(checkMobile()));
  }, []);

  // DnD Kit (Desktop Dragging)
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: entry.id,
    resizeObserverConfig: {},
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [theme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });

  // Use the appropriate styles based on the current theme
  const styles = theme === 'dark' ? darkStyles : lightStyles;

  // Swipeable handlers (Mobile Swiping)
  const handlers = useSwipeable({
    onSwipedLeft: () => onSwipeUp(),
    onSwipedRight: () => onSwipeDown(),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <li ref={setNodeRef} style={style} {...(isMobile ? handlers : { ...attributes, ...listeners })} className={styles['album-item']}>
      {entry.album.spotifyUrl && (<a href={entry.album.spotifyUrl} target="_blank" rel="noopener noreferrer" className={styles['album-link']}>
        <img src={entry.album.imageUrl} alt={entry.album.name} className={styles['album-image']} />
        <div>
          <h3>{entry.album.name}</h3>
          <p>{entry.album.artist}</p>
        </div>
      </a>
      )}
      {!entry.album.spotifyUrl && (
        <>
          <img src={entry.album.imageUrl} alt={entry.album.name} className={styles['album-image']} />
          <div>
            <h3>{entry.album.name}</h3>
            <p>{entry.album.artist}</p>
          </div>
        </>
      )}
    </li>
  );
};

export default SortableAlbumItem;
