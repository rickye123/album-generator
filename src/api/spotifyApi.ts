import axios from 'axios';

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