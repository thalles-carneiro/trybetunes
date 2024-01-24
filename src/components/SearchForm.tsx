import searchAlbumsAPI from '../services/searchAlbumsAPI';
import { AlbumType, ChangeEventType, SubmitEventType } from '../types';

type SearchFormProps = {
  artist: string,
  onSetArtist: React.Dispatch<React.SetStateAction<string>>,
  onSetSearchedArtist: React.Dispatch<React.SetStateAction<string>>,
  onSetLoading: React.Dispatch<React.SetStateAction<boolean>>,
  onSetAlbumList: React.Dispatch<React.SetStateAction<AlbumType[] | undefined>>,
};

function SearchForm(props: SearchFormProps) {
  const { artist, onSetArtist, onSetSearchedArtist,
    onSetLoading, onSetAlbumList } = props;

  const handleChange = ({ target }: ChangeEventType) => {
    onSetArtist(target.value);
  };

  const handleSubmit = async (event: SubmitEventType) => {
    event.preventDefault();
    onSetSearchedArtist(artist);
    onSetAlbumList(undefined);
    onSetArtist('');
    onSetLoading(true);

    const data = await searchAlbumsAPI(artist);
    onSetAlbumList(data);
    onSetLoading(false);
  };

  const isBtnDisabled = artist.length < 2;

  return (
    <form onSubmit={ handleSubmit }>
      <input
        data-testid="search-artist-input"
        type="text"
        placeholder="Nome do artista"
        value={ artist }
        onChange={ handleChange }
      />
      <button
        data-testid="search-artist-button"
        type="submit"
        disabled={ isBtnDisabled }
      >
        Pesquisar
      </button>
    </form>
  );
}

export default SearchForm;
