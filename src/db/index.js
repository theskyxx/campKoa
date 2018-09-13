const mysql = require('mysql')

const configDB = {
    host : 'localhost' ,
    user : 'code', 
    password : 'code', 
    database: 'codecs'
    }

const conn = async () => await mysql.createConnection(configDB)


module.exports = configDB