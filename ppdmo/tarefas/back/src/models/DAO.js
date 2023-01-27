const mysql = require("mysql");

const con = mysql.createConnection({
    host: 'localhost',
    database: 'tarefas',
    user: 'root'
});

module.exports = con;