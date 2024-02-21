'use client';
import { useState } from 'react';
import { useUserContext } from '@/context/userContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const { setUserId, setUsername, setPlantList } = useUserContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const goMain = () => {
    router.push('/');
  };

  const checkUser = async () => {
    try {
      const response = await fetch(
        'https://plant-market.vercel.app/login/api',
        {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const userData = await response.json();

      if (response.status === 200) {
        setUserId(userData.id);
        setUsername(userData.username);
        setPlantList(userData.plantList);
        goMain();
      } else {
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
        <button className='authButton' onClick={checkUser}>
          Login
        </button>
        <Link className='linkButton' href='/register'>
          Sign Up
        </Link>
      </div>
    </div>
  );
}
