import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './APIs/react-query';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>,
  // </React.StrictMode>,
);
