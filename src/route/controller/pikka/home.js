// const bcrypt = require('bcrypt')  
 

const getHandler = async (ctx) => { 
    let obj = {}
    obj.photos = [
        {id: 1, path: "t1.jpg"},
        {id: 2, path: "t2.jpg"},
        {id: 3, path: "t3.jpg"},
        {id: 4, path: "t4.jpg"},
        {id: 5, path: "t5.jpg"},
        {id: 6, path: "t6.jpg"},
        {id: 1, path: "t1.jpg"},
        {id: 2, path: "t2.jpg"},
        {id: 3, path: "t3.jpg"},
        {id: 4, path: "t4.jpg"}
    ]
    await ctx.render('home', obj)
}

const postHandler = async (ctx) => { 

}


module.exports = {
	getHandler,
	postHandler
}