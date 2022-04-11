require("dotenv").config();

const { Client } = require("pg");
const cu = async (email,nombre,password,anos_experiencia,especialidad,foto, estado) => {
   const client = new Client({
     connectionString: process.env.DATABASE_URL,
     ssl: {
      rejectUnauthorized: false,
     },
      }
   );
  await client.connect();
  const res =
    await client.query(`INSERT INTO skaters(email,nombre,password,anos_experiencia,especialidad,foto, estado) values('${email}','${nombre}','${password}','${anos_experiencia}', '${especialidad}', '${foto}', '${estado}') RETURNING*;`);
  await client.end();
  return res.rows;
};

module.exports = cu;
