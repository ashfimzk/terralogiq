const mysql = require('mysql2')
const password = process.env.PASSWORD_DB;
const database = process.env.DATABASE

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:`${password}`,
    database:`${database}`

});

db.connect((err)=>{
    if(err) return console.log('Error' + err.message)

    console.log('Connected to Database')
})

module.exports = db