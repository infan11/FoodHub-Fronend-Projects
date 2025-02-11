import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './Components/Routes/Routes/Routes';
import AuthProvider from './Components/Provider/AuthProvider/AuthProvider';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Circles } from 'react-loader-spinner';

const queryClient = new QueryClient();

const Loader = () => (
  <div className="flex justify-center items-center min-h-screen bg-gray-100">
  <div>
  <Circles
                    height="80"
                    width="80"
                    color="#ff0000d8"
                    ariaLabel="circles-loading"
                    visible={true}
                />
  </div>
  </div>
);

const AppWithLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return loading ? <Loader /> : <RouterProvider router={router} />;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <div className="font-Kanit">
          <AppWithLoader />
        </div>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
