const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const create = async (req, res) => {
    var info = req.body
    var detalhe

    if (Array.isArray(info)) {
        detalhe = await prisma.detalhe.createMany({
            data: info,
            skipDuplicates: true
        })
    }else{
        detalhe = await prisma.detalhe.create({
            data: info
        })
    }
    

    res.status(200).json(detalhe).end()
}

const read = async (req, res) => {
    const detalhes = await prisma.detalhe.findMany({
        include: {
            produto: true,
            venda: {
                include: {
                    funcionario: true
                }
            }
        }
    })

    res.status(200).json(detalhes).end()
}

const update = async (req, res) => {
    const detalhe = await prisma.detalhe.update({
        where: {
            id: Number(req.params.id)
        },
        data: req.body
    })

    res.status(200).json(detalhe).end()
}

const remove = async (req, res) => {
    const detalhe = await prisma.detalhe.delete({
        where: {
            id: Number(req.params.id)
        }
    })
    res.status(200).json(detalhe).end()
}

module.exports = {
    create,
    read,
    update,
    remove
}