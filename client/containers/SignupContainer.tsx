import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../assets/background.png';

const SignupContainer = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const goLogin = () => {
    navigate('/');
  };

  //store user info in database
  const signUp = () => {
    fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        goLogin();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className='signupContainer'
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className='signupForm'>
        <input
          className='signup username'
          placeholder='Username'
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          className='signup email'
          placeholder='Email'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type='password'
          className='signup password'
          placeholder='Password'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button className='signup button' onClick={signUp}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignupContainer;
