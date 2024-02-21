'use client';
import { createContext, useContext, useState } from 'react';

const UserContext = createContext<any>(undefined);

export function UserWrapper({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState('Profile');
  const [plantList, setPlantList] = useState([]);

  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId,
        username,
        setUsername,
        plantList,
        setPlantList,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
