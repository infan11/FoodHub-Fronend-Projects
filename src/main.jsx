import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { router } from './Components/Routes/Routes/Routes'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './Components/Provider/AuthProvider/AuthProvider'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Toaster/>
      <QueryClientProvider client={queryClient}>
     <div className='font-Kanit'>
     <RouterProvider router={router} />
     </div>
    </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
)
