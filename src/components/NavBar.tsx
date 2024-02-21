'use client';
import { useState } from 'react';
import Image from 'next/image';
import Logo from '../../public/icon.png';

const NavBar = ({
  username,
  setUserId,
  findPlant,
}: {
  username: string;
  setUserId: (userId: any) => void;
  findPlant: (plantName: string) => void;
}) => {
  const [plantName, setPlantName] = useState('');

  return (
    <div className='navBar'>
      <div>
        <Image className='logo' src={Logo} alt='logo' width={50} height={50} />
      </div>
      <div className='plantForm'>
        <input
          className='plantName'
          placeholder='Find Your Plant!'
          value={plantName}
          onChange={(e) => {
            setPlantName(e.target.value);
          }}
        />
        <button
          className='findPlant'
          onClick={() => {
            findPlant(plantName);
            setPlantName('');
          }}
        >
          <Image
            src='https://upload.wikimedia.org/wikipedia/commons/5/55/Magnifying_glass_icon.svg'
            alt='find'
            width={25}
            height={25}
          />
        </button>
      </div>
      <button className='profileName' onClick={() => setUserId(null)}>
        {username}
      </button>
    </div>
  );
};

export default NavBar;
