const apiRoutes=require('./routes/api_routes');
const express=require('express');


const app=express();
const PORT=3000;


app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    next();
})

app.use(apiRoutes);

app.listen(PORT, ()=>{
    console.log(`The Server is running on port ${PORT}`);
})
