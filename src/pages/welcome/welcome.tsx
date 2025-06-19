import React, { useEffect, useState } from 'react';
import './welcome.scss';
import { ThemeSwitcher } from '../../components/core/switcher';

const Welcome: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');
  
  useEffect(() => {
    // Check if user has previously selected a theme
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setCurrentTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const handleThemeChange = (theme: 'light' | 'dark') => {
    setCurrentTheme(theme);
  };

  return (
    <div className="welcome-container">
      <ThemeSwitcher 
        initialTheme={currentTheme} 
        onChange={handleThemeChange} 
      />
      <h1>欢迎</h1>
      <p>欢迎来到我们的应用</p>
      <button onClick={() => window.location.href = '/admin'}>进入管理页面</button>
    </div>
  );
};

export default Welcome; 