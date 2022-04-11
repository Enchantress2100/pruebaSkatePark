require("dotenv").config();

const { Client } = require("pg");
const db = async (email,nombre,password,anos_experiencia, especialidad)=> {
  const client = new Client(); //{
  //   connectionString: process.env.DATABASE_URL,
  //   ssl: {
  //     rejectUnauthorized: false,
  //   },
  // }
  await client.connect();
  const res = await client.query(
    `UPDATE skaters SET nombre='${nombre}', password='${password}', anos_experiencia='${anos_experiencia}', especialidad='${especialidad}', estado='FALSE' WHERE email='${email}'`
  );
  await client.end();
  return res.rows;
};

module.exports = db;
