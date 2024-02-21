'use client';
import { redirect } from 'next/navigation';
import { useUserContext } from '@/context/userContext';
import NavBar from '@/components/NavBar';
import PlantMarket from '@/components/PlantMarket';

export default function MainPage() {
  const { userId, setUserId, username, plantList, setPlantList } =
    useUserContext();

  const findPlant = async (plantName: string) => {
    try {
      const response = await fetch('http://localhost:3000/plants', {
        method: 'POST',
        body: JSON.stringify({ userId, plantName }),
        headers: { 'Content-Type': 'application/json' },
      });

      const plantData = await response.json();

      if (response.status === 200) {
        setPlantList(plantData.plantList);
      } else {
        alert(plantData.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deletePlant = async (plantId: string) => {
    try {
      const response = await fetch('http://localhost:3000/plants', {
        method: 'DELETE',
        body: JSON.stringify({ userId, plantId }),
        headers: { 'Content-Type': 'application/json' },
      });

      const plantData = await response.json();

      if (response.status === 200) {
        setPlantList(plantData.plantList);
      } else {
        alert(plantData.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return !userId ? (
    redirect('/login')
  ) : (
    <div>
      <NavBar
        key={userId}
        username={username}
        setUserId={setUserId}
        findPlant={findPlant}
      />
      <PlantMarket plantList={plantList} deletePlant={deletePlant} />
    </div>
  );
}
