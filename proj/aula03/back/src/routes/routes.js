const express = require('express')

const router = express.Router();

const Funcionarios = require('../controllers/funcionario')
const Setores = require('../controllers/setor')
const Produtos = require('../controllers/produto')

router.get('/funcionarios', Funcionarios.read)
router.post('/funcionarios', Funcionarios.create)
router.put('/funcionarios/:id', Funcionarios.update)
router.delete('/funcionarios/:id', Funcionarios.remove)

router.get('/setores', Setores.read)
router.get('/setores/:id', Setores.readOne)
router.post('/setores', Setores.create)
router.put('/setores/:id', Setores.update)
router.delete('/setores/:id', Setores.remove)

router.get('/produtos', Produtos.read)
router.post('/produtos', Produtos.create)
router.put('/produtos/:id', Produtos.update)
router.delete('/produtos/:id', Produtos.remove)

module.exports = router