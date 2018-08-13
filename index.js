const Koa = require('koa')
const Router = require('koa-router')
const serve = require('koa-static')
const path = require('path')
const render = require('koa-ejs')


const app = new Koa()
const router = new Router()



render(app, {
    root: path.join(__dirname, 'public/views'),
    layout: 'template',
    viewExt: 'ejs',
    cache: false
   }) 
   
  router.get('/', async ctx => {
    await ctx.render('landing')
   }) 

   router.get('/Skill', async ctx => {
    await ctx.render('Skill')
   }) 

   router.get('/Contact', async ctx => {
    await ctx.render('Contact')
   }) 

   router.get('/Profile', async ctx => {
    await ctx.render('Profile')
   })    

   
 router.get('/test', ctx => {
 ctx.body = `<img src="/images/P1220735.JPG">`
})
 

app.use(serve(path.join(__dirname, 'public')))
app.use(router.routes())
app.use(router.allowedMethods())


app.listen(3000)

