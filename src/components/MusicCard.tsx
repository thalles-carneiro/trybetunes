import { useState } from 'react';

import { MusicType } from '../types';
import checkedHeart from '../images/checked_heart.png';
import emptyHeart from '../images/empty_heart.png';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

type MusicProps = {
  onSetFavoriteSongs: React.Dispatch<React.SetStateAction<MusicType[]>>,
  music: MusicType,
};

function MusicCard({ music, onSetFavoriteSongs }: MusicProps) {
  const [favorite, setFavorite] = useState(music.favorite);

  const handleClick = () => {
    if (favorite) {
      removeSong(music);
      onSetFavoriteSongs((prevState) => prevState
        .filter((song) => song.trackId !== music.trackId));
    } else {
      addSong(music);
      onSetFavoriteSongs((prevState) => [...prevState, music]);
    }
    setFavorite(!favorite);
  };

  return (
    <div key={ music.trackId }>
      <p>{ music.trackName }</p>
      <audio data-testid="audio-component" src={ music.previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        <code>audio</code>
        .
      </audio>
      <label
        data-testid={ `checkbox-music-${music.trackId}` }
        htmlFor={ `checkbox-music-${music.trackId}` }
      >
        {/* <input
          type="image"
          id={ `checkbox-music-${music.trackId}` }
          onClick={ handleClick }
          src={ favorite ? checkedHeart : emptyHeart }
          alt="favorite"
        /> */}
        <input
          type="checkbox"
          id={ `checkbox-music-${music.trackId}` }
          onClick={ handleClick }
          checked={ favorite }
          // hidden
        />
        <img
          src={ favorite ? checkedHeart : emptyHeart }
          alt="favorite"
        />
      </label>
    </div>
  );
}

export default MusicCard;
