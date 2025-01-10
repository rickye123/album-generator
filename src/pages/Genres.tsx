import React, { useEffect, useState } from 'react';
import { fetchAlbums } from '../api/amplifyApi';
import { Link } from 'react-router-dom';
import './Artists.css';
import { AlbumData } from '../model';

const Genres = () => {
  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    const getGenres = async () => {
      try {
        const albums: AlbumData[] = await fetchAlbums();
        const uniqueGenres = Array.from(
          new Set(
            albums
              .flatMap((album) => album.genres || []) // Flatten all genres into one array
              .map((genre) => genre.trim()) // Normalize genres
          )
        ).sort();
        setGenres(uniqueGenres);
      } catch (error) {
        console.error('Error fetching genres', error);
      }
    };

    getGenres();
  }, []);

  return (
    <div className="artists-page">
      <h1>Genres</h1>
      {genres.length === 0 ? (
        <p>No genres found.</p>
      ) : (
        <ul className="artist-list">
          {genres.map((genre) => (
            <li key={genre} className="artist-item">
              <Link to={`/albums/genre/${encodeURIComponent(genre)}`}>{genre}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Genres;
