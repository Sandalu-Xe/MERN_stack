const express = require('express');
const router = express.Router();
const {
    signup,
   
} =require('../Controller/auth.controller.js');

const {verfiytoken} = require('../Middleware/verfyToken.js')


router.post("/signup",signup);

 
module.exports = router;  