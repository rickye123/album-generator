import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AlbumList from './components/AlbumList';
import AddAlbumPage from './components/AddAlbumPage';
import Sidebar from './components/Sidebar';
import AlbumPage from './components/AlbumPage';

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
            <Route path="/albums/:id" element={<AlbumPage />} /> {/* Dynamic album route */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
