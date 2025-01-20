import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlbumListData, AlbumData } from '../model';
import useAlbumTable from '../hooks/useAlbumTable';
import darkStyles from '../styles/modules/AlbumList-dark.module.css';
import lightStyles from '../styles/modules/AlbumList-light.module.css';

interface AlbumTableProps {
  albums: AlbumListData[];
  listId?: string;
  handleRemove: (albumId: string, listId: string) => void;
  togglePlayed?: (listId: string, albumId: string, played: boolean) => void;
  toggleMenu?: (albumId: string) => void;
  menuOpen?: { [key: string]: boolean };
  openOverlay?: (album: AlbumData) => void; // New prop for opening overlay
}

const AlbumTable: React.FC<AlbumTableProps> = ({
  albums,
  listId,
  handleRemove,
  togglePlayed,
  toggleMenu,
  menuOpen,
  openOverlay,
}) => {
  const {
    currentPage,
    searchQuery,
    sortKey,
    sortDirection,
    handleSearch,
    handlePageChange,
    handleSortChange,
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
      <table className={styles['album-table']}>
        <thead>
          <tr>
            <th onClick={() => handleSortChange('name')}>
              Album Name {sortKey === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSortChange('artist')}>
              Artist {sortKey === 'artist' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentAlbums.map((albumList) => (
            <tr key={albumList.album.id}>
              <td className={styles['artist-album-cell']}>
                <Link to={`/albums/${albumList.album.id}`}>
                  <img src={albumList.album.imageUrl} alt={albumList.album.name} className={styles['list-page-album-image']} />
                </Link>
              </td>
              <td>
                <h3 className={styles['list-page-album-name']}>{albumList.album.name}</h3>
                <p className={styles['list-page-album-artist']}>
                  <Link to={`/albums/artist/${encodeURIComponent(albumList.album.artist)}`} className={styles['album-link']}>{albumList.album.artist}</Link>
                </p>
                {listId && togglePlayed && (
                  <label className={styles['list-page-switch']}>
                      <input
                          type="checkbox"
                          checked={albumList.played}
                          onChange={() => togglePlayed(listId, albumList.album.id, albumList.played)}
                      />
                      <span className={styles['list-page-slider']}></span>
                  </label>
                )}
              </td>
              <td className={styles['more-options-cell']}>
                <div className={styles['more-options-container']}>
                  <a
                    href={albumList.album.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                      className={styles['spotify-link']}
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
                      alt="Spotify"
                      className={styles['spotify-link']}
                    />
                  </a>
                  {toggleMenu && (
                    <button
                      className={styles['more-options-button']}
                      onClick={() => toggleMenu(albumList.album.id)}
                    >
                      ⋮
                    </button>
                  )}
                  {listId && menuOpen && menuOpen[albumList.album.id] && (
                    <div className={styles['dropdown-menu']}>
                      <button onClick={() => handleRemove(albumList.album.id, listId)}>Remove</button>
                    </div>
                  )}
                  {!listId && menuOpen && menuOpen[albumList.album.id] && (
                    <div className={styles['dropdown-menu']}>
                        <button onClick={() => handleRemove(albumList.album.id, "")}>Delete</button>
                        {openOverlay && (<button onClick={() => openOverlay(albumList.album)}>Add to List</button>)}
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles['pagination-controls']}>
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

export default AlbumTable;