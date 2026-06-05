const {v4: uuidv4} = require('uuid');
const User = require("../models/user");
const {setUser} = require('../service/auth');
const bcrypt = require("bcrypt");

async function handleUserSingUp(req,res){

    try{
        const {name,email,password} = req.body;

        await User.create({
            name,
            email,
            password,
        });

        return res.redirect('/login');

    }catch(err){

        return res.render('signup',{
            error:'Email already exists'
        });
    }
}


async function handleGuestLogin(req, res) {
    const timestamp = Date.now();

    const guest = await User.create({
        name: `Guest-${timestamp}`,
        email: `guest-${timestamp}@temp.com`,
        password: "guest123",
    });

    const token = setUser(guest);

    res.cookie("uid", token);

    return res.redirect("/");
}
// -------------------
async function handleUserLogin(req, res) {

    const {  email, password } = req.body;

   const user = await User.findOne({
        email,
        password,
    });
    if(!user)
        return res.render("login",{
            error: "Invalid Username or Password"})
    
    // const sessionId = uuidv4();

    const token = setUser(user);
    res.cookie("uid",token);
    return res.redirect("/");
}

async function handleDeleteURL(req,res){

    const shortId = req.params.shortId;

    await URL.deleteOne({
        shortId,
        createdBy:req.user._id
    });

    return res.redirect('/');
}
async function handleLogout(req, res) {
    res.clearCookie("uid");
    return res.redirect("/login");
}

module.exports = {
    handleUserSingUp,
    handleUserLogin,
    handleDeleteURL,
    handleGuestLogin,
        handleLogout,


    
};