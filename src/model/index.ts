import { integer } from "aws-sdk/clients/cloudfront";

export interface AlbumData {
    id: string;
    name: string;
    artist: string;
    spotifyUrl: string;
    release_date: string;
    imageUrl: string;
    genres?: string[];
    lists?: ListData[];
    hideAlbum: boolean;
    userId: string;
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

export interface ListeningPileEntry {
    id: string;
    album: AlbumData;
    order: integer;
}