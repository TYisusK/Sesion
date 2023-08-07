// conexion.js
var Sequelize = require("sequelize");
var UsuarioModelo = require("./modelos/usuarios");
require("dotenv").config();

var db = process.env.DB_MYSQL_REMOTO;
var usuario = process.env.USUARIO_MYSQL_REMOTO;
var password = process.env.PASSWORD_MYSQL_REMOTO;
var host = process.env.HOST_MYSQL_REMOTO;
var port = process.env.PORT_MYSQL_REMOTO;

var conexion = new Sequelize(db, usuario, password, {
  host: host,
  port: port,
  dialect: "mysql",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // You may need to adjust this based on your setup
    }
  }
});

var Usuario = UsuarioModelo(conexion);

conexion.sync({ force: false })
  .then(() => {
    console.log("conectado a Mysql");
  })
  .catch((err) => {
    console.log("Error al conectarse a Mysql " + err);
  });

module.exports = {
  Usuario: Usuario
};