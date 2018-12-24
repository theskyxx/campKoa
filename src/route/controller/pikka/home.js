// const bcrypt = require('bcrypt') 
var loader = require('csv-load-sync');
var moment = require('moment');

const getHandler = async (ctx) => { 

    let obj2 = {}
    obj2.typ = "bar"
    obj2.title = "test Chart"
    obj2.x1 = "event"
    obj2.y1 = "event"
    obj2.data = [ '1','2' ]
    

    obj2.photos = [
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

    filePath = 'public/testfile.csv';

    var csv = loader(filePath);

    var arrData = [];

    csv.forEach(cv =>{

        var momentDate = moment(cv['Time stamp'],'DD/MM/YYYY hh:mm');

        year = momentDate.year()
         month = momentDate.month()
         day = momentDate.day()
         arrData.push([new Date(year + '-' + month + '-' + day).toDateString()]);
    })

    console.log(arrData);

    obj2.arrData = arrData

  await ctx.render('home', obj2)
}

const postHandler = async (ctx) => { 

}


module.exports = {
	getHandler,
	postHandler
}