import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { syncData } from '../reducers/plantsReducer.js';

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.plants.id);
  const username = useSelector((state) => state.plants.username);

  const [plantName, setPlantName] = useState('');

  const logOut = () => {
    navigate('/');
  };

  const addPlant = () => {
    fetch(`/api/${userId}`, {
      method: 'POST',
      body: JSON.stringify({ plantName }),
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
    <div className='navBar'>
      <img
        className='logo'
        src='https://assets.pokemon.com/assets/cms2/img/pokedex/full/492.png'
        alt='logo'
      />
      <div className='plantForm'>
        <input
          className='plantName'
          placeholder='Find Your Plant!'
          onChange={(e) => {
            setPlantName(e.target.value);
          }}
        />
        <button className='findPlant' onClick={addPlant}>
          <img
            className='glass'
            src='https://upload.wikimedia.org/wikipedia/commons/5/55/Magnifying_glass_icon.svg'
            alt='find'
          />
        </button>
      </div>
      <button className='profileName' onClick={logOut}>
        {username}
      </button>
    </div>
  );
};

export default NavBar;
