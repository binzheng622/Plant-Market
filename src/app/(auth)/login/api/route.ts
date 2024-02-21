import bcrypt from 'bcrypt';
import db from '@/database/db';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  try {
    const userEmail: string[] = [email];
    const findUser = 'SELECT * FROM users WHERE email = $1';

    //check if user is in database
    const result: any = await db.query(findUser, userEmail);

    //if user is in database
    if (result.rows.length > 0) {
      //compare if hash password match database password
      const hashMatch = await bcrypt.compare(password, result.rows[0].password);
      //if password is a match
      if (hashMatch) {
        const userID: string[] = [result.rows[0].id];
        const userName = 'SELECT * FROM users WHERE id = $1';
        const plantData = 'SELECT * FROM plants WHERE plantownerid = $1';

        //find username and user plant list
        const userResult: any = await db.query(userName, userID);
        const plantResult: any = await db.query(plantData, userID);

        //send user to personal page
        return new Response(
          JSON.stringify({
            id: result.rows[0].id,
            username: userResult.rows[0].username,
            plantList: plantResult.rows,
          }),
          { status: 200 }
        );
      } else {
        //if password dont match
        return new Response(
          JSON.stringify({ message: 'user information incorrect' }),
          { status: 401 }
        );
      }
    } else {
      //if user not found in database
      return new Response(
        JSON.stringify({ message: 'user information not found' }),
        { status: 401 }
      );
    }
  } catch (err) {
    //cant add user to database
    return new Response(JSON.stringify({ message: 'login server error' }), {
      status: 500,
    });
  }
}
