const mysql = require("mysql");

// datos de la conexion en el localhost
// const dbConnection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : '',
//     database : 'toys'
// });

//datos de la conexion en el servido de Clever Cloud

const dbConnection = mysql.createConnection({
  connectionLimit: 5,
  host: "bcfox0jnxc5ga7svuovv-mysql.services.clever-cloud.com",
  database: "bcfox0jnxc5ga7svuovv",
  user: "uox3sid6eptjtxs8",
  password: "u99yb9sJJLKyRx5M3l6U",
});

module.exports = dbConnection;
