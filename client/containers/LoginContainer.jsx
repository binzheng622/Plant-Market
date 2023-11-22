import React from 'react';

const LoginContainer = () => {
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
      </form>
    </div>
  );
};

export default LoginContainer;
