import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Loading from '../components/Loading';
import useLoading from '../hooks/useLoading';
import { getUser, updateUser } from '../services/userAPI';
import { ChangeEventType, SubmitEventType, UserType } from '../types';

const initialUserForm = {
  name: '',
  email: '',
  image: '',
  description: '',
};

function ProfileEdit() {
  const [user, setUser] = useState<UserType | null>(null);
  const [userForm, setUserForm] = useState<UserType>(initialUserForm);
  const { loading, setLoading } = useLoading(true);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const userData = await getUser();
      setUser(userData);
      setUserForm(userData);
      setLoading(false);
    })();
  }, []);

  const handleChange = ({ target: { name, value } }: ChangeEventType) => {
    setUserForm({ ...userForm, [name]: value });
  };

  const handleSubmit = async (event: SubmitEventType) => {
    event.preventDefault();
    setLoading(true);
    await updateUser(userForm);
    setLoading(false);
    navigate('/profile');
  };

  if (loading) return <Loading />;

  const isBtnDisabled = Object.values(userForm || {}).some((value) => value === '');

  return (
    <section>
      <div>
        <img
          src={ user?.image }
          alt="Profile"
          data-testid="profile-image"
        />
      </div>
      <form onSubmit={ handleSubmit }>
        <div>
          <label htmlFor="name">
            Nome
            <input
              type="text"
              name="name"
              id="name"
              value={ userForm?.name }
              onChange={ handleChange }
              data-testid="edit-input-name"
            />
          </label>
        </div>
        <div>
          <label htmlFor="email">
            E-mail
            <input
              type="email"
              name="email"
              id="email"
              value={ userForm?.email }
              onChange={ handleChange }
              data-testid="edit-input-email"
            />
          </label>
        </div>
        <div>
          <label htmlFor="image">
            Imagem
            <input
              type="text"
              name="image"
              id="image"
              value={ userForm?.image }
              onChange={ handleChange }
              data-testid="edit-input-image"
            />
          </label>
        </div>
        <div>
          <label htmlFor="description">
            Descrição
            <textarea
              name="description"
              id="description"
              value={ userForm?.description }
              onChange={ handleChange }
              data-testid="edit-input-description"
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={ isBtnDisabled }
          data-testid="edit-button-save"
        >
          Salvar
        </button>
      </form>
    </section>
  );
}

export default ProfileEdit;
