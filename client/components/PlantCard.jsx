import React from 'react';

const PlantCard = ({ plantName, image, sunInfo, waterInfo }) => {
  return (
    <div className='outerCard'>
      <div className='PlantCard'>
        <h3 className='plantCardName'>{plantName}</h3>
        <img className='plantCardImg' src={image} />
        <p className='plantCardTitle'>
          Sun Pref: <span className='plantCardInfo'>{sunInfo}</span>
        </p>
        <p className='plantCardTitle'>
          Water Maint: <span className='plantCardInfo'>{waterInfo}</span>
        </p>
      </div>
    </div>
  );
};

export default PlantCard;
