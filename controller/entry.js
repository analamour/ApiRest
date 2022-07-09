const { v4: uuidv4 } = require("uuid");
const middleware = require('../utils/middleware');

const router = require("express").Router();
let dao  = require("../dataccess/entry");

/* Obtener todo */
router.get("/", (req, res) => { 
  res.status(200).json(dao.getAll(req.query));
});

/* Obtener uno especifico */
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const data = dao.getOne(id);

  if (data) {
    res.status(200).json(data);
  } else {
    res.sendStatus(404);
  }
});

/* Agregar un elemento */
/*
// POST funcionando sin usuario logueado
router.post("/", (req, res) => {
  
  const body = { ...req.body, id: uuidv4() };
  dao.save(body);
  res.status(200).json(body);
});
*/

// POST funcionando con usuario logueado
router.post("/", middleware.validarUserLogin, (req, res) => {
  
  const body = { ...req.body, id: uuidv4(), user: req.user };
  dao.save(body);
  res.status(200).json(body);
});

/* Borrar un elemento */
/*router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Entry = Entry.filter((registro) => registro.id != id);
  res.sendStatus(201);
});*/

router.delete("/:id", (req, res) => {
  const id = req.params.id;  

  if (dao.borrar(id)) { 
    res.sendStatus(202);
  } else {
    res.sendStatus(404);
  }
});

/* Modificar un elemento */
router.put("/:id", (req, res) => {
  const id = req.params.id;
 
  if (dao.update(id, req.body) ) { 
    res.sendStatus(202);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
