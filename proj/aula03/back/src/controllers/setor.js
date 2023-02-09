const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const create = async (req, res) => {
    var info = req.body
    req.body.comissao = Number(req.body.comissao)
    const setor = await prisma.setor.create({
        data: info
    })

    res.status(200).json(setor).end()
}

const read = async (req, res) => {
    const setores = await prisma.setor.findMany({
        select: {
            id: true,
            nome: true,
            funcionarios: true,
            produtos: true,
            comissao: true
        }
    })

    res.status(200).json(setores).end()
}

const readOne = async (req, res) => {
    const setores = await prisma.setor.findMany({
        where: {
            id: Number(req.params.id)
        },
        select: {
            id: true,
            nome: true,
            funcionarios: true,
            produtos: true,
            comissao: true
        }
    })

    res.status(200).json(setores).end()
}

const update = async (req, res) => {
    const setor = await prisma.setor.update({
        where: {
            id: Number(req.params.id)
        },
        data: req.body
    })

    res.status(200).json(setor).end()
}

const remove = async (req, res) => {
    const setor = await prisma.setor.delete({
        where: {
            id: Number(req.body.id)
        }
    })
    res.status(200).json(setor).end()
}

module.exports = {
    create,
    read,
    readOne,
    update,
    remove
}