const apiRoutes=require('./routes/api_routes');
const express=require('express');
const path=require('path');

// Path to our .env file
require('dotenv').config({path: path.resolve(__dirname, '../.env')});

const app=express();
const PORT=process.env.NODE_PORT || 5000;
const HOST=process.env.NODE_HOST || 'localhost';


app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    next();
})

app.use(apiRoutes);

app.listen(PORT, HOST, ()=>{
    console.log(`The Server is running at http://${HOST}:${PORT}/`);
})
