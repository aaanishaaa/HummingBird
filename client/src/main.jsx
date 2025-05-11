import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Popup from './popup';

// Choose between App or Popup depending on your entry point
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Popup />
  </StrictMode>
);
