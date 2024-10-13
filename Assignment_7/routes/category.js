const express = require('express');
const multer =  require('multer');
const mysql2 = require('mysql2');

const upload = multer({dest: 'images'});

const app = express.Router();

const connectionDetails = {
    host: "localhost", 
    database: "airbnb_db",
    user: "KD2-87243-kartik", 
    password: "manager",
    port: 3306
};

app.get('/viewcategory', (request, response)=> {

    var connection = mysql2.connect(connectionDetails);
    connection.connect();
    
    const queryText = `select id, title, details, image from category;`

    connection.query(queryText, (error, result)=> {
        
        response.setHeader('Content-Type', 'application/json');
        
        if(error == null) 
            {
                response.write(JSON.stringify(result));
            } 
            else 
            {
                response.write(JSON.stringify(error));
            }
            response.end();
        })
        connection.end();      
});


app.post('/addCategory', upload.single('icon'), (request, response)=> {
    
    var connection = mysql2.connect(connectionDetails);
    connection.connect();
    
    const { title, details } = request.body;

    const filename = request.file.filename;

    const queryText = `insert into category (title, details, image) values('${title}', '${details}','${filename}')`

    connection.query(queryText, (error, result)=> {
        response.setHeader('Content-Type', 'application/json');

        if(error == null) 
        {
            response.write(JSON.stringify(result));
        } 
        else 
        {
            response.write(JSON.stringify(error));
        }
        response.end();
    })
    connection.end();         
})

module.exports = app;