import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastProvider } from 'react-toast-notifications';
import ErrorBoundary from './components/ErrorBoundary';
import './styles/index.css';
import { App } from './components';
import { AuthProvider, PostsProvider } from './providers';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
    <ToastProvider autoDismiss autoDismissTimeout={5000} placement='top-left'>
      <AuthProvider>
        <PostsProvider>
          <App />
        </PostsProvider>
      </AuthProvider>
    </ToastProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
