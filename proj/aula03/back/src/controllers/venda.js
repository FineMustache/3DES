const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const create = async (req, res) => {
    var info = req.body

    req.body.detalhes.forEach(d => {
        d.quantidade = Number(d.quantidade)
    })

    const venda = await prisma.vendas.create({
        data: {
            id_funcionario: Number(req.body.id_funcionario),
            detalhe: {
                create: req.body.detalhes
            }
        }
    })
    

    res.status(200).json(venda).end()
}

const read = async (req, res) => {
    const vendas = await prisma.vendas.findMany({
        include: {
            funcionario: true,
            detalhe: {
                select: {
                    produto: true,
                    quantidade: true
                }
            }
        }
    })

    res.status(200).json(vendas).end()
}

const update = async (req, res) => {
    const venda = await prisma.vendas.update({
        where: {
            id: Number(req.params.id)
        },
        data: req.body
    })

    res.status(200).json(venda).end()
}

const remove = async (req, res) => {
    const venda = await prisma.vendas.delete({
        where: {
            id: Number(req.params.id)
        }
    })
    res.status(200).json(venda).end()
}

module.exports = {
    create,
    read,
    update,
    remove
}