import React, { useState } from 'react';
import darkStyles from '../styles/modules/Sharing-dark.module.css';
import lightStyles from '../styles/modules/Sharing-light.module.css';
import { shareListForUser, toggleListPublicVisibilityForUser, unshareListForUser } from '../service/dataAccessors/albumListDataAccessor';

interface SharingControlsProps {
    listId: string;
    isPublic: boolean;
    sharedWith: string[];
    userId: string;
    onUpdate: () => void;
    theme?: 'light' | 'dark';
}

const SharingControls: React.FC<SharingControlsProps> = ({
    listId,
    isPublic,
    sharedWith,
    userId,
    onUpdate,
    theme = 'light'
}) => {
    const [emailToShare, setEmailToShare] = useState('');
    const [loading, setLoading] = useState(false);

    const styles = theme === 'dark' ? darkStyles : lightStyles;

    const handleTogglePublic = async () => {
        setLoading(true);
        try {
            await toggleListPublicVisibilityForUser(userId, listId, !isPublic);
            onUpdate();
        } catch (error) {
            console.error('Error toggling visibility:', error);
            alert('Failed to update visibility');
        } finally {
            setLoading(false);
        }
    };

    const handleShareWithUser = async () => {
        if (!emailToShare.trim()) {
            alert('Please enter a username or email');
            return;
        }

        setLoading(true);
        try {
            await shareListForUser(userId, listId, emailToShare.trim());
            setEmailToShare('');
            onUpdate();
            alert('Collection shared successfully!');
        } catch (error) {
            console.error('Error sharing list:', error);
            alert('Failed to share collection');
        } finally {
            setLoading(false);
        }
    };

    const handleUnshareWithUser = async (usernameOrEmail: string) => {
        setLoading(true);
        try {
            await unshareListForUser(userId, listId, usernameOrEmail);
            onUpdate();
        } catch (error) {
            console.error('Error unsharing list:', error);
            alert('Failed to unshare collection');
        } finally {
            setLoading(false);
        }
    }; return (
        <div className={styles['sharing-controls']}>
            <h3>Sharing Settings</h3>

            <div className={styles['visibility-control']}>
                <label>
                    <input
                        type="checkbox"
                        checked={isPublic}
                        onChange={handleTogglePublic}
                        disabled={loading}
                    />
                    Make this collection public
                </label>
                <p className={styles['help-text']}>
                    Public collections can be viewed by anyone
                </p>
            </div>

            <div className={styles['share-with-user']}>
                <h4>Share with specific users</h4>
                <div className={styles['share-input-group']}>
                    <input
                        type="text"
                        placeholder="Enter username or email"
                        value={emailToShare}
                        onChange={(e) => setEmailToShare(e.target.value)}
                        disabled={loading}
                    />
                    <button onClick={handleShareWithUser} disabled={loading || !emailToShare.trim()}>
                        Share
                    </button>
                </div>
            </div>

            {sharedWith && sharedWith.length > 0 && (
                <div className={styles['shared-users']}>
                    <h4>Shared with:</h4>
                    <ul>
                        {sharedWith.map((usernameOrEmail) => (
                            <li key={usernameOrEmail} className={styles['shared-user-item']}>
                                <span>{usernameOrEmail}</span>
                                <button
                                    onClick={() => handleUnshareWithUser(usernameOrEmail)}
                                    disabled={loading}
                                    className={styles['unshare-button']}
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SharingControls;