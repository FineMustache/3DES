const express = require('express')

const router = express.Router();

const Funcionarios = require('../controllers/funcionario')
const Setores = require('../controllers/setor')
const Produtos = require('../controllers/produto')
const Vendas = require('../controllers/venda')
const Detalhes = require('../controllers/detalhe')

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

router.get('/vendas', Vendas.read)
router.post('/vendas', Vendas.create)
router.put('/vendas/:id', Vendas.update)
router.delete('/vendas/:id', Vendas.remove)

router.get('/detalhes', Detalhes.read)
router.post('/detalhes', Detalhes.create)
router.put('/detalhes/:id', Detalhes.update)
router.delete('/detalhes/:id', Detalhes.remove)

module.exports = router