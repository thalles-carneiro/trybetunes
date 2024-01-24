import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Loading from '../components/Loading';
import useLoading from '../hooks/useLoading';
import { getUser } from '../services/userAPI';
import { UserType } from '../types';

function Profile() {
  const [user, setUser] = useState<UserType | null>(null);
  const { loading, setLoading } = useLoading(true);

  useEffect(() => {
    (async () => {
      const userData = await getUser();
      setUser(userData);
      setLoading(false);
    })();
  }, []);

  if (loading) return <Loading />;

  return (
    <section>
      <div>
        <img
          src={ user?.image }
          alt="Profile"
          data-testid="profile-image"
        />
      </div>
      <div>
        <div>
          <p>Nome</p>
          <p>{ user?.name }</p>
        </div>
        <div>
          <p>E-mail</p>
          <p>{ user?.email }</p>
        </div>
        <div>
          <p>Descrição</p>
          <p>{ user?.description }</p>
        </div>
        <Link to="/profile/edit">
          Editar perfil
        </Link>
      </div>
    </section>
  );
}

export default Profile;
