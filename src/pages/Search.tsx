import { useState } from 'react';

import Loading from '../components/Loading';
import SearchForm from '../components/SearchForm';
import AlbumList from '../components/AlbumList';
import useLoading from '../hooks/useLoading';
import { AlbumType } from '../types';

type SearchProps = {
  albumList: AlbumType[] | undefined,
  onSetAlbumList: React.Dispatch<React.SetStateAction<AlbumType[] | undefined>>,
};

function Search({ albumList, onSetAlbumList }: SearchProps) {
  const [artist, setArtist] = useState('');
  const [searchedArtist, setSearchedArtist] = useState('');
  const { loading, setLoading } = useLoading(false);

  return (
    <div>
      <SearchForm
        artist={ artist }
        onSetArtist={ setArtist }
        onSetSearchedArtist={ setSearchedArtist }
        onSetLoading={ setLoading }
        onSetAlbumList={ onSetAlbumList }
      />
      { loading && <Loading /> }
      { albumList !== undefined && (
        <AlbumList
          albumList={ albumList }
          artist={ searchedArtist }
        />
      ) }
    </div>
  );
}

export default Search;
