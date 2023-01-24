const toCreate = (model) => {
    return `INSERT INTO pedidos VALUES(DEFAULT, '${model.cliente}', '${model.endereco}', '${model.produto}', '${model.data}', '${model.horaPed}', NULL, NULL, ${model.entregador})`
}

const toRead = (model) => {
    return `SELECT * FROM vw_pedidos WHERE id_pedido = ${model.id}`
}

const toReadAll = () => {
    return `SELECT * FROM vw_pedidos`
}

const toReadEx = () => {
    return `SELECT * FROM vw_pedidos_ex`
}

const toReadEnt = (model) => {
    return `SELECT * FROM vw_pedidos_ent WHERE id_entregador = ${model.id}`
}

const toUpdate = (model) => {
    return `UPDATE pedidos SET hora_entrega = '${model.hora_entrega}', hora_fim = '${model.hora_fim}' WHERE id_pedido = ${model.id_pedido}`
}

const toDelete = (model) => {
    return `DELETE FROM pedidos WHERE id_pedido = ${model.id_pedido}`
}

module.exports = {
    toCreate,
    toRead,
    toReadAll,
    toReadEx,
    toReadEnt,
    toUpdate,
    toDelete
}