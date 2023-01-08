const app = require('express').Router();
const jwt = require('jsonwebtoken');
const {validateSchema} = require("../util/validate");
const {authValidation} = require("../validations/auth");
const {getToken} = require("../controller/token");
const {authUser} = require("../controller/user");

app.post("/login", async (req, res) => {
    const error = await validateSchema(authValidation, req.body);
    if (error) return res.status(400).json(error);

    let user = await authUser(req.body.username, req.body.password);
    if (!user) return res.status(401).json({message: "Please use the correct username / password combination"});

    const token = jwt.sign({userId: user.id}, getToken());

    res.header("Authorization", token);

    res.json({message: "Successfully logged in"});
});

module.exports = app;
