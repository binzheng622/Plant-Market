import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginContainer from './containers/LoginContainer';
import SignupContainer from './containers/SignupContainer';
import MainContainer from './containers/MainContainer';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LoginContainer />,
    },
    { path: '/signup', element: <SignupContainer /> },
    { path: '/main', element: <MainContainer /> },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
