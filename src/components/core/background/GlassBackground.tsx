import React, { useEffect, useState } from 'react';
import './GlassBackground.scss';

interface GlassBackgroundProps {
  children: React.ReactNode;
}

const GlassBackground: React.FC<GlassBackgroundProps> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // 监听主题变化
  useEffect(() => {
    // 初始化主题
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    setTheme(storedTheme);
    
    // 创建MutationObserver监听html标签上data-theme属性的变化
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'data-theme'
        ) {
          const htmlElement = document.documentElement;
          const currentTheme = htmlElement.getAttribute('data-theme') as 'light' | 'dark' || 'light';
          setTheme(currentTheme);
        }
      });
    });

    // 开始监听
    observer.observe(document.documentElement, { attributes: true });

    // 清理监听器
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`glass-background ${theme}`}>
      <div className="background-image"></div>
      <div className="glass-container">
        {children}
      </div>
    </div>
  );
};

export default GlassBackground; 