const express = require('express');
const router = express.Router();
const User = require('../models/usermode.js');


const{createUser,Findusers}=require('../Controller/usercontroller.js');

router.post('/register', createUser);
router.post('/users', Findusers);

module.exports = router;   