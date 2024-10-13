const express = require('express');
const userRouter= require('./routes/user');
const config = require('./config.js')
const propertyRouter= require('./routes/property');
const categoryRouter= require('./routes/category');
const bookingsRouter= require('./routes/booking');

var app = express();

app.use((request, response, next)=>{
    response.setHeader("Access-Control-Allow-Origin","*");

    if(
        request.url === '/user/login' ||
        request.url === '/user/add' ||
        request.url === '/user/profile/:id' 
        // request.url.startsWidth('/image/')
    ){
        next();
    } else
    {
        const token = request.headers['token'];

        if(!token || token.length === 0)
        {
            response.write(JSON.stringify(error));
        }
        else
        {
            try 
            {
                const payload = jwt.verify(token, config.secret);

                request.userId = payload['id'];

                next();
            } 
            catch(error)
            {
                response.write(JSON.stringify(error));
            }
        }
    }
});

app.use(express.json()); 

app.use('/user', userRouter);
app.use('/property', propertyRouter);
app.use('/category', categoryRouter);
app.use('/booking', bookingsRouter);

app.listen(9000, ()=>{console.log("server started at port 9000")});

