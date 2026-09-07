import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // This line is important!
import App from './App';

const container = document.getElementById('root');
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Prerendered production builds ship real markup inside #root - hydrate onto
// it instead of discarding it, so crawlers/users see content immediately and
// there's no flash on load. In dev (react-scripts start), #root starts empty,
// so fall back to a normal client render.
if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(container, app);
} else {
  ReactDOM.createRoot(container).render(app);
}