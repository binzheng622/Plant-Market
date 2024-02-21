'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const goLogin = () => {
    router.push('/login');
  };

  const registerUser = async () => {
    try {
      const response = await fetch('http://localhost:3000/register/api', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      const userData = await response.json();

      if (response.status === 200) {
        goLogin();
      } else {
        setUsername('');
        setEmail('');
        setPassword('');
        alert(userData.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='authContainer'>
      <div className='authForm'>
        <input
          className='authInput'
          placeholder='Username'
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          className='authInput'
          placeholder='Email'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type='password'
          className='authInput'
          placeholder='Password'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button className='authButton' onClick={registerUser}>
          Sign Up
        </button>
        <Link className='linkButton' href='/login'>
          Login
        </Link>
      </div>
    </div>
  );
}
