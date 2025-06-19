import React from 'react';
import styles from './Horizon.module.scss';
import { 
  ThemeProvider, 
  GlassBackground, 
  GlassThemeSwitcher 
} from '../../components/core';

const Horizon: React.FC = () => {
  const navigateToAdmin = () => {
    window.location.href = '/admin';
  };

  return (
    <ThemeProvider>
      <GlassBackground>
        <div className={styles['glass-welcome']}>
          <div className={styles['switcher-wrapper']}>
            <GlassThemeSwitcher />
          </div>
          <div className={styles['welcome-content']}>
            <h1>欢迎</h1>
            <p>欢迎来到我们的应用</p>
            <button className={`${styles['glass-button']} primary`} onClick={navigateToAdmin}>进入管理页面</button>
          </div>
        </div>
      </GlassBackground>
    </ThemeProvider>
  );
};

export default Horizon; 