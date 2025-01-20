import React, { useState } from 'react';
import darkStyles from '../styles/modules/TrackList-dark.module.css';
import lightStyles from '../styles/modules/TrackList-light.module.css';

interface Track {
  id: string;
  name: string;
  durationMs: number;
}

interface TrackListProps {
  tracks: Track[];
}

const TrackList: React.FC<TrackListProps> = ({ tracks }) => {
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [theme] = useState<'light' | 'dark'>(() => {
    // Load theme preference from localStorage or default to 'light'
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });

  // Use the appropriate styles based on the current theme
  const styles = theme === 'dark' ? darkStyles : lightStyles;

  const msToMinutes = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleTrackClick = (track: Track) => {
    setSelectedTrack(track);
    setIsOverlayOpen(true);
  };

  const closeOverlay = () => {
    setSelectedTrack(null);
    setIsOverlayOpen(false);
  };

  return (
    <div>
      <table className={styles['track-table']}>
        <thead>
          <tr>
            <th className={styles['track-header']}>Track</th>
            <th className={styles['duration-header']}>Duration</th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((track, index) => (
            <tr
              key={track.id}
              className={index % 2 === 0 ? styles['even-row'] : styles['odd-row']}
              onClick={() => handleTrackClick(track)} // Add click handler
            >
              <td>{`${index + 1}. ${track.name}`}</td>
              <td className={styles['duration']}>{msToMinutes(track.durationMs)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Overlay */}
      {isOverlayOpen && selectedTrack && (
        <div className={styles['overlay']}>
          <div className={styles['overlay-content']}>
            <h2>Track Options</h2>
            <p>{`Track: ${selectedTrack.name}`}</p>
            <div className={styles['button-container']}>
              <button className={styles['option-button']}>Rate</button>
              <button className={styles['option-button']}>Favorite</button>
              <button className={styles['option-button']}>Hate</button>
            </div>
            <button className={styles['close-overlay-button']} onClick={closeOverlay}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackList;
