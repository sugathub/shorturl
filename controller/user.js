const User = require("../models/user");

async function handleUserSingUp(req, res) {

    const { name, email, password } = req.body;

    await User.create({
        name,
        email,
        password,
    });

    return res.render("Home");
}

module.exports = {
    handleUserSingUp,
};