const express = require("express");
const dotenv = require("dotenv");

//archivo configuracion .env
dotenv.config();

const port = process.env.PORT;

// Aplicar express
const app = express();

// para recibir los json en el body es un middleware
app.use(express.json());

// antes de la peticion se puede hacer la validacion o middleware
function beforeRequest(req, res, next) {
  console.log("Siempre va a pasar por aca en todas la consultas " + req.method);
  next();
}
// aca le damos a la funcion que creamos para que pase antes por aca
app.use(beforeRequest);

//cualquier que pase por en el get y path  /user/:id, va a pasar por aca
app.all("/user/:id", (req, res, next) => {
  console.log("Siempre va a pasar por aca en el get y path  /user/:id");
  next();
});

//como pagina
app.get("/user/:id", (req, res) => {
  console.log(req.params);
  res.json({
    id: req.params.id,
    username: "rodrigo",
    lastname: "dsadsa",
  });
});

// como Json http://localhost:8181/user/insert/43
app.post("/user/insert/:id", (req, res) => {
  console.log(req.params);
  console.log(req.body);
  res.json({
    id: req.params.id,
    username: `ingreso: ${req.body.username}`,
    lastname: "ingreso: " + req.body.lastname,
  });
});

app.listen(port, function () {
  console.log("Aplicación ejemplo, escuchando el puerto " + port + "!");
  console.log("direccion absoluta ::: " + __dirname);
});
