import React from 'react';

const NavBar = ({ username, userId }) => {
  return (
    <div className='NavBar'>
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

      <p className='profileName'>{username}</p>
    </div>
  );
};

export default NavBar;
