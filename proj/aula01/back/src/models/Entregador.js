const toRead = (model) => {
    return `SELECT * FROM entregadores WHERE email = '${model.email}'`
}

module.exports = {
    toRead
}