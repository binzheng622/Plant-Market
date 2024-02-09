import pg from 'pg';
import 'dotenv/config';

//connect to PG database
const pool = new pg.Pool({
  connectionString: process.env.PG_URI,
});

export default {
  query: (text: any, params: any) => {
    return pool.query(text, params);
  },
};
