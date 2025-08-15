import { useEffect, useState } from 'react';
import { AlbumData, AlbumListData } from '../model';
import darkStyles from '../styles/modules/AlbumList-dark.module.css';
import lightStyles from '../styles/modules/AlbumList-light.module.css';
import AlbumTable from '../components/AlbumTable';
import AlbumTableList from '../components/AlbumTableList';
import AlbumTableBlock from '../components/AlbumTableBlock';
import Loader from '../components/Loader';
import { getRecentAlbumsByUser } from '../service/dataAccessors/albumDataAccesor';
import { getCurrentUserId } from '../core/users';

const RecentAlbumsPage = () => {
    const [albums, setAlbums] = useState<AlbumData[]>([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState<'table' | 'list' | 'block'>(() => {
        return (localStorage.getItem('defaultView') as 'table' | 'list' | 'block') || 'table';
    });
    const [theme] = useState<'light' | 'dark'>(() => {
        return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    });
    const [userId, setUserId] = useState<string>('');
    const styles = theme === 'dark' ? darkStyles : lightStyles;

    useEffect(() => {
        const fetchRecent = async () => {
            setLoading(true);
            try {
                const userId = await getCurrentUserId();
                if (!userId) {
                    setAlbums([]);
                    setLoading(false);
                    return;
                }
                setUserId(userId);
                const recent = await getRecentAlbumsByUser(userId);
                setAlbums(recent);
            } catch (err) {
                setAlbums([]);
            } finally {
                setLoading(false);
            }
        };
        fetchRecent();
    }, []);

    const albumListData: AlbumListData[] = albums.map(album => ({ album, played: false }));

    const renderView = () => {
        switch (view) {
            case 'table':
                return <AlbumTable albums={albumListData} userId={userId} readOnly />;
            case 'list':
                return <AlbumTableList albums={albumListData} userId={userId} handleRemove={() => { }} readOnly />;
            case 'block':
                return <AlbumTableBlock albums={albumListData} />;
            default:
                return null;
        }
    };

    useEffect(() => {
        localStorage.setItem('defaultView', view);
    }, [view]);

    return (
        <div className={styles['album-list-page']}>
            <h1>Recently Added Albums</h1>
            <div className={styles['view-toggle']}>
                <button onClick={() => setView('table')} className={view === 'table' ? styles['active'] : ''}>Table View</button>
                <button onClick={() => setView('list')} className={view === 'list' ? styles['active'] : ''}>List View</button>
                <button onClick={() => setView('block')} className={view === 'block' ? styles['active'] : ''}>Block View</button>
            </div>
            {loading ? <Loader /> : (
                albums.length === 0 ? <p>No recent albums found.</p> : renderView()
            )}
        </div>
    );
};

export default RecentAlbumsPage;
