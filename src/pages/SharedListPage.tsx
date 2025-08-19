import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAlbumsByListId } from '../api/amplifyApi';
import { AlbumListData, ListData } from '../model';
import darkStyles from '../styles/modules/AlbumList-dark.module.css';
import lightStyles from '../styles/modules/AlbumList-light.module.css';
import AlbumTable from '../components/AlbumTable';
import AlbumTableList from '../components/AlbumTableList';
import AlbumTableBlock from '../components/AlbumTableBlock';
import Loader from '../components/Loader';
import { getCurrentUserId } from '../core/users';

const SharedListPage: React.FC = () => {
    const { listId } = useParams<{ listId: string }>();
    const [listData, setListData] = useState<ListData | null>(null);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState<'table' | 'list' | 'block'>(() => {
        return (localStorage.getItem('defaultView') as 'table' | 'list' | 'block') || 'table';
    });
    const [theme] = useState<'light' | 'dark'>(() => {
        return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    });
    const [currentUserId, setCurrentUserId] = useState<string>('');

    const styles = theme === 'dark' ? darkStyles : lightStyles;

    useEffect(() => {
        const loadListData = async () => {
            if (!listId) return;

            try {
                const userId = await getCurrentUserId();
                if (!userId) {
                    setLoading(false);
                    return;
                }
                setCurrentUserId(userId);

                const data = await fetchAlbumsByListId(listId);
                setListData(data);
            } catch (error) {
                console.error('Error loading shared list:', error);
            } finally {
                setLoading(false);
            }
        };

        loadListData();
    }, [listId]);

    useEffect(() => {
        localStorage.setItem('defaultView', view);
    }, [view]);

    const renderView = () => {
        if (!listData) return null;

        const albumListData: AlbumListData[] = listData.albums;

        switch (view) {
            case 'table':
                return <AlbumTable albums={albumListData} userId={currentUserId} readOnly />;
            case 'list':
                return <AlbumTableList albums={albumListData} userId={currentUserId} handleRemove={() => { }} readOnly />;
            case 'block':
                return <AlbumTableBlock albums={albumListData} />;
            default:
                return null;
        }
    };

    if (loading) {
        return <Loader />;
    }

    if (!listData) {
        return (
            <div className={styles['album-list-page']}>
                <h1>Collection not found</h1>
                <p>This collection may not exist or you don't have permission to view it.</p>
            </div>
        );
    }

    return (
        <div className={styles['album-list-page']}>
            <h1>{listData.name} (Shared Collection)</h1>

            <div className={styles['view-toggle']}>
                <button onClick={() => setView('table')} className={view === 'table' ? styles['active'] : ''}>
                    Table View
                </button>
                <button onClick={() => setView('list')} className={view === 'list' ? styles['active'] : ''}>
                    List View
                </button>
                <button onClick={() => setView('block')} className={view === 'block' ? styles['active'] : ''}>
                    Block View
                </button>
            </div>

            {listData.albums.length === 0 ? (
                <p>This collection is empty.</p>
            ) : (
                renderView()
            )}
        </div>
    );
};

export default SharedListPage;