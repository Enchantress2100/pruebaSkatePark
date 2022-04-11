require("dotenv").config();

const { Client } = require("pg");
const db = async (estado) => {
  const client = new Client({
     connectionString: process.env.DATABASE_URL,
     ssl: {
      rejectUnauthorized: false,
     },
   })
  await client.connect();
  const res = await client.query(
    `UPDATE skaters SET estado='TRUE' WHERE estado='FALSE'`
  );
  await client.end();
  return res.rows;
};

module.exports = db;
