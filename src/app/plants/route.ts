import db from '@/database/db';

export async function POST(request: Request) {
  const body = await request.json();
  const { userId, plantName } = body;

  try {
    //check if user input plant name
    if (plantName) {
      //fetch plant data from API with user input plant name
      const fetchResponse = await fetch(
        `https://perenual.com/api/species-list?key=${process.env.PLANT_API}&q=${plantName}`
      );
      const data = await fetchResponse.json();

      //if data return with 1 or more find
      if (data.data.length > 0) {
        //clean data for database entry
        const plant = data.data[0];
        const plantName = plant.scientific_name[0];
        const plantSun = plant.sunlight[0];
        const plantWater = plant.watering;
        const plantOwnerId = userId;
        const imageUrl = plant.default_image.original_url;

        const plantInfo: string[] = [
          plantName,
          plantSun,
          plantWater,
          plantOwnerId,
          imageUrl,
        ];

        const createPlant =
          'INSERT INTO plants (plantname, plantsun, plantwater, plantownerid, imageurl) VALUES ($1, $2, $3, $4, $5)';

        //add plant to user database
        await db.query(createPlant, plantInfo);

        //update user plant list
        const userID: string[] = [userId];
        const plantData = 'SELECT * FROM plants WHERE plantownerid = $1';

        const plantResult: any = await db.query(plantData, userID);

        //send back updated user plant list
        return new Response(JSON.stringify({ plantList: plantResult.rows }), {
          status: 200,
        });
      } else {
        //could not find plant name in API database
        return new Response(JSON.stringify({ message: 'plant not found' }), {
          status: 401,
        });
      }
    } else {
      //user did not put any plant name
      return new Response(
        JSON.stringify({ message: 'please input plant name' }),
        { status: 401 }
      );
    }
  } catch (err) {
    return new Response(JSON.stringify({ message: 'add plant server error' }), {
      status: 500,
    });
  }
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const { userId, plantId } = body;

  try {
    const plantID: string[] = [plantId];
    const deletePlant = 'DELETE FROM plants WHERE id = $1';

    //delete plant from database
    await db.query(deletePlant, plantID);

    //update user plant list
    const userID: string[] = [userId];
    const plantData = 'SELECT * FROM plants WHERE plantownerid = $1';

    const plantResult: any = await db.query(plantData, userID);

    //send back updated user plant list
    return new Response(JSON.stringify({ plantList: plantResult.rows }), {
      status: 200,
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ message: 'delete plant server error' }),
      { status: 500 }
    );
  }
}
