import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Providers } from './components/general/providers.tsx';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root not defined in the DOM');
}

createRoot(root).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>,
);
