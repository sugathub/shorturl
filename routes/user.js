const express = require('express');
const router = express.Router();
const { handleUserSingUp, handleUserLogin, handleDeleteURL, handleGuestLogin, handleLogout, } = require('../controller/user');


router.post('/signup', handleUserSingUp);
router.post('/login', handleUserLogin);
router.post('/delete/:shortId', handleDeleteURL);
router.get("/guest", handleGuestLogin);
router.get("/logout", handleLogout);

module.exports = router;