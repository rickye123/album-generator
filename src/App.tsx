import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AlbumList from './pages/AlbumList';
import AddAlbumPage from './pages/AddAlbumPage';
import Sidebar from './components/Sidebar';
import AlbumPage from './pages/AlbumPage';
import Lists from './pages/Lists';
import ListPage from './pages/ListPage';
import Artists from './pages/Artists';
import Years from './pages/Years';
import Settings from './pages/Settings';
import Genres from './pages/Genres';
import ListeningPile from './pages/ListeningPile';
import { Authenticator } from '@aws-amplify/ui-react';

const App = () => {
  return (
    <Authenticator>
      {({ signOut, user }) => (
      <Router>
        <div className="app-container">
          {user && signOut && <Sidebar user={user} signOut={signOut} />}
          <div className="main-content">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/albums" element={<AlbumList />} />
              <Route path="/add-album" element={<AddAlbumPage />} />
              <Route path="/albums/:id" element={<AlbumPage />} />
              <Route path="/artists" element={<Artists />} />
              <Route path="/years" element={<Years />} />
              <Route path="/lists" element={<Lists />} />
              <Route path="/list/:listId" element={<ListPage />} />
              <Route path="/albums/artist/:artist" element={<AlbumList />} />
              <Route path="/albums/year/:year" element={<AlbumList />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/genres" element={<Genres />} />
              <Route path="/albums/genre/:genre" element={<AlbumList />} />
              <Route path="/listeningPile" element={<ListeningPile />} />
            </Routes>
          </div>
        </div>
      </Router>
      )}
  </Authenticator>
  );
};

export default App;
