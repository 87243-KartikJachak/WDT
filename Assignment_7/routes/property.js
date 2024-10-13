const express = require('express');
const mysql2 = require('mysql2');
// const db = require('../db');
// const utils = require('./utils');

const app = express.Router();

const connectionDetails = {
    host: "localhost", 
    database: "airbnb_db",
    user: "KD2-87243-kartik", 
    password: "manager",
    port: 3306
};


app.post("/addproperty", (request, response) => {

    var connection = mysql2.connect(connectionDetails);
    connection.connect();

    const {
        categoryId,
        title,
        details,
        address,
        contactNo,
        ownerName,
        isLakeView,
        isTV,
        isAC,
        isWifi,
        isMiniBar,
        isBreakfast,
        isParking,
        guests,
        bedrooms,
        beds,
        bathrooms,
        rent,
        profileImage,
        
    } = request.body;

    var queryText = `insert into property(categoryId,title,details,address,contactNo,ownerName,isLakeView,isTV,isAC,isWifi,isMiniBar,isBreakfast,isParking,guests,bedrooms,beds,bathrooms,rent,profileImage) values (${categoryId},'${title}', '${details}', '${address}', ${contactNo}, '${ownerName}', ${isLakeView}, ${isTV}, ${isAC}, ${isWifi}, ${isMiniBar}, ${isBreakfast}, ${isParking}, ${guests}, ${bedrooms}, ${beds}, ${bathrooms}, ${rent}, '${profileImage}')`;

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

app.put("/:id", (request, response)=> {

    var connection = mysql2.connect(connectionDetails);
    connection.connect();

    const {
        categoryId,
        title,
        details,
        address,
        contactNo,
        ownerName,
        isLakeView,
        isTV,
        isAC,
        isWifi,
        isMiniBar,
        isBreakfast,
        isParking,
        guests,
        bedrooms,
        beds,
        bathrooms,
        rent,
        profileImage,
        
    } = request.body;

    // const queryText = `update property set
    //    categoryId,
    //     title,
    //     details,
    //     address,
    //     contactNo,
    //     ownerName,
    //     isLakeView,
    //     isTV,
    //     isAC,
    //     isWifi,
    //     isMiniBar,
    //     isBreakfast,
    //     isParking,
    //     guests,
    //     bedrooms,
    //     beds,
    //     bathrooms,
    //     rent,
    //     profileImage,    
    //                     `;
});



module.exports = app;