const sqlite3 = require('sqlite3');
//estou usando somente o modulo open, ele que vai fazer a conexão com o db
const { open } = require('sqlite');

//abrindo a conexão com o db
//uma principal regra para usar a conexão é que o modulo open deve esta dentro de uma estrutura de função
module.exports = () => open({
    filename: './database.sqlite',
    driver: sqlite3.Database
});