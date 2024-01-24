import { useEffect, useState } from 'react';
import MusicList from '../components/MusicList';
import { MusicType } from '../types';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

function Favorites() {
  const [favoriteSongs, setFavoriteSongs] = useState<MusicType[]>([]);

  useEffect(() => {
    (async () => {
      const songs = await getFavoriteSongs();
      setFavoriteSongs(songs.map((song) => ({ ...song, favorite: true })));
    })();
  }, []);

  return (
    <div>
      <h2>Músicas Favoritas</h2>
      <MusicList musics={ favoriteSongs } onSetFavoriteSongs={ setFavoriteSongs } />
    </div>
  );
}

export default Favorites;
