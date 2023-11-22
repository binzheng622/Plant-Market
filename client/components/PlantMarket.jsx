import React from 'react';
import { useSelector } from 'react-redux';
import PlantCard from './PlantCard.jsx';

const PlantMarket = () => {
  const plantList = useSelector((state) => state.plants.plantList);

  let plantCards = [];
  plantList.forEach((plant) => {
    plantCards.push(
      <PlantCard
        key={plant.id}
        plantId={plant.id}
        plantName={plant.plantname}
        image={plant.imageurl}
        sunInfo={plant.plantsun}
        waterInfo={plant.plantwater}
      />
    );
  });

  return <div className='PlantMarket'>{plantCards}</div>;
};

export default PlantMarket;
