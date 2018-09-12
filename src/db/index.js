const mysql = require('mysql')

const configDB = {
    host : '192.168.64.2' ,
    user : 'code', 
    password : 'code', 
    database: 'codecs'
    }

const conn = async () => await mysql.createConnection(configDB)


module.exports = configDB