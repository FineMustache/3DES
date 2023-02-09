const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const create = async (req, res) => {
    var info = req.body
    req.body.valor = Number(req.body.valor)
    req.body.id_setor = Number(req.body.id_setor)
    const produto = await prisma.produto.create({
        data: info
    })

    res.status(200).json(produto).end()
}

const read = async (req, res) => {
    const produtos = await prisma.produto.findMany({
        select: {
            id: true,
            nome: true,
            imagem: true,
            valor: true,
            setor: {
                select: {
                    id: true,
                    nome: true
                }
            }
        }
    })

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
            id: Number(req.body.id)
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