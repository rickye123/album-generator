import React, { useState } from 'react';
import { AlbumListData } from '../model';
import useAlbumTable from '../hooks/useAlbumTable';
import darkStyles from '../styles/modules/AlbumList-dark.module.css';
import lightStyles from '../styles/modules/AlbumList-light.module.css';

interface AlbumTableBlockProps {
  albums: AlbumListData[];
}

const AlbumTableBlock: React.FC<AlbumTableBlockProps> = ({ albums }) => {
  const {
    currentPage,
    searchQuery,
    handleSearch,
    handlePageChange,
    currentAlbums,
    filteredAlbums,
    indexOfLastAlbum,
  } = useAlbumTable(albums);

  const albumsPerPage = 10; // Define albumsPerPage

  const [theme] = useState<'light' | 'dark'>(() => {
    // Load theme preference from localStorage or default to 'light'
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });

  // Use the appropriate styles based on the current theme
  const styles = theme === 'dark' ? darkStyles : lightStyles;

  return (
    <>
      <div className={styles['search-bar']}>
        <input
          type="text"
          placeholder="Search albums or artists..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div className={styles['album-block-container']}>
        {currentAlbums.map((albumList) => (
          <div key={albumList.album.id} className={`${styles['album-block']} ${albumList.album.hideAlbum ? styles['hidden-album-block'] : styles['visible-album-block']}` }>
            {albumList.album.spotifyUrl ? (<a href={albumList.album.spotifyUrl} target="_blank" rel="noopener noreferrer">
              <img src={albumList.album.imageUrl} alt={albumList.album.name} className={styles['album-block-image']} />
              <div className={styles['album-block-overlay']}>
                <div className={styles['album-block-text']}>
                  <p>{albumList.album.name}</p>
                  <p>{albumList.album.artist}</p>
                </div>
              </div>
            </a>
            ) : (
              <>
              <img src={albumList.album.imageUrl} alt={albumList.album.name} className={styles['album-block-image']} />
              <div className={styles['album-block-overlay']}>
                <div className={styles['album-block-text']}>
                  <p>{albumList.album.name}</p>
                  <p>{albumList.album.artist}</p>
                </div>
              </div>
              </>
            )}
          </div>
        ))}
      </div>
      <div className={styles['pagination-controls']}>
        <button onClick={() => handlePageChange('first')} disabled={currentPage === 1}>
          First
        </button>
        <button onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(filteredAlbums.length / albumsPerPage)}
        </span>
        <button
          onClick={() => handlePageChange('next')}
          disabled={indexOfLastAlbum >= filteredAlbums.length}
        >
          Next
        </button>
        <button
          onClick={() => handlePageChange('last')}
          disabled={indexOfLastAlbum >= filteredAlbums.length}
        >
          Last
        </button>
      </div>
    </>
  );
};

export default AlbumTableBlock;
