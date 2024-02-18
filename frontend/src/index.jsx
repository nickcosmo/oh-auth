import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserRoute from './routes/User';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomeRoute from './routes/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomeRoute />,
      },
      {
        path: '/user',
        element: <UserRoute />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
