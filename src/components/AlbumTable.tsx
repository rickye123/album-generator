import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlbumListData, AlbumData } from '../model';
import '../pages/AlbumList.css';

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
  const [currentPage, setCurrentPage] = useState(1);
  const [albumsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState('artist');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (direction: 'next' | 'prev') => {
    if (direction === 'next' && indexOfLastAlbum < filteredAlbums.length) {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleSortChange = (key: string) => {
    if (sortKey === key) {
      setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const stripThePrefix = (name: string) => {
    const lowerCaseName = name.toLowerCase();
    return lowerCaseName.startsWith("the ") ? name.slice(4) : name;
  };

  const indexOfLastAlbum = currentPage * albumsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;

  const filteredAlbums = albums.filter((album) => 
    album.album.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    album.album.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedAlbums = filteredAlbums.sort((a, b) => {
    const getSortValue = (album: AlbumListData) => {
      if (sortKey === 'name') {
        return stripThePrefix(album.album.name);
      } else if (sortKey === 'artist') {
        return stripThePrefix(album.album.artist);
      }
      return '';
    };

    const valueA = getSortValue(a);
    const valueB = getSortValue(b);

    return sortDirection === 'asc'
      ? valueA.localeCompare(valueB)
      : valueB.localeCompare(valueA);
  });

  const currentAlbums = sortedAlbums.slice(indexOfFirstAlbum, indexOfLastAlbum);

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
      <table className="album-table">
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
              <td className="artist-album-cell">
                <Link to={`/albums/${albumList.album.id}`}>
                  <img src={albumList.album.imageUrl} alt={albumList.album.name} className="list-page-album-image" />
                </Link>
              </td>
              <td>
                <h3 className="list-page-album-name">{albumList.album.name}</h3>
                <p className="list-page-album-artist">{albumList.album.artist}</p>
                {listId && togglePlayed && (
                  <label className="list-page-switch">
                    <input
                      type="checkbox"
                      checked={albumList.played}
                      onChange={() => togglePlayed(listId, albumList.album.id, albumList.played)}
                    />
                    <span className="list-page-slider list-page-round"></span>
                  </label>
                )}
              </td>
              <td className="more-options-cell">
                <div className="more-options-container">
                  <a
                    href={albumList.album.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="spotify-link"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
                      alt="Spotify"
                      className="spotify-link"
                    />
                  </a>
                  {toggleMenu && (
                    <button
                      className="more-options-button"
                      onClick={() => toggleMenu(albumList.album.id)}
                    >
                      ⋮
                    </button>
                  )}
                  {listId && menuOpen && menuOpen[albumList.album.id] && (
                    <div className="dropdown-menu">
                      <button onClick={() => handleRemove(albumList.album.id, listId)}>Remove</button>
                    </div>
                  )}
                  {!listId && menuOpen && menuOpen[albumList.album.id] && (
                    <div className="dropdown-menu">
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

export default AlbumTable;