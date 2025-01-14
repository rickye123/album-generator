export interface AlbumData {
    id: string;
    name: string;
    artist: string;
    spotifyUrl: string;
    release_date: string;
    imageUrl: string;
    genres?: string[];
    lists?: ListData[];
}

export interface AlbumListData {
  played: boolean;
  album: AlbumData;
}

export interface SpotifyAlbumDetails {
    id: string;
    name: string;
    artist: string;
    releaseDate: string;
    genres: string[];
    totalTracks: number;
    totalDuration: number;
    tracks: {
      id: string;
      name: string;
      durationMs: number;
      trackNumber: number;
    }[];
  }
  

export interface ListData {
    id: string;
    name: string;
    albums: AlbumListData[];
}