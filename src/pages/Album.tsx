import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import getMusics from '../services/musicsAPI';
import MusicList from '../components/MusicList';
import Loading from '../components/Loading';
import useLoading from '../hooks/useLoading';
import { AlbumType, MusicType } from '../types';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

function Album() {
  const [album, setAlbum] = useState<AlbumType>();
  const [musics, setMusics] = useState<MusicType[]>([]);
  const { loading, setLoading } = useLoading(true);

  const { id: albumId = '' } = useParams();

  useEffect(() => {
    (async () => {
      const [albumData, ...musicsData] = await getMusics(albumId);
      const favoriteSongs = await getFavoriteSongs();

      const songs = musicsData
        .map((music) => ({
          ...music,
          favorite: favoriteSongs.some(({ trackId }) => trackId === music.trackId),
        }));
      setAlbum(albumData);
      setMusics(songs);
      setLoading(false);
    })();
  }, []);

  if (loading) return <Loading />;

  return (
    <div>
      <div>
        <img
          src={ album?.artworkUrl100 }
          alt={ `${album?.collectionName} album artwork` }
        />
        <p data-testid="album-name">{ album?.collectionName }</p>
        <p data-testid="artist-name">{ album?.artistName }</p>
      </div>
      <MusicList musics={ musics } onSetFavoriteSongs={ () => {} } />
    </div>
  );
}

export default Album;
