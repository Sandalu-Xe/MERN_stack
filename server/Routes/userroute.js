const express = require('express');
const router = express.Router();
const User = require('../models/usermode.js');


const{createUser}=require('../Controller/usercontroller.js');

router.post('/register', createUser);

module.exports = router;