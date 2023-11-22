import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar.jsx';

const MainContainer = () => {
  let { id } = useParams();
  const username = useSelector((state) => state.plants.username);
  const plantList = useSelector((state) => state.plants.plantList);

  return (
    <div className='mainContainer'>
      <NavBar username={username} userId={id} />
    </div>
  );
};

export default MainContainer;
