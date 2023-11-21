import React from 'react';
import { useSelector } from 'react-redux';

const MainContainer = () => {
  const username = useSelector((state) => state.plants.username);

  return (
    <div className='container'>
      <h1>Hello World</h1>
    </div>
  );
};

export default MainContainer;
