const express = require('express');
const router = express.Router();
const User = require('../models/user.model.js');


const{createUser,Findusers}=require('../Controller/usercontroller.js');

router.post('/register', createUser);
router.get('/users', Findusers);
router.get('/users', Findusers);
router.get('/users', Findusers);
router.get('/users', Findusers);


module.exports = router;   