import React, { useState } from 'react';
import '../styles/Tracklist.css';

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
      <table className="track-table">
        <thead>
          <tr>
            <th className="track-header">Track</th>
            <th className="duration-header">Duration</th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((track, index) => (
            <tr
              key={track.id}
              className={index % 2 === 0 ? 'even-row' : 'odd-row'}
              onClick={() => handleTrackClick(track)} // Add click handler
            >
              <td>{`${index + 1}. ${track.name}`}</td>
              <td className="duration">{msToMinutes(track.durationMs)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Overlay */}
      {isOverlayOpen && selectedTrack && (
        <div className="overlay">
          <div className="overlay-content">
            <h2>Track Options</h2>
            <p>{`Track: ${selectedTrack.name}`}</p>
            <div className="button-container">
              <button className="option-button">Rate</button>
              <button className="option-button">Favorite</button>
              <button className="option-button">Hate</button>
            </div>
            <button className="close-overlay-button" onClick={closeOverlay}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackList;
