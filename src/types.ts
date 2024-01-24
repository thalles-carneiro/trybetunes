export type AlbumType = {
  artistId: number;
  artistName: string;
  collectionId: number;
  collectionName: string;
  collectionPrice: number;
  artworkUrl100: string;
  releaseDate: string;
  trackCount: number;
};

export type UserType = {
  name: string;
  email: string;
  image: string;
  description: string;
};

export type SongType = {
  trackId: number,
  trackName: string,
  previewUrl: string,
};

export type MusicType = SongType & { favorite: boolean };

export type ChangeEventType = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
export type SubmitEventType = React.FormEvent<HTMLFormElement>;
