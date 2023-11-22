import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginContainer from './containers/LoginContainer.jsx';
import SignupContainer from './containers/SignupContainer.jsx';
import MainContainer from './containers/MainContainer.jsx';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LoginContainer />,
    },
    { path: '/signup', element: <SignupContainer /> },
    { path: '/:id', element: <MainContainer /> },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
