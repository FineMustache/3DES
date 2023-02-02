const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const create = async (req, res) => {
    var info = req.body
    const produto = await prisma.produto.create({
        data: info
    })

    res.status(200).json(produto).end()
}

const read = async (req, res) => {
    const produtos = await prisma.produto.findMany()

    res.status(200).json(produtos).end()
}

const update = async (req, res) => {
    const produto = await prisma.produto.update({
        where: {
            id: Number(req.params.id)
        },
        data: req.body
    })

    res.status(200).json(produto).end()
}

const remove = async (req, res) => {
    const produto = await prisma.produto.delete({
        where: {
            id: Number(req.params.id)
        }
    })
    res.status(200).json(produto).end()
}

module.exports = {
    create,
    read,
    update,
    remove
}