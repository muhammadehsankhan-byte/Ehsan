import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { WishlistProvider } from './context/WishlistContext';
import { ComparisonProvider } from './context/ComparisonContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ComparisonProvider>
      <WishlistProvider>
        <App />
      </WishlistProvider>
    </ComparisonProvider>
  </StrictMode>,
);
