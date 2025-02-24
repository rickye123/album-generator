import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAlbumById, fetchWikipediaLink, updateAlbumDetails } from '../api/amplifyApi';
import { fetchSpotifyAlbumDetails } from '../api/spotifyApi';
import AlbumDetails from '../components/AlbumDetails';
import CollapsibleSection from '../components/CollapsibleSection';
import darkStyles from '../styles/modules/AlbumPage-dark.module.css';
import lightStyles from '../styles/modules/AlbumPage-light.module.css';
import { AlbumData, SpotifyAlbumDetails } from '../model';
import Wikipedia from '../components/Wikipedia';
import Discogs from '../components/Discogs';
import TrackList from '../components/TrackList';
import Loader from '../components/Loader';

const AlbumPage = () => {
  const { id } = useParams<{ id: string }>();
  const [album, setAlbum] = useState<AlbumData | null>(null);
  const [spotifyDetails, setSpotifyDetails] = useState<SpotifyAlbumDetails | null>(null);
  const [wikipediaLink, setWikipediaLink] = useState<string | null>(null);
  const [theme] = useState<'light' | 'dark'>(() => {
    // Load theme preference from localStorage or default to 'light'
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });

  // Use the appropriate styles based on the current theme
  const styles = theme === 'dark' ? darkStyles : lightStyles;

  useEffect(() => {
    const loadAlbum = async () => {
      if (id) {
        const fetchedAlbum = await fetchAlbumById(id);
        setAlbum(fetchedAlbum);
      }
    };
    loadAlbum();
  }, [id]);

  useEffect(() => {
    const loadDetails = async () => {
      if (album) {
        const spotifyInfo = await fetchSpotifyAlbumDetails(album.id);
        console.log('Spotify info:', spotifyInfo);
        setSpotifyDetails(spotifyInfo);

        const wikiLink = await fetchWikipediaLink(album.name, album.artist);
        setWikipediaLink(wikiLink);
      }
    };
    loadDetails();
  }, [album]);

  const handleEditName = async (updatedName: string, updatedGenres: string[], updatedReleaseDate: string) => {
    if (album) {
      const updatedAlbum = { ...album, name: updatedName, genres: updatedGenres, release_date: updatedReleaseDate };
      setAlbum(updatedAlbum);

      try {
        await updateAlbumDetails(updatedAlbum);
        console.log('Album updated successfully');
      } catch (error) {
        console.error('Failed to update album:', error);
      }
    }
  };

  if (!album) return <Loader />;

  return (
    <div className={styles['album-page']}>
      <AlbumDetails
        imageUrl={album.imageUrl}
        name={album.name}
        artist={album.artist}
        releaseDate={album.release_date?.toString()}
        spotifyUrl={album.spotifyUrl}
        genres={album.genres ?? []}
        onEdit={handleEditName}
      />

      <CollapsibleSection title="Listen">
        <iframe
          src={`https://open.spotify.com/embed/album/${extractSpotifyAlbumId(album.spotifyUrl)}`}
          width="100%"
          height="352"
        />
      </CollapsibleSection>

      {spotifyDetails?.tracks && (
        <CollapsibleSection title="Track Listing">
          <TrackList tracks={spotifyDetails.tracks} />
        </CollapsibleSection>
      )}
      <CollapsibleSection title="Wikipedia">
        {wikipediaLink && <Wikipedia wikipediaUrl={wikipediaLink} />}
      </CollapsibleSection>
      <CollapsibleSection title="Discogs">
        <Discogs albumName={album.name} artistName={album.artist} />
      </CollapsibleSection>
    </div>
  );
};

const extractSpotifyAlbumId = (url: string) => url.match(/album\/([a-zA-Z0-9]+)/)?.[1] || '';

export default AlbumPage;