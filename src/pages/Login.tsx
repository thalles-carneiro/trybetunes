import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import { ChangeEventType, SubmitEventType } from '../types';

function Login() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = ({ target }: ChangeEventType) => {
    setName(target.value);
  };

  const handleSubmit = (event: SubmitEventType) => {
    event.preventDefault();
    setLoading(true);
    createUser({ name })
      .then(() => setLoading(false))
      .then(() => navigate('/search'));
  };

  const isBtnDisabled = name.length < 3;

  if (loading) return <Loading />;

  return (
    <div>
      <h1>TrybeTunes</h1>
      <form onSubmit={ handleSubmit }>
        <input
          data-testid="login-name-input"
          type="text"
          placeholder="Digite seu nome"
          value={ name }
          onChange={ handleChange }
        />
        <button
          data-testid="login-submit-button"
          type="submit"
          disabled={ isBtnDisabled }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
