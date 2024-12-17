import React, { useEffect, useState } from 'react';
import { fetchAlbums } from '../api/amplifyApi';
import { Link } from 'react-router-dom';
import './Artists.css';
import { AlbumData } from '../model';

const YearsPage = () => {
  const [years, setYears] = useState<string[]>([]);

  useEffect(() => {
    const getArtists = async () => {
      try {
        const albums: AlbumData[] = await fetchAlbums();
        const uniqueYears = Array.from(new Set(albums.map(album => album.release_date.split('-')[0]))).sort();
        setYears(uniqueYears);
      } catch (error) {
        console.error('Error fetching artists', error);
      }
    };

    getArtists();
  }, []);

  return (
    <div className="artists-page">
      <h1>Artists</h1>
      {years.length === 0 ? (
        <p>No years found.</p>
      ) : (
        <ul className="artist-list">
          {years.map((year) => (
            <li key={year} className="artist-item">
              <Link to={`/albums/year/${encodeURIComponent(year)}`}>{year}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default YearsPage;
