var Sequelize=require("sequelize");
var UsuarioModelo = require("./modelos/usuarios");
require("dotenv").config();

var db=process.env.DB_MYSQL_LOCAL;
var usuario=process.env.USUARIO_MYSQL_LOCAL;
var password=process.env.PASSWORD_MYSQL_LOCAL;
var host=process.env.HOST_MYSL_LOCAL;
var port=process.env.PORT_MYSQL_LOCAL;

/*
var db=process.env.DB_MYSQL_REMOTO;
var usuario=process.env.USUARIO_MYSQL_REMOTO;
var password=process.env.PASSWORD_MYSQL_REMOTO;
var host=process.env.HOST_MYSL_REMOTO;
var port=process.env.PORT_MYSQL_REMOTO;  
*/
var conexion=new Sequelize(db,usuario,password,{
    host:host, 
    port:port,
    dialect:"mysql", 
  
})

var Usuario=UsuarioModelo(conexion);

conexion.sync({force:false})
.then(()=>{
    console.log("conectado a Mysql");
})
.catch((err)=>{
    console.log("Error al conectarse a Mysql "+err);
})

module.exports={
    Usuario:Usuario
}