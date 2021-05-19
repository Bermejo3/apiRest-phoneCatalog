const express = require('express')
const app = express();
const cors = require('cors')

app.use(express.urlencoded({extended: false}));
app.use(express.json())
app.use(cors())

let mysql = require('mysql');
const { response } = require('express');
let connection = mysql.createConnection({
    database: "Phones",
    host: "database-1.cczyivccckpk.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "admin1234"
})
connection.connect();

let port = process.env.PORT || 300
app.listen(port)

app.get("/phones", function(request, response){
    let sql = "SELECT * FROM catalog"
    connection.query(sql, function(err, res){
        if (err) response.send(err)
        else response.send(res)
    })
})