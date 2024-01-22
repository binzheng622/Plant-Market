import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { syncData } from '../reducers/plantsReducer.js';

const PlantCard = ({ plantId, plantName, image, sunInfo, waterInfo }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.plants.id);

  const deletePlant = () => {
    fetch(`/api/plant/${plantId}`, {
      method: 'DELETE',
      body: JSON.stringify({ userId }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(syncData(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='outerCard'>
      <div className='plantCard'>
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
