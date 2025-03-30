import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import DashBoard from './DashBoard';
import { BrowserRouter } from 'react-router-dom'
import {AppProvider } from './functionalities/AppContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <BrowserRouter>
        <DashBoard/>
      </BrowserRouter>
    </AppProvider>
  </StrictMode>
)
