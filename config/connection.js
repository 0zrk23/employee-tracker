const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection(
    {
        host: process.env.MYSQLHOST,
        user: process.env.MYSQLUSER,
        password: process.env.MYSQLPASSWORD,
        database: process.env.MYSQLDATABASE,
        port: process.env.MYSQLPORT || 3306
    },
    console.log(`Connected to the ${process.env.MYSQLDATABASE} database.`)
).promise();

module.exports = db;