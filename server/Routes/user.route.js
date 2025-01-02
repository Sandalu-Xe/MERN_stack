const express = require('express');
const router = express.Router();
const User = require('../models/user.model.js');


const{createUser,Findusers}=require('../Controller/usercontroller.js');

router.post('/register', createUser);



module.exports = router;   