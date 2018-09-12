// const bcrypt = require('bcrypt')  
 

const getHandler = async (ctx) => { 
	await ctx.render('signin')
}

const postHandler = async (ctx) => { 

}


module.exports = {
	getHandler,
	postHandler
}