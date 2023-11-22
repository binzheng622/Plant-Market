import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginContainer = () => {
  const navigate = useNavigate();
  function signUp() {
    navigate('/signup');
  }

  return (
    <div className='loginContainer'>
      <form className='loginForm' method='POST' action='/'>
        <input name='email' className='login email' placeholder='Email' />
        <input
          name='password'
          type='password'
          className='login password'
          placeholder='Password'
        />
        <button className='login button'>Login</button>
        <button className='signLog button' onClick={signUp}>
          SignUp
        </button>
      </form>
    </div>
  );
};

export default LoginContainer;
