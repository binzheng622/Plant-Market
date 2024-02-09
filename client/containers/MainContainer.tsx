import React from 'react';
import NavBar from '../components/NavBar';
import PlantMarket from '../components/PlantMarket';
import Background from '../assets/background.png';

const MainContainer = () => {
  return (
    <div
      className='mainContainer'
      style={{ backgroundImage: `url(${Background})` }}
    >
      <NavBar />
      <PlantMarket />
    </div>
  );
};

export default MainContainer;
