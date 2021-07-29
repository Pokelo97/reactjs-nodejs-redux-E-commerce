const mysql = require("mysql2");
//env
require('dotenv').config();

const db_conn = mysql
  .createConnection({
    connectionLimit: 50,
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    database : process.env.DB_DATABASE 
  })
  .on("error", (err) => {
    console.log("Failed to connect to Database - ", err);
  });

module.exports = db_conn;