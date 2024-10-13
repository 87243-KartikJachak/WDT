const express = require('express');
const mysql2 = require('mysql2');
const jwt = require('jsonwebtoken');
const config = require('../config.js');
// const db = require('./db');
// const utils = require('./utils');

const app = express.Router();

const connectionDetails = {
    host: "localhost", 
    database: "airbnb_db",
    user: "KD2-87243-kartik", 
    password: "manager",
    port: 3306
};

//User Login
app.post("/login", (request, response) => {

    var connection = mysql2.createConnection(connectionDetails)
    connection.connect();
    
    const  { email, password } = request.body;

    const queryText = `select id, firstname, lastname, phoneNumber, isDeleted from user where email = '${email}' and password = '${password}'`;

    connection.query(queryText, (error, result)=> {
        
        response.setHeader('Content-Type', 'application/json');

        if(error) 
        {
            response.write(JSON.stringify(error));
        } 
        else 
        {
            if(result.length == 0)
            {
                response.write(JSON.stringify(error));
            }
            else
            {
                const user = result[0];
                
                if(user.isDeleted) 
                {
                    response.write(JSON.stringify(error));
                }
                else 
                {
                    const payload = { id: user.id }
                    const token = jwt.sign(payload, config.secret);
                    const userData = {
                        token,
                        name: `${user['firstname']}, ${user['lastname']}`
                    }                    
                    response.write(JSON.stringify(userData));
                }
            }
        }
        response.end();
    })
    connection.end();
});

//Adding Users
app.post("/add", (request, response) => {

    var connection = mysql2.createConnection(connectionDetails)
    connection.connect();
    
    const  { firstname, lastname, email, password, phonenumber, isDeleted } = request.body;

    const queryText = `insert into user(firstname, lastname, email, password, phonenumber, isDeleted) values('${firstname}', '${lastname}', '${email}', '${password}', ${phonenumber}, ${isDeleted})`

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

//Updating Users
app.put("/:id", (request, response) => {

    var connection = mysql2.createConnection(connectionDetails)
    connection.connect();
    
    const  { firstname, lastname, email, password, phonenumber, isDeleted } = request.body;

    const queryText = `update user set
                        firstname='${firstname}', 
                        lastname='${lastname}', 
                        email='${email}', 
                        password='${password}',
                        phonenumber=${phonenumber},
                        isDeleted=${isDeleted}
                        where id=${request.params.id}`;
                        
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

//Deleted Users
app.delete("/:id", (request, response) => {

    var connection = mysql2.createConnection(connectionDetails)
    connection.connect();
    
    const queryText = `delete from user
                        where id=${request.params.id}`;
                        
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

module.exports = app;

