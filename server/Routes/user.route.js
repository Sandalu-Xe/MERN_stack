const express = require('express');
const router = express.Router();



const{createUser,getphotos}=require('../Controller/usercontroller.js');

router.post('/register', createUser);

router.app.get('/photos',getphotos);



module.exports = router;   

