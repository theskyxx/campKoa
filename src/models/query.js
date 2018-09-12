const mysql = require('mysql')
const dbConfig = require('../db')
 
const query = async (paramSql, paramVal) => {
  return new Promise(async function(resolve, reject) {
    let conn;
    try {
      conn = await mysql.createConnection(dbConfig)

     conn.connect(function(err) {
        if (err) throw err;
        console.log ("Connected!");
      });

      console.log('After getConnection' + paramSql + conn)

      let result 
      if(paramVal){
        result = await conn.query(
          paramSql
        )
      }else{
        result = await conn.query(
          paramSql, paramVal
        )
      }
     
      console.log('After execute')
      resolve(result.rows);
    } catch (err) { // catches errors in getConnection and the query
      reject(err);
    } 
  });
}

module.exports = {
  query
}