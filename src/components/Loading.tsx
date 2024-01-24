import spinner from '../images/spinner.png';
import './Loading.css';

function Loading() {
  return (
    <div className="loader">
      <img src={ spinner } alt="Loading spinner" />
      <span>Carregando...</span>
    </div>
  );
}

export default Loading;
