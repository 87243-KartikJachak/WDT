// const db = require('../db');
const express = require('express');
const util = require('../Utils');
// const config = require('../config');
const router = express.Router()

const connectionDetails = {
    host: "localhost", 
    database: "airbnb_db",
    user: "KD2-87243-kartik", 
    password: "manager",
    port: 3306
};

router.get('/display',(req,res) => {

    var connection = mysql2.createConnection(connectionDetails)
    connection.connect();

    const statement = `select * from bookings`;
    connection.query(statement,(error,bookings) => {
        res.send(util.createResult(error,bookings))
    })
})

router.post('/addbooking',(req,res)=>{
    var connection = mysql2.createConnection(connectionDetails)
    connection.connect();

    const {propertyId,total ,fromDate,toDate} = req.body
    const statement = `insert into bookings(userId,propertyId, total,fromDate,toDate) values(?,?,?,?,?)`;

    connection.execute(statement,[req.userId,propertyId,total,fromDate,toDate],(error,bookings)=>{
        res.send(util.createResult(error,bookings))
    })
})

module.exports = router