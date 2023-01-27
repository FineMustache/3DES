
const express = require('express');
const router = express.Router();

const Tarefa = require('./controllers/TarefasController.js')

router.get("/tarefas/:status", Tarefa.toRead);
router.put("/tarefas/concluir", Tarefa.toConclude);
router.put("/tarefas/cancelar", Tarefa.toCancel);
router.post("/tarefas", Tarefa.toCreate);

module.exports = router;