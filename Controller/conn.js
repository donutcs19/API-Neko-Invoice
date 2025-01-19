const mysql = require("mysql2");
require('dotenv').config();

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

conn.connect((err) => {
    if (err){
        console.log('Error connection to MySQL -> ',err)
        return;
    }
    console.log('MySQL success connection');
});

module.exports = conn;