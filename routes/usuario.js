const express = require("express");
const router = express.Router();

//Ejemplo de usuario
const usuarios = [
  { id: 1, nombre: "rodrigo" },
  { id: 2, nombre: "memo" },
  { id: 3, nombre: "massiel" },
];
// method GET
router.get("/", (req, res) => {
  res.json({
    usuarios,
  });
});

// method GET
router.get("/:id", (req, res) => {

  let user = existeUsuario(req.params.id);

  if (!user) {
    res.status(404).json({ resp: `usuario con ID: ${req.params.id} no fue encontrado` });
    return;
  }

  res.json(user);
});

// method POST
router.post("/", (req, res) => {
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

// method PUT
router.put("/", (req, res) => {
  if (!req.body.id || !req.body.nombre) {
    res
      .status(400)
      .json({ resp: `Debe ingresar un id o un nombre ` });
    return;
  } else {
    let user = existeUsuario(req.body.id);
    if (!user) {
      res.status(404).json({ resp: `usuario ${req.body.id} no fue encontrado` });
      return;
    }
    user.nombre = req.body.nombre;

    res.json(user);
  }

});

// method delete
router.delete('/:id', (req, res) => {
  let user = existeUsuario(req.params.id);
  if (!user) {
    res.status(404).json({ resp: `usuario con ID: ${req.params.id} no fue encontrado` });
    return;
  }
  const index = usuarios.indexOf(user);
  usuarios.splice(index, 1);
  res.json(user);
});

function existeUsuario(id) {
  return (usuarios.find(u => u.id === parseInt(id)));
}


module.exports = router;