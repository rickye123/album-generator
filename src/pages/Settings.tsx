import React, { useEffect, useState } from 'react';
import darkStyles from '../styles/modules/Settings-dark.module.css';
import lightStyles from '../styles/modules/Settings-light.module.css';
const Settings: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [hideAlbums, setHideAlbums] = useState<boolean>(false);
  const [listStats, setListStats] = useState<boolean>(false);
  const [landingPage, setLandingPage] = useState<'list' | 'albums' | 'year'>('list');
  const [selectedList, setSelectedList] = useState<string>('defaultList');
  const [randomizationMethod, setRandomizationMethod] = useState<'alphabetical' | 'popularity' | 'custom'>('alphabetical');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedHideAlbums = localStorage.getItem('hideAlbums') || 'false';
    const savedListStats = localStorage.getItem('listStats') || 'false';
    setTheme(savedTheme as 'light' | 'dark');
    setHideAlbums(savedHideAlbums === 'true');
    setListStats(savedListStats === 'true');
  
    // CSS Modules will handle class scoping, so no need for dynamic imports
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);
  
  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleHideAlbumsChange = (checked: boolean) => {
    setHideAlbums(checked);
    localStorage.setItem('hideAlbums', JSON.stringify(checked));
  };

  const handleListStatsChange = (checked: boolean) => {
    setListStats(checked);
    localStorage.setItem('listStats', JSON.stringify(checked));
  };

  // Use the appropriate styles based on the current theme
  const styles = theme === 'dark' ? darkStyles : lightStyles;
  return (
    <div className={styles['settings-page']}>
      <h1>Settings</h1>

      {/* Theme Selection */}
      <section className={styles['settings-section']}>
        <h2>Theme</h2>
        <div className={styles['theme-options']}>
          <label>
            Light Mode
            <input
              type="radio"
              name="theme"
              value="light"
              checked={theme === 'light'}
              onChange={() => handleThemeChange('light')}
            />
          </label>
          <label>
            Dark Mode
            <input
              type="radio"
              name="theme"
              value="dark"
              checked={theme === 'dark'}
              onChange={() => handleThemeChange('dark')}
            />
          </label>
        </div>
      </section>

      {/* Landing Page Randomization */}
      <section className={styles['settings-section']}>
        <h2>Landing Page Randomization</h2>
        <div className={styles['landing-page-options']}>
          <label>
            List
            <input
              type="radio"
              name="landingPage"
              value="list"
              checked={landingPage === 'list'}
              onChange={() => setLandingPage('list')}
            />
          </label>
          <label>
            Albums
            <input
              type="radio"
              name="landingPage"
              value="albums"
              checked={landingPage === 'albums'}
              onChange={() => setLandingPage('albums')}
            />
          </label>
          <label>
            Year
            <input
              type="radio"
              name="landingPage"
              value="year"
              checked={landingPage === 'year'}
              onChange={() => setLandingPage('year')}
            />
          </label>
        </div>
      </section>

      {/* List Selection */}
      {landingPage === 'list' && (
        <section className={styles['settings-section']}>
          <h2>Select List</h2>
          <select className={styles['select-list']}
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
        <section className={styles['settings-section']}>
          <h2>Randomization Method</h2>
          <div className={styles['randomization-options']}>
            <label>
              Alphabetical
              <input
                type="radio"
                name="randomizationMethod"
                value="alphabetical"
                checked={randomizationMethod === 'alphabetical'}
                onChange={() => setRandomizationMethod('alphabetical')}
              />
            </label>
            <label>
              Popularity
              <input
                type="radio"
                name="randomizationMethod"
                value="popularity"
                checked={randomizationMethod === 'popularity'}
                onChange={() => setRandomizationMethod('popularity')}
              />
            </label>
            <label>
              Custom
              <input
                type="radio"
                name="randomizationMethod"
                value="custom"
                checked={randomizationMethod === 'custom'}
                onChange={() => setRandomizationMethod('custom')}
              />
            </label>
          </div>
        </section>
      )}

      {/* Feature Flags */}
      <section className={styles['settings-section']}>
        <h2>Feature Flags</h2>
        <div className={styles['landing-page-options']}>
          <div className={styles['list-page-switch']}>
            <label>
              Hide Albums
              <input
                type="checkbox"
                name="hideAlbums"
                checked={hideAlbums}
                onChange={(e) => handleHideAlbumsChange(e.target.checked)}
              />
              <span className={styles['list-page-slider']}></span>
            </label>
          </div>
          <br/>
          <div className={styles['list-page-switch']}>
            <label>
              List Stats
              <input
                type="checkbox"
                name="listStats"
                checked={listStats}
                onChange={(e) => handleListStatsChange(e.target.checked)}
              />
              <span className={styles['list-page-slider']}></span>
            </label>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Settings;
