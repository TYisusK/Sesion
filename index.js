var express=require("express");
var path=require("path");
var usuariosRutas=require("./rutas/usuarios");
var session=require("cookie-session");
require("dotenv").config();

var app=express();
app.set("view engine", "ejs");
app.set("/web", express.static(path.join(__dirname, "web")));
app.use(express.urlencoded({extended:true}));
app.use(session({
    name: session,
    keys:[process.env.SECRETO_SESSION]
}));

app.use("/", usuariosRutas);

var port=process.env.port || 3000;

app.listen(port, ()=>{
    console.log("servidor en http://localhost:"+port);
})