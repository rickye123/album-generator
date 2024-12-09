import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAlbumById, fetchWikipediaLink } from '../api/amplifyApi';
import { fetchSpotifyAlbumDetails } from '../api/spotifyApi';
import { AlbumData, SpotifyAlbumDetails } from '../model';
import './AlbumPage.css';

const AlbumPage = () => {
  const { id } = useParams<{ id: string }>();
  const [album, setAlbum] = useState<AlbumData | null>(null);
  const [spotifyDetails, setSpotifyDetails] = useState<SpotifyAlbumDetails | null>(null);
  const [wikipediaLink, setWikipediaLink] = useState<string | null>(null);

  // Fetch album details
  useEffect(() => {
    const loadAlbum = async () => {
      if (id) {
        try {
          const fetchedAlbum = await fetchAlbumById(id);
          setAlbum(fetchedAlbum);
        } catch (error) {
          console.error('Error fetching album:', error);
        }
      }
    };
    loadAlbum();
  }, [id]);

  // Fetch Spotify and Wikipedia details after album is loaded
  useEffect(() => {
    const fetchDetails = async () => {
      if (album) {
        try {
          const spotifyInfo = await fetchSpotifyAlbumDetails(album.id); 
          setSpotifyDetails(spotifyInfo);

          const wikiLink = await fetchWikipediaLink(album.name, album.artist);
          setWikipediaLink(wikiLink);
        } catch (error) {
          console.error('Error fetching additional details:', error);
        }
      }
    };
    fetchDetails();
  }, [album]);

  if (!album) {
    return <p>Loading album details...</p>;
  }

  return (
    <div className="album-page">
      {album ? (
        <>
          <div className="album-details">
            <img className="album-cover" src={album.imageUrl} alt={album.name} />
            <h1>{album.name}</h1>
            <p className="album-artist">{album.artist}</p>
            <p className="release-date">{spotifyDetails?.releaseDate?.split('-')[0]}</p>
            <a
              href={album.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="spotify-link"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
                alt="Spotify"
                className="spotify-icon"
              />
              Listen on Spotify
            </a>
            {/* Wikipedia Link */}
            {wikipediaLink && (
              <a
                href={wikipediaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="wikipedia-link"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/63/Wikipedia-logo.png"
                  alt="Wikipedia"
                  className="wikipedia-icon"
                />
              </a>
            )}
          </div>
          {/* Spotify Track List */}
          {spotifyDetails && spotifyDetails.tracks && (
            <div className="track-list-container">
              <table className="track-table">
                <thead>
                  <tr>
                    <th className="track-header">Track</th>
                    <th className="duration-header">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {spotifyDetails.tracks.map((track, index) => (
                    <tr
                      key={track.id}
                      className={index % 2 === 0 ? 'even-row' : 'odd-row'}
                    >
                      <td>{`${index + 1}. ${track.name}`}</td>
                      <td className="duration">{msToMinutes(track.durationMs)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : (
        <p>No album found.</p>
      )}
    </div>
  );
};

// Utility to format milliseconds into minutes:seconds
function msToMinutes(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export default AlbumPage;