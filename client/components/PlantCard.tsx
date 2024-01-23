import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { syncData } from '../reducers/plantsReducer';

const PlantCard = ({
  plantId,
  plantName,
  image,
  sunInfo,
  waterInfo,
}: {
  plantId: string;
  plantName: string;
  image: string;
  sunInfo: string;
  waterInfo: string;
}) => {
  const dispatch = useDispatch();
  const userId: number = useSelector((state: any) => state.plants.id);

  //delete plant from user's plant database and resync data
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
