const Router = require('koa-router')

const signin = require('./signin')  
const router = new Router()
 

// router.get('/xxxx',  xxxx.getHandler)
router.post('/signin', signin.postHandler)
 
module.exports = router.routes()
