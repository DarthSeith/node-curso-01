const express = require("express");
const dotenv = require("dotenv");

//traer la Api de usuario
const usuario = require('./routes/usuario');

//archivo configuracion .env
dotenv.config();

const port = process.env.PORT;

// Aplicar express
const app = express();

// para recibir los json en el body es un middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * PAre realizar antes de ir a las APis
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
// antes de la peticion se puede hacer la validacion o middleware
function beforeRequest(req, res, next) {
  console.log("Method de tipo:  " + req.method);
  next();
}
// aca le damos a la funcion que creamos para que pase antes por aca
app.use(beforeRequest);


/**
 * Poder Utilizar la APIs de usuario
 */
//middleware
app.use('/api/usuarios', usuario);


app.listen(port, function () {
  console.log("Api usuario, escuchando el puerto " + port + "!");
  console.log("direccion absoluta ::: " + __dirname);
});
