const con = require('../models/DAO')
const Tarefa = require('../models/Tarefa')

const toCreate = (req, res) => {
    con.query(Tarefa.criarTarefa(req.body), (err, result) => {
        if (err == null) {
            res.status(201).json(result).end()
        } else {
            res.status(500).json(err).end()
        }
    })
}

const toConclude = (req, res) => {
    con.query(Tarefa.concluirTarefa(req.body), (err, result) => {
        if (err == null) {
            res.status(200).json(result).end()
        } else {
            res.status(500).json(err).end()
        }
    })
}

const toCancel = (req, res) => {
    con.query(Tarefa.cancelarTarefa(req.body), (err, result) => {
        if (err == null) {
            res.status(200).json(result).end()
        } else {
            res.status(500).json(err).end()
        }
    })
}

const toRead = (req, res) => {
    con.query(Tarefa.listarTarefas(req.params), (err, result) => {
        if (err == null) {
            res.status(201).json(result).end()
        } else {
            res.status(500).json(err).end()
        }
    })
}

module.exports = {
    toCancel,
    toConclude,
    toCreate,
    toRead
}