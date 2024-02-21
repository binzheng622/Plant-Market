import bcrypt from 'bcrypt';
import db from '@/database/db';

export async function POST(request: Request) {
  const body = await request.json();
  const { username, email, password } = body;

  try {
    const userEmail: string[] = [email];
    const findUser = 'SELECT * FROM users WHERE email = $1';

    //check if email is already in database
    const result = await db.query(findUser, userEmail);

    //if user input data and email is not in database
    if (
      username.length &&
      email.length &&
      password.length &&
      result.rows.length < 1
    ) {
      //hash password and create user in database
      const hashPassword = await bcrypt.hash(password, 10);
      const userInfo: string[] = [username, email, hashPassword];
      const createUser =
        'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)';

      await db.query(createUser, userInfo);

      return new Response(
        JSON.stringify({ message: 'user information added' }),
        { status: 200 }
      );
    } else {
      //user input incorrect data
      return new Response(
        JSON.stringify({ message: 'user information incorrect' }),
        { status: 401 }
      );
    }
  } catch (err) {
    //cant add user to database
    return new Response(JSON.stringify({ message: 'register server error' }), {
      status: 500,
    });
  }
}
