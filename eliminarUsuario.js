require("dotenv").config();

const { Client } = require("pg");
const eu = async (email) => {
    const client = new Client({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//       rejectUnauthorized: false,
//     },
});
await client.connect();
const res = await client.query(`DELETE FROM skaters WHERE email='${email}'`);
await client.end();
return res.rowCount;
};

module.exports = eu;

