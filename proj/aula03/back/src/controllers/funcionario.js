const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const create = async (req, res) => {
    var info = req.body
    req.body.salario = Number(req.body.salario)
    req.body.id_setor = Number(req.body.id_setor)
    const funcionario = await prisma.funcionario.create({
        data: info
    })

    res.status(200).json(funcionario).end()
}

const read = async (req, res) => {
    const funcionarios = await prisma.funcionario.findMany({
        select: {
            id: true,
            nome: true,
            salario: true,
            setor: {
                select: {
                    id: true,
                    nome: true
                }
            }
        }
    })

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
            id: Number(req.body.id)
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