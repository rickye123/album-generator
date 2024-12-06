import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Burger Button */}
      <button
        className={`burger-button ${isOpen ? 'open' : ''}`}
        onClick={toggleSidebar}
        aria-label="Toggle navigation"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

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
                View Albums
              </Link>
            </li>
            <li>
              <Link to="/add-album" onClick={toggleSidebar}>
                Add Album
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
