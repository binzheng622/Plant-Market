import React from 'react';
import { useSelector } from 'react-redux';
import NavBar from '../components/NavBar';
import PlantMarket from '../components/PlantMarket';

const MainContainer = () => {
  const username = useSelector((state) => state.plants.username);

  return (
    <div className='container'>
      <NavBar username={username} />
      <PlantMarket />
    </div>
  );
};

export default MainContainer;
