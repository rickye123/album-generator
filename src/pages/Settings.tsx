import React, { useEffect, useState } from 'react';
import '../styles/Settings.css'; // Ensure this path is correct

const Settings: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [landingPage, setLandingPage] = useState<'list' | 'albums' | 'year'>('list');
  const [selectedList, setSelectedList] = useState<string>('defaultList');
  const [randomizationMethod, setRandomizationMethod] = useState<'alphabetical' | 'popularity' | 'custom'>('alphabetical');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme as 'light' | 'dark');
  
    // CSS Modules will handle class scoping, so no need for dynamic imports
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);
  
  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };  

  return (
    <div className="settings-page">
      <h1>Settings</h1>

      {/* Theme Selection */}
      <section className="settings-section">
        <h2>Theme</h2>
        <div className="theme-options">
          <label>
            <input
              type="radio"
              name="theme"
              value="light"
              checked={theme === 'light'}
              onChange={() => handleThemeChange('light')}
            />
            Light Mode
          </label>
          <label>
            <input
              type="radio"
              name="theme"
              value="dark"
              checked={theme === 'dark'}
              onChange={() => handleThemeChange('dark')}
            />
            Dark Mode
          </label>
        </div>
      </section>

      {/* Landing Page Randomization */}
      <section className="settings-section">
        <h2>Landing Page Randomization</h2>
        <div className="landing-page-options">
          <label>
            <input
              type="radio"
              name="landingPage"
              value="list"
              checked={landingPage === 'list'}
              onChange={() => setLandingPage('list')}
            />
            List
          </label>
          <label>
            <input
              type="radio"
              name="landingPage"
              value="albums"
              checked={landingPage === 'albums'}
              onChange={() => setLandingPage('albums')}
            />
            Albums
          </label>
          <label>
            <input
              type="radio"
              name="landingPage"
              value="year"
              checked={landingPage === 'year'}
              onChange={() => setLandingPage('year')}
            />
            Year
          </label>
        </div>
      </section>

      {/* List Selection */}
      {landingPage === 'list' && (
        <section className="settings-section">
          <h2>Select List</h2>
          <select
            value={selectedList}
            onChange={(e) => setSelectedList(e.target.value)}
          >
            <option value="defaultList">Default List</option>
            <option value="favorites">Favorites</option>
            <option value="recentlyAdded">Recently Added</option>
            {/* Add more list options as needed */}
          </select>
        </section>
      )}

      {/* Randomization Method */}
      {landingPage === 'list' && (
        <section className="settings-section">
          <h2>Randomization Method</h2>
          <div className="randomization-options">
            <label>
              <input
                type="radio"
                name="randomizationMethod"
                value="alphabetical"
                checked={randomizationMethod === 'alphabetical'}
                onChange={() => setRandomizationMethod('alphabetical')}
              />
              Alphabetical
            </label>
            <label>
              <input
                type="radio"
                name="randomizationMethod"
                value="popularity"
                checked={randomizationMethod === 'popularity'}
                onChange={() => setRandomizationMethod('popularity')}
              />
              Popularity
            </label>
            <label>
              <input
                type="radio"
                name="randomizationMethod"
                value="custom"
                checked={randomizationMethod === 'custom'}
                onChange={() => setRandomizationMethod('custom')}
              />
              Custom
            </label>
          </div>
        </section>
      )}
    </div>
  );
};

export default Settings;
