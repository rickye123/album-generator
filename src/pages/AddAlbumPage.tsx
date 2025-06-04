import React, { useState, useEffect } from 'react';
import {
    fetchAlbum,
    fetchAlbumBySpotifyUrl
} from '../api/spotifyApi';
import {
    uploadImageToS3
} from '../api/amplifyApi';
import darkStyles from '../styles/modules/AddAlbumPage-dark.module.css';
import lightStyles from '../styles/modules/AddAlbumPage-light.module.css';
import { ListData } from '../model';
import { getCurrentUserId } from '../core/users';
import BulkAddAlbums from '../components/BulkAddAlbums';
import { getListsByUser } from '../service/dataAccessors/listDataAccessor';
import { createAlbum } from '../service/dataAccessors/albumDataAccesor';
import { addAlbumToListForUser } from '../service/dataAccessors/albumListDataAccessor';

const AddAlbumPage = () => {
    const [artist, setArtist] = useState('');
    const [userId, setUserId] = useState('');
    const [name, setAlbumName] = useState('');
    const [spotifyUrl, setSpotifyUrl] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [genres, setGenres] = useState<string[]>([]);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [entryMode, setEntryMode] = useState<'spotify' | 'manual' | 'bulk'>('spotify');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const [lists, setLists] = useState<ListData[]>([]);
    const [selectedListId, setSelectedListId] = useState('');
    const [theme] = useState<'light' | 'dark'>(() => {
        return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    });

    const styles = theme === 'dark' ? darkStyles : lightStyles;

    useEffect(() => {
        const loadLists = async () => {
            try {
                const userId = await getCurrentUserId();
                if (userId) {
                    setUserId(userId);
                    const result = await getListsByUser(userId);
                    const sortedLists = result
                        ? result.sort((a: ListData, b: ListData) => a.name.localeCompare(b.name))
                        : [];
                    setLists(sortedLists);
                } else {
                    setError('User ID not found.');
                }
            } catch (err) {
                console.error('Error fetching lists:', err);
                setError('Error loading lists.');
            }
        };
        loadLists();
    }, []);

    const handleAddAlbum = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            let album;
            let imageUrl = '';

            if (entryMode === 'manual') {
                let albumId = crypto.randomUUID();
                // Upload image to S3
                if (imageFile) {
                    imageUrl = await uploadImageToS3(imageFile, albumId);
                }

                album = {
                    id: albumId + '-' + userId,
                    name,
                    artist,
                    release_date: releaseDate,
                    spotifyUrl: '',
                    imageUrl,
                    genres,
                    hideAlbum: false,
                    userId,
                };
            } else {
                if (spotifyUrl) {
                    album = await fetchAlbumBySpotifyUrl(spotifyUrl);
                } else {
                    album = await fetchAlbum(name, artist);
                }

                if (!album) {
                    setError('Album not found. Please check the details.');
                    setLoading(false);
                    return;
                }

                const newAlbum = {
                    id: album.id + '-' + userId,
                    name: album.name,
                    artist: album.artists[0].name,
                    release_date: album.release_date,
                    spotifyUrl: album.external_urls.spotify,
                    imageUrl: album.images[0]?.url || '',
                    hideAlbum: false,
                    userId: userId
                };
                album = newAlbum

            }

            await createAlbum(album, userId);

            if (selectedListId) {
                await addAlbumToListForUser(album.id, selectedListId, userId);
                setSuccessMessage(`Album ${album.name} added successfully to the selected list!`);
            } else {
                setSuccessMessage(`Album ${album.name} added successfully!`);
            }

            setArtist('');
            setAlbumName('');
            setSpotifyUrl('');
            setReleaseDate('');
            setGenres([]);
            setImageFile(null);
            setSelectedListId('');
        } catch (err) {
            console.error('Error adding album:', err);
            setError('Failed to add album. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles['add-album-page']}>
            <h1>Add a New Album</h1>
            <div>
                <button className='addAlbumPageButton' onClick={() => setEntryMode('spotify')} disabled={entryMode === 'spotify'}>
                    Fetch from Spotify
                </button>
                <button className='addAlbumPageButton' onClick={() => setEntryMode('manual')} disabled={entryMode === 'manual'}>
                    Manual Entry
                </button>
                <button className='addAlbumPageButton' onClick={() => setEntryMode('bulk')} disabled={entryMode === 'bulk'}>
                    Bulk Upload
                </button>
            </div>

            {entryMode === 'bulk' ? (
                <BulkAddAlbums />
            ) : (
                <form className={styles['add-album-form']} onSubmit={handleAddAlbum}>
                    {entryMode === 'spotify' && (
                        <>
                            <div className={styles['form-group']}>
                                <label htmlFor="spotifyUrl">Spotify URL (Optional):</label>
                                <input
                                    type="text"
                                    id="spotifyUrl"
                                    value={spotifyUrl}
                                    onChange={(e) => setSpotifyUrl(e.target.value)}
                                />
                            </div>
                            <p>Or Enter Artist and Album Name:</p>
                            <div className={styles['form-group']}>
                                <label htmlFor="artist">Artist:</label>
                                <input
                                    type="text"
                                    id={styles['artist']}
                                    value={artist}
                                    onChange={(e) => setArtist(e.target.value)}
                                    required={!spotifyUrl}
                                    disabled={!!spotifyUrl}
                                />
                            </div>
                            <div className={styles['form-group']}>
                                <label htmlFor="albumName">Album Name:</label>
                                <input
                                    type="text"
                                    id={styles['albumName']}
                                    value={name}
                                    onChange={(e) => setAlbumName(e.target.value)}
                                    required={!spotifyUrl}
                                    disabled={!!spotifyUrl}
                                />
                            </div>
                        </>
                    )}
                    {entryMode === 'manual' && (
                        <>
                            <div className={styles['form-group']}>
                                <label htmlFor="artist">Artist:</label>
                                <input
                                    type="text"
                                    id="artist"
                                    value={artist}
                                    onChange={(e) => setArtist(e.target.value)}
                                    required
                                />
                            </div>
                            <div className={styles['form-group']}>
                                <label htmlFor="albumName">Album Name:</label>
                                <input
                                    type="text"
                                    id="albumName"
                                    value={name}
                                    onChange={(e) => setAlbumName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className={styles['form-group']}>
                                <label htmlFor="releaseDate">Release Date:</label>
                                <input
                                    type="date"
                                    id="releaseDate"
                                    value={releaseDate}
                                    onChange={(e) => setReleaseDate(e.target.value)}
                                    required
                                />
                            </div>
                            <div className={styles['form-group']}>
                                <label htmlFor="genres">Genres (comma-separated):</label>
                                <input
                                    type="text"
                                    id="genres"
                                    value={genres.join(', ')}
                                    onChange={(e) => setGenres(e.target.value.split(',').map(g => g.trim()))}
                                />
                            </div>
                            <div className={styles['form-group']}>
                                <label htmlFor="image">Album Artwork:</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                                    required
                                />
                            </div>
                        </>
                    )}
                    {(entryMode === 'manual' || entryMode === 'spotify') && (
                        <>
                            <div className={styles['form-group']}>
                                <label htmlFor="list">Add to List (Optional):</label>
                                <select
                                    id="list"
                                    value={selectedListId}
                                    onChange={(e) => setSelectedListId(e.target.value)}
                                >
                                    <option value="">None</option>
                                    {lists.map((list: ListData) => (
                                        <option key={list.id} value={list.id}>
                                            {list.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button className='addAlbumPageButton' type="submit" disabled={loading}>
                                {loading ? 'Adding Album...' : 'Add Album'}
                            </button>

                            {error && <p className={styles['error-message']}>{error}</p>}
                            {successMessage && <p className={styles['success-message']}>{successMessage}</p>}
                        </>
                    )}
                </form>
            )}
        </div>
    );
};

export default AddAlbumPage;
