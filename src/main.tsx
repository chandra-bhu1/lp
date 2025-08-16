import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Router from './routes/Router.tsx'; // Import the new Router component
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router /> {/* Render the Router component */}
  </StrictMode>
);
