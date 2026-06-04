const express = require('express');
const router = express.Router();
const {handleUserSingUp,handleUserLogin} = require('../controller/user');


router.post('/signup',handleUserSingUp );
router.post('/login',handleUserLogin );


module.exports = router;