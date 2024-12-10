import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AlbumList from './components/AlbumList';
import AddAlbumPage from './components/AddAlbumPage';
import Sidebar from './components/Sidebar';
import AlbumPage from './components/AlbumPage';
import Lists from './components/Lists';
import ListPage from './components/ListPage';
import Artists from './components/Artists';
import Years from './components/Years';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
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
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
