import PlantCard from './PlantCard';

const PlantMarket = ({
  plantList,
  deletePlant,
}: {
  plantList: any[];
  deletePlant: (plantId: string) => void;
}) => {
  return (
    <div className='plantMarket'>
      {plantList.map((plant) => {
        return (
          <PlantCard
            key={plant.id}
            plantId={plant.id}
            plantName={plant.plantname}
            image={plant.imageurl}
            sunInfo={plant.plantsun}
            waterInfo={plant.plantwater}
            deletePlant={deletePlant}
          />
        );
      })}
    </div>
  );
};

export default PlantMarket;
