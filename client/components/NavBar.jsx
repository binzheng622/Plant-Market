import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const NavBar = ({ userId }) => {
  const navigate = useNavigate();
  function logOut() {
    navigate('/');
  }

  const username = useSelector((state) => state.plants.username);

  return (
    <div className='navBar'>
      <img
        className='logo'
        src='https://assets.pokemon.com/assets/cms2/img/pokedex/full/492.png'
        alt='logo'
      />
      <form className='plantForm' method='POST' action={`/${userId}`}>
        <input
          name='plantName'
          className='plantName'
          placeholder='Find Your Plant!'
        />
        <button className='findPlant'>
          <img
            className='glass'
            src='https://upload.wikimedia.org/wikipedia/commons/5/55/Magnifying_glass_icon.svg'
            alt='find'
          />
        </button>
      </form>
      <button className='profileName' onClick={logOut}>
        {username}
      </button>
    </div>
  );
};

export default NavBar;
