import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { syncData } from '../reducers/plantsReducer.js';
import Background from '../assets/background.png';

const LoginContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const goMain = () => {
    navigate('/main');
  };

  const goSignUp = () => {
    navigate('/signup');
  };

  //check if user is in database and sync data
  const login = () => {
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(syncData(data));
        goMain();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className='loginContainer'
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className='loginForm'>
        <input
          className='login email'
          placeholder='Email'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type='password'
          className='login password'
          placeholder='Password'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button className='login button' onClick={login}>
          Login
        </button>
        <button className='signLog button' onClick={goSignUp}>
          SignUp
        </button>
      </div>
    </div>
  );
};

export default LoginContainer;
