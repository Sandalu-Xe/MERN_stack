const express = require('express');
const router = express.Router();

const{
    createUser,
    getphotos,
    getpdfs,
    findusers,
    finduserbyid,
    deleteuserbyid,
    edituserbyid,

   }=require('../Controller/usercontroller.js');


router.post('/adduser', createUser);

router.get('/photos',getphotos);

router.get('/pdfs', getpdfs);

router.get('/users', findusers)

router.get('/user/:id', finduserbyid)

router.delete('/user/:id', deleteuserbyid)

router.put('/edituser/:id', edituserbyid)


module.exports = router;   

