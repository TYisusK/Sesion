var ruta=require("express").Router();
const { where } = require("sequelize");
var {Usuario}=require("../conexion");
var validator = require("validator");

ruta.post("/nuevoUsuario", (req, res) => {
  var { usuario, nombre, password } = req.body;

  // Realizar la validación de los datos
  var errores = [];
  if (!validator.isLength(usuario, { min: 1 })) {
    errores.push("El campo Usuario es requerido.");
  }

  if (!validator.isLength(nombre, { min: 1 })) {
    errores.push("El campo Nombre es requerido.");
  }

  if (!validator.isLength(password, { min: 1 })) {
    errores.push("El campo Password es requerido.");
  }

  // Si hay errores, renderizar el formulario con los mensajes de error
  if (errores.length > 0) {
    return res.render("nuevoUsuario", { errores, usuario, nombre });
  }

  // Si no hay errores, crear el nuevo usuario en la base de datos
  Usuario.create({
    usuario: usuario,
    nombre: nombre,
    password: password,
    status: 1, // Establecer el campo status a 1
  })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log("Error al insertar el registro: " + err);
      res.redirect("/");
    });
});

ruta.get("/", (req, res) => {
    try {
        Usuario.findAll({ where: { status: 1 } })
            .then((usu) => {
                res.render("mostrar", { usuarios: usu });
            })
            .catch((err) => {
                console.log("Error ..........", err);
                res.render("error", { error: "Error al obtener usuarios de la base de datos." });
            });
    } catch (err) {
        console.log("Error al renderizar la plantilla mostrar: ", err);
        res.render("error", { error: "Error al renderizar la plantilla mostrar." });
    }
});
ruta.get("/nuevoUsuario", (req,res)=>{
    res.render("nuevoUsuario");
})

ruta.post("/nuevoUsuario",(req,res)=>{
    Usuario.create(req.body)
    .then(()=>{
        res.redirect("/")
    })
    .catch((err)=>{
        comsole.log("Error al insertar el registro"+err)
        res.redirect("/")
    })
})
ruta.get("/modificarUsuario/:id", (req, res) => {
    Usuario.findByPk(req.params.id)
      .then((usuario) => {
        res.render("modificarUsuario", { usuario });
      })
      .catch((err) => {
        console.log("Error al obtener el usuario: ", err);
        res.redirect("/");
      });
  });
  
  ruta.get("/modificarUsuario/:id", (req, res) => {
    Usuario.findByPk(req.params.id)
      .then((usuario) => {
        res.render("modificarUsuario", { usuario });
      })
      .catch((err) => {
        console.log("Error al obtener el usuario: ", err);
        res.redirect("/");
      });
  });
  
  ruta.post("/modificarUsuario", (req, res) => {
    const { id, usuario, nombre, password } = req.body;
  
    // Realizar la validación de los datos aquí, si es necesario
  
    // Actualizar el usuario en la base de datos
    Usuario.update(
      {
        usuario: usuario,
        nombre: nombre,
        password: password,
      },
      { where: { id: id } }
    )
      .then(() => {
        res.redirect("/");
      })
      .catch((err) => {
        console.log("Error al actualizar el usuario: ", err);
        res.redirect("/");
      });
  });
  
  
  ruta.get("/borradoFisicoUsuario/:id", (req, res) => {
    Usuario.destroy({ where: { id: req.params.id } })
      .then(() => {
        res.redirect("/");
      })
      .catch((err) => {
        console.log("Error al borrar el usuario: ", err);
        res.redirect("/");
      });
  });
  

module.exports=ruta;
