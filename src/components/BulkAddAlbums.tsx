import React, { useState } from 'react';
import Papa from 'papaparse';
import { fetchAlbum } from '../api/spotifyApi';
import { addAlbum, addAlbumToList, fetchAlbumListEntriesForAlbumId, fetchLists, removeAlbum, removeAlbumFromList } from '../api/amplifyApi';
import { getCurrentUserId } from '../core/users';
import darkStyles from '../styles/modules/AddAlbumPage-dark.module.css';
import lightStyles from '../styles/modules/AddAlbumPage-light.module.css';

const BulkAddAlbums = () => {
    const [csvFile, setCsvFile] = useState<File | null>(null);
    const [successList, setSuccessList] = useState<{ artist: string; name: string; }[]>([]);
    const [failureList, setFailureList] = useState<{ artist: string; albumName: string; error: string; }[]>([]);
    const [userId, setUserId] = useState('');
    const [addedAlbumIds, setAddedAlbumIds] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [progress, setProgress] = useState(0); // Progress for processing albums
    const [rollbackProgress, setRollbackProgress] = useState(0); // Progress for rollback operation
    const [theme] = useState(() => localStorage.getItem('theme') || 'light');
    const styles = theme === 'dark' ? darkStyles : lightStyles;

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setCsvFile(e.target.files[0]);
        }
    };

    const downloadResults = () => {
        const data = [
            ['Status', 'Artist', 'Album', 'Message'],
            ...successList.map(album => ['Success', album.artist, album.name, 'Added successfully']),
            ...failureList.map(fail => ['Failure', fail.artist, fail.albumName, fail.error])
        ];

        const csvContent = data.map(row => row.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'album_upload_results.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const processCsv = async () => {
        if (!csvFile) return;
        setLoading(true);
        setError('');
        setSuccessList([]);
        setFailureList([]);
        setAddedAlbumIds([]);
        setProgress(0); // Reset progress

        const userId = await getCurrentUserId();
        if (!userId) {
            setError('User ID not found.');
            setLoading(false);
            return;
        }
        setUserId(userId);

        Papa.parse(csvFile, {
            complete: async (result) => {
                const rows = result.data;
                if (rows.length < 2) {
                    setError('CSV file must have at least one album entry.');
                    setLoading(false);
                    return;
                }

                const headers: string[] = rows[0] as string[];
                const artistIndex = headers.indexOf('Artist');
                const albumIndex = headers.indexOf('Album');

                if (artistIndex === -1 || albumIndex === -1) {
                    setError('CSV must contain "Artist" and "Album" columns.');
                    setLoading(false);
                    return;
                }


                let successes = [];
                let failures = [];
                let addedIds = [];

                const totalItems = rows.length - 1; // Total number of albums to process

                for (let i = 1; i < rows.length; i++) {
                    const row = rows[i];
                    const artist = (row as string[])[artistIndex]?.trim();
                    const albumName = (row as string[])[albumIndex]?.trim();

                    if (!artist || !albumName) {
                        continue;
                    }

                    try {
                        const album = await fetchAlbum(albumName, artist);
                        if (!album) throw new Error('Album not found');

                        const newAlbum = {
                            id: album.id + '-' + userId,
                            name: album.name,
                            artist: album.artists[0].name,
                            release_date: album.release_date,
                            spotifyUrl: album.external_urls.spotify,
                            imageUrl: album.images[0]?.url || '',
                            hideAlbum: false,
                            userId,
                        };

                        await addAlbum(newAlbum, userId);

                        try {
                            const lists = await fetchLists(userId);
                            // Batch add to lists for this album
                            const addToListPromises = [];
                            for (const list of lists) {
                                const listIndex = headers.indexOf(list.name); // Get the index of the current list column
                                if (listIndex !== -1 && (row as string[])[listIndex]?.trim() === '1') {
                                    addToListPromises.push(addAlbumToList(newAlbum.id, list.id, userId));
                                }
                            }
                            await Promise.all(addToListPromises);
                        } catch (err) {
                            console.error('Error adding album to list:', err);
                        }

                        successes.push(newAlbum);
                        addedIds.push(newAlbum.id);
                    } catch (err) {
                        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
                        failures.push({ artist, albumName, error: errorMessage });
                    }

                    // Update the progress bar after processing each item
                    const currentProgress = Math.floor(((i) / totalItems) * 100);
                    setProgress(currentProgress);
                }

                setSuccessList(successes);
                setFailureList(failures);
                setAddedAlbumIds(addedIds);
                setLoading(false);
            },
            header: false,
        });
    };

    const handleDeleteAlbum = async (albumId: string, userId: string) => {
        try {
            // get album list entry (if one exists) and delete it
            const results = await fetchAlbumListEntriesForAlbumId(albumId);
            if (results) {
                if (results) {
                    await Promise.all(results.map((element) => removeAlbumFromList(element.id)));
                }
            }

            await removeAlbum(albumId);
        } catch (err) {
            console.error('Error deleting album:', err);
            setError('Failed to delete the album. Please try again.');
        }
    };

    const rollbackAlbums = async () => {
        if (!addedAlbumIds.length) return;
        setLoading(true);
        setRollbackProgress(0); // Reset rollback progress
        try {
            const totalItems = addedAlbumIds.length;

            for (let i = 0; i < totalItems; i++) {
                const albumId = addedAlbumIds[i];
                await handleDeleteAlbum(albumId, userId);

                // Update rollback progress
                const currentProgress = Math.floor(((i + 1) / totalItems) * 100);
                setRollbackProgress(currentProgress);
            }

            setSuccessList([]);
            setAddedAlbumIds([]);
            alert('Rollback successful. Albums removed.');
        } catch (err) {
            console.error('Rollback failed:', err);
            alert('Rollback failed. Please check console for details.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles['add-album-page']}>
            <h1>Bulk Add Albums</h1>
            <input type="file" accept=".csv" onChange={handleFileUpload} />
            <button onClick={processCsv} disabled={loading || !csvFile}>
                {loading ? 'Processing...' : 'Upload & Process CSV'}
            </button>
            {error && <p className={styles['error-message']}>{error}</p>}

            {/* Progress Bar for Album Processing */}
            {loading && !rollbackProgress && (
                <div>
                    <progress value={progress} max="100" style={{ width: '100%' }}></progress>
                    <p>{progress}% completed</p>
                </div>
            )}

            {/* Progress Bar for Rollback */}
            {loading && rollbackProgress > 0 && (
                <div>
                    <progress value={rollbackProgress} max="100" style={{ width: '100%' }}></progress>
                    <p>{rollbackProgress}% rollback completed</p>
                </div>
            )}

            {successList.length > 0 && (
                <>
                    <h2>Successfully Added Albums</h2>
                    <ul>
                        {successList.map((album, index) => (
                            <li key={index}>{album.artist} - {album.name}</li>
                        ))}
                    </ul>
                </>
            )}
            {failureList.length > 0 && (
                <>
                    <h2>Failed Albums</h2>
                    <ul>
                        {failureList.map((fail, index) => (
                            <li key={index}>{fail.artist} - {fail.albumName}: {fail.error}</li>
                        ))}
                    </ul>
                </>
            )}

            {(successList.length > 0 || failureList.length > 0) && (
                <button onClick={downloadResults}>Download Results</button>
            )}

            {addedAlbumIds.length > 0 && (
                <button onClick={rollbackAlbums} disabled={loading}>Rollback Changes</button>
            )}
        </div>
    );
};

export default BulkAddAlbums;
