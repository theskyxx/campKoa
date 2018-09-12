const Router = require('koa-router')

const home = require('./home')

const router = new Router() 
// const checkIsLogin = async (ctx, next) => { 
// 	if (ctx.session && ctx.session.userId) {
// 		// ctx.session.flash = {
// 		// 	error: '',
// 		// 	success: ''
// 		// }
// 		return ctx.redirect('/') 
// 		} 
// 	await next()
//    } 
router.get('/', home.getHandler) 

module.exports = router.routes()



// router.get('/', async (ctx, next) => {
//     let obj = {}
//     obj.photos = [
//         {id: 1, path: "t1.jpg"},
//         {id: 2, path: "t2.jpg"},
//         {id: 3, path: "t3.jpg"},
//         {id: 4, path: "t4.jpg"},
//         {id: 5, path: "t5.jpg"},
//         {id: 6, path: "t6.jpg"},
//         {id: 1, path: "t1.jpg"},
//         {id: 2, path: "t2.jpg"},
//         {id: 3, path: "t3.jpg"},
//         {id: 4, path: "t4.jpg"}
//     ]
//     await ctx.render('home', obj)
// })
// router.get('/signup', async (ctx, next) => {
//     await ctx.render('signup')
// })
// router.get('/signin', async (ctx, next) => { 
//     await ctx.render('signin')
// })
// router.get('/upload', async (ctx, next) => {
//     await ctx.render('upload')
// })