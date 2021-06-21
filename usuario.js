const express = require("express");
const dotenv = require("dotenv");

//archivo configuracion .env
dotenv.config();

const port = process.env.PORT;

// Aplicar express
const app = express();

// para recibir los json en el body es un middleware
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// antes de la peticion se puede hacer la validacion o middleware
function beforeRequest(req, res, next) {
  console.log("Method de tipo:  " + req.method);
  next();
}
// aca le damos a la funcion que creamos para que pase antes por aca
app.use(beforeRequest);

//Ejemplo de usuario
const usuarios = [
  { id: 1, nombre: "rodrigo" },
  { id: 2, nombre: "memo" },
  { id: 3, nombre: "massiel" },
];

// method GET
app.get("/api/usuarios", (req, res) => {
  res.json({
    usuarios,
  });
});
// method GET
app.get("/api/usuarios/:id", (req, res) => {
  let user = usuarios.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    res.status(404).json({ resp: `usuario ${req.params.id} NO encontrado` });
    return;
  }

  res.json(user);
});

// method POST
app.post("/api/usuarios", (req, res) => {
  if (!req.body.nombre || req.body.nombre.length < 3) {
    res
      .status(400)
      .json({ resp: `Debe ingresar un nombre, que minimo tenga 3 letras` });
    return;
  }
  const user = {
    id: usuarios.length + 1,
    nombre: req.body.nombre,
  };
  usuarios.push(user);
  res.json(user);
});

//middleware
app.use('/movies',require('./routes/movies'));

app.listen(port, function () {
  console.log("Api usuario, escuchando el puerto " + port + "!");
  console.log("direccion absoluta ::: " + __dirname);
});
