const express=require('express');
require('dotenv').config();
const router=express.Router();

const routes=require('./routes');

router.use('/api', routes);


module.exports= router;