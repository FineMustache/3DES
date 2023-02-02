const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const create = async (req, res) => {
    var info = req.body
    const funcionario = await prisma.funcionario.create({
        data: info
    })

    res.status(200).json(funcionario).end()
}

const read = async (req, res) => {
    const funcionarios = await prisma.funcionario.findMany()

    res.status(200).json(funcionarios).end()
}

const update = async (req, res) => {
    const funcionario = await prisma.funcionario.update({
        where: {
            id: Number(req.params.id)
        },
        data: req.body
    })

    res.status(200).json(funcionario).end()
}

const remove = async (req, res) => {
    const funcionario = await prisma.funcionario.delete({
        where: {
            id: Number(req.params.id)
        }
    })
    res.status(200).json(funcionario).end()
}

module.exports = {
    create,
    read,
    update,
    remove
}