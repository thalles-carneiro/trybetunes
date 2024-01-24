import { MusicType } from '../types';
import MusicCard from './MusicCard';

type MusicListProps = {
  onSetFavoriteSongs: React.Dispatch<React.SetStateAction<MusicType[]>>,
  musics: MusicType[],
};

function MusicList({ musics, onSetFavoriteSongs }: MusicListProps) {
  return (
    <section>
      { musics.map((music) => (
        <MusicCard
          key={ music.trackId }
          music={ music }
          onSetFavoriteSongs={ onSetFavoriteSongs }
        />
      )) }
    </section>
  );
}

export default MusicList;
