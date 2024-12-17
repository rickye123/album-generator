import React from 'react';
import './Tracklist.css';

interface Track {
  id: string;
  name: string;
  durationMs: number;
}

interface TrackListProps {
  tracks: Track[];
}

const TrackList: React.FC<TrackListProps> = ({ tracks }) => {
  const msToMinutes = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <table className="track-table">
      <thead>
        <tr>
          <th className="track-header">Track</th>
          <th className="duration-header">Duration</th>
        </tr>
      </thead>
      <tbody>
        {tracks.map((track, index) => (
          <tr key={track.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
            <td>{`${index + 1}. ${track.name}`}</td>
            <td className="duration">{msToMinutes(track.durationMs)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TrackList;
