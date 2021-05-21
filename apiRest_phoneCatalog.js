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

app.post("/phones", function(request, response){
    let params = [request.body.name, request.body.manufacturer, request.body.color, request.body.price, request.body.screen, request.body.processor, request.body.ram, request.body.imageFileName, request.body.description]
    let sql = "INSERT INTO catalog (name, manufacturer, color, price, screen, processor, ram, imageFileName, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
    connection.query(sql, params, function(err, res){
        if (err) response.send(err)
        else {
            if (res.affectedRows == 1){
                response.send({mensaje: "Phone added", codigo: 1})
            }
            else response.send(res)
        }
    })
})

app.put("/phones", function(request, response){
    let params = [request.body.name, request.body.manufacturer, request.body.color, request.body.price, request.body.screen, request.body.processor, request.body.ram, request.body.imageFileName, request.body.description, request.body.id]
    let sql = `UPDATE catalog
                    SET name = COALESCE(?, name),
                        manufacturer = COALESCE(?, manufacturer),
                        color = COALESCE(?, color),
                        price = COALESCE(?, price),
                        screen = COALESCE(?, screen),
                        processor = COALESCE(?, processor),
                        ram = COALESCE(?, ram),
                        imageFileName = COALESCE(?, imageFileName),
                        description = COALESCE(?, description)
                    WHERE id = ?`
    connection.query(sql, params, function(err, res){
        if (err) response.send(err)
        else {
            if (res.changedRows == 0){
                response.send({'mensaje': 'Nothing to update', codigo: 0})
            }
            else{
                response.send({'mensaje': 'Phone updated', codigo: 1})
            }
        }
    })
})

app.delete("/phones", function(request, response){
    let params = [request.body.id]
    let sql = "DELETE FROM catalog WHERE id = ?"
    connection.query(sql, params, function(err, res){
        if (err) response.send(err)
        else response.send({'mensaje': 'Phone deleted', codigo: 1})
    })
})