import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Album, Favorites, Login, NotFound, Profile, ProfileEdit, Search } from './pages';
import { AlbumType } from './types';
import Layout from './components/Layout';

import './App.css';

function App() {
  const [albumList, setAlbumList] = useState<AlbumType[] | undefined>();

  return (
    <Routes>
      <Route path="/" element={ <Login /> } />

      <Route path="/" element={ <Layout /> }>
        <Route
          path="/search"
          element={ <Search albumList={ albumList } onSetAlbumList={ setAlbumList } /> }
        />
        <Route path="/album/:id" element={ <Album /> } />
        <Route path="/favorites" element={ <Favorites /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/profile/edit" element={ <ProfileEdit /> } />
      </Route>
      <Route path="/*" element={ <NotFound /> } />
    </Routes>
  );
}

export default App;
