import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar.jsx';
import PlantMarket from '../components/PlantMarket.jsx';
import { syncData } from '../reducers/plantsReducer.js';

const MainContainer = () => {
  let { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`/data/${id}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(syncData(data));
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <div className='mainContainer'>
      <NavBar userId={id} />
      <PlantMarket />
    </div>
  );
};

export default MainContainer;
