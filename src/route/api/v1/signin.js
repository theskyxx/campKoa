const dbConn = require('../../../models/query')

const getHandler = async (ctx) => {

} 

const postHandler = async (ctx) => { 
    // console.log(ctx.request.body);
    try {
        // const {userId} = ctx.request.body
        console.log('Before genHeader');
        let res
        let data = {}
        data.arr = []
        let users = ['ronnapoom.cha', 'adminfarm.ron', 'adminfarm.vic']
        for (let i = 0; i < users.length;i++){
            res = await genHeader(users[i])
            console.log(res)
            data.arr.push(res)
        }
        // users.forEach(async (user) =>  {      
        //     res = await genHeader(user)
        //     console.log(res)
        //     data.arr.push(res)
        // })
        ctx.body = data
    } catch (err) {
        console.error(err);
    }
}

const findUser = async (userId) => {
    console.log('Before query')
    let [res] = await dbConn.query(`Select User_Id From Mas_User WHere user_id = :userId`, [userId])
    //let [res] = await dbConn.query(`Select User_Id From Mas_User WHere user_id = ${userId}`);
    console.log('After query')
    console.log(res.USER_ID)
    return res
}

const genHeader = async (userId) => { 
    console.log('Before findUser')
    const res = await findUser(userId)
    return res
}


module.exports = {
    getHandler,
    postHandler
}