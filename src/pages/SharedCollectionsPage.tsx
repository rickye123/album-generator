import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchSharedLists } from '../api/amplifyApi';
import { getCurrentUserId } from '../core/users';
import darkStyles from '../styles/modules/Lists-dark.module.css';
import lightStyles from '../styles/modules/Lists-light.module.css';
import sharingDarkStyles from '../styles/modules/Sharing-dark.module.css';
import sharingLightStyles from '../styles/modules/Sharing-light.module.css';
import Loader from '../components/Loader';

interface SharedList {
    id: string;
    name: string;
    userId: string;
    isPublic: boolean;
    sharedWith?: string[];
    createdAt: string;
    updatedAt: string;
}

const SharedCollectionsPage: React.FC = () => {
    const [sharedLists, setSharedLists] = useState<SharedList[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentUserId, setCurrentUserId] = useState<string>('');
    const [theme] = useState<'light' | 'dark'>(() => {
        return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    });

    const styles = theme === 'dark' ? darkStyles : lightStyles;
    const sharingStyles = theme === 'dark' ? sharingDarkStyles : sharingLightStyles;
    const navigate = useNavigate();

    useEffect(() => {
        const loadSharedLists = async () => {
            try {
                setLoading(true);
                const userId = await getCurrentUserId();
                if (!userId) {
                    setLoading(false);
                    return;
                }
                setCurrentUserId(userId);

                const shared = await fetchSharedLists(userId);
                setSharedLists(shared);
            } catch (error) {
                console.error('Error loading shared lists:', error);
            } finally {
                setLoading(false);
            }
        };

        loadSharedLists();
    }, []);

    const handleListClick = (listId: string) => {
        navigate(`/shared-list/${listId}`);
    };

    return (
        <div className={styles['lists-page']}>
            <div className={styles['container']}>
                <h1>Shared Collections</h1>

                <h2>Collections Shared With You</h2>
                {loading ? (
                    <Loader />
                ) : sharedLists.length === 0 ? (
                    <p className={styles['no-lists']}>No collections have been shared with you yet.</p>
                ) : (
                    <ul>
                        {sharedLists.map((list) => (
                            <li key={list.id}>
                                <div onClick={() => handleListClick(list.id)}>
                                    <h3>{list.name}</h3>
                                    <p className={sharingStyles['list-owner']}>
                                        Shared by: {list.userId}
                                    </p>
                                    <p className={sharingStyles['list-type']}>
                                        {list.isPublic ? 'Public Collection' : 'Private Collection'}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default SharedCollectionsPage;