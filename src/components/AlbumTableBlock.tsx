import React from 'react';
import { AlbumListData } from '../model';
import useAlbumTable from '../hooks/useAlbumTable';
import '../pages/AlbumList.css';

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

  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search albums or artists..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div className="album-block-container">
        {currentAlbums.map((albumList) => (
          <div key={albumList.album.id} className="album-block">
            <a href={albumList.album.spotifyUrl} target="_blank" rel="noopener noreferrer">
              <img src={albumList.album.imageUrl} alt={albumList.album.name} className="album-block-image" />
            </a>
          </div>
        ))}
      </div>
      <div className="pagination-controls">
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
      </div>
    </>
  );
};

export default AlbumTableBlock;
