import { useState, useMemo } from 'react';
import { AlbumListData } from '../model';
import { getAlbumListsWithNames } from '../service/dataAccessors/albumListDataAccessor';

const useAlbumTable = (albums: AlbumListData[]) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [albumsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState('artist');
  const [sortDirection, setSortDirection] = useState('asc');
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [lists, setLists] = useState<string>('');
  const [touchTimer, setTouchTimer] = useState<number | null>(null);

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

  // Tooltip event handlers
  const handleMouseEnter = (albumId: string) => {
    setActiveTooltip(albumId);
    retrieveStats(albumId);
  }
  const handleMouseLeave = () => {
    setActiveTooltip(null);
    setLists('');
  }
  
  const handleTouchStart = (albumId: string) => {
    const timer = window.setTimeout(() => setActiveTooltip(albumId), 500); // Show after holding for 500ms
    setTouchTimer(timer);
    retrieveStats(albumId);
  };

  const handleTouchEnd = () => {
    if (touchTimer) {
      clearTimeout(touchTimer);
      setTouchTimer(null);
    }
    setActiveTooltip(null);
    setLists('');
  };

  const retrieveStats = async (albumId: string) => {
    if (lists.length <= 0) {
      const lists = await getAlbumListsWithNames(albumId);
      console.log('Lists:', lists);
      const listNames = lists.map((list: { list: { name: any; }; }) => list.list.name).join(', ');
      console.log('List names:', listNames);
      setLists(listNames);
    }
  };

  const indexOfLastAlbum = currentPage * albumsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;

  const filteredAlbums = useMemo(() => 
    albums.filter((album) => 
      album.album.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      album.album.artist.toLowerCase().includes(searchQuery.toLowerCase())
    ), [albums, searchQuery]);

  const sortedAlbums = useMemo(() => 
    filteredAlbums.sort((a, b) => {
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
    }), [filteredAlbums, sortKey, sortDirection]);

  const currentAlbums = sortedAlbums.slice(indexOfFirstAlbum, indexOfLastAlbum);

  return {
    currentPage,
    albumsPerPage,
    searchQuery,
    sortKey,
    sortDirection,
    handleSearch,
    handlePageChange,
    handleSortChange,
    currentAlbums,
    filteredAlbums,
    indexOfLastAlbum,
    handleMouseEnter,
    handleMouseLeave,
    handleTouchStart,
    handleTouchEnd,
    activeTooltip,
    lists,
    retrieveStats
  };
};

export default useAlbumTable;

export {}; // Add this line to make it a module
