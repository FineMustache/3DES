const toReadEmail = (model) => {
    return `SELECT * FROM entregadores WHERE email = '${model.email}'`
}

const toRead = (model) => {
    return `SELECT * FROM entregadores WHERE id_entregador = '${model.id}'`
}

module.exports = {
    toRead,
    toReadEmail
}