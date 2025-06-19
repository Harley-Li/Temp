import React, { useState, useEffect } from 'react';
import './ThemeSwitcher.scss';

interface ThemeSwitcherProps {
  onChange?: (theme: 'light' | 'dark') => void;
  initialTheme?: 'light' | 'dark';
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ 
  onChange, 
  initialTheme = 'light'
}) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(initialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (onChange) {
      onChange(theme);
    }
  }, [theme, onChange]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="theme-switcher">
      <button 
        className={`switcher-container ${theme}`} 
        onClick={toggleTheme} 
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        <span className="light-option">
          <span className="icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="5" fill="currentColor" />
              <path d="M12 3V1M12 23V21M3 12H1M23 12H21M5.6 5.6L4.2 4.2M18.4 18.4L19.8 19.8M5.6 18.4L4.2 19.8M18.4 5.6L19.8 4.2" 
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          <span className="text">Light</span>
        </span>
        
        <span className="dark-option">
          <span className="icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 11.5373 21.3065 11.4608 21.0672 11.8568C19.9289 13.7406 17.8615 15 15.5 15C11.9101 15 9 12.0899 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              />
            </svg>
          </span>
          <span className="text">Dark</span>
        </span>
      </button>
    </div>
  );
};

export default ThemeSwitcher; 