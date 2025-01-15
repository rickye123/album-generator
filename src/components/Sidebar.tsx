import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showBurgerButton, setShowBurgerButton] = useState(true);
  let lastScrollPosition = 0;

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleScroll = () => {
    const currentScrollPosition = window.scrollY;

    if (currentScrollPosition < lastScrollPosition) {
      // Scrolling up
      setShowBurgerButton(true);
    } else if (currentScrollPosition > lastScrollPosition) {
      // Scrolling down
      setShowBurgerButton(false);
    }

    lastScrollPosition = currentScrollPosition;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Burger Button */}
      {showBurgerButton && (
        <button
          className={`burger-button ${isOpen ? 'open' : ''}`}
          onClick={toggleSidebar}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      )}

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <nav>
          <ul>
            <li>
              <Link to="/" onClick={toggleSidebar}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/albums" onClick={toggleSidebar}>
                Albums
              </Link>
            </li>
            <li>
              <Link to="/artists" onClick={toggleSidebar}>
                Artists
              </Link>
            </li>
            <li>
              <Link to="/years" onClick={toggleSidebar}>
                Years
              </Link>
            </li>
            <li>
              <Link to="/lists" onClick={toggleSidebar}>
                Lists
              </Link>
            </li>
            <li>
              <Link to="/genres" onClick={toggleSidebar}>
                Genres
              </Link>
            </li>
            <li>
              <Link to="/add-album" onClick={toggleSidebar}>
                Add Album
              </Link>
            </li>
            <li>
              <Link to="/settings" onClick={toggleSidebar}>
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay */}
      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Sidebar;
