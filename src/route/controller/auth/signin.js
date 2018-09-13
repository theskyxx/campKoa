const db = require('../../../models/mysql')
 

const getHandler = async (ctx) => { 
	await ctx.render('signin')
}

const postHandler = async (ctx) => { 
	try {
		sql = 'select count(*) as count FROM mas_user WHERE user_id=? AND password=? '
		rows = await db.query(sql,[ctx.request.body.username,ctx.request.body.password])
		await ctx.render('signin')

    } catch (err) {
        console.error(err);
    }
	await ctx.render('home')
}


module.exports = {
	getHandler,
	postHandler
}