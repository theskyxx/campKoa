const Koa = require('koa') 
const render = require('koa-ejs')
const path = require('path')
const serve = require('koa-static')
const koaBody = require('koa-body')
const cors = require('@koa/cors')
const app = new Koa 

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'template',
    viewExt: 'ejs',
    cache: false
  });



const checkAuth = async (ctx, next) => { 
    // if (ctx.path === '/' ||ctx.path === '/signup'  ){
    //     await next()
    // }else{
    //     // ctx.redirect('/signin')
    //     await ctx.render('signin')
    // }
    await next()
}

app.use(serve(path.join(__dirname, "public")))
app.use(checkAuth)
app.use(cors())
app.use(koaBody({
	multipart: true
}))
app.use(require('./src/route/')) 
app.listen(3000)
