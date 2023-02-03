const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const create = async (req, res) => {
    var info = req.body
    var venda
    if (Array.isArray(info)) {
        venda = await prisma.vendas.createMany({
            data: info,
            skipDuplicates: true
        })
    }else{
        venda = await prisma.vendas.create({
            data: info
        })
    }
    

    res.status(200).json(venda).end()
}

const read = async (req, res) => {
    const vendas = await prisma.vendas.findMany({
        include: {
            funcionario: true,
            detalhe: {
                select: {
                    produto: true
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