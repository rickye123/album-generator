export interface AlbumData {
    id: string;
    name: string;
    artist: string;
    spotifyUrl: string;
    imageUrl: string;
    lists?: ListData[];
}

export interface ListData {
    id: string;
    name: string;
    albums: AlbumData[];
}