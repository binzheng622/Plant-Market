import React from 'react';
import { useSelector } from 'react-redux';

const PlantMarket = () => {
  const plantList = useSelector((state) => state.plants.plantList);
  console.log(plantList[0]);

  return <div className='PlantMarket'></div>;
};

export default PlantMarket;
