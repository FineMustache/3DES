const con = require("../models/dao");
const Entregadores = require("../models/Entregador")

const toRead = (req, res) => {
    con.query(Entregadores.toRead(req.params), (err, result) => {
        if (err == null) {
            res.status(200).json(result).end()
        } else {
            res.status(500).json(err).end()
        }
    })
}

const toValidate = (req, res) => {
    con.query(Entregadores.toReadEmail(req.body), (err, result) => {
        if (err == null) {
            if (result.length > 0) {
                if (req.body.senha == result[0].senha) {
                    res.status(200).json(result[0]).end()
                } else {
                    res.status(400).end()
                }
            } else {
                res.status(404).json({'msg': 'Entregador não encontrado'}).end()
            }
        } else {
            res.status(500).json(err).end()
        }
    })
}

module.exports = {
    toRead,
    toValidate
}