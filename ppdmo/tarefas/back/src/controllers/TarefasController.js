const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const toCreate = async (req, res) => {
    var info = req.body
    info.status = 1
    const tarefa = await prisma.tarefas.create({
        data: info
    })
    res.status(201).json(tarefa).end()
}

const toConclude = async (req, res) => {
    var info = {
        "hora_enc": req.body.horario_enc,
        "status": 2
    }
    const tarefa = await prisma.tarefas.update({
        where: {
            id: Number(req.body.id)
        },
        data: info
    })
    res.status(201).json(tarefa).end()
}

const toCancel = async (req, res) => {
    const tarefa = await prisma.tarefas.update({
        where: {
            id: Number(req.body.id)
        },
        data: {"status": 3}
    })
    res.status(201).json(tarefa).end()
}

const toRead = async (req, res) => {
    const tarefas = await prisma.tarefas.findMany({
        where: {
            "status": Number(req.params.status)
        }
    })
    res.status(201).json(tarefas).end()
}

module.exports = {
    toCancel,
    toConclude,
    toCreate,
    toRead
}