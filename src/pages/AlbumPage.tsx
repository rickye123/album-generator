import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAlbumById, fetchWikipediaLink, updateAlbumDetails } from '../api/amplifyApi';
import { fetchSpotifyAlbumDetails } from '../api/spotifyApi';
import AlbumDetails from '../components/AlbumDetails';
import CollapsibleSection from '../components/CollapsibleSection';
import darkStyles from '../styles/AlbumPage-dark.module.css';
import lightStyles from '../styles/AlbumPage-light.module.css';
import '../styles/AlbumPage.css';
import { AlbumData, SpotifyAlbumDetails } from '../model';
import Wikipedia from '../components/Wikipedia';
import Discogs from '../components/Discogs';
import TrackList from '../components/TrackList';

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
        setSpotifyDetails(spotifyInfo);

        const wikiLink = await fetchWikipediaLink(album.name, album.artist);
        setWikipediaLink(wikiLink);
      }
    };
    loadDetails();
  }, [album]);

  const handleEditName = async (updatedName: string, updatedGenres: string[]) => {
    if (album) {
      const updatedAlbum = { ...album, name: updatedName, genres: updatedGenres };
      setAlbum(updatedAlbum);

      try {
        await updateAlbumDetails(updatedAlbum);
        console.log('Album updated successfully');
      } catch (error) {
        console.error('Failed to update album:', error);
      }
    }
  };

  if (!album) return <p>Loading...</p>;

  return (
    <div className={styles['album-page']}>
      <AlbumDetails
        imageUrl={album.imageUrl}
        name={album.name}
        artist={album.artist}
        releaseYear={spotifyDetails?.releaseDate?.split('-')[0]}
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
        <Discogs />
      </CollapsibleSection>
    </div>
  );
};

const extractSpotifyAlbumId = (url: string) => url.match(/album\/([a-zA-Z0-9]+)/)?.[1] || '';

export default AlbumPage;