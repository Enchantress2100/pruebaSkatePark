require("dotenv").config();

const { Client } = require("pg");
const db = async () => {
   const client = new Client({
     connectionString: process.env.DATABASE_URL,
     ssl: {
       rejectUnauthorized: false,
     },
      }
  );
  await client.connect();
  const res = await client.query( "select id, email, nombre,password, anos_experiencia, especialidad, foto, CASE estado when true then 'Aprobado' ELSE 'En revisión' END estado from skaters order by id"
  );
  await client.end();
  return res.rows;
};

module.exports = db;
