import { createRoot } from 'react-dom/client';
import './style.scss';
import App from './App.tsx';
import { BrowserRouter as Router } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
    <Router>
        <App />
    </Router>,
);
