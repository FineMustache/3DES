const Express = require('express');

const router = Express.Router();

const PedidosController = require('./controllers/PedidosController')
const EntregadoresController = require('./controllers/EntregadoresController')

router.get("/comida/pedidos", PedidosController.toReadAll);
router.get("/comida/pedidos/:id", PedidosController.toRead);
router.get("/comida/entregadores", EntregadoresController.toRead);

router.post("/comida/pedidos", PedidosController.toCreate);
router.post("/comida/entregadores", EntregadoresController.toValidate);

router.put("/comida/pedidos", PedidosController.toUpdate);

router.delete("/comida/pedidos", PedidosController.toDelete);

module.exports = router;