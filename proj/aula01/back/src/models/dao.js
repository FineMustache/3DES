const mysql = require("mysql");

const USER = process.env.USER || 'root';

const con = mysql.createConnection({
    host: 'localhost',
    database: 'projeto1',
    user: 'root'
});

module.exports = con;