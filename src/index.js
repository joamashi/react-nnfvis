// import React, { StrictMode } from 'react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// root.render(
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/*
  import React, { StrictMode } from 'react';
  <StrictMode>

  npm run start
  npm run build
  npx serve -s build

*/
