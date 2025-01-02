const express = require('express');
const router = express.Router();



const{createUser,getphotos,getpdfs}=require('../Controller/usercontroller.js');

router.post('/register', createUser);

router.app.get('/photos',getphotos);

app.get('/pdfs', getpdfs);



module.exports = router;   

