import pg from 'pg';

//connect to PG database
const pool = new pg.Pool({
  connectionString: process.env.PG_URI,
});

const db = {
  query: (text: any, params: any) => {
    return pool.query(text, params);
  },
};

export default db;
