const con = require("../models/dao");
const Pedidos = require("../models/Pedido")

const toCreate = (req, res) => {
    con.query(Pedidos.toCreate(req.body), (err, result) => {
        if (err == null) {
            res.status(200).json(result).end()
        } else {
            res.status(500).json(err).end()
        }
    })
}

const toRead = (req, res) => {
    con.query(Pedidos.toRead(req.params), (err, result) => {
        if (err == null) {
            res.status(200).json(result).end()
        } else {
            res.status(500).json(err).end()
        }
    })
}

const toReadAll = (req, res) => {
    con.query(Pedidos.toReadAll(), (err, result) => {
        if (err == null) {
            res.status(200).json(result).end()
        } else {
            res.status(500).json(err).end()
        }
    })
}

const toReadEx = (req, res) => {
    con.query(Pedidos.toReadEx(), (err, result) => {
        if (err == null) {
            res.status(200).json(result).end()
        } else {
            res.status(500).json(err).end()
        }
    })
}

const toReadEnt = (req, res) => {
    con.query(Pedidos.toReadEnt(req.params), (err, result) => {
        if (err == null) {
            res.status(200).json(result).end()
        } else {
            res.status(500).json(err).end()
        }
    })
}

const toUpdate = (req, res) => {
    con.query(Pedidos.toUpdate(req.body), (err, result) => {
        if (err == null) {
            res.status(200).json(result).end()
        } else {
            res.status(500).json(err).end()
        }
    })
}

const toDelete = (req, res) => {
    con.query(Pedidos.toDelete(req.body), (err, result) => {
        if (err == null) {
            res.status(200).json(result).end()
        } else {
            res.status(500).json(err).end()
        }
    })
}

module.exports = {
    toCreate,
    toRead,
    toReadAll,
    toReadEx,
    toReadEnt,
    toUpdate,
    toDelete
}