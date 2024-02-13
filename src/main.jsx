import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import BlogContextProvider from './context/BlogContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <BlogContextProvider >
      <App />
    </BlogContextProvider>
    </BrowserRouter>
  </React.StrictMode>
)
