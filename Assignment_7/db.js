const mysql = require('mysql');
const mysql2 = require('mysql2');
const express = require('express');

const connectionDetails = {
    host: "localhost", 
    database: "airbnb_db",
    user: "KD2-87243-kartik", 
    password: "manager",
    port: 3306
};

const app = express.Router();

app.get("/", (request, response)=> {
    var connection = mysql2.createConnection(connectionDetails)
    connection.connect();
    console.log("Connected to Database")
});

module.exports = connectionDetails;