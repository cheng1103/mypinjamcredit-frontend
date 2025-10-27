'use client';

import { Toaster as HotToaster } from 'react-hot-toast';

export function Toaster() {
  return (
    <HotToaster
      position="top-center"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#fff',
          color: '#0f172a',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          borderRadius: '0.75rem',
          padding: '1rem',
          fontSize: '0.875rem'
        },
        success: {
          iconTheme: {
            primary: '#10b981',
            secondary: '#fff'
          }
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: '#fff'
          }
        },
        loading: {
          iconTheme: {
            primary: '#3b82f6',
            secondary: '#fff'
          }
        }
      }}
    />
  );
}
