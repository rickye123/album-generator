import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AlbumList from './components/AlbumList';
import AddAlbumPage from './components/AddAlbumPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/albums" element={<AlbumList />} />
        <Route path="/add-album" element={<AddAlbumPage />} />
      </Routes>
    </Router>
  );
};

export default App;
