const express = require('express');
const router = express.Router();
const {handleUserSingUp} = require('../controller/user');


router.post('/',handleUserSingUp );

module.exports = router;