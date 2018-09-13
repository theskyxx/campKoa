const mysql = require('mysql2/promise')
const dbConfig = require('../db')

const pool  = mysql.createPool(dbConfig);

async function query(sql,paramVal) {
    let result
    if (paramVal){
        result = await pool.query(sql,paramVal);
    }else{
        result = await pool.query(sql);
    }

    let [rows, fields] = result
   console.log('The solution is: ', rows, fields);
   return rows
}

module.exports = {
    query
  }