import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { router } from './Components/Routes/Routes/Routes'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './Components/Provider/AuthProvider/AuthProvider'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Toaster/>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
