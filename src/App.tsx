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
import { Authenticator, ThemeProvider } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useState } from 'react';
import darkStyles from './styles/modules/Base-dark.module.css';
import lightStyles from './styles/modules/Base-light.module.css';

const App = () => {
  const [theme] = useState<'light' | 'dark'>(() => {
    // Load theme preference from localStorage or default to 'light'
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });
  
  const styles = theme === 'dark' ? darkStyles : lightStyles;
  console.log('Styles is', styles);
  return (
    <ThemeProvider>
        <Authenticator>
          {({ signOut, user }) => (
          <Router>
            <div className={styles["app-container"]}>
              {user && signOut && <Sidebar user={user} signOut={signOut} />}
              <div className={styles["main-content"]}>
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
                  <Route path="/queue" element={<ListeningPile />} />
                </Routes>
              </div>
            </div>
          </Router>
          )}
      </Authenticator>
  </ThemeProvider>
  );
};

export default App;
