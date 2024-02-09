import React from 'react';
import { useSelector } from 'react-redux';
import PlantCard from './PlantCard';

const PlantMarket = () => {
  const plantList = useSelector((state: any) => state.plants.plantList);

  //create a plant card for each plant
  let plantCards: JSX.Element[] = [];
  plantList.forEach((plant: any) => {
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

  return <div className='plantMarket'>{plantCards}</div>;
};

export default PlantMarket;
