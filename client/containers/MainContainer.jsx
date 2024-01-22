import React from 'react';
import NavBar from '../components/NavBar.jsx';
import PlantMarket from '../components/PlantMarket.jsx';
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
