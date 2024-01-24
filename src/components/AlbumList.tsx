import { Link } from 'react-router-dom';
import { AlbumType } from '../types';

import './AlbumList.css';

type AlbumListProps = {
  artist: string,
  albumList: AlbumType[] | undefined,
};

function AlbumList({ artist, albumList = [] }: AlbumListProps) {
  return albumList.length > 0
    ? (
      <section className="album-list-wrapper">
        <h3>{ `Resultado de álbuns de: ${artist}`}</h3>
        <div className="album-list">
          { albumList.map((album) => {
            const { collectionId, collectionName, artistName, artworkUrl100 } = album;
            return (
              <Link
                key={ collectionId }
                data-testid={ `link-to-album-${collectionId}` }
                to={ `/album/${collectionId}` }
              >
                <img src={ artworkUrl100 } alt={ `${collectionName} album artwork` } />
                <p>{ collectionName }</p>
                <p>{ artistName }</p>
              </Link>
            );
          }) }
        </div>
      </section>
    )
    : (
      <p>Nenhum álbum foi encontrado</p>
    );
}

export default AlbumList;
