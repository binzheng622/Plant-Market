import React from 'react';

const PlantCard = ({ plantId, plantName, image, sunInfo, waterInfo }) => {
  function deletePlant() {
    fetch(`/plant/${plantId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    window.location.reload();
  }

  return (
    <div className='outerCard'>
      <div className='PlantCard'>
        <div className='plantCardHead'>
          <h3 className='plantCardName'>{plantName}</h3>
          <button className='plantCardButton' onClick={deletePlant}>
            <img
              className='deleteCard'
              src='https://cdn2.iconfinder.com/data/icons/media-controls-5/100/close-512.png'
            />
          </button>
        </div>
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
