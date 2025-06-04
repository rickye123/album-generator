import { useState, useMemo, useEffect } from 'react';
import { AlbumListData } from '../model';
import { getAlbumListsWithNames } from '../service/dataAccessors/albumListDataAccessor';
import { useSearchParams } from 'react-router-dom';

const useAlbumTable = (albums: AlbumListData[]) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const pageParam = parseInt(searchParams.get('page') || '1', 10);
    const [currentPage, setCurrentPageState] = useState(pageParam);
    const [albumsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortKey, setSortKey] = useState('artist');
    const [sortDirection, setSortDirection] = useState('asc');
    const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
    const [lists, setLists] = useState<string>('');
    const [touchTimer, setTouchTimer] = useState<number | null>(null);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentPageState(1); // Reset to the first page on search
        setSearchParams({ page: '1' });
        setSearchQuery(e.target.value);
    };

    const setCurrentPage = (page: number) => {
        const clampedPage = Math.max(1, page);
        setCurrentPageState(clampedPage);
        setSearchParams({ page: clampedPage.toString() });
    };


    const handlePageChange = (direction: 'next' | 'prev' | 'first' | 'last') => {
        setCurrentPageState((prev: number) => {
            let newPage;
            if (direction === 'next' && indexOfLastAlbum < filteredAlbums.length) {
                newPage = prev + 1;
            } else if (direction === 'prev' && prev > 1) {
                newPage = prev - 1;
            } else if (direction === 'first') {
                newPage = 1;
            } else if (direction === 'last') {
                newPage = Math.ceil(filteredAlbums.length / albumsPerPage);
            } else {
                return prev;
            }
            setSearchParams({ page: newPage.toString() });
            return newPage;
        });
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
        if (localStorage.getItem('listStats') === 'true') {
            retrieveStats(albumId);
        }
    }
    const handleMouseLeave = () => {
        setActiveTooltip(null);
        setLists('');
    }

    const handleTouchStart = (albumId: string) => {
        const timer = window.setTimeout(() => setActiveTooltip(albumId), 500); // Show after holding for 500ms
        setTouchTimer(timer);
        if (localStorage.getItem('listStats') === 'true') {
            retrieveStats(albumId);
        }
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

    const totalPages = Math.ceil(filteredAlbums.length / albumsPerPage);

    // Handle manual page input
    const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            const numericValue = value === '' ? 1 : Math.max(1, Math.min(totalPages, Number(value)));
            setCurrentPage(numericValue);
        }
    };

    // Ensure a valid number is set when input loses focus
    const handlePageInputBlur = () => {
        if (currentPage < 1) {
            setCurrentPage(1);
        } else if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    };

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
        retrieveStats,
        handlePageInputChange,
        handlePageInputBlur,
        totalPages
    };
};

export default useAlbumTable;

export { }; // Add this line to make it a module
