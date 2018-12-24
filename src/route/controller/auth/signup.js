// const bcrypt = require('bcrypt')  
const db = require('../../../models/mysql')
 

const getHandler = async (ctx) => { 
	await ctx.render('signup')
}

const postHandler = async (ctx) => { 
	
	//console.log(ctx.request.body)
	//console.log('username: ', ctx.request.body.username)
 //console.log('password: ', ctx.request.body.password)

	sql = 'INSERT INTO mas_user (user_id, password) VALUES (? , ? )'

	await db.query(sql,[ctx.request.body.username,ctx.request.body.password])
	await ctx.render('signin')
}


module.exports = {
	getHandler,
	postHandler
}