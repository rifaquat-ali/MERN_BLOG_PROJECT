import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App, { appRouter } from './App';
import StoreContextComp from './context/StoreContextComp';
import { RouterProvider } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <App/>
  </React.StrictMode>
);

