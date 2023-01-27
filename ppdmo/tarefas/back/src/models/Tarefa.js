const criarTarefa = (model) => {
    return `INSERT INTO tarefas VALUES(DEFAULT, '${model.descricao}', '${model.horario_tarefa}', null, 1)`
}

const concluirTarefa = (model) => {
    return `UPDATE tarefas SET hora_enc = '${model.horario_enc}', status = 2 WHERE id = ${model.id}`
}

const cancelarTarefa = (model) => {
    return `UPDATE tarefas SET status = 3 WHERE id = ${model.id}`
}

const listarTarefas = (model) => {
    return `SELECT * FROM tarefas WHERE status = ${model.status}`
}

module.exports = {
    criarTarefa,
    concluirTarefa,
    cancelarTarefa,
    listarTarefas
}