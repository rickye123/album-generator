import React from 'react';
import styles from '../styles/modules/Loader.module.css';

const Loader: React.FC = () => {
  return (
    <div className={styles['loader-container']}>
      <div className={styles['spinner']}></div>
    </div>
  );
};

export default Loader;
