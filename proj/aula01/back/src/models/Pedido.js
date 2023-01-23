const toCreate = (model) => {
    return `INSERT INTO pedidos VALUES(DEFAULT, '${model.cliente}', '${model.endereco}', '${model.produto}', '${model.data}', '${model.horaPed}', NULL, NULL, ${model.entregador})`
}

const toRead = (model) => {
    return `SELECT * FROM pedidos WHERE id_pedido = ${model.id}`
}

const toReadAll = () => {
    return `SELECT * FROM pedidos`
}

const toUpdate = (model) => {
    return `UPDATE pedidos SET hora_entrega = '${model.horaEnt}', hora_fim = '${model.horaFim}' WHERE id_pedido = ${model.id}`
}

const toDelete = (model) => {
    return `DELETE FROM pedidos WHERE id_pedido = ${model.id}`
}

module.exports = {
    toCreate,
    toRead,
    toReadAll,
    toUpdate,
    toDelete
}