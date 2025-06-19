import { createRoot } from 'react-dom/client';
import './style.scss';
import App from './App.tsx';
import { BrowserRouter as Router } from 'react-router-dom';

// Initialize theme from localStorage
const initializeTheme = () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
};

initializeTheme();

createRoot(document.getElementById('root')!).render(
    <Router>
        <App />
    </Router>,
);
