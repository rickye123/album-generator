import axios from 'axios';
import { SpotifyAlbumDetails } from '../model';

const SPOTIFY_CLIENT_ID = "fdd4506a23df430aacb2c4aa3b87bd24";
const SPOTIFY_CLIENT_SECRET = "56672579f0aa42e5b9c53b155bf28c15";

export const getSpotifyToken = async (): Promise<string> => {
  const response = await axios.post(
    'https://accounts.spotify.com/api/token',
    'grant_type=client_credentials',
    {
      headers: {
        Authorization:
          'Basic ' +
          btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
  return response.data.access_token;
};

export const fetchAlbum = async (albumName: string, artistName: string) => {
  console.log(`Fetching album ${albumName} with artist ${artistName}`);
  const token = await getSpotifyToken();
  const response = await axios.get('https://api.spotify.com/v1/search', {
    params: { q: `album:${albumName} artist:${artistName}`, type: 'album' },
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.albums.items[0];
};

// Utility to extract the Spotify Album ID from a URL
const extractSpotifyAlbumId = (url: string): string | null => {
  const match = url.match(/album\/([a-zA-Z0-9]+)(\?|$)/);
  return match ? match[1] : null;
};

export const fetchAlbumBySpotifyUrl = async (spotifyUrl: string) => {
  try {
    const albumId = extractSpotifyAlbumId(spotifyUrl);

    if (!albumId) {
      throw new Error('Invalid Spotify URL. Could not extract album ID.');
    }

    const accessToken = await getSpotifyToken(); // Assume you have a function to fetch Spotify API access token.

    const response = await axios.get(`https://api.spotify.com/v1/albums/${albumId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching album by Spotify URL:', error);
    return null;
  }
};

export const fetchSpotifyAlbumDetails = async (spotifyId: string): Promise<SpotifyAlbumDetails> => {
  const url = `https://api.spotify.com/v1/albums/${spotifyId}`;
  const token = await getSpotifyToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(url, { headers });
  if (!response.ok) throw new Error('Failed to fetch Spotify album details');
  const data = await response.json();

  // Calculate total duration
  const totalDuration = data.tracks.items.reduce((sum: number, track: any) => sum + track.duration_ms, 0);

  // Map to SpotifyAlbumDetails
  return {
    id: data.id,
    name: data.name,
    artist: data.artists[0]?.name ?? 'Unknown Artist',
    releaseDate: data.release_date,
    genres: data.genres,
    totalTracks: data.total_tracks,
    totalDuration,
    tracks: data.tracks.items.map((track: any) => ({
      id: track.id,
      name: track.name,
      durationMs: track.duration_ms,
      trackNumber: track.track_number,
    })),
  };
};