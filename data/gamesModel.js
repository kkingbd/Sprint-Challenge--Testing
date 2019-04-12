const db = require('./dbConfig.js')

module.exports = {
    totalList,
    add
}

async function totalList() {
    return db('table');
}

async function add(game) {
    return db('table').insert(game);
}