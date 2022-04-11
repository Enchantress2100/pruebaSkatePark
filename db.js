require("dotenv").config();
const { Client } = require("pg");

const db = async () => {
  const client = new Client();
  await client.connect();
  const res = await client.query("SELECT * from skaters");
  await client.end();
  return res.rows;
};

db().then((res) => console.log(res));
