import React from 'react';
import NavBar from '../components/NavBar.jsx';
import PlantMarket from '../components/PlantMarket.jsx';

const MainContainer = () => {
  return (
    <div className='mainContainer'>
      <NavBar />
      <PlantMarket />
    </div>
  );
};

export default MainContainer;
