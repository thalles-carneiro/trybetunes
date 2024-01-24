import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { CgProfile } from 'react-icons/cg';
import { IoIosSearch, IoIosStarOutline } from 'react-icons/io';

import { getUser } from '../services/userAPI';
import useLoading from '../hooks/useLoading';
import { UserType } from '../types';
import logo from '../images/logo.png';
import Loading from './Loading';

function Header() {
  const [user, setUser] = useState<UserType | null>(null);
  const { loading, setLoading } = useLoading(true);

  useEffect(() => {
    (async () => {
      const userData = await getUser();
      setUser(userData);
      setLoading(false);
    })();
  }, []);

  return (
    <header data-testid="header-component">
      <img src={ logo } alt="TrybeTunes logo" />
      <nav>
        <NavLink
          to="/search"
          data-testid="link-to-search"
        >
          <IoIosSearch />
          <span>Pesquisa</span>
        </NavLink>
        <NavLink
          to="/favorites"
          data-testid="link-to-favorites"
        >
          <IoIosStarOutline />
          <span>Favoritas</span>
        </NavLink>
        <NavLink
          to="/profile"
          data-testid="link-to-profile"
        >
          <CgProfile />
          <span>Perfil</span>
        </NavLink>
      </nav>
      {
        loading
          ? <Loading />
          : (
            <div>
              <img src={ user?.image } alt="User profile" />
              <p data-testid="header-user-name">{ user?.name }</p>
            </div>
          )
      }
    </header>
  );
}

export default Header;
