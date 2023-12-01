import React from 'react';

const SignupContainer = () => {
  return (
    <div className='signupContainer'>
      <form className='signupForm' method='POST' action='/signup'>
        <input
          name='username'
          className='signup username'
          placeholder='Username'
        />
        <input name='email' className='signup email' placeholder='Email' />
        <input
          name='password'
          type='password'
          className='signup password'
          placeholder='Password'
        />
        <button className='signup button'>Sign Up</button>
      </form>
    </div>
  );
};

export default SignupContainer;
