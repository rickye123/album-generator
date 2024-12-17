import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAlbumById, fetchWikipediaLink } from '../api/amplifyApi';
import { fetchSpotifyAlbumDetails } from '../api/spotifyApi';
import AlbumDetails from './AlbumDetails';
import CollapsibleSection from './CollapsibleSection';
import './AlbumPage.css';
import { AlbumData, SpotifyAlbumDetails } from '../model';
import TrackList from './Tracklist';
import Wikipedia from './Wikipedia';

const AlbumPage = () => {
  const { id } = useParams<{ id: string }>();
  const [album, setAlbum] = useState<AlbumData | null>(null);
  const [spotifyDetails, setSpotifyDetails] = useState<SpotifyAlbumDetails | null>(null);
  const [wikipediaLink, setWikipediaLink] = useState<string | null>(null);

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

  if (!album) return <p>Loading...</p>;

  return (
    <div className="album-page">
      <AlbumDetails
        imageUrl={album.imageUrl}
        name={album.name}
        artist={album.artist}
        releaseYear={spotifyDetails?.releaseDate?.split('-')[0]}
        spotifyUrl={album.spotifyUrl}
      />

      <CollapsibleSection title="Listen" 
        defaultOpen>
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
          {wikipediaLink && (<Wikipedia wikipediaUrl={wikipediaLink} />)}
      </CollapsibleSection>
    </div>
  );
};

const extractSpotifyAlbumId = (url: string) => url.match(/album\/([a-zA-Z0-9]+)/)?.[1] || '';

export default AlbumPage;
